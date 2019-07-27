var express = require('express');
var router = express.Router();
const axios = require('axios');

/* 获取歌词 */
router.get('/', function (req, res, next) {
  const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/portal/player.html'
    },
    params: req.query
  }).then(response => {
    var ret = response.data;
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/;
      var mathes = ret.match(reg);
      if (mathes) {
        ret = JSON.parse(mathes[1]);
      }
    }
    res.json(ret);
  }).catch(e => {
    console.log(e);
  });
});

module.exports = router;
