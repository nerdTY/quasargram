<template>
  <q-page ref='contents' class='bg-black text-white q-pa-md' style='background-size: cover;'>
    <div class='text-basic text-register-sub'>이메일 주소가 무엇인가요?</div>
    <q-input
      ref='email'
      v-model='emailField'
      :loading='loading'
      :rules='[
        isRuleEmailAddress
        ]'
      :error="isError"
      :error-message="errorMessage"
      dark
      dense
      lazy-rules
      type='email'
      color="blue-8"
      @focus="resetError"
    >
      <template v-if='isCheck' v-slot:append>
        <q-icon name='mdi-check'/>
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
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      isPass: false,
      loading: false,
      isCheck: false,
      isError: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapState("auth",["email"]),
    ...mapGetters("auth",["getEmailAlreadyExist"]),
    emailField: {
      get(){
        return this.email
      },
      set(value){
        this.isPass=this.isValidEmailAddress(value)
        this.setEmail(value)
      }
    }
  },
  mounted() {
    this.isPass = this.isValidEmailAddress(this.email)
    this.isCheck = this.isPass
  },
  methods: {
    ...mapActions("auth",["registerCheckEmail","setEmail"]),

    goNextStep() {
      this.isCheck = false
      this.loading = true
      this.registerCheckEmail(this.email)
      setTimeout(() => {
        if(this.getEmailAlreadyExist){
          this.loading = false
          this.isPass = false
          this.isError = true
          this.errorMessage =  '이미 가입된 회원입니다.'
        }else {
          this.loading = false
          this.resetError()
        }
        this.$refs.email.validate()
        if (!this.$refs.email.hasError && !this.isError) {
          this.$router.push({name: 'register2'})
        }
      },1000)
    },

    isRuleEmailAddress(email) {
      this.isCheck = false

      if (!email) {
        return '이메일을 입력해주세요.'
      } else if (!this.isValidEmailAddress(email)) {
        return '이메일 주소가 유효하지 않습니다.'
      }
    },
    isValidEmailAddress(email){
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(email).toLowerCase())) {
        return true
      } else {
        return false
      }
    },
    resetError() {
      this.isCheck = false
      this.isError = false
      this.errorMessage = ''
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

</style>
