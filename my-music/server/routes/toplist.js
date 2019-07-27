var express = require('express');
var router = express.Router();
const axios = require('axios');

/* 获取排行榜数据 */
router.get('/', function (req, res, next) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://m.y.qq.com/'
    },
    params: req.query
  }).then(response => {
    res.json(response.data);
  }).catch(e => {
    console.log(e);
  });
});

module.exports = router;
