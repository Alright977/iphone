<template>
  <header>
    <img :src="logoImg" alt="" />
    <div class="menu" @click="handClick">
      <i class="iconfont icon-toggle" v-show="!isShow"></i>
      <i class="iconfont icon-guanbi" v-show="isShow"></i>
    </div>
    <div class="menu-content" :class="[{ show: !isShow }, { hide: isShow }]">
      <ul>
        <a href="javascript:;"><li @click="homeClick">首页</li></a>
        <a href="javascript:;" @click="downClickSolution"
          ><li
            >解决方案
            <i class="iconfont icon-down" v-show="downShowSolution"></i>
            <i class="iconfont icon-shangjiantou_huaban" v-show="!downShowSolution"></i> </li
        ></a>
        <ul class="menu-content-solution" v-show="!downShowSolution">
          <a href="javascript:;" v-for="(item, index) in solutionList" :key="index" @click="solutionClick(index)"
            ><li>{{ item }}</li></a
          >
        </ul>
        <a href="#" @click="downClickProduct"
          ><li
            >产品服务
            <i class="iconfont icon-down" v-show="downShowProduct"></i>
            <i class="iconfont icon-shangjiantou_huaban" v-show="!downShowProduct"></i> </li
        ></a>
        <ul class="menu-content-server" v-show="!downShowProduct">
          <a href="javascript:;" v-for="(item, index) in productList" :key="index" @click="productClick(index)"
            ><li>{{ item }}</li></a
          >
        </ul>
        <a href="javascript:;"><li @click="centerClick">新闻中心</li></a>
        <a href="javascript:;"><li @click="rementClick">人才招聘</li></a>
        <a href="javascript:;"><li @click="aboutClick">关于云慧</li></a>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  created() {
    this.$axios.get('GetSystemMenu').then((res) => {
      this.productList = res.data.chineseTitleList
      this.solutionList = res.data.solutionNameList
    })
    this.$axios.get('GetLogo').then((res) =>{
      this.logoImg = res.data
    })
  },
  data() {
    return {
      isShow: false,
      downShowProduct: true,
      downShowSolution: true,
      logoImg : '',
      productList: [],
      solutionList: [
        {
          title: '智慧医院',
        },
        {
          title: '智慧共同体',
        },
        {
          title: '城市健康',
        },
        {
          title: '舒心就医',
        },
      ],
    }
  },
  methods: {
    handClick() {
      this.downShowSolution = true
      this.downShowProduct = true
      this.isShow = !this.isShow
    },
    downClickProduct() {
      this.downShowProduct = !this.downShowProduct
    },
    downClickSolution() {
      this.downShowSolution = !this.downShowSolution
    },
    // 首页
    homeClick() {
      this.downShowSolution = true
      this.downShowProduct = true
      this.isShow = false
      this.$router.push('/')
    },
    // 新闻中心
    centerClick() {
      this.downShowSolution = true
      this.downShowProduct = true
      this.isShow = false
      this.$router.push('/center')
    },
    // 人才招聘
    rementClick() {
      this.downShowSolution = true
      this.downShowProduct = true
      this.isShow = false
      this.$router.push('/rement')
    },
    // 关于
    aboutClick() {
      this.downShowSolution = true
      this.downShowProduct = true
      this.isShow = false
      this.$router.push('/about')
    },
    // 解决方案跳转
    solutionClick(index) {
      // 菜单收起
      this.downShowSolution = true
      this.downShowProduct = true
      this.isShow = false
      this.$router.push({
        path: '/solution',
        query: {
          id: index,
        },
      })
    },
    // 产品服务跳转
    productClick(index) {
      // 菜单收起
      this.downShowSolution = true
      this.downShowProduct = true
      this.isShow = false
      this.$router.push({
        path: '/product',
        query: {
          id: index,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.show {
  transform: translateY(-85rem);
  transition: all 0.5s;
}
.hide {
  transform: translateY(0rem);
  transition: all 0.5s;
}
header {
  z-index: 98;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
header img {
  margin-left: 2.4rem;
  object-fit: cover;
  width: 19.1rem;
  height: 4.7rem;
}
header .menu {
  z-index: 99;
  margin-right: 4.2rem;
}
header .menu i {
  font-size: 6rem;
}
header .menu-content {
  top: 10rem;
  position: absolute;
}
header .menu-content a {
  position: relative;
  display: block;
  color: #3e454c;
  box-sizing: border-box;
  text-decoration: none;
  border-top: 0.1rem solid #f3f4f5;
  width: 75rem;
  height: 12rem;
  background: #ffffff;
}
header .menu-content a li {
  list-style: none;
  margin-left: 4rem;
  margin-top: 3.6rem;
  height: 4.5rem;
  font-size: 3.2rem;
  font-weight: 400;
  color: #3e454c;
  line-height: 4.5rem;
}
header .menu-content li i {
  position: absolute;
  display: inline-block;
  top: 50%;
  transform: translateY(-50%);
  right: 6.7rem;
  font-size: 3rem;
}
header .menu-content-server,
.menu-content-solution {
  background-color: #f3f4f5;
}
header .menu-content-product a {
  background-color: #f3f4f5;
}
header .menu-content-server a {
  background-color: #f3f4f5;
}
header .menu-content-solution a {
  background-color: #f3f4f5;
}
</style>
