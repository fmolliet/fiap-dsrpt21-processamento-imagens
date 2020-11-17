window.onload = () => {
    getLocation()
    console.log('carregou')
};


function getLocation() {
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(findDynamicPlace);
    } else {
        var erro = "É necessário autorizar a localização"
        alert(erro)
      throw new Error(erro);
    }
}

function findDynamicPlace(position) {
    
    // Futura implementação chamada na API via AJAX com autenticação
    renderPlaces([
        {
            name: 'Pessoa',
            location: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            }
        },
    ]);
}

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
        model.setAttribute('gltf-model', './assets/person/person.gltf');
        
        //model.setAttribute('rotation', '0 180 0');
        model.setAttribute('animation-mixer', '');
        model.setAttribute('scale', '0.5 0.5 0.5');

        model.addEventListener('loaded', () => {
            window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
        });

        scene.appendChild(model);
        
    });
}