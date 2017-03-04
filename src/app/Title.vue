<template>
  <div class="title">
    <h1 class="title-h1 beber">Welcome to Deezer's own BlindTest app !</h1>
    <a href="#" v-show="dzReady" v-on:click="logInOrPlay"><div class="title-h2 beber"><h2>Play</br><span>NOW</span></h2></div></a>
  </div>
</template>

<script>
export default {
  name: 'Title',
  data() {
    return {
      dzReady: false
    }
  },

  methods: {
    logInOrPlay: function() {
      if (window.currentUser){
        this.$router.push('/public');
      } else {
        self = this;
        DZ.login(function(response) {
          console.log(response.authResponse);
          if(response.authResponse && response.authResponse.accessToken) {
              DZ.api('/user/me', function(response) {
                window.currentUser = {
                  id: response.id,
                  name: response.name,
                  avatarUrl: response.picture_medium
                };
                self.$router.push('/public');
              });
          }
        });
      }
    }
  },

  created() {
    let self = this;
    DZ.init({
      appId  : '223904',
      channelUrl : 'http://' + window.location.hostname + ':' + '3001'+ '/channel.html',
      player: {
        container: 'dz-root',
        width:0,
        height:0,
        onload:function(){
          DZ.getLoginStatus(function(response) {
            if (response.authResponse) {
              DZ.api('/user/me', function(response) {
                window.currentUser = {
                  id: response.id,
                  name: response.name,
                  avatarUrl: response.picture_medium
                };
              });
            }
            self.dzReady = true;
          });
        }
      }
    });
  }
};
</script>
