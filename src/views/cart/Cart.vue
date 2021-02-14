<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list/>

    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>

</template>

<script>
  import CartList from './childComps//CartList'
  import CartBottomBar from './childComps/CartBottomBar'

  import NavBar from 'components/common/navbar/NavBar'

import { mapGetters } from 'vuex'

export default {
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 两种用法：数组和对象，对象可以自定义名字
    ...mapGetters(['cartLength'])
    // ...mapGetters({
    //   length: 'cartLength'
    // })
  }
}

</script>

<style scoped>
.cart {
  position: relative;
  height: 100vh;
}

.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  /* font-weight: 700; */
}
</style>
