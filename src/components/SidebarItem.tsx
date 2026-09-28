type SidebarItemProps = {
  id: string
  isActive: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}

function TrashIcon() {
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
        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
        clipRule="evenodd"
      />
    </svg>
  )
}

export default function SidebarItem({ id, isActive, onSelect, onDelete }: SidebarItemProps) {
  return (
    <li
      className={`flex items-center gap-1 rounded-lg border-l-2 px-2 py-1.5 transition-colors ${
        isActive
          ? 'border-stone-800 bg-stone-200 font-medium'
          : 'border-transparent hover:bg-stone-200/70'
      }`}
    >
      <button
        type="button"
        onClick={() => onSelect(id)}
        title={id}
        className="min-w-0 flex-1 truncate px-1 py-1 text-left text-sm text-stone-800"
      >
        {id}
      </button>
      <button
        type="button"
        onClick={() => onDelete(id)}
        aria-label="Excluir conversa"
        className="shrink-0 rounded-md p-1.5 text-stone-500 transition-colors hover:bg-stone-300 hover:text-stone-800"
      >
        <TrashIcon />
      </button>
    </li>
  )
}
