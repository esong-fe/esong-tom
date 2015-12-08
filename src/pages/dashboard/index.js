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
       * @type {*[]}
       */
      const tabs = [
        {
          name : '入库没有上架的包裹（加载中）' ,
          apiPath : '/dashboard/notPutinventory' ,
          items : null ,
          fields : [
            {
              title : '客户识别码' ,
              data : 'customerIdentifier'
            } ,
            {
              title : '入库标签号' ,
              data : 'inboundLabel'
            } ,
            {
              title : '包裹状态' ,
              data : 'inventoryStatus'
            } ,
            {
              title : '快递号' ,
              data : 'carrierNo'
            } ,
            {
              title : '注释' ,
              data : 'remarkEsong'
            } ,
            {
              title : '创建日期' ,
              data : 'createdDate'
            } ,
            {
              title : '创建人员' ,
              data : 'createdBy'
            } ,
            {
              title : '最后修改日期' ,
              data : 'lastModifiedDate'
            } ,
            {
              title : '最后修改人员' ,
              data : 'lastModifiedBy'
            }
          ]
        }
      ];

      const promises = tabs.map( tab => {
        return http.get( tab.apiPath )
          .then( xhr => {
            tab.items = xhr.data;
          } );
      } );

      await Promise.all( promises );

      return { tabs };
    }
  }
};
