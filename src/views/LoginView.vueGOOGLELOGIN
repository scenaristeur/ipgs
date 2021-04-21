<template>
  <div>
    Login
    <GoogleLogin :params="params" :renderParams="renderParams" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
    <GoogleLogin :params="params" :logoutButton=true>Logout</GoogleLogin>
    <!-- <div class="row">
  <div class="col-md-3">
    <a class="btn btn-outline-dark" href="/users/googleauth" role="button" style="text-transform:none">
      <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
      Login with Google
    </a>
  </div>
</div> -->
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
        client_id: "999481119471-v6pkuls9nt79j151f9mavucm98aj3p3i.apps.googleusercontent.com"
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
