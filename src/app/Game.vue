<template>
  <div id="root">
      <div class="row header">
        <div class="col-md-4 header-game-img hd" >
          <img  src="/app/assets/img/logo.png">
        </div>
        <div class="col-md-4 header-title-game hd">
          <div class="row">
            <span class="topics">Topics</span>
          </div>
          <div class="row sitcoms">
            SITCOMS
          </div>
        </div>
        <div class="col-md-4 header-game-right hd">
          Leave this room
        </div>
      </div>
    <game-view></game-view>
  </div>
</template>

<script>
import Header from './Header.vue';
import GameView from './GameView.vue';

export default {
  name: 'Game',
  components: {
      'game-view': GameView,
  }
};
</script>
