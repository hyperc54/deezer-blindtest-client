<template>
  <transition name="splash-solution">
    <div class="splash-solutions" v-show="showSolution">
      <img :src="cover_url" class="splash-solution-img">
      <h2 class="splash-solution-msg">{{ artist }}</h2>
      <h3 class="splash-solution-msg">{{ title_track }}</h3>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'SplashSolution',
    data() {
      return {
      };
    },
    props: ['artist', 'title_track', 'cover_url', 'showSolution'],
    methods: {
    }
  };
</script>
