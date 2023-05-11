
import '@testing-library/jest-dom'
import {render} from "@testing-library/react"
import App from '../App'
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'


test('The app renders.', () => {
    render(<BrowserRouter><App></App></BrowserRouter>)
})