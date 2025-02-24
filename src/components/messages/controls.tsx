import { useState } from "react"

import { ENTER_KEY } from "@/constants"
import { Input } from "@/components/ui/input"
import { SendSolid } from "@mynaui/icons-react"
import { addMessage } from "@/stores/messages-store"


export const Controls = () => {
    const [prompt, setPrompt] = useState<string>('')

    const handleEnterKey = (e: React.KeyboardEvent) => {
        if (e.code === ENTER_KEY) {
            sendMessage()
        }
    }

    const sendMessage = () => {
        if (!prompt) return
        addMessage({ text: prompt, variant: 'own' })
        setPrompt('')
    }

    return (
        <div id="ct__controls" className="h-8 m-4 mb-6 relative">
            <Input
                className="bg-gray-100 h-10"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={handleEnterKey}
            />
            <SendSolid
                className="absolute right-3 top-2.5 cursor-pointer"
                onClick={sendMessage}
            />
        </div>
    )
}