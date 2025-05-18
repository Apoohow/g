import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Button,
  Progress,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Grid,
  GridItem,
  useToast,
  Badge,
} from '@chakra-ui/react';

export const DaoVoting: React.FC = () => {
  const [hasVoted, setHasVoted] = useState(false);
  const [supportVotes, setSupportVotes] = useState(68);
  const toast = useToast();

  const handleVote = (support: boolean) => {
    setHasVoted(true);
    if (support) {
      setSupportVotes(prev => prev + 1);
    }
    toast({
      title: '投票成功',
      status: 'success',
      duration: 3000,
    });
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          DAO 治理投票
        </Heading>

        <Box p={6} borderWidth={1} borderRadius="lg">
          <VStack spacing={4} align="stretch">
            <Heading size="md">理賠申請 #97</Heading>
            <Text>申請人：0xABC...def</Text>
            <Text>保單 ID：DS#101</Text>
            <Text>損失金額：10,000 USDC</Text>
            <Text>事件類型：閃電貸攻擊</Text>
          </VStack>
        </Box>

        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <GridItem>
            <Stat>
              <StatLabel>當前支持率</StatLabel>
              <StatNumber>{supportVotes}%</StatNumber>
              <StatHelpText>
                <Badge colorScheme={supportVotes >= 60 ? 'green' : 'orange'}>
                  {supportVotes >= 60 ? '已達門檻' : '未達門檻'}
                </Badge>
              </StatHelpText>
            </Stat>
          </GridItem>
          <GridItem>
            <Stat>
              <StatLabel>投票截止時間</StatLabel>
              <StatNumber>48小時</StatNumber>
              <StatHelpText>剩餘時間</StatHelpText>
            </Stat>
          </GridItem>
        </Grid>

        <Box>
          <Text mb={2}>投票進度</Text>
          <Progress value={supportVotes} colorScheme="blue" size="lg" />
        </Box>

        <Box>
          <Text mb={4} fontSize="lg" fontWeight="bold">
            專業評估意見
          </Text>
          <Text>
            根據 Chainalysis 的鏈上分析報告，此次攻擊確實造成用戶資產損失。
            建議通過理賠申請。
          </Text>
        </Box>

        {!hasVoted ? (
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Button
              colorScheme="green"
              size="lg"
              onClick={() => handleVote(true)}
            >
              支持理賠
            </Button>
            <Button
              colorScheme="red"
              size="lg"
              variant="outline"
              onClick={() => handleVote(false)}
            >
              反對理賠
            </Button>
          </Grid>
        ) : (
          <Text textAlign="center" color="green.500" fontSize="lg">
            您已完成投票，感謝參與治理！
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default DaoVoting; 