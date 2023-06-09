import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, store } from "../../store";
import { Conversation } from "../../types/conversation";
import { Message } from "../../types/message";
import { formatDate } from "../../helpers/dateFilters";
interface ChatState {
  conversationsInMemory: Conversation[],
  currentChatId: string, 
  conversationOnScreen: Conversation,
  isLoading?: boolean
}

const initialState: ChatState = {
  conversationsInMemory: [],
  currentChatId: "",
  conversationOnScreen: {
    messages: [],
    adminId: "",
    customerId: ""
  },
  isLoading: false
};

interface AddConversationInMemoryProps {
  userEmail: string;
  newCustomerNumber: string;  
}

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (email: string | null | undefined) => {
    let token = localStorage.getItem('token')
    if(!token){
      token = ''
    }
    // const testEmail = 'testEmail'
    const response = await fetch(`http://localhost:3000/api/messages?email=${email}`, {
      method: 'GET',
      headers: {
        "Content-type": "Application/json",
        "authorization": `${token}`
      }
    })
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    const data = await response.json();
    const newConversationsInMemory = data.conversations.map((conversation: any, index: any) => ({
      ...conversation,
      adminReference: conversation.adminId,
      customerId: conversation.customerId.phoneNumber,
      messages: conversation.messages.map((message: any) => ({
        ...message, 
        adminReference: conversation.adminId,
        customerReference: conversation.customerId.phoneNumber,
        date: formatDate(message.date)
      }))
    }))
    return newConversationsInMemory;
  }
);

export const chatSlice = createSlice({
  name: "chat",
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
    sendMessageCustomer: (state, action: PayloadAction<string>) => {
      const newMessage: Message = {
        content: action.payload,
        adminReference: state.currentChatId,
        customerReference: state.conversationOnScreen.adminId,
        senderType: 'customer',
        date: new Date().toISOString() // convert the date to string
      }
      const conversationIndex = state.conversationsInMemory.findIndex(
        conversation => conversation.customerId === state.currentChatId
      );
      state.conversationsInMemory[conversationIndex].messages.push(newMessage);
      state.conversationOnScreen.messages.push(newMessage);
    },
    setConversationsInMemory: (state, action: PayloadAction<Conversation[]>) => {
      state.conversationsInMemory = action.payload;
    },
    setCurrentChatId: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload;
    },
    setConversationOnScreen: (state, action: PayloadAction<Conversation>) => {
      state.conversationOnScreen = action.payload;
    },
    setConversationOnScreenValues: (state, action: PayloadAction<Conversation>) => {
      const newState = {
        ...state,
        conversationOnScreen: {...action.payload}
      }
      state = newState;
    }, 
    setNewCurrentChatId: (state, action: PayloadAction<string>) => {
      state.currentChatId = action.payload
      const conversationIndex = state.conversationsInMemory.findIndex(
        conversation => conversation.customerId === action.payload
      );
      state.conversationOnScreen = state.conversationsInMemory[conversationIndex]
    },
    addConversationInMemory: (state, action: PayloadAction<AddConversationInMemoryProps>) => {
      console.log('addConversationInMemory being called.')
      console.log('addConversationInMemroy payload: ', action.payload)
      const user = action.payload.userEmail 
      const newConversation: Conversation = {customerId: action.payload.newCustomerNumber, messages: [], adminId: user}
      state.conversationsInMemory = [...state.conversationsInMemory, newConversation]
    }
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.conversationsInMemory = action.payload;
        state.conversationOnScreen = action.payload[0] || { messages: [], adminId: "", customerId: "" };
        state.currentChatId = state.conversationOnScreen.customerId
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectConversationsInMemory = (state: RootState) => {return state.chat.conversationsInMemory};
export const selectCurrentChatId = (state: RootState) => {return state.chat.currentChatId};
export const selectConversationsOnScreen = (state: RootState) => {return state.chat.conversationOnScreen};

export const {sendMessage, setNewCurrentChatId, addConversationInMemory, sendMessageCustomer, setConversationOnScreen, setConversationsInMemory, setConversationOnScreenValues} = chatSlice.actions;
export const chatActions = {
  ...chatSlice.actions,
}
export default chatSlice.reducer