# vue-music音乐播放器

> 项目依赖库

``` bash
* 1.stylus-loader
  npm install stylus stylus-loader --save-dev
* 2.axios官方ajax库
  npm install axios --save
* 3.better-scroll(滚动插件 ,文档https://ustbhuangyi.github.io/better-scroll/doc/zh-hans/)
  npm install better-scroll --save
* 4.babel-runtime(es6语法转义),babel-polyfill(es6-api转义)
  npm install babel-runtime --save
  npm install babel-polyfill --save-dev
* 5.fastclick(移动端点击300毫秒延迟)
  npm install fastclick --save
* 6.jsonp(跨域)
  npm install jsonp --save
* 7.vue-lazyload(图片懒加载)
  npm install vue-lazyload --save
* 8.create-keyframe-animation(第三方js生成css3动画)
  npm install create-keyframe-animation --save
* 9.js-base64(base64解码)
  npm install js-base64 --save
* 10.lyric-parser
  npm install lyric-parser --save

```

## Build Setup

``` bash
# 分别给vue-music和server安装依赖
npm install

# 启动服务器代理3004端口
node server/bin/music

# 启动本地服务 localhost:8080
npm run dev

# 编译打包dist
npm run build
```

## chapter1

``` bash
* 1.完成server端 获取推荐歌单接口,实现本地服务器代理
* 2.实现首页布局及vue-router实现tab切换
* 3.实现封装jsonp接口获取推荐slider
* 4.实现推荐歌单列表
* 5.封装slider/scroll/loading/listview等基础组件
```

## chapter2

``` bash
* 1.抽象singer类存储歌手信息
* 2.抽象singer(api)封装获取歌手参数
* 3.实现封装song-list基础组件存储单个歌曲
* 4.实现music-list音乐列表组件实现歌手歌单列表
```

## chapter3

``` bash
* 1.制作播放器首先设置state.js状态设置,并配置getters中的变量
* 2.getters中配置一个currentSong的计算属性 ,配置mutations-types和mutations设置函数
* 3.使用import { mapMutations } from 'vuex';// vuex语法糖
* 4. ...mapMutations({ setSinger: 'SET_SINGER'})//映射方法名
* 5.   this.setSinger(singer);//调用vuex对状态做修改
* 6.使用第三方库create-keyframe-animation创建js生成css3动画
* 7.实现progress-bar ,progress-circle进度条组件
* 8.axios代理获取歌词数据,并返回base64字符串数据
* 9.使用js-base64.js解码工具解码歌词并使用lyric-parser进行歌词封装
```
