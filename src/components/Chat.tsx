import { useChatStore } from '../stores/chatStore'
import ChatInput from './ChatInput'
import MessageList from './MessageList'
import Sidebar from './Sidebar'

export default function Chat() {
  const conversations = useChatStore((state) => state.conversations)
  const activeConversationId = useChatStore((state) => state.activeConversationId)

  const activeConversation = conversations.find(
    (conversation) => conversation.id === activeConversationId,
  )
  const hasActiveConversation = activeConversation !== undefined

  return (
    <div className="flex h-dvh bg-stone-200">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <div className="mx-auto flex h-dvh max-w-2xl flex-col">
          <MessageList
            messages={activeConversation?.messages ?? []}
            hasActiveConversation={hasActiveConversation}
          />
          <ChatInput disabled={!hasActiveConversation} />
        </div>
      </div>
    </div>
  )
}
