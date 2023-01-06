<template lang="pug">
v-row#home
  v-col(cols="12")
    h1 {{ currentText }}
    h1 {{ currentTime }}
  v-col(cols="12")
    v-btn(v-if="status !== 1" icon="mdi-play" variant="text" @click="startTimer")
    v-btn(v-if="status === 1" icon="mdi-pause" variant="text" @click="pauseTimer")
    v-btn(v-if="currentItem.length > 0" icon="mdi-skip-next" variant="text" @click="finishTimer")
</template>

<script setup>
import { ref, computed } from 'vue'
import { useListStore } from '@/stores/list'
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'

const list = useListStore()
// 解構資料
const { currentItem, items, timeleft } = storeToRefs(list)
// 不需要響應式，直接解構function
const { start, countdown, finish } = list
const settings = useSettingsStore()
const { selectedAlarmFile, notify } = storeToRefs(settings)
// 0 = 停止
// 1 = 倒數中
// 2 = 暫停
const status = ref(0)

let timer = 0
const startTimer = () => {
  // 如果現在是停止暫停的話，把items東西抓出來丟到進行中
  if (status.value === 0 && items.value.length > 0) {
    start()
  }
  // 如果現在有東西在倒數就開始，不會受到上面的if判斷
  if (currentItem.value.length > 0) {
    status.value = 1
    timer = setInterval(() => {
      countdown()
      if (timeleft.value === 0) {
        finishTimer()
      }
    }, 1000)
  }
}

// 暫停
const pauseTimer = () => {
  status.value = 2
  clearInterval(timer)
}
// 完成之後發出快樂的聲音
const finishTimer = () => {
  clearInterval(timer)
  status.value = 0
  const audio = new Audio()
  audio.src = selectedAlarmFile.value
  audio.play()
  if (notify.value) {
    // eslint-disable-next-line
    const notification = new Notification('事項完成', {
      body: currentText.value,
      icon: 'https://github.com/AlannaYL.png'
    })
  }
  finish()
  // 如果還有下一件事情
  if (items.value.length > 0) {
    startTimer()
  }
}

const currentText = computed(() => {
  return currentItem.value.length > 0 ? currentItem.value : items.value.length > 0 ? '點擊開始' : '沒有事項'
})

const currentTime = computed(() => {
  const m = Math.floor(timeleft.value / 60).toString().padStart(2, '0')
  const s = (timeleft.value % 60).toString().padStart(2, '0')
  return m + ':' + s
})
</script>
