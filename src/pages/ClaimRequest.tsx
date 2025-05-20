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
} from '@chakra-ui/react';

export const ClaimRequest: React.FC = () => {
  const [policyId, setPolicyId] = useState('');
  const [txHash, setTxHash] = useState('');
  const [lossAmount, setLossAmount] = useState('');
  const [description, setDescription] = useState('');
  const toast = useToast();

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
    } catch (error) {
      toast({
        title: '提交失敗',
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          提交理賠申請
        </Heading>

        <Text fontSize="md" color="gray.600">
          請提供您的保單資訊和損失詳情，我們將進行鏈上驗證和審核。
        </Text>

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
      </VStack>
    </Container>
  );
};

export default ClaimRequest; 