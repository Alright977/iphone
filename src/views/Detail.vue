<template>
  <div class="detail">
    <div class="detail">
      <div class="banner">
        <img :src="detailObj.fileAddress ? detailObj.fileAddress : $store.state.defaultImg" alt="" style="margin-left: 0;" />
        <h3>新闻中心</h3>
      </div>
      <h4>{{ detailObj.newTitle }}</h4>
      <span>{{ detailObj.createDate }}</span>
      <div v-html="detailObj.newContent" class="v-html-div"></div>
      <!-- <img src="@/assets/img/detail-img/detail.png" alt="" />
      <p style="margin-bottom: 5.6rem;">楚雄州定制化“全球影像”医疗云服务平台建设项目是2020年上海对口帮扶项目，项目依托“互联网+医疗”科技和上海市对口帮扶医疗资源建设，以州级医院为核心，县级医院为基础的三级联动的医联体平台，实现了医疗影像资源互联互通，推进了无胶片化应用、影像检查远程（移动）诊断及检查结果互认共享，为患者提供连续可动态查阅的影像资料。</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  activated() {
    this.$axios
      .get('GetNewDetailsInfo', {
        params: {
          Newid: this.$route.query.id,
        },
      })
      .then((res) => {
        if (res.status) {
          this.detailObj = res.data.data[0]
        }
      })
  },
  data() {
    return {
      detailObj: {},
    }
  },
}
</script>

<style lang="scss">
.detail {
  .banner {
    width: 75rem;
    height: 36rem;
    img {
      margin-top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.detail h4 {
  margin-top: 5.7rem;
  margin-left: 4.4rem;
  height: 5rem;
  font-size: 3.6rem;
  font-weight: 400;
  color: #333333;
  line-height: 5rem;
}
.detail span {
  margin-top: 1rem;
  margin-left: 4.5rem;
  display: block;
  height: 3rem;
  font-size: 2.2rem;
  font-weight: 400;
  color: #999999;
  line-height: 3rem;
}
.detail .v-html-div {
  p {
    margin-left: 3.2rem;
    margin-top: 2rem;
    width: 66.9rem;
    height: 32.2rem;
    font-size: 2.8rem;
    font-weight: 400;
    color: #666666;
    line-height: 4.6rem;
    object-fit: cover;
    img {
      width: 66.9rem;
      height: 26.9rem;
      object-fit: cover;
    }
  }
}
</style>
