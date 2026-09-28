import { useState } from 'react'
import { useChatStore } from '../stores/chatStore'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import MobileMenuButton from './MobileMenuButton'
import Sidebar from './Sidebar'

export default function Chat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const conversations = useChatStore((state) => state.conversations)
  const activeConversationId = useChatStore((state) => state.activeConversationId)

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId,
  )
  const hasActiveConversation = activeConversation !== undefined

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  function toggleSidebar() {
    setIsSidebarOpen((open) => !open)
  }

  return (
    <div className="flex h-dvh flex-col bg-stone-200">
      <header className="flex items-center px-3 py-2 md:hidden">
        <MobileMenuButton isOpen={isSidebarOpen} onClick={toggleSidebar} />
      </header>

      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        <button
          type="button"
          aria-label="Fechar menu"
          tabIndex={isSidebarOpen ? 0 : -1}
          className={`absolute inset-0 z-20 bg-black/40 transition-opacity duration-200 md:hidden ${
            isSidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={closeSidebar}
        />

        <div
          className={`absolute inset-y-0 left-0 z-30 transition-transform duration-200 ease-out md:static md:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <Sidebar onNavigate={closeSidebar} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mx-auto flex h-full max-w-2xl flex-col">
            <MessageList
              messages={activeConversation?.messages ?? []}
              hasActiveConversation={hasActiveConversation}
            />
            <ChatInput disabled={!hasActiveConversation} />
          </div>
        </div>
      </div>
    </div>
  )
}
