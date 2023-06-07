import React, { useState } from 'react'
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import SearchIcon from '../images/search.svg';

function Map() {

  const [markers, setMarkers] = useState(false);
  const [userLocation, setUserLocation] = useState({
    lat: 56.09641401430544, lng: 8.80776375593962 // Zoo location = default
  })

  navigator.geolocation.watchPosition(position => { // watch for user location
    return setUserLocation({
      lat: position.coords.latitude,
      lng: position.coords.longitude
    })
  })

  function updateMarkers() {
    // To be replaced with armband data
    setMarkers([
      { lat: 56.09601701450544, lng: 8.80876375693962 },
      { lat: 56.09591401730544, lng: 8.80756375593262 },
      { lat: 56.09691404430544, lng: 8.80756275593962 }
    ])
    console.log(markers);
  }

  return (
    <GoogleMap
      zoom={16.8}
      center={{
        lat: 56.09641401430544, lng: 8.80776375593962
      }}
      mapContainerClassName='map-container'
      options={{
        gestureHandling: 'none',
        disableDefaultUI: true
      }}
    >
      <div className="map-overlay" onClick={() => updateMarkers()}>
        <img src={SearchIcon} height={25} alt="Kort ikon" /><p>Find armbånd</p>
      </div>
      <MarkerF position={userLocation} />
      {markers ?
        <>
          <MarkerF
            icon={{
              path:
                "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
              fillColor: "yellow",
              fillOpacity: 0.9,
              scale: 2,
              strokeColor: "gold",
              strokeWeight: 2,
            }}
            position={markers ? markers[0] : {}}
          />
          <MarkerF
            icon={{
              path:
                "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
              fillColor: "yellow",
              fillOpacity: 0.9,
              scale: 2,
              strokeColor: "gold",
              strokeWeight: 2,
            }}
            position={markers ? markers[1] : {}}
          />
          <MarkerF
            icon={{
              path:
                "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
              fillColor: "yellow",
              fillOpacity: 0.9,
              scale: 2,
              strokeColor: "gold",
              strokeWeight: 2,
            }}
            position={markers ? markers[2] : {}}
          />
        </>
        : false}
    </GoogleMap>
  )
}

export default Map;