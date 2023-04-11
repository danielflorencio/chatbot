import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../store";
import { Conversation } from "../../types/conversation";
import { Message } from "../../types/message";
import { useAppDispatch } from "../../hooks";

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
    return data.conversations;
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
      console.log('setConversationOnScreenValues being called.')
      // console.log('format expected by the dispatcher: ', state.conversationOnScreen)
      const newState = {
        ...state,
        conversationOnScreen: {...action.payload}
      }
      state = newState;
    }, 
    setNewCurrentChatId: (state, action: PayloadAction<string>) => {
      // console.log('conversationInMemory on chat Change ------------------------: ', state.conversationsInMemory.toString())
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
        // Set the first conversation as the conversation on screen by default
        state.conversationOnScreen = action.payload[0] || { messages: [], adminId: "", customerId: "" };
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.isLoading = false;
      });
  },
});


// export const fetchUserMessages = (userEmail: string | null | undefined) => async (dispatch: AppDispatch, getState: RootState) => {
//   // const userEmail = getState().SessionState.email
//   console.log('fetchUserMessages being called.')
//   const response = await fetch('/api/getOneChatMessages', {
//     method: 'POST',
//     body: JSON.stringify({email: userEmail}),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const data = await response.json();

//   console.log('data being received on fetchUserMessages: ', data.conversations)
//   if (data.status === 'ok') {
//     dispatch(setConversationsInMemory(data.conversations));
//   } else {
//     console.log("Error fetching user messages");
//   }
//   // console.log('newConversationsInMemory: ')
// };

// export const fetchUserMessages = (userEmail: string | null | undefined) => async (dispatch: AppDispatch, getState: RootState) => {
//   // const userEmail = getState().SessionState.email
//   console.log('fetchUserMessages being called.')
//   const response = await fetch('/api/getOneChatMessages', {
//     method: 'POST',
//     body: JSON.stringify({email: userEmail}),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
//   const data = await response.json();

//   console.log('data being received on fetchUserMessages: ', data.conversations)
//   if (data.status === 'ok') {
//     dispatch(setConversationsInMemory(data.conversations));
//   } else {
//     console.log("Error fetching user messages");
//   }
//   // console.log('newConversationsInMemory: ')
// };


export const selectConversationsInMemory = (state: RootState) => {return state.chat.conversationsInMemory};
export const selectCurrentChatId = (state: RootState) => {return state.chat.currentChatId};
export const selectConversationsOnScreen = (state: RootState) => {return state.chat.conversationOnScreen};

export const {sendMessage, setNewCurrentChatId, setConversationOnScreen, setConversationsInMemory, setConversationOnScreenValues} = chatSlice.actions;
export const chatActions = {
  ...chatSlice.actions,
}
export default chatSlice.reducer