<template>
  <div id="root">
    <header-component></header-component>
    <main>
      <launcher-component></launcher-component>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Header from './Header.vue';
import Launcher from './Launcher.vue';
import Footer from './Footer.vue';

export default {
  name: 'Main',
  components: {
    'header-component': Header,
    'launcher-component': Launcher,
    'footer-component': Footer
  }
};
</script>
