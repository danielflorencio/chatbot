
import '@testing-library/jest-dom'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, screen, waitFor } from "@testing-library/react"
import ChatsContainer from '../components/ChatsContainer'
import { store } from '../store'
import { Provider } from 'react-redux'
import { Conversations } from '../data/conversations'
import { fetchMessages } from '../features/sessionControl/chatSlice'

test('The ChatsContainer component renders.', () => {
    render(<Provider store={store}><ChatsContainer/></Provider>)
})

// const server = setupServer(
//   rest.get('/messages', (req, res, ctx) => {
//     const {email} = req.params
//     console.log('MOCK SERVER BEING CALLED.')
//     const serverConversationsResponse = Conversations.map((conversation: any, index: any) => ({
//         ...conversation,
//         adminId: conversation.adminReference,
//         customerId: {phoneNumber: conversation.customerId.phoneNumber},
//         messages: conversation.messages.map((message: any) => ({
//           ...message, 
//           adminId: conversation.adminReference,
//           customerId: {phoneNumber: conversation.customerId.phoneNumber}
//         }))
//     }))
//     console.log("ServerConversationsResponse: ", serverConversationsResponse)
//     return res(ctx.json({...serverConversationsResponse}))
//   }),
//   rest.get('*',  (req, res, ctx) => {
//     console.log('please add request handler for ', req.url.toString())
//     return res(
//       ctx.status(500),
//       ctx.json({error: 'Please add request handler.'})
//     )
//   })
// )

import { server } from '../mocks/server'

beforeAll(() => server.listen({
    onUnhandledRequest(req) {
      console.error(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      )
    },
}))

// test('Data being fetched correctly from the API.', async () => {
//   const response = await store.dispatch(fetchMessages('test@gmail.com'))
//   console.log('RESPONSE: ', response)
// })

// beforeAll(() => server.listen())
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())
// console.log('TEST CONSOLE LOG')

// it('Loads and displays messages data.', async () => {
// await act(async ()=> render(<Provider store={store}><ChatsContainer/></Provider>));
//     expect(screen.getByText('value')).toBeInTheDocument();
// })

it('Loads and displays messages data.', async () => {
    // await render(<Provider store={store}><ChatsContainer/></Provider>)
    await waitFor(() => {
      // render(<Provider store={store}><ChatsContainer/></Provider>)
    })
    await waitFor(async () => {
      // console.log('STORE DISPATCH: ', await store.dispatch(fetchMessages('test@gmail.com')))
    })
    await waitFor(() => {
        //  expect(screen.findByText(Conversations[0].messages[0].content)).toBeInTheDocument()
      })
})
 