import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store';
import { Conversation } from '../../types/conversation';
import { Conversations } from '../../data/conversations';
import { Message } from '../../types/message';



// export const fetchMessages = createAsyncThunk('messages/fetchMessages', async (_, {getState}) => {
  
//   const email = () => {
//     return async(getState: any) => {
//       getState().sessionState.email;
//     }
//   }

//   const response = await fetch('http://localhost:3000/api/getOneChatMessages', {
//         method: 'POST',
//         headers: {
//           'Content-type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email
//         })
//       })
//       const data = await response.json()
//       console.log('data being received by the useEffect: ', data)
//       if (data.status !== 'ok'){
//         // window.location.href = '/'
//       } else if(data.status === 'ok'){
//         // console.log('data: ', data); console.log('data.conversations: ', data.conversations);
//         const conversations: Conversation[] = data.conversations.map((conversation: any) => {
//           return {
//             messages: conversation.messages.map((message: any) => {
//               return {
//                 content: message.content,
//                 adminReference: message.adminReference,
//                 customerReference: conversation.customerId.phoneNumber,
//                 senderType: message.senderType,
//                 date: message.date
//               }
//             }),
//             adminId: conversation.adminId,
//             customerId: conversation.customerId.phoneNumber
//           }
//         });
//         // console.log('New conversations Data formatted: ', conversations)        // dispatch(setConversationsInMemory(conversations)); // dispatch(setConversationOnScreenValues(conversations));
//       }
  
//   // const response = await fetch('/api/messages');
//   // const messages = await response.json();
//   // return getStat
// });

export interface chatState {
  conversationsInMemory: Conversation[],
  currentChatId: string, 
  conversationOnScreen: Conversation,
  // status?: string,
  // error?: string;
}

let initialState: chatState = {
  conversationsInMemory: Conversations,
  currentChatId: Conversations[Conversations.length - 1].customerId,
  conversationOnScreen: Conversations[Conversations.length - 1],
  // status: '',
  // error: ''
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<string>) => {
      const newMessage: Message = {
        content: action.payload,
        adminReference: state.currentChatId,
        customerReference: state.conversationOnScreen.adminId,
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
      // const newConversationsInMemory: Conversation[] = action.payload
      console.log('setConversationsInMemory being called.')
      console.log('conversationsInMemory Format: ', state.conversationsInMemory)
      console.log('action.payload format: ', action.payload)
      // const newState = {
      //   ...state,
      //   conversationsInMemory: action.payload
      // }
      // console.log('newState: ', newState)
      // state = newState;
      state.conversationsInMemory = action.payload;

    },
    setConversationOnScreen: (state, action: PayloadAction<String>) => {
      // console.log('setConversationOnScreen being called.')
      const conversationIndex = state.conversationsInMemory.findIndex(
        conversation => conversation.customerId === action.payload && conversation.adminId === "test@gmail.com"
      );
      state.conversationOnScreen = state.conversationsInMemory[conversationIndex]
    }, 
    setNewCurrentChatId: (state, action: PayloadAction<string>) => {
      // console.log('conversationInMemory on chat Change ------------------------: ', state.conversationsInMemory.toString())
      state.currentChatId = action.payload
      const conversationIndex = state.conversationsInMemory.findIndex(
        conversation => conversation.customerId === action.payload && conversation.adminId === "test@gmail.com"
      );
      state.conversationOnScreen = state.conversationsInMemory[conversationIndex]
    },
    setConversationOnScreenValues: (state, action: PayloadAction<Conversation>) => {
      console.log('setConversationOnScreenValues being called.')
      // console.log('format expected by the dispatcher: ', state.conversationOnScreen)
      const newState = {
        ...state,
        conversationOnScreen: {...action.payload}
      }
      state = newState;
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchMessages.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(fetchMessages.fulfilled, (state, action) => {
  //       state.status = 'succeeded';
  //       state.messages = action.payload;
  //     })
  //     .addCase(fetchMessages.rejected, (state, action) => {
  //       state.status = 'failed';
  //       state.error = action.error.message;
  //     });
  // },
})

export const selectConversationsInMemory = (state: RootState) => {return state.chat.conversationsInMemory};
export const selectCurrentChatId = (state: RootState) => {return state.chat.currentChatId};
export const selectConversationsOnScreen = (state: RootState) => {return state.chat.conversationOnScreen};

export const {sendMessage, setNewCurrentChatId, setConversationOnScreen, setConversationsInMemory, setConversationOnScreenValues} = chatSlice.actions;
export const chatActions = {
  ...chatSlice.actions,
}
export default chatSlice.reducer