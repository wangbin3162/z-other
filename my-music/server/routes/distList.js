var express = require('express');
var router = express.Router();
const axios = require('axios');

/* 获取推荐歌单列表distList */
router.get('/', function (req, res, next) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/?ADTAG=myqq'
    },
    params: req.query
  }).then(response => {
    res.json(response.data);
  }).catch(e => {
    console.log(e);
  });
});

module.exports = router;
