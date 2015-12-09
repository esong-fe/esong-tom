/**
 * 检测入库标签号是否正确的模块：
 *
 * 例如标签为 ORA000000002-D（其中最后一位为校验位），先
 * 对前面的标签号做 crc32 计算，将得到的数字转换为 16 进制，然后用得到的16进制数的第一位
 * 与校验位作大小写不敏感的比较，相同则说明是正常的。
 */

/**
 * crc32 算法来自
 * http://stackoverflow.com/questions/18638900/javascript-crc32
 */

/**
 * @type {Array} crc 表
 */
var crcTable = (function () {
  var c;
  var crcTable = [];
  for ( var n = 0 ; n < 256 ; n++ ) {
    c = n;
    for ( var k = 0 ; k < 8 ; k++ ) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    crcTable[ n ] = c;
  }
  return crcTable;
}());

/**
 * crc32 计算函数
 * @param {string} str
 * @returns {number}
 */
function crc32( str ) {
  var crc = 0 ^ (-1);

  for ( var i = 0 ; i < str.length ; i++ ) {
    crc = (crc >>> 8) ^ crcTable[ (crc ^ str.charCodeAt( i )) & 0xFF ];
  }

  return (crc ^ (-1)) >>> 0;
}

/**
 * 验证标签是否正确
 * @param {string} label - 入库标签
 * @returns {boolean} - 入库标签格式是否正确
 */
export default function ( label ) {
  var x = label[ label.length - 1 ].toLowerCase();
  return x === crc32( label.slice( 0 , -2 ) ).toString( 16 )[ 0 ];
}

