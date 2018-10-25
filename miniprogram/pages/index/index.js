//index.js
const app = getApp()

Page({
  data: {
    top: 0,
    left: 0,
    startBtnAnimate: false,
    startMiddleAnimate: false,
    showAuthBtn: true,
    showList: false,
    autoFocus: false,
    inputFocusIndex: -1,
    todos: [
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinner1'
      },
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinner2'
      },
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinne3'
      },
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinner4'
      },
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinner5'
      },
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinner6'
      },
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinner7'
      },
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinner6'
      },
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinner7'
      },
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinner6'
      },
      {
        create_time: '2018-10-23T08:11:23.589Z',
        delete_time: null,
        openid: 'o_n_v0KJFEmnWeZzCuKNuCkaT8-A',
        title: 'dinner7'
      }
    ],
    userInfo: ''
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib'
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData(
                {
                  userInfo: res.userInfo
                },
                () => {
                  this.handleGetList()
                  this.startAnimate()
                }
              )
            }
          })
        }
      }
    })
  },

  onGotUserInfo: function(e) {
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo
    })
    this.handleGetList()
    this.startAnimate()
  },
  handleGetList: function() {
    wx.cloud.callFunction({
      name: 'getList',
      complete: res => {
        console.log(res)
        this.setData({
          // todos: res.result.data
        })
      }
    })
  },
  startAnimate: function() {
    this.setData(
      {
        startBtnAnimate: true,
        startMiddleAnimate: true
      },
      () => {
        setTimeout(() => {
          this.setData({
            showList: true
          })
        }, 1600)
      }
    )
  },
  bindBlockTouchStart: function(e) {
    //console.log(e.changedTouches[0].clientX)
    let touchMove
    if (e.currentTarget.dataset.index != this.data.moveIndex) {
      touchMove = 0
    } else {
      touchMove = this.data.touchMove
    }
    this.setData({
      touchMove: touchMove,
      touchEnd: e.changedTouches[0].clientX,
      touchStart: e.changedTouches[0].clientX,
      moveIndex: e.currentTarget.dataset.index
    })
  },
  bindBlockTouchEnd: function(e) {
    // console.log(e.changedTouches[0].clientX)
    if (this.data.touchMove > 50) {
      this.setData(
        {
          blockAnimateIndex: e.currentTarget.dataset.index,
          showWhich: 'animation-out'
        },
        () => {
          setTimeout(() => {
            this.setData({
              blockAnimateIndex: -1,
              touchMove: 180,
              showWhich: ''
            })
          }, 500)
        }
      )
    } else {
      this.setData(
        {
          blockAnimateIndex: e.currentTarget.dataset.index,
          showWhich: 'animation-in'
        },
        () => {
          setTimeout(() => {
            this.setData({
              blockAnimateIndex: -1,
              touchMove: 0,
              showWhich: ''
            })
          }, 500)
        }
      )
    }
  },
  bindTouchMove: function(e) {
    let touchMove =
      this.data.touchMove - (e.changedTouches[0].clientX - this.data.touchEnd)
    console.log(touchMove)
    this.setData({
      touchEnd: e.changedTouches[0].clientX,
      touchMove: touchMove
    })
  },
  bindAddBtn: function() {
    let todos = this.data.todos
    console.log()
    if (typeof todos[0] == 'string') {
      return
    }
    todos.unshift('')
    this.setData({
      autoFocus: true,
      todos,
      inputFocusIndex: 0
    })
  },
  bindInpBlur: function(e) {
    let { todos } = this.data
    if (e.detail.value.replace(/(^\s*)|(\s*$)/g, '').length == 0) {
      todos.splice(e.currentTarget.dataset.index, 1)
      this.setData({
        todos,
        autoFocus: false
      })
    } else {
    }
  }
})
