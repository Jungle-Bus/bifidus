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

var osmose_issues_to_display = get_issues_to_display_from_url()
var osmose_base_api_url = 'https://cors.5apps.com/?uri=http://osmose.openstreetmap.fr/fr/api/0.2/error/'

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

    map.on('click', popup_element.remove);

    if ( ['1260_1', 'all'].includes(osmose_issues_to_display)) {
        create_layer('1260_1');
        map.on('click', "issues_1260_1", display_info_1260_1);
    }

    if ( ['1260_2', 'all'].includes(osmose_issues_to_display)) {
        create_layer('1260_2');
        map.on('click', "issues_1260_2", display_info_1260_2);
    }

    if ( ['1260_3', 'all'].includes(osmose_issues_to_display)) {
        create_layer('1260_3');
        map.on('click', "issues_1260_3", display_info_1260_3);
    }

    if ( ['1260_4', 'all'].includes(osmose_issues_to_display)) {
        create_layer('1260_4');
        map.on('click', "issues_1260_4", display_info_1260_4);
    }

    if ( ['2140_21402', 'all', 'line_info'].includes(osmose_issues_to_display)) {
        create_layer('2140_21402');
        map.on('click', "issues_2140_21402", display_info_2140_21402);
    }

    if ( ['2140_21403', 'all', 'line_info'].includes(osmose_issues_to_display)) {
        create_layer('2140_21403');
        map.on('click', "issues_2140_21403", display_info_2140_21403);
    }

    if ( ['2140_21404', 'all', 'line_info'].includes(osmose_issues_to_display)) {
        create_layer('2140_21404');
        map.on('click', "issues_2140_21404", display_info_2140_21404);
    }

    if ( ['2140_21405', 'all', 'line_info'].includes(osmose_issues_to_display)) {
        create_layer('2140_21405');
        map.on('click', "issues_2140_21405", display_info_2140_21405);
    }

    //other
    if (osmose_issues_to_display === '2140_21401' || osmose_issues_to_display === 'all') {
        create_layer('2140_21401');
        map.on('click', "issues_2140_21401", display_default_osmose_info);
    }
    if (osmose_issues_to_display === '2140_21411' || osmose_issues_to_display === 'all') {
        create_layer('2140_21411');
        map.on('click', "issues_2140_21411", display_default_osmose_info);
    }
    if (osmose_issues_to_display === '2140_21412' || osmose_issues_to_display === 'all') {
        create_layer('2140_21412');
        map.on('click', "issues_2140_21412", display_default_osmose_info);
    }
    if (osmose_issues_to_display === '8040' || osmose_issues_to_display === 'all') {
        create_layer('8040');
        map.on('click', "issues_8040", display_default_osmose_info);
    }


})

function get_issues_to_display_from_url() {
    var osmose_issues = ['1260_1', '1260_2', '1260_3', '1260_4', '8040', '2140_21402', '2140_21403',
        '2140_21404', '2140_21405', '2140_21401', '2140_21411', '2140_21412',
        'line_info'
    ]
    osmose_issues_to_display = get_parameter_from_url("issues")
    if (!osmose_issues.includes(osmose_issues_to_display)) {
        var osmose_issues_to_display = "all"
        console.log("Le numéro Osmose passé dans l'URL n'est pas valide, on affiche tout")
    }
    return osmose_issues_to_display
}
