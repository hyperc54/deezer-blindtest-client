<template>
  <div class="gameview">
    <div class="row">
        <h2>Players list</h2>
        <ul id="hor">
          <li v-for="player in players">
              <img :src="player.avatarUrl" class="player_avatar"><span>{{player.name}}</span>
          </li>
        </ul>
        <player-component></player-component>
    </div>
    <div class="row">
      <timer-component></timer-component>
    </div>
    <div class="row">
      <div class="sp-container">
        <div class="sp-content">
          <h2 class="frame-1"><span>Paul</span> thought it was</br> <span>Patrick Sebastien</span> HAHAHA</h2>
        </div>
      </div>
      <div class="splashmsg"></div>
    </div>
    <div class="row">
      <div class="input-group" id="input-rep">
        <input id="blast" type="text" class="form-control" placeholder="" autofocus>
        <div class="vspace20"></div>
        <button id="send" class="btn btn-success" type="button">SEND</button>
      </div><!-- /input-group -->

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
      socket.emit('ClientGuessMessage', {message: "Coucou c'est Pierre"});

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
