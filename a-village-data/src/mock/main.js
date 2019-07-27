/**
 * mock拦截首页的数据请求 index.html
 * author: wang bin
 */

// 模拟获取顶部选择框
Mock.mock('/stat_getTopOptions', {
  topOptions: [
    {
      value: '荣成市',
      label: '荣成市',
      children: [
        {
          value: '成山镇',
          label: '成山镇',
          children: [
            {
              value: '信用概况',
              label: '信用概况'
            },
            {
              value: '信用指数',
              label: '信用指数'
            }
          ]
        },
        {
          value: '俚岛镇',
          label: '俚岛镇',
          children: [
            {
              value: '信用概况',
              label: '信用概况'
            },
            {
              value: '信用指数',
              label: '信用指数'
            }
          ]
        },
        {
          value: '虎山镇',
          label: '虎山镇',
          children: [
            {
              value: '信用概况',
              label: '信用概况'
            },
            {
              value: '信用指数',
              label: '信用指数'
            }
          ]
        }
      ]
    }
  ],
  normal: ['荣成市', '成山镇', '信用概况']
})

// 模拟获取顶部数据
Mock.mock('/topData', {
  data1: {
    title: '总人口',
    count: '1,216,560',
    obj1: {key: '镇街', val: 20},
    obj2: {key: '村居', val: 288}
  },
  data2: {
    title: '信用信息数据量',
    count: '8,848',
    obj1: {key: '正面信息', val: 8000},
    obj2: {key: '负面信息', val: 848}
  },
  data3: {
    title: '案例报送',
    count: '16,560',
    obj1: {key: '报送数量', val: 8000},
    obj2: {key: '审核数量', val: 848}
  },
  data4: {
    title: '奖惩报送',
    count: '9,999',
    obj1: {key: '惩戒记录', val: 9000},
    obj2: {key: '激励记录', val: 999}
  }
})

// 模拟获取指数柱状图数据
Mock.mock('/histogramData', {
  columns: ['地区', '指数'],
  'rows|10': [
    {
      '地区|+1': ['俚岛镇', '成山镇', '埠柳镇', '港西镇', '崖头街道', '寻山街道', '崂山街道', '城西街道', '港湾街道', '斥山街道', '东山街道'],
      '指数': '@integer(100, 1200)'
    }
  ]
})

// 模拟获取信用排行
Mock.mock('/rankingData/village', {
  'rows|10': [
    {
      'name|+1': ['俚岛镇', '成山镇', '虎山镇', '冬装村委会', '东庙村委会', '东庙村委会', '东庙村委会', '东庙村委会', '东庙村委会', '东庙村委会'],
      'rank': '@integer(0, 1400)'
    }
  ]
})
// 模拟获取信用排行
Mock.mock('/rankingData/person', {
  'rows|10': [
    {
      'name|+1': ['张三', '李四', '王五', '啥呀', '维生素', '其二', '清任务', '提前', '退全额', '几斤'],
      'rank': '@integer(0, 1400)'
    }
  ]
})

// 模拟评级结果统计
Mock.mock('/resultData', {
  columns: ['level', 'number'],
  'rows|5': [
    {
      'level|+1': ['一星', '二星', '三星', '四星', '五星'],
      'number': '@integer(50, 300)'
    }
  ]
})

// 信用指标分类统计
Mock.mock('/typeData', {
  columns: ['name', 'number'],
  'rows|6': [
    {
      'name|+1': ['村民管理', '党建领域', '公民功德', '新时代实践', '社会公益', '国防建设'],
      'number': '@integer(50, 300)'
    }
  ]
})

// 模拟获取雷达图数据
Mock.mock('/radarData', [
  {'区域': '俚岛镇', '数据量': 1393, '奖惩开展': 1093, '基金使用': 1221, '案例报送': 2323, '信用指数': 623},
  {'区域': '成山镇', '数据量': 3530, '奖惩开展': 3230, '基金使用': 1344, '案例报送': 3422, '信用指数': 1421},
  {'区域': '虎山镇', '数据量': 2923, '奖惩开展': 2623, '基金使用': 1233, '案例报送': 2342, '信用指数': 4213}
])

// 模拟获取雷达图城市数据
Mock.mock('/getCity', [
  {
    value: '俚岛镇',
    label: '俚岛镇'
  }, {
    value: '成山镇',
    label: '成山镇'
  }, {
    value: '埠柳镇',
    label: '埠柳镇'
  }, {
    value: '港西镇',
    label: '港西镇'
  }, {
    value: '崖头街道',
    label: '崖头街道'
  }
])

