import { Box, useColorModeValue } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import CreatePage from "./pages/CreatePage"
import HomePage from "./pages/HomePage"
import { Route, Routes } from "react-router-dom"



const App = () => {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100","gray.900")}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create" element={<CreatePage />}></Route>
      </Routes>




    </Box>
  )
}

export default App