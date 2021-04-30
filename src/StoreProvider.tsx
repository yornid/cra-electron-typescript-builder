import React, { createContext, useContext } from 'react'
import { makeAutoObservable, runInAction, observable } from "mobx"
import axios from 'axios'

import { randomDialog, Queue } from './utils'

const name = 'Ronald'

class Store {
  Chat
  Feed
  constructor() {
    this.Chat = new Chat()
    this.Feed = new Feed()
  }
}

export interface FeedType {
  id: string
  imgURL: string
  title: string
  desc: string
}

class Feed {
  feedsQ = new Queue()
  feeds: FeedType[] = []

  constructor() {
    makeAutoObservable(this, {
      feedsQ: false,
      feeds: observable.ref,
    })
  }

  updateFeeds(feeds: FeedType[]) {
    const Q = this.feedsQ
    for (let item of feeds) Q.push(item)
    for (let i = Q.size(); i > 20; i--) Q.pop()
    const a = new Array(Q.size())
    let h = Q.head
    let i = Q.size() - 1
    while (h) {
      a[i--] = h.val
      h = h.next
    }
    this.feeds = a
  }
}

export interface DialogType { 
  name: string
  word: string
  time: string
  ts: number
  owner: boolean
}

class Chat {
  dialogs: DialogType[] = []
  myWord: string = ''

  constructor() {
    makeAutoObservable(this)
  }

  setWord = (s: string): void => {
    this.myWord = s;
  }

  sendWord = (): void => {
    if (this.myWord.trim() === '') return
    const d = new Date();
    const m = d.getMinutes();
    this.dialogs.push({
      name,
      time: d.getHours() + ':' + (m < 10 ? '0' : '') + m,
      ts: d.getTime(),
      word: this.myWord,
      owner: true,
    })
    this.myWord = ''
  }

  getLatestDialogs = async () => {
    try {
      await axios.get('/dialogs')
    } catch (e) {
      let dialog: any = randomDialog()
      if (dialog !== null) {
        runInAction(() => this.dialogs.push(dialog))
      }
    }
  }
}

const ctx = createContext({})
export const useRootContext = () => useContext(ctx)

interface props {
  children: React.ReactNode
}

const StoreProvider = ({ children }: props) => (
  <ctx.Provider value={new Store()}>
    { children }
  </ctx.Provider>
)

export default StoreProvider