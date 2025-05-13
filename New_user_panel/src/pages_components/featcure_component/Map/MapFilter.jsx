"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Backend_url = process.env.NEXT_PUBLIC_BACKEND_URL;
const placeTypes = ["Heritage", "Fort", "Temple", "Museum"];

const MapFilter = ({ setFilteredPlaces }) => {
  const [places, setPlaces] = useState([]);
  const [selectType, setSelectType] = useState(placeTypes[0]);

  // ✅ Move fetchPlace inside useEffect
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        console.log("Before fetch - typeof setFilteredPlaces:", typeof setFilteredPlaces);

        const res = await axios.get(`${Backend_url}/Get_only_Limited_Place`);
        const data = res.data;
        setPlaces(data);

        console.log("After fetch - typeof setFilteredPlaces:", typeof setFilteredPlaces);

        if (typeof setFilteredPlaces === "function") {
          const filtered = data.filter((place) => place.place_type === placeTypes[0]);
          setFilteredPlaces(filtered);
        } else {
          console.error("setFilteredPlaces is not a function!");
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlace();
  }, [setFilteredPlaces]);

  const handleInputChange = (e) => {
    const selectedType = e.target.value;
    setSelectType(selectedType);
    const filtered = places.filter((place) => place.place_type === selectedType);
    if (typeof setFilteredPlaces === "function") {
      setFilteredPlaces(filtered);
    }
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "white",
        padding: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <FormControl fullWidth margin="normal" sx={{ minWidth: 200 }}>
        <InputLabel>Place Type</InputLabel>
        <Select
          name="place_type"
          value={selectType}
          onChange={handleInputChange}
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
  );
};

export default MapFilter;
