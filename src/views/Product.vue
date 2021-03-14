<template>
  <div class="product">
    <div class="banner">
      <img :src="productObj.bannerFileAddress ? productObj.bannerFileAddress : $store.state.defaultImg" alt="" />
      <h3>产品服务</h3>
    </div>
    <div class="digital">
      <h6>{{ activeObj.englishTitle }}</h6>
      <h5>{{ activeObj.chineseTitle }}</h5>
      <div class="tag-flex">
        <div class="tag" v-for="(item, index) in activeObj.productServiceTagList" :key="index">{{ item }}</div>
      </div>
      <img :src="activeObj.fileAddress ? activeObj.fileAddress : $store.state.defaultImg" alt="" />
      <div v-html="activeObj.productServiceContent" class="v-html-div"></div>
    </div>
    <div class="solve">
      <h6>SOLVE PROBLEM</h6>
      <h5>解决问题</h5>
      <div class="solve-flex" v-for="(item, index) in activeObj.jjwtList" :key="index">
        <img :src="item.image ? item.image : $store.state.defaultImg" alt="" />
        <p>{{ item.textTitle }}</p>
      </div>
    </div>
    <div class="benefits">
      <h6> PRODUCT BENEFITS</h6>
      <h5>产品效益</h5>
      <div v-html="activeObj.productBenefit"></div>
    </div>
    <div class="application">
      <h6> APPLICATION SCENARIOS</h6>
      <h5>应用场景</h5>
      <div class="application-flex">
        <div class="app" v-for="(item, index) in activeObj.yycjList" :key="index">
          <img :src="item.image ? item.image : $store.state.defaultImg" alt="" />
          <p>{{ item.textTitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Product',
  activated() {
    // 判断是否已经走了created
    if (this.productObj.length == {}) {
      this.activeObj = this.productObj.productServiceInfoList[this.$route.query.id]
    }
  },
  created() {
    this.$axios.get('GetProductService?RequestSource=21').then((res) => {
      if (res.status) {
        this.productObj = res.data.data[0]
        // 根据切换下标来渲染数据
        this.activeObj = this.productObj.productServiceInfoList[this.$route.query.id]
      } else {
        this.$toast.fail(res.message)
      }
    })
  },
  data() {
    return {
      activeObj: {},
      productObj: {},
    }
  },
  watch: {
    $route: function() {
      this.activeObj = this.productObj.productServiceInfoList[this.$route.query.id]
    },
  },
}
</script>

<style lang="scss">
.product {
  .digital {
    box-sizing: border-box;
    padding-top: 5.8rem;
    background-color: #ffffff;
    h6 {
      margin-left: 6.3rem;
      height: 3.6rem;
      font-size: 3rem;
      font-weight: 300;
      color: #333333;
      line-height: 4.8rem;
    }
    h5 {
      margin-top: 0.9rem;
      margin-left: 6.3rem;
      height: 3.8rem;
      font-size: 3.4rem;
      font-weight: 500;
      color: #333333;
      line-height: 4.8rem;
    }
    .tag-flex {
      display: flex;
      flex-wrap: wrap;
      margin-top: 4.9rem;
      margin-left: 6.3rem;
      .tag {
        box-sizing: border-box;
        padding-left: 1.9rem;
        margin-right: 1.8rem;
        margin-bottom: 1.8rem;
        width: 20rem;
        height: 4.2rem;
        line-height: 4.2rem;
        color: #50c19a;
        border: 0.2rem dashed #50c19a;
      }
    }
    img {
      margin-top: 2.7rem;
      margin-left: 4.2rem;
      width: 66.6rem;
      height: 26.9rem;
      object-fit: cover;
    }
    p {
      margin-top: 3.1rem;
      margin-left: 4.2rem;
      width: 66.6rem;
      font-size: 2.8rem;
      font-weight: 400;
      color: #666666;
      line-height: 4.5rem;
    }
    .v-html-div {
      margin-top: 3.1rem;
      margin-left: 4.2rem;
      width: 66.6rem;
      font-size: 2.8rem;
      font-weight: 400;
      color: #666666;
      line-height: 4.5rem;
      p {
        margin-left: 0;
      }
    }
  }
  .solve {
    background-color: #f3f4f5;
    padding: 7rem 0 2.4rem 6.3rem;
    h6 {
      width: 44.7rem;
      height: 3.6rem;
      font-size: 3rem;
      font-weight: 300;
      color: #333333;
      line-height: 4.8rem;
    }
    h5 {
      margin-top: 0.9rem;
      margin-bottom: 6.5rem;
      width: 20rem;
      height: 3.8rem;
      font-size: 3.4rem;
      font-weight: 500;
      color: #333333;
      line-height: 4.8rem;
    }
    .solve-flex {
      display: flex;
      margin-bottom: 4rem;
      img {
        margin-right: 2.6rem;
        width: 3.8rem;
        height: 3.8rem;
        object-fit: cover;
      }
      p {
        height: 4rem;
        font-size: 2.8rem;
        font-weight: 400;
        color: #333333;
        line-height: 4rem;
      }
    }
  }
  .benefits {
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 6.4rem 0 4.3rem 6.3rem;
    h6 {
      height: 3.6rem;
      font-size: 3rem;
      font-weight: 300;
      color: #333333;
      line-height: 4.8rem;
    }
    h5 {
      margin-top: 0.9rem;
      margin-bottom: 4.4rem;
      height: 3.8rem;
      font-size: 3.4rem;
      font-weight: 500;
      color: #333333;
      line-height: 4.8rem;
    }
    p {
      width: 62.6rem;
      font-size: 2.8rem;
      font-weight: 400;
      color: #666666;
      line-height: 4.5rem;
    }
  }
  .application {
    box-sizing: border-box;
    padding: 5.2rem 0 3.1rem 0;
    background-color: #f3f4f5;
    h6 {
      margin-left: 5.2rem;
      height: 3.6rem;
      font-size: 3rem;
      font-weight: 300;
      color: #333333;
      line-height: 4.8rem;
    }
    h5 {
      margin-left: 6.3rem;
      margin-top: 0.9rem;
      height: 3.8rem;
      font-size: 3.4rem;
      font-weight: 500;
      color: #333333;
      line-height: 4.8rem;
      margin-bottom: 4.4rem;
    }
    .application-flex {
      display: flex;
      flex-wrap: wrap;
      margin-left: 4.5rem;
      .app {
        margin-right: 2.8rem;
        margin-bottom: 2.9rem;
        width: 31rem;
        height: 24.024rem;
        background-color: #ffffff;
        img {
          width: 31.08rem;
          height: 17.3rem;
          object-fit: cover;
          margin-bottom: 2.6rem;
        }
        p {
          margin-left: 7.3rem;
          height: 1.6rem;
          font-size: 2.4rem;
          font-weight: 400;
          color: #333333;
          line-height: 1.6rem;
        }
      }
    }
  }
}
</style>
