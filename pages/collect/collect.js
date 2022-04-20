// collect.js
const util = require('../../utils/util.js')

Page({
  data: {
    tabButton: {
      all: "所有",
      hair:"发型", 
      makeup:"彩妆", 
      nail:"美甲"
    },
    num: 'all',
    allImgs: ["/static/image/hair1.jpg", "/static/image/hair1.jpg", "/static/image/hair3.jpg", "/static/image/hair1.jpg", "/static/image/hair1.jpg", "/static/image/hair3.jpg", "/static/image/hair1.jpg"],
    hairImgs: ["/static/image/hair1.jpg", "/static/image/hair1.jpg", "/static/image/hair3.jpg", "/static/image/hair1.jpg"],
    makeupImgs: ["/static/image/hair3.jpg", "/static/image/hair1.jpg"],
    nailImgs: ["/static/image/hair1.jpg", "/static/image/hair3.jpg"],
    isHidden:'none'
  },

  allClick() {
    this.setData({
      num: "all"
    })
  },
  hairClick() {
    this.setData({
      num: "hair"
    })
  },
  makeupClick() {
    this.setData({
      num: "makeup"
    })
  },
  nailClick() {
    this.setData({
      num: "nail"
    })
  },
  onPageScroll(e) {
    // console.log(e);
    if(e.scrollTop !== 0) {
      this.setData({
        isHidden:'block'
      })
    }else {
      this.setData({
        isHidden:'none'
      })
    }
  }
})
