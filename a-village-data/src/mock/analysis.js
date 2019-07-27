/**
 * mock拦截 数据分析页面 analysis.html
 * author: wang bin
 */
// Random.integer( min, max )
// Mock.Random.integer(60, 100)
// Mock.mock('@integer(60, 100)')

// 模拟获取顶部选择框
Mock.mock('/stat_getTopOptions', {
  topOptions: [
    {
      value: 'rongcheng',
      label: '荣成市',
      children: [
        {
          value: 'chengshanzhen',
          label: '成山镇',
          children: [
            {
              value: 'taishanjiedao',
              label: '泰山街道'
            },
            {
              value: 'hushanjiedao',
              label: '虎山街道'
            }
          ]
        },
        {
          value: 'lidaozhen',
          label: '俚岛镇',
          children: [
            {
              value: 'taishanjiedao',
              label: '泰山街道'
            },
            {
              value: 'hushanjiedao',
              label: '虎山街道'
            }
          ]
        }
      ]
    }
  ],
  normal: ['rongcheng', 'chengshanzhen', 'taishanjiedao']
})

// 获取顶部数据
Mock.mock('/getData', {
  columns: ['date', 'front', 'negative'],
  'rows|12': [
    {
      'date|+1': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',],
      front: '@integer(500, 1500)',
      negative: '@integer(0, 75)'
    }
  ]
})

// 模拟获取指数柱状图数据
Mock.mock('/histogramData', {
  columns: ['area', 'number'],
  'rows|30': [
    {
      'area|+1': ['俚岛镇', '成山镇', '埠柳镇', '港西镇', '崖头街道', '寻山街道', '崂山街道', '城西街道', '港湾街道', '斥山街道', '东山街道'],
      'number': '@integer(100, 1200)'
    }
  ]
})

// 模拟正负信息对比数据
Mock.mock('/compareData', {
  columns: ['area', 'positive', 'negative'],
  'rows|20': [
    {
      'area|+1': ['俚岛镇', '成山镇', '埠柳镇', '港西镇', '崖头街道', '寻山街道', '崂山街道', '城西街道', '港湾街道', '斥山街道', '东山街道'],
      front: '@integer(500, 1200)',
      negative: '@integer(50, 250)'
    }
  ]
})

// 模拟人均数据量
Mock.mock('/perCapitaData', {
  columns: ['area', 'number'],
  'rows|20': [
    {
      'area|+1': ['村镇1', '村镇2', '村镇3', '村镇4', '村镇5', '村镇6', '村镇7', '村镇8', '村镇9', '村镇10',
        '村镇11', '村镇12', '村镇13', '村镇14', '村镇15', '村镇16', '村镇17', '村镇18', '村镇19', '村镇20'],
      'number': '@integer(50, 300)'
    }
  ]
})

// 模拟城镇对比
Mock.mock('/comparelineData', {
  columns: ['日期', '俚岛镇', '萌子镇', '成山镇'],
  'rows|12': [
    {
      '日期|+1': ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月',],
      '俚岛镇': '@integer(100, 2000)',
      '萌子镇': '@integer(100, 2000)',
      '成山镇': '@integer(100, 2000)'
    }
  ]
})

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
