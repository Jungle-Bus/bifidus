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

osmose_issues_to_display = get_issues_to_display_from_url()

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

    // issues_1260_2
    if (osmose_issues_to_display === '1260_2' || osmose_issues_to_display === 'all') {
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

        change_cursor_under_the_mouse("issues_1260_2");

        map.on('click', 'issues_1260_2', display_info_1260_2);

        async function display_info_1260_2(e) {
            map.flyTo({
                center: e.features[0].geometry.coordinates,
                zoom: 18
            });
            var popup_content = "<b>Cet arrêt est trop éloigné du trajet de cette ligne </b></br>"
            popup_content += "Soit le tracé est incomplet, ou erroné, soit l'arrêt ne fait pas partie du trajet de cette ligne"

            popup.style.display = 'block';
            popup.innerHTML = popup_content
            var item_id = e.features[0]['properties']['item'];

            try {
                var osmose_url = "https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/api/0.2/error/" + e.features[0].properties.issue_id
                var osmose_response = await fetch(osmose_url);
                var osmose_data = await osmose_response.json();

                for (elem_id in osmose_data['elems']) {
                    elem = osmose_data['elems'][elem_id]
                    if (elem['type'] == 'relation') {
                        var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
                        osm_url += '#map=17/' + e.features[0].geometry.coordinates[1] + '/' + e.features[0].geometry.coordinates[0] + '&layers=T';
                        popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
                    }
                }
                popup.innerHTML = popup_content

            } catch (err) {
                console.log("erreur en récupérant les infos d'Osmose : " + err)
            }
        };

    }

    // issues_1260_1
    if (osmose_issues_to_display === '1260_1' || osmose_issues_to_display === 'all') {
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

        change_cursor_under_the_mouse("issues_1260_1");

        map.on('click', 'issues_1260_1', display_info_1260_1)
        async function display_info_1260_1(e) {
            map.flyTo({
                center: e.features[0].geometry.coordinates,
                zoom: 18
            });
            var popup_content = "<b>Le trajet de cette ligne contient des trous </b></br>"
            popup_content += "Le tracé est sûrement incomplet, ou erroné."

            popup.style.display = 'block';
            popup.innerHTML = popup_content
            var item_id = e.features[0]['properties']['item'];
            try {
                var osmose_url = "https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/api/0.2/error/" + e.features[0].properties.issue_id
                var osmose_response = await fetch(osmose_url);
                var osmose_data = await osmose_response.json();

                for (elem_id in osmose_data['elems']) {
                    elem = osmose_data['elems'][elem_id]
                    if (elem['type'] == 'relation') {
                        var external_url = 'http://ra.osmsurround.org/analyzeMap?relationId=' + elem['id'];
                        popup_content += "<br><a target='blank_' href='" + external_url + "'>Analyser cette relation</a>"
                    }
                }
                popup.innerHTML = popup_content

            } catch (err) {
                console.log("erreur en récupérant les infos d'Osmose : " + err)
            }
        };

    }

    // issues_1260_3
    if (osmose_issues_to_display === '1260_3' || osmose_issues_to_display === 'all') {
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

        change_cursor_under_the_mouse("issues_1260_3");

        map.on('click', 'issues_1260_3', display_info_1260_3)
        async function display_info_1260_3(e) {
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
            try {
                var osmose_url = "https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/api/0.2/error/" + e.features[0].properties.issue_id
                var osmose_response = await fetch(osmose_url);
                var osmose_data = await osmose_response.json();

                for (elem_id in osmose_data['elems']) {
                    elem = osmose_data['elems'][elem_id]
                    if (elem['type'] == 'relation') {
                        var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
                        popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
                    }
                }
                popup.innerHTML = popup_content

            } catch (err) {
                console.log("erreur en récupérant les infos d'Osmose : " + err)
            }

        };

    }

    // issues_1260_4
    if (osmose_issues_to_display === '1260_4' || osmose_issues_to_display === 'all') {
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

        change_cursor_under_the_mouse("issues_1260_4");

        map.on('click', 'issues_1260_4', display_info_1260_4)
        async function display_info_1260_4(e) {
            map.flyTo({
                center: e.features[0].geometry.coordinates,
                zoom: 18
            });
            var popup_content = "<b>Ce trajet n'est rattaché à aucune ligne !</b></br>"

            popup.style.display = 'block';
            popup.innerHTML = popup_content
            var item_id = e.features[0]['properties']['item'];

            try {
                var osmose_url = "https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/api/0.2/error/" + e.features[0].properties.issue_id
                var osmose_response = await fetch(osmose_url);
                var osmose_data = await osmose_response.json();


                var network,
                    operator,
                    ref;
                var rel_id = osmose_data['elems'][0]['id']
                for (elem_tag in osmose_data['elems'][0]['tags']) {
                    var tag = osmose_data['elems'][0]['tags'][elem_tag]
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

                    var overpass_response = await fetch(overpass_url);
                    var overpass_data = await overpass_response.json();

                    if (overpass_data['elements'] && overpass_data['elements'].length > 0) {
                        popup_content += "<br>S'agit-il de cette ligne ? :"
                        popup_content += "<ul>"

                        for (elem_ in overpass_data['elements']) {
                            popup_content += "<li> <a href='http://osm.org/relation/" + overpass_data['elements'][elem_]['id'] + "' target='blank_'> "
                            popup_content += overpass_data['elements'][elem_]['tags']['name'] + "</a>"
                        }
                        popup_content += "</ul>"
                        popup_content += "<br>Sinon, il faut créer la ligne - TODO lien réglisse<br>"

                    } else {
                        popup_content += "<br>Créer la ligne  associée avec Réglisse (TODO ajouter lien)<br>"

                    }
                    popup.innerHTML = popup_content
                }


            } catch (err) {
                console.log("erreur en récupérant les infos d'Osmose : " + err)
            }
        };

    }


    //other
    if (osmose_issues_to_display === '2140' || osmose_issues_to_display === 'all') {
        generic_osmose('2140', '2140')
    }
    if (osmose_issues_to_display === '8040' || osmose_issues_to_display === 'all') {
        generic_osmose('8040', '8040')
    }

    function generic_osmose(osmose_name, osmose_item, osmose_class) {
        var osmose_tiles_url = "https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/map/issues/{z}/{x}/{y}.mvt?"
        osmose_tiles_url += "item=" + osmose_item
        if (osmose_class) {
            osmose_tiles_url += "&class=" + osmose_class
        }
        map.addLayer({
            "id": "issues_" + osmose_name,
            "type": "symbol",
            "source": {
                'type': 'vector',
                "tiles": [osmose_tiles_url],
                "attribution": "Osmose",
                "minzoom": 12
            },
            "source-layer": "issues",
            "layout": {
                "icon-image": "{item}"
            }
        });

        change_cursor_under_the_mouse("issues_" + osmose_name);

        map.on('click', "issues_" + osmose_name, display_generic);

        async function display_generic(e) {
            map.flyTo({
                center: e.features[0].geometry.coordinates,
                zoom: 18
            });

            var item_id = e.features[0]['properties']['item'];
            popup.style.display = 'block';
            popup.innerHTML = "<div class='spinner_loader'></div>"


            try {
                var osmose_url = "https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/api/0.2/error/" + e.features[0].properties.issue_id
                var osmose_response = await fetch(osmose_url);
                var osmose_data = await osmose_response.json();

                var popup_content = "<b>" + osmose_data['title'] + "</b><br/>"
                popup_content += osmose_data['subtitle']
                for (elem_id in osmose_data['elems']) {
                    elem = osmose_data['elems'][elem_id]
                    var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
                    popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
                }


                popup.innerHTML = popup_content
            } catch (err) {
                console.log("erreur en récupérant les infos d'Osmose : " + err)
                popup.innerHTML = "Impossible de récupérer le détail de cette erreur :( Réessayez plus tard !"
            }
        }

    }

})

function get_issues_to_display_from_url() {
    var osmose_issues = ['1260_1', '1260_2', '1260_3', '1260_4', '2140', '8040']
    osmose_issues_to_display = get_parameter_from_url("issues")
    if (!osmose_issues.includes(osmose_issues_to_display)) {
        var osmose_issues_to_display = "all"
        console.log("Le numéro Osmose passé dans l'URL n'est pas valide, on affiche tout")
    }
    return osmose_issues_to_display
}

/* utils */
function change_cursor_under_the_mouse(layer_name) {
    map.on('mouseenter', layer_name, function(e) {
        map.getCanvas().style.cursor = 'pointer';
    });

    map.on('mouseleave', layer_name, function() {
        map.getCanvas().style.cursor = '';
    });
}

function get_parameter_from_url(param_name) {
    param_name = param_name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + param_name + "=([^&#]*)"),
        results = regex.exec(location.href);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
