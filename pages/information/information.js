import { getData } from '../../utils/database_driver'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    informations: [],
    loveSrc: "../../static/image/love.png",
    loveImg: "../../static/image/love.png",
    clickPassIndex: -1
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let clickPassIndex = wx.getStorageSync('clickPassIndex')
    this.setData({
      clickPassIndex: clickPassIndex
    })
    getData.getDataFromId('information').then(res => {
      console.log(res.data.informations)
      this.setData({
        informations: res.data.informations
      })
      // console.log(this.data.informations)
    }) 
  }, 
  loveClick() {
    let that = this
    wx.cloud.init({
      env: 'cloud1-2ghfekqc5cf347a4'  
    })
    const tableName = 'beautyTable'
    const db = wx.cloud.database()
    const _ = db.command
    if(this.data.informations[this.data.clickPassIndex].love === false){
      console.log(this.data.clickPassIndex)
      db.collection(tableName).doc('information').update({
        data: {
          [`informations.${this.data.clickPassIndex}.love`]: true,
          [`informations.${this.data.clickPassIndex}.loveImg`]: "../../static/image/loved.png"
        },
        sucess: function(res) {
          console.log(res.data[this.data.clickPassIndex].loveImg)
          this.setData({
            loveImg: res.data[this.data.clickPassIndex].loveImg
          })
          
        }
      })
      // console.log(this.data.informations)
      db.collection(tableName).doc('collect').update({
        data: {
          allImgs: _.push(this.data.informations[this.data.clickPassIndex].ImgSrc),
          hairImgs: _.push(this.data.informations[this.data.clickPassIndex].ImgSrc)
        },
        sucess: function(res) {
          console.log(res.data)
        }
      })
    } else {
      db.collection(tableName).doc('information').update({
        data: {
          [`informations.${this.data.clickPassIndex}.love`]: false,
          [`informations.${this.data.clickPassIndex}.loveImg`]: "../../static/image/love.png"
        },
        sucess: function(res) {
          console.log(res.data)
        }
      })
      db.collection(tableName).doc('collect').update({
        data: {
          allImgs: _.pop(this.data.informations[this.data.clickPassIndex].ImgSrc),
          hairImgs: _.pop(this.data.informations[this.data.clickPassIndex].ImgSrc)
        },
        sucess: function(res) {
          console.log(res.data)
        }
      })
    }
    that.onLoad();
    console.log(this.data.informations[this.data.clickPassIndex].love)
    // wx.({
    //   url: '../information/information',
    // })
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