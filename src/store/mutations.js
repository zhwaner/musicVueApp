import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) { // 方法名
    state.singer = singer
  }
}

export default mutations
