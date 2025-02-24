import { computed, map } from 'nanostores'
import { MessageVariants } from '@/components/messages/message'
import { promptAsync, promptStream } from '@/lib/llm'

type Message = {
    text: string
    variant: KeyofEnum<typeof MessageVariants>
}

export const $store = map<Record<string, Message>>({})

export const $messagesStore = computed($store, (messages) =>
    Object.values(messages).reverse()
)

export const addMessage = (message: Message): string => {
    const messageKey = ($messagesStore.value!.length + 1).toString()
    $store.setKey(messageKey, message)

    if (message.variant === MessageVariants.own) {
        addLLMessageStream(message.text)
    }

    return messageKey
}

export const updateMessage = (key: string, message: Message) => {
    $store.setKey(key, message)
}

/** Will await for the complete answer */
async function addLLMessage(prompt: string) {
    const message: Message = { text: 'Loading...', variant: 'answer' }
    const messageKey = addMessage(message)
    const answer = await promptAsync(prompt)
    const answerMessage: Message = { text: answer, variant: 'answer' }
    updateMessage(messageKey, answerMessage)
}

/** Will update when prompt is answering */
async function addLLMessageStream (prompt: string) {
    const message: Message = { text: 'Loading...', variant: 'answer' }
    const messageKey = addMessage(message)
    const answerStream = await promptStream(prompt)

    let completeMessage = ''
    for await (const answerChunk of answerStream) { 
        completeMessage += answerChunk
        const answerMessage: Message = { text: completeMessage, variant: 'answer' }
        updateMessage(messageKey, answerMessage)
    } 
}
