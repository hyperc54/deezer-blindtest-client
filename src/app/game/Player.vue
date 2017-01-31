<template>
  <div class="player">
    <div id="dz-root"></div>
  </div>
</template>

<script>
  export default {
    name: 'Player',
    data() {
      return {
      };
    },
    methods: {
      loadtrack: function(id) {
        DZ.player.playTracks([id])
      }
    },
    mounted(){
      DZ.init({
        appId  : '130151',
        channelUrl : 'http://localhost:3001',
        player: {
          container: 'dz-root',
          width:0,
          height:0,
          onload:function(){
            DZ.getLoginStatus(function(response) {
              console.log(response);
              if (response.authResponse) {
                console.log('user logged in');
                // logged in and connected user, someone you know
              } else {
                // no user session available, someone you dont know
              }
            });
          }
        }
      });
    }

  };
</script>
