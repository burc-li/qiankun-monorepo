<template>
  <div class="header-menu">
    <span
      class="menu-item"
      :class="{ active: route.path === item.path }"
      v-for="item in routes"
      :key="item.path"
      @click="navigateTo(item.path)"
      >{{ item.name }}</span
    >
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  computed: {
    route () {
      return this.$route
    },
    routes () {
      return this.$router.options.routes
    },
  },
  methods: {
    navigateTo (path) {
      this.$router.push({ path })
    },
  },

}
</script>

<style lang="less" scoped>
.header-menu {
  display: flex;
  box-shadow:
    0 1px 0 0 #0000001a,
    0 1px 5px 0 #0000001a;
  .menu-item {
    box-sizing: border-box;
    display: inline-block;
    line-height: @sub-nav-height;
    height: @sub-nav-height;
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      color: #2d8cf0;
      background-color: rgba(0, 0, 0, 0.05);
    }
    &.active {
      border-bottom: 2px solid #2465ff;
    }
  }
}
</style>
