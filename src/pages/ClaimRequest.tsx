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
  Textarea,
  useToast,
  Text,
  HStack,
  Circle,
} from '@chakra-ui/react';

export const ClaimRequest: React.FC = () => {
  const [policyId, setPolicyId] = useState('');
  const [txHash, setTxHash] = useState('');
  const [lossAmount, setLossAmount] = useState('');
  const [description, setDescription] = useState('');
  const [currentStep, setCurrentStep] = useState(0); // 0: step1, 1: step2, 2: step3
  const toast = useToast();

  // 進度條步驟
  const steps = [
    '出險通報',
    '驗證與暫停期',
    '理賠決議與執行',
  ];

  // 各步驟說明
  const stepDescriptions = [
    '請填寫理賠申請表單並提交，完成後進入驗證與暫停期。',
    (
      <Box textAlign="left">
        <Text mb={1}>驗證與暫停期：</Text>
        <Box as="ul" pl={5} color="gray.700" fontSize="md">
          <li>設有等待期（如 7～14 天冷卻期），避免詐騙或操控。</li>
          <li>由區塊鏈監控服務（如 Chainalysis、OpenZeppelin）初步驗證損失事件。</li>
          <li>分析該地址的資產變化是否符合損失條件。</li>
          <li>若有需要，會聯繫用戶補充相關證明文件。</li>
        </Box>
      </Box>
    ),
    (
      <Box textAlign="left">
        <Text mb={1}>理賠決議與執行：</Text>
        <Box as="ul" pl={5} color="gray.700" fontSize="md">
          <li>由保險機構內部審核判斷理賠申請。</li>
          <li>通過審核後，系統會自動將賠款撥付至您的錢包地址。</li>
          <li>若未通過，將提供申訴或仲裁機會。</li>
          <li>所有理賠記錄與評估報告皆上鏈，永久可查，確保資訊透明。</li>
        </Box>
      </Box>
    ),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // 模擬提交理賠請求
      toast({
        title: '理賠請求已提交',
        description: `理賠編號：Claim#${Math.floor(Math.random() * 1000)}`,
        status: 'success',
        duration: 5000,
      });
      setCurrentStep(1); // 進入 step2
    } catch (error) {
      toast({
        title: '提交失敗',
        status: 'error',
        duration: 3000,
      });
    }
  };

  // 進入下一步
  const handleNextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        {/* 理賠進度條 */}
        <HStack spacing={6} justify="center" mb={2} mt={2}>
          {steps.map((label, idx) => (
            <Box key={label} textAlign="center">
              <Circle
                size="40px"
                bg={idx < currentStep ? 'green.400' : idx === currentStep ? 'blue.400' : 'gray.300'}
                color="white"
                mb={2}
                fontWeight="bold"
              >
                {idx + 1}
              </Circle>
              <Text fontWeight={idx === currentStep ? 'bold' : 'normal'} color={idx === currentStep ? 'blue.500' : 'gray.600'} fontSize="sm">
                {label}
              </Text>
            </Box>
          ))}
        </HStack>
        {/* 步驟說明 */}
        <Box textAlign="center" mb={2}>
          {stepDescriptions[currentStep]}
        </Box>

        <Heading as="h1" size="xl" textAlign="center">
          提交理賠申請
        </Heading>

        <Text fontSize="md" color="gray.600">
          請提供您的保單資訊和損失詳情，我們將進行鏈上驗證和審核。
        </Text>

        {/* 表單只在 step1 顯示 */}
        {currentStep === 0 && (
          <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel>保單 ID</FormLabel>
                <Input
                  value={policyId}
                  onChange={(e) => setPolicyId(e.target.value)}
                  placeholder="例如：DS#101"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>交易 Hash</FormLabel>
                <Input
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  placeholder="0x..."
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>損失金額 (USDC)</FormLabel>
                <Input
                  type="number"
                  value={lossAmount}
                  onChange={(e) => setLossAmount(e.target.value)}
                  placeholder="輸入損失金額"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>事件說明</FormLabel>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="請詳細描述發生的情況..."
                  size="sm"
                  resize="vertical"
                  minH="150px"
                />
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                w="100%"
                isDisabled={!policyId || !txHash || !lossAmount || !description}
              >
                提交理賠申請
              </Button>
            </VStack>
          </Box>
        )}
        {/* step2、step3 顯示「進入下一步」按鈕 */}
        {currentStep > 0 && currentStep < 2 && (
          <Button colorScheme="blue" size="lg" w="100%" onClick={handleNextStep}>
            進入下一步
          </Button>
        )}
      </VStack>
    </Container>
  );
};

export default ClaimRequest; 