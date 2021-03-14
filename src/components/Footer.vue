<template>
  <footer>
    <p class="p-1">客服电话:{{ footeobj.serviceTelephone }}</p>
    <p class="p-2">邮箱:{{ footeobj.emailAddress }}</p>
    <p class="p-3">联系地址:{{ footeobj.contactAddress }}</p>
    <hr />
    <p class="p-4">江西云慧医联信息服务有限公司</p>
  </footer>
</template>
<script>
export default {
  name: 'Footer',
  data() {
    return {
      footeobj: {},
    }
  },
  created() {
    this.$axios.get('GetPageFloorInfo').then((res) => {
      if (res.status) {
        this.footeobj = res.data.data[0]
      } else {
        this.$Toast.fail(res.message)
      }
    })
  },
}
</script>
<style scoped>
footer {
  box-sizing: border-box;
  padding-left: 4rem;
  padding-top: 6.1rem;
  height: 31.5rem;
  background-color: #181c1e;
}
footer p {
  font-size: 2.2rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 3rem;
}
footer .p-1 {
  height: 3rem;
}
footer .p-2 {
  margin-top: 1rem;
  height: 3rem;
}
footer .p-3 {
  height: 3rem;
  margin-top: 1.2rem;
}
footer hr {
  width: 67rem;
  margin-top: 6.4rem;
}
footer .p-4 {
  font-size: 2rem;
  margin-top: 2.4rem;
  margin-left: 16.5rem;
}
</style>
