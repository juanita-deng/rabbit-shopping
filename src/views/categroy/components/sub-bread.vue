<template>
  <RabbitBread>
    <RabbitBreadItem>首页</RabbitBreadItem>
    <RabbitBreadItem
      v-if="sub.topCategory"
      :to="`/category/${sub.topCategory.id}`"
    >
      {{ sub.topCategory.name }}
    </RabbitBreadItem>
    <Transition name="fade-right" mode="out-in">
      <RabbitBreadItem v-if="sub.subCategory" :key="sub.subCategory.id">
        {{ sub.subCategory.name }}
      </RabbitBreadItem>
    </Transition>
  </RabbitBread>
</template>
<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'sub-bread',
  setup() {
    const store = useStore()
    const route = useRoute()
    const sub = computed(() => {
      const obj = {
        topCategory: '',
        subCategory: ''
      }
      store.state.category.list.forEach((topCategory) => {
        topCategory.children &&
          topCategory.children.forEach((subCategory) => {
            if (subCategory.id === route.params.id) {
              obj.topCategory = topCategory
              obj.subCategory = subCategory
            }
          })
      })
      return obj
    })
    return { sub }
  }
}
</script>
<style lang="less" scoped></style>
