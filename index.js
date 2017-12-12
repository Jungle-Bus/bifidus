var map = new mapboxgl.Map({
  container: 'map',
  style: 'glstyle.json',
  center: [
    2.4067, 48.7031
  ],
  zoom: 14,
  hash: true
});
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));

map.on('load', function() {
  map.loadImage('https://raw.githubusercontent.com/osm-fr/osmose-frontend/master/static/images/markers/marker-b-3010.png', function(error, image) {
    if (error)
      throw error;
    map.addImage('8040', image);
  });

  map.loadImage('https://raw.githubusercontent.com/osm-fr/osmose-frontend/master/static/images/markers/marker-b-0.png', function(error, image) {
    if (error)
      throw error;
    map.addImage('2140', image);
  });

  map.loadImage('https://raw.githubusercontent.com/osm-fr/osmose-frontend/master/static/images/markers/marker-b-5010.png', function(error, image) {
    if (error)
      throw error;
    map.addImage('1260', image);
  });

  var popup = document.getElementById('popup');

  map.on('click', function(e) {
    if (popup.style.display == 'block') {
      popup.style.display = 'none'
    }

  });

  // //issues_1260_2
  map.addLayer({
    "id": "issues_1260_2",
    "type": "symbol",
    "source": {
      'type': 'vector',
      "tiles": ["https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/map/issues/{z}/{x}/{y}.mvt?item=1260&class=2"],
      "attribution": "Osmose",
      "minzoom": 12
    },
    "source-layer": "issues",
    "layout": {
      "icon-image": "{item}"
    }
  });
  map.on('mouseenter', 'issues_1260_2', function(e) {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'issues_1260_2', function() {
    map.getCanvas().style.cursor = '';
  });

  map.on('click', 'issues_1260_2', function(e) {
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 18
    });
    var popup_content = "<b>Cet arrêt est trop éloigné du trajet de cette ligne </b></br>"
    popup_content += "Soit le tracé est incomplet, ou erroné, soit l'arrêt ne fait pas partie du trajet de cette ligne"

    popup.style.display = 'block';
    popup.innerHTML = popup_content
    var item_id = e.features[0]['properties']['item'];

    //on récupère l'id de la relation pour faire un lien OSM
    fetch("http://osmose.openstreetmap.fr/fr/api/0.2/error/" + e.features[0].properties.issue_id).then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          for (elem_id in data['elems']) {
            elem = data['elems'][elem_id]
            if (elem['type'] == 'relation') {
              var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
              osm_url += '#map=17/' + e.features[0].geometry.coordinates[1] + '/' + e.features[0].geometry.coordinates[0] + '&layers=T';
              popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
            }
          }

          popup.innerHTML = popup_content
        });
      } else {
        console.log("Fetch failed!", res.status);
      }
    }, function(e) {
      console.log("Fetch failed!", e);
    });
  });
  // issues_1260_1
  map.addLayer({
    "id": "issues_1260_1",
    "type": "symbol",
    "source": {
      'type': 'vector',
      "tiles": ["https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/map/issues/{z}/{x}/{y}.mvt?item=1260&class=1"],
      "attribution": "Osmose",
      "minzoom": 12
    },
    "source-layer": "issues",
    "layout": {
      "icon-image": "{item}"
    }
  });
  map.on('mouseenter', 'issues_1260_1', function(e) {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'issues_1260_1', function() {
    map.getCanvas().style.cursor = '';
  });

  map.on('click', 'issues_1260_1', function(e) {
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 18
    });
    var popup_content = "<b>Le trajet de cette ligne contient des trous </b></br>"
    popup_content += "Le tracé est sûrement incomplet, ou erroné."

    popup.style.display = 'block';
    popup.innerHTML = popup_content
    var item_id = e.features[0]['properties']['item'];

    //on récupère l'id de la relation pour faire un lien d'analyse de relation
    fetch("http://osmose.openstreetmap.fr/fr/api/0.2/error/" + e.features[0].properties.issue_id).then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          for (elem_id in data['elems']) {
            elem = data['elems'][elem_id]
            if (elem['type'] == 'relation') {
              var external_url = 'http://ra.osmsurround.org/analyzeMap?relationId=' + elem['id'];
              popup_content += "<br><a target='blank_' href='" + external_url + "'>Analyser cette relation</a>"
            }
          }

          popup.innerHTML = popup_content
        });
      } else {
        console.log("Fetch failed!", res.status);
      }
    }, function(e) {
      console.log("Fetch failed!", e);
    });
  });

  //issues_1260_3
  map.addLayer({
    "id": "issues_1260_3",
    "type": "symbol",
    "source": {
      'type': 'vector',
      "tiles": ["https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/map/issues/{z}/{x}/{y}.mvt?item=1260&class=3"],
      "attribution": "Osmose",
      "minzoom": 12
    },
    "source-layer": "issues",
    "layout": {
      "icon-image": "{item}"
    }
  });
  map.on('mouseenter', 'issues_1260_3', function(e) {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'issues_1260_3', function() {
    map.getCanvas().style.cursor = '';
  });

  map.on('click', 'issues_1260_3', function(e) {
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 18
    });
    var popup_content = "<b>La relation “route_master” n'est pas conforme </b></br>"
    popup_content += "Il s'agit d'une relation modélisant une ligne de transport, elle ne devrait contenir que des relations de type route.<br>"
    popup_content += "Il faut vérifier les objets membres de cette relation."

    popup.style.display = 'block';
    popup.innerHTML = popup_content
    var item_id = e.features[0]['properties']['item'];

    //on récupère l'id de la relation pour faire un lien OSM
    fetch("http://osmose.openstreetmap.fr/fr/api/0.2/error/" + e.features[0].properties.issue_id).then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          for (elem_id in data['elems']) {
            elem = data['elems'][elem_id]
            if (elem['type'] == 'relation') {
              var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
              popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
            }
          }

          popup.innerHTML = popup_content
        });
      } else {
        console.log("Fetch failed!", res.status);
      }
    }, function(e) {
      console.log("Fetch failed!", e);
    });
  });
  // issues_1260_4
  map.addLayer({
    "id": "issues_1260_4",
    "type": "symbol",
    "source": {
      'type': 'vector',
      "tiles": ["https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/map/issues/{z}/{x}/{y}.mvt?item=1260&class=4"],
      "attribution": "Osmose",
      "minzoom": 12
    },
    "source-layer": "issues",
    "layout": {
      "icon-image": "{item}"
    }
  });
  map.on('mouseenter', 'issues_1260_4', function(e) {
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'issues_1260_4', function() {
    map.getCanvas().style.cursor = '';
  });


  map.on('click', 'issues_1260_4', function(e) {
    map.flyTo({
      center: e.features[0].geometry.coordinates,
      zoom: 18
    });
    var popup_content = "<b>Ce trajet n'est rattaché à aucune ligne !</b></br>"

    popup.style.display = 'block';
    popup.innerHTML = popup_content
    var item_id = e.features[0]['properties']['item'];

    //on récupère les tags de la relation pour chercher une relation route_master potentielle
    var osmose_url = "http://osmose.openstreetmap.fr/fr/api/0.2/error/" + e.features[0].properties.issue_id
    fetch(osmose_url).then(function(res) {
      return res.json();
    }).then(function(data) {
      var network,
        operator,
        ref;
      var rel_id = data['elems'][0]['id']
      for (elem_tag in data['elems'][0]['tags']) {
        var tag = data['elems'][0]['tags'][elem_tag]
        if (tag['k'] == 'network') {
          network = tag['v']
        }
        if (tag['k'] == 'operator') {
          operator = tag['v']
        }
        if (tag['k'] == 'ref') {
          ref = tag['v']
        }
      }
      popup_content += "<span id='overpass_candidates'></span>";
      var osm_url = 'http://osm.org/relation/' + rel_id;
      popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir le trajet orphelin sur OSM</a>";
      popup.innerHTML = popup_content
      if (network && operator && ref) {
        var overpass_url = 'https://overpass-api.de/api/interpreter?data=[out:json];('
        overpass_url += 'relation[type=route_master][~"network|operator"~"' + network + '|' + operator + '",i]["ref"~"^' + ref + '$",i];'
        overpass_url += ');out tags;'

        return fetch(overpass_url).then(function(response) {
          return response.json();
        })
      }
    }).then(function(overpass) {
      if (overpass['elements'] && overpass['elements'].length > 0) {
        popup_content += "<br>S'agit-il de cette ligne ? :"
        popup_content += "<ul>"

        for (elem_ in overpass['elements']) {
          popup_content += "<li> <a href='http://osm.org/relation/" + overpass['elements'][elem_]['id'] + "' target='blank_'> "
          popup_content += overpass['elements'][elem_]['tags']['name'] + "</a>"
        }
        popup_content += "</ul>"
        popup_content += "<br>Sinon, il faut créer la ligne - TODO lien réglisse<br>"

      } else {
        popup_content += "<br>Créer la ligne  associée avec Réglisse (TODO ajouter lien)<br>"

      }
      popup.innerHTML = popup_content

    }).catch(function(error) {
      console.log("Fetch failed!", error);
    });
  });
})
