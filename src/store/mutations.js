import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) { // 方法名为types里面的SET_SINGER
    state.singer = singer
  },
  [types.SET_PLAYING_STATE] (state, flag) { // 方法名为types里面的SET_SINGER
    state.playing = flag
  },
  [types.SET_FULL_SCREEN] (state, flag) { // 方法名为types里面的SET_SINGER
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST] (state, list) { // 方法名为types里面的SET_SINGER
    state.playList = list
  },
  [types.SET_SEQUENCE_LIST] (state, list) { // 方法名为types里面的SET_SINGER
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE] (state, mode) { // 方法名为types里面的SET_SINGER
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX] (state, index) { // 方法名为types里面的SET_SINGER
    state.currentIndex = index
  }
}

export default mutations
