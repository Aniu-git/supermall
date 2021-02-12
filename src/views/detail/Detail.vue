<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <my-scroll class="content">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info :param-info="paramInfo"/>
      <detail-content-info :comment-info="commentInfo"/>
      <goods-list :goods="recommends"/>
    </my-scroll>

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

import myScroll from 'components/common/scroll/MyScroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from 'network/detail'

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
    GoodsList
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
      recommends: []
    }
  },
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
  height: calc(100% - 44px);
}
</style>
