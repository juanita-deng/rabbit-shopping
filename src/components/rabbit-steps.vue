<script>
export default {
  // 需要使用jsx渲染出如下模版
  // <template>
  //   <div class="xtx-steps">
  //     <div class="xtx-steps-item active" v-for="i in 5" :key="i">
  //       <div class="step">
  //         <span>{{ i }}</span>
  //       </div>
  //       <div class="title">提交订单</div>
  //       <div class="desc">2021-03-18 02:11:47</div>
  //     </div>
  //   </div>
  // </template>
  name: 'RabbitSteps',
  props: {
    active: {
      type: Number,
      default: 1
    }
  },
  render() {
    const slots = this.$slots.default()
    const step = []
    slots.forEach((item) => {
      if (item.type.name === 'RabbitStep') {
        step.push(item)
      } else {
        item.children.forEach((i) => {
          step.push(i)
        })
      }
    })
    const stepItem = (
      <>
        {step.map((item, index) => (
          <div class={['xtx-steps-item', { active: index <= this.active }]}>
            <div class="step">
              <span>{index + 1}</span>
            </div>
            <div class="title">{item.props.title}</div>
            <div class="desc">{item.props.desc}</div>
          </div>
        ))}
      </>
    )
    return <div class="xtx-steps">{stepItem}</div>
  }
}
</script>
<style lang="less">
.xtx-steps {
  display: flex;
  text-align: center;
  &-item {
    flex: 1;
    &:first-child {
      .step {
        &::before {
          display: none;
        }
      }
    }
    &:last-child {
      .step {
        &::after {
          display: none;
        }
      }
    }
    &.active {
      .step {
        > span {
          border-color: @xtxColor;
          background: @xtxColor;
          color: #fff;
        }
        &::before,
        &::after {
          background: @xtxColor;
        }
      }
      .title {
        color: @xtxColor;
      }
    }
    .step {
      position: relative;
      > span {
        width: 48px;
        height: 48px;
        font-size: 28px;
        border: 2px solid #e4e4e4;
        background: #fff;
        border-radius: 50%;
        line-height: 44px;
        color: #ccc;
        display: inline-block;
        position: relative;
        z-index: 1;
      }
      &::after,
      &::before {
        content: '';
        position: absolute;
        top: 23px;
        width: 50%;
        height: 2px;
        background: #e4e4e4;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
    }
    .title {
      color: #999;
      padding-top: 12px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      padding-top: 6px;
    }
  }
}
</style>
