import { useState } from 'react'
import type { Message, Sender } from '../types/message'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import Sidebar from './Sidebar'

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [sender, setSender] = useState<Sender>('user')

  function handleSend(text: string) {
    if (!text.trim()) return

    const message: Message = {
      id: crypto.randomUUID(),
      text,
      sender,
    }

    setMessages([...messages, message])
  }

  function handleToggleSender() {
    setSender(sender === 'user' ? 'robot' : 'user')
  }

  return (
    <div className="flex h-dvh bg-stone-200">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <div className="mx-auto flex h-dvh max-w-2xl flex-col">
          <MessageList messages={messages} />
          <ChatInput
            sender={sender}
            onToggleSender={handleToggleSender}
            onSend={handleSend}
          />
        </div>
      </div>
    </div>
  )
}
