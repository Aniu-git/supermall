<template>
  <div class="bottom-bar">
    <div class="check-content" >
      <check-button
        class="check-all"
        :is-checked="isSelectAll"
        @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkedLength() {
      return this.cartList.filter(item => item.checked).reduce((preCount, item) => {
        return preCount + item.count
      }, 0)
    },
    isSelectAll() {
      if (this.cartList.length === 0 ) return false
      // return !(this.cartList.filter(item => !item.checked).length)
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) { // 全部选中
        this.cartList.forEach(item => item.checked = false)
      } else { //非全部选中，即有没选中的商品
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}

</script>

<style scoped>
.bottom-bar {
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  bottom: 49px;

  line-height: 40px;
  height: 40px;
  font-size: 14px;

  background-color: #eee;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-all {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 80px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>
