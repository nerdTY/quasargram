<template>
  <q-page class=''>
    <q-header>
      <q-toolbar class='bg-white'>
        <q-btn color='grey-10' flat dense icon='mdi-tune' round/>
        <q-space></q-space>
        <q-btn color='grey-10' flat dense icon='mdi-magnify' round/>
        <q-btn color='grey-10' flat dense icon='mdi-bell-outline' round @click="logoutUser"/>
      </q-toolbar>
    </q-header>
    <div class='row q-pl-md'>
      <span class='text-grey-6 text-basic text-bold'>총 320 매치</span>
    </div>


    <div class="q-pa-md">
      <div class="row q-col-gutter-md">
        <div class="col-6" v-for="n in 5" :key="`sm-${n}`">
          <q-card class="my-card">
            <q-card-section>
              {{ "aedliajdliakdo" }}
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class='row'>
      <img
        alt='Quasar logo'
        src='~assets/quasar-logo-full.svg'
      >
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PageIndex',
  methods:{
    ...mapActions("auth",["logoutUser"])
  }
}
</script>

<style lang="sass" scoped>
.my-content
  padding: 10px 15px
  background: rgba(86,61,124,.15)
  border: 1px solid rgba(86,61,124,.2)

.my-card
  width: 100%
  max-width: 250px
  min-height: 200px
</style>
