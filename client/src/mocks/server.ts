import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Setup requests interception using the given handlers.
export const server = setupServer(...handlers)

// console.log('Server events: ', server.events)
// console.log('Server list handlers: ', server.listHandlers())
// console.log('Server print handlers: ', server.printHandlers())
// console.log('Server: ', server)