/**
 * 登录逻辑。
 * 目前的 Tom 系统使用摘要认证，类似于 sessionStorage，浏览器不完全关闭则始终保持登录状态。
 */

import template from './tpl.html';

export default {
  template ,
  methods : {
    login() {
      // todo 使用 VueResource
      const x = new XMLHttpRequest();
      x.open('get','https://localhost:8443/tom/');
      x.send();
    }
  }
};
