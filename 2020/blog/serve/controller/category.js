const CONFIG = require('../config/default')
const Category = require('../models/category')

exports.getList = async (ctx, next) => {
  const list = await Category.find({  });
  return {
    code: 200,
    data: list
  }
}

