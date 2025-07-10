import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react"
import { useNoteStore } from "../store/note"
import { useEffect } from "react"
import NoteCard from "../components/NoteCard"
import { Link } from "react-router-dom"

const HomePage = () => {

   const {fetchNotes,notes} = useNoteStore()

 useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <Container maxW='container.xl' py={12} px={40}>
          <VStack spacing={8}>
                    <Text 
                     fontSize={"30"}
                      fontWeight={"bold"}
                      bgGradient={"linear(to-r, cyan.400, blue.500)"}
                      bgClip={"text"}
                      textAlign={"center"}
                     >
                      	Current Notes🚀
                    </Text>
                  <SimpleGrid
                  columns={{
                                base: 1,
                                md: 2,
                                lg: 3,
                              }}
                              spacing={6}
					                    w={"full"}
                  >
                    	{notes.map((note) => (
						<NoteCard key={note._id} note={note} />
					))}
                    
                  </SimpleGrid>

                  {notes.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No Notes found 😢{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Create a Note
							</Text>
						</Link>
					</Text>
				)}
       
          </VStack>

    </Container>
  )
}

export default HomePage