async function create_default_popup(e) {
    var item_id = e.features[0]['properties']['item'];
    popup_element.init()

    try {
        var osmose_url = osmose_base_api_url + e.features[0].properties.issue_id
        var osmose_response = await fetch(osmose_url);
        var osmose_data = await osmose_response.json();

        var popup_content = "<b>" + osmose_data['title'] + "</b><br/>"
        popup_content += osmose_data['subtitle']
        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }


        popup_element.update(popup_content)
    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
        popup_element.update("Impossible de récupérer le détail de cette erreur :( Réessayez plus tard !")
    }
}

async function create_popup_2140_21405(e) {
    console.log("osmose 2140 - 21405 - tag ref manquant sur une relation pt")
    popup_element.init()
    var popup_content = "<b> Terminus de ligne manquant(s) </b></br>"
    popup_content += "L'origine et/ou la destination n'est pas indiquée pour cette ligne."

    var item_id = e.features[0]['properties']['item'];
    try {
        var osmose_url = osmose_base_api_url + e.features[0].properties.issue_id
        var osmose_response = await fetch(osmose_url);
        var osmose_data = await osmose_response.json();
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher les terminus de la ligne (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet du réseau, etc).
        <br>Si la ligne existe bien, ajouter ses terminus dans les tags from et to de la relation.
        </p>
        `
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }

};

async function create_popup_2140_21404(e) {
    console.log("osmose 2140 - 21404 - tag ref manquant sur une relation pt")
    popup_element.init()
    var popup_content = "<b> Code de ligne manquant </b></br>"
    popup_content += "Le numéro n'est pas indiqué pour cette ligne."

    var item_id = e.features[0]['properties']['item'];
    try {
        var osmose_url = osmose_base_api_url + e.features[0].properties.issue_id
        var osmose_response = await fetch(osmose_url);
        var osmose_data = await osmose_response.json();
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher le numéro de la ligne (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet du réseau, etc).
        <br>Si la ligne existe bien, ajouter son numéro dans le tag ref de la relation.
        </p>
        `
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }

};

async function create_popup_2140_21403(e) {
    console.log("osmose 2140 - 214023 - tag operator manquant sur une relation pt")
    popup_element.init()
    var popup_content = "<b> Opérateur de transport manquant </b></br>"
    popup_content += "Le transporteur n'est pas indiqué pour cette ligne."

    var item_id = e.features[0]['properties']['item'];
    try {
        var osmose_url = osmose_base_api_url + e.features[0].properties.issue_id
        var osmose_response = await fetch(osmose_url);
        var osmose_data = await osmose_response.json();
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher le nom du transporteur (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet du réseau, etc).
        <br>Si la ligne existe bien, ajouter le nom du transporteur dans le tag operator de la relation.
        </p>
        `
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_2140_21402(e) {
    console.log("osmose 2140 - 21402 - tag network manquant sur une relation pt")
    popup_element.init()
    var popup_content = "<b> Réseau de transport manquant </b></br>"
    popup_content += "Le réseau de transport n'est pas indiqué pour cette ligne."

    var item_id = e.features[0]['properties']['item'];
    try {
        var osmose_url = osmose_base_api_url + e.features[0].properties.issue_id
        var osmose_response = await fetch(osmose_url);
        var osmose_data = await osmose_response.json();
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher le nom du réseau (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet de l'opérateur, etc).
        <br>Si la ligne existe bien, ajouter le nom du réseau dans le tag network de la relation.
        </p>
        `
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_4(e) {
    var popup_content = "<b>Ce trajet n'est rattaché à aucune ligne !</b></br>"

    popup_element.init()
    var item_id = e.features[0]['properties']['item'];

    try {
        var osmose_url = osmose_base_api_url + e.features[0].properties.issue_id
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
        popup_element.update(popup_content)

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
            popup_element.update(popup_content)
        }


    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_3(e) {
    var popup_content = "<b>La relation “route_master” n'est pas conforme </b></br>"
    popup_content += "Il s'agit d'une relation modélisant une ligne de transport, elle ne devrait contenir que des relations de type route.<br>"
    popup_content += "Il faut vérifier les objets membres de cette relation."

    popup_element.init()
    var item_id = e.features[0]['properties']['item'];
    try {
        var osmose_url = osmose_base_api_url + e.features[0].properties.issue_id
        var osmose_response = await fetch(osmose_url);
        var osmose_data = await osmose_response.json();

        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            if (elem['type'] == 'relation') {
                var osm_url = 'http://osm.org/' + elem['type'] + '/' + elem['id'];
                popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
            }
        }
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_1(e) {
    var popup_content = "<b>Le trajet de cette ligne contient des trous </b></br>"
    popup_content += "Le tracé est sûrement incomplet, ou erroné."

    popup_element.init()
    var item_id = e.features[0]['properties']['item'];
    try {
        var osmose_url = osmose_base_api_url + e.features[0].properties.issue_id
        var osmose_response = await fetch(osmose_url);
        var osmose_data = await osmose_response.json();

        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            if (elem['type'] == 'relation') {
                var external_url = 'http://ra.osmsurround.org/analyzeMap?relationId=' + elem['id'];
                popup_content += "<br><a target='blank_' href='" + external_url + "'>Analyser cette relation</a>"
            }
        }
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_2(e) {
    var popup_content = "<b>Cet arrêt est trop éloigné du trajet de cette ligne </b></br>"
    popup_content += "Soit le tracé est incomplet, ou erroné, soit l'arrêt ne fait pas partie du trajet de cette ligne"

    popup_element.init()
    var item_id = e.features[0]['properties']['item'];

    try {
        var osmose_url = osmose_base_api_url + e.features[0].properties.issue_id
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
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

function display_info(e) {
    map.flyTo({
        center: e.features[0].geometry.coordinates,
        zoom: 18
    });
    var osmose_name = e.features[0]['properties']['item'] + '_' + e.features[0]['properties']['class'];
    var create_popup = window["create_popup_" + osmose_name];
    if (typeof create_popup === "function") {
        create_popup(e)
    } else {
        create_default_popup(e)
    }
}
