<template>
  <q-page ref='contents' class='bg-black text-white q-pa-md' style='background-size: cover;'>
    <div class='text-basic text-register-sub'>응원하는 유럽 축구팀을 1개 선택해주세요</div>
    <q-input v-model='searchProTeam' class='text-basic bg-grey-10 q-mt-md' dark dense placeholder='검색' standout/>
    <div class='row q-mt-md q-gutter-md'>
      <div
        v-for='(task,key) in teamTasks'
        :key='key'
        class='column items-center'>
        <q-btn
          round
          :disable='isDisable && !task.checked ? true : false'
          @click='selectTask(key)'
        >
          <q-avatar size="100px" color="white" text-color="white">
            <img :src="task.image"/>
          </q-avatar>
          <q-badge
            v-if='task.checked'
            class='shadow-20 justify-center'
            color="white"
            rounded
            floating>
            <q-icon name="mdi-check" color="black" class="q-ml-xs" />
          </q-badge>
        </q-btn>
        <div class='text-basic text-register-avatar q-pt-sm'>
          {{task.name}}
        </div>
      </div>
    </div>
    <q-footer elevated>
      <q-toolbar :class="isDisable ? 'bg-info' : 'bg-grey-6'">
        <q-btn :disable='!isDisable' class='full-width text-basic' dense flat label='다음' size='16px' @click='goNextStep'/>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'PageLoginMain',
  data() {
    return {
      searchProTeam: '',
      isPass: false,
      isDisable: false,
    }
  },
  computed:{
    ...mapState("authDetail",["favoriteTeam"]),
    ...mapGetters("authDetail",["teamTasks"])
  },
  mounted() {
    if(this.favoriteTeam){
      this.isDisable = true
    }else {
      this.isDisable = false
    }
  },
  methods: {
    ...mapActions("authDetail",["selectTeam", "clearLocation"]),
    selectTask(key){
      this.isDisable = !this.isDisable
      this.selectTeam(key)
    },
    goNextStep(){
      if(this.isDisable){
        this.clearLocation()
        this.$router.push({name: 'register5'})
      }
    },
  }
}
</script>

<style lang='scss'>
.platform-ios {
  .q-footer {
    .q-btn {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
  }
}
.text-register-avatar{
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: center;
}
.q-badge{
  border-radius: 15px;
  width: 30px;
  height: 30px
}
</style>
