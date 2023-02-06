import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import md5 from 'md5-hash'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'
import { getActionAddMsg, addMsg } from '../store/msg.actions'
import { store } from '../store/store'

export function CommentFeed() {
  const msgs = useSelector(storeState => storeState.msgModule.msgs)
  const [msg, setMsg] = useState({ txt: '', email: '' })
  // const [msgs, setMsgs] = useState([])
  const [filteredMsgs, setFilteredMsgs] = useState([])
  const [searchedTxt, setSearchedTxt] = useState('')


  // const dispatch = useDispatch()

  // useEffect(()=>{
  //   setFilteredMsgs(msgs)
  // },[])

  // useEffect(() => {
  //   socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
  //   return () => {
  //     socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
  //   }
  // }, [msgs])

  // function addMsg(newMsg) {
  //   dispatch(getActionAddMsg(newMsg))
  //   setFilteredMsgs(prevMsgs => [...prevMsgs, newMsg])
  // }

  async function sendMsg(ev) {
    ev.preventDefault()
    const newMsg = { email: msg.email, txt: msg.txt }
    // socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
    // for now - we add the msg ourself
    try {
      await addMsg(newMsg)
      setFilteredMsgs(prevMsgs => [...prevMsgs, newMsg])
      // setFilteredMsgs(msgs)
      setMsg({ txt: '', email: '' })
    } catch (err) {
      console.log('Failed to send message', err)
    }
  }

  function handleFormChange(ev) {
    const { name, value } = ev.target
    setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
  }

  function setFilterBy({ target }) {
    const { value } = target
    setSearchedTxt(value)
    if (!value) setFilteredMsgs(msgs)
    const regex = new RegExp(value, 'i')
    const filteredMsgs = msgs?.filter(msg => regex.test(msg.txt))
    console.log('filteredMsgs', filteredMsgs)
    setFilteredMsgs(filteredMsgs)
  }

  return (
    <section className="chat-app">
      <form onSubmit={sendMsg}>
        <input
          type="text"
          name="email"
          value={msg.email}
          placeholder="Email"
          onChange={handleFormChange} />
        <input
          type="text"
          value={msg.txt}
          onChange={handleFormChange}
          name="txt"
          autoComplete="off"
          placeholder='Message' />
        <button>SUBMIT</button>
      </form>
      <div className='filteredComments'>
      <input className="filter" type="text" value={searchedTxt} placeholder='Filter' onChange={setFilterBy} />
      <ul className='comment-list'>
        {filteredMsgs.map((msg, idx) => (
          <li className='listed-comment' key={idx}>
            <img src={`https://www.gravatar.com/avatar/${md5((msg.email).toLowerCase())}?s=50`} />
            {/* <img src={`https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50`} style={{ width: '30px' }} /> */}
            <span className='comment-details'>
            <h2 className='email'> {msg.email}: </h2>
            <h3 className='comment-txt'>{msg.txt} </h3>
            </span>
          </li>
        ))}
      </ul>
      </div>
    </section>
  )
}