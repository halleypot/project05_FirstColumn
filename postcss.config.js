module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, // 设置基准值
      propList: ['*'], // 所有css属性只要带px都转rem
    },
  },
};