import { useChatStore } from '../stores/chatStore'
import SidebarItem from './SidebarItem'

type SidebarProps = {
  onNavigate?: () => void
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const {
    conversations,
    activeConversationId,
    createConversation,
    selectConversation,
    deleteConversation,
  } = useChatStore()

  function handleCreate() {
    createConversation()
    onNavigate?.()
  }

  function handleSelect(id: string) {
    selectConversation(id)
    onNavigate?.()
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-stone-300 bg-stone-100">
      <div className="p-3">
        <button
          type="button"
          onClick={handleCreate}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-stone-800 px-3 py-2 text-sm text-white transition-colors hover:bg-stone-700"
        >
          <PlusIcon />
          Nova conversa
        </button>
      </div>
      <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-2 pb-3">
        {conversations.map((conversation) => (
          <SidebarItem
            key={conversation.id}
            id={conversation.id}
            isActive={conversation.id === activeConversationId}
            onSelect={handleSelect}
            onDelete={deleteConversation}
          />
        ))}
      </ul>
    </aside>
  )
}
