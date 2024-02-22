import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";

function CharacterDetailsPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios
      .get(`https://swapi.dev/api/people/${id}/`)
      .then((response) => {
        setCharacter(response.data);
        fetchFilms(response.data.films);
      })
      .catch((error) =>
        console.error("Error fetching character details:", error)
      );
  }, [id]);

  const fetchFilms = (filmUrls) => {
    Promise.all(filmUrls.map((url) => axios.get(url)))
      .then((filmsData) => {
        const filmsDetails = filmsData.map((film) => film.data);
        setFilms(filmsDetails);
      })
      .catch((error) => console.error("Error fetching films:", error));
  };

  return (
    <Container maxW="100%" h="100vh" p={4} bg="gray.300" centerContent>
      {character && (
        <Container
          p={4}
          maxW="2xl"
          border="1px"
          borderColor="gray.700"
          borderRadius="md"
          boxShadow={5}
        >
          <Heading size="md">{character.name}</Heading>
          <Text mt={2}>Height: {character.height}</Text>
          <Text>Mass: {character.mass}</Text>
          <Text>Hair Color: {character.hair_color}</Text>
          <Text>Skin Color: {character.skin_color}</Text>
          <Text>Eye Color: {character.eye_color}</Text>
          <Heading size="md" mt={4}>
            Films
          </Heading>
          <Box>
            <SimpleGrid
              p={4}
              spacing={4}
              templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
            >
              {films.map((film, index) => (
                <Box
                  key={index}
                  p={4}
                  border="1px"
                  borderColor="gray.700"
                  borderRadius="md"
                  boxShadow={5}
                >
                  <strong>Title:</strong> {film.title}
                  <br />
                  <strong>Director:</strong> {film.director}
                  <br />
                  <strong>Release Date:</strong> {film.release_date}
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      )}
      <Button mt={4} onClick={() => window.history.back()}>
        Back
      </Button>
    </Container>
  );
}

export default CharacterDetailsPage;
