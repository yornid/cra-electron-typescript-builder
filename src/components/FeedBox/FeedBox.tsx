import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import classnames from 'classnames'
import axios from 'axios'

import { FeedType } from '../../StoreProvider'
import { randomFeeds } from '../../utils'

import s from './feedBox.module.css'

const t: number = 5000

// TODO: remove
// squash test 1
// squash test 2
// squash test 3

function FeedBox({ Feed }: any) {
  useEffect(() => {
    async function loop() {
      try {
        await axios.get('/feeds')
      } catch (e) {
        Feed.updateFeeds(randomFeeds())
      }
    }
    loop()
    const tId = setInterval(loop, t)
    return () => clearInterval(tId)
  }, [Feed])
  return (
    <ul className={s.feedBox}>
      { Feed.feeds.map((item: FeedType) => (
        <li className={s.wrap} key={item.id}>
          <img className={classnames('img', s.img)} src={item.imgURL} alt={item.id} />
          <div className={s.right}>
            <h4 className={s.break}>{item.title}</h4>
            <small className={s.break}>{item.desc}</small>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default observer(FeedBox)