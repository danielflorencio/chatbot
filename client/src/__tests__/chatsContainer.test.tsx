
import '@testing-library/jest-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen } from "@testing-library/react"
import ChatsContainer from '../components/ChatsContainer'
import { store } from '../store'
import { Provider } from 'react-redux'
import { Conversations } from '../data/conversations'

test('The ChatsContainer component renders.', () => {
    render(<Provider store={store}><ChatsContainer/></Provider>)
})

const server = setupServer(
  rest.get('/api/messages/', (req, res, ctx) => {
    const {email} = req.params
    console.log('MOCK SERVER BEING CALLED.')
    const serverConversationsResponse = Conversations.map((conversation: any, index: any) => ({
        ...conversation,
        adminId: conversation.adminReference,
        customerId: {phoneNumber: conversation.customerId.phoneNumber},
        messages: conversation.messages.map((message: any) => ({
          ...message, 
          adminId: conversation.adminReference,
          customerId: {phoneNumber: conversation.customerId.phoneNumber}
        }))
    }))
    console.log("ServerConversationsResponse: ", serverConversationsResponse)
    return res(ctx.json({...serverConversationsResponse}))
  }),
)

beforeAll(() => server.listen({
    onUnhandledRequest(req) {
      console.error(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      )
    },
}))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
console.log('TEST CONSOLE LOG')

// it('Loads and displays messages data.', async () => {
// await act(async ()=> render(<Provider store={store}><ChatsContainer/></Provider>));
//     expect(screen.getByText('value')).toBeInTheDocument();
// })

it('Loads and displays messages data.', async () => {
    await render(<Provider store={store}><ChatsContainer/></Provider>)
    await expect(screen.getByText(Conversations[0].messages[0].content)).toBeInTheDocument();
})
 