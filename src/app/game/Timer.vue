<template>
  <div class="timer">
    {{ timer_client }}
  </div>
</template>

<script>
  export default {
    name: 'Timer',
    data() {
      return {
        timer_init:30,
        timer_client: 0
      };
    },
    methods: {
        decTimer: function() {
          if(this.timer_client > 0){
            this.timer_client = this.timer_client-1;
          }
        },
        resetTimer: function(){
          this.timer_client = this.timer_init;
        }
    },
    created() {
      setInterval(this.decTimer, 1000);
      this.timer_client = 30;
    },

  };
</script>
