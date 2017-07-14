<template>
  <div id="app">
    <m-header></m-header>  
    <tab></tab>
    <router-view></router-view>
  </div>
</template>

<script>
import mHeader from 'components/m-header/m-header'
import tab from 'components/tab/tab.vue'
export default {
  components: {
    mHeader,
    tab
  }
}
</script>

<style>

</style>
