<template>
  <div id="root" class="container-fluid">
    <div class="row header">
      <div class="col-md-4 header-game-img hd" >
        <img  src="/app/assets/img/logo@2x.png">
      </div>
      <div class="col-md-4 header-title-game hd">
        <div class="row">
          <span class="topics">Topic</span>
        </div>
        <div class="row sitcoms">
          Chill
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
import user from './user/currentUser';

export default {
  name: 'Game',
  components: {
    'game-view': GameView,
  },
  props: ['room'],
  created() {
    if (user['id']=='none') {
      this.$router.push('/');
    }
  }
};
</script>
