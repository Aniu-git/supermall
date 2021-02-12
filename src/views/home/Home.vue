<template>
  <div id="home">
    <!-- 导航栏 -->
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <!-- 设置better-scroll -->
    <my-scroll
      class="content"
      ref="myScroll"
      :probe-type-value=3
      @getScrollPostion="contentScroll"
      :pull-up-load-value=true
      @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners"/>
      <!-- 推荐栏 -->
      <home-recommend-view :recommends="recommends"/>
      <!-- 本周流行栏 -->
      <home-feature-view/>
      <!-- 首页商品分类栏 -->
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"/>
      <!-- 商品列表 -->
      <goods-list :goods="showGoods"/>
    </my-scroll>

    <!-- 回到顶部按钮 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommendView from './childComps/HomeRecommendView'
import HomeFeatureView from './childComps//HomeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import MyScroll from 'components/common/scroll/MyScroll'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import GoodsListItem from 'components/content/goods/GoodsListItem'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'



export default {
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    TabControl,
    GoodsList,
    GoodsListItem,
    MyScroll,
    BackTop
  },
  data(){
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    // 事件监听相关方法：
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      this.$refs.myScroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    // 网络请求相关方法：
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.myScroll.finishPullUp();
      })
    }

  }
}

</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;

  }

  .tab-control {
    /* position: sticky; */
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /* .content {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
    margin-top: 44px;
  } */

</style>
