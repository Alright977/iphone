<template>
  <div id="app">
    <Header />
    <keep-alive>
      <router-view />
    </keep-alive>
    <Footer />
  </div>
</template>
<script>
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components: {
    Footer,
    Header,
  },
}
</script>
<style lang="scss"></style>
