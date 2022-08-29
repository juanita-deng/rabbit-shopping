<template>
  <TopBar></TopBar>
  <Header></Header>
</template>
<script>
import TopBar from './components/topbar.vue'
import Header from './components/header.vue'
export default {
  name: 'layout',
  components: { TopBar, Header }
}
</script>
