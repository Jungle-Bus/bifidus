var popup_element = (function() {
    var popup_div = document.getElementById('popup') || null;
    if (!popup_div) {
        console.log("La div d'id popup n'existe pas")
    }
    return {
        init: function() {
            popup_div.style.display = 'block';
            popup_div.innerHTML = "<div class='spinner_loader'></div>"
        },
        remove: function() {
            if (popup_div.style.display == 'block') {
                popup_div.style.display = 'none'
            }
        },
        update: function(new_content) {
            popup_div.innerHTML = new_content || ''
        }
    }
}());

var osmose_client = (function() {
    /*
        for now, we only fetch single error and this few lines should do the trick
        in the future, we may switch to https://github.com/osmlab/osmose-request
    */
    const osmose_base_api_url = 'https://osmose.openstreetmap.fr/fr/api/0.2/error/'
    return {
        fetchError: async function(osmose_id) {
            var osmose_url = osmose_base_api_url + osmose_id
            var osmose_response = await fetch(osmose_url);
            var osmose_data = await osmose_response.json();
            return osmose_data
        }
    }
}());

function create_pt_relation_tags_table(tags) {
    if (tags['type'] == 'route') {
        var route_template = `<p>
                <b>${tags['name'] || '?? relation mystère ??'}</b>
                <br>mode : ${tags['route'] || "<i style='color:red;'>tag route non renseigné</i>"}
                <br>numéro de ligne : ${tags['ref'] || "<i style='color:red;'>tag ref non renseigné</i>"}
                <br>réseau de transport : ${tags['network'] || "<i style='color:red;'>tag network non renseigné</i>"}
                <br>transporteur : ${tags['operator'] || "<i style='color:red;'>tag operator non renseigné</i>"}
                <br>origine : ${tags['from'] || "<i style='color:red;'>tag from non renseigné</i>"}
                <br>destination : ${tags['to'] || "<i style='color:red;'>tag to non renseigné</i>"}
                <br><div style="width:20px;height:20px;background:${tags['colour']};"></div>
                </p>
                `
        return route_template
    }

    var route_master_template = `<p>
            <b>${tags['name'] || '?? relation mystère ??'}</b>
            <br>mode : ${tags['route_master'] || "<i style='color:red;'>tag route_master non renseigné</i>"}
            <br>numéro de ligne : ${tags['ref'] || "<i style='color:red;'>tag ref non renseigné</i>"}
            <br>réseau de transport : ${tags['network'] || "<i style='color:red;'>tag network non renseigné</i>"}
            <br>transporteur : ${tags['operator'] || "<i style='color:red;'>tag operator non renseigné</i>"}
            <br><div style="width:20px;height:20px;background:${tags['colour']};"></div>
            </p>
            `
    return route_master_template
}

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

function create_osmose_layer(osmose_issues) {
    var osmose_tiles_url = "https://osmose.openstreetmap.fr/fr/map/issues/{z}/{x}/{y}.mvt?";

    if (osmose_issues == 'all') {
        var osmose_items = '2140,8040,1260,9014';
        var filter = ["all"];
    } else if (osmose_issues == 'line_info') {
        var filter = [
            //manque le 1260_5 qui devrait aussi être dans cette catégorie
            "all", ["in", "item", 9014, 2140],
            ["in", "class", 21402, 21403, 21404, 21405, 9014009, 9014010, 9014013, 9014014]
        ];
        var osmose_items = '2140,9014';
    } else if (osmose_issues == 'stop_info') {
        var filter = [
            "all", ["in", "item", 9014],
            ["in", "class", 9014006, 9014007, 9014008]
        ];
        var osmose_items = '9014';
    } else if (osmose_issues == 'structural') {
        var filter = [
            "all", ["in", "item", 9014, 2140, 1260],
            ["in", "class", 3, 4, 21401, 214011, 214012, 9014002]
        ];
        var osmose_items = '1260,2140,9014';
    } else if (osmose_issues == 'geometry') {
        var filter = [
            "all", ["in", "item", 1260],
            ["in", "class", 1, 2]
        ];
        var osmose_items = '1260';
    } else if (osmose_issues == '8040') {
        var osmose_items = '8040';
        var filter = ["all", ["==", "item", 8040]]
    } else {
        var osmose_name_array = osmose_issues.split("_");
        var item = osmose_name_array[0];
        var class_ = osmose_name_array[1];
        var osmose_items = osmose_name_array[0];
        var filter = [
            "all", ["==", "item", parseInt(item)],
            ["==", "class", parseInt(class_)]
        ]
    }

    osmose_tiles_url += "item=" + osmose_items;

    map.addLayer({
        "id": "issues_osmose",
        "type": "symbol",
        "source": {
            'type': 'vector',
            "tiles": [osmose_tiles_url],
            "attribution": "Osmose"
        },
        "source-layer": "issues",
        "filter": filter,
        "layout": {
            "icon-image": "{item}"
        }
    });
    change_cursor_under_the_mouse("issues_osmose");
}
