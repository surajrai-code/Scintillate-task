import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import axios from "axios";

function CharacterDetails({ characterId }) {
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    if (characterId) {
      fetchCharacterDetails();
    }
  }, [characterId]);

  const fetchCharacterDetails = () => {
    axios
      .get(`https://swapi.dev/api/people/${characterId}/`)
      .then((response) => setCharacter(response.data))
      .catch((error) =>
        console.error("Error fetching character details:", error)
      );
  };

  return (
    <>
      <Button mt={4} onClick={() => navigate(`/characters/${characterId}`)}>
        View Details
      </Button>
    </>
  );
}

export default CharacterDetails;
