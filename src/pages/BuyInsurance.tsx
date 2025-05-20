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
  useMediaQuery,
  Checkbox,
} from '@chakra-ui/react';
import { PDFViewer, pdf } from '@react-pdf/renderer';
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
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [statementRead, setStatementRead] = useState(false);
  const { isOpen: isStatementOpen, onOpen: onStatementOpen, onClose: onStatementClose } = useDisclosure({
    onClose: () => setStatementRead(true)
  });
  const [pendingSubmit, setPendingSubmit] = useState(false);

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
    setPendingSubmit(true);
    onStatementOpen();
  };

  const handleAgreeAndSubmit = () => {
    setPendingSubmit(false);
    onStatementClose();
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
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString(),
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

  // PDF 下載功能
  const handleDownloadPDF = async () => {
    const blob = await pdf(<InsurancePDF policy={samplePolicy} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DeFiSure-保單.pdf';
    a.click();
    URL.revokeObjectURL(url);
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
            {isMobile ? (
              <Button colorScheme="blue" onClick={handleDownloadPDF} w="full" size="lg">
                下載 PDF
              </Button>
            ) : (
              <PDFViewer style={{ width: '100%', height: '100%' }}>
                <InsurancePDF policy={samplePolicy} />
              </PDFViewer>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={isStatementOpen} onClose={() => { setPendingSubmit(false); onStatementClose(); }} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>網路投保聲明事項</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box fontSize="md" mb={4} fontWeight="bold">一、要保人與被保險人聲明事項</Box>
            <Box mb={2}>本人已審閱並瞭解貴公司（<b>DeFiSure股份有限公司</b>）所提供之「投保須知」，另依「個人資料保護法」第八條第一項規定，已知悉 DeFiSure 蒐集、處理及利用本人個人資料之目的與方式。</Box>
            <Box mb={2}>本人了解並同意 DeFiSure 依個人資料保護法規定，在特定目的範圍內，對本人（包含要保人與被被保險人）之個人資料進行蒐集、處理與利用。</Box>
            <Box mb={2}>本人已於投保前審閱並知悉 DeFiSure 保險商品之「要保書」、「保單條款」及「投保須知」，可透過官方網站查閱或聯絡客服取得。本人已保有合理審閱時間，確認了解並同意相關條件與內容。</Box>
            <Box mb={2} color="red.500">※DeFiSure 保留最終是否承保之權利。其他未載明事項，悉依保單條款辦理。</Box>
            <Box mb={2} color="red.500">※若需參考其他保險商品資訊，請至官方網站或洽詢客服人員。</Box>
            <Box mb={4} color="red.500">※本人（要保人）已確認瞭解 DeFiSure 所履行之個人資料保護法告知義務，並已詳閱相關聲明內容。</Box>
            <Box fontSize="md" mb={4} fontWeight="bold">二、本公司聲明事項</Box>
            <Box mb={2}>■ 本保險商品已由本公司合格審查人員審核，內容符合保險精算原則與法令規範。惟為保障消費者權益，建議保戶詳閱保單條款與相關文件，審慎選擇適合商品。若有任何虛偽、錯誤或違法資訊，將由本公司及相關人員依法負責。</Box>
            <Box mb={2}>■ 保險契約中所有權利與義務，均載明於保單條款，請務必詳加閱讀與理解。</Box>
            <Box mb={2}>■ 要保書所含之提醒欄位（如強制險等），僅供保戶自我檢核保障完整性，實際強制責任保險訂定仍依現行法規辦理。</Box>
            <Box mb={4}>■ 保單核保通過後，本公司將進行隨機抽樣之「電話訪問」，以再次確認投保意願。保單與收據將於核保完成後三個工作天內寄發，若於十個工作天內未收到，請聯絡 DeFiSure 客服中心辦理。</Box>
            <Box fontSize="md" mb={4} fontWeight="bold">三、履行個資法告知義務內容</Box>
            <Box mb={2}><b>一、蒐集之目的</b><br/>（一）財產保險（代碼：093）<br/>（二）風險評估、理賠與保單管理（代碼：181）<br/>（三）DeFi 保險科技應用與分析目的</Box>
            <Box mb={2}><b>二、蒐集之個人資料類別</b><br/>一般資料（如姓名、身分證號、聯絡方式、錢包地址、職業、投保金額）<br/>特殊資料（如健康資訊或駭客事件相關紀錄，若理賠需用者）</Box>
            <Box mb={2}><b>三、個人資料來源（間接蒐集適用）</b><br/>（一）要保人 / 被保險人本人<br/>（二）區塊鏈交易紀錄、DApp 操作記錄<br/>（三）協助處理理賠之第三方單位（如安全審計、鏈上分析商）<br/>（四）醫療單位（如與人身保險商品有關）<br/>（五）政府開放資料平台與執法機關（依法配合時）</Box>
            <Box mb={2}><b>四、個人資料之利用期間、對象、地區、方式</b><br/>（一）期間：保險契約存續期間及依法須保存之期間<br/>（二）對象：本公司內部單位、再保單位、合作區塊鏈驗證機構（如 Chainalysis）、保險公會及依法有權機關<br/>（三）地區：上述單位所在地（包含境外智能合約伺服器所在國）<br/>（四）方式：依據法令規定與資訊安全措施進行電子化或紙本利用</Box>
            <Box mb={2}><b>五、依個資法第 3 條，您得行使以下權利</b><br/>查詢或請求閱覽本人資料<br/>請求補充、更正或刪除資料<br/>請求停止蒐集、處理或利用本人資料<br/>如需行使上述權利，請來信至客服信箱：support@defisure.io</Box>
            <Box mb={2}><b>六、不提供資料之可能影響</b><br/>若您未提供必要資料，將可能導致本公司無法完成保單承保、續保或理賠程序，進而影響您的保障權益。</Box>
            <Box mb={2}>本告知聲明事項已公布於官方網站：<a href="https://g-two-sigma.vercel.app/" target="_blank" rel="noopener noreferrer">https://g-two-sigma.vercel.app/</a> ，您可隨時查閱。如有疑問，歡迎洽詢客服專線：0800-XXX-XXX</Box>
            <Button colorScheme="blue" w="full" mt={4} onClick={handleAgreeAndSubmit} isDisabled={!pendingSubmit}>
              我已閱讀並同意，繼續購買保險
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default BuyInsurance;