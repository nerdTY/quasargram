<template>
  <q-page ref='contents' class='bg-black text-white q-pa-md' style='background-size: cover;'>
    <div class='text-basic text-register'>비밀번호를 입력해주세요</div>
    <q-input
      ref='password'
      v-model='passwordField'
      :rules='[isRulePassword]'
      lazy-rules
      :type="isPwd ? 'password' : 'text'"
      dark
      color="blue-9"
      hint='영문,숫자,특수문자(!@$%^&*) 조합하여 8자 이상을 사용하세요.'
    >
      <template v-slot:append>
        <q-icon
          :name="isPwd ? 'visibility_off' : 'visibility'"
          class='cursor-pointer'
          @click='isPwd = !isPwd'
        />
      </template>
    </q-input>
    <q-footer elevated>
      <q-toolbar :class="isPass ? 'bg-info' : 'bg-grey-6'">
        <q-btn :disable='!isPass' class='full-width ' dense flat label='다음' size='16px' @click='goNextStep'/>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      isPwd: true,
      isPass: false
    }
  },
  computed: {
    ...mapState("auth",["password"]),

    passwordField: {
      get(){
        return this.password
      },
      set(value){
        this.isPass=this.isValidPassword(value)
        this.setPassword(value)
      }
    }
  },
  mounted() {
    this.isPass = this.isValidPassword(this.password)
  },
  methods: {
    ...mapActions("auth",["setPassword"]),
    goNextStep() {
      this.$refs.password.validate()
      if (this.isPass) {
        this.$router.push({name: 'register3'})
      }
    },
    isRulePassword(password) {
      if(!this.isValidPassword(password)){
        this.isPass = false
        return '영문,숫자,특수문자(!@$%^&*) 조합하여 8자 이상을 사용하세요.'
      }else if(/(\w)\1\1/.test(password)){
        this.isPass = false
        return '같은 문자를 3번 이상 사용하실 수 없습니다.';
      }else{
        let cnt = 0;
        let cnt2 = 0;
        let tmp = "";
        let tmp2 = "";
        let tmp3 = "";
        for (let i = 0; i < password.length; i++) {
          tmp = password.charAt(i);
          tmp2 = password.charAt(i + 1);
          tmp3 = password.charAt(i + 2);

          if (tmp.charCodeAt(0) - tmp2.charCodeAt(0) === 1
            && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) === 1) {
            cnt = cnt + 1;
          }
          if (tmp.charCodeAt(0) - tmp2.charCodeAt(0) === -1
            && tmp2.charCodeAt(0) - tmp3.charCodeAt(0) === -1) {
            cnt2 = cnt2 + 1;
          }
        }
        if (cnt > 0 || cnt2 > 0) {
          this.isPass = false
          return '연속된 문자를 3번 이상 사용하실 수 없습니다.';
        }
      }
    },
    isValidPassword(val) {
      const re =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
      if(re.test(val)){
        return true
      }else{
        return false
      }
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

</style>
