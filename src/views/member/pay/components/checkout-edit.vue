<template>
  <RabbitDialog title="添加收货地址" v-model:visible="showDialog">
     <div class="xtx-form">
      <div class="xtx-form-item">
        <div class="label">收货人：</div>
        <div class="field">
          <input class="input" placeholder="请输入收货人" v-model="formDate.receiver"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">手机号：</div>
        <div class="field">
          <input class="input" placeholder="请输入手机号" v-model="formDate.contact"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地区：</div>
        <div class="field">
          <RabbitCity placeholder="请选择所在地区" :fullLocation="formDate.fullLocation" @getCityInfo="getCityInfo"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">详细地址：</div>
        <div class="field">
          <input class="input" placeholder="请输入详细地址" v-model="formDate.address"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">邮政编码：</div>
        <div class="field">
          <input class="input" placeholder="请输入邮政编码" v-model="formDate.postalCode"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">地址标签：</div>
        <div class="field">
          <input class="input" placeholder="请输入地址标签，逗号分隔" v-model="formDate.addressTags"/>
        </div>
      </div>
      <div class="xtx-form-item">
        <div class="label">是否默认:</div>
        <div class="field">
            <RabbitSwitch :active="1" :inactive="0" v-model="formDate.isDefault" />
        </div>
      </div>
    </div>
    <template #footer>
      <RabbitButton
        type="gray"
        style="margin-right: 20px"
        @click="showDialog = false"
      >
        取消
      </RabbitButton>
      <RabbitButton type="primary" @click="confirm">确认</RabbitButton>
    </template>
  </RabbitDialog>
</template>

<script>
import { inject, reactive, ref } from 'vue'
import { addAddress } from '@/api/order'
import { Message } from '@/components'
export default {
  name: 'CheckoutEdit',
  setup() {
    const showDialog = ref(false)
    const open = () => {
      showDialog.value = true
    }
    const formDate = reactive({
      receiver: '',
      contact: '',
      provinceCode: '',
      cityCode: '',
      countyCode: '',
      address: '',
      postalCode: '',
      addressTags: '',
      isDefault: 0,
      fullLocation: ''
    })
    const getCityInfo = (cityInfo) => {
      formDate.cityCode = cityInfo.cityCode
      formDate.countyCode = cityInfo.countyCode
      formDate.provinceCode = cityInfo.provinceCode
      formDate.fullLocation = cityInfo.provinceName + ' ' + cityInfo.cityName + ' ' + cityInfo.countyName
    }
    const getPreorderInfo = inject('getPreorderInfo')
    const confirm = () => {
      addAddress(formDate).then((res) => {
        Message({ text: '添加收货地址成功' })
        showDialog.value = false
        getPreorderInfo()
      })
    }
    return { showDialog, open, formDate, getCityInfo, confirm }
  }
}
</script>

<style lang="less" scoped>
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
}
.xtx-form {
  padding: 0;
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
  .field {
    line-height: 50px;
  }
}
.xtx-city {
  width: 320px;
  :deep(.select) {
    height: 50px;
    line-height: 48px;
    display: flex;
    padding: 0 10px;
    justify-content: space-between;
    .placeholder {
      color: #ccc;
    }
    i {
      color: #ccc;
      font-size: 18px;
    }
    .value {
      font-size: 14px;
    }
  }
  :deep(.option) {
    top: 49px;
  }
}
</style>
