<template>
  <q-page class='flex flex-center bg-image'>
    <div class='q-pt-lg q-mt-lg'>
      <div class='text-white logo-text'>DDOIT</div>
      <div class='text-white login-subtext text-basic'>자유롭게 축구 경기를 매칭하세요</div>
      <div class='column q-gutter-y-sm items-end' style='margin-bottom: -80px'>
        <q-btn label='가입하기' rounded style='width: 260px; background-color: #3F20FF; color: white' @click='goRegister'/>
        <q-btn color='white' label='구글로 계속하기' outline rounded style='width: 260px'/>
        <q-btn color='white' label='카카오로 계속하기' outline rounded style='width: 260px'/>
        <q-btn color='white' label='페이스북으로 계속하기' outline rounded style='width: 260px'/>
        <q-btn color='white' flat label='로그인하기' rounded style='width: 260px' @click="goLogin"/>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'PageLoginMain',
  methods:{
    goRegister(){
      this.$router.push("/auth/register1")
    },
    goLogin(){
      this.$router.push("/auth/login")
    }
  }
}
</script>

<style>
.login-subtext {
  font-family: Spoqa Han Sans Neo;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  margin-bottom: 187px;
}

.bg-image {
  background-image: url(~assets/login/gradient.png),url(~assets/login/bg.png);
  -webkit-background-size: cover,cover;
  -moz-background-size: cover,cover;
  -o-background-size: cover,cover;
  background-size: cover,cover;
}
</style>
