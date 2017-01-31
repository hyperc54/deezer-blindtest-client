<template>
  <div class="splash-messages">
    <div class="row">
      <div class="sp-container">
        <div class="sp-content">
          <h2 v-show="showAnswer" class="frame-1"><span>{{ user }}</span> thought it was</br> <span>{{ answer }}</span> HAHAHA</h2>
        </div>
      </div>
      <div class="splashmsg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SplashMessage',
  data() {
    return {
    };
  },
  props: ['user', 'answer', 'showAnswer'],
  methods: {
  }
};
</script>
