import WidgetViewModel from "./WidgetViewModel";

export default class MapvLayerViewModel extends WidgetViewModel {
  constructor(map, mapvProps) {
    super(map);
    const { dataSet, mapvOptions, layerId } = mapvProps;
    this.dataSet = dataSet;
    this.mapvOptions = mapvOptions.layerId ? mapvOptions : { ...mapvOptions, layerId };
    this._init();
  }

  _init() {
    if (this.dataSet && this.mapvOptions) {
      this._addMapvLayer();
    }
  }

  _addMapvLayer() {
    const mapVLayer = new mapboxgl.supermap.MapvLayer("", this.dataSet, this.mapvOptions);
    this.map.addLayer(mapVLayer);
  }
}