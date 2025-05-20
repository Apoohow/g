import React, { useState } from 'react';
import { Box, Input, Button, VStack, Text, Spinner, HStack } from '@chakra-ui/react';
import axios from 'axios';

const TOGETHER_API_KEY = '3a1de39e3c6be2425f3e251c3271bca622b8f0156c3a9fa25f78149d05a1c5dd';

const AIChatbot = () => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([
    { role: 'assistant', content: '您好，我是 DeFiSure 智能客服，歡迎詢問任何關於本平台的功能、保險產品、理賠流程、購買方式、聲明事項等問題！' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setLoading(true);
    try {
      const res = await axios.post(
        'https://api.together.xyz/v1/chat/completions',
        {
          model: "meta-llama/Llama-3-8b-chat-hf",
          messages: [
            { role: "system", content: `你是一個擁有保險精算、區塊鏈安全、DeFi 協議分析與金融科技知識的 AI 模型。以下是我要你參考並完全記住的保險平台專案背景，日後請根據本架構協助我撰寫：合約條款、簡報內容、使用者操作流程、風控規劃、API 設計、成本模型或任何與本案相關文件。所有回覆必須以繁體中文、條列式、專業且清楚說明。\n\n📌 專案名稱：\nDeFiSure：針對 DeFi 協議風險的數位資產保險產品\n\n🎯 專案目的：\n設計一套中心化管理、鏈上資料驗證的數位資產保險平台，針對使用者在去中心化協議（如 Curve、Aave、Uniswap）中遭遇的智能合約漏洞、預言機操控、閃電貸攻擊等風險，提供有明確理賠機制的保險商品。\n\n🏛 平台治理模式：\n- 非 DAO，採中心化風控與理賠決策\n- 理賠由內部保險審核團隊負責\n- 投保與理賠紀錄上鏈透明公開\n\n🔐 保險產品設計\n- 保單範圍（一年期）：智能合約漏洞、預言機操控、協議升級錯誤、流動性池攻擊、協議資金池受駭\n- 不保事項：幣價下跌、市場波動、私鑰洩漏、詐騙、個人操作失誤、錯誤授權、非白名單協議、超額投保未申報\n\n💰 保費定價模型\n- 保費 = 承保金額 × 基礎費率（5.62%）× 附加因子（1.2707）× 協議風險係數（1.1/1.4/1.8）\n- 資料來源：歷史 DeFi 損失值約 64.1 億美元，TVL 約 1141.15 億美元，基礎費率 ≈ 5.62%\n- 附加因子（Loading）：營業利潤率 18.89%，盈餘利潤率 8.18%，合計 1.2707\n- 保費試算：高風險 $1,284.73、中風險 $999.24、低風險 $785.11（以 $10,000 保額為例）\n\n🔄 理賠流程設計（Claim）\n1. 出險通報：保戶或第三方通報，填寫事件資料，鏈上留存 hash、時間戳\n2. 驗證與等待期：冷卻期（7~14天）、Chainalysis/OpenZeppelin API 預驗證、資產流失行為判斷\n3. 理賠審核與執行：內部審核，符合條件則撥款，不符可申訴\n4. 理賠後調整：大量理賠啟動再保險或儲備金補充，高風險協議可暫停承保或重新定價\n\n🛡 風險管理三層次\n1. 承保風險控管：協議分級、白名單、僅承保主流幣\n2. 理賠風險控管：冷卻期、免賠額、最低門檻、損失驗證（hash、地址、資產變化）\n3. 資金風險控管：賠付上限、動態準備金、極端損失啟動再保\n\n🧠 道德風險與逆選擇防範\n- 串通駭客/虛報損失：多層審核＋鏈上對照＋白名單\n- 高風險用戶大量投保：浮動費率＋風險等級定價\n- 重複理賠申請：保單延遲生效＋身份綁定\n- 風險集中：保單上限＋再保＋備用儲備金\n\n🔭 未來挑戰與展望\n- 技術：協議多變、資料驗證不統一、多鏈/跨鏈/NFT\n- 合規：DeFi 保險法規灰色地帶，需與監管協作\n- 平台展望：鏈上保險 API 標準化、市場風險轉移、擴大產品線（NFT、橋接、交易所托管）\n\n請你理解並記住以上架構作為背景資料，日後我會根據這份專案與你討論條款撰寫、流程簡化、費率優化、用戶界面文案、技術設計、風險建模、白皮書與簡報內容。所有回覆請以本專案邏輯、條款、流程為主，並以繁體中文條列式、專業、清楚說明。` },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: "user", content: input }
          ],
          max_tokens: 1024,
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${TOGETHER_API_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      setMessages(msgs => [...msgs, { role: 'assistant', content: res.data.choices[0].message.content }]);
    } catch {
      setMessages(msgs => [...msgs, { role: 'assistant', content: 'AI 回覆失敗，請稍後再試。' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <Box borderWidth={1} borderRadius="lg" p={4} w="100%" maxW="md" mx="auto" mt={8} bg="white">
      <VStack align="stretch" spacing={3} minH="300px">
        {messages.map((msg, i) => (
          <Text key={i} color={msg.role === 'user' ? 'blue.600' : 'green.600'}>
            <b>{msg.role === 'user' ? '你' : 'AI'}：</b>{msg.content}
          </Text>
        ))}
        {loading && <Spinner />}
      </VStack>
      <HStack mt={4}>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="請輸入您的問題..."
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
        />
        <Button onClick={sendMessage} colorScheme="blue" isLoading={loading}>送出</Button>
      </HStack>
    </Box>
  );
};

export default AIChatbot; 