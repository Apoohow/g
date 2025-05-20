import React from 'react';
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
  Badge,
  Grid,
  GridItem,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { InsurancePolicy } from '../types/insurance';

const samplePolicy: InsurancePolicy = {
  policyNumber: 'DS-2025-0001',
  insurerAddress: '0xDEF456...',
  insuredAddress: '0xABC123...',
  protocol: 'Aave Protocol',
  startDate: '2025/05/01',
  endDate: '2025/08/01',
  premium: 1284.73,
  coverage: 10000,
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
      timestamp: '2025/04/30 20:00'
    },
    policyholder: {
      address: '0xABC123...',
      timestamp: '2025/05/01 09:42'
    }
  }
};

export const PolicyDetails: React.FC = () => {
  return (
    <Container maxW="container.lg" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          DeFiSure 數位資產協議風險保險契約
        </Heading>

        {/* 基本資料 */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            一、契約基本資料
          </Heading>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Th>保險公司</Th>
                <Td>DeFiSure DAO</Td>
              </Tr>
              <Tr>
                <Th>保單編號</Th>
                <Td>{samplePolicy.policyNumber}</Td>
              </Tr>
              <Tr>
                <Th>投保人</Th>
                <Td>{samplePolicy.insuredAddress}</Td>
              </Tr>
              <Tr>
                <Th>被保協議</Th>
                <Td>{samplePolicy.protocol}</Td>
              </Tr>
              <Tr>
                <Th>保險期間</Th>
                <Td>{`${samplePolicy.startDate} 至 ${samplePolicy.endDate}`}</Td>
              </Tr>
              <Tr>
                <Th>保費</Th>
                <Td>{`${samplePolicy.premium} USDC`}</Td>
              </Tr>
              <Tr>
                <Th>保額上限</Th>
                <Td>{`${samplePolicy.coverage} USDC`}</Td>
              </Tr>
              <Tr>
                <Th>自負額</Th>
                <Td>{`${samplePolicy.deductible} USDC`}</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>

        <Divider />

        {/* 承保範圍 */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            二、承保範圍
          </Heading>
          <List spacing={3}>
            {samplePolicy.coverageItems.map((item, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <ListIcon as={CheckCircleIcon} color="green.500" />
                {item}
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        {/* 不保事項 */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            三、不保事項
          </Heading>
          <List spacing={3}>
            {samplePolicy.exclusions.map((item, index) => (
              <ListItem key={index} display="flex" alignItems="center">
                <ListIcon as={WarningIcon} color="red.500" />
                {item}
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider />

        {/* 理賠流程 */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            四、理賠流程
          </Heading>
          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                1. 出險通報
              </Text>
              <Text>{samplePolicy.claimProcedure.submission.description}</Text>
              <Text mt={2} fontWeight="bold">所需文件：</Text>
              <List spacing={2}>
                {samplePolicy.claimProcedure.submission.requiredDocuments.map((doc, index) => (
                  <ListItem key={index}>{doc}</ListItem>
                ))}
              </List>
              <Text mt={2}>{samplePolicy.claimProcedure.submission.onChainRecord}</Text>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                2. 驗證與暫停期
              </Text>
              <Text>等待期設計：{samplePolicy.claimProcedure.review.waitingPeriod}</Text>
              <Text>預驗證機構：{samplePolicy.claimProcedure.review.verificationAgency}</Text>
              <Text>損失驗證：{samplePolicy.claimProcedure.review.lossVerification}</Text>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                3. 理賠決議與執行
              </Text>
              <Text>決策方式：{samplePolicy.claimProcedure.execution.decision}</Text>
              <Text>賠付執行：{samplePolicy.claimProcedure.execution.payout}</Text>
              <Text>資訊透明：{samplePolicy.claimProcedure.execution.transparency}</Text>
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                4. 資金池調整與再保險啟動
              </Text>
              <Text>損失超過預期：{samplePolicy.claimProcedure.adjustment.overLoss}</Text>
              <Text>保費機制調整：{samplePolicy.claimProcedure.adjustment.premiumAdjustment}</Text>
              <Text>保單暫停：{samplePolicy.claimProcedure.adjustment.policyPause}</Text>
            </Box>
          </VStack>
        </Box>

        <Divider />

        {/* 簽署資訊 */}
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            合約確認
          </Heading>
          <Grid templateColumns="repeat(2, 1fr)" gap={6}>
            <GridItem>
              <Box p={4} borderWidth={1} borderRadius="md">
                <Text fontWeight="bold">DeFiSure（發行保險人）</Text>
                <Text>地址：{samplePolicy.signatures.insurer.address}</Text>
                <Text>簽署時間：{samplePolicy.signatures.insurer.timestamp}</Text>
                <Badge colorScheme="green" mt={2}>已簽署</Badge>
              </Box>
            </GridItem>
            <GridItem>
              <Box p={4} borderWidth={1} borderRadius="md">
                <Text fontWeight="bold">投保人</Text>
                <Text>地址：{samplePolicy.signatures.policyholder.address}</Text>
                <Text>簽署時間：{samplePolicy.signatures.policyholder.timestamp}</Text>
                <Badge colorScheme="green" mt={2}>已簽署</Badge>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </VStack>
    </Container>
  );
};

export default PolicyDetails; 