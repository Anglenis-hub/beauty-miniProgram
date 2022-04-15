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
    }
  },
  observers:{
    // 'tabButton': function(val){
    //   console.log(val)
    // },
    'num': function(val){
      console.log("head-num: "+val)
    }
  }
})