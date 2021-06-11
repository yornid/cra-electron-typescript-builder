import React from 'react';

import { useRootContext } from './StoreProvider'

import StreamVideo from './components/StreamVideo'
import ChatBox from './components/ChatBox'
import FeedBox from './components/FeedBox'

import s from './app.module.css';

function App() {
  const rootCtx: any = useRootContext()
  return (
    <div className={s.app}>
      <div>
        add some component
      </div>
      <div className={s.feeds}>
        <h2>Feeds</h2>
        <FeedBox Feed={rootCtx.Feed} />
      </div>
      <div className={s.main}>
        <StreamVideo /> 
        <div>
          <h2>Ads</h2>
          <ul>
            <li className={s.adWrap}><iframe title="first ad" className={s.ad} frameBorder="0" scrolling="no" src="https://codecanyon.img.customer.envatousercontent.com/files/199668283/item_preview.png?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=fc8158867c973fed95f0aba517019dd2" /></li>
          </ul>
        </div>
      </div>
       <ChatBox Chat={rootCtx.Chat} />
    </div>
  );
}

export default App;