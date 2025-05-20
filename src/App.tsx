import React from 'react';
import { ChakraProvider, Box, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerBody, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BuyInsurance from './pages/BuyInsurance';
import ClaimRequest from './pages/ClaimRequest';
import PolicyDetails from './pages/PolicyDetails';
import theme from './styles/theme';

const ProcessPage: React.FC = () => (
  <Box maxW="container.md" mx="auto" py={10}>
    <Box mb={8} textAlign="center">
      <Box as="span" fontSize="4xl" fontWeight="bold" color="brand.500">理賠流程</Box>
    </Box>
    <Box bg="white" p={8} borderRadius="xl" boxShadow="md">
      <Box mb={6}>
        <Box fontWeight="bold" fontSize="xl" mb={2}>1. 出險通報</Box>
        <Box>使用者提出理賠申請，可由保單持有人或第三方通報人（如白帽駭客、監控機構）提出，並透過 DApp 介面填寫事件資料。</Box>
        <Box mt={2} fontWeight="bold">所需文件：</Box>
        <Box as="ul" pl={6} mb={2}>
          <li>協議名稱與事件時間</li>
          <li>損失金額估算</li>
          <li>錢包地址與交易紀錄 hash</li>
          <li>資產損失說明</li>
        </Box>
        <Box>提交即產生一筆鏈上交易，保留索賠記錄與時間戳</Box>
      </Box>
      <Box mb={6}>
        <Box fontWeight="bold" fontSize="xl" mb={2}>2. 驗證與暫停期</Box>
        <Box>設有等待期（如 7～14 天冷卻期），避免詐騙或操控</Box>
        <Box>由區塊鏈監控服務（如 Chainalysis、OpenZeppelin）初步驗證損失事件</Box>
        <Box>分析該地址的資產變化是否符合損失條件</Box>
      </Box>
      <Box mb={6}>
        <Box fontWeight="bold" fontSize="xl" mb={2}>3. 理賠決議與執行</Box>
        <Box>由保險機構內部審核判斷</Box>
        <Box>通過則自動撥款至錢包，未通過則拒賠或可申訴仲裁</Box>
        <Box>所有理賠記錄與評估報告皆上鏈，永久可查</Box>
      </Box>
      <Box>
        <Box fontWeight="bold" fontSize="xl" mb={2}>4. 資金池調整與再保險啟動</Box>
        <Box>若單次理賠損耗大量資金，系統可啟動再保險或儲備池補充資金池</Box>
        <Box>根據事件嚴重性調整保費，調整該協議保費（自動化模型）</Box>
        <Box>高風險協議可能暫時下架或重新審核</Box>
      </Box>
    </Box>
  </Box>
);

const NAV_LINKS = [
  { to: '/', label: '購買保險' },
  { to: '/claim', label: '申請理賠' },
  { to: '/process', label: '理賠流程' },
  { to: '/policy', label: '保單詳情' },
];

const App: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box position="relative">
          <img src="/logo.png" alt="DeFiSure Logo" style={{ position: 'absolute', left: 24, top: -48, width: 160, height: 160, objectFit: 'contain', zIndex: 10 }} />
          <Box as="nav" bg="brand.500" color="white" p={2} style={{ height: 64, minHeight: 64, position: 'relative', zIndex: 5 }}>
            <Box maxW="container.lg" mx="auto" display="flex" alignItems="center" gap={8} style={{ height: 64 }}>
              <Box style={{ width: 160 }} />
              {/* 桌機版選單 */}
              <Box display={{ base: 'none', md: 'flex' }} flex={1} justifyContent="center" alignItems="center" gap={8} height={64}>
                {NAV_LINKS.map(link => (
                  <Link key={link.to} to={link.to} style={{ height: 64, display: 'flex', alignItems: 'center' }}>{link.label}</Link>
                ))}
              </Box>
              {/* 手機版漢堡選單按鈕 */}
              <IconButton
                aria-label="Open menu"
                icon={<HamburgerIcon />}
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="ghost"
                color="white"
                fontSize="2xl"
                ml={2}
              />
              <Box style={{ width: 160 }} />
            </Box>
            {/* Drawer for mobile menu */}
            <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
              <DrawerOverlay />
              <DrawerContent>
                <DrawerBody p={0} bg="brand.500" color="white">
                  <Box display="flex" flexDirection="column" alignItems="center" pt={8} gap={6}>
                    {NAV_LINKS.map(link => (
                      <Link key={link.to} to={link.to} style={{ fontSize: 20 }} onClick={onClose}>{link.label}</Link>
                    ))}
                  </Box>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </Box>

          <Routes>
            <Route path="/" element={<BuyInsurance />} />
            <Route path="/claim" element={<ClaimRequest />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/policy" element={<PolicyDetails />} />
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
};

export default App; 