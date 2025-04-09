import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Heading,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { createWorker } from "tesseract.js";
import { FaUpload, FaClipboard } from "react-icons/fa";
import Layout from "./Layout/Layout";


const Textify = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      setImage(URL.createObjectURL(file));
      extractTextFromImage(file);
    } else {
      toast({
        title: "Invalid Image",
        description: "Please upload a valid JPG, JPEG, or PNG image.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Extract text from the image
  const extractTextFromImage = async (file) => {
    setLoading(true);
    try {
      const worker = await createWorker("eng+nep+hin");
      const ret = await worker.recognize(file);
      console.log(ret.data.text);
      setText(ret.data.text);
      await worker.terminate();
    } catch (error) {
      toast({
        title: "Error Occured",
        status: "error",
        description: error.message || "Unknown error occured tryagain",
        duration: 2,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle copy to clipboard
  const handleCopyText = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Text Copied",
      description: "The extracted text has been copied to clipboard.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  //generate text

  

  return (
    <Layout>
      <Box
        maxW="lg"
        mx="auto"
        p={6}
        bg="gray.50"
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading as="h1" size="lg" textAlign="center" mb={6}>
          Textify - Extract Text from Image
        </Heading>

        <Input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleImageUpload}
          mb={4}
          variant="outline"
          placeholder="Upload your image here"
          _hover={{ borderColor: "blue.500" }}
        />

        {image && (
          <Box mb={6}>
            <img
              src={image}
              alt="Uploaded"
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          </Box>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <Spinner size="xl" color="blue.500" />
          </Box>
        ) : (
          text && (
            <Box mb={6}>
              <Textarea
                value={text}
                isReadOnly
                resize="none"
                size="lg"
                height="200px"
                mb={4}
                placeholder="Extracted text will appear here"
                borderColor="gray.300"
                _hover={{ borderColor: "blue.500" }}
              />
              <Button
                leftIcon={<FaClipboard />}
                colorScheme="blue"
                onClick={handleCopyText}
                w="full"
              >
                Copy Text
              </Button>
              {/* <Button
                colorScheme="blackAlpha"
                onClick={async () => {
                  const data = await generateJson(text);
                  console.log(data);
                }}
                w="full"
                mt={'6px'}
              >
                Add Poem
              </Button> */}
            </Box>
          )
        )}
      </Box>
     
    </Layout>
  );
};

export default Textify;
