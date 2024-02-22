import React from "react";
import { Flex, Image, Button } from "@chakra-ui/react";

const Header = ({ setActiveTab, activeTab = "all" }) => {
  return (
    <Flex p={4} justifyContent="space-between" alignItems="center">
      <Image src="Images/logo.png" alt="Star Wars Logo" w={24} h={24} />
      <Flex alignItems="center">
        <Button
          colorScheme="gray"
          bg={activeTab === "all" ? "red" : "gray"}
          variant="outline"
          color="white"
          onClick={() => setActiveTab("all")}
        >
          All Characters
        </Button>
        <Button
          colorScheme="gray"
          bg={activeTab === "favorites" ? "red" : "gray"}
          variant="outline"
          ml={4}
          color="white"
          onClick={() => setActiveTab("favorites")}
        >
          Favorites
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
