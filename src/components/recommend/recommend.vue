<template>
  <div class="recommend">
    <Scroll class="recommend-content" :data="discList">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="item in recommends">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" alt="">
            </a>
          </div>
        </slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in discList" class="item">
            <div class="icon">
              <img :src="item.picUrl" width="60" height="60">
            </div>
            <div class="text">
              <h2 class="name" v-text="item.songListAuthor"></h2>
              <p class="desc" v-text="item.songListDesc"></p>
            </div>
          </li>
        </ul>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import Scroll from 'base/scroll/scroll'
  import {getRecommend} from 'api/recommend'
  import {ERR_OK} from 'api/config'

  export default {
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()
    },
    methods: {
      _getRecommend() {
        getRecommend().then(res => {
          if (res.code === ERR_OK) {
            this.recommends = res.data.slider
            this.discList = res.data.songList
          }
        })
      }
    },
    components: {
      Slider,
      Scroll
    }
  }
</script>

<style scoped lang="stylus">
	@import "~common/stylus/variable"

	.recommend
		position: relative
		width: 100%
		top: 88px
		bottom: 0
		.recommend-content
			height: 100%
			overflow: hidden
			.slider-wrapper
				position: relative
				width: 100%
				overflow: hidden
			.recommend-list
				.list-title
					height: 65px
					line-height: 65px
					text-align: center
					font-size: $font-size-medium
					color: $color-theme
				.item
					display: flex
					box-sizing: border-box
					align-items: center
					padding: 0 20px 20px 20px
					.icon
						flex: 0 0 60px
						width: 60px
						padding-right: 20px
					.text
						display: flex
						flex-direction: column
						justify-content: center
						flex: 1
						line-height: 20px
						overflow: hidden
						font-size: $font-size-medium
						.name
							margin-bottom: 10px
							color: $color-text
						.desc
							color: $color-text-d
</style>