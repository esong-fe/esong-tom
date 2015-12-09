import deepAssign from 'deep-extend';

import verify from '../../libs/verify-inbound-label';
import template from './tpl.html';

const resetData = {

  // 数据
  model : {
    weight : '' , // 重量，重量应该转换为一个数字
    weightType : 'kg' , // 重量单位
    inboundLabel : '' , // 入库标签号。测试用：ORA000000002-D
    id : null , // 检查入库标签号后服务器传回来的 id
    carrierNo : '' , // 入库标签号不存在时要扫描运单号
    customerIdentifier : '' , // 客户识别码，扫描运单号后可获得
  } ,

  // alert 提示
  alertOptions : {
    msg : '' ,
    show : false ,
    duration : 3000 ,
    type : 'info'
  } ,

  // 一些在最开始被隐藏了的输入框
  show : {
    waybill : false , // 运单号
    userId : false // 客户识别码
  }
};

export default {
  http : {
    headers : {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  } ,
  template ,
  data : ()=> deepAssign( {} , resetData ) ,
  methods : {

    /**
     * 显示一条提示消息
     * @param {String} msg
     */
    alert( msg ) {
      const {alertOptions} = this;
      alertOptions.msg = msg;
      alertOptions.show = true;
    } ,

    /**
     * 聚焦到某一节点
     * @param {String} elId - v-el 指令的节点 id
     */
    focus( elId ) {
      const el = this.$els[ elId ];
      if ( el ) {
        try {
          el.focus();
        }
        catch ( e ) {
          console.log( `聚焦到元素时发生错误` , el , e );
        }
      } else {
        console.warn( '聚焦到元素时发生错误：没有指定节点 v-el:' + elId );
      }
    } ,

    /**
     * 重置状态
     */
    reset() {
      deepAssign( this , resetData );
      this.$els.weight.focus();
    } ,

    /**
     * 入库方法
     */
    inbound() {
      // todo 入库功能待完成
      alert( '入库功能待完成' );
    } ,

    /**
     * 检查入库标签号
     */
    checkLabel() {
      const {model,$els} = this , {inboundLabel} = model;
      if ( !inboundLabel ) { return; }
      if ( !verify( inboundLabel ) ) {
        this.alert( '入库标签号的格式不正确。' );
        model.inboundLabel = '';
        this.focus( 'label' );
        return;
      }
      $els.label.disabled = true;
      this.$http
        .post( '/inbound/checkInboundLabel' , `inboundLabel=${inboundLabel}` )
        .then( xhr => {
          const res = xhr.data , {id} = res;
          this.model.id = id;

          switch ( true ) {
            case id > 0: // 一切正常，直接入库
              this.inbound();
              break;
            case -1 === id: // 入库标签不存在，需要输入运单号
              this.show.waybill = true;
              this.$nextTick( ()=> {
                $els.waybill.focus();
              } );
              break;
            case -2 === id: // 入库标签号重复，直接重置状态
              this.alert( '入库标签号重复！' );
              this.reset();
              break;
          }
        } );
    } ,

    /**
     * 检查运单号
     */
    checkWaybill() {
      const {model,$els} = this , {carrierNo} = model;
      if ( !carrierNo ) { return; }
      // todo 这里有一段针对日本仓库的逻辑，用于提示格式不正确的运单号，暂时不做。
      $els.waybill.disabled = true;
      this.$http
        .post( '/inbound/checkCarrierNo' , `carrierNo=${carrierNo}` )
        .then( xhr => {
          const res = xhr.data ,
            {id,customerIdentifier} = res ,
            isEcom = customerIdentifier.startsWith( 'YI' ); // 是否是电商
          model.id = id;
          model.customerIdentifier = customerIdentifier;
          if ( id > 0 ) {
            // todo 从这里继续
          }
        } );
    }
  } ,
  ready() {
    this.$els.weight.focus();
  }
};
