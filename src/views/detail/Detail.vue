<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"/>
    <my-scroll
      class="content"
      ref="myScroll"
      :probe-type-value=3
      @getScrollPostion="getScrollPostion">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-content-info ref="content" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </my-scroll>

    <!-- 回到顶部按钮 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <!-- 底部工具栏 -->
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
import DetailNavBar from './childComps//DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps//DetailShopInfo'
import DetailGoodsInfo from './childComps//DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailContentInfo from './childComps/DetailContentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import myScroll from 'components/common/scroll/MyScroll'
import GoodsList from 'components/content/goods/GoodsList'

import { backTopMixin } from 'common/mixin'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'

import { mapActions } from 'vuex'


export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    myScroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailContentInfo,
    GoodsList,
    DetailBottomBar
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      tapOffsetTops: []
    }
  },
  mixins: [backTopMixin],
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid
    // 根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      // 获取顶部轮播数据
      this.topImages = res.result.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)
      // 保存商品详情数据
      this.detailInfo = data.detailInfo
      // 保存商品参数
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // 保存评论信息
      this.commentInfo = data.rate.list[0]
    })
    // 请求推荐商品数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  updated() {
    this.updataTops()
  },
  methods: {
    ...mapActions(['addCart']),
    updataTops() {
        this.tapOffsetTops = []
        this.tapOffsetTops.push(0)
        this.tapOffsetTops.push(this.$refs.param.$el.offsetTop)
        this.tapOffsetTops.push(this.$refs.content.$el.offsetTop)
        this.tapOffsetTops.push(this.$refs.recommend.$el.offsetTop)
    },
    titleClick(index) {
      this.updataTops()
      this.$refs.myScroll.scrollTo(0, -(this.tapOffsetTops[index]), 200)
    },
    getScrollPostion(position) {
      if (this.tapOffsetTops[0] <= -(position.y) && -(position.y) < this.tapOffsetTops[1]) {
        this.$refs.nav.currentIndex = 0
      } else if (this.tapOffsetTops[1] <= -(position.y) && -(position.y) < this.tapOffsetTops[2]) {
        this.$refs.nav.currentIndex = 1
      } else if (this.tapOffsetTops[2] <= -(position.y) && -(position.y) < this.tapOffsetTops[3]) {
        this.$refs.nav.currentIndex = 2
      } else if(this.tapOffsetTops[3] <= -(position.y)) {
        this.$refs.nav.currentIndex = 3
      }
      // 回到顶部按钮
      this.isShowBackTopItem(position)
    },
    // 加入购物车
    addToCart() {
      // 获取购物车需要展示的商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 将商品添加到购物车中
      this.addCart(product).then(res => {
        this.$toast.show(res)
      })
    }
  }
}

</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  /* height: calc(100% - 44px); */
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}
</style>
