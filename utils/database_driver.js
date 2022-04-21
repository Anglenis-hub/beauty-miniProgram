wx.cloud.init({
  env: 'cloud1-2ghfekqc5cf347a4'
})
const tableName = 'beautyTable'
const db = wx.cloud.database()
const _ = db.command
// let name = ''

export const getData = {
    getDataFromId(id) {
        return db.collection(tableName).doc(id).get()
    }
}