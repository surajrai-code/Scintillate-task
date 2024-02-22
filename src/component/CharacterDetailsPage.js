import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Container,
  SimpleGrid,
  Image,
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
    <>
      {character && (
        <Container
          p={4}
          maxW="container.xl"
          border="1px"
          borderColor="red.700"
          borderRadius="md"
          boxShadow={5}
        >
          <Heading color={"white"} size="xl">
            Name: {character.name}
          </Heading>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                columnGap: "1rem",
                rowGap: "1rem",
                alignItems: "center",
                flexDirection: "column",
                width: "400px",
              }}
            >
              <Text color={"white"} fontSize={'1rem'}>Height: {character.height}</Text>
              <Text color={"white"} fontSize={'1rem'}>Mass: {character.mass}</Text>
              <Text color={"white"} fontSize={'1rem'}>Hair Color: {character.hair_color}</Text>
              <Text color={"white"} fontSize={'1rem'}>Skin Color: {character.skin_color}</Text>
              <Text color={"white"} fontSize={'1rem'}>Eye Color: {character.eye_color}</Text>
              <Text color={"white"} fontSize={'1rem'}>DOB: {character.birth_year}</Text>
              <Text color={"white"} fontSize={'1rem'}>Gender: {character.gender}</Text>
            </div>
            <Image
              src={`https://starwars-visualguide.com/assets/img/characters/${
                character.url ? parseInt(character.url.split("/")[5]) + 1 : ""
              }.jpg`}
              alt={character.name}
              w="45%"
              h={380}
              objectFit="fill"
            />
          </div>
          <Heading size="md" mt={4} color={"white"}>
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
                  bg={"white"}
                >
                  <strong style={{ background: "white" }}>Title:</strong>{" "}
                  {film.title}
                  <br />
                  <strong style={{ background: "white" }}>
                    Director:
                  </strong>{" "}
                  {film.director}
                  <br />
                  <strong style={{ background: "white" }}>
                    Release Date:
                  </strong>{" "}
                  {film.release_date}
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Container>
      )}
      <Button mt={4} onClick={() => window.history.back()}>
        Back
      </Button>
    </>
  );
}

export default CharacterDetailsPage;
