<script>
import { provide } from 'vue'
import { useVModel } from '@vueuse/core'
export default {
  name: 'RabbitTabs',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 等同于下面的 useVModel
    // const activeName = ref('')
    // watch(
    //   () => props.modelValue,
    //   (val) => {
    //     if (val) {
    //       activeName.value = val
    //     }
    //   },
    //   {
    //     immediate: true
    //   }
    // )
    const activeName = useVModel(props, 'modelValue', emit)
    provide('activeName', activeName) // 注意:此处不能用activeName.value否则inject检测不到变化
    const changeTab = (item) => {
      activeName.value = item.props.name
      emit('tab-click', { label: item.props.label, name: item.props.name })
    }
    return { changeTab, activeName }
  },
  render() {
    const slot = this.$slots.default()
    const panel = []
    slot.forEach((item) => {
      if (item.type.name === 'RabbitTabsPanel') {
        panel.push(item)
      } else {
        item.children.forEach((i) => {
          panel.push(i)
        })
      }
    })
    const navs = (
      <nav>
        {panel.map((item) => (
          <a
            href="javascript:;"
            class={{ active: this.activeName === item.props.name }}
            onClick={() => this.changeTab(item)}
          >
            {item.props.label}
          </a>
        ))}
      </nav>
    )
    return <div class="rabbit-tabs">{[navs, panel]}</div>
  }
}
</script>

<style lang="less" scoped>
.rabbit-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
