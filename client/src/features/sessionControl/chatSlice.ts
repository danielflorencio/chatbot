import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Conversation } from "../../types/conversation";
import { Message } from "../../types/message";
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

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (email: string | null | undefined) => {
    const response = await fetch("http://localhost:3000/api/getOneChatMessages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch messages");
    }
    const data = await response.json();
    console.log('conversation being received by the fetchMessages AsyncThunk: ', data.conversations)
    
    const newConversationsInMemory = data.conversations.map((conversation, index) => ({
      ...conversation,
      adminReference: conversation.adminId,
      customerId: conversation.customerId.phoneNumber,
      messages: conversation.messages.map(message => ({
        ...message, 
        adminReference: conversation.adminId,
        customerReference: conversation.customerId.phoneNumber
      }))
    }))
    console.log('newConversationsInMemory on createAsyncThunk: ', newConversationsInMemory);
    return newConversationsInMemory;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<string>) => {
      console.log('sendMessage being called.')
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
      console.log('state.currentChatId: ', state.currentChatId)
      console.log('state.conversationsInMemory[index]: ', state.conversationsInMemory[conversationIndex])
      console.log('conversationIndex: ', conversationIndex)
      state.conversationsInMemory[conversationIndex].messages.push(newMessage);
      state.conversationOnScreen.messages.push(newMessage);
    },
    sendMessageCustomer: (state, action: PayloadAction<string>) => {
      console.log('sendmessageCustomer being called.')
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
        conversation => conversation.customerId === action.payload && conversation.adminId === "test@gmail.com"
      );
      state.conversationOnScreen = state.conversationsInMemory[conversationIndex]
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
        console.log('conversationsBeingLoadedOnExtraReducers: ', action.payload);
        // Set the first conversation as the conversation on screen by default
        state.conversationOnScreen = action.payload[0] || { messages: [], adminId: "", customerId: "" };
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectConversationsInMemory = (state: RootState) => {return state.chat.conversationsInMemory};
export const selectCurrentChatId = (state: RootState) => {return state.chat.currentChatId};
export const selectConversationsOnScreen = (state: RootState) => {return state.chat.conversationOnScreen};

export const {sendMessage, setNewCurrentChatId, sendMessageCustomer, setConversationOnScreen, setConversationsInMemory, setConversationOnScreenValues} = chatSlice.actions;
export const chatActions = {
  ...chatSlice.actions,
}
export default chatSlice.reducer