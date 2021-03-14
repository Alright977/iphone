<template>
  <div>
    <div class="rement">
      <div class="banner">
        <img :src="rementObj.fileAddress ? rementObj.fileAddress : $store.state.defaultImg" alt="" />
        <h3>人才招聘</h3>
      </div>
      <div class="rement-organi">
        <h5>ORGANIZATION</h5>
        <h4>组织架构</h4>
        <img src="@/assets/img/rement-img/organ.png" alt="" />
      </div>
      <div class="rement-careers">
        <h5>CAREERS</h5>
        <h4 style="margin-left: 4.2rem; margin-bottom: 4.8rem;">人才招聘</h4>
        <div class="careers-flex">
          <span>职位</span>
          <span>薪资</span>
          <span>经验要求</span>
        </div>
        <van-collapse v-model="activeNames" accordion>
          <div v-for="(item, index) in rementObj.recruitmentList" :key="index">
            <van-collapse-item :name="index" :border="false" :is-link="false">
              <div slot="title">
                <div class="careers-header" :class="{ active: name == index }" @click="handClick(index)">
                  <li class="list-item-1">{{ item.position }}</li>
                  <li class="list-item-2">{{ item.salary }}</li>
                  <li class="list-item-3">{{ item.experienceRequire }}<i v-show="name !== index" class="iconfont icon-down"></i><i v-show="name == index" class="iconfont icon-shangjiantou_huaban"></i></li>
                </div>
              </div>
              <div class="careers-content">
                <h6 style="margin-top: 3.2rem;">岗位要求</h6>
                <p class="p-item-1" v-html="item.positionRequire"></p>
                <h6 style="margin-top: 5.4rem;">岗位职责</h6>
                <p class="p-item-2" v-html="item.positionDuties"></p>
                <h6 style="margin-top: 4.7rem;">在线申请</h6>
                <p class="p-item-2">{{ item.onlineApply }}</p>
              </div>
            </van-collapse-item>
          </div>
        </van-collapse>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$axios.get('GetRecruitmentInfo?RequestSource=21').then((res) => {
      if (res.status) {
        this.rementObj = res.data.data[0]
      } else {
        this.$toast.fail(res.message)
      }
    })
  },
  data() {
    return {
      rementObj: {},
      activeNames: [],
      name: null,
      isActive: false,
    }
  },
  methods: {
    handClick(index) {
      this.name = index
    },
  },
}
</script>

<style lang="scss">
.rement .rement-organi {
  height: 65.2rem;
  box-sizing: border-box;
  padding-top: 7.1rem;
  img {
    margin-top: 3.7rem;
    margin-left: 8rem;
    width: 59.1rem;
    height: 40.5rem;
    object-fit: cover;
  }
}
.rement .rement-careers {
  padding-bottom: 8.4rem;
  padding-top: 4.9rem;
  background-color: #ffffff;
  .careers-flex {
    display: flex;
    justify-content: space-around;
    span {
      width: 10.4rem;
      height: 3.7rem;
      font-size: 2.6rem;
      font-weight: 400;
      color: #999999;
      line-height: 3.7rem;
    }
  }
}
.rement .careers-header {
  margin: 0 auto;
  width: 69rem;
  display: flex;
  justify-content: space-around;
  background: #f8f9f9;
  li {
    list-style: none;
    width: 19rem;
    height: 8rem;
    line-height: 8rem;
    font-size: 2.6rem;
    font-weight: 400;
    color: #333333;
    i {
      margin-left: 1rem;
    }
  }
  .list-item-3 {
    width: 11rem;
  }
}

.rement .careers-content {
  margin-top: -2.5rem;
  box-sizing: border-box;
  width: 69rem;
  border: 0.1rem solid #50c19a;
}
.rement .careers-content h6 {
  margin-left: 2.2rem;
  height: 2.4rem;
  font-size: 3rem;
  font-weight: 500;
  color: #333333;
  line-height: 2.4rem;
}
.rement .careers-content p {
  margin-top: 1.4rem;
  margin-left: 2.2rem;
  font-size: 2.5rem;
  font-weight: 400;
  color: #999999;
}
.rement .careers-content .p-item-1 {
  margin-top: 2rem;
}
.rement .careers-content .p-item-2 {
  margin-top: 2rem;
}
.rement .bg {
  background-color: #ffffff;
}
.rement .active {
  background: #50c19a;
}
.van-cell__right-icon {
  margin-top: 1.3rem;
  margin-left: -5rem !important;
}
.van-cell {
  padding: 0 !important;
}
.van-collapse-active {
  background-color: aqua;
}
</style>
