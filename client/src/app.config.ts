export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/search/index',
    'pages/debug/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'Pupuya',
    navigationBarTextStyle: 'black'
  },
  h5: {
    router: {
      mode: 'hash'
    }
  }
})
