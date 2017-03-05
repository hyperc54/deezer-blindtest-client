<template>
  <div class="gameview">
    <div class="row">
      <transition-group name="flip-list" tag="ul" id="hor"> <!-- Enables smooth transitioning -->
        <li v-for="player in sortedListPlayers" v-bind:key="player">
          <img :src="player.avatarUrl" class="player_avatar">
          <span>{{player.name}}</span>
          <span class="score">{{player.score}}</span>
        </li>
      </transition-group>
      <player-component></player-component>
    </div>
    <div class="row">
      <timer-component :countDown="countDown" ref='timer'></timer-component>
    </div>
    <div class="row sp-container">
      <splash-message :showMessage="showMessage" user='Jean-Michel' :answer="answer"></splash-message>
    </div>
    <splash-solution :showSolution="showSolution" :artist='artist_solution' :title_track="track_solution" :cover_url="cover_url"></splash-solution>
    <div class="row game-footer">
      <answer-bar @answerSent="sendAnswer"></answer-bar>
    </div>
  </div>

</template>

<script>
import Timer from './game/Timer.vue';
import Player from './game/Player.vue';
import AnswerBar from './game/AnswerBar.vue';
import SplashMessage from './game/SplashMessage.vue';
import SplashSolution from './game/SplashSolution.vue';
import * as io from 'socket.io-client';
import config from '../config.js' ;

const socket = io.connect('http://' + config.serverDomain);

export default {
  name: 'GameView',
  components: {
    'timer-component': Timer,
    'player-component': Player,
    'answer-bar': AnswerBar,
    'splash-message': SplashMessage,
    'splash-solution': SplashSolution
  },
  data() {
    return {
      players: [],
      countDown: 30,
      socket: null,
      showMessage: false,
      showSolution: false
    };
  },
  computed: {
    sortedListPlayers: function() {
      return this.players.sort(function (player_a, player_b) {
        return player_b.score - player_a.score;
      })
    }
  },
  created() {
    window.socket = this.socket = io.connect('http://' + config.serverDomain);
    window.room = this.room = 'playlist/1930969042';
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

    // Register debug functions
    window.debugAddNewFakePlayer = this.debugAddNewFakePlayer;
    window.debugAddScorePlayerIndex = this.debugAddScorePlayerIndex;
    window.debugGetThisTest = this.debugGetThisTest;
  },
  methods: {

    updatePlayerList : function(player_list){
      player_list.forEach((value) =>{
        let containsPlayer = this.players.map((i) => {
          return i.id;
        }).includes(value.id);
        if(!containsPlayer){
          this.players.push(value);
        }
      })
    },

    newPlayerSocketHandler: function(message) {
      this.updatePlayerList(message.players);
    },

    newPlayerBroadcastSocketHandler: function(message) {
      console.log(message);
      this.updatePlayerList(message);
    },

    startTrackSocketHandler: function(message) {
      this.$refs.timer.resetTimer();
      DZ.player.playTracks([message.id]);
    },

    endTrackSocketHandler: function(message) {
      self = this;
      DZ.api('/track/'+message.answer.id, function(response){
        self.cover_url = response.album.cover_medium;
        self.artist_solution = message.answer.artist;
        self.track_solution = message.answer.track;
        self.showSolution = true;
        setTimeout(() => {
          self.showSolution = false;
        }, 4000);
      });

      DZ.player.pause();
    },


    serverBadAnswerSocketHandler: function(message) {
      this.answer = message.message;
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
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
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
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
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 2000);
    },

    serveGoodAnswerMessageSocketHandler: function(message) {
      this.answer = "Good answer ! " + '<span>' + window.currentUser.name + '</span>';
      this.players.forEach((value) => {
        if (value.id == window.currentUser.id) {
          value.score = message.newScore;
        }
      });
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
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
    },

    //Debug functions
    debugAddNewFakePlayer: function() {
      this.players.push({id:1,name:"Jacques",score:0});
    },
    debugGetThisTest: function() {
      console.log(this);
    },
    debugAddScorePlayerIndex: function(ind) {
      this.players[ind].score++
    }
  }
};
</script>
