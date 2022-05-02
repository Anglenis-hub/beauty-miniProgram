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
    passCollectIndex: -1,
    passCollectType: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    let passCollectIndex = wx.getStorageSync('passCollectIndex')
    let passCollectType = wx.getStorageSync('passCollectType')
    this.setData({
      passCollectIndex: passCollectIndex,
      passCollectType: passCollectType
    })
    dbutils.getData.getDataFromId('information').then(res => {
      let temp = this.data.informations
      temp.hair = res.data.informations.hair
      temp.makeup = res.data.informations.makeup
      temp.nail = res.data.informations.nail
      this.setData({
        informations: temp
      })
    }) 
    // console.log('passCollectIndex:',this.data.passCollectIndex,'passCollectType:',this.data.passCollectType)
  }, 
  loveClick: function(e) {
    let passCollectIndex = this.data.passCollectIndex
    let passCollectType = this.data.passCollectType
    console.log('passCollectIndex:',passCollectIndex, 'passCollectType:',passCollectType)
    if(this.data.informations[passCollectType][passCollectIndex].love === true) {
      dbutils.update('information', `informations.${passCollectType}.${passCollectIndex}.love`, false)//将爱心状态改为空心
      dbutils.getData.getDataFromId('userInfo').then(res => {
        console.log('passCollectIndex:',passCollectIndex, 'passCollectType:', passCollectType)
        let temp = res.data.users
        console.log('temp', temp)
        for(let i = 0; i<temp.length; i++) {
          if(temp[i].username === 'userA') {
            this.setData({
              index: i
            })
          }
        }
        for (let j = 0; j < temp[this.data.index].collections.length; j++) {
          if (temp[this.data.index].collections[j].itemId === passCollectIndex && temp[this.data.index].collections[j].class === passCollectType) {
            temp[this.data.index].collections.splice(j, 1);
          }
        }  
        dbutils.update('userInfo', `users.${this.data.index}.collections`, temp[this.data.index].collections)//取消收藏：将此图片及其信息在userInfo表中对应用户的collections对象中删除
      }) 
    }
    wx.redirectTo({
      url: '../collectInformation/collectInformation',
    })
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

})