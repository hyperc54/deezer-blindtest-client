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
        channelUrl : 'http://localhost:3000',
        player: {
          container: 'dz-root',
          width:0,
          height:0,
          onload:function(){
            console.log('!!!!!');
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


      console.log('mounted');
      /**
      window.dzAsyncInit = function() {
        DZ.init({
          appId  : '130151',
          channelUrl : 'http://localhost:3000',
          player: {
            container: 'dz-root',
            width:0,
            height:0,
            onload:function(){
              console.log('!!!!!');
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
        console.log('!');


        DZ.ready(function(sdk_options){

        });

      };
      (function() {
        var e = document.createElement('script');
        e.src = 'https://e-cdns-files.dzcdn.net/js/min/dz.js';
        e.async = true;
        document.getElementById('dz-root').appendChild(e);
      }());
       **/
    }

  };
</script>
