export enum MessageVariants {
    own = 'own',
    answer = 'answer'
}

type Props = {
    variant?: KeyofEnum<typeof MessageVariants>
    text: string
}

export function Message(props: Props) {
    if (props.variant === MessageVariants.answer) {
        return (
            <div id="ct__answer-message-box" className="flex mr-4 p-4">
                <span className="bg-slate-200 p-3 rounded-md max-w-[60%]">
                    {props.text}
                </span>
            </div>
        )
    }

    return (
        <div id="ct__own-message-box" className="flex justify-end mr-4 p-4">
            <span className="bg-slate-800 p-3 text-white rounded-md max-w-[60%]">
                {props.text}
            </span>
        </div>
    )
}