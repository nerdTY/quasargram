<template>
  <q-page ref='contents' class='bg-black text-white q-pa-md' style='background-size: cover;'>
    <q-form @submit.prevent="goNextStep">
      <div class='text-basic text-register-sub'>주로 경기하는 지역을 <br> 선택해주세요</div>
      <q-btn color="white" class="full-width q-mt-md" text-color='info' label="현재 위치로 선택하기" @click="dialog =true"/>
      <div class='row q-mt-md q-gutter-xs'>
        <q-chip
          v-for="(task,key) in tasks"
          :key="key"
          outline
          clickable
          :class="!task.checked ? '' : 'bnt-chip-checked'"
          :color="!task.checked ? 'white' : 'info'"
          @click="selectTask(key)"
        >
          {{ task.name }}
        </q-chip>
      </div>
      <q-dialog
        v-model="dialog"
        no-backdrop-dismiss
        no-esc-dismiss
        no-route-dismiss
      >
        <q-card style="width: 300px" class="text-basic">
          <q-card-section></q-card-section>

          <q-card-section class="q-pt-none">
            GPS 기능을 켜주세요
          </q-card-section>

          <q-card-actions align="right" class="bg-white">
            <q-btn flat label="취소" color="black" v-close-popup/>
            <q-btn flat label="설정" color="info" v-close-popup/>
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-footer elevated>
        <q-toolbar :class="isDisable ? 'bg-info' : 'bg-grey-6'">
          <q-btn :disable='!isDisable' class='full-width ' dense flat label='완료' size='16px' type="submit"/>
        </q-toolbar>
      </q-footer>
    </q-form>
  </q-page>
</template>
<script>
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: 'PageLoginUserActivityLocation',
  data() {
    return {
      isPass: false,
      isDisable: false,
      dialog: false,
      tasks: {}
    }
  },
  mounted() {
    this.tasks = this.locationTasks
  },
  computed: {
    ...mapState("authDetail", ["location", "chooseLocationCnt"]),
    ...mapGetters("authDetail", ["locationTasks", "getChooseLocation", "getChooseTeam"]),
  },
  methods: {
    ...mapActions("authDetail", ["firebaseAddUserDetails", "selectLocation"]),
    selectTask(key) {
      this.selectLocation(key)

      if (this.chooseLocationCnt > 0) {
        this.isDisable = true
      } else {
        this.isDisable = false
      }
    },
    goNextStep() {
      this.firebaseAddUserDetails({"favoriteTeam": this.getChooseTeam, "activityLocation": this.getChooseLocation})
    }
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

.bnt-chip-checked {
  background-color: #2400FF !important;

  .q-chip__content {
    color: white;
  }
}

</style>
