<template>
  <div id="root">
    <header-component></header-component>
    <game-view></game-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import GameView from './GameView.vue';

export default {
  name: 'Game',
  components: {
      'header-component': Header,
      'game-view': GameView,
      'footer-component': Footer
  }
};
</script>
