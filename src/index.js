import 'babel-polyfill';

// 样式
import './style/global.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// 全局组件
import tab from 'vue-strap/src/Tab.vue';
import tabset from 'vue-strap/src/Tabset.vue';
import accordion from 'vue-strap/src/Accordion.vue';
import panel from 'vue-strap/src/Panel.vue';
import alert from 'vue-strap/src/Alert.vue';

// 加载页面组件
import login from './pages/login/index'; // 登录页
import frame from './pages/frame/index'; // 整体框架
import dashboard from './pages/dashboard/index'; // Dashboard
import inbound from './pages/inbound/index'; // 入库页面

// 全局过滤器
import './filters/index';

Vue.config.debug = true;

// 注册 vue-strap 的一些全局组件
Vue.component( 'tab' , tab );
Vue.component( 'tabs' , tabset );
Vue.component( 'accordion' , accordion );
Vue.component( 'panel' , panel );
Vue.component( 'alert' , alert );

// 安装并设置 vue-resource
Vue.use( VueResource );

// 登录成功之后会设置服务器地址，
// 而 Vue.http.options.root 不支持设置一个网址为 root，
// 所以只能在 beforeSend 里加上
Vue.http.options.beforeSend = ( request , options )=> {
  const {url} = options;
  if ( url[ 0 ] === '/' ) {
    options.url = localStorage.server + url;
  }
};

// 安装并设置 vue-router
Vue.use( VueRouter );

const router = new VueRouter();

router.map( {
  '/frame' : {
    component : frame ,
    subRoutes : {
      '/dashboard' : {
        name : 'dashboard' ,
        component : dashboard
      } ,
      '/inbound' : {
        name : 'inbound' ,
        component : inbound
      }
    }
  } ,
  '/login' : {
    name : 'login' ,
    component : login
  }
} );

router.beforeEach( transition => {
  const {to} = transition;
  if ( sessionStorage.logged || to.name === 'login' ) {
    transition.next();
  } else {
    transition.redirect( '/login?back=' + to.path );
  }
} );

router.redirect( {
  '*' : { name : 'dashboard' }
} );

router.start( {
  replace : false ,
  template : '<router-view></router-view>'
} , 'body' );
