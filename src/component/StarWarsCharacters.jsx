import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Heading, Text, Button, Container } from "@chakra-ui/react";
import CharacterDetails from "./CharacterDetails";
import axios from 'axios';

function StarWarsCharacters() {
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [displayFavorites, setDisplayFavorites] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 5;

  useEffect(() => {
    fetchCharacters();
    loadFavorites();
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [displayFavorites]);

  const fetchCharacters = () => {
    const startIndex = (currentPage - 1) * charactersPerPage;
    const apiUrl = displayFavorites
      ? "https://swapi.dev/api/people/"
      : `https://swapi.dev/api/people/?page=${currentPage}`;

    axios.get(apiUrl)
      .then(response => {
        const data = response.data;
        const fetchedCharacters = displayFavorites ? data.results : data.results.slice(startIndex, startIndex + charactersPerPage);
        setCharacters(fetchedCharacters);
      })
      .catch(error => console.error("Error fetching characters:", error));
  };

  const loadFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  };

  const toggleFavorite = (name) => {
    const updatedFavorites = favorites.includes(name)
      ? favorites.filter((favorite) => favorite !== name)
      : [...favorites, name];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleDisplayAll = () => {
    setDisplayFavorites(false);
  };

  const handleDisplayFavorites = () => {
    setDisplayFavorites(true);
  };

  const handleNextPage = () => {
    if (displayFavorites && favorites.length > 5) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (!displayFavorites) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Container maxW='100%' h="100vh" bg='gray.300' p={4}>
      <header style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', paddingLeft: '16px' }}>
        <Button mr={4} onClick={handleDisplayAll}>
          All Data
        </Button>
        <Button onClick={handleDisplayFavorites}>Favorite Data</Button>
      </header>
      <SimpleGrid
        p={4}
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(240px, 1fr))"
      >
        {displayFavorites
          ? characters
            .filter((character) => favorites.includes(character.name))
            .map((character) => (
              <Box
                key={character.name}
                p={4}
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
                <Button onClick={() => toggleFavorite(character.name)}>
                  remove from Favorite
                </Button>
                <CharacterDetails
                  characterId={character.url.split("/").slice(-2, -1)}
                />
              </Box>
            ))
          : characters.map((character) => (
            <Box
              key={character.name}
              p={4}
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
              <Button onClick={() => toggleFavorite(character.name)}>
                Add to Favorite
              </Button>
              <CharacterDetails
                characterId={character.url.split("/").slice(-2, -1)}
              />
            </Box>
          ))}
      </SimpleGrid>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {currentPage > 1 && (
          <Button mr={4} onClick={handlePrevPage}>
            Previous Page
          </Button>
        )}
        {displayFavorites && favorites.length > 5 && (
          <Button onClick={handleNextPage}>Next Page</Button>
        )}
        {!displayFavorites && (
          <Button onClick={handleNextPage}>Next Page</Button>
        )}
      </div>
    </Container>
  );
}

export default StarWarsCharacters;
