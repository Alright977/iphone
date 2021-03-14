<template>
  <div>
    <div class="index">
      <div class="index-video">
        <video :src="homeObj.bannerFileAddress" autoplay muted v-show="!homeObj.bannerFileAddress"></video>
        <img :src="homeObj.bannerFileAddress" alt="" v-show="homeObj.bannerFileAddress" />
      </div>
      <div class="index-about">
        <img src="@/assets/img/home-img/home.png" alt="" />
        <h6 class="h6-about-1">愿景</h6>
        <p class="p-about-1">成为医疗领域的领导先锋</p>
        <h6 class="h6-about-2">使命</h6>
        <p class="p-about-2">我们建设江西本地化医疗企业，为江西医疗的发展提供有力保障，生命不息，勇往直前</p>
        <h6 class="h6-about-3">核心价值观</h6>
        <p class="p-about-3">创新，诚信，专业</p>
      </div>
      <div class="medical">
        <h3>MEDICAL SOLUTIONS</h3>
        <h4>综合解决方案</h4>
      </div>
      <div v-for="(item, index) in homeInfoObj.jjwtList" :key="item.solutionId">
        <img :src="item.fileAddress" alt="" />
        <div class="medical-card">
          <h6>{{ item.solutionName }}</h6>
          <p v-html="item.projectBackground"></p>
          <div class="btn" @click="solutionClick(index)">
            <a href="javascript:;">了解更多<i class="iconfont icon-arrowRight"></i></a>
          </div>
        </div>
      </div>
      <div class="product">
        <h3>PRODUCT SERVICE</h3>
        <h4>产品服务</h4>
      </div>
      <div class="service">
        <div class="service-card" v-for="(item, index) in homeInfoObj.cpfwList" :key="item.productServiceId">
          <img :src="item.fileAddress ? item.fileAddress : $store.state.defaultImg" alt="" />
          <h6>{{ item.chineseTitle }}</h6>
          <div class="card-content" v-html="item.productServiceContent"></div>
          <div class="btn" @click="productSeriveClick(index)">
            <a href="javascript:;">了解更多<i class="iconfont icon-arrowRight" style="margin-left:1rem"></i></a>
          </div>
        </div>
      </div>
      <div class="current">
        <h3>CURRENT EVENTS</h3>
        <h4>新闻中心</h4>
      </div>
      <div class="current-card" style="margin-top: 3rem;" v-for="(item, index) in homeInfoObj.newList" :key="item.newid">
        <img :src="item.fileAddress ? item.fileAddress : $store.state.defaultImg" alt="" />
        <h6>{{ item.newI }}</h6>
        <p class="p-1">{{ item.createDate }}</p>
        <p class="p-2">{{ item.newDescription }}</p>
        <div class="btn" @click="newCenterClick(index)">
          <a href="javascript:;">了解更多<i class="iconfont icon-arrowRight" style="margin-left:1rem"></i></a>
        </div>
      </div>
      <div class="map">
        <h4>MEDICAL SOLUTIONS</h4>
        <h3>服务网点</h3>
        <div class="echarts" ref="echarts"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  created() {
    this.$axios.get('GetHomeInfo?RequestSource=21').then((res) => {
      if (res.status) {
        this.homeObj = res.data.data[0]
        this.homeInfoObj = this.homeObj.homeInfo
      } else {
        this.$Toast.fail(res.message)
      }
    })
  },
  data() {
    return {
      homeObj: {},
      homeInfoObj: {},
    }
  },
  mounted() {
    this.echartInit()
  },
  methods: {
    // 解决方案跳转
    solutionClick(index) {
      this.$router.push({
        path: '/solution',
        query: {
          id: index,
        },
      })
    },
    // 产品服务跳转
    productSeriveClick(index) {
      this.$router.push({
        path: '/product',
        query: {
          id: index,
        },
      })
    },
    // 新闻中心跳转
    newCenterClick(index) {
      let newId = this.homeInfoObj.newList[index].newId
      this.$router.push({
        path: '/detail',
        query: {
          id: newId,
        },
      })
    },
    echartInit() {
      let myChart = this.$echarts.init(this.$refs.echarts)
      let option = {
        backgroundColor: '',
        grid: {
          left: '1%', // 与容器左侧的距离
          right: '1%', // 与容器右侧的距离
          top: '1%', // 与容器顶部的距离
          bottom: '1%', // 与容器底部的距离
        },
        geo: {
          map: 'jiangxi',
          aspectScale: 0.75,
          itemStyle: {
            normal: {
              shadowColor: '#182f68',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 0.5,
            },
            emphasis: {
              areaColor: '#20487d',
            },
          },
        },
        series: [
          // 常规地图
          {
            type: 'map',
            mapType: 'jiangxi',
            // zoom: 1,
            itemStyle: {
              normal: {
                areaColor: '#F8FEFCFF',
                borderColor: '#49DAAAFF',
                borderWidth: 0.3,
              },
              emphasis: {
                areaColor: '#02102b',
                label: {
                  color: '#fff',
                },
              },
            },
          },
          // 区域散点图
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbolSize: 5,
            rippleEffect: {
              //坐标点动画
              period: 5,
              scale: 2,
              brushType: 'fill',
            },
            label: {
              normal: {
                show: true,
                position: 'right',
                formatter: '{b}',
                color: '#b3e2f2',
              },
            },

            data: [
              {
                name: '南昌',
                value: [115.89, 28.68],
              },
              {
                name: '抚州',
                value: [116.34, 28],
              },
              {
                name: '赣州',
                value: [114.92, 25.85],
              },
              {
                name: '吉安',
                value: [114.97, 27.12],
              },
              {
                name: '景德镇',
                value: [117.22, 29.3],
              },
              {
                name: '九江市',
                value: [115.97, 29.71],
              },
              {
                name: '萍乡',
                value: [113.85, 27.6],
              },
              {
                name: '上饶',
                value: [117.97, 28.47],
              },
              {
                name: '新余',
                value: [114.92, 27.81],
              },
              {
                name: '宜春',
                value: [114.38, 27.81],
              },
              {
                name: '鹰潭',
                value: [117.02, 28.23],
              },
            ],
            itemStyle: {
              //坐标点颜色
              normal: {
                show: true,
                color: '#02da9d',
                shadowBlur: 10,
                shadowColor: '#169fca',
              },
              emphasis: {
                areaColor: '#f00',
              },
            },
          },
          // 线 和 点
          {
            type: 'lines',
            zlevel: 1,
            effect: {
              show: true,
              period: 5,
              color: '#02da9d',
            },
            lineStyle: {
              normal: {
                color: '#02da9d',
                width: 1,
                curveness: 0.3,
              },
            },
            data: [
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [116.34, 28],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [114.92, 25.85],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [114.97, 27.12],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [113.85, 27.6],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [115.97, 29.71],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [114.38, 27.81],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [117.02, 28.23],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [117.22, 29.3],
                ],
              },
              {
                fromName: 1,
                toName: 1,
                coords: [
                  [115.89, 28.68],
                  [117.22, 29.3],
                ],
              },
            ],
          },
        ],
      }
      this.$echarts.registerMap('jiangxi', require('@/assets/map/jiangxi.json'))
      // china地图引入
      myChart.setOption(option)
    },
  },
  watch: {
    $route: function() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    },
  },
}
</script>
<style scoped lang="scss">
.index .index-video {
  position: relative;
  height: 120rem;
  img {
    height: 120rem;
  }
}
.index .index-video video {
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.index .index-video h3 {
  position: absolute;
  top: 39.5rem;
  left: 19.3rem;
  width: 38.4rem;
  height: 6.5rem;
  font-size: 4.6rem;
  font-weight: 300;
  color: #ffffff;
  line-height: 6.5rem;
}
.index .index-video h4 {
  position: absolute;
  top: 46.8rem;
  left: 24.6rem;
  width: 27rem;
  height: 4.2rem;
  font-size: 3rem;
  font-weight: 300;
  color: #ffffff;
  line-height: 4.2rem;
}
.index .index-video h5 {
  position: absolute;
  bottom: 6.9rem;
  left: 34.8rem;
  width: 5.4rem;
  height: 3.3rem;
  font-size: 2.4rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 3.3rem;
  letter-spacing: 0.3rem;
}
.index .index-video span {
  position: absolute;
  display: inline-block;
  width: 8.3rem;
  height: 0.1rem;
  background-color: #ffffff;
}
.index .index-video .span-1 {
  top: 42.9rem;
  left: 9.9rem;
}
.index .index-video .span-2 {
  top: 42.9rem;
  right: 7.9rem;
}
.index .index-video .span-3 {
  width: 0.1rem;
  height: 5.5rem;
  bottom: 11.6rem;
  left: 37.5rem;
}
.index .index-about {
  margin: 3rem;
  height: 98.7rem;
  width: 69rem;
  background-color: #ffffff;
  img {
    margin-top: 0;
    height: 50.5rem;
    width: 69rem;
    object-fit: cover;
  }
  h6 {
    margin-left: 3.3rem;
    height: 4rem;
    font-size: 2.8rem;
    font-weight: 500;
    color: #333333;
    line-height: 4rem;
  }
  p {
    margin-left: 3.2rem;
    height: 3.7rem;
    font-size: 2.6rem;
    font-weight: 400;
    color: #666666;
    line-height: 3.7rem;
    letter-spacing: 0.1rem;
  }
  .h6-about-1 {
    margin-top: 5.6rem;
  }
  .h6-about-2 {
    margin-top: 3.3rem;
  }
  .h6-about-3 {
    margin-top: 6.4rem;
  }
  .p-about-1 {
    margin-top: 0.4rem;
  }
  .p-about-2 {
    margin-top: 0.6rem;
  }
  .p-about-3 {
    margin-top: 1.3rem;
  }
}

.index .medical h3 {
  margin-top: 3.7rem;
  margin-left: 4.6rem;
  width: 42.1rem;
  height: 3.6rem;
  font-size: 3rem;
  font-weight: 300;
  color: #333333;
  line-height: 4.8rem;
}
.index .medical h4 {
  margin-top: 0.9rem;
  margin-left: 4.6rem;
  margin-bottom: 3.2rem;
  width: 24.7rem;
  height: 3.8rem;
  font-size: 3.4rem;
  font-weight: 500;
  color: #333333;
  line-height: 4.8rem;
}
.index .medical-card .btn {
  position: absolute;
  top: 32.9rem;
  left: 5.2rem;
  i {
    margin-left: 1rem;
  }
}
.index .imgs {
  margin-top: -4.2rem;
}
.index .product h3 {
  margin-top: -3.2rem;
  margin-left: 3.7rem;
  width: 42.1rem;
  height: 3.6rem;
  font-size: 3rem;
  font-weight: 300;
  color: #333333;
  line-height: 4.8rem;
}
.index .product h4 {
  margin-top: 0.9rem;
  margin-left: 3.7rem;
  width: 24.7rem;
  height: 3.8rem;
  font-size: 3.4rem;
  font-weight: 500;
  color: #333333;
  line-height: 4.8rem;
}
.index .service {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 3rem;
  margin-top: 5.1rem;
  width: 69rem;
}
.index .current h3 {
  margin-top: 7.6rem;
  margin-left: 4.3rem;
  width: 42.1rem;
  height: 3.6rem;
  font-size: 3rem;
  font-weight: 300;
  color: #333333;
  line-height: 4.8rem;
}
.index .current h4 {
  margin-top: 0.9rem;
  margin-left: 4.3rem;
  margin-bottom: 5.4rem;
  width: 24.7rem;
  height: 3.8rem;
  font-size: 3.4rem;
  font-weight: 500;
  color: #333333;
  line-height: 4.8rem;
}
.index .map {
  padding-top: 5.2rem;
  box-sizing: border-box;
  height: 60rem;
  h4 {
    margin-left: 4.3rem;
    width: 42.1rem;
    height: 3.6rem;
    font-size: 3rem;
    font-weight: 300;
    color: #333333;
    line-height: 4.8rem;
  }
  h3 {
    margin-left: 4.3rem;
    width: 24.7rem;
    height: 3.8rem;
    font-size: 3.4rem;

    font-weight: 500;
    color: #333333;
    line-height: 4.8rem;
  }
  .echarts {
    margin-left: 5rem;
    width: 62.1rem;
    height: 50rem;
  }
}
</style>
