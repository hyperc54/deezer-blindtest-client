<template>
    <div class="answer-bar">
        <div class="input-group" id="input-rep">
            <form v-on:submit.prevent="sendAnswer">
                <img :src="playerAvatar" class="player_avatar">
                <input autocomplete="off" id="blast" type="text" class="form-control" v-model="answer"
                       placeholder="" autofocus/>
                <button id="send" class="btn btn-success" type="submit">SEND</button>
            </form>
        </div><!-- /input-group -->
    </div>
</template>

<script>
import user from '../user/currentUser'

  export default {
      name: 'AnswerBar',
      data() {
          return {
              answer: "",
              playerAvatar: user.avatarUrl || ''
          };
      },
      methods: {
          sendAnswer: function () {
              this.$emit('answerSent', this.answer);
              this.answer = "";
          }
      }
  };
</script>
