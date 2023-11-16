<template>
  <div>
    <h1>主页面</h1>
    <nav>
      <ul>
        <li><router-link to="/open-account">开户</router-link></li>
        <li><router-link to="/close-account">销户</router-link></li>
        <!-- 其他链接 -->
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
// 主页面的脚本
</script>

<style>
/* 主页面的样式 */
</style>
