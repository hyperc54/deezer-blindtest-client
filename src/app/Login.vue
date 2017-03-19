<template>
  <div v-if="dzReady==false">
    <scale-loader :color="color" :height="height" :width="width"></scale-loader>
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
  import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

  export default {
    name: 'Login',
    props:['isConnected', 'dzReady'],
    data() {
      return {
        user:user,
        color:'#e100cb',
        height:'40px',
        width:'5px'
      }
    },
    components:{
      'scale-loader': ScaleLoader
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
