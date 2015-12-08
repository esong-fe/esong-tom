import template from './tpl.html';

export default {
  template ,
  data : ()=>({
    tabs : [
      {
        name : '入库没有上架的包裹（加载中）' ,
        apiPath : '/dashboard/notPutinventory' ,
        items : [
          {
            customerIdentifier : '值'
          }
        ] ,
        fields : [
          {
            title : '名称' ,
            data : 'customerIdentifier'
          }
        ]
      }
    ]
  })
};
