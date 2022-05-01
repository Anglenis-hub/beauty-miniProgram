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
    hairImgs: [],
    makeupImgs: [],
    nailImgs: [],
    isHidden:'none',
    informations: [],
    collection: []
  },

  onLoad: function () {
    dbutils.getData.getDataFromId('information').then(res => {
      // console.log(res.data.informations)
      this.setData({
        informations: res.data.informations
      })
    }) 
    dbutils.getData.getDataFromId('userInfo').then(res => {
      console.log(res.data)
      for(let i=0; i<res.data.users.length; i++){
        if(res.data.users[i].username === 'John') {
          let tempCollection = res.data.users[i].collections
          this.setData({
            collection: tempCollection
          }) 
        }
      }
      console.log(this.data.collection)
    })
    dbutils.getData.getDataFromId('collect').then(res => {
      // console.log(res.data.hairImgs)
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
