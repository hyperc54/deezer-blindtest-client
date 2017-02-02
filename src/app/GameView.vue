<template>
  <div class="gameview">
    <div class="row">
      <ul id="hor">
        <li v-for="player in players">
          <img :src="player.avatarUrl" class="player_avatar">
          <span>{{player.name}}</span>
          <span class="score">{{player.score}}</span>
        </li>
      </ul>
      <player-component></player-component>
    </div>
    <div class="row">
      <timer-component :countDown="countDown" ref='timer'></timer-component>
    </div>
    <splash-message :showAnswer="showAnswer" user='Jean-Michel' :answer="answer"></splash-message>
    <answer-bar @answerSent="sendAnswer"></answer-bar>
  </div>

</template>

<script>
import Timer from './game/Timer.vue';
import Player from './game/Player.vue';
import AnswerBar from './game/AnswerBar.vue';
import SplashMessage from './game/SplashMessage.vue';
import * as io from 'socket.io-client';

const socket = io.connect('http://localhost:3000');

export default {
  name: 'GameView',
  components: {
    'timer-component': Timer,
    'player-component': Player,
    'answer-bar': AnswerBar,
    'splash-message': SplashMessage
  },
  data() {
    return {
      players: [],
      countDown: 30,
      socket: null,
      showAnswer: false
    };
  },
  created() {
    window.socket = this.socket = io.connect('http://' + window.location.hostname + ':3000');
    window.room = this.room = 'playlist/1570259211';
    window.socket.emit('join', window.room, window.currentUser);
    window.socket.on('NewPlayerMessage', this.newPlayerSocketHandler);
    window.socket.on('NewPlayerBroadcast', this.newPlayerBroadcastSocketHandler);
    window.socket.on('StartTrackMessage', this.startTrackSocketHandler);
    window.socket.on('EndOfTrackMessage', this.endTrackSocketHandler);
    window.socket.on('ServerBadAnswerMessage', this.serverBadAnswerSocketHandler);
    window.socket.on('ServerBadAnswerBroadcast', this.serverBadAnswerBroadcastSocketHandler);
    window.socket.on('ServerGoodAnswerBroadcast', this.serveGoodAnswerBroadcastSocketHandler);
    window.socket.on('ServerGoodAnswerMessage', this.serveGoodAnswerMessageSocketHandler);
    window.socket.on('PlayerLeaveBroadcast', this.playerLeaveBroadcastSocketHandler);
  },
  methods: {
    newPlayerSocketHandler: function(message) {
      this.players = message.players;
    },

    newPlayerBroadcastSocketHandler: function(message) {
      this.players = message;
    },

    startTrackSocketHandler: function(message) {
      this.$refs.timer.resetTimer();
      DZ.player.playTracks([message.id]);
    },

    endTrackSocketHandler: function(message) {
      this.answer = "The answer was : %track by %artist".replace("%track", message.answer.track).replace("%artist", message.answer.artist);
      this.showAnswer = true;
      setTimeout(() => {
        this.showAnswer = false;
      }, 4000);
      DZ.player.pause();
    },

    serverBadAnswerSocketHandler: function(message) {
      this.answer = message.message;
      this.showAnswer = true;
      setTimeout(() => {
        this.showAnswer = false;
      }, 2000);
    },

    serverBadAnswerBroadcastSocketHandler: function(message) {
      let player = "";
      this.players.forEach((value) => {
        if (value.id == message.id) {
          player = '<span>' + value.name + '</span>';
        }
      });
      this.answer = message.message.replace('%s', player);
      this.showAnswer = true;
      setTimeout(() => {
        this.showAnswer = false;
      }, 2000);
    },

    serveGoodAnswerBroadcastSocketHandler: function(message) {
      let player = "";
      this.players.forEach((value) => {
        if (value.id == message.id) {
          player = '<span>' + value.name + '</span>';
          value.score = message.newScore;
        }
      });
      this.answer = "Good answer ! " + player;
      this.showAnswer = true;
      setTimeout(() => {
        this.showAnswer = false;
      }, 2000);
    },

    serveGoodAnswerMessageSocketHandler: function(message) {
      this.answer = "Good answer ! " + '<span>' + window.currentUser.name + '</span>';
      this.players.forEach((value) => {
        if (value.id == window.currentUser.id) {
          value.score = message.newScore;
        }
      });
      this.showAnswer = true;
      setTimeout(() => {
        this.showAnswer = false;
      }, 2000);
    },

    sendAnswer: function(answer) {
      const message = {
        "room": this.room,
        "guess": answer,
        "trackTime": this.$refs.timer.timerClient
      };
      window.socket.emit('ClientGuessMessage', message);
    },

    playerLeaveBroadcastSocketHandler: function(message) {
      this.players = this.players.filter((value) => {
        return value.id !== message.id;
      });

    }
  }
};
</script>
