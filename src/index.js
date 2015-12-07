import Vue from 'vue';
import VueRouter from 'vue-router';

// 加载页面组件
import login from './pages/login/index';

Vue.use( VueRouter );

var router = new VueRouter();

router.map( {
  '/login' : {
    component : login
  }
} );

router.redirect( {
  '*' : '/login'
} );

router.start( {
  replace : false ,
  template : '<router-view></router-view>'
} , 'body' );
