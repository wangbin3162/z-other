var express = require('express');
var router = express.Router();
// 自己添加的服务器接口
var appData = require('../data.json');
var seller = appData.seller;
/* GET seller listing. */
router.get('/', function(req, res, next) {
  res.json({
    errno: 0,
    data: seller
  });
});

module.exports = router;
