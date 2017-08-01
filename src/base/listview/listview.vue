<template>
  <scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" :data-index="index" class="item" :class="{'current': index === currentIndex}">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import {getData} from 'common/js/dom'

  const ANCHOR_HEIGHT = 18 // 右侧首字母导航一个字母的高度

  export default {
    created() {
      this.touch = {} // 保存触摸数据
      this.listenScroll = true
      this.listHeight = [] // 左边各个分类对应的高度
      this.probeType = 3
    },
    data() {
      return {
        scrollY: -1, // 滚动的距离
        currentIndex: 0 // 高亮index
      }
    },
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {
      shortcutList() {
        return this.data.map((group) => {
          return group.title.substr(0, 1)
        })
      }
    },
    methods: {
      onShortcutTouchStart(e) {
        let anchorIndex = getData(e.target, 'index') // 当前触摸元素index
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY // 当前触摸元素y位置
        this.touch.anchorIndex = anchorIndex
        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        // 不能跟touchstart一样获取index
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = Math.floor((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) // 获取y轴上的偏移量，除以单位值，再向下取整|0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta // move中触摸元素index
        this._scrollTo(anchorIndex)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      _scrollTo(index) {
        this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)// 第二个参数为移动是否要动画
      },
      _calculateHeight() {
        this.listHeight = []
        const list = this.$refs.listGroup
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
        console.log(this.listHeight)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()// 监听data变化，更新高度数组
        }, 20)
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        for (let i = 0; i < listHeight.length; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (!height2 || (-newY >= height1 && -newY < height2)) {
            this.currentIndex = i
            console.log(this.currentIndex)
            return
          }
        }
        this.currentIndex = 0
      }
    },
    components: {
      Scroll
    }
  }
</script>

<style scoped lang = "stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)

</style>
