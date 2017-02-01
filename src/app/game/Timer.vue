<template>
  <div class="timer">
    <div class="timer-container">
      <div class="chart" data-percent="100"></div>
      <div class="value">{{ timerClient }}</div>
    </div>
  </div>
</template>

<script>
  import './easypiechart.js'

  export default {
    name: 'Timer',
    data() {
      return {
        timerClient: 0,
      };
    },
    props: {
      countDown: Number
    },
    methods: {
        decTimer: function() {
          if(this.timerClient > 0){
            this.timerClient = this.timerClient-1;
            let percentage = (this.timerClient / this.countDown) * 100;
            $('.chart').data('easyPieChart').update(percentage);
          }
        },
        resetTimer: function(){
          this.timerClient = this.countDown;
        }
    },
    mounted() {
      this.interval = setInterval(this.decTimer, 1000);
      this.timerClient = this.countDown;

      $('.chart').easyPieChart({
        scaleColor: false,
        trackColor: 'rgba(255,255,255,0.2)',
        barColor: '#ea1ad5',
        lineWidth: 16,
        lineCap: 'butt',
        size: 150,
        animate: 200
      });
    },
    beforeDestroy() {
      clearInterval(this.interval);
    }

  };
</script>
