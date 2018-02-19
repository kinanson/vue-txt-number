module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: { //設定規則0為關閉，1為警告，2直接出錯，也可用英文設定off or warn or error
    'arrow-parens': 0,
    'no-new': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}