import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Textarea, Heading, useToast } from '@chakra-ui/react';
import { FaPlus, FaSave, FaTrashAlt } from 'react-icons/fa';
import Layout from './Layout/Layout';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

const ManagePoem = () => {
  const { id } = useParams(); // Get poem ID from params
  const navigate = useNavigate();
  const toast = useToast();

  const [title, setTitle] = useState('');
  const [stanzas, setStanzas] = useState(['']);
  const [currentStanzaIndex, setCurrentStanzaIndex] = useState(0);

  // Fetch the poem details using the poem ID (simulated here)
  useEffect(() => {
    // Simulate fetching poem from an API or database
    const fetchPoem = () => {
     
      api.get(`/poem/get/${id}`)
      .then((res)=>{

        let poem = res.data

        setTitle(poem?.title);
        setStanzas(poem?.stanzas);

      }).catch(()=>{
        navigate(-1)
      })
    };

    fetchPoem();
  }, [id]);

  // Handle changes to the title
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Handle changes to a stanza
  const handleStanzaChange = (e, index) => {
    const updatedStanzas = [...stanzas];
    updatedStanzas[index] = e.target.value;
    setStanzas(updatedStanzas);
  };

  // Add a new stanza
  const addStanza = () => {
    if (stanzas[stanzas.length - 1] === '') {
      return;
    }
    setStanzas([...stanzas, '']);
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

  // Handle Save of Edited Poem
  const handleSavePoem = () => {
    if (title && stanzas.every((stanza) => stanza.trim() !== '')) {
      api.put(`/poem/update/${id}`,{title:title,stanzas:stanzas})
      .then(()=>{
        toast({
          title: 'Poem Updated!',
          description: `Poem titled "${title}" has been updated successfully.`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate(`/admin`); // Navigate to the poem management page after saving
      }).catch((err)=>{
        toast({
          title: 'Poem Updated unsuccesfull!',
          description: err.response.data.message||`Poem titled "${title}" has not been updated successfully.`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      })
     
    } else {
      toast({
        title: 'Error',
        description: 'Please fill in the title and all stanzas.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout>
      <Box className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
        <Heading as="h1" size="md" textAlign="center" mb={6}>
          Edit Poem
        </Heading>

        {/* Title Input */}
        <div className="mb-4">
          <Input
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
              className={`mb-4 p-4 border ${currentStanzaIndex === index ? 'border-blue-500' : 'border-gray-300'} rounded-md`}
            >
              <Textarea
                placeholder={`Stanza ${index + 1}`}
                value={stanza}
                h={'fit-content'}
                onChange={(e) => handleStanzaChange(e, index)}
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
          color="white"
          bg="black"
          onClick={handleSavePoem}
          className="w-full py-3 mt-4"
          _hover={{ bg: 'gray.800' }}
        >
          Save Poem
        </Button>
      </Box>
    </Layout>
  );
};

export default ManagePoem;
