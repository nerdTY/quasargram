<template>
  <q-layout view='lHh Lpr lFf'>
<!--    <q-header>-->
<!--      <q-toolbar>-->
<!--        <q-toolbar-title>-->
<!--          Quasar App-->
<!--        </q-toolbar-title>-->

<!--        <div>Quasar v{{ $q.version }}</div>-->
<!--      </q-toolbar>-->
<!--    </q-header>-->
    <q-footer bordered class='bg-white text-primary'>
      <q-tabs
        v-model='tab'
        active-color='grey-10'
        class='text-grey-5'
        indicator-color='transparent'
        no-caps
        dense
        content-class='text-basic'
      >
        <q-route-tab icon='mdi-home-variant' label='매치' name='match' to='/'/>
        <q-route-tab icon='mdi-flag-variant' label='나의 클럽' name='myClub' to='/myClub'/>
        <q-route-tab icon='mdi-account-multiple' label='클럽 목록' name='listClub' to='listClub'/>
        <q-route-tab icon='mdi-send' label='메시지' name='chat' to='/chat'/>
        <q-route-tab icon='mdi-account-circle' label='나의 뚜잇' name='me' to='/me'/>
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data() {
    return {
      tab: 'match'
    }
  }
}
</script>
<style lang='scss'>
.platform-ios {
  .q-footer {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .q-tabs {
      .q-tab__label{
        font-size: 10px;
      }
    }
  }
}
</style>
