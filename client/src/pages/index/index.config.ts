export default definePageConfig({
  navigationBarTitleText: 'Pupuya',
  navigationStyle: 'custom',
  backgroundColor: '#f8f8f8',
  enablePullDownRefresh: true,
  onReachBottomDistance: 100,
  // H5特定配置
  h5: {
    navigationBarBackgroundColor: '#ffffff',
    navigationBarTextStyle: 'black',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'dark'
  }
})
