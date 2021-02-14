import BackTop from 'components/content/backTop/BackTop'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.myScroll.scrollTo(0, 0)
    },
    isShowBackTopItem(position) {
      this.isShowBackTop = (-position.y) > 1000
    }
  }
}
