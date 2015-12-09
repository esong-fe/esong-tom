/**
 * 自带的过滤器是单向的，这个过滤器用于将用户输入的值全变成大写之后再保存到 model 里。
 * @see http://vuejs.org/guide/custom-filter.html#Two-way_Filters
 */

import Vue from 'vue';

Vue.filter( '2uppercase' , {
  write ( val ) {
    return val.toUpperCase();
  }
} );
