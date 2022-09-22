import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
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
/**
 * @param {*} apiFn 发送请求获取数据的接口
 * @returns list:接口返回的数据 target:监听的进入/移出可视区的dom
 * useIntersectionObserver 官方文档:https://vueuse.org/core/useintersectionobserver/#demo
 */
export const useLazyLoad = (apiFn) => {
  const target = ref(null) // 被观察的对象
  const list = ref([]) // 不同的API函数
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        stop()
        apiFn().then((data) => {
          list.value = data.result
        })
      }
    },
    { threshold: 0 }
  )
  return { target, list }
}
