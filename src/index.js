import 'babel-polyfill';

// 样式
import './style/global.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// 全局组件
import tab from 'vue-strap/src/Tab.vue';
import tabset from 'vue-strap/src/Tabset.vue';

// 加载页面组件
import login from './pages/login/index'; // 登录页
import frame from './pages/frame/index'; // 整体框架
import home from './pages/home/index'; // 首页
import dashboard from './pages/dashboard/index'; // dashboard

Vue.config.debug = true;

// 注册 vue-strap 的一些全局组件
Vue.component( 'tab' , tab );
Vue.component( 'tabs' , tabset );

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
  '/' : {
    component : frame ,
    subRoutes : {
      '/' : {
        name : 'home' ,
        component : home
      } ,
      '/dashboard' : {
        component : dashboard
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
  '*' : { name : 'home' }
} );

router.start( {
  replace : false ,
  template : '<router-view></router-view>'
} , 'body' );
