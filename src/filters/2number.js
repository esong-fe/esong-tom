/**
 * 将用户输入的字符串转换为数字
 */
import Vue from 'vue';

Vue.filter( '2number' , {
  write ( val ) {
    return Number( val );
  }
} );
