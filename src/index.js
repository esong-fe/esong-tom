import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// 加载配置
import config from './config';

// 加载页面组件
import login from './pages/login/index';
import home from './pages/home/index';

Vue.use( VueRouter );
Vue.use( VueResource );

Vue.http.root = config.apiRoot;

var router = new VueRouter();

router.map( {
  '/' : {
    component : home
  } ,
  '/login' : {
    component : login
  }
} );

router.redirect( {
  '*' : '/'
} );

router.start( {
  replace : false ,
  template : '<router-view></router-view>'
} , 'body' );
