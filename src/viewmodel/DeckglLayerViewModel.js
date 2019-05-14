import WidgetViewModel from "./WidgetViewModel";

export default class DeckglLayerViewModel extends WidgetViewModel {
  constructor(map, deckglProps) {
    super(map);
    const { layerTypeId, deckglOptions,  layerId } = deckglProps;
    this.layerTypeId = layerTypeId;
    deckglOptions.data = deckglOptions.data || [];
    deckglOptions.layerId = deckglOptions.layerId || layerId;
    this.deckglOptions = deckglOptions;
    this._init();
  }

  _init() {
    if (this.layerTypeId && this.deckglOptions) {
      this._addDeckglLayer();
    }
  }

  _addDeckglLayer() {
    const deckglLayer = new mapboxgl.supermap.DeckglLayer(this.layerTypeId, this.deckglOptions);
    this.map.addLayer(deckglLayer);
  }
}