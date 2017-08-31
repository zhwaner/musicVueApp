import {playMode} from 'common/js/config'

// 所有状态
const state = {
  singer: {},
  playing: false, // 是否播放
  fullScreen: false, // 是否全屏
  playList: [], // 播放列表
  sequenceList: [], // 播放模式列表
  mode: playMode.sequence, // 播放模式
  currentIndex: -1 // 播放索引
}

export default state
