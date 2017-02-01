<template>
  <div class="answer-bar">
    <div class="row">
      <div class="input-group" id="input-rep">
        <form v-on:submit.prevent="sendAnswer">
          <input autocomplete="off" id="blast" type="text" class="form-control" v-model="answer" placeholder="" autofocus>
          <div class="vspace20"></div>
          <button id="send" class="btn btn-success" type="submit">SEND</button>
        </form>
      </div><!-- /input-group -->
    </div>
  </div>
</template>

<script >
export default {
  name: 'AnswerBar',
  data() {
    return {
      answer: ""
    };
  },
  methods: {
      sendAnswer: function() {
        this.$emit('answerSent', this.answer);
        this.answer="";
      }
  }
};
</script>
