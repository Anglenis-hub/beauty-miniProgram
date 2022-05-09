const uploadImg = (page,photo, cloudPath) => {
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success : (res)=>{
      // console.log('res',res);
      const tempFilePaths = res.tempFilePaths[0];
      page.setData({
        [photo]: tempFilePaths
      })
      wx.cloud.uploadFile({
        cloudPath: cloudPath,
        filePath: res.tempFilePaths[0],
        success: res => {
          // get resource ID
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      })
      console.log('tempFilePaths', tempFilePaths);
    }
  })
}

Page({
  data: {
    workPhoto: ''
  },
  onShow() {

  },
  uploadWorkImg() {
    let cloudPath = 'images/' + wx.getStorageSync('openid') + Date.now() + '.jpg'
    uploadImg(this, 'workPhoto', cloudPath)
  },
  uploadShopImg() {},
  uploadStaffImg() {},
  publishClick() {
    uploadImg(this, 'workPhoto', `test/${wx.getStorageSync('openid')}${Date.now()}.jpg`)
    return
    let item = {
      "shopName": '引领潮流',
      "staffDescription": "从事理发行业近8年时间，全面的技术经验，95%以上顾客满意率",
      "staffImageURL": 'cloud://cloud1-2ghfekqc5cf347a4.636c-cloud1-2ghfekqc5cf347a4-1309526496/images/staff-female2.jpg',
      "address": '江西省沈阳县蓟州成都路U座',
      "shopImageURL": 'cloud://cloud1-2ghfekqc5cf347a4.636c-cloud1-2ghfekqc5cf347a4-1309526496/images/shopImage4.jpg',
      "staffName": '张美丽',
      "time": "周一~周日9：00-22：00",
      "serviceDuration": 180,
      "title": '可爱美丽短发',
      "type": 'hair',
      "imageURL": 'cloud://cloud1-2ghfekqc5cf347a4.636c-cloud1-2ghfekqc5cf347a4-1309526496/images/hair2.jpg',
      "price": 500
    }
    dbutils.items.add(item)
  }
})