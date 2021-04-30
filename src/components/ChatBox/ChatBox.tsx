import React, { useEffect } from 'react'

import Dialogs from './Dialogs'
import { MyWordHOC } from './MyWord'

import s from './chatBox.module.css'

const t: number = 5000;

function ChatBox({ Chat }: any) {
  useEffect(() => {
    const tId = setInterval(Chat.getLatestDialogs, t)
    return () => clearInterval(tId)
  }, [Chat])
  return (
    <div className={s.chatBox}>
      <Dialogs dialogs={Chat.dialogs} />
      <MyWordHOC Chat={Chat} />
    </div>
  )
}

export default ChatBox