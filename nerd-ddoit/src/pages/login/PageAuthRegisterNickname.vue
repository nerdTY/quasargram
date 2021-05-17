<template>
  <q-page ref='contents' class='bg-black text-white q-pa-md' style='background-size: cover;'>
    <div class='text-basic text-register'>닉네임을 입력해주세요</div>
    <q-input
      v-model="nicknameField"
      ref='nickname'
      dense
      dark
      counter
      maxlength="20"
      :rules='[isRuleNickname]'
      lazy-rules
      color="blue-8"
      hint='DDOIT 프로필에 표시됩니다.'
    >
      <template v-slot:append>
        <q-icon name="close" class="cursor-pointer" @click="setNickname('')"/>
      </template>
    </q-input>
    <p class='text-basic text-register-nickname' style=' font-size: 11px; padding-top: 60px'>약관에 동의해주세요</p>
    <div class='row items-center'>
      <q-chip class='text-basic text-register-nickname text-register-nickname-chip' square text-color="white"
              style='font-size: 10px'>필수
      </q-chip>
      <span class='text-basic text-register-nickname text-register-nickname-underline' @click='goTerms("use")'>DDOIT 사용약관</span>
      <q-space></q-space>
      <q-checkbox class='float-right' dark size="xs" v-model="termsUse" color='info'/>
    </div>
    <div class='row items-center'>
      <q-chip class='text-basic text-register-nickname text-register-nickname-chip' square text-color="white"
              style='font-size: 10px'>필수
      </q-chip>
      <span class='text-basic text-register-nickname text-register-nickname-underline' @click='goTerms("individual")'>개인정보 수집 및 사용</span>
      <q-space></q-space>
      <q-checkbox class='float-right' dark size="xs" v-model="termsIndividual" color='info'/>
    </div>
    <div class='row items-center'>
      <q-chip class='text-basic text-register-nickname bg-grey-9' square text-color="white" style='font-size: 10px'>선택
      </q-chip>
      <span class='text-basic text-register-nickname text-register-nickname-underline' @click='goTerms("party")'>타사에 데이터 제공</span>
      <q-space></q-space>
      <q-checkbox class='float-right' dark size="xs" v-model="termsThirdparty" color='info'/>
    </div>
    <q-footer elevated>
      <q-toolbar :class="isPass ? 'bg-info' : 'bg-grey-6'">
        <q-btn :disable='!isPass' class='full-width ' dense flat label='완료' size='16px' @click='goNextStep'/>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import {mapState, mapActions} from 'vuex'

export default {
  data() {
    return {
      isPass: false,
      termsUse: false,
      termsIndividual: false,
      termsThirdparty: false,
      formData: {
        email: '',
        password: '',
        nickname: '',
        termsUse: false,
        termsIndividual: false,
        termsThirdparty: false,
      }
    }
  },
  watch: {
    termsUse: function () {
      this.checkPass()
    },
    termsIndividual: function () {
      this.checkPass()
    },
  },
  computed: {
    ...mapState("auth", ["nickname","email","password"]),
    nicknameField: {
      get() {
        return this.nickname
      },
      set(value) {
        this.checkPass()
        this.setNickname(value)
      }
    },
  },
  methods: {
    ...mapActions("auth", ["setNickname","registerUser"]),
    goNextStep() {
      this.formData.email = this.email
      this.formData.password = this.password
      this.formData.nickname = this.nickname
      this.formData.termsUse = this.termsUse
      this.formData.termsIndividual = this.termsIndividual
      this.formData.termsThirdparty = this.termsThirdparty

      this.$refs.nickname.validate()
      if (this.isPass) {
        this.registerUser(this.formData)
      }
    },
    goTerms(page) {
      this.$router.push({name: 'terms', params: {division: page}})
    },
    isRuleNickname(nickname) {
      if (!nickname) {
        this.isPass = false
        return '닉네임을 입력해주세요.'
      }
      if (nickname.length > 20) {
        this.isPass = false
        return '20자 이하를 사용하세요.'
      }
      if (nickname === '111111') {
        this.isPass = false
        return '중복된 닉네임입니다.'
      }
    },
    checkPass() {
      return new Promise(() => {
        setTimeout(() => {
          if (this.nickname.length > 0
            && !this.$refs.nickname.hasError
            && this.termsUse
            && this.termsIndividual) {
            this.isPass = true
          } else {
            this.isPass = false
          }
        }, 200)
      })
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

.text-register-nickname {
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0em;
  text-align: left;
}

.text-register-nickname-chip {
  background-color: #120080;
}

.text-register-nickname-underline {
  text-decoration: underline;
}
</style>
