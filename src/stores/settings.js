import { defineStore } from 'pinia'

export const useSettingsStore = defineStore({
  // 這個 store 的 id
  id: 'settings',
  // 這個 store 存了哪些資料
  state () {
    return {
      // tomato 鈴聲
      alarms: [
        { id: 1, name: 'Alarm', file: new URL('@/assets/alarm.mp3', import.meta.url).href },
        { id: 2, name: 'Yay', file: new URL('@/assets/yay.mp3', import.meta.url).href }
      ],
      selectedAlarms: 2,
      notify: false
    }
  },
  actions: {
    async toggleNotify () {
      // 判斷是否有通知
      if (!this.notify && 'Notification' in window) {
        const permission = await Notification.requestPermission()
        // 如果有通知，判斷是否有取得權限
        if (permission === 'granted') {
          this.notify = true
        }
      } else {
        this.notify = false
      }
    }
  },
  getters: {
    selectedAlarmFile () {
      const i = this.alarms.findIndex(alarm => alarm.id === this.selectedAlarms)
      return this.alarms[i].file
    }
  },
  persist: {
    key: 'Dodoro-settings',
    path: ['selectedAlarms', 'notify']
  }
})
