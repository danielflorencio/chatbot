import { rest } from 'msw'
import { Conversations } from '../data/conversations'

export const handlers = [
//   rest.post('/login', (req, res, ctx) => {
//     const { username } = req.json()

//     return res(
//       ctx.json({
//         id: 'f79e82e8-c34a-4dc7-a49e-9fadc0979fda',
//         username,
//         firstName: 'John',
//         lastName: 'Maverick',
//       })
//     )
//   }),
rest.get('*/api/messages*', (req, res, ctx) => {
    const {email} = req.params
    // const email = req.params
    console.log('MOCK SERVER BEING CALLED.')
    console.log('Email received on the mock API: ', email)
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
  rest.get('*',  (req, res, ctx) => {
    console.log('please add request handler for ', req.url.toString())
    return res(
      ctx.status(500),
      ctx.json({error: 'Please add request handler.'})
    )
  }),
    rest.get('', (req, res, ctx) => {   
        return res(
            ctx.json({

            })
        )
    })
]