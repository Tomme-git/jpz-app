import React from 'react'
import { useLoadScript } from '@react-google-maps/api';
import Map from '../components/Map';

function Location() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  return isLoaded ? (
    <Map />
  ) : (
    <div className="loading"></div>
  )
};

export default Location;