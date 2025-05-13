"use client";

import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

// Fix Leaflet marker icons
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Base map sources
const baseMaps = {
  OpenStreetMap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  Satellite:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
};

const placeTypes = ["Heritage", "Fort", "Temple", "Museum"];
const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;

const Map = () => {
  const [selectedBaseMap, setSelectedBaseMap] = useState("OpenStreetMap");
  const [selectType, setSelectType] = useState(placeTypes[0]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(`${Backend_url}/Get_only_Limited_Place`);
        const data = res.data;
        setAllPlaces(data);
        // Default filter
        setFilteredPlaces(data.filter((place) => place.place_type === selectType));
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const handleBaseMapChange = (event) => {
    setSelectedBaseMap(event.target.value);
  };

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setSelectType(type);
    const filtered = allPlaces.filter((place) => place.place_type === type);
    setFilteredPlaces(filtered);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
      {/* Sidebar Filter */}
      <div
        style={{
          width: "300px",
          backgroundColor: "#f8f9fa",
          boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          overflowY: "auto",
        }}
      >
        <FormControl fullWidth margin="normal">
          <InputLabel>Place Type</InputLabel>
          <Select
            name="place_type"
            value={selectType}
            onChange={handleTypeChange}
            label="Place Type"
          >
            {placeTypes.map((type, index) => (
              <MenuItem key={index} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Map Section */}
      <div style={{ flex: 1, position: "relative" }}>
        <MapContainer
          center={[22.308155, 70.800705]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url={baseMaps[selectedBaseMap]}
          />

          {filteredPlaces.map((place, index) => (
            <Marker
              key={index}
              position={place.location.split(",").map(Number)}
            >
              <Popup>
                <strong>{place.place_name.slice(0, 16)}</strong>
                <br />
                {place.description
                  .slice(0, 80)
                  .match(/.{1,25}/g)
                  .map((chunk, idx) => (
                    <React.Fragment key={idx}>
                      {chunk}
                      <br />
                    </React.Fragment>
                  ))}
                <br />
                <a
                  href={place.google_map_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on Google Maps
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Base Map Selector */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 1000,
            background: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <label>Base Map:</label>
          <select
            value={selectedBaseMap}
            onChange={handleBaseMapChange}
            style={{
              marginLeft: "10px",
              padding: "5px",
              borderRadius: "3px",
              border: "1px solid #ccc",
            }}
          >
            {Object.keys(baseMaps).map((mapName) => (
              <option key={mapName} value={mapName}>
                {mapName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Map;
