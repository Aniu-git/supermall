<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'

import Pullup from '@better-scroll/pull-up'
BScroll.use(Pullup)

import ObserveDOM from '@better-scroll/observe-dom'
BScroll.use(ObserveDOM)

import ObserveImage from '@better-scroll/observe-image'
BScroll.use(ObserveImage)

export default {
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeTypeValue: {
      type: Number,
      default: 0
    },
    pullUpLoadValue: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      observeImage: {
        debounceTime: 100
      },
      click: true,
      probeType: this.probeTypeValue,
      pullUpLoad: this.pullUpLoadValue

    })
    // 2.监听滚动位置
    if (this.probeTypeValue === 2 || this.probeTypeValue === 3) {
      this.scroll.on('scroll', (position) => {
        this.$emit('getScrollPostion', position)
      })
    }
    // 3.监听上拉事件
    if (this.pullUpLoadValue){
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time=800) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  },
}

</script>

<style scoped>

</style>
