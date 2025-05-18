import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BuyInsurance from './pages/BuyInsurance';
import ClaimRequest from './pages/ClaimRequest';
import DaoVoting from './pages/DaoVoting';
import PolicyDetails from './pages/PolicyDetails';
import theme from './styles/theme';

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box>
          <Box as="nav" bg="brand.500" color="white" p={4}>
            <Box maxW="container.lg" mx="auto" display="flex" gap={6}>
              <Link to="/">購買保險</Link>
              <Link to="/claim">申請理賠</Link>
              <Link to="/dao">DAO 投票</Link>
              <Link to="/policy">保單詳情</Link>
            </Box>
          </Box>

          <Routes>
            <Route path="/" element={<BuyInsurance />} />
            <Route path="/claim" element={<ClaimRequest />} />
            <Route path="/dao" element={<DaoVoting />} />
            <Route path="/policy" element={<PolicyDetails />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App; 