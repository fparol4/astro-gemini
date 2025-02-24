interface LLMSession {
    prompt: (prompt: string) => Promise<string>
    promptStreaming: (prompt: string) => ReadableStream<string>
}

type CreateOptions = {
    systemPrompt?: string
    temperature?: number
    topK?: number
}

interface LanguageModel {
    create: (options?: CreateOptions) => Promise<LLMSession>
    capabilities: () => Promise<{
        defaultTopK: number,
        defaultTemperature: number,
        maxTemperature: number
    }>
}

// @ts-ignore
const languageModel: LanguageModel = window?.ai?.languageModel
const { defaultTopK } = await languageModel.capabilities()

/** LLM_SETTINGS */
const SESSION_INSTRUCTIONS = 'You need to emulate a Whatsapp conversation. Try to be short on your answers, direct and not deviate so much of the main topic'
const SESSION_TEMPERATURE = 0.5 // @HINT: Use 0.5 - 2.0 | > Hot = > Slow 
const SESSION_TOPK = defaultTopK

export const isLLMAvailable = () => Boolean(languageModel)

let LLM_SESSION: LLMSession; 
export const getSession = async () => {
    if (LLM_SESSION) return LLM_SESSION
    LLM_SESSION = await languageModel.create({
        systemPrompt: SESSION_INSTRUCTIONS,
        temperature: SESSION_TEMPERATURE,
        topK: SESSION_TOPK
    })
    return LLM_SESSION
}

export const promptAsync = async (prompt: string): Promise<string> => {
    const session = await getSession()
    const answer = await session.prompt(prompt)
    return answer
}

export const promptStream = async (prompt: string): Promise<ReadableStream<string>> => {
    const session = await getSession()
    const answerStream = session.promptStreaming(prompt)
    return answerStream
}