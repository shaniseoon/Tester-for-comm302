export interface IndexAsset {
  id: string;
  badge: string;
  badgeColor: string;
  badgeTextColor?: string;
  name: string;
  symbol: string;
  exchange: string;
  price: string;
  change: string;
  changePercent: string;
  isUp: boolean;
  sparklinePath: string;
  sparklineEndY: number;
  category: string;
  dayRange: [number, number];
  yearRange: [number, number];
  volume: string;
  open: string;
  prevClose: string;
}

export interface StockAsset {
  symbol: string;
  shortBadge: string;
  name: string;
  price: string;
  changePercent: string;
  changeValue: string;
  isUp: boolean;
  volume: string;
  marketCap: string;
  sector: string;
  peRatio: string;
  category: 'active' | 'gainers' | 'losers' | 'world' | 'etf';
  exchange: string;
}

export interface CryptoAsset {
  rank: number;
  name: string;
  symbol: string;
  pair: string;
  price: string;
  changePercent: string;
  isUp: boolean;
  isNeutral?: boolean;
  marketCap: string;
  volume24h: string;
  badgeBg?: string;
  badgeIcon?: string;
}

export interface MarketRowItem {
  name: string;
  subLabel: string;
  symbol: string;
  price: string;
  changePercent: string;
  isUp: boolean;
  category: 'futures' | 'forex' | 'bonds';
}

export interface EconomicEvent {
  id: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  flagColor: string;
  time: string;
  volatility: 'High Volatility' | 'Medium';
  title: string;
  actual: string;
  forecast: string;
  previous: string;
  actualPositive?: boolean;
  timeframe: 'today' | 'week';
}

export const BENCHMARK_INDICES: IndexAsset[] = [
  {
    id: 'spx',
    badge: '500',
    badgeColor: 'bg-market-down',
    name: 'S&P 500',
    symbol: 'SPX',
    exchange: 'S&P DJI',
    price: '5,864.67',
    change: '+24.12',
    changePercent: '+0.41%',
    isUp: true,
    sparklinePath: 'M 0,32 Q 20,28 35,30 T 60,18 T 85,12 L 100,6',
    sparklineEndY: 6,
    category: 'Indices',
    dayRange: [5838.12, 5871.40],
    yearRange: [4953.56, 5878.46],
    volume: '2.48B',
    open: '5,845.10',
    prevClose: '5,840.55',
  },
  {
    id: 'ndx',
    badge: '100',
    badgeColor: 'bg-market-index-blue',
    name: 'Nasdaq 100',
    symbol: 'NDX',
    exchange: 'NASDAQ',
    price: '20,534.20',
    change: '+167.40',
    changePercent: '+0.82%',
    isUp: true,
    sparklinePath: 'M 0,35 Q 25,30 45,22 T 75,14 L 100,4',
    sparklineEndY: 4,
    category: 'Indices',
    dayRange: [20380.50, 20568.90],
    yearRange: [16980.10, 20690.97],
    volume: '5.12B',
    open: '20,390.00',
    prevClose: '20,366.80',
  },
  {
    id: 'dji',
    badge: '30',
    badgeColor: 'bg-market-index-blue',
    name: 'Dow 30',
    symbol: 'DJI',
    exchange: 'S&P DJI',
    price: '42,310.15',
    change: '-63.50',
    changePercent: '-0.15%',
    isUp: false,
    sparklinePath: 'M 0,10 Q 30,12 50,22 T 80,30 L 100,34',
    sparklineEndY: 34,
    category: 'Indices',
    dayRange: [42260.00, 42415.80],
    yearRange: [37122.95, 43325.09],
    volume: '312.4M',
    open: '42,375.40',
    prevClose: '42,373.65',
  },
  {
    id: 'rut',
    badge: '2K',
    badgeColor: 'bg-surface-container-highest',
    badgeTextColor: 'text-text-primary',
    name: 'US 2000',
    symbol: 'RUT',
    exchange: 'FTSE Russell',
    price: '2,248.90',
    change: '+18.75',
    changePercent: '+0.84%',
    isUp: true,
    sparklinePath: 'M 0,28 Q 20,32 45,26 T 75,18 L 100,8',
    sparklineEndY: 8,
    category: 'Indices',
    dayRange: [2231.05, 2254.10],
    yearRange: [1901.25, 2300.15],
    volume: '1.14B',
    open: '2,232.00',
    prevClose: '2,230.15',
  },
];

export const FEATURED_TICKERS = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: '143.92', changePercent: '+3.18%', isUp: true },
  { symbol: 'AAPL', name: 'Apple Inc.', price: '234.85', changePercent: '+0.64%', isUp: true },
  { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: '210.35', changePercent: '+1.22%', isUp: true },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: '181.40', changePercent: '-0.42%', isUp: false },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: '260.48', changePercent: '+4.89%', isUp: true },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: '428.15', changePercent: '+0.21%', isUp: true },
];

export const US_STOCKS: StockAsset[] = [
  // Most Active
  {
    symbol: 'NVDA',
    shortBadge: 'NV',
    name: 'NVIDIA Corporation',
    price: '143.92',
    changePercent: '+3.18%',
    changeValue: '+4.43',
    isUp: true,
    volume: '68.42M',
    marketCap: '3.54 T',
    sector: 'Electronic Technology',
    peRatio: '56.4',
    category: 'active',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'MU',
    shortBadge: 'MU',
    name: 'Micron Technology, Inc.',
    price: '112.45',
    changePercent: '+5.60%',
    changeValue: '+5.96',
    isUp: true,
    volume: '52.18M',
    marketCap: '124.6 B',
    sector: 'Semiconductors',
    peRatio: '31.2',
    category: 'active',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'TSLA',
    shortBadge: 'T',
    name: 'Tesla, Inc.',
    price: '260.48',
    changePercent: '+4.89%',
    changeValue: '+12.14',
    isUp: true,
    volume: '49.91M',
    marketCap: '831.2 B',
    sector: 'Consumer Durables',
    peRatio: '71.8',
    category: 'active',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'META',
    shortBadge: 'M',
    name: 'Meta Platforms, Inc.',
    price: '594.12',
    changePercent: '+1.45%',
    changeValue: '+8.49',
    isUp: true,
    volume: '24.10M',
    marketCap: '1.50 T',
    sector: 'Technology Services',
    peRatio: '29.8',
    category: 'active',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'MSFT',
    shortBadge: 'MS',
    name: 'Microsoft Corporation',
    price: '428.15',
    changePercent: '-0.24%',
    changeValue: '-1.03',
    isUp: false,
    volume: '22.84M',
    marketCap: '3.18 T',
    sector: 'Technology Services',
    peRatio: '36.1',
    category: 'active',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'SNDK',
    shortBadge: 'SD',
    name: 'Sandisk Corporation',
    price: '76.30',
    changePercent: '+8.12%',
    changeValue: '+5.73',
    isUp: true,
    volume: '19.50M',
    marketCap: '15.8 B',
    sector: 'Electronic Technology',
    peRatio: '22.4',
    category: 'active',
    exchange: 'NASDAQ',
  },
  // Gainers
  {
    symbol: 'SMCI',
    shortBadge: 'SM',
    name: 'Super Micro Computer, Inc.',
    price: '48.90',
    changePercent: '+14.20%',
    changeValue: '+6.08',
    isUp: true,
    volume: '61.10M',
    marketCap: '28.6 B',
    sector: 'Computer Hardware',
    peRatio: '18.9',
    category: 'gainers',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'PLTR',
    shortBadge: 'PL',
    name: 'Palantir Technologies Inc.',
    price: '64.80',
    changePercent: '+9.45%',
    changeValue: '+5.59',
    isUp: true,
    volume: '74.30M',
    marketCap: '145.2 B',
    sector: 'Packaged Software',
    peRatio: '142.0',
    category: 'gainers',
    exchange: 'NYSE',
  },
  {
    symbol: 'SNDK',
    shortBadge: 'SD',
    name: 'Sandisk Corporation',
    price: '76.30',
    changePercent: '+8.12%',
    changeValue: '+5.73',
    isUp: true,
    volume: '19.50M',
    marketCap: '15.8 B',
    sector: 'Electronic Technology',
    peRatio: '22.4',
    category: 'gainers',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'COIN',
    shortBadge: 'CN',
    name: 'Coinbase Global, Inc.',
    price: '312.40',
    changePercent: '+6.40%',
    changeValue: '+18.79',
    isUp: true,
    volume: '18.95M',
    marketCap: '78.4 B',
    sector: 'Finance',
    peRatio: '41.5',
    category: 'gainers',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'MU',
    shortBadge: 'MU',
    name: 'Micron Technology, Inc.',
    price: '112.45',
    changePercent: '+5.60%',
    changeValue: '+5.96',
    isUp: true,
    volume: '52.18M',
    marketCap: '124.6 B',
    sector: 'Semiconductors',
    peRatio: '31.2',
    category: 'gainers',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'TSLA',
    shortBadge: 'T',
    name: 'Tesla, Inc.',
    price: '260.48',
    changePercent: '+4.89%',
    changeValue: '+12.14',
    isUp: true,
    volume: '49.91M',
    marketCap: '831.2 B',
    sector: 'Consumer Durables',
    peRatio: '71.8',
    category: 'gainers',
    exchange: 'NASDAQ',
  },
  // Losers
  {
    symbol: 'INTC',
    shortBadge: 'IN',
    name: 'Intel Corporation',
    price: '22.14',
    changePercent: '-4.65%',
    changeValue: '-1.08',
    isUp: false,
    volume: '44.20M',
    marketCap: '94.8 B',
    sector: 'Semiconductors',
    peRatio: '—',
    category: 'losers',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'NKE',
    shortBadge: 'NK',
    name: 'NIKE, Inc.',
    price: '75.80',
    changePercent: '-3.12%',
    changeValue: '-2.44',
    isUp: false,
    volume: '16.40M',
    marketCap: '113.2 B',
    sector: 'Apparel / Footwear',
    peRatio: '22.8',
    category: 'losers',
    exchange: 'NYSE',
  },
  {
    symbol: 'PFE',
    shortBadge: 'PF',
    name: 'Pfizer Inc.',
    price: '25.92',
    changePercent: '-2.18%',
    changeValue: '-0.58',
    isUp: false,
    volume: '31.05M',
    marketCap: '146.9 B',
    sector: 'Health Technology',
    peRatio: '34.1',
    category: 'losers',
    exchange: 'NYSE',
  },
  {
    symbol: 'BA',
    shortBadge: 'BA',
    name: 'The Boeing Company',
    price: '151.20',
    changePercent: '-1.85%',
    changeValue: '-2.85',
    isUp: false,
    volume: '12.75M',
    marketCap: '112.5 B',
    sector: 'Aerospace & Defense',
    peRatio: '—',
    category: 'losers',
    exchange: 'NYSE',
  },
  {
    symbol: 'CRWD',
    shortBadge: 'CR',
    name: 'CrowdStrike Holdings, Inc.',
    price: '348.60',
    changePercent: '-1.12%',
    changeValue: '-3.95',
    isUp: false,
    volume: '4.82M',
    marketCap: '85.4 B',
    sector: 'Packaged Software',
    peRatio: '88.2',
    category: 'losers',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'GOOGL',
    shortBadge: 'GO',
    name: 'Alphabet Inc.',
    price: '181.40',
    changePercent: '-0.42%',
    changeValue: '-0.76',
    isUp: false,
    volume: '21.30M',
    marketCap: '2.24 T',
    sector: 'Technology Services',
    peRatio: '24.6',
    category: 'losers',
    exchange: 'NASDAQ',
  },
];

export const COMMUNITY_TRENDS = [
  { symbol: 'AMD', name: 'Adv. Micro Devices', price: '156.40', changePercent: '+2.84%', isUp: true },
  { symbol: 'COIN', name: 'Coinbase Global', price: '312.40', changePercent: '+6.40%', isUp: true },
  { symbol: 'CRWD', name: 'CrowdStrike', price: '348.60', changePercent: '-1.12%', isUp: false },
  { symbol: 'AVGO', name: 'Broadcom Inc.', price: '178.90', changePercent: '+1.95%', isUp: true },
];

export const CRYPTO_RANKINGS: CryptoAsset[] = [
  {
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    pair: 'BTC/USD',
    price: '$96,420',
    changePercent: '+2.10%',
    isUp: true,
    marketCap: '1.67 T USD',
    volume24h: '48.2B',
    badgeBg: '#F7931A',
    badgeIcon: '₿',
  },
  {
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    pair: 'ETH/USD',
    price: '$2,780.45',
    changePercent: '+1.82%',
    isUp: true,
    marketCap: '324.77 B USD',
    volume24h: '22.9B',
    badgeBg: '#627EEA',
    badgeIcon: 'Ξ',
  },
  {
    rank: 3,
    name: 'Tether',
    symbol: 'USDT',
    pair: 'USDT/USD',
    price: '$1.00',
    changePercent: '+0.01%',
    isUp: true,
    isNeutral: true,
    marketCap: '183.73 B USD',
    volume24h: '64.1B',
  },
  {
    rank: 4,
    name: 'Solana',
    symbol: 'SOL',
    pair: 'SOL/USD',
    price: '$184.30',
    changePercent: '+5.42%',
    isUp: true,
    marketCap: '86.20 B USD',
    volume24h: '6.8B',
  },
  {
    rank: 5,
    name: 'XRP',
    symbol: 'XRP',
    pair: 'XRP/USD',
    price: '$1.64',
    changePercent: '-0.88%',
    isUp: false,
    marketCap: '93.38 B USD',
    volume24h: '4.5B',
  },
];

export const CRYPTO_GAINERS = [
  { name: 'Quant', pair: 'QNTUSD', price: '$118.40', changePercent: '+43.61%', isUp: true },
  { name: 'Hedera', pair: 'HBARUSD', price: '$0.184', changePercent: '+21.35%', isUp: true },
  { name: 'The Graph', pair: 'GRTUSD', price: '$0.268', changePercent: '+13.22%', isUp: true },
];

export const FUTURES_LIST: MarketRowItem[] = [
  { name: 'Gold', subLabel: 'GC1! • COMEX', symbol: 'GC1!', price: '2,746.30', changePercent: '+0.54%', isUp: true, category: 'futures' },
  { name: 'Silver', subLabel: 'SI1! • COMEX', symbol: 'SI1!', price: '32.18', changePercent: '+1.14%', isUp: true, category: 'futures' },
  { name: 'Light Crude Oil', subLabel: 'CL1! • NYMEX', symbol: 'CL1!', price: '69.24', changePercent: '-1.32%', isUp: false, category: 'futures' },
  { name: 'Natural Gas', subLabel: 'NG1! • NYMEX', symbol: 'NG1!', price: '2.814', changePercent: '+3.20%', isUp: true, category: 'futures' },
  { name: 'Coffee C', subLabel: 'KC1! • ICEUS', symbol: 'KC1!', price: '284.10', changePercent: '+2.45%', isUp: true, category: 'futures' },
];

export const FOREX_LIST: MarketRowItem[] = [
  { name: 'EUR / USD', subLabel: 'Euro / US Dollar', symbol: 'EURUSD', price: '1.0542', changePercent: '-0.18%', isUp: false, category: 'forex' },
  { name: 'USD / JPY', subLabel: 'US Dollar / Japanese Yen', symbol: 'USDJPY', price: '154.28', changePercent: '+0.32%', isUp: true, category: 'forex' },
  { name: 'GBP / USD', subLabel: 'British Pound / US Dollar', symbol: 'GBPUSD', price: '1.2614', changePercent: '-0.05%', isUp: false, category: 'forex' },
  { name: 'USD / CAD', subLabel: 'US Dollar / Canadian Dollar', symbol: 'USDCAD', price: '1.4021', changePercent: '+0.14%', isUp: true, category: 'forex' },
  { name: 'US Dollar Index', subLabel: 'DXY • TVC', symbol: 'DXY', price: '106.84', changePercent: '+0.22%', isUp: true, category: 'forex' },
];

export const BONDS_LIST: MarketRowItem[] = [
  { name: 'US 10Y Yield', subLabel: 'US10Y • Benchmark', symbol: 'US10Y', price: '4.494%', changePercent: '-0.02%', isUp: false, category: 'bonds' },
  { name: 'US 2Y Yield', subLabel: 'US02Y • Short Term', symbol: 'US02Y', price: '4.321%', changePercent: '-0.04%', isUp: false, category: 'bonds' },
  { name: 'US 30Y Yield', subLabel: 'US30Y • Long Term', symbol: 'US30Y', price: '4.682%', changePercent: '+0.01%', isUp: true, category: 'bonds' },
  { name: 'DE 10Y Bund', subLabel: 'Germany 10 Year', symbol: 'DE10Y', price: '2.348%', changePercent: '-0.03%', isUp: false, category: 'bonds' },
  { name: 'UK 10Y Gilt', subLabel: 'United Kingdom 10Y', symbol: 'GB10Y', price: '4.421%', changePercent: '+0.02%', isUp: true, category: 'bonds' },
];

export const ECONOMIC_EVENTS: EconomicEvent[] = [
  {
    id: 'pce',
    currency: 'USD',
    flagColor: 'bg-red-600',
    time: '13:30',
    volatility: 'High Volatility',
    title: 'Core PCE Price Index (MoM)',
    actual: '0.3%',
    forecast: '0.3%',
    previous: '0.2%',
    actualPositive: true,
    timeframe: 'today',
  },
  {
    id: 'pmi',
    currency: 'EUR',
    flagColor: 'bg-blue-600',
    time: '10:00',
    volatility: 'Medium',
    title: 'HCOB Eurozone Manufacturing PMI',
    actual: '45.8',
    forecast: '45.2',
    previous: '44.8',
    actualPositive: true,
    timeframe: 'today',
  },
  {
    id: 'ism',
    currency: 'USD',
    flagColor: 'bg-red-600',
    time: '15:00',
    volatility: 'High Volatility',
    title: 'ISM Manufacturing Employment',
    actual: '—',
    forecast: '46.0',
    previous: '44.4',
    actualPositive: false,
    timeframe: 'today',
  },
  {
    id: 'nfp',
    currency: 'USD',
    flagColor: 'bg-red-600',
    time: 'Fri 13:30',
    volatility: 'High Volatility',
    title: 'Nonfarm Payrolls (NFP)',
    actual: '216K',
    forecast: '185K',
    previous: '175K',
    actualPositive: true,
    timeframe: 'week',
  },
  {
    id: 'ecb',
    currency: 'EUR',
    flagColor: 'bg-blue-600',
    time: 'Thu 12:15',
    volatility: 'High Volatility',
    title: 'ECB Interest Rate Decision',
    actual: '3.25%',
    forecast: '3.25%',
    previous: '3.50%',
    actualPositive: true,
    timeframe: 'week',
  },
  {
    id: 'gdp',
    currency: 'USD',
    flagColor: 'bg-red-600',
    time: 'Wed 13:30',
    volatility: 'Medium',
    title: 'US GDP Growth Rate (QoQ) Prelim',
    actual: '2.8%',
    forecast: '2.7%',
    previous: '3.0%',
    actualPositive: true,
    timeframe: 'week',
  },
];

export const WORLD_STOCKS: StockAsset[] = [
  {
    symbol: 'TSM',
    shortBadge: 'TS',
    name: 'Taiwan Semiconductor Mfg.',
    price: '192.40',
    changePercent: '+3.85%',
    changeValue: '+7.13',
    isUp: true,
    volume: '18.42M',
    marketCap: '997.8 B',
    sector: 'Semiconductors',
    peRatio: '29.4',
    category: 'world',
    exchange: 'TWSE / NYSE',
  },
  {
    symbol: 'ASML',
    shortBadge: 'AS',
    name: 'ASML Holding N.V.',
    price: '714.80',
    changePercent: '+2.12%',
    changeValue: '+14.84',
    isUp: true,
    volume: '2.18M',
    marketCap: '281.4 B',
    sector: 'Electronic Technology',
    peRatio: '37.8',
    category: 'world',
    exchange: 'EURONEXT',
  },
  {
    symbol: 'NOVO',
    shortBadge: 'NV',
    name: 'Novo Nordisk A/S',
    price: '108.65',
    changePercent: '-0.84%',
    changeValue: '-0.92',
    isUp: false,
    volume: '4.91M',
    marketCap: '482.1 B',
    sector: 'Health Technology',
    peRatio: '34.5',
    category: 'world',
    exchange: 'OMXC',
  },
  {
    symbol: 'SAP',
    shortBadge: 'SA',
    name: 'SAP SE',
    price: '238.10',
    changePercent: '+1.64%',
    changeValue: '+3.84',
    isUp: true,
    volume: '1.85M',
    marketCap: '278.5 B',
    sector: 'Packaged Software',
    peRatio: '44.2',
    category: 'world',
    exchange: 'XETRA',
  },
];

export const ETF_LIST: StockAsset[] = [
  {
    symbol: 'SPY',
    shortBadge: 'SP',
    name: 'SPDR S&P 500 ETF Trust',
    price: '584.90',
    changePercent: '+0.42%',
    changeValue: '+2.45',
    isUp: true,
    volume: '41.20M',
    marketCap: '618.4 B',
    sector: 'Broad Market ETF',
    peRatio: '27.8',
    category: 'etf',
    exchange: 'NYSE ARCA',
  },
  {
    symbol: 'QQQ',
    shortBadge: 'QQ',
    name: 'Invesco QQQ Trust Series 1',
    price: '499.80',
    changePercent: '+0.83%',
    changeValue: '+4.11',
    isUp: true,
    volume: '29.85M',
    marketCap: '302.1 B',
    sector: 'Tech / Nasdaq ETF',
    peRatio: '33.4',
    category: 'etf',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'SOXX',
    shortBadge: 'SX',
    name: 'iShares Semiconductor ETF',
    price: '231.45',
    changePercent: '+2.95%',
    changeValue: '+6.63',
    isUp: true,
    volume: '5.12M',
    marketCap: '14.9 B',
    sector: 'Semiconductor ETF',
    peRatio: '39.1',
    category: 'etf',
    exchange: 'NASDAQ',
  },
  {
    symbol: 'TLT',
    shortBadge: 'TL',
    name: 'iShares 20+ Year Treasury Bond ETF',
    price: '91.24',
    changePercent: '-0.38%',
    changeValue: '-0.35',
    isUp: false,
    volume: '34.60M',
    marketCap: '54.2 B',
    sector: 'Fixed Income ETF',
    peRatio: '—',
    category: 'etf',
    exchange: 'NASDAQ',
  },
];

export const CATEGORIES = [
  'Indices',
  'US stocks',
  'World stocks',
  'Crypto',
  'Futures',
  'Forex',
  'Bonds',
  'ETFs',
  'Economy',
] as const;

export type MarketCategory = (typeof CATEGORIES)[number];
