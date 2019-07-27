Vue.component('b-button-png', {
  render (h) {
    let child = []
    if (this.$slots.default) {
      child = this.$slots.default
    } else {
      child.push(h('img', {attrs: {src: this.src, alt: 'img'}}))
    }
    return h('span', {
      classes: ['bin-button-png'],
      style: {
        cursor: 'pointer',
      },
      on: {
        click: this.handleClick
      }
    }, child)
  },
  props: {
    src: {
      type: String,
      default: '../images/icon_expand@2x.png'
    }
  },
  methods: {
    handleClick () {
      this.$emit('on-click')
    }
  }
})
