<template>
  <q-page ref='contents' class='bg-black text-white q-pa-md' style='background-size: cover;'>
    <q-form @submit.prevent='goLogin'>
      <div class='text-basic text-register-sub'>이메일 주소</div>
      <q-input
        ref='email'
        v-model='formData.email'
        :error='isLoginError'
        :rules="[ val => isValidEmailAddress(val) || 'Email 주소를 정확히 입력하세요']"
        color='blue-8'
        dark
        dense
        lazy-rules
        type='email'
        @focus='inputFocus'
      >
      </q-input>
      <div class='text-basic text-register-sub q-pt-lg'>비밀번호</div>
      <q-input
        ref='password'
        v-model='formData.password'
        :error='isLoginError'
        :rules="[ val => val.length >= 8 || '비밀번호는 8글자 이상입니다.']"
        :type="isPwd ? 'password' : 'text'"
        color='blue-9'
        dark
        lazy-rules
        @focus='inputFocus'
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class='cursor-pointer'
            @click='isPwd = !isPwd'
          />
        </template>
        <template v-slot:error>
          등록되지 않은 이메일이거나<br>
          이메일 또는 비밀번호를 잘못 입력하였습니다.
        </template>
      </q-input>
      <q-page-sticky position="bottom" :offset="[0, 18]">
        <span class='text-basic text-register-nickname text-register-nickname-underline' @click='goForget' >비밀번호를 잊으셨나요?</span>
      </q-page-sticky>
      <q-footer elevated>
        <q-toolbar :class="isPass && !isLoginError ? 'bg-info' : 'bg-grey-6'">
          <q-btn :disable='!isPass' class='full-width ' dense flat label='다음' size='16px' type='submit'/>
        </q-toolbar>
      </q-footer>
    </q-form>
  </q-page>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  data() {
    return {
      isPwd: true,
      isPass: false,
      formData: {
        email: '',
        password: ''
      },
    }
  },
  computed: {
    ...mapState('auth', ['isLoginError']),
  },
  watch: {
    formData: {
      handler(val) {
        this.checkPassButton()
      },
      deep: true
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions('auth', ['setLoginError', 'loginUser']),
    isValidEmailAddress(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    goLogin(data) {
      this.$refs.email.validate()
      this.$refs.password.validate()
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        this.loginUser(this.formData)
      }
    },
    checkPassButton() {
      if (this.formData.email && this.formData.password) {
        this.isPass = true
      } else {
        this.isPass = false
      }
    },
    inputFocus() {
      this.setLoginError(false)
    },
    goForget(){
      console.log('gogogogogogogo')
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
.text-register-nickname-underline {
  color: #63A1FF;
  text-decoration: underline;
}
</style>
