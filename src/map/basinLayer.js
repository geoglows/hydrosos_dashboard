import L from "leaflet";
let selectedLayer = null;
const basinLookup = new Map();
let leafletMap = null;



function highlightLayer(layer) {

  if (selectedLayer) {

      selectedLayer.setStyle({

          fillOpacity: 0,
          color: "#808080",
          weight: 1

      });

  }

  layer.setStyle({

      fillOpacity: 0.2,
      fillColor: "#3388ff",
      color: "#3388ff",
      weight: 3

  });

  selectedLayer = layer;

}

export function addBasinLayer(map, geojson, onClick) {

  leafletMap = map;


  const layer = L.geoJSON(geojson, {

      style: {
          fillOpacity: 0,
          color: "#808080",
          weight: 1
      },

      onEachFeature: (feature, l) => {

          const hybasID =
              String(feature.properties.HYBAS_ID);

          basinLookup.set(hybasID, l);

          l.on("click", () => {

    const feature = selectBasin(
        hybasID,
        leafletMap
    );

    onClick(feature);

});

      }

  });

  layer.addTo(map);

  layer.bringToFront();

  return layer;

}





export function selectBasin(hybasID, map) {

  const layer = basinLookup.get(String(hybasID));

  if (!layer) {
      return null;
  }

  highlightLayer(layer);

  map.fitBounds(layer.getBounds(), {
      padding: [225, 225],
      maxZoom: 8
  });

  return layer.feature;

}