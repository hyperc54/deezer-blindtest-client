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

const socket = io.connect('http://172.16.6.133:3000');

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
    window.socket = this.socket = io.connect('http://localhost:3000');
    window.room = this.room = 'playlist/998065951'

    this.socket.on('NewPlayerMessage', this.newPlayerSocketHandler);
    this.socket.on('StartTrackMessage', this.startTrackSocketHandler);
    this.socket.on('EndOfTrackMessage', this.endTrackSocketHandler);
    this.socket.on('ServerBadAnswerMessage', this.serverBadwAnswerSocketHandler);
  },
  methods: {
    newPlayerSocketHandler: function(message) {
      console.log(message.players)
      this.players = message.players;
    },

    startTrackSocketHandler: function(message) {
      this.$refs.timer.resetTimer();
      DZ.player.playTracks([message.id]);
    },
    endTrackSocketHandler: function(message) {
      DZ.player.pause();
    },

    serverBadwAnswerSocketHandler: function(message) {
      this.answer = message.guess;
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
      this.socket.emit('ClientGuessMessage', message);
    }
  }
};
</script>
