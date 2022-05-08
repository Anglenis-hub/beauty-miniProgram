const utils = require('../../utils/util')
const dbutils = require('../../utils/database_driver')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabButton: {
      type: Object,
      value: {}
    },
    page: {
      type: String,
      value: ''
    },
    num: {
      type: String,
      value: ''
    },
    imgs: {
      type: Object,
      value: {}
    },
    imgCounts: {
      type: Object,
      value: {}
    },
    inputvalue: {
      type: String,
      value: ''
    },
    collectNumInfo: {
      type: String,
      value: ''
    }
  },
  data: {
    clearShow: false,
    searchedIsNull: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e) {
      // console.log(e)
      if (this.data.num !== e.currentTarget.id) {
        utils.scrollTop()
      }
      this.setData({
        num: e.currentTarget.id
      })
      let imgs = {}
      dbutils.items.search(e.currentTarget.dataset.inputvalue, e.currentTarget.id).then(res => {
        console.log(res.data);
        if (res.data.length === 0) {
          this.setData({
            searchedIsNull: true
          })
          return
        } else {
          this.setData({
            searchedIsNull: false
          })
        }
        imgs[e.currentTarget.id] = res.data
        this.setData({
          imgs: imgs
        })
      })
    },
    imgClick: function (e) {
      // console.log('e.currentTarget.dataset', e.currentTarget.dataset)
      const clickPassImageID = e.currentTarget.dataset.id
      wx.setStorageSync('clickPassImageID', clickPassImageID)
      wx.navigateTo({
        url: '../../pages/information/information',
        success: () => {
          wx.setNavigationBarTitle({
            title: '详细信息'
          })
        }
      })
    },
    bindInputData: function (e) {
      this.setData({
        inputvalue: e.detail.value
      });
    },
    searchClick: function (e) {
      // console.log(e.detail.value)
      let imgs = {}
      dbutils.items.search(e.detail.value, this.data.num).then(res => {
        console.log(res.data);
        if (res.data.length === 0) {
          this.setData({
            searchedIsNull: true
          })
          return
        } else {
          this.setData({
            searchedIsNull: false
          })
        }
        imgs[this.data.num] = res.data
        this.setData({
          imgs: imgs
        })
      })
    },
    clearClick() {
      this.setData({
        inputvalue: ''
      });
      //清空搜索内容，获取全部内容
      let imgs = {}
      dbutils.items.search('', this.data.num).then(res => {
        if (res.data.length === 0) {
          this.setData({
            searchedIsNull: true
          })
          return
        } else {
          this.setData({
            searchedIsNull: false
          })
        }
        imgs[this.data.num] = res.data
        this.setData({
          imgs: imgs
        })
      })
    }
  },
  observers: {
    'inputvalue': function (e) {
      // console.log(e)
      if (e) {
        this.setData({
          clearShow: true
        })
      } else {
        this.setData({
          clearShow: false
        })
      }
    },
    'imgCounts, num': function (imgCounts, num) {
      const sessionIsExpired = wx.getStorageSync('sessionIsExpired')
      if (!sessionIsExpired) {
        this.setData({
          collectNumInfo: imgCounts[num] + '件'
        })
      }
    }
  }
})