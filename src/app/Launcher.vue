<template>
  <div class="title">
    <h1 class="title-h1 beber">Welcome to Deezer's own BlindTest app !</h1>
    <login
      v-on:userConnected="setUserConnected"
      v-bind:isConnected="userConnected"
      v-bind:dzReady="dzReady">
    </login>
    <a href="#" v-show="dzReady&userConnected" v-on:click="play"><div class="title-h2 beber"><h2>Play</br><span>NOW</span></h2></div></a>
  </div>
</template>

<script>
import config from '../config.js' ;
import user from './user/currentUser';
import Login from './Login.vue';

export default {
  name: 'Launcher',

  data() {
    return {
      dzReady: false,
      userConnected: false,
      user:user
    }
  },

  components:{
    'login': Login
  },

  methods: {
    play: function() {
      this.$router.push('/public');
    },
    setUserInfos: function(callback){
      DZ.api('/user/me', function(response) {
        user['id'] = response.id;
        user['name'] = response.name;
        user['avatarUrl'] = response.picture_medium;
        callback && callback();
      });
    },
    setUserConnected: function (arg) {
      this.setUserInfos(function () {
        this.userConnected = arg[0];
      });
    },
    checkLoginStatus: function(){
      self = this;
      DZ.getLoginStatus(function(response) {
        if (response.authResponse) {
          self.setUserInfos(function () {
            self.userConnected = true;
            console.log("DZ player Ready to rock !!");
            self.dzReady = true;
          });
        }
      });
    }
  },

  created() {
    let vm = this;

    if (window.location.hostname=='localhost'){var channel = 'localhost:3001';} else {var channel = window.location.hostname;}

    DZ.init({
      appId  : config.appId,
      channelUrl : 'http://' + channel +'/channel.html',
      player: {
        container: 'dz-root',
        width:0,
        height:0,
        onload:function(){
          vm.checkLoginStatus();
        }
      }
    });
  }
};
</script>
