wx.cloud.init({
  env: 'cloud1-2ghfekqc5cf347a4'
})
const tableName = 'beautyTable'
const db = wx.cloud.database()
const _ = db.command
//获取数据库数据
export const getData = {
    //通过id获得表信息
    getDataFromId(id) {
        return db.collection(tableName).doc(id).get()
    },
    //获取某数据库信息
    database() {
      return db.collection(tableName)
    }
}
//注册用户
export const signIn = (name, pwd) => {
  db.collection(tableName).doc('userInfo').update({
    data: {
      users: _.push({username: name, password: pwd, collections: []})
    },
    sucess: function(res) {
      console.log(res.data)
    }
  })
}
//向数组插入数据
export const insert = (id, arr, insertData) => {
  db.collection(tableName).doc(id).update({
    data: {
      [arr]: _.push(insertData)
    },
    sucess: function(res) {
      console.log(res.data)
    }
  })
}
//更新数据
export const update = (id, key, updateData) => {
  db.collection(tableName).doc(id).update({
    data: {
      [key]: updateData
    },
    sucess: function(res) {
      console.log(res.data)
    }
  })
}