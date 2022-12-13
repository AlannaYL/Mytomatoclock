import { defineStore } from 'pinia'

const time = parseInt(import.meta.env.VITE_TIME)
const timeBreak = parseInt(import.meta.env.VITE_TIME_BREAK)

export const useListStore = defineStore({
  id: 'list',
  state () {
    return {
      // 輸入的事件
      items: [],
      // 完成的事件
      finishedItems: [],
      // 進行中的事件
      currentItem: '',
      // 每個事項一個nuumber
      id: 1,
      // 是否暫停
      break: false,
      // 倒數計時
      timeleft: time
    }
  },
  // 這裡放所有修改 state 的 function
  actions: {
    addItem (name) {
      // 用 this. 指向 state
      this.items.push({
        id: this.id++,
        name,
        edit: false,
        model: name
      })
    },
    editItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].edit = true
    },
    delItem (id) {
      const i = this.getItemIndexById(id)
      this.items.splice(i, 1)
    },
    confirmEditItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].name = this.items[i].model
      this.items[i].edit = false
    },
    undoEditItem (id) {
      const i = this.getItemIndexById(id)
      this.items[i].model = this.items[i].name
      this.items[i].edit = false
    },
    getItemIndexById (id) {
      return this.items.findIndex(item => item.id === id)
    },
    start () {
      // this.currentItem = this.items[0].name
      // this.items.splice(0, 1)
      // 判斷是否有下一件事情
      this.currentItem = this.break ? '休息一下' : this.items.shift().name
    },
    countdown () {
      this.timeleft--
    },
    finish () {
      // 如果現在不是休息time
      if (!this.break) {
        this.finishedItems.push({
          name: this.currentItem,
          id: this.id++
        })
      }

      // 目前狀態清空
      this.currentItem = ''
      // 判斷現在有沒有東西
      if (this.items.length > 0) {
        // 第一件事情 this.break = false，有第二件事情改為 true
        this.break = !this.break
      }
      this.timeleft = this.break ? timeBreak : time
    },
    delFinishedItem (id) {
      const i = this.finishedItems.findIndex(item => item.id === id)
      this.finishedItems.splice(i, 1)
    }
  },
  persist: {
    key: 'Dodoro-list'
  }
})
