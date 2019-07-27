var express = require('express');
var router = express.Router();
// 自己添加的服务器接口
var appData = require('../data.json');
var goods = appData.goods;
/* GET goods listing. */
router.get('/', function(req, res, next) {
  res.json({
    errno: 0,
    data: goods
  });
});

module.exports = router;
