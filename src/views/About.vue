<template>
  <div class="about">
    <div class="about">
      <div class="banner">
        <img :src="aboutObj.fileAddress ? aboutObj.fileAddress : $store.state.defaultImg" alt="" />
        <h3>关于云慧</h3>
      </div>
      <div class="about-project">
        <h5 style="margin-top: 6.1rem;">PROJECT BACKGROUND</h5>
        <h4 style="margin-top: 0.9rem;">关于云慧</h4>
        <p>江西云慧医联信息服务有限公司成立于2014年11月11日，注册资金3000万元，是联众智慧科技股份有限公司在江西成立的合资子公司。公司主营业务涵盖医院信息化系统、区域智慧医疗平台、健康卫生服务平台、线上智慧医院等。</p>
        <div :class="{ open: !isOpen }">
          <span class="text" :class="{ hide: isOpen }">公司自创建以来，一直专注于智慧医疗健康行业信息系统的研发、推广，是国家高新软件企业，并融合医疗行业及IT技术领域领先企业，基于AI、物联网、云计算、大数据、移动互联等核心技术，以创新的运营模式为各类医疗机构和全民健康提供智慧医疗服务。主要产品包括智慧医院的HIS、EMR、LIS、HRP、CDR、HBI、信息集成平台、医田园、点点就医、体检保健、病案管理与统计分析、敏感数据加密等<em @click="handClick">收起</em></span>
          <span class="active" @click="handClick" v-show="isOpen">展开</span>
        </div>
      </div>
      <div class="company">
        <h5>COMPANY CULTURE</h5>
        <h4 style="margin-top: 0.9rem;">企业文化</h4>
        <img src="@/assets/img/about-img/company.png" alt="" />
        <h6 class="h6-1">愿景</h6>
        <p class="p-1">成为医疗领域的领导先锋</p>
        <h6 class="h6-2">使命</h6>
        <p class="p-2">我们建设江西本地化医疗企业，为江西医疗的发展提供有力保障，生命不息，勇往直前</p>
        <h6 class="h6-3">核心价值观</h6>
        <p class="p-3">创新，诚信，专业</p>
      </div>
      <div class="about-us">
        <h5 style="margin-left: 0;">CONTACT US</h5>
        <h4 style="margin-top: 0.9rem; margin-left: 0;">联系我们</h4>
        <h6>我们的办公地址:</h6>
        <p>{{ aboutObj.workAddress }}</p>
        <h6>我们的工作时间:</h6>
        <p>{{ aboutObj.workTime }}</p>
        <h6>我们的服务热线:</h6>
        <p>{{ aboutObj.serviceTelephoneText }}</p>
        <h6>我们的电子邮箱:</h6>
        <p>{{ aboutObj.electronicEmailText }}</p>
        <van-form @submit="onSubmit" :show-error-message="false">
          <van-field v-model="username" name="姓名" placeholder="姓名" :rules="[{ required: true, message: '请填写姓名' }]" style="margin-top : 5.7rem" />
          <van-field v-model="company" name="公司" placeholder="公司" :rules="[{ required: true, message: '请填写公司' }]" />
          <van-field v-model="phone" name="电话" placeholder="电话" :rules="[{ required: true, message: '请填写电话' }]" />
          <van-field v-model="email" name="邮箱" placeholder="邮箱" :rules="[{ required: true, message: '请填写邮箱' }]" />
          <van-field v-model="desc" name="描述" placeholder="描述" :rules="[{ required: true, message: '请填写描述' }]" />
          <!-- <textarea cols="30" rows="10" v-model="desc" name="描述" placeholder="描述" :rules="[{ required: true, message: '请填写描述' }]"></textarea> -->
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
        <div class="amap-page-container">
          <el-amap class="amap-box" vid="map" :zoom="zoom" :center="center">
            <el-amap-text text="南昌 西湖区 梦想小街 401" :offset="[0, -50]"></el-amap-text>
            <el-amap-marker :position="center"> </el-amap-marker>
          </el-amap>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$axios.get('GetAboutYunHuiInfo?RequestSource=21').then((res) => {
      if (res.status) {
        this.aboutObj = res.data.data[0]
        this.center = [this.aboutObj.longitude, this.aboutObj.latitude]
      }
    })
  },
  data() {
    return {
      // 经纬度
      center: [0, 0],
      zoom: 13,
      aboutObj: {},
      username: '',
      company: '',
      phone: '',
      email: '',
      desc: '',
      isOpen: true,
    }
  },
  methods: {
    onSubmit(values) {
      console.log(values)
      this.$axios
        .post('AddContactInfo', {
          ruform: values,
        })
        .then((res) => {
          if (res.status) {
            this.$toast.success('提交成功')
          } else {
            this.$toast.fail(res.message)
          }
        })
    },
    handClick() {
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style lang="scss">
.about .about-project {
  padding-bottom: 3.5rem;
  padding-top: 0.27rem;
  background-color: #ffffff;
}
.about .about-project p {
  margin-top: 3.1rem;
  margin-left: 6.3rem;
  width: 62.6rem;
  height: 22.5rem;
  font-size: 2.8rem;
  font-weight: 400;
  color: #666666;
  line-height: 4.5rem;
}
.about .about-project div {
  transition: all 0.5s;
  display: flex;
  margin-top: 2.7rem;
  margin-left: 6.3rem;
  width: 62.6rem;
  height: 4.5rem;
  line-height: 0.45rem;
}
.about .about-project .open {
  height: 45rem;
}
.about .about-project div .hide {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.about .about-project .text-height {
  height: 41.5rem;
}
.about .about-project div .text {
  display: inline-block;
  width: 58.6rem;
  height: 4.5rem;
  font-size: 2.8rem;
  font-weight: 400;
  color: #666666;
  line-height: 4.5rem;
}
.about .about-project div em {
  margin-left: 1rem;
  display: inline-block;
  width: 6.6rem;
  height: 4rem;
  margin-top: 0.4rem;
  font-size: 2.8rem;
  color: #507daf;
  font-weight: 400;
  line-height: 4rem;
  font-style: normal;
}
.about .about-project div .active {
  display: inline-block;
  width: 6.6rem;
  height: 4rem;
  margin-top: 0.4rem;
  font-size: 2.8rem;
  color: #507daf;
  font-weight: 400;
  line-height: 4rem;
}
.about .company {
  box-sizing: border-box;
  padding-top: 4.4rem;
  margin-top: 2rem;
  height: 101.4rem;
  background-color: #ffffff;
}
.about .company img {
  margin-left: 4.2rem;
  margin-top: 3.4rem;
  width: 66.6rem;
  height: 40rem;
}
.about .company h6 {
  margin-left: 6.2rem;
  height: 4rem;
  font-size: 2.8rem;
  font-weight: 500;
  color: #333333;
  line-height: 4rem;
}
.about .company p {
  margin-left: 6.2rem;
  font-size: 2.6rem;
  font-weight: 400;
  color: #666666;
  letter-spacing: 0.1rem;
}
.about .company .h6-1 {
  margin-top: 5.3rem;
}
.about .company .h6-2 {
  margin-top: 3.3rem;
}
.about .company .h6-3 {
  margin-top: 3.4rem;
}
.about .company .p-1 {
  height: 3.7rem;
  line-height: 3.7rem;
  width: 30.4rem;
  margin-top: 0.4rem;
}
.about .company .p-2 {
  width: 66.6rem;
  height: 8rem;
  line-height: 4rem;
  margin-top: 0.6rem;
}
.about .company .p-3 {
  width: 24.5rem;
  height: 2.2rem;
  line-height: 2.2rem;
  margin-top: 1.3rem;
}

.about .about-us {
  padding-bottom: 5rem;
  margin-top: 2rem;
  padding-top: 3.4rem;
  padding-left: 5.3rem;
  background-color: #ffffff;
  box-sizing: border-box;
  .amap-page-container {
    margin-top: 4.9rem;
    width: 66.6rem;
    height: 40rem;
  }
}
.about .about-us h6 {
  margin-top: 4.1rem;
  height: 2.8rem;
  font-size: 2.8rem;
  font-weight: 500;
  color: #333333;
  line-height: 2.8rem;
}
.about .about-us p {
  margin-top: 1.4rem;
  height: 3.5rem;
  font-size: 2.6rem;
  font-weight: 400;
  color: #999999;
  line-height: 2.8rem;
}
.about .about-us input {
  box-sizing: border-box;
  margin-top: 2rem;
  padding-left: 2.3rem;
  outline: none;
  width: 67rem;
  height: 6.2rem;
  border-radius: 0.4rem;
  border: 0.1rem solid #e1e1e1;
}
.about .about-us button {
  margin-left: -3rem;
  outline: none;
  border: none;
  width: 16.4rem;
  height: 6rem;
  background: #50c19a;
  border-radius: 0.4rem;
  margin-top: 2.9rem;
  line-height: 5rem;
  text-align: center;
  font-size: 3rem;
  font-weight: 400;
  color: #ffffff;
}
</style>
