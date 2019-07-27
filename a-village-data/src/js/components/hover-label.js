Vue.component('b-hover-label', {
  render (h) {
    let show = this.title.length > this.maxLength ? this.title.slice(0, this.maxLength) : this.title
    return h('div', {
      class: ['bin-hover-label'],
      attrs: this.title.length > this.maxLength ? {
        title: this.title
      } : {},
      on: {
        mouseenter: this.hanldMouseEnter,
        mouseleave: this.hanldMouseLeave
      },
      style: this.style
    }, [show])
  },
  props: {
    title: {
      type: String,
      required: true
    },
    maxLength: {
      type: Number,
      default: 15
    }
  },
  data () {
    return {
      style: {}
    }
  },
  methods: {
    hanldMouseEnter (e) {
      e.target.classList.add('animate-paused')
    },
    hanldMouseLeave (e) {
      e.target.classList.remove('animate-paused')
    },
    start(){
      this.$el.classList.add('animate-right')
    }
  },
  mounted () {
    var bgs = ['#60b8f6', '#ffcc41', '#55da8d', '#ba5eed',
      '#de0029', '#ba077f', '#f09d01', '#c1df05']
    this.style = {
      top: _.random(15, 300) + 'px',
      backgroundColor: bgs[_.random(bgs.length - 1)]
    }
  }
})
