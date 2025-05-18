import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { InsurancePolicy } from '../types/insurance';

// 註冊字體以支持中文
Font.register({
  family: 'Noto Sans TC',
  src: 'https://fonts.gstatic.com/ea/notosanstc/v1/NotoSansTC-Regular.otf',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Noto Sans TC',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  list: {
    marginLeft: 10,
  },
  listItem: {
    marginBottom: 5,
  },
  signature: {
    marginTop: 30,
    borderTop: '1 solid black',
    paddingTop: 10,
  },
});

interface InsurancePDFProps {
  policy: InsurancePolicy;
}

export const InsurancePDF: React.FC<InsurancePDFProps> = ({ policy }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>DeFiSafe 數位資產協議風險保險契約</Text>

      {/* 基本資料 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>一、契約基本資料</Text>
        <View style={styles.row}>
          <Text style={styles.label}>保險公司：</Text>
          <Text style={styles.value}>DeFiSafe DAO</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>保單編號：</Text>
          <Text style={styles.value}>{policy.policyNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>投保人：</Text>
          <Text style={styles.value}>{policy.insuredAddress}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>被保協議：</Text>
          <Text style={styles.value}>{policy.protocol}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>保險期間：</Text>
          <Text style={styles.value}>{`${policy.startDate} 至 ${policy.endDate}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>保費：</Text>
          <Text style={styles.value}>{`${policy.premium} USDC`}</Text>
        </View>
      </View>

      {/* 承保範圍 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>二、承保範圍</Text>
        <View style={styles.list}>
          {policy.coverageItems.map((item, index) => (
            <Text key={index} style={styles.listItem}>
              {`${index + 1}. ${item}`}
            </Text>
          ))}
        </View>
      </View>

      {/* 不保事項 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>三、不保事項</Text>
        <View style={styles.list}>
          {policy.exclusions.map((item, index) => (
            <Text key={index} style={styles.listItem}>
              {`${index + 1}. ${item}`}
            </Text>
          ))}
        </View>
      </View>

      {/* 理賠流程 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>四、理賠流程</Text>
        <Text>{`出險申報期限：出險後 ${policy.claimProcedure.reportingPeriod} 日內`}</Text>
        <Text style={{ marginTop: 10 }}>所需文件：</Text>
        <View style={styles.list}>
          {policy.claimProcedure.requiredDocuments.map((doc, index) => (
            <Text key={index} style={styles.listItem}>
              {`${index + 1}. ${doc}`}
            </Text>
          ))}
        </View>
      </View>

      {/* 簽署欄位 */}
      <View style={styles.signature}>
        <View style={styles.row}>
          <Text style={styles.label}>保險人簽署：</Text>
          <Text style={styles.value}>{policy.signatures.dao.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>投保人簽署：</Text>
          <Text style={styles.value}>{policy.signatures.policyholder.address}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default InsurancePDF; 