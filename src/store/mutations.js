import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, singer) { // 方法名为types里面的SET_SINGER
    state.singer = singer
  }
}

export default mutations
