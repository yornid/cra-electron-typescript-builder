import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { observer } from 'mobx-react-lite'

import { DialogType } from '../../StoreProvider'

import s from './dialogs.module.css';

const t: number = 300

function Dialogs({ dialogs = [] }: any) {
  const el = useRef<HTMLDivElement>(null)
  let sId: any
  let [tof, setToF] = useState(true)
  const detectScroll = () => {
    clearTimeout(sId)
    sId = setTimeout(() => {
      if (el && el.current) {
        const c = el.current
        const newToF = c.scrollTop + c.clientHeight >= c.scrollHeight
        if (newToF !== tof) {
          setToF(newToF)
        }
      }
    }, t)
  }
  useEffect(() => () => clearInterval(sId))
  useLayoutEffect(() => {
    if (tof && el.current) {
      el.current.scrollTop = el.current.scrollHeight
    }
  })
  return (
    <div ref={el} className={s.dialogs} onScroll={detectScroll}>
      <ul className={s.wrap}>
        { dialogs.map((d: DialogType) => (
          <li className={classnames(s.item, { [s.owner]: d.owner })} key={d.ts}>
            <span className={s.name}>{ d.name }: </span>
            <span className={s.say}>{ d.word }</span>
            <small className={s.time}>{ d.time }</small>
          </li>
        )) }
      </ul>
    </div>
  )
}

export default observer(Dialogs)