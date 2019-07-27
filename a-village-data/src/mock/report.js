/**
 * mock拦截 信用简报数据 report.html
 * author: wang bin
 */
// Random.integer( min, max )
// Mock.Random.integer(60, 100)
// Mock.mock('@integer(60, 100)')

Mock.mock('/getData', {
  lineData: {
    columns: ['date', 'diqu', 'quanshi', 'zhenjie'],
    'rows|12': [
      {
        'date|+1': ['3.30', '3.31', '4.01', '4.02', '4.03', '4.04', '4.05', '4.06', '4.07', '4.08', '4.09', '4.10'],
        diqu: '@integer(0, 75)',
        quanshi: '@integer(0, 75)',
        zhenjie: '@integer(0, 75)'
      }
    ]
  }
})
