<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="m-sm-0">
      <!-- <b-navbar-brand to="/">ipgs</b-navbar-brand> -->
      <CommandInput />
      <Notification />
      <NetworkToolBar />
      <!-- <b-button @click="help">?</b-button> -->
      <b-navbar-toggle target="nav-collapse" class="p-0 m-0"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- <b-nav-item href="#">Share</b-nav-item> -->


          <!-- <SolidLoginButton /> -->
          <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">InterPlanetary Graph System</b-nav-item>
          <b-nav-item to="/agora">Agora</b-nav-item>
          <b-nav-item to="/browser">Browser</b-nav-item>
          <b-nav-item to="/history">History</b-nav-item>
          <b-nav-item to="/suggested">Suggested</b-nav-item>
          <b-nav-item to="/reunion">Reunion</b-nav-item>
          <b-nav-item to="/about">About</b-nav-item>
          <!-- <b-nav-item to="/simple">S</b-nav-item> -->

          <!-- <b-nav-item href="/browser">Share</b-nav-item> -->
          <!-- <b-nav-form> -->
          <!-- <Menu v-if="webId != null"/> -->
          <SolidLoginButton />
          <!-- <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
          <!-- </b-nav-form> -->
          <!--
          <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right> -->
        <!-- Using 'button-content' slot -->
        <!-- <template #button-content>
        <em>User</em>
      </template>
      <b-dropdown-item href="#">Profile</b-dropdown-item>
      <b-dropdown-item href="#">Sign Out</b-dropdown-item>
    </b-nav-item-dropdown> -->
  </b-navbar-nav>
</b-collapse>
</b-navbar>
</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Navbar",
  components: {
    // HelloWorld,
    //  'Menu': () => import('@/components/layout/Menu'),
    'CommandInput': () => import('@/components/layout/CommandInput'),
    'Notification': () => import('@/components/layout/Notification'),
    'SolidLoginButton': () => import('@/components/solid/SolidLoginButton'),
    'NetworkToolBar': () => import('@/components/network/NetworkToolBar'),
  },
  // methods: {
  //   help() {
  //     this.$root.$emit('bv::enable::tooltip')
  //   }
  // },
  computed: mapState({
    webId: s => s.solid.webId
  }),
}
</script>

<style>

</style>
