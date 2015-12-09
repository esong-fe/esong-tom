/**
 * 去除用户输入的前后空格
 */
import Vue from 'vue';

Vue.filter( '2trim' , {
  write ( val ) {
    return val.trim();
  }
} );
