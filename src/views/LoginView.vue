<template>
  <div>
    Login
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
  </div>
</template>

<script>

export default {
  name: 'LoginView',
  components: {
    'GoogleLogin': () => import('vue-google-login'),
  },
  data() {
    return {
      // client_id is the only required property but you can add several more params, full list down bellow on the Auth api section
      params: {
        client_id: "xxxxxx"
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true
      }
    }
  },
  methods: {
     onSuccess(googleUser) {
         console.log(googleUser);

         // This only gets the user information: id, name, imageUrl and email
         console.log(googleUser.getBasicProfile());
     },
     onFailure(err){
       console.log(err)
     }
 }

}
</script>

<style>

</style>
