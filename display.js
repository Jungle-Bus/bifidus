async function create_default_popup(e) {
    console.log("osmose XX - popup par défaut")
    var issue_id = e.features[0].properties.uuid;
    popup_element.init()

    try {
        var osmose_data = await osmose_client.fetchError(issue_id);

        var popup_content = "<b>" + osmose_data['title']['auto'] + "</b><br/>"
        if (osmose_data['subtitle']) {
            popup_content += osmose_data['subtitle']['auto']
        }
        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
        popup_element.update("Impossible de récupérer le détail de cette erreur :( Réessayez plus tard !")
    }
}

async function create_popup_1260_5(e) {
    console.log("osmose 1260_5 - tag colour/ref/operator/network différent entre route et route_master")
    popup_element.init()
    var popup_content = "<b> Infos de la ligne et du trajet différents </b></br>"
    popup_content += "L'opérateur, le réseau, le numéro de ligne ainsi que la couleur devraient être identiques entre la ligne et ses trajets.<br>"

    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        popup_content += osmose_data['subtitle']
        popup_element.update(popup_content)

        elem_line = osmose_data['elems'][0]
        if (elem_line['type'] == 'relation') {
            tags_line = {}
            for (var i = 0; i < elem_line['tags'].length; i++) {
                tag = elem_line['tags'][i]
                tags_line[tag['k']] = tag['v']
            }
        }
        elem_route = osmose_data['elems'][1]
        if (elem_route['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem_route['tags'].length; i++) {
                tag = elem_route['tags'][i]
                tags[tag['k']] = tag['v']
            }
        }

        popup_content += create_pt_relations_compare_table(tags_line, tags)

        var osm_url = 'https://osm.org/' + elem_line['type'] + '/' + elem_line['id'];
        popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir la ligne sur OSM</a>"
        var osm_url = 'https://osm.org/' + elem_route['type'] + '/' + elem_route['id'];
        popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir le trajet sur OSM</a>"

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher les informations de la ligne (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet du réseau, etc).
        <br>Si la ligne existe bien, corriger les tags de la ligne ou du trajet afin qu'ils soient identiques.
        </p>
        `
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }

};

var create_popup_9014_9014018 = create_popup_2140_21405;
async function create_popup_2140_21405(e) {
    console.log("osmose 2140_21405 ou 9014_9014018 - tag from/to manquant sur une relation pt")
    popup_element.init()
    var popup_content = "<b> Terminus de ligne manquant(s) </b></br>"
    popup_content += "L'origine et/ou la destination n'est pas indiquée pour cette ligne."

    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher les terminus de la ligne (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet du réseau, etc).
        <br>Si la ligne existe bien, ajouter ses terminus dans les tags from et to de la relation.
        </p>
        `
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }

};

var create_popup_9014_9014017 = create_popup_2140_21404;
async function create_popup_2140_21404(e) {
    console.log("osmose 2140_21404 ou 9014_9014017 - tag ref manquant sur une relation pt")
    popup_element.init()
    var popup_content = "<b> Code de ligne manquant </b></br>"
    popup_content += "Le numéro n'est pas indiqué pour cette ligne."

    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher le numéro de la ligne (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet du réseau, etc).
        <br>Si la ligne existe bien, ajouter son numéro dans le tag ref de la relation.
        </p>
        `
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }

};

var create_popup_9014_9014016 = create_popup_2140_21403;
async function create_popup_2140_21403(e) {
    console.log("osmose 2140_21403 ou 9014_9014016 - tag operator manquant sur une relation pt")
    popup_element.init()
    var popup_content = "<b> Opérateur de transport manquant </b></br>"
    popup_content += "Le transporteur n'est pas indiqué pour cette ligne."

    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher le nom du transporteur (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet du réseau, etc).
        <br>Si la ligne existe bien, ajouter le nom du transporteur dans le tag operator de la relation.
        </p>
        `
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

var create_popup_9014_9014015 = create_popup_2140_21402;
async function create_popup_2140_21402(e) {
    console.log("osmose 2140_21402 ou 9014_9014015 - tag network manquant sur une relation pt")
    popup_element.init()
    var popup_content = "<b> Réseau de transport manquant </b></br>"
    popup_content += "Le réseau de transport n'est pas indiqué pour cette ligne."

    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher le nom du réseau (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet de l'opérateur, etc).
        <br>Si la ligne existe bien, ajouter le nom du réseau dans le tag network de la relation.
        </p>
        `
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_9014_9014009(e) {
    console.log("osmose 9014_9014009 - tag route manquant sur une relation pt")
    popup_element.init()
    var popup_content = "<b> Mode de transport manquant </b></br>"
    popup_content += "Le mode de transport n'est pas indiqué pour cette ligne."

    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>S'agit-il d'une ligne de bus ? de train ? de tram ?
        <br>Si la ligne existe bien, ajouter le mode de transport dans le tag route de la relation.
        </p>
        `
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_9014_9014010(e) {
    console.log("osmose 9014_9014010 - tag route_master manquant sur une relation pt")
    popup_element.init()
    var popup_content = "<b> Mode de transport manquant </b></br>"
    popup_content += "Le mode de transport n'est pas indiqué pour cette ligne."

    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += `<br>Il s'agit surement d'un ${tags['route']}.`
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>S'agit-il d'une ligne de bus ? de train ? de tram ?
        <br>Si la ligne existe bien, ajouter le mode de transport dans le tag route de la relation.
        </p>
        `
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_9014_9014013(e) {
    console.log("osmose 9014_9014013 - tag operator invalide");
    popup_element.init()
    var popup_content = "<b> Opérateur de transport invalide </b></br>"
    popup_content += "Ce transporteur n'existe pas."

    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher le nom du transporteur (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet de l'opérateur, etc).
        <br>Puis, corriger le nom du transporteur (tag operator de la relation).
        </p>
        `
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_9014_9014014(e) {
    console.log("osmose 9014_9014014 - tag network invalide");
    popup_element.init()
    var popup_content = "<b> Réseau de transport invalide </b></br>"
    popup_content += "Ce réseau de transport n'existe pas."

    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        popup_element.update(popup_content)

        elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += create_pt_relation_tags_table(tags)
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Rechercher le nom du réseau (sur les informations affichées sur le prospectus papier,
        <br>dans le bus/train/etc, aux arrêts, le site Internet de l'opérateur, etc).
        <br>Puis, corriger le nom du réseau (tag network de la relation).
        </p>
        `
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};


async function create_popup_1260_4(e) {
    var popup_content = "<b>Ce trajet n'est rattaché à aucune ligne !</b></br>"

    popup_element.init()
    var issue_id = e.features[0].properties.uuid;

    try {
        var osmose_data = await osmose_client.fetchError(issue_id);

        var elem = osmose_data['elems'][0]
        if (elem['type'] == 'relation') {
            tags = {}
            for (var i = 0; i < elem['tags'].length; i++) {
                tag = elem['tags'][i]
                tags[tag['k']] = tag['v']
            }
            popup_content += `
            <transport-thumbnail
                data-transport-mode="${tags['route']}"
                data-transport-network="${tags['network']||'??'}"
                data-transport-line-code="${tags['ref'] || '??'}"
                data-transport-destination="${tags['to'] || '??'}"
                data-transport-line-color="${tags['colour'] || 'white'}">
            </transport-thumbnail><br>`
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
        }
        var network = tags['network'];
        var operator = tags['operator'];
        var ref = tags['ref'];

        popup_content += "<span id='overpass_candidates'></span>";
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
                    popup_content += "<li> <a href='https://osm.org/relation/" + overpass_data['elements'][elem_]['id'] + "' target='blank_'> "
                    popup_content += overpass_data['elements'][elem_]['tags']['name'] + "</a>"
                }
                popup_content += "</ul>"
                popup_content += "<br>Sinon, il faut <a href='https://jungle-bus.github.io/transport-relation-creator/' target='blank_'>créer la ligne </a><br>"

            } else {
                popup_content += "<br><a href='https://jungle-bus.github.io/transport-relation-creator/' target='blank_'>Créer la ligne associée </a><br>"

            }
            popup_element.update(popup_content)
        }

        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)


    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_3(e) {
    var popup_content = "<b>La relation “route_master” n'est pas conforme </b></br>"
    popup_content += "Il s'agit d'une relation modélisant une ligne de transport, elle ne devrait contenir que des relations de type route.<br>"
    popup_content += "Il faut vérifier les objets membres de cette relation."

    popup_element.init()
    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);

        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            if (elem['type'] == 'relation') {
                tags = {}
                for (var i = 0; i < elem['tags'].length; i++) {
                    tag = elem['tags'][i]
                    tags[tag['k']] = tag['v']
                }
                popup_content += `
                <br><transport-thumbnail
                    data-transport-mode="${tags['route']}"
                    data-transport-network="${tags['network']||'??'}"
                    data-transport-line-code="${tags['ref'] || '??'}"
                    data-transport-destination="${tags['to'] || '??'}"
                    data-transport-line-color="${tags['colour'] || 'white'}">
                </transport-thumbnail><br>`
                var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
                popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
            }
        }
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_1(e) {
    var popup_content = "<b>Le trajet de cette ligne contient des trous </b></br>"
    popup_content += "Le tracé est sûrement incomplet, ou erroné."

    popup_element.init()
    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);

        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            if (elem['type'] == 'relation') {
                tags = {}
                for (var i = 0; i < elem['tags'].length; i++) {
                    tag = elem['tags'][i]
                    tags[tag['k']] = tag['v']
                }
                popup_content += `
                <br><transport-thumbnail
                    data-transport-mode="${tags['route']}"
                    data-transport-network="${tags['network']||'??'}"
                    data-transport-line-code="${tags['ref'] || '??'}"
                    data-transport-destination="${tags['to'] || '??'}"
                    data-transport-line-color="${tags['colour'] || 'white'}">
                </transport-thumbnail><br>`
                var external_url = 'http://ra.osmsurround.org/analyzeMap?relationId=' + elem['id'];
                popup_content += "<br><a target='blank_' href='" + external_url + "'>Analyser cette relation</a>"
            }
        }
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_2(e) {
    var popup_content = "<b>Cet arrêt est trop éloigné du trajet de cette ligne </b></br>"
    popup_content += "Soit le tracé est incomplet, ou erroné, soit l'arrêt ne fait pas partie du trajet de cette ligne"

    popup_element.init()
    var issue_id = e.features[0].properties.uuid;
    var item_coord = e.features[0]._geometry

    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            if (elem['type'] == 'relation') {
                tags = {}
                for (var i = 0; i < elem['tags'].length; i++) {
                    tag = elem['tags'][i]
                    tags[tag['k']] = tag['v']
                }
                popup_content += `
                <br><transport-thumbnail
                    data-transport-mode="${tags['route']}"
                    data-transport-network="${tags['network']||'??'}"
                    data-transport-line-code="${tags['ref'] || '??'}"
                    data-transport-destination="${tags['to'] || '??'}"
                    data-transport-line-color="${tags['colour'] || 'white'}">
                </transport-thumbnail><br>`
                var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
                osm_url += '#map=17/' + item_coord.coordinates[1] + '/' + item_coord.coordinates[0] + '&layers=T';
                popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
            }
        }
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_7(e) {
    console.log("osmose 1260_7 - The stop_position is not part of a way")
    var popup_content = "<b>L'emplacement où s'arrête le véhicule n'est pas sur une voie</b></br>"
    popup_content += "Cet objet a le tag 'public_transport=stop_position'.</br>"
    popup_content += "Il représente donc l'emplacement où s'arrête les véhicules de cette ligne.</br>"
    popup_content += "Hors, il ne se trouve pas sur un chemin."

    popup_element.init()
    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);

        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Ajouter cet objet comme un noeud du chemin où circule le véhicule.
        <br>Sinon, retirer le tag 'public_transport=stop_position'.
        </p>
        `
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_6(e) {
    console.log("osmose 1260_6 - The bus stop is part of a way, it should have public_transport=stop_position tag")
    var popup_content = "<b>Cet arrêt de bus est placé sur une route</b></br>"

    popup_element.init()
    var issue_id = e.features[0].properties.uuid;
    try {
        var osmose_data = await osmose_client.fetchError(issue_id);

        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
            popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
        }

        popup_content += `<p><b>Comment corriger ?</b>
        <br>Soit il est mal placé et il faut le déplacer à côté de la route.
        <br>soit il lui manque le tag 'public_transport=stop_position'.
        </p>`

        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_8(e) {
    console.log("osmose 1260_8 - The platform is part of a way, it should have the role stop")
    var popup_content = "<b>Cet arrêt est sur une voie, il devrait avoir le rôle 'stop' dans la relation </b></br>"

    popup_element.init()
    var issue_id = e.features[0].properties.uuid;
    var item_coord = e.features[0]._geometry

    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            if (elem['type'] == 'relation') {
                tags = {}
                for (var i = 0; i < elem['tags'].length; i++) {
                    tag = elem['tags'][i]
                    tags[tag['k']] = tag['v']
                }
                popup_content += `
                <br><transport-thumbnail
                    data-transport-mode="${tags['route']}"
                    data-transport-network="${tags['network']||'??'}"
                    data-transport-line-code="${tags['ref'] || '??'}"
                    data-transport-destination="${tags['to'] || '??'}"
                    data-transport-line-color="${tags['colour'] || 'white'}">
                </transport-thumbnail><br>`
                var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
                osm_url += '#map=17/' + item_coord.coordinates[1] + '/' + item_coord.coordinates[0] + '&layers=T';
                popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
            }
        }
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};

async function create_popup_1260_9(e) {
    console.log("osmose 1260_9 - The stop is not part of a way")
    var popup_content = "<b>Cet arrêt a le rôle 'stop' mais n'est pas sur une voie </b></br>"

    popup_element.init()
    var issue_id = e.features[0].properties.uuid;
    var item_coord = e.features[0]._geometry

    try {
        var osmose_data = await osmose_client.fetchError(issue_id);
        for (elem_id in osmose_data['elems']) {
            elem = osmose_data['elems'][elem_id]
            if (elem['type'] == 'relation') {
                tags = {}
                for (var i = 0; i < elem['tags'].length; i++) {
                    tag = elem['tags'][i]
                    tags[tag['k']] = tag['v']
                }
                popup_content += `
                <br><transport-thumbnail
                    data-transport-mode="${tags['route']}"
                    data-transport-network="${tags['network']||'??'}"
                    data-transport-line-code="${tags['ref'] || '??'}"
                    data-transport-destination="${tags['to'] || '??'}"
                    data-transport-line-color="${tags['colour'] || 'white'}">
                </transport-thumbnail><br>`
                var osm_url = 'https://osm.org/' + elem['type'] + '/' + elem['id'];
                osm_url += '#map=17/' + item_coord.coordinates[1] + '/' + item_coord.coordinates[0] + '&layers=T';
                popup_content += "<br><a target='blank_' href='" + osm_url + "'>Voir sur OSM</a>"
            }
        }
        popup_content += add_osmose_generic_action_buttons(issue_id)
        popup_element.update(popup_content)

    } catch (err) {
        console.log("erreur en récupérant les infos d'Osmose : " + err)
    }
};


function display_info(e) {
    map.flyTo({
        center: e.features[0].geometry.coordinates,
    });
    var osmose_name = e.features[0]['properties']['item'] + '_' + e.features[0]['properties']['class'];
    var create_popup = window["create_popup_" + osmose_name];
    if (typeof create_popup === "function") {
        create_popup(e)
    } else {
        create_default_popup(e)
    }
}
