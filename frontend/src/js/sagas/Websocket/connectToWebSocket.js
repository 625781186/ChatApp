import { put, takeEvery, call, select } from 'redux-saga/effects'

import * as types from '../../actions'
import * as events from '../../actions/websocketEvents'
import { connectToWebSocketService } from '../../services'
import { getTokens } from '../../selectors/AuthSelectors'

let socket;
export function* connectToWebSocket() {
  const tokens = yield select(getTokens)

  try {
    socket = yield call(connectToWebSocketService)

    yield put({
      type: types.WEBSOCKET_SEND_REQUEST,
      payload: {
        event: events.AUTHENTICATE,
        data: {
          access_token: tokens.access
        }
      }
    })
  } catch (error) {
    console.log(error);
    
    yield put({
      type: types.WEBSOCKET_CONNECT_FAILURE,
      payload: error
    })
  }
}

function disconnectFromWebsocket() {
  socket.close()
}

export default function*() {
  yield takeEvery(types.WEBSOCKET_CONNECT_REQUEST, connectToWebSocket)
  yield takeEvery(types.WEBSOCKET_CLEAN_UP, disconnectFromWebsocket)
}
