Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabButton:{
      type: Object,
      value: {}
    },
    num: {
      type: String,
      value: ''
    },
    hairImgs: {
      type: Array,
      value: []
    },
    makeupImgs: {
      type: Array,
      value: []
    },
    nailImgs: {
      type: Array,
      value: []
    }
  },
  data: {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
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
    hairImgClick() {
      wx.navigateTo({
        url: '../../pages/information/information',
        success:()=>{
          wx.setNavigationBarTitle({
            title: '详细信息'
          })
        }
      })
    }
  },
  observers:{
    // 'tabButton': function(val){
    //   console.log(val)
    // },
    // 'num': function(val){
    //   console.log("head-num: "+val)
    // },
    'hairImgs': function(e) {
      console.log(e)
    }
  }
})