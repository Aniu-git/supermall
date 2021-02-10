<template>
  <div id="home">

    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>

    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>

    <!-- <mt-swipe>
      <mt-swipe-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </mt-swipe-item>
    </mt-swipe> -->

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { getHomeMultidata } from 'network/home'
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  components: {
    NavBar,
    Swiper,
    SwiperItem,
  },
  data(){
    return {
      banners: [],
      recommends: []
    }
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
  }
}

</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  /* img {
    width: 100%;
  }
  .mint-swipe {
    height: 166px;
  } */
</style>
