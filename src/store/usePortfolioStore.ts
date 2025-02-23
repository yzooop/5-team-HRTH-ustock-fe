import { create } from "zustand";
import { PortfolioProps, StockProps } from "../constants/interface";

interface PortfolioState {
  pfName: string;
  data: PortfolioProps | null;
  stockData: StockProps[];
  budget: number;
  principal: number;
  profit: number;
  profitRate: number;
  change: boolean;
  setChange: (change: boolean) => void;
  setPortfolio: (
    pfName: string,
    data: PortfolioProps,
    stockData: StockProps[]
  ) => void;
  addStock: (newStock: StockProps) => void;
  updateStock: (updatedStock: StockProps) => void;
  deleteStock: (stockCode: string, stockValue: number) => void;
  setFinancialData: (
    budget: number,
    principal: number,
    profit: number,
    profitRate: number
  ) => void;
  updateBudget: (amount: number) => void;
  updatePrincipal: (amount: number) => void;
  updateProfitLoss: (amount: number) => void;
  calculateROR: () => void;

  portfolioChange: boolean;
  isPortfolio: (portfolioChange: boolean) => void;

  check: boolean;
  setCheck: (change: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  pfName: "",
  data: null,
  stockData: [],
  budget: 0,
  principal: 0,
  profit: 0,
  profitRate: 0,
  change: false,
  portfolioChange: false,
  check: false,

  isPortfolio: (portfolioChange) => set({ portfolioChange }),

  setChange: (change) => set({ change }),
  setCheck: (check) => set({ check }),

  setPortfolio: (pfName, data, stockData) => set({ pfName, data, stockData }),

  // 주식을 추가하는 함수
  addStock: (newStock) =>
    set((state) => {
      const newStockValue = newStock.quantity * newStock.average;
      return {
        stockData: [...state.stockData, newStock],
        budget: state.budget + newStockValue,
        principal: state.principal + newStockValue,
        // profit와 profitRate는 calculateROR 함수에서 계산
      };
    }),

  // 주식을 수정하는 함수
  updateStock: (updatedStock) =>
    set((state) => {
      const oldStock = state.stockData.find(
        (stock) => stock.code === updatedStock.code
      );
      if (!oldStock) return state;

      const oldStockValue = oldStock.quantity * oldStock.average;
      const newStockValue = updatedStock.quantity * updatedStock.average;
      const valueDifference = newStockValue - oldStockValue;

      return {
        stockData: state.stockData.map((stock) =>
          stock.code === updatedStock.code ? updatedStock : stock
        ),
        budget: state.budget + valueDifference,
        principal: state.principal + valueDifference,
        // profit와 profitRate는 calculateROR 함수에서 계산
      };
    }),

  // 주식을 삭제하는 함수
  deleteStock: (stockCode, stockValue) =>
    set((state) => ({
      stockData: state.stockData.filter((stock) => stock.code !== stockCode),
      budget: state.budget - stockValue,
      principal: state.principal - stockValue,
      // profit와 profitRate는 calculateROR 함수에서 계산
    })),

  setFinancialData: (budget, principal, profit, profitRate) =>
    set({ budget, principal, profit, profitRate }),

  // 재무 데이터 업데이트 함수
  updateBudget: (amount: number) =>
    set((state) => ({ budget: state.budget + amount })),

  updatePrincipal: (amount: number) =>
    set((state) => ({ principal: state.principal + amount })),

  updateProfitLoss: (amount: number) =>
    set((state) => ({ profit: state.profit + amount })),

  updateROR: (newROR: number) => set((state) => ({ profitRate: newROR })),

  calculateROR: () =>
    set((state) => {
      const totalInvestment = state.stockData.reduce(
        (acc, stock) => acc + stock.quantity * stock.average,
        0
      );
      const totalCurrentValue = state.stockData.reduce(
        (acc, stock) =>
          acc + stock.quantity * stock.average * (1 + stock.profitRate / 100),
        0
      );
      const newROR =
        totalInvestment > 0
          ? ((totalCurrentValue - totalInvestment) / totalInvestment) * 100
          : 0;

      return { profitRate: newROR };
    }),
}));
