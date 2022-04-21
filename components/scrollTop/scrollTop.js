Component({
  properties: {
    btnFont: {
      type: String,
      value: 'default value'
    }
  },
  data: {
    someData: {}
  },
  methods: {
    scrollTop() {
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试！'
        })
      }
    }
  },
  lifetimes: {

  },
})