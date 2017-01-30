<template>
  <div class="gameview">
    <div class="row"></div>
    <div class="row">
      <div class="col-sm-8">
        <h2>Players list</h2>
        <ul>
          <li v-for="player in players"><img :src="player.avatarUrl" class="player_avatar">{{player.id}} - {{player.name}}</li>
        </ul>
        <h2>Current responses</h2>
      </div>
      <div class="col-sm-4">
        <h2>Player</h2>
        <timer-component></timer-component>
        <player-component></player-component>
      </div>
    </div>
    <div class="row">
      <div class="input-group" id="input-rep">
        <input id="blast" type="text" class="form-control" placeholder="send something" autofocus>
      </div><!-- /input-group -->
      <button id="send" class="btn btn-success" type="button">Send</button>
    </div>
  </div>

</template>

<script>
  import Timer from './game/Timer.vue';
  import Player from './game/Player.vue';
  import * as io from 'socket.io-client';

  const socket = io.connect('http://172.16.6.133:3000');

  export default {
    name: 'GameView',
    components: {
      'timer-component': Timer,
      'player-component': Player
    },
    data() {
      return {
        players: []
      };
    },
    created() {
      this.players = [
        {
          "id": 1,
          "name": "Jean",
          "avatarUrl": "http://i.imgur.com/Cxagv.jpg"
        },
        {
          "id": 2,
          "name": "Pierre",
          "avatarUrl": "http://i.imgur.com/Cxagv.jpg"
        }
      ];

      //SOCKET STUFF
      socket.emit('blindtest', {message: "Coucou c'est Pierre"});

      socket.on('blindtest', message => {
        console.log(message);
      });

      socket.on('EndOfTrackMessage', message => {
        DZ.player.pause();
      });

      socket.on('StartTrackMessage', message => {
        this.$children[0].resetTimer();
        DZ.player.playTracks([message.track]);
      });

      socket.on('NewPlayerMessage', message => {

      });

    },
    mounted() {
      //JQUERY STUFF
      var $blastField = $('#blast');
      var $sendBlastButton = $('#send');

      $sendBlastButton.click(function(e){
        var blast = $blastField.val();
        if(blast.length){
          socket.emit("blindtest", {message:blast});
          console.log('Envoyé');
          $blastField.val('');
        }
      });

      $blastField.keydown(function (e){
        if(e.keyCode == 13){
          $sendBlastButton.trigger('click');//lazy, but works
        }
      });

    }
  };
</script>
