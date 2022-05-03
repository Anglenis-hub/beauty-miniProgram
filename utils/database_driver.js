const tableName = 'beautyTable'
const userTable = 'users'
const itemTable = 'items'
const db = wx.cloud.database()
const _ = db.command
//获取数据库数据
export const getData = {
  fromId(id) {
    return db.collection(tableName).doc(id).get()
  },
  //通过id获得表信息
  getDataFromId(id) {
    return db.collection(tableName).doc(id).get()
  },
  //获取某数据库信息
  database() {
    return db.collection(tableName)
  }
}

export const userIsExists = (openid) => {
  return db.collection(userTable).doc(openid).get()
}

//注册用户
export const signUp = (name, avatarUrl, openid) => {
  return db.collection(userTable).add({
    data: {
      _id: openid,
      username: name,
      avatarUrl: avatarUrl,
      collections: {}
    }
  })
}

export const insertItem = (info) => {
  let hash = getHash(info.shopName + info.title + info.staffName)
  db.collection(itemTable).add({
    data: {
      _id: hash,
      type: info.type,
      imageURL: info.imageURL,
      address: info.address,
      price: info.price,
      shopName: info.shopName,
      shopImageURL: info.shopImageURL,
      staffName: info.staffName,
      staffImage: info.staffImage,
      staffInfo: info.staffInfo,
      time: info.time,
      title: info.title
    },
    // 如果项目已存在，提示错误信息
    fail: function (res) {
      if (res.errMsg === '[FailedOperation.DuplicateWrite] multiple write,duplicate key error collection') {
        console.log("item already exists")
      }
    }
  })
}

//向数组插入数据
export const insert = (id, arr, insertData) => {
  db.collection(tableName).doc(id).update({
    data: {
      [arr]: _.push(insertData)
    },
    sucess: function (res) {
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
    sucess: function (res) {
      console.log(res.data)
    }
  })
}