<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      class='bg-black'
      elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          v-go-back.single
          :icon="$route.fullPath.includes('/location') ? 'mdi-keyboard-backspace' : ''"
        />
        <q-space></q-space>
        <q-btn
          v-if="$route.fullPath.includes('/location')"
          class='text-basic'
          flat color="white" label="건너뛰기" @click="dialog = true"/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog
      v-model="dialog"
      no-backdrop-dismiss
      no-esc-dismiss
      no-route-dismiss
    >
      <q-card style="width: 300px" class="text-basic">
        <q-card-section></q-card-section>

        <q-card-section class="q-pt-none">
          지역 설정을 하시면 관련 매치를<br/>
          누구보다 빠르게 알려드려요.
        </q-card-section>

        <q-card-actions align="right" class="bg-white">
          <q-btn flat label="취소" color="info" v-close-popup />
          <q-btn flat label="건너뛰기" color="black" v-close-popup @click="goNextStep"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'LoginMainLayout',
  components: {  },
  mounted() {

  },
  data () {
    return {
      dialog: false
    }
  },
  methods:{
    ...mapActions("authDetail", ["firebaseAddUserDetails"]),
    goNextStep(){
      this.firebaseAddUserDetails({"favoriteTeam":this.getChooseTeam, "activityLocation" : ''})
    }
  },
  computed:{
    ...mapGetters("authDetail", [ "getChooseTeam"]),
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

