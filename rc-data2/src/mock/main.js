/**
 * mock拦截首页的数据请求 index.html
 * author: wang bin
 */

// 获取企业top100
Mock.mock('/getTopIndustry', {
  max: 3600,
  'list|100': [
    {
      name: 'xxxx股份有限公司',
      'score|1000-3600': 1,
      level: 'AAA'
    }
  ]
})
