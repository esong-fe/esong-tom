import './style/global.scss';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

// 加载页面组件
import login from './pages/login/index';
import frame from './pages/frame/index';
import home from './pages/home/index';

Vue.config.debug = true;

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

Vue.use( VueRouter );

const router = new VueRouter();

router.map( {
  '/' : {
    component : frame ,
    subRoutes : {
      '/' : {
        name : 'home' ,
        component : home
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
