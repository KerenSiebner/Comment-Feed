import { msgService } from '../services/msg.service'
import { store } from './store.js'
import { ADD_MSG, SET_MSGS } from './msg.reducer'

// Action Creators

export function getActionAddMsg(msg) {
  return { type: ADD_MSG, msg }
}

export async function loadMsgs() {
  try {
    const Msgs = await msgService.query()
    store.dispatch({ type: SET_MSGS, Msgs })

  } catch (err) {
    console.log('MsgActions: err in loadMsgs', err)
    throw err
  }
}

export async function addMsg(msg) {
  try {
    const addedMsg = await msgService.add(msg)
    store.dispatch(getActionAddMsg(addedMsg))

  } catch (err) {
    console.log('MsgActions: err in addMsg', err)
    throw err
  }
}
