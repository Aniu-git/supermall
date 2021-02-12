<template>
  <swiper class="detail-swiper">
    <swiper-item
      v-for="topImage in topImages"
      :key="topImage.id"
      class="swiper-item">
      <img :src="topImage" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImages: Array,
    default() {
      return []
    }
  }
}

</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}

</style>
