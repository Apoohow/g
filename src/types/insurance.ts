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

  // 理賠流程（四步驟）
  claimProcedure: {
    submission: {
      description: string;
      requiredDocuments: string[];
      onChainRecord: string;
    };
    review: {
      waitingPeriod: string;
      verificationAgency: string;
      lossVerification: string;
    };
    execution: {
      decision: string;
      payout: string;
      transparency: string;
    };
    adjustment: {
      overLoss: string;
      premiumAdjustment: string;
      policyPause: string;
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
    insurer: {
      address: string;
      timestamp: string;
    };
    policyholder: {
      address: string;
      timestamp: string;
    };
  };
} 