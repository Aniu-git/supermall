import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { Swipe, SwipeItem } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
