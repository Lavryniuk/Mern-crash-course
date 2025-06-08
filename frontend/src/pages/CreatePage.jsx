import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
  });

  const toast = useToast();

  const createProduct = useProductStore((state) => state.createProduct);

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: 0, image: "" });
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={"8"}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={"8"}>
          Create new Product
        </Heading>

        <Box
          w={"full"}
          p={"6"}
          bg={useColorModeValue("white", "gray.800")}
          shadow={"md"}
          rounded={"lg"}
        >
          <VStack spacing={"4"}>
            <Input
              name="name"
              placeholder={"Product Name"}
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              name="price"
              placeholder={"Price"}
              value={newProduct.price}
              type={"number"}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              name="image"
              placeholder={"Image URL"}
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme={"blue"} onClick={handleAddProduct}>
              Create Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
