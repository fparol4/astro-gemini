import { atom, computed, map } from 'nanostores'
import type { MessageVariants } from '@/components/messages/message'

type Message = { 
    text: string 
    variant: KeyofEnum<typeof MessageVariants>
}

export const $store = map<Record<string, Message>>({
    '0': { text: 'first', variant: 'own' },
    '1': { text: 'second', variant: 'answer' },
    '2': { text: 'third', variant: 'own' },
    '3': { text: 'fourth', variant: 'answer' },
    '4': { text: 'first', variant: 'own' },
    '5': { text: 'second', variant: 'answer' },
    '6': { text: 'third', variant: 'own' },
    '7': { text: 'fourth', variant: 'answer' },
    '8': { text: 'first', variant: 'own' },
    '9': { text: 'second', variant: 'answer' },
    '10': { text: 'third', variant: 'own' },
    '11': { text: 'fourth', variant: 'answer' },
})

export const $messagesStore = computed($store, (messages) => 
    Object.values(messages).reverse()
)

export const addMessage = (message: Message) => {
    /**
     * Actually I don't know if it's the best approach, 
     * maybe with linked-lists we can avoid this computed. 
     */

    const nextKey = $messagesStore.value!.length + 1
    $store.setKey(nextKey.toString(), message)
}