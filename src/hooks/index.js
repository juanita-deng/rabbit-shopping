import { onBeforeUnmount, onMounted, ref } from 'vue'

export const useWindowScroll = () => {
  const y = ref(0)
  const x = ref(0)
  const onscroll = () => {
    y.value = window.pageYOffset // 或者使用  document.documentElement.scrollTop
    x.value = window.pageXOffset // 或者使用  document.documentElement.scrollLeft
  }
  onMounted(() => {
    window.addEventListener('scroll', onscroll)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onscroll)
  })
  return { x, y }
}
