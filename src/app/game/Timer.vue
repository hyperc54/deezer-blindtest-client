<template>
  <div class="timer">
    <div class="timer-container">
      <div class="chart" data-percent="73"></div>
      <div class="value">{{ timer_client }}</div>
    </div>
  </div>
</template>

<script>
  import './easypiechart.js'

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

      $('.chart').easyPieChart({
        scaleColor: false,
        trackColor: 'rgba(255,255,255,0.2)',
        barColor: '#ea1ad5',
        lineWidth: 22,
        lineCap: 'butt',
        size: 350
      });

    },

  };
</script>
