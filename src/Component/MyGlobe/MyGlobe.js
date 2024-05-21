import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { INDIA_DATA } from "./Data/countriesData";
// import HEX_DATA from "./Data/countriesHexData.json";
import Globe from "react-globe.gl";
import * as THREE from "//unpkg.com/three/build/three.module.js";
import cloudUrl from "./clouds.png";
// const getRandomCountry = () => {
//   return COUNTRIES_DATA[Math.floor(Math.random() * COUNTRIES_DATA.length)];
// };

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
    const globe = globeEl.current;

    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;

    // Add clouds sphere
    const CLOUDS_IMG_URL = "./clouds.png"; // from https://github.com/turban/webgl-earth
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame

    new THREE.TextureLoader().load(cloudUrl, (cloudsTexture) => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(globe.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      globe.scene().add(clouds);

      (function rotateClouds() {
        clouds.rotation.y += (CLOUDS_ROTATION_SPEED * Math.PI) / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
  }, []);

  // useEffect(() => {
  //   setHex(HEX_DATA);
  // }, []);

  // useEffect(() => {
  //   let interval;

  //   interval = setInterval(() => {
  //     (async () => {
  //       const country = INDIA_DATA[0];
  //       setSelectedCountry({
  //         lat: country.latitude,
  //         lng: country.longitude,
  //         label: country.name,
  //       });
  //     })();
  //   }, 3000); //Every 3 seconds
  //   return () => {
  //     if (interval) {
  //       clearInterval(interval);
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   // globeEl.current.controls().autoRotate = true;
  //   // globeEl.current.controls().autoRotateSpeed = 0.2;

  //   const MAP_CENTER = { lat: 0, lng: 0, altitude: 1.5 };
  //   globeEl.current.pointOfView(MAP_CENTER, 0);
  // }, [globeEl]);

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
      // ref={globeEl}
      // backgroundColor="rgba(150,0,0,0)"
      // labelsData={[selectedCountry]}
      // labelText={"label"}
      // labelSize={1.6}
      // labelColor={() => "rgba(255, 165, 0, 0.75)"}
      // labelDotRadius={0.4}
      // labelAltitude={0.05}
      // hexPolygonsData={hex.features}
      // hexPolygonResolution={3} //values higher than 3 makes it buggy
      // hexPolygonMargin={0.62}
      // hexPolygonColor={useCallback(() => "#1b66b1", [])}
      // globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      // bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"

      ref={globeEl}
      animateIn={false}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
    />
  );
}
