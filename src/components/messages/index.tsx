import { Controls } from "./controls"
import { MessagesBox } from "@/components/messages/messages-box"

export const MessagesContainer = () => {
    return (
        <section
            id="ct__messages"
            className="w-[768px] h-[90%] m-auto flex flex-col shadow-md"
        >
            <MessagesBox/>
            <Controls />
        </section>
    )
}