const dbutils = require('../../utils/database_driver')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    informations: {},
    loveSrc: "../../static/image/love.png",
    loveImg: "../../static/image/love.png",
    clickPassIndex: -1,
    clickPassType: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let clickPassIndex = wx.getStorageSync('clickPassIndex')
    let clickPassType = wx.getStorageSync('clickPassType')
    this.setData({
      clickPassIndex: clickPassIndex,
      clickPassType: clickPassType
    })
    // console.log(clickPassIndex, clickPassType)
    dbutils.getData.getDataFromId('information').then(res => {
      let temp = this.data.informations
      temp.hair = res.data.informations.hair
      temp.makeup = res.data.informations[clickPassType]
      temp.nail = res.data.informations.nail
      this.setData({
        informations: temp
      })
    }) 
    // console.log('clickPassIndex:',clickPassIndex, 'clickPassType:', clickPassType)
  }, 
  loveClick: function(e) {
    let clickPassIndex = this.data.clickPassIndex
    let clickPassType = this.data.clickPassType
    console.log('clickPassIndex:',clickPassIndex, 'clickPassType:', clickPassType)
    if(this.data.informations[clickPassType][clickPassIndex].love === false) {
      dbutils.getData.getDataFromId('userInfo').then(res => {
        console.log('clickPassIndex:',clickPassIndex, 'clickPassType:', clickPassType)
        let temp = res.data.users
        let inserData = {
          class: clickPassType,
          itemId: clickPassIndex,
          isDeleted: false
        }
        for(let i = 0; i<temp.length; i++) {
          if(temp[i].username === 'userA') {
            this.setData({
              index: i
            })
          }
        }
        console.log(this.data.index)  
        dbutils.insert('userInfo', `users.${this.data.index}.collections`, inserData)
      }) 
      dbutils.update('information', `informations.${clickPassType}.${clickPassIndex}.love`, true)
    } else {
      dbutils.getData.getDataFromId('userInfo').then(res => {
        console.log('clickPassIndex:',clickPassIndex, 'clickPassType:', clickPassType)
        let temp = res.data.users
        for(let i = 0; i<temp.length; i++) {
          if(temp[i].username === 'userA') {
            this.setData({
              index: i
            })
          }
        }
        console.log(this.data.index)  
        
      }) 
      dbutils.update('information', `informations.${clickPassType}.${clickPassIndex}.love`, false)
    }
    wx.redirectTo({
      url: '../information/information',
    })
    // console.log(this.data.informations[this.data.clickPassIndex].love)
    // this.onLoad()
  },
  orderClick() {
    wx.navigateTo({
      url: '../order/order',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  observers:{
    'loveImg': function(e) {
      console.log(e)
      // if(e) {
      //   this.setData ({
      //     clearShow: true
      //   })
      // } else {
      //   this.setData ({
      //     clearShow: false
      //   })
      // }
    }
  }
})