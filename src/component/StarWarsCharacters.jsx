import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Image,
  Button,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
import Header from "./Header";
import { Link } from "react-router-dom";
const StarWarsCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${page}`
        );
        setCharacters(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [page]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const isFavorite = (character) => {
    return favorites.some((favCharacter) => favCharacter.url === character.url);
  };

  const toggleFavorite = (character) => {
    if (isFavorite(character)) {
      const updatedFavorites = favorites.filter(
        (favCharacter) => favCharacter.url !== character.url
      );
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, character];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  const sliceFavorites = () => {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return favorites.slice(startIndex, endIndex);
  };

  const displayFavorites = sliceFavorites();

  return (
    <>
      <Header setActiveTab={setActiveTab} activeTab={activeTab} />
      <Box p={4}>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          {activeTab === "favorites" &&
            displayFavorites.map((character) => (
              <GridItem
                key={character.url}
                bg="gray.100"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                transition="transform 0.3s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
              >
                <Link to={`/characters/${character.url.split("/")[5]}`}>
                  <Image
                    src={`https://starwars-visualguide.com/assets/img/characters/${
                      character.url
                        ? parseInt(character.url.split("/")[5]) + 1
                        : ""
                    }.jpg`}
                    alt={character.name}
                    w="100%"
                    h={350}
                    objectFit="cover"
                  />
                </Link>
                <Box p={3}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="lg" fontWeight="bold" color={"white"}>
                      {character.name}
                    </Text>
                    <FaHeart
                      size={24}
                      fill={isFavorite(character) ? "red" : "gray"}
                      stroke="white"
                      strokeWidth={10}
                      onClick={() => toggleFavorite(character)}
                      style={{ cursor: "pointer" }}
                    />
                  </Flex>
                </Box>
              </GridItem>
            ))}
          {activeTab === "all" &&
            characters.map((character) => (
              <GridItem
                key={character.url}
                bg="gray.100"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                transition="transform 0.3s ease-in-out"
                _hover={{ transform: "scale(1.05)" }}
              >
                <Link to={`/characters/${character.url.split("/")[5]}`}>
                  <Image
                    src={`https://starwars-visualguide.com/assets/img/characters/${
                      character.url
                        ? parseInt(character.url.split("/")[5]) + 1
                        : ""
                    }.jpg`}
                    alt={character.name}
                    w="100%"
                    h={350}
                    objectFit="cover"
                  />
                </Link>
                <Box p={3}>
                  <Flex justifyContent="space-between" alignItems="center">
                    <Text fontSize="lg" fontWeight="bold" color={"white"}>
                      {character.name}
                    </Text>
                    <FaHeart
                      size={24}
                      fill={isFavorite(character) ? "red" : "gray"}
                      stroke="white"
                      strokeWidth={10}
                      onClick={() => toggleFavorite(character)}
                      style={{ cursor: "pointer" }}
                    />
                  </Flex>
                </Box>
              </GridItem>
            ))}
        </Grid>
      </Box>
      <Flex p={4} justifyContent="space-between" alignItems="center">
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
            Previous
          </Button>
        )}
        <Text fontSize="sm" color={"white"}>
          Page {page}
        </Text>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </Flex>
    </>
  );
};

export default StarWarsCharacters;
