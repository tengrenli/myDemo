<template>
  <div class="my_page">
    <router-link to="/" tag="p">首页</router-link>
    <router-link to="/about" tag="p">关于</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="stylus" scoped></style>
