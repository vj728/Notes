import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { useNoteStore } from "../store/note";




const CreatePage = () => {
  const [newNote, setNewNote] = useState({
    name: ""
  });

  const toast= useToast()

  const { createNotes } = useNoteStore()
  const handleAddNote = async () => {
    const { success, message } = await createNotes(newNote)
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    }

    else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
    setNewNote({name:" "})
    // console.log("success", success)
    // console.log("message", message)
  }

  const handledown = (e)=>{
    if(e.key==='Enter'){
      handleAddNote()
    }
  }
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Note</Heading>
        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input
              placeholder='Notes'
              name='name'
              value={newNote.name}
              onChange={(e) => setNewNote({ ...newNote, name: e.target.value })}
              onKeyDown={handledown}
            />
            <Button colorScheme='blue' onClick={handleAddNote} w='full'>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage