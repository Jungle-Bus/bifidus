var popup_element = (function() {
    var popup_div = document.getElementById('popup') || null;
    if (!popup_div) {
        console.log("La div d'id popup n'existe pas")
    }
    return {
        init: function(content) {
            popup_div.style.display = 'block';
            popup_div.innerHTML = content || "<div class='spinner_loader'></div>"
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