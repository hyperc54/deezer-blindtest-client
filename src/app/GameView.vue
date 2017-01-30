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
  </div>

</template>

<script>
  import Timer from './game/Timer.vue';
  import Player from './game/Player.vue';
  import * as io from 'socket.io-client';

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

      const socket = io.connect('http://172.16.6.133:3000');
      socket.emit('blindtest', {message: "Coucou c'est Pierre"});
      socket.on('blindtest', message => {
        console.log(message);
      });

    },
  };
</script>
