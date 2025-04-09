import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import Layout from "./Layout/Layout";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const AddPoem = () => {
  // State to hold title and stanzas
  const [title, setTitle] = useState("");
  const [stanzas, setStanzas] = useState([""]);
  const [currentStanzaIndex, setCurrentStanzaIndex] = useState(0);
  const toast = useToast();

  // Handle changes to the title
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const navigate = useNavigate()

  // Handle changes to a stanza
  const handleStanzaChange = (text, index) => {
    const updatedStanzas = [...stanzas];
    updatedStanzas[index] = text;
    setStanzas(updatedStanzas);
  };

  // Add a new stanza
  const addStanza = () => {
    if (stanzas[stanzas.length - 1] == "") {
      return;
    }
    setStanzas([...stanzas, ""]);
    setCurrentStanzaIndex(stanzas.length); // Move to the newly added stanza
  };

  // Remove a stanza
  const removeStanza = (index) => {
    if (stanzas.length > 1) {
      const updatedStanzas = stanzas.filter((_, idx) => idx !== index);
      setStanzas(updatedStanzas);
      setCurrentStanzaIndex(Math.max(0, currentStanzaIndex - 1)); // Ensure valid index
    }
  };

  // Handle key press for changing stanzas
  const handleKeyPress = (e) => {
    if (e.shiftKey) {
      if (e.key === "ArrowDown") {
        // Move to the next stanza
        if (currentStanzaIndex < stanzas.length - 1) {
          setCurrentStanzaIndex(currentStanzaIndex + 1);
        }
      } else if (e.key === "ArrowUp") {
        // Move to the previous stanza
        if (currentStanzaIndex > 0) {
          setCurrentStanzaIndex(currentStanzaIndex - 1);
        }
      }
    }
  };

  // Automatically add event listeners for keydown
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentStanzaIndex, stanzas]);

  // Handle Poem Save or Submit
  const handleSavePoem = () => {
    if (title && stanzas.every((stanza) => stanza.trim() !== "")) {
     api.post('/poem/add',{title,stanzas})
     .then(()=>{
      toast({
        title: "Poem Saved!",
        description: `Poem titled "${title}" has been saved successfully.`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/admin')
     }).catch((err)=>{
      toast({
        title: "Poem Saved Failed!",
        description: err.response.data.message ||`Poem titled "${title}" has been saved successfully.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
     })
    } else {
      toast({
        title: "Error",
        description: "Please fill in the title and all stanzas.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  //text by audio

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  const [MikeOn, setMikeOn] = useState(false);
  const [Active, setActive] = useState("");

  const handleMike = () => {
    console.log(Active);
    if (!Active && !MikeOn) {
      toast({
        status: "error",
        duration: 2000,
        description: "Please Select Where to Write",
      });
      return;
    }
    if (MikeOn) {
      setMikeOn(false);
      SpeechRecognition.stopListening();
      resetTranscript();
    } else {
      setMikeOn(true);
      SpeechRecognition.startListening({ continuous: true, language: "ne-NP" });
    }
  };
  return (
    <Layout>
      <Box className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
        <Heading as="h1" size="md" textAlign="center" mb={6}>
          Add a Poem
        </Heading>

        {/* Title Input */}
        <div className="mb-4">
          <Input
            onFocus={() => {
              setActive("title");
            }}
            id="title"
            type="text"
            placeholder="Enter poem title"
            value={title}
            onChange={handleTitleChange}
            className="border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Stanzas */}
        <div className="mb-6">
          {stanzas.map((stanza, index) => (
            <Box
              key={index}
              className={`mb-4 p-4 border ${
                currentStanzaIndex === index
                  ? "border-blue-500"
                  : "border-gray-300"
              } rounded-md`}
            >
              <Textarea
                onClick={() => {
                  setActive(index + 1);
                }}
                placeholder={`Stanza ${index + 1}`}
                value={stanza}
                onChange={(e) => handleStanzaChange(e.target.value, index)}
                className="resize-none border-none p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button
                onClick={() => removeStanza(index)}
                leftIcon={<FaTrashAlt />}
                colorScheme="red"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
              >
                Remove
              </Button>
            </Box>
          ))}
          <Button
            onClick={addStanza}
            colorScheme="blue"
            leftIcon={<FaPlus />}
            className="mt-2 w-full"
          >
            Add Stanza
          </Button>
        </div>

        {/* Save Button */}
        <Button
          my={"3px"}
          color="white"
          bg="gray.500"
          onClick={handleMike}
          className="w-full py-3 mt-4"
          _hover={{ bg: "gray.700" }}
        >
          {MikeOn ? "Stop Audiofy" : "Start Audiofy"}
        </Button>
        <Button
          color="white"
          bg="black"
          onClick={handleSavePoem}
          className="w-full py-3 mt-4"
          _hover={{ bg: "gray.800" }}
        >
          Save Poem
        </Button>
        {MikeOn && (
          <Box className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-40">
            <Box className="w-[90%] max-w-md bg-white rounded-xl shadow-2xl p-6 animate-fade-in">
              <Heading size="md" mb={4} textAlign="center" color="gray.700">
                🎤 Listening...
              </Heading>

              <Box
                id="transBox"
                className="innerValue min-h-[8rem] max-h-48 overflow-y-auto bg-gray-100 p-4 rounded-lg border border-gray-300 text-gray-800"
              >
                {transcript || "Speak something..."}
              </Box>

              <Box mt={6} className="flex justify-between gap-4">
                <Button
                  onClick={handleMike}
                  colorScheme="red"
                  flex="1"
                  variant="solid"
                >
                  ✖
                </Button>

                <Button
                  onClick={() => {
                    if (Active == "title") {
                      setTitle(document.getElementById("transBox").innerText);
                      handleMike();
                      resetTranscript();
                    } else {
                      handleStanzaChange(
                        document.getElementById("transBox").innerText,
                        Active - 1
                      );
                      handleMike();
                      resetTranscript();
                    }
                  }}
                  colorScheme="blue"
                  flex="1"
                >
                  {Active == "title" ? "Title" : "Stanza"}
                </Button>
                {Active !== "title" && (
                  <Button
                    onClick={() => {
                      if (Active == "title") {
                        setTitle(document.getElementById("transBox").innerText);
                        handleMike();
                        resetTranscript();
                      } else {
                        handleStanzaChange(
                          stanzas[Active - 1] +
                            document.getElementById("transBox").innerText,
                          Active - 1
                        );
                        handleMike();
                        resetTranscript();
                      }
                    }}
                    colorScheme="blue"
                    flex="1"
                  >
                    ➕{Active == "title" ? "Title" : "Stanza"}
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default AddPoem;
