// collect.js
const util = require('../../utils/util.js')
const dbutils = require('../../utils/database_driver')

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
    hairCount: 0,
    makeupCount: 0,
    nailCount: 0,
    isHidden:'none',
    informations: [],
    collection: [],
    passCollectIndex: -1,
    passCollectType: ''
  },
  onLoad: function () {
    dbutils.getData.getDataFromId('information').then(res => {
      this.setData({
        informations: res.data.informations
      })
    }) 
    dbutils.getData.getDataFromId('userInfo').then(res => {
      for(let i=0; i<res.data.users.length; i++){
        if(res.data.users[i].username === 'Amy') {
          let tempCollection = res.data.users[i].collections
          this.setData({
            collection: tempCollection
          }) 
          for(let j = 0; j<res.data.users[i].collections.length; j++) {
            if(res.data.users[i].collections[j].class === 'hair') {
              this.data.hairCount ++
            } else if(res.data.users[i].collections[j].class === 'makeup') {
              this.data.makeupCount ++
            } else if(res.data.users[i].collections[j].class === 'nail') {
              this.data.nailCount ++
            }
          }
        }
      }
      this.setData({
        hairCount: this.data.hairCount,
        makeupCount: this.data.makeupCount,
        nailCount: this.data.nailCount
      })
    })
    console.log('informations:',this.data.informations, 'collection:', this.data.collection)
  },
  imgClick: function(e) {
    // console.log('e.currentTarget.dataset',e.currentTarget.dataset)
    let passCollectIndex = e.currentTarget.dataset.index
    let passCollectType = e.currentTarget.dataset.type
    wx.setStorageSync('passCollectIndex', passCollectIndex)
    wx.setStorageSync('passCollectType', passCollectType)
    console.log('passCollectIndex:',passCollectIndex,'passCollectType:',passCollectType)
    wx.navigateTo({
      url: '../../pages/collectInformation/collectInformation',
      success:()=>{
        wx.setNavigationBarTitle({
          title: '信息'
        })
      }
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

  onReady: function () {
  },
  
})
