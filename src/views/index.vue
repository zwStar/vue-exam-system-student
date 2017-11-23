<template>
  <div id="index">
    <Menu mode="horizontal">
      <div class="layout-assistant">
        <router-link to="/index/test"><MenuItem name="1">查询考试</MenuItem></router-link>
        <router-link to="/index/aaa"><MenuItem name="2">成绩查询</MenuItem></router-link>
      </div>
      <router-view></router-view>
    </Menu>
  </div>
</template>

<script>
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
