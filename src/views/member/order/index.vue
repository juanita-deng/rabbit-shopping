<template>
  <div>
    <RabbitTabs v-model="active" @tabClick="tabClick">
      <RabbitTabsPanel label="全部订单" name="all"> 内容1 </RabbitTabsPanel>
      <RabbitTabsPanel label="待付款" name="unpay">内容2</RabbitTabsPanel>
      <RabbitTabsPanel label="待发货" name="deliver">内容3</RabbitTabsPanel>
      <RabbitTabsPanel label="待收货" name="receive">内容4</RabbitTabsPanel>
      <RabbitTabsPanel label="待评价" name="comment">内容5</RabbitTabsPanel>
      <RabbitTabsPanel label="已完成" name="complete">内容6</RabbitTabsPanel>
      <RabbitTabsPanel label="已取消" name="cancel">内容7</RabbitTabsPanel>
    </RabbitTabs>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'RabbitOrder',
  setup() {
    const active = ref('all')
    const tabClick = ({ name, label }) => {
      console.log('name', name, label)
    }
    return { active, tabClick }
  }
}
</script>

<style></style>
