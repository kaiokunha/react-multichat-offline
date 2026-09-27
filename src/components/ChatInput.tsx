import { useRef, useState } from 'react'
import { useChatStore } from '../stores/chatStore'
import SenderToggle from './SenderToggle'

type ChatInputProps = {
  disabled: boolean
}

const MAX_TEXTAREA_HEIGHT = 144

export default function ChatInput({ disabled }: ChatInputProps) {
  const [text, setText] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const sender = useChatStore((state) => state.sender)
  const toggleSender = useChatStore((state) => state.toggleSender)
  const addMessage = useChatStore((state) => state.addMessage)

  const canSend = !disabled && text.trim() !== ''

  function adjustTextareaHeight() {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`
  }

  function resetTextarea() {
    setText('')
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
    }
  }

  function handleSend() {
    if (!canSend) return
    addMessage(text)
    resetTextarea()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (disabled) return

    if (event.key.toLowerCase() === 'enter' && !event.shiftKey) {
      event.preventDefault()
      handleSend()
    }
  }

  const isUser = sender === 'user'

  return (
    <div className="px-4 pb-4">
      <div
        className={`rounded-lg border-2 bg-white p-4 shadow-md transition-colors duration-200 ${
          isUser ? 'border-stone-200' : 'border-purple-500'
        } ${disabled ? 'pointer-events-none opacity-50' : ''}`}
      >
        <div className="flex items-end gap-3">
          <SenderToggle sender={sender} onToggle={toggleSender} disabled={disabled} />
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(event) => {
              setText(event.target.value)
              adjustTextareaHeight()
            }}
            onKeyDown={handleKeyDown}
            placeholder="Digite uma mensagem..."
            rows={1}
            disabled={disabled}
            className="max-h-36 min-h-10 flex-1 resize-none bg-transparent px-1 py-2 text-stone-800 placeholder:text-stone-400 focus:outline-none disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className="rounded-lg bg-stone-800 px-4 py-2 text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}
