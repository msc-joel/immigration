mapboxgl.accessToken =
"pk.eyJ1Ijoiam9lbGtvbm9wbyIsImEiOiJjbDN1OG16cjkyNjJzM2NyeHljZnQ1bjJsIn0.9ot6HAPQ1SZXqWAKLd67BQ";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/joelkonopo/cl4kp3fls004g15nyp9n2rdgz",
  center:[43.541,-33.1041],
  //zoom: 1.15,
  //maxZoom: 10,
  //minZoom: 1,
  //projection:'naturalEarth',
});


map.on("load", function () {
    map.addLayer(
      { 
        id: "migrants-to-US", 
        type: "circle",
        source: {
          type: "geojson",
          data: "migGEO.geojson",
        },
        paint:{
            "circle-radius": 5,
            "circle-color": [
                "match",
                ["get", "athletes_artists_entertainers"],
                "0 - 1530", "#4287f5",
                "1531 - 3200", "#14e09c",
                "3201 - 6200",  "#86f0cd",
                "6201 - 10000", "#5d6b67",
                "10001 - 15000", "#474d4b",
                "15001 - 18000", "#0bd994",
                "18001 - 21825", "#163b2e",
                "#ffffff",
            ],
        },
    },"waterway-label");
});




// Pop up
map.on("click", "migrants-to-US", function (e) {
    var ADMIN = e.features[0].properties['ADMIN'];
    var investors = e.features[0].properties.athletes_artists_entertainers;
    console.log(ADMIN);
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<h4>" 
        + "ADMIN:" 
        + "</h4>" 
        + "<hr>"
        + "<h6>" 
        + ADMIN
        + "</h6>"
        + "<h4>" 
        + "athletes_artists_entertainers: " 
        + investors 
        + "</h4>"
      )
      .addTo(map);
    });
    // Change the cursor to a pointer when the mouse is over the us_states_elections layer.
  map.on("mouseenter", "migrants-to-US", function () {
  map.getCanvas().style.cursor = "pointer";});
   // Change it back to a pointer when it leaves.
  map.on("mouseleave", "migrants-to-US", function () {
  map.getCanvas().style.cursor = ""; });

//   var flanneryCompensation = function(migGEO.geojson, ADMIN, 0.5) {
//     // Creates a Flannery Appearence Compensation
//     var geojsonLayer = L.geoJson(migGEO.geojson);

//     var valMin = Number.POSITIVE_INFINITY;;
//     geojsonLayer.eachLayer(function (layer) {
//         // Get minimum value of all features
//         var value = layer.feature.properties[ADMIN];
//         if (value < valMin) valMin = value;
//     });

//     geojsonLayer.eachLayer(function (layer) {
//         var value = layer.feature.properties[ADMIN];

//         // Flannery Appearance Compensation case:
//         pValue = 1.0083 * Math.pow(value/valMin, 0.5716) * 0.5

//         var circleLayer = L.circle(layer._latlng, pValue);
//         circleLayer.bindPopup(String(value));
//         circleLayer.addTo(map);
//     });
// };