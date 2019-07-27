# bin-ui

> 封装常用UI控件

[项目演示地址](http://www.wangbin666.com/bin-ui )
#### 基础依赖安装
```
# 基础包
npm install
# 第三方库
-save
npm install babel-runtime --save
npm install better-scroll --save
npm install fastclick --save
npm install jsonp --save
npm install axios --save

-dev
npm install stylus stylus-loader --save-dev
```

#### 文件配置
```
-api：api相关js，用于封装请求相关内容
-bin-ui：自用UI控件库，具体使用见下方example使用说明
-common：基本包依赖
    -fonts：字体包
    -js：通用js
    -stylus：基本样式参数，主体色设置等
    -util：工具包js
        -dom：dom操作相关封装
        -jsonp：依赖jsonp包，进行jsonp请求调用
        -my-storage：封装本地存储，
-components：组件
    -examples：示例文件包，对应bin-ui组件使用
```
#### bin-ui document

---

full-pages
```
<full-pages :pagesColor="pagesColor"
:isPullDown="false"
:listenPageChange="true"
@pageChanged="pageChange()">
    <div></div>
</full-pages>

pagesColor:[] //pages页面数组，应和其中的div数量相同
ispullDown：false //是否只能往上拉
listenPageChange：false //是否监听滚动结束事件，如监听则设置一个监听函数
```
---
top-tip
```
<top-tip :text="topTipLabel" ref="topTip"></top-tip>

topTipLabel //顶部弹出的文字string
this.$refs.topTip.show()// 弹出toptip组件，默认1秒消失
```

---
scroll
```
1.基本滚动
<div class="scroll-wrapper">
    <bin-scroll :data="items" :options="options"></bin-scroll>
</div>
//数据
    data () {
      return {
        items: [1, 2, 3, 4, 5, 6],
        options: {
          scrollbar: {
            fade: false
          }
        }
      }
    }
2.自定义item
<div class="scroll-wrapper">
    <bin-scroll ref="scroll" :data="items" :options="options":pullUpLoad="true" @pulling-up="onPullingUp">
    <ul>
        <li v-for></li>
    </ul>
    </bin-scroll>
</div>
3.上拉加载
<div class="scroll-wrapper">
    <bin-scroll ref="scroll" :data="items" :options="options":pullUpLoad="true" @pulling-up="onPullingUp">
    </bin-scroll>
</div>
```

---
slide
```
<!--需要确保插槽有值再进行渲染-->
<div class="slider-wrapper" v-if="recommends.length">
    <div class="slider-content">
        <slider>
            <div v-for="item in recommends">
                <a :href="item.linkUrl">
                    <img :src="item.picUrl"/>
                </a>
              </div>
        </slider>
    </div>
</div>

css:
.slider-wrapper
    position: relative
    width: 100%
    padding-top: 40%
    overflow: hidden
    .slider-content
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
```
---
full-pages-slide
```
import FullPageSlide from '~/full-page-vertical-slide.vue'
 <full-page-slide :data="items" @finish="finish"></full-page-slide>
//数据
data () {
    return {
        items: [
          {bgColor: '#d0956b', label: '1'},
          {bgColor: '#06baae', label: '2'},
          {bgColor: '#e46339', label: '3'},
          {bgColor: '#cf36ac', label: '4'}
        ]
    }
}
```
---
index-list
```
1.default
<index-list
    :data="data"
    :title="title"
    @select="selectItem"
    @title-click="clickTitle">
</index-list>
//数据：
按照固定格式化数据
let group = {}
group.name = cityGroup.name
group.items = []
2.customer
<index-list
    :data="data"
    :title="title"
    @select="selectItem"
    @title-click="clickTitle">
//插入的data数据
</index-list>
```

---
popup
```
1.默认弹窗
<popup :content="'default popup'"></popup>

2.不带mask的弹窗
 <popup :mask="false" :content="'no mask popup'"></popup>


3.自定义弹窗内容
<popup>
    <div>customer Popup</div>
</popup>


3.关闭自动隐藏并添加关闭入口
<popup :autoHide="false">
    <div @click="hidePopup('myPopup4')"> click me to hide</div>
</popup>

解析：
    :content='弹窗的提示文本'
    :mask="false" 隐藏遮罩
    :autoHide="false" 关闭自动隐藏
    :hideTime="1000" 可以设置隐藏时间
    内嵌内容和自定义样式popup为全屏
```

---
dialog
```
1.默认dialog
<bin-dialog ref="dialog1"></bin-dialog>

2.自定义参数dialog
<bin-dialog @confirm="confirm" @cancel="cancel" :options="options" ref="dialog2"></bin-dialog>

data数据：
 其中type定义为confirm则会派发confirm和cancel事件，可监听事件做操作
    options: {
        type: 'confirm',
        title: '我是标题',
        content: '我是内容',
        icon: 'icon-warn_fill',
        confirmBtn: {
            text: '确定',
            active: true
        },
        cancelBtn: {
            text: '取消',
            active: true
        }
    }

3.带取消x的提示框
<bin-dialog @close="close" :options="options3" ref="dialog3"></bin-dialog>

data数据：
 其中type定义为alert，切设置showClose=true，此时会派发close事件，可监听处理
    options3: {
        type: 'alert',
        title: '我是标题',
        icon: 'icon-warn_fill',
        confirmBtn: {
            text: '确定',
            active: true
        },
        showClose: true
    }
4.自定义嵌入内容
<bin-dialog :options="options4" ref="dialog4">
    <img class="pic" src="../data/pic.jpg"/>
    <h3 class="text">slot插入的标题</h3>
    <p class="text2">副标题</p>
</bin-dialog>

data数据：
    options4: {
        type: 'alert',
        confirmBtn: {
            text: '我知道了',
            active: true
        }
    }
```

---
progress
```
1.横向进度条
<progress-bar @percentChange="onProgressBarChange" :allTime="true"></progress-bar>
解析：
    onProgressBarChange为进度改变事件
    allTime默认false，true为时时派发进度改变事件
    percent:为外部组件控制进度
2.圆形进度条
<progress-circle :radius="50" :percent="barPercent"></progress-circle>
解析：
    radius：为圆形进度的半径
    percent:为外部组件控制进度
```

---
loading
```
1.默认
<loading></loading>
2.自定义加载文字
<loading title="自定义加载文字"></loading>
3.自定义加载图片及大小
<loading :customer="true">
    <img width="220" height="19" src="./loading11.gif">
</loading>
```

---
Picker
```
//todo
```
