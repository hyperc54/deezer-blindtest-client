<template>
  <div class="player">
  </div>
</template>

<script>
export default {
  name: 'Player',
  data() {
    return {
    };
  },
  methods: {
    loadtrack: function(id) {
      DZ.player.playTracks([id])
    }
  },

};
</script>
