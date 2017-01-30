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
        timer_client: 0
      };
    },
    methods: {
        decTimer: function() {
          this.timer_client = this.timer_client-1;
        }
    },
    created() {
      setInterval(this.decTimer, 1000);
      this.timer_client = 30;
    },

  };
</script>
