import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { COUNTRIES_DATA, INDIA_DATA } from "./Data/countriesData";
import HEX_DATA from "./Data/countriesHexData.json";
import Globe from "react-globe.gl";

const getRandomCountry = () => {
  return COUNTRIES_DATA[Math.floor(Math.random() * COUNTRIES_DATA.length)];
};

export default function CustomGlobe() {
  const globeEl = useRef();
  const country = INDIA_DATA[0];
  const [selectedCountry, setSelectedCountry] = useState({
    lat: country.latitude,
    lng: country.longitude,
    label: country.name,
  });
  const [hex, setHex] = useState({ features: [] });

  useEffect(() => {
    setHex(HEX_DATA);
  }, []);

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      (async () => {
        const country = INDIA_DATA[0];
        setSelectedCountry({
          lat: country.latitude,
          lng: country.longitude,
          label: country.name,
        });
      })();
    }, 3000); //Every 3 seconds
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  useEffect(() => {
    // globeEl.current.controls().autoRotate = true;
    // globeEl.current.controls().autoRotateSpeed = 0.2;

    const MAP_CENTER = { lat: 0, lng: 0, altitude: 1.5 };
    globeEl.current.pointOfView(MAP_CENTER, 0);
  }, [globeEl]);

  useEffect(() => {
    const countryLocation = {
      lat: selectedCountry.lat,
      lng: selectedCountry.lng,
      altitude: 1.5,
    };

    globeEl.current.pointOfView(countryLocation, 0);
  }, [selectedCountry]);

  return (
    <Globe
      ref={globeEl}
      backgroundColor="rgba(150,0,0,0)"
      labelsData={[selectedCountry]}
      labelText={"label"}
      labelSize={1.6}
      labelColor={() => "rgba(255, 165, 0, 0.75)"}
      labelDotRadius={0.4}
      labelAltitude={0.05}
      hexPolygonsData={hex.features}
      hexPolygonResolution={3} //values higher than 3 makes it buggy
      hexPolygonMargin={0.62}
      hexPolygonColor={useCallback(() => "#1b66b1", [])}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
    />
  );
}
