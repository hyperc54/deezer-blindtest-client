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
    this.players = [
      {
        "id": 1,
        "name": "Jean",
        "avatarUrl": "http://i.imgur.com/Cxagv.jpg",
	"score": 2
      },
      {
        "id": 2,
        "name": "Pierre",
        "avatarUrl": "http://i.imgur.com/Cxagv.jpg",
	"score": 10
      }
    ];

    this.socket = io.connect('http://localhost:3000');
    this.room = 'playlist/998065951'
    socket.emit('join', this.room);

    socket.on('NewPlayerMessage', this.newPlayerSocketHandler);
    socket.on('StartTrackMessage', this.startTrackSocketHandler);
    socket.on('EndOfTrackMessage', this.endTrackSocketHandler);
    socket.on('ServerBadAnswerMessage', this.serverBadwAnswerSocketHandler);
  },
  methods: {
    newPlayerSocketHandler: function(message) {

    },
    startTrackSocketHandler: function(message) {
      this.$refs.timer.resetTimer();
      this.countDown = message.countDown;
      DZ.player.playTracks([message.track]);
    },
    endTrackSocketHandler: function(message) {
      console.log(message);
      DZ.player.pause();
    },
    
    serverBadwAnswerSocketHandler: function(message) {
      this.answer = message.guess;
      this.showAnswer = true;
      setTimeout(() => {
        this.showAnswer = false;
      }, 2000);
    }

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
