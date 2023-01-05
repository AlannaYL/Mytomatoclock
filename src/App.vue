<template lang="pug">
v-app
  v-app-bar(color="transparent")
    v-app-bar-title(style="color:#ffffff") MagicTomato
    v-spacer
    v-btn(icon="mdi-home" variant="text" to="/" style="color:#ffffff")
    v-btn(icon="mdi-format-list-bulleted" variant="text" to="/list" style="color:#ffffff")
    v-btn(icon="mdi-cog" variant="text" to="/settings" style="color:#ffffff")
    v-btn(:icon="notify ? 'mdi-bell' : 'mdi-bell-off'" variant="text" style="color:#ffffff" @click="toggleNotify")
  v-main
    v-container
      router-view(v-slot="{ Component }")
        //- 換頁保留元件不被銷毀
        //- 設定 include 指定要保留的元件
        keep-alive(include="HomeView")
          //- 動態元件，將元件以 is 傳入
          component(:is="Component")
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings'
import { storeToRefs } from 'pinia'
const settings = useSettingsStore()
const { notify } = storeToRefs(settings)
const { toggleNotify } = settings
</script>
