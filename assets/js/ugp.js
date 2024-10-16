
const map = L.map('map').setView([18.38424340655515, -73.60886436406207], 9);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function fillMap(sites) {
    sites.forEach(element => {

        const marker = L.marker([element['properties']['Latitude'], element['properties']['Longitude']])
            .addTo(map)
            .on('click', function () {
                this.openPopup();
            })
            .on('mouseover', function () {
                this.openPopup();
            })
            .bindPopup(getPopupContent(element));
    });
}

function getPopupContent(element) {
    return '<b>'
        + '<div>Nom du site:' + element['properties']['Nom du site'] + '</div>'
        + '<div>Arrondissement:' + element['properties']['Arrondissement'] + '</div>'
        + '<div>Commune:' + element['properties']['Commune'] + '</div>'
        + '<div>Categorie de l\'IS:' + element['properties']["Categorie de l'IS"] + '</div>'
        + '<div>Code du site:' + element['properties']['Code Institution'] + '</div>'
        + '<div> <hr></div>'
        + `<div><a href="./${element['properties']['pdf']}" target="_blank">Screening</a></div>`
        + `<div><a href="${element['properties']['photo']}" target="_blank">Photo</a></div>`
        + `<div><a href="${element['properties']['notaire']}" target="_blank">Acte Notarie</a></div>`
        + `<div><a href="${element['properties']['rapport']}" target="_blank">Rapport</a></div>`
        + `<div><a href="${element['properties']['devis']}" target="_blank">Devis</a></div>`
        + `<div><a href="${element['properties']['dessin']}" target="_blank">Plan d\'Architecture</a></div>`
        + '</b><br />';

};



// + `<div><a href="./${element['properties']['pdf']}" target="_blank">Screening</a></div>`
// + `<div><a href="./${element['properties']['photo']}" target="_blank">Photo</a></div>`
// + `<div><a href="./${element['properties']['notaire']}" target="_blank">Acte Notarie</a></div>`
// + `<div><a href="./${element['properties']['rapport']}" target="_blank">Rapport</a></div>`
// + `<div><a href="./${element['properties']['devis']}" target="_blank">Devis</a></div>`
// + `<div><a href="./${element['properties']['dessin']}" target="_blank">Plan d\'Architecture</a></div>`

fillMap(coords);

// const circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map).bindPopup('I am a circle.');

// const polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map).bindPopup('I am a polygon.');


// const popup = L.popup()
//     .setLatLng([51.513, -0.09])
//     .setContent('I am a standalone popup.')
//     .openOn(map);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng.toString()}`)
        .openOn(map);
}

map.on('click', onMapClick);


//add layer
$("#map").ready(function () {

    L.geoJSON(grandanse).addTo(map);
    L.geoJSON(nippes).addTo(map);
    L.geoJSON(sud).addTo(map);

    // $.ajax({
    //     dataType: "json",
    //     url: "https://gist.githubusercontent.com/wavded/1200773/raw/e122cf709898c09758aecfef349964a8d73a83f3/sample.json",
    //     success: function (data) {
    //         $(data.features).each(function (key, data) {
    //             district_boundary.addData(data);
    //         });
    //     }
    // }).fail(function () { });


})

function clearMarkers() {
    map.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
}

function search() {
    var sr = document.getElementById("search").value;
    var temp = []
    clearMarkers()
    if (sr != null && sr.length > 0) {
        temp = [];
        coords.forEach(e => {
            var crit = (e['properties']['Arrondissement'] + e['properties']['Commune'] + e['properties']["Categorie de l'IS"] + e['properties']['Nom du site'] + "").toLowerCase();
            if (crit.includes(sr.toLowerCase())) {
                temp.push(e)
                //console.log("search data: ", e)
            }
        })
        fillMap(temp)
    } else {
        fillMap(coords)
    }

}

function setPoint() {
    points.forEach(element => {
        var LeafIcon = L.Icon.extend({
            options: {
                iconSize: [38, 60],
                shadowSize: [50, 64],
                //iconAnchor:   [22, 94],
                shadowAnchor: [4, 62],
                popupAnchor: [0, 0]
            }
        });

        var greenIcon = new LeafIcon({ iconUrl: './assets/images/marker.png' });

        const marker = L.marker([element['properties']['Latitude'], element['properties']['Longitude']], { icon: greenIcon })
            .addTo(map)
            .on('click', function () {
                this.openPopup();
            })
            .on('mouseover', function () {
                this.openPopup();
            })
            .bindPopup(getPopupContent(element));
    });

}
