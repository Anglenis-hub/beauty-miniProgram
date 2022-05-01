wx.cloud.init({
  env: 'cloud1-2ghfekqc5cf347a4'
})
const tableName = 'beautyTable'
const db = wx.cloud.database()
const _ = db.command

export const getData = {
    getDataFromId(id) {
        return db.collection(tableName).doc(id).get()
    },
    database() {
      return db.collection(tableName)
    }
}
export const signIn = (name, pwd) => {
  db.collection(tableName).doc('userInfo').update({
    data: {
      users: _.push({username: name, password: pwd, collection: {}})
    },
    sucess: function(res) {
      console.log(res.data)
    }
  })
}