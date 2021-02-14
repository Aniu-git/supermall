<template>
  <div class="cart-list">
    <my-scroll class="content" ref="myScroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="item.iid"
        :item-info="item"/>
    </my-scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import myScroll from 'components/common/scroll/MyScroll'

import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    myScroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.myScroll.scroll.refresh()
  }
}

</script>

<style scoped>
.content {
  position: absolute;
  overflow: hidden;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 89px;

}
</style>
