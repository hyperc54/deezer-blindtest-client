<template>
  <div v-if="dzReady==false">

  </div>
  <div v-else>
    <h3 v-if="isConnected==true">Hey {{user.name}} !</h3>
    <div v-else>
      <h3>Hey handsome ! Please connect on Deezer first !</h3>
      <button type="button" class="btn btn-default" href="#" v-on:click="logIn">Connect</button>
    </div>
  </div>

</template>

<script>
  import user from './user/currentUser';

  export default {
    name: 'Login',
    props:['isConnected', 'dzReady'],
    data() {
      return {
        user:user
      }
    },
    methods: {
      logIn: function() {
        self = this;
        DZ.login(function(response) {
          console.log(response.authResponse);
          if(response.authResponse && response.authResponse.accessToken) {
            self.$emit('userConnected', [true]);
          } else {
            console.log('login failed !')
          }
        });
      }
    },

  };
</script>
