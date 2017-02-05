<template>
  <div class="splash-messages">
      <div class="sp-content">
        <h2 v-show="showMessage" class="frame-1 spmsg" v-html="answer"></h2>
      </div>
    <div class="splashmsg"></div>
  </div>
</template>

<script>
export default {
  name: 'SplashMessage',
  data() {
    return {
    };
  },
  props: ['user', 'answer', 'showMessage'],
  methods: {
  }
};
</script>
