
import '@testing-library/jest-dom'
import {render} from "@testing-library/react"
import { store } from '../store'
import { Provider } from 'react-redux'
import ChatList from '../components/ChatsContainer/components/ChatList'

test('The ChatList component renders.', () => {
    render(<Provider store={store}><ChatList displayState='block'/></Provider>)
})