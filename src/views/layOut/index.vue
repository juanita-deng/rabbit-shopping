<template>
  <TopBar></TopBar>
  <Header></Header>
  <CategorySticky></CategorySticky>
  <main class="app-body">
    <router-view></router-view>
  </main>
  <Footer></Footer>
</template>
<script>
import { useStore } from 'vuex'
import TopBar from './components/topbar.vue'
import Header from './components/header.vue'
import Footer from './components/footer.vue'
import CategorySticky from './components/category-sticky.vue'
export default {
  name: 'layout',
  components: { TopBar, Header, Footer, CategorySticky },
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>
<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>
