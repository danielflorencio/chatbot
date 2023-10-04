import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { selectUserEmail, selectUserIsLogged } from './features/sessionControl/sessionSlice'
import { selectConversationsInMemory, selectConversationsOnScreen, selectCurrentChatId } from './features/sessionControl/chatSlice'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useUserEmail = () => useAppSelector(state => selectUserEmail(state))
export const useLoginStatus = () => useAppSelector(state => selectUserIsLogged(state))

export const useConversationsInMemory = () => useAppSelector(state => selectConversationsInMemory(state));
export const useConversationsOnScreen = () => useAppSelector(state => selectConversationsOnScreen(state));
export const useCurrentChatId = () => useAppSelector(state => selectCurrentChatId(state));