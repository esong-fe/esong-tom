/**
 * 登录逻辑。
 * 目前的 Tom 系统使用摘要认证，类似于 sessionStorage，浏览器不完全关闭则始终保持登录状态。
 */
import Vue from 'vue';
import template from './tpl.html';

export default {
  template ,
  data : ()=>({
    // 将上次登录的服务器地址保存在 localStorage.server 中
    serverRoot : localStorage.server || (localStorage.server = 'https://localhost:8443/tom') ,
    showLoginError : false
  }) ,
  methods : {
    login() {
      this.showLoginError = false;
      localStorage.server = this.serverRoot;
      this.$http.get( '/' )
        .then( ()=> {
          // 将登录状态保存在 sessionStorage.logged 中
          sessionStorage.logged = 1;
          const {$route} = this;
          $route.router.replace( $route.query.back || '/' );
        } , ()=> {
          this.showLoginError = true;
        } );
    }
  }
};
