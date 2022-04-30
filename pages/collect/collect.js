// collect.js
const util = require('../../utils/util.js')
import { getData } from '../../utils/database_driver'

Page({
  data: {
    tabButton: {
      all: "所有",
      hair:"发型", 
      makeup:"彩妆", 
      nail:"美甲"
    },
    num: 'all',
    allImgs: [],
    hairImgs: [],
    makeupImgs: [],
    nailImgs: [],
    isHidden:'none'
  },

  onLoad: function (options) {
    getData.getDataFromId('collect').then(res => {
      console.log(res.data.hairImgs)
      this.setData({
        allImgs: res.data.allImgs,
        hairImgs: res.data.hairImgs
      })
    })
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
    
  // hairImgClick: function(e) {
  //   // console.log(e.currentTarget.dataset)
  //   this.setData({
  //     clickPassData: e.currentTarget.dataset
  //   }),
  //   // console.log(this.data.clickPassData)
  //   wx.navigateTo({
  //     url: '../../pages/information/information?clickPassData=' + encodeURIComponent(JSON.stringify(this.data.clickPassData)),
  //     success:()=>{
  //       wx.setNavigationBarTitle({
  //         title: '详细信息'
  //       })
  //     }
  //   })
  // },
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
  },
  
})
