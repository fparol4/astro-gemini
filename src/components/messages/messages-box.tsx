import { useStore } from "@nanostores/react"
import { Message } from "./message"
import { $messagesStore } from "@/stores/messages-store"

export const MessagesBox = () => {
    const messages = useStore($messagesStore)

    return (
        <div id="box__messages" className="flex flex-1 flex-col-reverse overflow-y-scroll">
            {messages.map((m, k) =>
                <Message variant={m.variant} text={m.text} key={k} />
            )}
        </div>
    )
}