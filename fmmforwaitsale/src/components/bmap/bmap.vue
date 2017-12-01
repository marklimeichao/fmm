<template>
  <div class="bmap">
  </div>
</template>
<script>
export default {
  data() {
    return {
      Lon: 1,
      Lat: 1
    }
  },
  mounted() {
    var options = {
      enableHighAccuracy: true,
      maximunAge: 1000,
      timeout: 5000
    };
    var that;
    var _this = this;
    var map = new BMap.Map();
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        this.Lon = r.point.lng;
        this.Lat = r.point.lat;
        that = this
      }
      else {
        alert('failed' + this.getStatus());
      }
      _this.$emit('getAdd', that.Lon, that.Lat);
    }, { enableHighAccuracy: true });

  },
  methods: {

  }
}
</script>
<style lang="stylus">
  .bmap
    // margin-top:2rem
</style>
