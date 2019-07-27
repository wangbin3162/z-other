var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET songlist listing. */
router.get('/', function (req, res, next) {
  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/n/yqq/playlist/2691753171.html'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data;
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/;
      var mathes = ret.match(reg);
      if (mathes) {
        ret = JSON.parse(mathes[1]);
      }
    }
    res.json(ret);
  }).catch((e) => {
    console.log(e);
  });
});

module.exports = router;
