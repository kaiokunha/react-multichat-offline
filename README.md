# Chat Offline

Aplicação de chat com **múltiplas conversas** independentes. O usuário gerencia as conversas por um sidebar à esquerda e envia mensagens alternando entre dois remetentes: **usuário** (alinhado à direita) e **robô** (alinhado à esquerda).

O estado global vive numa store [Zustand](https://zustand.docs.pmnd.rs/). As conversas são persistidas no `localStorage` (chave `chat-conversations`). A conversa ativa e o remetente atual não são persistidos — ao recarregar a página, nenhuma conversa fica selecionada.

## Funcionalidades

- **Múltiplas conversas** — cada conversa tem o próprio histórico de mensagens, isolado das demais
- **Sidebar** — lista conversas pela ordem de criação; identificação pelo UUID
- **Criar conversa** — botão "Nova conversa" gera um UUID, adiciona ao final da lista e seleciona automaticamente
- **Excluir conversa** — ícone de lixeira em cada item; ao excluir a ativa, a área principal volta ao empty state
- **Persistência** — conversas e mensagens sobrevivem ao reload (Zustand `persist`); conversa ativa e remetente reiniciam
- **Estado inicial** — nenhuma conversa selecionada; input desabilitado até criar ou escolher uma
- **Input condicional** — sem conversa ativa, o card fica com opacidade 50% e as ações são bloqueadas
- **Sidebar responsivo** — fixo à esquerda no desktop; drawer retrátil no mobile (botão hamburger + overlay)
- **Dois remetentes** — toggle no input alterna quem envia a próxima mensagem (padrão: usuário; compartilhado entre conversas)
- **Textarea dinâmico** — altura ajusta conforme o conteúdo (mín. 1 linha, máx. ~6 linhas)
- **Atalhos de teclado** — `Enter` envia; `Shift + Enter` insere quebra de linha
- **Empty states** — "Crie ou selecione uma conversa" sem seleção; "Nenhuma mensagem ainda" numa conversa vazia
- **Auto-scroll** — rola automaticamente para a última mensagem ao enviar
- **Modo robô** — borda roxa no card de input quando o remetente ativo é o robô

## Stack

| Tecnologia | Uso |
|---|---|
| [Vite](https://vite.dev/) | Build e dev server |
| [React 19](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilização |
| [Zustand](https://zustand.docs.pmnd.rs/) | Estado global e persistência (`persist`) |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter) | Lint |

## Como executar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Uso

1. Crie uma conversa pelo botão **Nova conversa** no sidebar (no mobile, abra o menu pelo hamburger no canto superior esquerdo).
2. Digite uma mensagem no campo de texto na parte inferior da tela.
3. Use o toggle à esquerda para alternar entre **Usuário** e **Robô** antes de enviar.
4. Envie com `Enter` ou pelo botão à direita (desabilitado quando o campo está vazio ou não há conversa ativa).
5. Mensagens do usuário aparecem alinhadas à direita; mensagens do robô, à esquerda.
6. Alterne entre conversas pelo sidebar; exclua uma conversa pelo ícone de lixeira.

## Estrutura do projeto

```
src/
├── types/
│   ├── message.ts          # Sender, Message
│   └── conversation.ts     # Conversation
├── stores/
│   └── chatStore.ts        # Zustand: conversas, remetente e persistência
├── components/
│   ├── Chat.tsx            # Layout, sidebar mobile e conversa ativa
│   ├── Sidebar.tsx         # Lista de conversas + criar
│   ├── SidebarItem.tsx     # Item da lista (selecionar / excluir)
│   ├── MobileMenuButton.tsx
│   ├── MessageList.tsx     # Lista, empty states e auto-scroll
│   ├── MessageBubble.tsx   # Bolha individual
│   ├── ChatInput.tsx       # Card: toggle + textarea + enviar
│   └── SenderToggle.tsx    # Alternância usuário/robô
├── App.tsx                 # Renderiza <Chat />
└── index.css               # Import do Tailwind
```

### Modelo de dados

```ts
type Sender = 'user' | 'robot'

type Message = {
  id: string
  text: string
  sender: Sender
}

type Conversation = {
  id: string
  messages: Message[]
}
```

### Store

```ts
type ChatState = {
  conversations: Conversation[]
  activeConversationId: string | null
  sender: Sender
  createConversation: () => void
  selectConversation: (id: string) => void
  deleteConversation: (id: string) => void
  addMessage: (text: string) => void
  toggleSender: () => void
}
```

Apenas `conversations` é gravado no `localStorage`. `activeConversationId` e `sender` ficam só em memória.

## Fora de escopo

- Backend ou sincronização entre dispositivos
- Autenticação
- Edição ou exclusão de mensagens individuais
- Renomear conversas (a identificação é o próprio UUID)
- Horários, rótulos de remetente ou cabeçalho do chat
- Markdown, anexos ou formatação rica (apenas texto plano)
- Busca ou filtros de conversas
- Confirmação modal antes de excluir conversa

## Documentação

- Especificação do multi-chat: [.docs/features/multi-chat/prd.md](.docs/features/multi-chat/prd.md)
- Brain dump da feature: [.docs/features/multi-chat/brain-drump.md](.docs/features/multi-chat/brain-drump.md)
- PRD do chat único (base anterior): [.docs/prd.md](.docs/prd.md)
