/**
 * mock拦截首页的数据请求 index.html
 * author: wang bin
 */

// 模拟获取双公示数据
Mock.mock('/sgsData', {
  columns: ['unit', 'permission', 'punish'],
  rows: [
    {unit: '交通局', permission: 800, punish: 154},
    {unit: '公安部', permission: 680, punish: 120},
    {unit: '广电局', permission: 620, punish: 129},
    {unit: '社保局', permission: 660, punish: 280},
    {unit: '气象局', permission: 534, punish: 270},
    {unit: '工商局', permission: 523, punish: 260},
    {unit: '证监局', permission: 489, punish: 240},
    {unit: '民局', permission: 430, punish: 230},
    {unit: '行政审批', permission: 420, punish: 100},
    {unit: '食药监', permission: 450, punish: 150}
  ]
})

// 模拟获取采集信息量
Mock.mock('/gatherData', {
  columns: ['unit', 'gather'],
  rows: [
    {unit: '公安局', gather: 8100},
    {unit: '交通局', gather: 11000},
    {unit: '城管局', gather: 7500},
    {unit: '发改委', gather: 12000},
    {unit: '民政局', gather: 11100},
    {unit: '卫计委', gather: 11800},
    {unit: '人社局', gather: 7500},
    {unit: '食药监', gather: 11000},
    {unit: '环保局', gather: 6500}
  ]
})

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

// 获取个人top100
Mock.mock('/getTopPeople', {
  max: 3600,
  'list|100': [
    {
      name: 'xxx村张三',
      'score|1000-3600': 1,
      level: 'AAA'
    }
  ]
})

// 模拟获取企业table详情数据
Mock.mock('/compDetail', {
  keyTable: {
    name: '荣成东至海视频有限公司', corporation: '杨同发',
    regCapital: '300.0(万元)', tel: '',
    date: '2016-05-11', economicNature: '',
    unifiedCode: '393120123945129MAFa23140Q', registration: '3129312344',
    address: '山东省威海市荣成市埠柳镇埠柳村',
    scope: '荣成东至海视频有限公司',
    level: 'AAA',
    score: 1000
  },
  plusData: [
    {
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体商户诚信个体工商户',
      index: '被城市管理部门认定A类城市管理信用单位',
      submission: '市工商局'
    },
    {
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚商户诚信个体工商户',
      index: '被城市管理部门认定A类城市管理信用单位',
      submission: '市工商局'
    },
    {
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体工商个体工商户',
      index: '被城市管理部门认定A类城市管理信用单位',
      submission: '市工商局'
    },
    {
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体工商户诚信个商户',
      index: '被城市管理部门认定A类城市管理信用单位',
      submission: '市工商局'
    }
  ],
  minusData: [
    {
      name: '荣成东至海视频有限公司2',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体工商户诚信',
      index: '被城市管理部门认定A类城市管理信用单位',
      submission: '市工商局'
    },
    {
      name: '荣成东至海视频有限公司2',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体工商户',
      index: '被城市管理部门认定A类城市管理信用单位',
      submission: '市工商局'
    }]
})

// 获取行业占比
Mock.mock('/getIndustryAccount', {
  max: 3600,

  list: [
    {
      name: '批发零售',
      'count|2000-3600': 1,
      percent: '19.9%'
    },
    {
      name: '制造业',
      'count|2000-3600': 1,
      percent: '12.9%'
    },
    {
      name: '建筑业',
      'count|2000-3600': 1,
      percent: '11.9%'
    },
    {
      name: '农、林、牧、渔业',
      'count|2000-3600': 1,
      percent: '6.9%'
    },
    {
      name: '租赁和商务服务业',
      'count|2000-3600': 1,
      percent: '12.9%'
    },
    {
      name: '科学研究和技术服务业',
      'count|2000-3600': 1,
      percent: '19.9%'
    },
    {
      name: '房地产业',
      'count|2000-3600': 1,
      percent: '10.9%'
    },
    {
      name: '交通运输、仓储和邮政业',
      'count|2000-3600': 1,
      percent: '6.9%'
    },
    {
      name: '信息传输、软件和信息技术服务业',
      'count|2000-3600': 1,
      percent: '4.9%'
    },
    {
      name: '金融业',
      'count|2000-3600': 1,
      percent: '9.5%'
    },
    {
      name: '居民服务、修理和其他服务业',
      'count|2000-3600': 1,
      percent: '15.5%'
    },
    {
      name: '住宿和餐饮业',
      'count|2000-3600': 1,
      percent: '5.5%'
    },
    {
      name: '水利、环境和公共设施管理业',
      'count|2000-3600': 1,
      percent: '5.9%'
    },
    {
      name: '电力、热力、燃气及水生产和供应业',
      'count|2000-3600': 1,
      percent: '12.9%'
    },
    {
      name: '卫生和社会工作',
      'count|2000-3600': 1,
      percent: '9.9%'
    },
    {
      name: '教育',
      'count|2000-3600': 1,
      percent: '12.4%'
    },
    {
      name: '采矿业',
      'count|2000-3600': 1,
      percent: '6.4%'
    },
    {
      name: '其他',
      'count|2000-3600': 1,
      percent: '1.4%'
    }
  ]
})

// 执法信息
Mock.mock('/getEnforceData', {
  'list|50': [
    {
      info: '5-18 11:14:50',
      company: 'xxxx股份有限公司',
      content: '门口乱堆乱放',
      dept: '城管局'
    }
  ]
})

// 红黑灰重点名单
Mock.mock('/getNameList', {
  list: [5864, 4721, 1632, 3568],
  listPercent: [68, 20, 12]
})


// 奖励激励记录数据
Mock.mock('/getLineData1', {
  columns: ['date', 'stimulate', 'punish'],
  rows: [
    {date: '06-01', stimulate: 200, punish: 140},
    {date: '06-02', stimulate: 250, punish: 180},
    {date: '06-03', stimulate: 780, punish: 500},
    {date: '06-04', stimulate: 700, punish: 535},
    {date: '06-05', stimulate: 1000, punish: 600},
    {date: '06-06', stimulate: 1100, punish: 660},
    {date: '06-07', stimulate: 250, punish: 234},
    {date: '06-08', stimulate: 143, punish: 142},
    {date: '06-09', stimulate: 240, punish: 222},
    {date: '06-10', stimulate: 480, punish: 332},
  ]
})
Mock.mock('/getLineData2', {
  columns: ['date', 'stimulate', 'punish'],
  rows: [
    {date: '19/1', stimulate: 355, punish: 233},
    {date: '19/2', stimulate: 754, punish: 345},
    {date: '19/3', stimulate: 1100, punish: 660},
    {date: '19/4', stimulate: 700, punish: 122},
    {date: '19/5', stimulate: 234, punish: 323},
    {date: '19/6', stimulate: 143, punish: 123}
  ]
})

// 获取排名，注意，这里是排序好的，所以第一个默认为最大值
Mock.mock('/getRankData', {
  deptRank: [
    {dept: '交通局', num: 98},
    {dept: '公安部', num: 78},
    {dept: '广电局', num: 68},
    {dept: '社保局', num: 58},
    {dept: '气象局', num: 55},
    {dept: '工商局', num: 50},
    {dept: '证监局', num: 45},
    {dept: '民政局', num: 45},
    {dept: '行政审批', num: 40},
    {dept: '食药监', num: 30}
  ],
  nameRank: [
    {name: '纳税信用A级纳税人', num: 16},
    {name: '安全生产领域失信黑名单', num: 14},
    {name: '纳税信用A级纳税人', num: 13},
    {name: '安全生产领域失信黑名单', num: 12},
    {name: '纳税信用A级纳税人', num: 9}
  ],
  disposeRank: [
    {dispose: '重点关注', num: 9800},
    {dispose: '禁止评优', num: 7800},
    {dispose: '限制消费', num: 6800},
    {dispose: '限制购物', num: 5800},
    {dispose: '限制出境', num: 5500},
    {dispose: '限制贷款', num: 5000},
    {dispose: '股东任职', num: 4500},
    {dispose: '限制评优', num: 4500},
    {dispose: '暂停审批', num: 4000},
    {dispose: '措施', num: 3000}
  ]
})


