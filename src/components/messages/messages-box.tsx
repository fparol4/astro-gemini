import { useStore } from "@nanostores/react"
import { Message } from "./message"
import { $messagesStore } from "@/stores/messages-store"
import { isLLMAvailable } from "@/lib/llm"

export const MessagesBox = () => {
    const _isLLMAvailable = isLLMAvailable()
    const messages = useStore($messagesStore)

    return (
        <div id="box__messages" className="flex flex-1 flex-col-reverse overflow-y-scroll">
            {_isLLMAvailable && messages.map((m, k) =>
                <Message variant={m.variant} text={m.text} key={k} />
            )}

            {!_isLLMAvailable &&
                <span className="font-semibold text-center">Gemini não está configurado</span>
            }
        </div>
    )
}