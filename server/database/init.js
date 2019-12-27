const mongoose = require('mongoose');
const db = 'mongodb://127.0.0.1:27017/douban-test';
const glob = require('glob')
const { resolve } = require('path')

mongoose.Promise = global.Promise;

exports.initSchemas = () => {
  glob.sync((resolve(__dirname, './schema/', '**/*.js'))).forEach(require)
}

exports.initAdmin = async () => {
  const User = mongoose.model('User');

  let users = await User.findOne({
    username: 'xuji'
  })

  if (!users) {
    const user = new User({
      username:'xuji',
      email:'xuji@123.com',
      password:'123456',
      role: 'admin'
    })
  
    await user.save();
  }
}

exports.connect = () => {
  let maxConnectTimes = 0;

  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug',true)
    }
  
    mongoose.connect(db, {
      useNewUrlParser:true
    });
    
    mongoose.connection.on('disconnected', () => {
      maxConnectTimes ++
      if (maxConnectTimes < 5) {
        mongoose.connect(db);
      } else {
        throw new Error('数据库挂啦！！！')
      }
    })
  
    mongoose.connection.on('error', err => {
      reject(err)
      console.log(err);
    })
  
    mongoose.connection.once('open', () => {
      // const Dog = mongoose.model('Dog', { name: String });
      // const daga = new Dog({ name: '阿尔法' });

      // daga.save().then(() => {
      //   console.log('wang')
      // })
      resolve()
      console.log('mongodb Connected successFully');
    })
  })
}