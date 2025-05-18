export interface InsurancePolicy {
  // 基本資料
  policyNumber: string;
  insurerAddress: string;
  insuredAddress: string;
  protocol: string;
  startDate: string;
  endDate: string;
  premium: number;
  coverage: number;
  deductible: number;
  insuranceType: string[];
  claimMechanism: string[];

  // 承保範圍
  coverageItems: string[];
  
  // 不保事項
  exclusions: string[];

  // 理賠流程
  claimProcedure: {
    reportingPeriod: number;
    requiredDocuments: string[];
    verificationSources: string[];
    daoVoting: {
      threshold: number;
      period: number;
      passRate: number;
    };
  };

  // 保費計算
  premiumCalculation: {
    baseRate: number;
    loadingFactor: number;
    riskFactors: {
      low: number;
      mid: number;
      high: number;
    };
  };

  // 簽署資訊
  signatures: {
    dao: {
      address: string;
      timestamp: string;
    };
    policyholder: {
      address: string;
      timestamp: string;
    };
  };
} 