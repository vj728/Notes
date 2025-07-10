import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Button, Heading, HStack, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react"
import { useNoteStore } from "../store/note";
import { useState } from "react";


const NoteCard = ({ note }) => {

    const [updatedNote, setUpdatedNote] = useState(note);
    const bg = useColorModeValue("white", "gray.800");

    // delete Note
    const { deleteNote, updateNote } = useNoteStore()
    const toast = useToast()

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteNote = async (pid) => {
        const { success, message } = await deleteNote(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    // update note 

 

    const handleUpdateNote = async (pid, updateNoteData) => {
		const { success, message } = await updateNote(pid, updateNoteData);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Product updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};
    return (
        <Box
            shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >

            <Box p={4}>
                <Heading as='h3' size='md' mb={2}>
                    {note.name}
                </Heading>

                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme='blue'  onClick={onOpen}/>
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDeleteNote(note._id)}
                        colorScheme='red'
                    />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Note</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <Input
                                placeholder="Notes Update "
                                name="name"
                                value={updatedNote.name}
                                onChange={(e) => setUpdatedNote({ ...updatedNote, name: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>

                    	<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateNote(note._id, updatedNote)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>

                </ModalContent>

            </Modal>

        </Box>
    )
}

export default NoteCard