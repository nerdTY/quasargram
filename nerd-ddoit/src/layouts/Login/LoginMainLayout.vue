<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      v-if='$route.fullPath !== "/auth"'
      class='bg-black'
      elevated>
      <q-toolbar>
        <q-btn
          v-if='$route.fullPath === "/auth/register1"'
          flat
          dense
          round
          @click="clearInfo"
          icon="mdi-keyboard-backspace"
        />
        <q-btn
          v-else
          flat
          dense
          round
          v-go-back.single
          :icon="$route.fullPath.includes('/terms') ? 'mdi-close' : 'mdi-keyboard-backspace'"
        />
        <q-toolbar-title class='absolute-center' >
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'LoginMainLayout',
  components: {  },
  mounted() {

  },
  data () {
    return {

    }
  },
  methods:{
    ...mapActions("auth",["clearState"]),

    clearInfo(){
      this.clearState()
      this.$router.push("/auth")
    }
  },
  computed:{
    title(){
      let currentPath = this.$route.fullPath
      if(currentPath.includes("register")){
        return "계정만들기"
      }else {
        return ""
      }
    }
  }
}
</script>
<style>
.q-toolbar__title{
  font-size: 16px;
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
}
</style>
