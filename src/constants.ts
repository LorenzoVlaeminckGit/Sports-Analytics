import { 
  Calculator, 
  TrendingUp, 
  BarChart3, 
  Wallet, 
  LineChart, 
  Network, 
  FileText, 
  Activity, 
  Stethoscope, 
  CloudRain, 
  ScanSearch, 
  Dices, 
  BookOpen, 
  LayoutDashboard,
  User
} from 'lucide-react';

export const MODULES = [
  { id: 'documentation', name: 'Operator Manual', icon: BookOpen, category: 'Overview', type: 'component' },
  { id: 'dashboard', name: 'KPI Dashboard', icon: LayoutDashboard, category: 'Overview', type: 'component' },
  { id: 'odds-comparison', name: 'Odds Comparison Engine', icon: BarChart3, category: 'Market', type: 'component' },
  { id: 'line-movement', name: 'Line Movement Tracker', icon: TrendingUp, category: 'Market', type: 'component' },
  { id: 'ev-calculator', name: 'Expected Value Calculator', icon: Calculator, category: 'Quant', type: 'component' },
  { id: 'bankroll-manager', name: 'Bankroll Exposure Manager', icon: Wallet, category: 'Risk', type: 'component' },
  { id: 'clv-tracker', name: 'CLV Tracker', icon: LineChart, category: 'Evaluation', type: 'component' },
  { id: 'multi-model', name: 'Multi-Model Estimator', icon: Network, category: 'Quant', type: 'component' },
  { id: 'game-analysis', name: 'Game Analysis Generator', icon: FileText, category: 'Reports', type: 'ai' },
  { id: 'trend-analyzer', name: 'Trend Analyzer', icon: Activity, category: 'Reports', type: 'ai' },
  { id: 'injury-impact', name: 'Injury Impact Analyzer', icon: Stethoscope, category: 'Reports', type: 'ai' },
  { id: 'weather-impact', name: 'Weather Impact Analyzer', icon: CloudRain, category: 'Reports', type: 'ai' },
  { id: 'market-efficiency', name: 'Market Efficiency Scanner', icon: ScanSearch, category: 'Market', type: 'ai' },
  { id: 'variance-simulator', name: 'Variance Simulator', icon: Dices, category: 'Risk', type: 'component' },
  { id: 'decision-log', name: 'Decision Log Generator', icon: BookOpen, category: 'Evaluation', type: 'component' },
  { id: 'about', name: 'About Lorenzo', icon: User, category: 'Admin', type: 'component' }
];

export const CATEGORIES = ['Overview', 'Market', 'Quant', 'Risk', 'Reports', 'Evaluation', 'Admin'];
