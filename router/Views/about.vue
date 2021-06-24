<template>
  <div class="my_page">
    <div>about page</div>

    <router-link to='/about/a'>go a</router-link>
    <router-link to='/about/b'>go b</router-link>

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
