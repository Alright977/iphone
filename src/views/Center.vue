<template>
  <div class="center">
    <div class="center">
      <div class="banner">
        <img :src="centerBanner" alt="" />
        <h3>新闻中心</h3>
      </div>
      <div class="scoll-content" @scroll="scroll">
        <div class="center-card" v-for="(item, index) in centerList" :key="item.newid" @click="detailClick(index)">
          <img :src="item.fileAddress ? item.fileAddress : $store.state.defaultImg" alt="" />
          <h4>{{ item.newTitle }}</h4>
          <p>{{ item.createDate }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Center',
  created() {
    this.$axios
      .get('GetNewTableInfo', {
        params: {
          PageIndex: this.PageIndex,
          PageSize: this.PageSize,
        },
      })
      .then((res) => {
        if (res.status) {
          this.centerList = res.data.data
          this.count = res.data.count
        } else {
          this.$toast.fail(res.message)
        }
      })
    this.$axios.get('GetNewInfo?RequestSource=21').then((res) => {
      if (res.status) {
        this.centerBanner = res.message
      } else {
        this.$roast.fail(res.message)
      }
    })
  },
  data() {
    return {
      centerList: [],
      centerBanner: '',
      PageIndex: 1,
      PageSize: 4,
      // 动态请求开关
      lock: false,
      // 新闻总条数
      count: null,
    }
  },
  methods: {
    detailClick(index) {
      this.$router.push({
        path: '/detail',
        query: {
          id: this.centerList[index].newId,
        },
      })
    },
    scroll(e) {
      // 滚动条高度
      const scollHeight = e.target.scrollHeight
      // 滚动条距离顶部距离
      const scolltop = e.target.scrollTop
      // 可视距离的高度
      const offsetHeight = e.target.offsetHeight
      // 距离底部的高度
      const bottomHeight = scollHeight - offsetHeight - scolltop
      // 判断数据是否请求完
      if (this.centerList.length >= this.count) {
        return
      }
      if (bottomHeight < 5 && !this.lock) {
        this.PageSize = this.PageSize + 4
        this.lock = true
        this.$axios
          .get('GetNewTableInfo', {
            params: {
              PageIndex: this.PageIndex,
              PageSize: this.PageSize,
            },
          })
          .then((res) => {
            if (res.status) {
              this.lock = false
              this.centerList = res.data.data
            } else {
              this.$toast.fail(res.message)
            }
          })
      }
    },
  },
}
</script>

<style scoped lang="scss">
.center {
  .scoll-content {
    height: 100rem;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
.center .center-card {
  margin-top: 5rem;
  margin-left: 5.4rem;
  margin-bottom: 4.1rem;
}
.center .center-card h4 {
  margin-top: -19.5rem;
  margin-left: 31.8rem;
  width: 35.2rem;
  height: 9rem;
  font-size: 3rem;
  font-weight: 400;
  color: #333333;
  line-height: 4.6rem;
}
.center .center-card p {
  margin-left: 31.8rem;
  margin-top: 6.6rem;
  height: 3.7rem;
  font-size: 2.6rem;
  font-weight: 300;
  color: #666666;
  line-height: 3.7rem;
}
.center .center-card img {
  width: 28.8rem;
  height: 19.2rem;
  object-fit: cover;
}
</style>
