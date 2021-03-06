import * as types from './index'
import * as events from './websocketEvents'


export const setActiveGroup = (id) => {
  return {
    type: types.SET_ACTIVE_GROUP,
    payload: id
  }
}

export const getGroupList = ({filter}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.GROUPS_LIST,
      data: {
        filter
      }
    }
  }
}

export const getGroupDetails = group_id => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.GROUP_GET,
      data: {
        id: group_id,
      }
    }
  }
}

export const sendMessageInGroup = ({id, text}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.GROUP_SEND,
      data: {
        id,
        text
      }
    }
  }
}

export const deleteMessageInGroup = ({id}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.GROUP_DELETE_MESSAGE,
      data: {
        id,
      }
    }
  }
}

export const updateMessageInGroup = ({id, text, stared, unread}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.GROUP_UPDATE_MESSAGE,
      data: {
        id,
        text,
        stared,
        unread,
      }
    }
  }
}

export const setAsReadGroupMessage = ({chat_id, message_id}) => {
  return {
    type: types.SET_AS_READ_GROUP_MESSAGE,
    payload: {
      chat_id, message_id
    }
  }
}

export const starGroupMessage = ({message_id, star}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.GROUP_MESSAGE_STAR,
      data: {
        id: message_id,
        stared: star
      }
    }
  }
}

export const createGroup = ({name, slug, description}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.GROUP_CREATE,
      data: {
        name, slug, description
      }
    }
  }
}

export const deleteGroup = ({id}) => {
  return {
    type: types.WEBSOCKET_SEND_REQUEST,
    payload: {
      event: events.GROUP_DELETE,
      data: {
        id
      }
    }
  }
}

export const searchGroups = ({filters}) => {
  return {
    type: types.SET_GROUPS_FILTERS,
    payload: filters
  }
}

export const clearSearchGroups = () => {
  return {
    type: types.CLEAR_GROUPS_FILTERS,
  }
}