import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible/flexible'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Lazyload } from 'vant';
Vue.use(Lazyload);

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});
import { PullRefresh } from 'vant';
Vue.use(PullRefresh);
//注册axios, 这样就可以在组件里面使用
Vue.use(VueAxios, axios)
import Stick from 'vue-stick'
Vue.use(Stick)
import {
  Button,
  Icon,
  Tabbar,
  TabbarItem,
  Search,
  NavBar,
  List,
  ShareSheet,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  Field,
  ActionSheet,
  Dialog,
  Tab,
  Tabs,
  DropdownMenu,
  DropdownItem,
} from 'vant';
Vue
  .use(Button)
  .use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(NavBar)
  .use(List)
  .use(ShareSheet)
  .use(CellGroup)
  .use(Cell)
  .use(Swipe)
  .use(SwipeItem)
  .use(Field)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)
  .use(Dialog)
  .use(DropdownMenu)
  .use(DropdownItem)
Vue.config.productionTip = false
import waterfall from 'vue-waterfall2'
Vue.use(waterfall)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
