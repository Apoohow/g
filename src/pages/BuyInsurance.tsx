import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { PDFViewer } from '@react-pdf/renderer';
import InsurancePDF from '../components/InsurancePDF';
import { InsurancePolicy } from '../types/insurance';
import { motion } from 'framer-motion';
import { ShieldIcon, FileIcon, WalletIcon } from './icons';

const MotionBox = motion(Box);

export const BuyInsurance: React.FC = () => {
  const [protocol, setProtocol] = useState('');
  const [amount, setAmount] = useState('');
  const [premium, setPremium] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const calculatePremium = (amount: string) => {
    const premium = parseFloat(amount) * 0.12;
    setPremium(premium.toFixed(2));
  };

  const connectWallet = async () => {
    try {
      setIsConnected(true);
      toast({
        title: '錢包連接成功',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: '錢包連接失敗',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: '保單購買成功',
      description: `已生成保單 NFT：DS#${Math.floor(Math.random() * 1000)}`,
      status: 'success',
      duration: 5000,
    });
  };

  const samplePolicy: InsurancePolicy = {
    policyNumber: 'DS-2025-0001',
    insurerAddress: '0xDEF456...',
    insuredAddress: '0xABC123...',
    protocol: protocol || 'Aave Protocol',
    startDate: new Date().toLocaleDateString(),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    premium: parseFloat(premium) || 1284.73,
    coverage: parseFloat(amount) || 10000,
    deductible: 500,
    insuranceType: ['智能合約漏洞', '預言機攻擊保險'],
    claimMechanism: ['鏈上驗證系統'],
    coverageItems: [
      '智能合約漏洞（如邏輯錯誤、Reentrancy 攻擊等）',
      '預言機攻擊（Oracle manipulation）導致價格失真與清算損失',
      'DAO 治理遭操控（如惡意提案）導致資金外流',
      '協議升級後出現新漏洞或後門（如 Euler 事件）',
      '被保協議內之資金池被異常提取（如閃電貸抽乾）'
    ],
    exclusions: [
      '私鑰洩漏、忘記助記詞、未開啟 2FA 等個人疏失',
      '授權惡意合約（如 approve all）或操作失誤',
      '主動轉帳錯誤（如轉給詐騙地址）',
      '市場價格波動導致幣價下跌',
      '使用非白名單協議之資產損失',
      '未通報保單地址或保額超過未申報者',
      '區塊鏈停機、硬分岔或極端天災等不可抗力'
    ],
    claimProcedure: {
      submission: {
        description: '使用者提出理賠申請，可由保單持有人或第三方通報人（如白帽駭客、監控機構）提出，並透過 DApp 介面填寫事件資料。',
        requiredDocuments: [
          '協議名稱與事件時間',
          '損失金額估算',
          '錢包地址與交易紀錄 hash',
          '資產損失說明'
        ],
        onChainRecord: '提交即產生一筆鏈上交易，保留索賠記錄與時間戳'
      },
      review: {
        waitingPeriod: '設有等待期（如 7～14 天冷卻期），避免詐騙或操控',
        verificationAgency: '由區塊鏈監控服務（如 Chainalysis、OpenZeppelin）初步驗證損失事件',
        lossVerification: '分析該地址的資產變化是否符合損失條件'
      },
      execution: {
        decision: '由保險機構內部審核判斷',
        payout: '通過則自動撥款至錢包，未通過則拒賠或可申訴仲裁',
        transparency: '所有理賠記錄與評估報告皆上鏈，永久可查'
      },
      adjustment: {
        overLoss: '若單次理賠損耗大量資金，系統可啟動再保險或儲備池補充資金池',
        premiumAdjustment: '根據事件嚴重性調整保費，調整該協議保費（自動化模型）',
        policyPause: '高風險協議可能暫時下架或重新審核'
      }
    },
    premiumCalculation: {
      baseRate: 5.62,
      loadingFactor: 1.27,
      riskFactors: {
        low: 1.1,
        mid: 1.4,
        high: 1.8
      }
    },
    signatures: {
      insurer: {
        address: '0xDEF456...',
        timestamp: new Date().toLocaleString()
      },
      policyholder: {
        address: '0xABC123...',
        timestamp: new Date().toLocaleString()
      }
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center" mb={8}>
          <Icon as={ShieldIcon} w={12} h={12} color="brand.500" mb={4} />
          <Heading as="h1" size="xl" bgGradient="linear(to-r, brand.500, accent.500)" bgClip="text">
            購買智能合約保險
          </Heading>
          <Text mt={2} color="gray.600" fontSize="lg">
            保護您的數位資產安全
          </Text>
        </Box>
        
        <MotionBox
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          layerStyle="card"
        >
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel fontWeight="bold">協議名稱</FormLabel>
                <Select
                  placeholder="選擇要投保的協議"
                  value={protocol}
                  onChange={(e) => setProtocol(e.target.value)}
                  bg="white"
                  _hover={{ borderColor: 'brand.500' }}
                >
                  <option value="curve">Curve</option>
                  <option value="aave">Aave</option>
                  <option value="uniswap">Uniswap</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel fontWeight="bold">投保金額 (USDC)</FormLabel>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    calculatePremium(e.target.value);
                  }}
                  placeholder="輸入投保金額"
                  bg="white"
                  _hover={{ borderColor: 'brand.500' }}
                />
              </FormControl>

              <Box 
                w="100%" 
                p={6} 
                borderRadius="xl"
                bgGradient="linear(to-r, brand.50, accent.50)"
                borderWidth={1}
                borderColor="brand.100"
              >
                <HStack justify="space-between">
                  <Text fontWeight="bold">預估保費：</Text>
                  <Text fontSize="xl" color="brand.500" fontWeight="bold">
                    {premium} USDC
                  </Text>
                </HStack>
              </Box>

              <Button
                leftIcon={<Icon as={FileIcon} />}
                variant="gradient"
                onClick={onOpen}
                isDisabled={!protocol || !amount}
                size="lg"
                w="full"
              >
                預覽保單內容
              </Button>

              {!isConnected ? (
                <Button
                  leftIcon={<Icon as={WalletIcon} />}
                  colorScheme="blue"
                  onClick={connectWallet}
                  w="100%"
                  size="lg"
                  variant="gradient"
                >
                  連接錢包
                </Button>
              ) : (
                <Button
                  type="submit"
                  colorScheme="green"
                  w="100%"
                  size="lg"
                  variant="gradient"
                  isDisabled={!protocol || !amount}
                >
                  購買保險
                </Button>
              )}
            </VStack>
          </Box>
        </MotionBox>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent h="95vh">
          <ModalHeader 
            bgGradient="linear(to-r, brand.500, accent.500)"
            color="white"
            borderTopRadius="md"
          >
            保單預覽
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody>
            <PDFViewer style={{ width: '100%', height: '100%' }}>
              <InsurancePDF policy={samplePolicy} />
            </PDFViewer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default BuyInsurance;