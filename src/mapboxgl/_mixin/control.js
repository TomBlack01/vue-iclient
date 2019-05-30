import mapEvent from '../_types/map-event';

export default {
  props: {
    position: {
      type: String,
      default: 'top-left',
      validator(value) {
        return ['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(value);
      }
    }
  },
  watch: {
    position() {
      this.remove(this.map);
      this.addTo(this.map);
    }
  },
  mounted() {
    this.parentIsWebMapOrMap = this.$parent.$options.name && this.$parent.$options.name.toLowerCase() === 'smwebmap';
    this.filterDelayLoad = !['smwebmap', 'smminimap'].includes(this.$options.name && this.$options.name.toLowerCase());
    if (this.$el && this.parentIsWebMapOrMap) {
      if (this.filterDelayLoad) {
        this.isShow = false;
        this.$el.style && (this.$el.style.display = 'none');
      }
      const targetName = this.$parent.target || mapEvent.firstMapTarget;
      if (mapEvent.$options.getMap(targetName)) {
        this.mapLoaded(mapEvent.$options.getMap(targetName));
      }
      mapEvent.$on(`initMap-${targetName}`, map => {
        this.mapLoaded(map);
      });
    }
  },
  methods: {
    initControl() {
      var self = this;
      return {
        onAdd() {
          return self.$el;
        },
        onRemove() {
          return self.map;
        }
      };
    },
    addTo() {
      this.control = this.initControl();
      this.map.addControl(this.control, this.position);
      this.$el.classList.add('mapboxgl-ctrl');
    },
    remove() {
      this.control && this.map.removeControl(this.control);
    },
    mapLoaded(map) {
      this.map = map;
      this.addTo();
      if (this.filterDelayLoad) {
        this.isShow = true;
        this.$el.style && (this.$el.style.display = 'block');
      }
    }
  },
  beforeDestroy() {
    this.remove();
  }
};
