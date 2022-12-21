<template>
  <div>
    <RabbitTabs v-model="active" @tabClick="tabClick">
      <RabbitTabsPanel
        v-for="i in orderStatus"
        :key="i.name"
        :label="i.label"
        :name="i.name"
      >
        内容7
      </RabbitTabsPanel>
    </RabbitTabs>
  </div>
</template>

<script>
import { ref } from 'vue'
import { orderStatus } from '@/api/constant'
export default {
  name: 'RabbitOrder',
  setup() {
    const active = ref('all')
    const tabClick = ({ name, label }) => {
      console.log('name', name, label)
    }
    return { active, tabClick, orderStatus }
  }
}
</script>

<style></style>
