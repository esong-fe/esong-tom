import Vue from 'vue';

import template from './tpl.html';

export default {
  template ,
  data : ()=>({
    tabs : null
  }) ,
  route : {
    async data() {
      const {http} = Vue;

      /**
       * 定义表格数据结构
       * todo 补完剩余表格
       * @type {*[]}
       */
      const tabs = [
        {
          name : '入库没有上架的包裹' ,
          apiPath : '/dashboard/notPutinventory' ,
          items : null ,
          fields : [
            {
              title : '客户识别码' ,
              key : 'customerIdentifier'
            } ,
            {
              title : '入库标签号' ,
              key : 'inboundLabel'
            } ,
            {
              title : '包裹状态' ,
              key : 'inventoryStatus'
            } ,
            {
              title : '快递号' ,
              key : 'carrierNo'
            } ,
            {
              title : '注释' ,
              key : 'remarkEsong'
            } ,
            {
              title : '创建日期' ,
              key : 'createdDate'
            } ,
            {
              title : '创建人员' ,
              key : 'createdBy'
            } ,
            {
              title : '最后修改日期' ,
              key : 'lastModifiedDate'
            } ,
            {
              title : '最后修改人员' ,
              key : 'lastModifiedBy'
            }
          ]
        } , {
          name : '分拣下架没有出库的订单' ,
          apiPath : '/dashboard/notOutinventory' ,
          items : null ,
          fields : [
            {
              title : '订单号' ,
              display( data ) {
                return `<a target="_blank" href="${localStorage.server}/dashboard/${data.orderNo}">${data.orderNo}</a>`;
              }
            } ,
            {
              title : '客户识别号' ,
              key : 'customerIdentifier'
            } ,
            {
              title : '包裹号' ,
              key : 'inventories'
            } ,
            {
              title : '订单状态' ,
              key : 'orderStatus'
            } ,
            {
              title : '库内状态' ,
              key : 'warehouseStatus'
            } ,
            {
              title : '订单类型' ,
              key : 'orderType'
            } ,
            {
              title : '注释' ,
              key : 'remarkEsong'
            } ,
            {
              title : '创建日期' ,
              key : 'createdDate'
            } ,
            {
              title : '创建人员' ,
              key : 'createdBy'
            } ,
            {
              title : '最后修改日期' ,
              key : 'lastModifiedDate'
            } ,
            {
              title : '最后修改人员' ,
              key : 'lastModifiedBy'
            }
          ]
        }
      ];

      const promises = tabs.map( tab => {
        return http.get( tab.apiPath )
          .then( xhr => {
            const {data} = xhr;
            tab.items = data;
            tab.name += `（${data.length}）`;
          } );
      } );

      await Promise.all( promises );

      return { tabs };
    }
  } ,
  methods : {
    getTdHtml( field , item ) {
      const {key} = field;
      if ( key ) {
        return item[ key ];
      }

      const {display} = field;
      if ( display ) {
        return display( item );
      }
    }
  }
};
