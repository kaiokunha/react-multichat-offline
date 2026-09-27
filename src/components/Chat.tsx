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

      <div className="relative flex min-h-0 flex-1">
        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Fechar menu"
            className="absolute inset-0 z-20 bg-black/40 md:hidden"
            onClick={closeSidebar}
          />
        )}

        <div
          className={
            isSidebarOpen
              ? 'absolute inset-y-0 left-0 z-30 md:static'
              : 'hidden md:static md:block'
          }
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
