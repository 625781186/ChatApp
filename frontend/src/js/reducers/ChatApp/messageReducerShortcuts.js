import { getUserId } from '../../selectors/AuthSelectors'
import { store } from '../../index'

export const setData = (state, payload) => {
  const sorted_data = payload.sort(
    (first, second) => second.unread_count - first.unread_count
  )
  return {
    ...state,
    fetching: false,
    success: true,
    error: null,
    data: sorted_data,
    active: sorted_data[0] && sorted_data[0].id
  }
}

export const setDataToOne = (state, payload) => {
  return {
    ...state,
    data: state.data.map(
      chat => chat.id === payload.id
      ? {
        ...payload,
        fetched: true
      }
      : chat
    )
  }
}

export const pushMessage = (state, payload) => {
  const chat_id = Number(payload.chat_id)
  const { sender, text, date } = payload
  const user_id = getUserId(store)
  
  return {
    ...state,
    data: state.data.map(
      chat => chat.id === chat_id
      ? {
        ...chat,
        unread_count: sender !== user_id
                      ? chat.unread_count + 1
                      : chat.unread_count,
        last_message: {
          sender: sender.id,
          text,
          date,
        },
        messages: [
          ...chat.messages,
          payload
        ]
      }
      : chat
    )
  }
}

export const deleteMessage = (state, payload) => {
  const chat_id = Number(payload.chat_id)
  const message_id = Number(payload.message_id)

  return {
    ...state,
    data: state.data.map(
      chat => chat.id === chat_id
      ? {
        ...chat,
        messages: chat.messages.filter(
          message => message.id !== message_id
        )
      }
      : chat
    )
  }
}

export const updateMessage = (state, payload) => {
  const message_id = Number(payload.id)
  
  return {
    ...state,
    data: state.data.map(
      chat => chat.messages.length > 0
      ? {
        ...chat,
        messages: chat.messages.map(
            message => message.id === message_id
          ? {
            ...message,
            ...payload,
          }
          : message
        )
      }
      : chat
    )
  }
}

export const setAsRead = (state, payload) => {
  const { chat_id, message_id } = payload
  return {
    ...state,
    data: state.data.map(
      chat => chat.id === chat_id
        ? {
          ...chat,
          unread_count: chat.unread_count - 1,
          messages: chat.messages.map(
            message => message.id === message_id
            ? {
              ...message,
              unread: false
            }
            : message
          )
        }
        : chat
    )
  }
}

export const pushChat = (state, payload) => {
  return {
    ...state,
    data: [
      ...state.data,
      payload,
    ]
  }
}

export const popChat = (state, payload) => {
  return {
    ...state,
    data: state.data.filter(
      chat => chat.id !== payload.id
    )
  }
}

export const setFilters = (state, payload) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      ...payload
    }
  }
}

export const clearFilters = (state, initialState) => {
  return {
    ...state,
    filters: initialState.filters
  }
}