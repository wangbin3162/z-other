/**
 * mock拦截首页的数据请求 index.html
 * author: wang bin
 */

// 模拟获取table数据
Mock.mock('/tableData0', {
  rows: [
    {
      id: '001',
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '杨同发',
      level: 'AA'
    },
    {
      id: '002',
      name: '荣成市一展石材有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '刘新历',
      level: 'AA'
    },
    {
      id: '003',
      name: '荣成皇朝马汉综合服务有限公司荣成皇朝马汉综合服务有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '王小波',
      level: 'AA'
    },
    {
      id: '004',
      name: '国王山东省店里公司荣成市供电中心国王山东省店里公司荣成市供电中心',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '刘收彬',
      level: 'AA'
    },
    {
      id: '005',
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '杨同发',
      level: 'AA'
    },
    {
      id: '006',
      name: '荣成皇朝马汉综合服务有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '王小波',
      level: 'AA'
    },
    {
      id: '007',
      name: '国王山东省店里公司荣成市供电中心',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '刘收彬',
      level: 'AA'
    },
    {
      id: '008',
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '杨同发',
      level: 'AA'
    },
    {
      id: '009',
      name: '国王山东省店里公司荣成市供电中心',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '刘收彬',
      level: 'AA'
    },
    {
      id: '010',
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '杨同发',
      level: 'AA'
    }
  ],
  total: 40
})

// 模拟获取table详情数据
Mock.mock('/tableDetail0', {
  keyTable: {
    name: '荣成东至海视频有限公司', corporation: '杨同发',
    regCapital: '300.0(万元)', tel: '',
    date: '2016-05-11', economicNature: '',
    unifiedCode: '393120123945129MAFa23140Q', registration: '3129312344',
    address: '山东省威海市荣成市埠柳镇埠柳村',
    scope: '荣成东至海视频有限公司',
    level: 'AA'
  },
  plusData: [
    {
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户',
      index: '被城市管理部门认定A类城市管理信用单位'
    },
    {
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户',
      index: '被城市管理部门认定A类城市管理信用单位'
    },
    {
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户',
      index: '被城市管理部门认定A类城市管理信用单位'
    },
    {
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户',
      index: '被城市管理部门认定A类城市管理信用单位'
    }
  ],
  minusData: [
    {
      name: '荣成东至海视频有限公司2',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户',
      index: '被城市管理部门认定A类城市管理信用单位'
    },
    {
      name: '荣成东至海视频有限公司2',
      unifiedCode: '393120123945129MAFa23140Q',
      date: '2016-05-11',
      desc: '诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户诚信个体工商户',
      index: '被城市管理部门认定A类城市管理信用单位'
    }]
})

// 模拟获取table数据
Mock.mock('/tableData1', {
  rows: [
    {
      id: '001',
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '杨同发',
      level: 'AA'
    },
    {
      id: '002',
      name: '荣成市一展石材有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '刘新历',
      level: 'AA'
    },
    {
      id: '003',
      name: '荣成皇朝马汉综合服务有限公司荣成皇朝马汉综合服务有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '王小波',
      level: 'AA'
    },
    {
      id: '004',
      name: '国王山东省店里公司荣成市供电中心国王山东省店里公司荣成市供电中心',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '刘收彬',
      level: 'AA'
    },
    {
      id: '005',
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '杨同发',
      level: 'AA'
    },
    {
      id: '006',
      name: '荣成皇朝马汉综合服务有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '王小波',
      level: 'AA'
    },
    {
      id: '007',
      name: '国王山东省店里公司荣成市供电中心',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '刘收彬',
      level: 'AA'
    },
    {
      id: '008',
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '杨同发',
      level: 'AA'
    },
    {
      id: '009',
      name: '国王山东省店里公司荣成市供电中心',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '刘收彬',
      level: 'AA'
    },
    {
      id: '010',
      name: '荣成东至海视频有限公司',
      unifiedCode: '393120123945129MAFa23140Q',
      registration: '3129312344',
      corporation: '杨同发',
      level: 'AA'
    }
  ],
  total: 40
})

// 模拟获取table数据-红黑名单类型数据
Mock.mock('/tableData6', {
  rows: [
    {
      id: '001',
      name: '王思正',
      codeNum: '372138*****0715',
      behavior: '荣成市委、市政府授予“2018年度诚信示范户”荣誉称号',
      Award: '征信加20分',
      date: '2019-03-07'
    },
    {
      id: '002',
      name: '王晓光',
      codeNum: '372138*****0715',
      behavior: '荣成市委、市政府授予“2018年度诚信示范户”荣誉称号',
      Award: '征信加20分',
      date: '2019-03-07'
    },
    {
      id: '003',
      name: '张世豪',
      codeNum: '372138*****0715',
      behavior: '荣成市委、市政府授予“2018年度诚信示范户”荣誉称号',
      Award: '征信加20分',
      date: '2019-03-07'
    },
    {
      id: '004',
      name: '李丽',
      codeNum: '372138*****0715',
      behavior: '荣成市委、市政府授予“2018年度诚信示范户”荣誉称号',
      Award: '征信加20分',
      date: '2019-03-07'
    },
    {
      id: '005',
      name: '郑策',
      codeNum: '372138*****0715',
      behavior: '荣成市委、市政府授予“2018年度诚信示范户”荣誉称号',
      Award: '征信加20分',
      date: '2019-03-07'
    },
    {
      id: '006',
      name: '齐军',
      codeNum: '372138*****0715',
      behavior: '荣成市委、市政府授予“2018年度诚信示范户”荣誉称号',
      Award: '征信加20分',
      date: '2019-03-07'
    },
    {
      id: '008',
      name: '郭晓',
      codeNum: '372138*****0715',
      behavior: '荣成市委、市政府授予“2018年度诚信示范户”荣誉称号',
      Award: '征信加20分',
      date: '2019-03-07'
    },
    {
      id: '009',
      name: '张宁',
      codeNum: '372138*****0715',
      behavior: '荣成市委、市政府授予“2018年度诚信示范户”荣誉称号',
      Award: '征信加20分',
      date: '2019-03-07'
    },
    {
      id: '010',
      name: '张菲菲',
      codeNum: '372138*****0715',
      behavior: '荣成市委、市政府授予“2018年度诚信示范户”荣誉称号',
      Award: '征信加20分',
      date: '2019-03-07'
    },
    {
      id: '011',
      name: '斯内克',
      codeNum: '372138*****0715',
      behavior: '荣成市委、市政府授予“2018年度诚信示范户”荣誉称号',
      Award: '征信加20分',
      date: '2019-03-07'
    }
  ],
  total: 40
})
