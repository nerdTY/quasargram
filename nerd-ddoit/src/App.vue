<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'App',
  methods:{
    ...mapActions('auth', ['handleAuthStateChange'])
  },
  mounted() {
    this.handleAuthStateChange()
  }
}
</script>
<style>
body{
  font-family: "넥슨 풋볼고딕", "넥슨풋볼고딕", "nexon-football-gothic-otf";
}
</style>
