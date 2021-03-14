<template>
  <div>
    <div class="soltion">
      <div class="banner">
        <img :src="solutionObj.fileAddress ? solutionObj.fileAddress : $store.state.defaultImg" alt="" />
        <h3>解决方案</h3>
      </div>
      <div class="soltion-project">
        <h4 style="margin-left: 3.3rem;">PROJECT BACKGROUND</h4>
        <h5 style="margin-left : 3.3rem">项目背景</h5>
        <p>未来的智慧医院建设将是以顶层设计、整体规划、合理布局、分布实施、阶段跟踪为基础，研究国内外先进建设经验，结合医院自身特色，充分发挥云计算、大数据、新一代互联网等先进信息化技术，提高整体信息资源的利用率，加强区域医疗协作；加强医疗大数据的分析和挖掘能力，改善医疗质量水平，提升精细化管理能力，支撑医院管理运营，为患者提供优质医疗服务；在项目实施过程中稳步推进，持续改善；最终，构建完整智慧医院，促进医疗事业的可持续健康发展。</p>
      </div>
      <h4 style="margin-left: 6.3rem;">SOLVE PROBLEM</h4>
      <h5 style="margin-left: 6.3rem; margin-bottom : 4rem">解决问题</h5>
      <div class="soltion-card" v-for="item in activeObj.jjwtList" :key="item.solutionDescriptionId">
        <img :src="item.image ? item.image : $store.state.defaultImg" alt="" />
        <h6>{{ item.textTitle }}</h6>
        <p>{{ item.textContent }}</p>
      </div>
      <div class="advantage">
        <h4 style="margin-top: 7.7rem; margin-left: 6.3rem;">SOLUTION ADVANTAGE</h4>
        <h5 style="margin-left: 6.3rem;">方案优势</h5>
        <div class="advantage-card" v-for="item in activeObj.faysList" :key="item.solutionDescriptionId">
          <div class="img">
            <img :src="item.image ? item.image : $store.state.defaultImg" alt="" />
          </div>
          <h6>{{ item.textTitle }}</h6>
          <p>{{ item.textContent }}</p>
        </div>
      </div>
      <div class="swiper">
        <h4 style="margin-left: 4.6rem; margin-top: 5.7rem;">PARTNER</h4>
        <h5 style="margin-left: 4.6rem;">合作伙伴</h5>
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item, index) in solutionObj.hzhbList" :key="index">
            <img :src="item ? item : $store.state.defaultImg" alt="" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Solution',
  components: {
    Swiper,
    SwiperSlide,
  },
  activated() {
    // 判断created里面是否已经赋值了
    if (this.solutionObj == {}) {
      this.activeObj = this.solutionObj.solutionList[this.$route.query.id]
    }
  },
  created() {
    this.$axios.get('GetSolutionInfo?RequestSource=21').then((res) => {
      if (res.status) {
        this.solutionObj = res.data.data[0]
        // 需要根据索引循环不同的soutionList
        this.activeObj = this.solutionObj.solutionList[this.$route.query.id]
        console.log(this.activeObj)
      } else {
        this.$toast.fail(res.message)
      }
    })
  },
  data() {
    return {
      // 根据id切换的数据
      activeObj: {},
      solutionObj: {},
      swiperOptions: {
        autoplay: true,
        slidesPerView: 2,
        slidesPerColumn: 2,
        spaceBetween: 10,
      },
    }
  },
  watch: {
    $route: function() {
      this.activeObj = this.solutionObj.solutionList[this.$route.query.id]
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper {
  .swiper-container {
    margin-top: 3.7rem;
    margin-left: 4.6rem !important;
    height: 30rem;
    width: 70rem !important;
    overflow: hidden;
    .swiper-slide {
      width: 32rem !important;
      height: 11.7rem;
      background-color: #ffffff;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.soltion .soltion-project {
  box-sizing: border-box;
  padding-top: 4.1rem;
  margin: 3rem 3rem 5.1rem 3rem;
  width: 69rem;
  height: 44.3rem;
  background-color: #ffffff;
}
.soltion h4 {
  width: 44.7rem;
  height: 3.6rem;
  font-size: 3rem;
  font-weight: 300;
  color: #333333;
  line-height: 4.8rem;
}
.soltion h5 {
  margin-top: 0.9rem;
  width: 20rem;
  height: 3.8rem;
  font-size: 3.4rem;
  font-weight: 500;
  color: #333333;
  line-height: 4.8rem;
}
.soltion .soltion-project p {
  margin-top: 3.3rem;
  margin-left: 3.3rem;
  overflow: scroll;
  width: 62.6rem;
  height: 23.3rem;
  font-size: 2.8rem;
  font-weight: 400;
  color: #666666;
  line-height: 4.5rem;
}
.soltion .soltion-project p::-webkit-scrollbar {
  display: none;
}
.soltion .soltion-card {
  margin-top: 2rem;
  margin-left: 3rem;
  width: 69rem;
  height: 20.7rem;
  background-color: #ffffff;
}
.soltion .soltion-card img {
  margin-top: 4.1rem;
  margin-left: 2.9rem;
  width: 4.8rem;
  height: 4.8rem;
}
.soltion .soltion-card h6 {
  margin-top: -6rem;
  margin-left: 9.7rem;
  height: 4.5rem;
  font-size: 3.2rem;
  font-weight: 400;
  color: #333333;
  line-height: 4.5rem;
  overflow: hidden;
}
.soltion .soltion-card p {
  margin-top: 1.3rem;
  margin-left: 9.7rem;
  width: 57.9rem;
  height: 9rem;
  font-size: 2.6rem;
  font-weight: 400;
  color: #666666;
  line-height: 4.5rem;
  overflow: hidden;
}
.soltion .advantage-card {
  margin-bottom: 5.8rem;
}
.soltion .advantage-card .img {
  margin-top: 8.4rem;
  margin-left: 32.5rem;
  width: 9.8rem;
  height: 9.8rem;
  border: 0.2rem solid #50c19a;
}
.soltion .advantage-card .img img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.soltion .advantage-card h6 {
  text-align: center;
  margin-top: 2.5rem;
  height: 4.5rem;
  font-size: 3.2rem;
  font-weight: 400;
  color: #333333;
  line-height: 4.5rem;
  overflow: hidden;
}
.soltion .advantage-card p {
  text-align: center;
  margin-top: 1.4rem;
  margin-left: 5.3rem;
  width: 64.3rem;
  height: 9rem;
  font-size: 2.6rem;
  font-weight: 400;
  color: #666666;
  line-height: 4.5rem;
}
.advantage {
  margin-top: 3.2rem;
  background-color: #ffffff;
  box-sizing: border-box;
  padding-top: 4.5rem;
  padding-bottom: 7.5rem;
}
</style>
