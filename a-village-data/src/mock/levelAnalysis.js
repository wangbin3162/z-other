/**
 * mock拦截信用评级分析页面
 * author: wang bin
 */

// 信用指标分类统计
Mock.mock('/typeData', {
  columns: ['name', 'number'],
  'rows|6': [
    {
      'name|+1': ['村民管理', '党建领域', '公民功德', '新时代文明实践', '社会公益', '国防建设'],
      'number': '@integer(50, 300)'
    }
  ]
})

// 模拟获取雷达图数据
Mock.mock('/radarData', [
  {
    '区域': '俚岛镇',
    '党建领域': '@integer(0, 1400)',
    '村居管理': '@integer(0, 1400)',
    '村容村貌': '@integer(0, 1400)',
    '公共秩序': '@integer(0, 1400)',
    '村居建设': '@integer(0, 1400)'
  }
])

// 模拟正负信息对比数据
Mock.mock('/compareData', {
  columns: ['area', 'front', 'negative'],
  'rows|20': [
    {
      'area|+1': ['俚岛镇', '成山镇', '埠柳镇', '港西镇', '崖头街道', '寻山街道', '崂山街道', '城西街道', '港湾街道', '斥山街道', '东山街道'],
      front: '@integer(250, 1200)',
      negative: '@integer(10, 200)'
    }
  ]
})
