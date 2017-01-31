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
    const self = this;
    DZ.init({
      appId  : '130151',
      channelUrl : 'http://localhost:3001',
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
                  avatarUrl: response.picture_small
                };
                window.socket.emit('join', window.room, window.currentUser);
              });

            } else {
                window.currentUser = {
                  id: null,
                  name: 'Guest-' +new Date(),
                  avatarUrl: 'http://cdn-images.deezer.com/images/user/192aeb67b2b328cda1f5e934c4ccc306/160x160-000000-80-0-0.jpg'
                }
            }
          });
        }
      }
    });
  }

};
</script>
