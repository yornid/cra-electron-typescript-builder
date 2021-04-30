import React from 'react'
import { observer } from 'mobx-react-lite'

import s from './myWord.module.css'

function MyWord({ myWord, changeHandler, submitHandler }: any) {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => changeHandler(e.currentTarget.value)
  return (
    <div className={s.myWord}>
      <textarea className={s.wordBox} value={myWord} onChange={onChange} />
      <button onClick={submitHandler}>send</button>
    </div>
  )
}

export const MyWordHOC = observer(({ Chat }: any) => {
  return (
    <MyWord myWord={Chat.myWord} changeHandler={Chat.setWord} submitHandler={Chat.sendWord} />
  )
})

export default MyWord