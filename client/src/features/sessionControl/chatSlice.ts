import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';
import { Conversation } from '../../types/conversation';
import { Conversations } from '../../data/conversations';
import { Message } from '../../types/message';

export interface chatState {
  conversationsInMemory: Conversation[],
  currentChatId: string, 
  conversationOnScreen: Conversation;
}

let initialState: chatState = {
  conversationsInMemory: Conversations,
  currentChatId: Conversations[Conversations.length - 1].customerId,
  conversationOnScreen: Conversations[Conversations.length - 1]
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<string>) => {
      const newMessage: Message = {
        content: action.payload,
        senderReference: state.currentChatId,
        recipientReference: state.conversationOnScreen.adminId,
        senderType: 'admin',
        date: new Date().toISOString() // convert the date to string
      }
      const conversationIndex = state.conversationsInMemory.findIndex(
        conversation => conversation.customerId === state.currentChatId
      );
      state.conversationsInMemory[conversationIndex].messages.push(newMessage);
      state.conversationOnScreen.messages.push(newMessage);
    },
    setConversationsInMemory: (state, action: PayloadAction<Conversation[]>) => {
    },
    setConversationOnScreen: (state, action: PayloadAction<String>) => {
      console.log('setConversationOnScreen being called.')
      const conversationIndex = state.conversationsInMemory.findIndex(
        conversation => conversation.customerId === action.payload && conversation.adminId === "test@gmail.com"
      );
      state.conversationOnScreen = state.conversationsInMemory[conversationIndex]
    }, 
    setNewCurrentChatId: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload
      const conversationIndex = state.conversationsInMemory.findIndex(
        conversation => conversation.customerId === action.payload && conversation.adminId === "test@gmail.com"
      );
      state.conversationOnScreen = state.conversationsInMemory[conversationIndex]
    }
  },
})

export const selectConversationsInMemory = (state: RootState) => {return state.chat.conversationsInMemory};
export const selectCurrentChatId = (state: RootState) => {return state.chat.currentChatId};
export const selectConversationsOnScreen = (state: RootState) => {return state.chat.conversationOnScreen};

export const {sendMessage, setNewCurrentChatId, setConversationOnScreen } = chatSlice.actions;
export const chatActions = {
  ...chatSlice.actions,
}
export default chatSlice.reducer