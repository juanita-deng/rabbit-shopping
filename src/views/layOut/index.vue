<template>
  <TopBar></TopBar>
  <Header></Header>
  <main class="app-body">
    <router-view></router-view>
  </main>
  <Footer></Footer>
</template>
<script>
import TopBar from './components/topbar.vue'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
export default {
  name: 'layout',
  components: { TopBar, Header, Footer }
}
</script>
<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
