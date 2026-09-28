import React, { useState, useEffect, useMemo } from 'react';
import {
  BENCHMARK_INDICES,
  FEATURED_TICKERS,
  US_STOCKS,
  COMMUNITY_TRENDS,
  CRYPTO_RANKINGS,
  CRYPTO_GAINERS,
  FUTURES_LIST,
  FOREX_LIST,
  BONDS_LIST,
  ECONOMIC_EVENTS,
  WORLD_STOCKS,
  ETF_LIST,
  CATEGORIES,
  MarketCategory,
} from './data/marketData';

interface SelectedInstrument {
  symbol: string;
  name: string;
  price: string;
  changePercent: string;
  isUp: boolean;
  exchange?: string;
  category?: string;
}

export default function App() {
  const [activeNav, setActiveNav] = useState<'Products' | 'Community' | 'Markets' | 'Brokers' | 'More'>('Markets');
  const [activeCategory, setActiveCategory] = useState<MarketCategory>('Indices');
  const [stockFilter, setStockFilter] = useState<'active' | 'gainers' | 'losers'>('active');
  const [calendarFilter, setCalendarFilter] = useState<'high' | 'today' | 'week'>('high');
  const [watchlist, setWatchlist] = useState<string[]>(['spx', 'NVDA', 'BTC']);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAsset, setSelectedAsset] = useState<SelectedInstrument | null>(null);
  const [chartTimeframe, setChartTimeframe] = useState<'1D' | '1W' | '1M' | '1Y' | 'ALL'>('1D');
  const [isScreenerOpen, setIsScreenerOpen] = useState(false);
  const [screenerSector, setScreenerSector] = useState<string>('All');
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState('Global Markets');
  const [isGetStartedOpen, setIsGetStartedOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'DE' | 'JP' | 'FR'>('EN');

  // Keyboard shortcut Ctrl+K or Cmd+K for Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSelectedAsset(null);
        setIsScreenerOpen(false);
        setIsRegionDropdownOpen(false);
        setIsGetStartedOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleWatchlist = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWatchlist((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const filteredStocks = useMemo(() => {
    if (activeCategory === 'World stocks') return WORLD_STOCKS;
    if (activeCategory === 'ETFs') return ETF_LIST;
    return US_STOCKS.filter((s) => s.category === stockFilter);
  }, [activeCategory, stockFilter]);

  const filteredEvents = useMemo(() => {
    if (calendarFilter === 'high') {
      return ECONOMIC_EVENTS.filter((e) => e.volatility === 'High Volatility').slice(0, 3);
    }
    if (calendarFilter === 'today') {
      return ECONOMIC_EVENTS.filter((e) => e.timeframe === 'today');
    }
    return ECONOMIC_EVENTS.slice(0, 3);
  }, [calendarFilter]);

  const allSearchableInstruments: SelectedInstrument[] = useMemo(() => {
    const items: SelectedInstrument[] = [
      ...BENCHMARK_INDICES.map((i) => ({
        symbol: i.symbol,
        name: i.name,
        price: i.price,
        changePercent: i.changePercent,
        isUp: i.isUp,
        exchange: i.exchange,
        category: 'Index',
      })),
      ...US_STOCKS.filter((s, idx, arr) => arr.findIndex((x) => x.symbol === s.symbol) === idx).map((s) => ({
        symbol: s.symbol,
        name: s.name,
        price: s.price,
        changePercent: s.changePercent,
        isUp: s.isUp,
        exchange: s.exchange,
        category: 'US Stock',
      })),
      ...CRYPTO_RANKINGS.map((c) => ({
        symbol: c.pair,
        name: c.name,
        price: c.price,
        changePercent: c.changePercent,
        isUp: c.isUp,
        exchange: 'CRYPTO',
        category: 'Crypto',
      })),
      ...FUTURES_LIST.map((f) => ({
        symbol: f.symbol,
        name: f.name,
        price: f.price,
        changePercent: f.changePercent,
        isUp: f.isUp,
        exchange: f.subLabel,
        category: 'Futures',
      })),
      ...FOREX_LIST.map((fx) => ({
        symbol: fx.symbol,
        name: fx.name,
        price: fx.price,
        changePercent: fx.changePercent,
        isUp: fx.isUp,
        exchange: 'FX',
        category: 'Forex',
      })),
    ];
    if (!searchQuery.trim()) return items.slice(0, 10);
    const q = searchQuery.toLowerCase();
    return items.filter(
      (item) =>
        item.symbol.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        (item.category && item.category.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const handleCategorySelect = (cat: MarketCategory) => {
    setActiveCategory(cat);
    const sectionMap: Record<MarketCategory, string> = {
      Indices: 'section-indices',
      'US stocks': 'section-stocks-crypto',
      'World stocks': 'section-stocks-crypto',
      Crypto: 'section-stocks-crypto',
      Futures: 'section-matrix',
      Forex: 'section-matrix',
      Bonds: 'section-matrix',
      ETFs: 'section-stocks-crypto',
      Economy: 'section-economy',
    };
    const targetId = sectionMap[cat];
    const el = document.getElementById(targetId);
    if (el && cat !== 'Indices') {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-surface-canvas text-on-surface font-body-md text-body-md min-h-screen flex flex-col">
      {/* Global Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-surface-canvas/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full max-w-[1440px] mx-auto px-gutter-desktop flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-lg flex-1 min-w-0">
            <a
              className="flex items-center gap-space-xs text-text-primary select-none flex-shrink-0"
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              aria-label="TradingView Home"
            >
              <div className="w-9 h-9 rounded-full bg-on-background flex items-center justify-center">
                <span className="font-ticker text-ticker text-surface-canvas tracking-tighter">TV</span>
              </div>
            </a>

            {/* Search Bar Trigger */}
            <div className="relative max-w-xs w-full hidden md:block">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="h-10 w-full bg-surface-subtle hover:bg-surface-container-high/50 rounded-full flex items-center px-space-base transition-colors cursor-pointer text-left"
              >
                <span className="material-symbols-outlined text-text-secondary text-[20px] mr-space-sm">search</span>
                <span className="font-label-md text-label-md text-text-secondary flex-1 truncate">
                  Search (Ctrl+K)
                </span>
                <span className="font-badge text-badge bg-surface-canvas text-text-secondary px-space-xs py-space-2xs rounded border border-border-base">
                  ⌘K
                </span>
              </button>
            </div>

            {/* Primary Navigation */}
            <nav className="hidden xl:flex items-center gap-space-lg">
              {(['Products', 'Community', 'Markets', 'Brokers', 'More'] as const).map((item) => {
                const isActive = activeNav === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setActiveNav(item);
                      if (item === 'Products') {
                        setSelectedAsset({
                          symbol: 'SPX',
                          name: 'S&P 500 Superchart',
                          price: '5,864.67',
                          changePercent: '+0.41%',
                          isUp: true,
                          exchange: 'S&P DJI',
                          category: 'Index',
                        });
                      } else if (item === 'Community') {
                        document.getElementById('section-community-banner')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (item === 'Brokers' || item === 'More') {
                        setIsScreenerOpen(true);
                      }
                    }}
                    className={
                      isActive
                        ? "transition-colors py-space-sm text-text-primary font-title-md relative after:content-[''] after:absolute after:-bottom-[21px] after:left-0 after:right-0 after:h-[2px] after:bg-primary-container whitespace-nowrap cursor-pointer"
                        : 'font-label-md text-label-md text-text-secondary hover:text-text-primary transition-colors py-space-sm whitespace-nowrap cursor-pointer'
                    }
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-space-md flex-shrink-0">
            <button
              onClick={() =>
                setLanguage((prev) => (prev === 'EN' ? 'DE' : prev === 'DE' ? 'JP' : prev === 'JP' ? 'FR' : 'EN'))
              }
              className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-full hover:bg-surface-subtle text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
              type="button"
              title="Switch Display Language"
            >
              <span className="material-symbols-outlined text-[20px]">language</span>
              <span className="font-label-sm text-label-sm uppercase">{language}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsGetStartedOpen(true)}
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
              aria-label="Account Profile"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </button>
            <button
              type="button"
              onClick={() => setIsGetStartedOpen(true)}
              className="h-10 px-space-lg rounded-full bg-gradient-to-r from-primary-container to-cta-gradient-end text-on-primary font-label-md text-label-md flex items-center justify-center shadow-sm hover:opacity-95 transition-opacity whitespace-nowrap cursor-pointer"
            >
              Get started
            </button>
          </div>
        </div>

        {/* Sub-header Category Filter Strip */}
        <div className="h-11 w-full bg-surface-canvas shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
          <div className="h-full w-full max-w-[1440px] mx-auto px-gutter-desktop flex items-center overflow-x-auto no-scrollbar">
            <nav className="flex items-center gap-space-xs flex-nowrap py-space-2xs">
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategorySelect(category)}
                    className={
                      isActive
                        ? 'px-space-md py-space-xs rounded-full transition-all whitespace-nowrap bg-on-background text-on-primary font-label-md text-label-md cursor-pointer'
                        : 'px-space-md py-space-xs rounded-full font-label-md text-label-md text-text-secondary hover:text-text-primary hover:bg-surface-subtle transition-all whitespace-nowrap cursor-pointer'
                    }
                  >
                    {category}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="top" className="w-full pt-[108px] bg-surface-canvas flex-1">
        <div className="flex flex-col w-full">
          {/* Top Center Headline & Category Navigator */}
          <section className="w-full max-w-[1440px] mx-auto px-gutter-desktop pt-8 pb-4">
            <div className="flex flex-col items-center justify-center text-center relative">
              {/* "Markets, everywhere" Dropdown Header */}
              <div className="relative">
                <button
                  onClick={() => setIsRegionDropdownOpen((prev) => !prev)}
                  className="group inline-flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
                  type="button"
                >
                  <h1 className="font-display-hero text-display-hero text-text-primary tracking-tight font-extrabold flex items-center gap-3">
                    <span>
                      {selectedRegion === 'Global Markets' ? 'Markets, everywhere' : `Markets, ${selectedRegion}`}
                    </span>
                    <span className="material-symbols-outlined text-[36px] text-text-primary group-hover:translate-y-0.5 transition-transform">
                      expand_more
                    </span>
                  </h1>
                </button>

                {isRegionDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-surface-canvas rounded-xl border border-border-base shadow-[0_12px_32px_rgba(19,23,34,0.12)] py-2 z-30 text-left">
                    {['Global Markets', 'North America', 'Europe & UK', 'Asia-Pacific', 'Emerging Markets'].map(
                      (region) => (
                        <button
                          key={region}
                          type="button"
                          onClick={() => {
                            setSelectedRegion(region);
                            setIsRegionDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-label-md font-label-md text-text-primary hover:bg-surface-subtle flex items-center justify-between transition-colors cursor-pointer"
                        >
                          <span>{region}</span>
                          {selectedRegion === region && (
                            <span className="material-symbols-outlined text-[18px] text-primary">check</span>
                          )}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* Category Filter Pills (Matches Image & Web Nav) */}
              <div className="flex items-center justify-center flex-wrap gap-2 mt-6 max-w-4xl">
                {CATEGORIES.map((category) => {
                  const isActive = activeCategory === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategorySelect(category)}
                      className={
                        isActive
                          ? 'px-4 py-1.5 rounded-full bg-on-background text-on-primary font-label-md text-label-md shadow-sm whitespace-nowrap cursor-pointer'
                          : 'px-4 py-1.5 rounded-full bg-surface-subtle hover:bg-surface-container text-text-secondary hover:text-text-primary font-label-md text-label-md transition-colors whitespace-nowrap cursor-pointer'
                      }
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Benchmark Indices Top Row */}
          <section id="section-indices" className="w-full max-w-[1440px] mx-auto px-gutter-desktop mt-4 mb-10">
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={() => setIsScreenerOpen(true)}
                className="inline-flex items-center gap-1 group font-headline-lg text-headline-lg text-text-primary hover:text-primary transition-colors cursor-pointer"
              >
                <span>Indices</span>
                <span className="material-symbols-outlined text-[28px] group-hover:translate-x-1 transition-transform">
                  chevron_right
                </span>
              </button>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-text-secondary uppercase tracking-wider">
                  Regular session
                </span>
                <span className="w-2 h-2 rounded-full bg-market-up animate-pulse"></span>
              </div>
            </div>

            {/* Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {BENCHMARK_INDICES.map((idx) => {
                const isStarred = watchlist.includes(idx.id);
                return (
                  <div
                    key={idx.id}
                    onClick={() =>
                      setSelectedAsset({
                        symbol: idx.symbol,
                        name: idx.name,
                        price: idx.price,
                        changePercent: idx.changePercent,
                        isUp: idx.isUp,
                        exchange: idx.exchange,
                        category: 'Index',
                      })
                    }
                    className="bg-surface-subtle hover:bg-surface-hover rounded-xl p-4 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full ${idx.badgeColor} ${
                            idx.badgeTextColor || 'text-on-primary'
                          } flex items-center justify-center font-badge text-badge font-bold shadow-sm`}
                        >
                          {idx.badge}
                        </div>
                        <div>
                          <div className="font-title-md text-title-md text-text-primary leading-tight">{idx.name}</div>
                          <div className="font-body-sm text-body-sm text-text-secondary">
                            {idx.symbol} • {idx.exchange}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleWatchlist(idx.id, e)}
                        className="p-1 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                        aria-label={`Bookmark ${idx.name}`}
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] ${
                            isStarred ? 'text-amber-500 material-symbols-filled' : 'text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          star
                        </span>
                      </button>
                    </div>

                    <div className="flex items-end justify-between mt-4">
                      <div>
                        <div className="font-headline-md text-headline-md text-text-primary tabular-nums">
                          {idx.price}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span
                            className={`font-numeric-table text-numeric-table font-semibold ${
                              idx.isUp ? 'text-market-up' : 'text-market-down'
                            }`}
                          >
                            {idx.change}
                          </span>
                          <span
                            className={`px-1.5 py-0.5 rounded font-numeric-table text-numeric-table font-semibold ${
                              idx.isUp ? 'bg-market-up/10 text-market-up' : 'bg-market-down/10 text-market-down'
                            }`}
                          >
                            {idx.changePercent}
                          </span>
                        </div>
                      </div>

                      {/* Sparkline */}
                      <svg
                        className={`w-24 h-10 stroke-current fill-none overflow-visible ${
                          idx.isUp ? 'text-market-up' : 'text-market-down'
                        }`}
                        viewBox="0 0 100 40"
                      >
                        <path d={idx.sparklinePath} strokeLinecap="round" strokeWidth="2" />
                        <circle
                          className={idx.isUp ? 'fill-market-up' : 'fill-market-down'}
                          cx="100"
                          cy={idx.sparklineEndY}
                          r="3"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Main Multi-Column Section: US Stocks + Crypto Market Cap */}
          <section id="section-stocks-crypto" className="w-full max-w-[1440px] mx-auto px-gutter-desktop py-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: US Stocks & Market Movers (7 cols) */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setIsScreenerOpen(true)}
                    className="inline-flex items-center gap-1 group font-headline-md text-headline-md text-text-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>
                      {activeCategory === 'World stocks'
                        ? 'World stocks'
                        : activeCategory === 'ETFs'
                        ? 'ETFs'
                        : 'US stocks'}
                    </span>
                    <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1 transition-transform">
                      chevron_right
                    </span>
                  </button>

                  {/* Quick filters */}
                  <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded-full">
                    {(
                      [
                        { id: 'active', label: 'Most Active' },
                        { id: 'gainers', label: 'Gainers' },
                        { id: 'losers', label: 'Losers' },
                      ] as const
                    ).map((tab) => {
                      const isTabActive = stockFilter === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => {
                            setStockFilter(tab.id);
                            if (activeCategory === 'World stocks' || activeCategory === 'ETFs') {
                              setActiveCategory('US stocks');
                            }
                          }}
                          className={
                            isTabActive
                              ? 'px-3 py-1 rounded-full bg-surface-canvas font-label-sm text-label-sm text-text-primary shadow-xs whitespace-nowrap cursor-pointer'
                              : 'px-3 py-1 rounded-full hover:bg-surface-canvas/60 font-label-sm text-label-sm text-text-secondary transition-colors whitespace-nowrap cursor-pointer'
                          }
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Featured Tickers Quick Access Row */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {FEATURED_TICKERS.map((t) => (
                    <button
                      key={t.symbol}
                      type="button"
                      onClick={() =>
                        setSelectedAsset({
                          symbol: t.symbol,
                          name: t.name,
                          price: t.price,
                          changePercent: t.changePercent,
                          isUp: t.isUp,
                          exchange: 'NASDAQ',
                          category: 'US Stock',
                        })
                      }
                      className="bg-surface-subtle hover:bg-surface-hover p-2.5 rounded-lg text-center cursor-pointer transition-colors shadow-xs"
                    >
                      <div className="font-ticker text-ticker text-text-primary">{t.symbol}</div>
                      <div
                        className={`font-numeric-table text-numeric-table font-semibold ${
                          t.isUp ? 'text-market-up' : 'text-market-down'
                        }`}
                      >
                        {t.changePercent}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Highest Volume Stocks Table */}
                <div className="bg-surface-subtle/60 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <span className="font-title-md text-title-md text-text-primary">
                      {activeCategory === 'World stocks'
                        ? 'Global benchmark equities'
                        : activeCategory === 'ETFs'
                        ? 'Top traded ETFs'
                        : stockFilter === 'gainers'
                        ? 'Top gaining stocks'
                        : stockFilter === 'losers'
                        ? 'Top losing stocks'
                        : 'Highest volume stocks'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsScreenerOpen(true)}
                      className="font-label-sm text-label-sm text-primary hover:underline flex items-center cursor-pointer"
                    >
                      See all active <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-text-secondary font-badge text-badge uppercase border-b-0">
                          <th className="py-2.5 px-3">Symbol</th>
                          <th className="py-2.5 px-3 text-right">Price (USD)</th>
                          <th className="py-2.5 px-3 text-right">Change %</th>
                          <th className="py-2.5 px-3 text-right">Volume</th>
                          <th className="py-2.5 px-3 text-right hidden sm:table-cell">Market Cap</th>
                        </tr>
                      </thead>
                      <tbody className="font-numeric-table text-numeric-table divide-y-0">
                        {filteredStocks.map((stock) => (
                          <tr
                            key={`${stock.category}-${stock.symbol}`}
                            onClick={() =>
                              setSelectedAsset({
                                symbol: stock.symbol,
                                name: stock.name,
                                price: stock.price,
                                changePercent: stock.changePercent,
                                isUp: stock.isUp,
                                exchange: stock.exchange,
                                category: 'Stock',
                              })
                            }
                            className="hover:bg-surface-hover rounded-lg transition-colors cursor-pointer group"
                          >
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-text-primary text-[10px]">
                                  {stock.shortBadge}
                                </div>
                                <div>
                                  <div className="font-ticker text-ticker text-text-primary group-hover:text-primary transition-colors">
                                    {stock.symbol}
                                  </div>
                                  <div className="font-body-sm text-body-sm text-text-secondary truncate max-w-[140px]">
                                    {stock.name}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right font-semibold text-text-primary">{stock.price}</td>
                            <td
                              className={`py-3 px-3 text-right font-semibold ${
                                stock.isUp ? 'text-market-up' : 'text-market-down'
                              }`}
                            >
                              {stock.changePercent}
                            </td>
                            <td className="py-3 px-3 text-right text-text-secondary">{stock.volume}</td>
                            <td className="py-3 px-3 text-right text-text-primary hidden sm:table-cell">
                              {stock.marketCap}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Community Trends Mini List */}
                <div className="bg-surface-subtle/60 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <span className="font-title-md text-title-md text-text-primary">Community trends</span>
                    <span className="font-label-sm text-label-sm text-text-secondary">Updated 2m ago</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {COMMUNITY_TRENDS.map((item) => (
                      <div
                        key={item.symbol}
                        onClick={() =>
                          setSelectedAsset({
                            symbol: item.symbol,
                            name: item.name,
                            price: item.price,
                            changePercent: item.changePercent,
                            isUp: item.isUp,
                            exchange: 'NASDAQ',
                            category: 'Trending Stock',
                          })
                        }
                        className="p-2.5 rounded-lg bg-surface-canvas hover:bg-surface-hover cursor-pointer transition-colors"
                      >
                        <div className="font-ticker text-ticker text-text-primary">{item.symbol}</div>
                        <div className="font-body-sm text-body-sm text-text-secondary truncate">{item.name}</div>
                        <div
                          className={`font-numeric-table text-numeric-table font-semibold mt-1 ${
                            item.isUp ? 'text-market-up' : 'text-market-down'
                          }`}
                        >
                          {item.changePercent}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Crypto & Top Gainers (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('Crypto')}
                    className="inline-flex items-center gap-1 group font-headline-md text-headline-md text-text-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>Crypto</span>
                    <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1 transition-transform">
                      chevron_right
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsScreenerOpen(true)}
                    className="font-label-sm text-label-sm text-primary hover:underline cursor-pointer"
                  >
                    See all coins
                  </button>
                </div>

                {/* Featured Crypto Hero Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() =>
                      setSelectedAsset({
                        symbol: 'BTC/USD',
                        name: 'Bitcoin',
                        price: '$96,420.00',
                        changePercent: '+2.10%',
                        isUp: true,
                        exchange: 'COINBASE',
                        category: 'Crypto',
                      })
                    }
                    className="bg-surface-subtle hover:bg-surface-hover p-4 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#F7931A] text-on-primary flex items-center justify-center font-bold text-[11px]">
                          ₿
                        </div>
                        <span className="font-ticker text-ticker text-text-primary">BTC/USD</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-market-up/10 text-market-up font-numeric-table text-numeric-table font-bold">
                        +2.1%
                      </span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-text-primary tabular-nums">$96,420.00</div>
                    <div className="font-body-sm text-body-sm text-text-secondary mt-1">Cap: 1.67 TUSD</div>
                  </div>

                  <div
                    onClick={() =>
                      setSelectedAsset({
                        symbol: 'ETH/USD',
                        name: 'Ethereum',
                        price: '$2,780.45',
                        changePercent: '+1.82%',
                        isUp: true,
                        exchange: 'COINBASE',
                        category: 'Crypto',
                      })
                    }
                    className="bg-surface-subtle hover:bg-surface-hover p-4 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#627EEA] text-on-primary flex items-center justify-center font-bold text-[11px]">
                          Ξ
                        </div>
                        <span className="font-ticker text-ticker text-text-primary">ETH/USD</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded bg-market-up/10 text-market-up font-numeric-table text-numeric-table font-bold">
                        +1.8%
                      </span>
                    </div>
                    <div className="font-headline-sm text-headline-sm text-text-primary tabular-nums">$2,780.45</div>
                    <div className="font-body-sm text-body-sm text-text-secondary mt-1">Cap: 324.7 BUSD</div>
                  </div>
                </div>

                {/* Crypto Market Cap Ranking List */}
                <div className="bg-surface-subtle/60 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <span className="font-title-md text-title-md text-text-primary">Crypto market cap ranking</span>
                    <span className="font-body-sm text-body-sm text-text-secondary">24h volume</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {CRYPTO_RANKINGS.map((coin) => (
                      <div
                        key={coin.symbol}
                        onClick={() =>
                          setSelectedAsset({
                            symbol: coin.pair,
                            name: coin.name,
                            price: coin.price,
                            changePercent: coin.changePercent,
                            isUp: coin.isUp,
                            exchange: 'CRYPTO',
                            category: 'Crypto',
                          })
                        }
                        className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-numeric-table text-numeric-table text-text-secondary w-4">
                            {coin.rank}
                          </span>
                          <div>
                            <div className="font-ticker text-ticker text-text-primary">
                              {coin.name}{' '}
                              <span className="text-text-secondary font-normal text-body-sm">{coin.symbol}</span>
                            </div>
                            <div className="font-body-sm text-body-sm text-text-secondary">{coin.marketCap}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-numeric-table text-numeric-table font-semibold text-text-primary">
                            {coin.price}
                          </div>
                          <div
                            className={`font-numeric-table text-numeric-table font-semibold ${
                              coin.isNeutral
                                ? 'text-text-secondary'
                                : coin.isUp
                                ? 'text-market-up'
                                : 'text-market-down'
                            }`}
                          >
                            {coin.changePercent}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Crypto Gainers Module */}
                <div className="bg-surface-subtle/60 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3 px-2">
                    <span className="font-title-md text-title-md text-text-primary">Crypto gainers</span>
                    <span className="px-2 py-0.5 rounded-full bg-market-up/10 text-market-up font-label-sm text-label-sm font-semibold">
                      24h Gainers
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {CRYPTO_GAINERS.map((gainer) => (
                      <div
                        key={gainer.pair}
                        onClick={() =>
                          setSelectedAsset({
                            symbol: gainer.pair,
                            name: gainer.name,
                            price: gainer.price,
                            changePercent: gainer.changePercent,
                            isUp: gainer.isUp,
                            exchange: 'BINANCE',
                            category: 'Crypto Gainer',
                          })
                        }
                        className="p-3 rounded-lg bg-surface-canvas hover:bg-surface-hover transition-all cursor-pointer"
                      >
                        <div className="font-ticker text-ticker text-text-primary">{gainer.name}</div>
                        <div className="font-body-sm text-body-sm text-text-secondary">{gainer.pair}</div>
                        <div className="font-title-md text-title-md font-bold text-market-up mt-2 tabular-nums">
                          {gainer.changePercent}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Split Matrix: Futures, Commodities & Forex */}
          <section id="section-matrix" className="w-full max-w-[1440px] mx-auto px-gutter-desktop py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Column 1: Futures & Commodities */}
              <div className="bg-surface-subtle/60 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={() => handleCategorySelect('Futures')}
                      className="inline-flex items-center gap-1 group font-headline-sm text-headline-sm text-text-primary hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>Futures & Commodities</span>
                      <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                        chevron_right
                      </span>
                    </button>
                    <span className="material-symbols-outlined text-text-secondary text-[20px]">oil_barrel</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {FUTURES_LIST.map((item) => (
                      <div
                        key={item.symbol}
                        onClick={() =>
                          setSelectedAsset({
                            symbol: item.symbol,
                            name: item.name,
                            price: item.price,
                            changePercent: item.changePercent,
                            isUp: item.isUp,
                            exchange: item.subLabel,
                            category: 'Futures',
                          })
                        }
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="font-ticker text-ticker text-text-primary">{item.name}</div>
                          <div className="font-body-sm text-body-sm text-text-secondary">{item.subLabel}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-numeric-table text-numeric-table font-semibold text-text-primary">
                            {item.price}
                          </div>
                          <div
                            className={`font-numeric-table text-numeric-table font-semibold ${
                              item.isUp ? 'text-market-up' : 'text-market-down'
                            }`}
                          >
                            {item.changePercent}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsScreenerOpen(true)}
                  className="mt-4 pt-3 font-label-sm text-label-sm text-primary hover:underline flex items-center justify-between cursor-pointer w-full"
                >
                  <span>See all energy & metals futures</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              {/* Column 2: Forex & Currencies */}
              <div className="bg-surface-subtle/60 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={() => handleCategorySelect('Forex')}
                      className="inline-flex items-center gap-1 group font-headline-sm text-headline-sm text-text-primary hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>Forex & Currencies</span>
                      <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                        chevron_right
                      </span>
                    </button>
                    <span className="material-symbols-outlined text-text-secondary text-[20px]">currency_exchange</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {FOREX_LIST.map((item) => (
                      <div
                        key={item.symbol}
                        onClick={() =>
                          setSelectedAsset({
                            symbol: item.symbol,
                            name: item.name,
                            price: item.price,
                            changePercent: item.changePercent,
                            isUp: item.isUp,
                            exchange: item.subLabel,
                            category: 'Forex',
                          })
                        }
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="font-ticker text-ticker text-text-primary">{item.name}</div>
                          <div className="font-body-sm text-body-sm text-text-secondary">{item.subLabel}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-numeric-table text-numeric-table font-semibold text-text-primary">
                            {item.price}
                          </div>
                          <div
                            className={`font-numeric-table text-numeric-table font-semibold ${
                              item.isUp ? 'text-market-up' : 'text-market-down'
                            }`}
                          >
                            {item.changePercent}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsScreenerOpen(true)}
                  className="mt-4 pt-3 font-label-sm text-label-sm text-primary hover:underline flex items-center justify-between cursor-pointer w-full"
                >
                  <span>See all major currency pairs</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>

              {/* Column 3: Bonds & Yield Curve */}
              <div className="bg-surface-subtle/60 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={() => handleCategorySelect('Bonds')}
                      className="inline-flex items-center gap-1 group font-headline-sm text-headline-sm text-text-primary hover:text-primary transition-colors cursor-pointer"
                    >
                      <span>Bonds & Yields</span>
                      <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                        chevron_right
                      </span>
                    </button>
                    <span className="material-symbols-outlined text-text-secondary text-[20px]">show_chart</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {BONDS_LIST.map((item) => (
                      <div
                        key={item.symbol}
                        onClick={() =>
                          setSelectedAsset({
                            symbol: item.symbol,
                            name: item.name,
                            price: item.price,
                            changePercent: item.changePercent,
                            isUp: item.isUp,
                            exchange: item.subLabel,
                            category: 'Bonds',
                          })
                        }
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-hover transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="font-ticker text-ticker text-text-primary">{item.name}</div>
                          <div className="font-body-sm text-body-sm text-text-secondary">{item.subLabel}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-numeric-table text-numeric-table font-semibold text-text-primary">
                            {item.price}
                          </div>
                          <div
                            className={`font-numeric-table text-numeric-table font-semibold ${
                              item.isUp ? 'text-market-up' : 'text-market-down'
                            }`}
                          >
                            {item.changePercent}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setSelectedAsset({
                      symbol: 'US10Y',
                      name: 'US 10Y Treasury Yield Curve',
                      price: '4.494%',
                      changePercent: '-0.02%',
                      isUp: false,
                      exchange: 'TVC Sovereign Yields',
                      category: 'Bonds',
                    })
                  }
                  className="mt-4 pt-3 font-label-sm text-label-sm text-primary hover:underline flex items-center justify-between cursor-pointer w-full"
                >
                  <span>Customize yield curves</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          {/* Economic Calendar & Global Indicators Module */}
          <section id="section-economy" className="w-full max-w-[1440px] mx-auto px-gutter-desktop py-6">
            <div className="bg-surface-subtle/60 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <button
                    type="button"
                    onClick={() => setCalendarFilter((prev) => (prev === 'high' ? 'week' : 'high'))}
                    className="inline-flex items-center gap-1 group font-headline-md text-headline-md text-text-primary hover:text-primary transition-colors cursor-pointer"
                  >
                    <span>Economic Calendar & Global Indicators</span>
                    <span className="material-symbols-outlined text-[24px] group-hover:translate-x-1 transition-transform">
                      chevron_right
                    </span>
                  </button>
                  <p className="font-body-sm text-body-sm text-text-secondary mt-1">
                    High-impact scheduled macroeconomic releases and central bank rate expectations
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {(
                    [
                      { id: 'high', label: 'High Impact Only' },
                      { id: 'today', label: 'Today' },
                      { id: 'week', label: 'This Week' },
                    ] as const
                  ).map((btn) => {
                    const isActive = calendarFilter === btn.id;
                    return (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => setCalendarFilter(btn.id)}
                        className={
                          isActive
                            ? 'px-3 py-1.5 rounded-full bg-surface-canvas text-text-primary font-label-sm text-label-sm shadow-xs whitespace-nowrap cursor-pointer'
                            : 'px-3 py-1.5 rounded-full bg-surface-subtle text-text-secondary hover:text-text-primary font-label-sm text-label-sm transition-colors whitespace-nowrap cursor-pointer'
                        }
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() =>
                      setSelectedAsset({
                        symbol: `${ev.currency} MACRO`,
                        name: ev.title,
                        price: ev.actual !== '—' ? ev.actual : ev.forecast,
                        changePercent: ev.volatility,
                        isUp: true,
                        exchange: `Release ${ev.time}`,
                        category: 'Macro Indicator',
                      })
                    }
                    className="bg-surface-canvas p-4 rounded-xl shadow-xs hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-body-sm text-text-secondary mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-4 h-3 ${ev.flagColor} rounded-xs inline-block`}></span>
                        <span className="font-semibold text-text-primary">{ev.currency}</span>
                        <span>{ev.time}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ev.volatility === 'High Volatility'
                            ? 'bg-market-down/10 text-market-down'
                            : 'bg-primary/10 text-primary'
                        }`}
                      >
                        {ev.volatility}
                      </span>
                    </div>
                    <div className="font-title-md text-title-md text-text-primary mb-3">{ev.title}</div>
                    <div className="grid grid-cols-3 gap-2 font-numeric-table text-numeric-table pt-2">
                      <div>
                        <div className="text-text-secondary text-[11px]">Actual</div>
                        <div
                          className={`font-bold text-title-md ${
                            ev.actual === '—' ? 'text-text-secondary' : 'text-market-up'
                          }`}
                        >
                          {ev.actual}
                        </div>
                      </div>
                      <div>
                        <div className="text-text-secondary text-[11px]">Forecast</div>
                        <div className="font-medium text-text-primary text-title-md">{ev.forecast}</div>
                      </div>
                      <div>
                        <div className="text-text-secondary text-[11px]">Previous</div>
                        <div className="font-medium text-text-secondary text-title-md">{ev.previous}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Editorial Market Intelligence & Community Banner */}
          <section id="section-community-banner" className="w-full max-w-[1440px] mx-auto px-gutter-desktop py-8">
            <div className="bg-surface-subtle/80 rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl z-10">
                <span className="font-badge text-badge uppercase text-primary tracking-wider font-bold">
                  TradingView Community & Data
                </span>
                <h2 className="font-headline-lg text-headline-lg text-text-primary mt-2">
                  Never miss a breakout or pivot level again.
                </h2>
                <p className="font-body-md text-body-md text-text-secondary mt-2">
                  Access institutional-grade market screeners, Pine Script indicators, and real-time streaming market
                  data across 1,350,000+ financial instruments.
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedAsset({
                        symbol: 'NVDA',
                        name: 'NVIDIA Corporation',
                        price: '143.92',
                        changePercent: '+3.18%',
                        isUp: true,
                        exchange: 'NASDAQ',
                        category: 'Supercharts',
                      })
                    }
                    className="h-10 px-6 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center transition-colors shadow-sm whitespace-nowrap cursor-pointer"
                  >
                    Launch Supercharts
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsScreenerOpen(true)}
                    className="h-10 px-6 rounded-full bg-surface-canvas hover:bg-surface-hover text-text-primary font-label-md text-label-md flex items-center justify-center transition-colors shadow-xs whitespace-nowrap cursor-pointer"
                  >
                    Open Stock Screener
                  </button>
                </div>
              </div>

              {/* Financial Data Visualization Graphic */}
              <div
                onClick={() =>
                  setSelectedAsset({
                    symbol: 'NDX',
                    name: 'Nasdaq 100 Sentiment & Breadth',
                    price: '20,534.20',
                    changePercent: '+0.82%',
                    isUp: true,
                    exchange: 'NASDAQ',
                    category: 'Market Breadth',
                  })
                }
                className="w-full md:w-80 h-44 rounded-xl bg-surface-canvas p-4 shadow-sm flex flex-col justify-between z-10 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="font-ticker text-ticker text-text-primary">NASDAQ Sentiment</span>
                  <span className="font-badge text-badge px-2 py-0.5 rounded bg-market-up/10 text-market-up">
                    Bullish 68%
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between font-body-sm text-body-sm text-text-secondary">
                    <span>Market Breadth</span>
                    <span className="text-text-primary font-semibold tabular-nums">Advancing 3,120</span>
                  </div>
                  <div className="w-full bg-surface-subtle h-2 rounded-full overflow-hidden flex">
                    <div className="bg-market-up h-full w-[68%]"></div>
                    <div className="bg-market-down h-full w-[32%]"></div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-body-sm text-body-sm text-text-secondary">Real-time ICE feed active</span>
                </div>
              </div>

              {/* Subtle background glow */}
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            </div>
          </section>

          {/* Legal & Attribution Footer Section */}
          <section className="w-full max-w-[1440px] mx-auto px-gutter-desktop pt-4 pb-12">
            <div className="pt-6 font-body-sm text-body-sm text-text-secondary leading-relaxed flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span>
                  Made by humans. Select market data provided by{' '}
                  <button
                    type="button"
                    onClick={() => setIsScreenerOpen(true)}
                    className="underline hover:text-text-primary cursor-pointer"
                  >
                    ICE Data Services
                  </button>
                  . Select reference data provided by FactSet.
                </span>
              </div>
              <p className="text-[11px] text-text-secondary/80">
                Copyright © 2026 FactSet Research Systems Inc. Copyright © 2026, American Bankers Association. CUSIP
                Database provided by FactSet Research Systems Inc. All rights reserved. SEC filings and other documents
                provided by Quartr. © 2026 TradingView, Inc. Quotes are real-time or delayed by at least 15 minutes
                depending on exchange requirements.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="w-full bg-surface-subtle border-t border-border-subtle py-space-2xl mt-space-2xl">
        <div className="max-w-[1440px] mx-auto px-gutter-desktop">
          <div className="flex flex-col md:flex-row items-center justify-between gap-space-lg">
            <div className="flex items-center gap-space-sm">
              <div className="w-7 h-7 rounded-full bg-on-background flex items-center justify-center">
                <span className="font-ticker text-[11px] text-surface-canvas tracking-tighter">TV</span>
              </div>
              <span className="font-title-md text-title-md text-text-primary">TradingView</span>
              <span className="text-text-secondary font-body-sm text-body-sm ml-space-sm">
                © 2024 TradingView Inc. Precision market data.
              </span>
            </div>
            <div className="flex items-center gap-space-lg text-text-secondary font-label-sm text-label-sm">
              <button
                type="button"
                onClick={() => setIsGetStartedOpen(true)}
                className="hover:text-text-primary transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <button
                type="button"
                onClick={() => setIsGetStartedOpen(true)}
                className="hover:text-text-primary transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => setIsScreenerOpen(true)}
                className="hover:text-text-primary transition-colors cursor-pointer"
              >
                Market Status
              </button>
              <button
                type="button"
                onClick={() => setIsGetStartedOpen(true)}
                className="hover:text-text-primary transition-colors cursor-pointer"
              >
                Cookies
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Command Search Modal (Ctrl+K) */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 bg-on-background/40 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-surface-canvas rounded-2xl border border-border-base shadow-[0_12px_32px_rgba(19,23,34,0.16)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center px-4 py-3 border-b border-border-base gap-3">
              <span className="material-symbols-outlined text-text-secondary text-[22px]">search</span>
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search symbol, company, crypto, index, or forex pair..."
                className="w-full text-body-lg font-body-lg text-text-primary outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="px-2 py-1 text-badge font-badge text-text-secondary bg-surface-subtle rounded hover:text-text-primary cursor-pointer"
              >
                ESC
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto divide-y divide-border-subtle p-2">
              {allSearchableInstruments.length === 0 ? (
                <div className="py-10 text-center text-text-secondary">
                  No matching instruments found for "{searchQuery}"
                </div>
              ) : (
                allSearchableInstruments.map((item) => (
                  <button
                    key={`${item.category}-${item.symbol}`}
                    type="button"
                    onClick={() => {
                      setSelectedAsset(item);
                      setIsSearchOpen(false);
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-surface-hover transition-colors text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-ticker text-ticker text-text-primary w-20">{item.symbol}</span>
                      <div>
                        <div className="font-label-md text-label-md text-text-primary">{item.name}</div>
                        <div className="font-body-sm text-body-sm text-text-secondary">
                          {item.exchange} · {item.category}
                        </div>
                      </div>
                    </div>
                    <div className="text-right tabular-nums">
                      <div className="font-numeric-table text-numeric-table font-semibold text-text-primary">
                        {item.price}
                      </div>
                      <div
                        className={`font-numeric-table text-numeric-table font-semibold ${
                          item.isUp ? 'text-market-up' : 'text-market-down'
                        }`}
                      >
                        {item.changePercent}
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Superchart & Instrument Detail Modal */}
      {selectedAsset && (
        <div
          className="fixed inset-0 z-50 bg-on-background/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedAsset(null)}
        >
          <div
            className="w-full max-w-4xl bg-surface-canvas rounded-2xl border border-border-base shadow-[0_12px_32px_rgba(19,23,34,0.18)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-base">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-container/10 text-primary flex items-center justify-center font-ticker text-ticker">
                  {selectedAsset.symbol.slice(0, 3)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline-sm text-headline-sm text-text-primary">{selectedAsset.name}</h3>
                    <span className="font-body-sm text-body-sm text-text-secondary">
                      {selectedAsset.symbol} · {selectedAsset.exchange || 'GLOBAL'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 tabular-nums">
                    <span className="font-headline-md text-headline-md text-text-primary">{selectedAsset.price}</span>
                    <span
                      className={`px-2 py-0.5 rounded font-numeric-table text-numeric-table font-semibold ${
                        selectedAsset.isUp ? 'bg-market-up/10 text-market-up' : 'bg-market-down/10 text-market-down'
                      }`}
                    >
                      {selectedAsset.changePercent}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {(['1D', '1W', '1M', '1Y', 'ALL'] as const).map((tf) => (
                  <button
                    key={tf}
                    type="button"
                    onClick={() => setChartTimeframe(tf)}
                    className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors cursor-pointer ${
                      chartTimeframe === tf
                        ? 'bg-on-background text-on-primary'
                        : 'bg-surface-subtle text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setSelectedAsset(null)}
                  className="ml-2 w-8 h-8 rounded-full bg-surface-subtle hover:bg-surface-container flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            {/* Interactive SVG Superchart Canvas */}
            <div className="p-6 bg-surface-canvas">
              <div className="h-64 w-full bg-surface-subtle/50 rounded-xl p-4 relative flex flex-col justify-between border border-border-subtle">
                <div className="flex items-center justify-between text-body-sm text-text-secondary">
                  <span>Pine Script™ Technical Overlay · EMA (20, 50, 200) · RSI (14)</span>
                  <span className="tabular-nums">Timeframe: {chartTimeframe} · Real-time feed</span>
                </div>
                <svg className="w-full h-44 overflow-visible" viewBox="0 0 600 160">
                  <defs>
                    <linearGradient id="chartGradUp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#089981" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#089981" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="chartGradDown" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F23645" stopOpacity="0.24" />
                      <stop offset="100%" stopColor="#F23645" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {selectedAsset.isUp ? (
                    <>
                      <path
                        d="M 0,130 Q 60,125 110,105 T 230,90 T 340,68 T 460,42 L 600,18 L 600,160 L 0,160 Z"
                        fill="url(#chartGradUp)"
                      />
                      <path
                        d="M 0,130 Q 60,125 110,105 T 230,90 T 340,68 T 460,42 L 600,18"
                        fill="none"
                        stroke="#089981"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="600" cy="18" r="4.5" fill="#089981" />
                    </>
                  ) : (
                    <>
                      <path
                        d="M 0,30 Q 80,42 150,64 T 290,88 T 430,115 L 600,138 L 600,160 L 0,160 Z"
                        fill="url(#chartGradDown)"
                      />
                      <path
                        d="M 0,30 Q 80,42 150,64 T 290,88 T 430,115 L 600,138"
                        fill="none"
                        stroke="#F23645"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <circle cx="600" cy="138" r="4.5" fill="#F23645" />
                    </>
                  )}
                </svg>
                <div className="flex justify-between text-[11px] text-text-secondary tabular-nums pt-2 border-t border-border-base">
                  <span>09:30 EST</span>
                  <span>11:00 EST</span>
                  <span>12:30 EST</span>
                  <span>14:00 EST</span>
                  <span>16:00 EST</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div className="p-3 rounded-xl bg-surface-subtle/60">
                  <div className="text-body-sm text-text-secondary">Technical Rating</div>
                  <div
                    className={`font-title-md text-title-md mt-0.5 ${
                      selectedAsset.isUp ? 'text-market-up' : 'text-market-down'
                    }`}
                  >
                    {selectedAsset.isUp ? 'Strong Buy' : 'Neutral / Sell'}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-surface-subtle/60">
                  <div className="text-body-sm text-text-secondary">24h Volume</div>
                  <div className="font-title-md text-title-md text-text-primary mt-0.5 tabular-nums">68.42M</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-subtle/60">
                  <div className="text-body-sm text-text-secondary">Volatility (ATR)</div>
                  <div className="font-title-md text-title-md text-text-primary mt-0.5 tabular-nums">1.84%</div>
                </div>
                <div className="p-3 rounded-xl bg-surface-subtle/60">
                  <div className="text-body-sm text-text-secondary">Watchlist Status</div>
                  <button
                    type="button"
                    onClick={() => toggleWatchlist(selectedAsset.symbol)}
                    className="font-label-sm text-label-sm text-primary hover:underline mt-1 flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">star</span>
                    {watchlist.includes(selectedAsset.symbol) ? 'Saved in Watchlist' : 'Add to Watchlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stock Screener Modal */}
      {isScreenerOpen && (
        <div
          className="fixed inset-0 z-50 bg-on-background/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsScreenerOpen(false)}
        >
          <div
            className="w-full max-w-5xl bg-surface-canvas rounded-2xl border border-border-base shadow-[0_12px_32px_rgba(19,23,34,0.18)] overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-base">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-text-primary">Institutional Stock Screener</h3>
                <p className="font-body-sm text-body-sm text-text-secondary">
                  Filter US & Global equities by volume, valuation, and sector performance
                </p>
              </div>
              <div className="flex items-center gap-2">
                {['All', 'Electronic Technology', 'Semiconductors', 'Technology Services'].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setScreenerSector(sec)}
                    className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors cursor-pointer ${
                      screenerSector === sec
                        ? 'bg-on-background text-on-primary'
                        : 'bg-surface-subtle text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setIsScreenerOpen(false)}
                  className="ml-2 w-8 h-8 rounded-full bg-surface-subtle hover:bg-surface-container flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto p-6">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-text-secondary font-badge text-badge uppercase border-b border-border-base">
                    <th className="py-2.5 px-3">Symbol</th>
                    <th className="py-2.5 px-3">Sector</th>
                    <th className="py-2.5 px-3 text-right">Price (USD)</th>
                    <th className="py-2.5 px-3 text-right">Change %</th>
                    <th className="py-2.5 px-3 text-right">Volume</th>
                    <th className="py-2.5 px-3 text-right">P/E</th>
                    <th className="py-2.5 px-3 text-right">Market Cap</th>
                  </tr>
                </thead>
                <tbody className="font-numeric-table text-numeric-table divide-y divide-border-subtle">
                  {US_STOCKS.filter(
                    (s, idx, arr) =>
                      arr.findIndex((x) => x.symbol === s.symbol) === idx &&
                      (screenerSector === 'All' || s.sector === screenerSector)
                  ).map((stock) => (
                    <tr
                      key={stock.symbol}
                      onClick={() => {
                        setIsScreenerOpen(false);
                        setSelectedAsset({
                          symbol: stock.symbol,
                          name: stock.name,
                          price: stock.price,
                          changePercent: stock.changePercent,
                          isUp: stock.isUp,
                          exchange: stock.exchange,
                          category: stock.sector,
                        });
                      }}
                      className="hover:bg-surface-hover transition-colors cursor-pointer"
                    >
                      <td className="py-3 px-3">
                        <div className="font-ticker text-ticker text-text-primary">{stock.symbol}</div>
                        <div className="font-body-sm text-body-sm text-text-secondary">{stock.name}</div>
                      </td>
                      <td className="py-3 px-3 text-body-sm text-text-secondary">{stock.sector}</td>
                      <td className="py-3 px-3 text-right font-semibold text-text-primary">{stock.price}</td>
                      <td
                        className={`py-3 px-3 text-right font-semibold ${
                          stock.isUp ? 'text-market-up' : 'text-market-down'
                        }`}
                      >
                        {stock.changePercent}
                      </td>
                      <td className="py-3 px-3 text-right text-text-secondary">{stock.volume}</td>
                      <td className="py-3 px-3 text-right text-text-secondary">{stock.peRatio}</td>
                      <td className="py-3 px-3 text-right text-text-primary">{stock.marketCap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Get Started / Watchlist Account Modal */}
      {isGetStartedOpen && (
        <div
          className="fixed inset-0 z-50 bg-on-background/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsGetStartedOpen(false)}
        >
          <div
            className="w-full max-w-md bg-surface-canvas rounded-2xl border border-border-base shadow-[0_12px_32px_rgba(19,23,34,0.18)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-on-background flex items-center justify-center">
                  <span className="font-ticker text-surface-canvas text-[12px]">TV</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-text-primary">Fintech Markets Studio</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsGetStartedOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="font-body-md text-body-md text-text-secondary mb-4">
              Sync your custom watchlists, Pine Script indicators, and real-time price alerts across all devices.
            </p>
            <div className="bg-surface-subtle rounded-xl p-3 mb-4">
              <div className="font-label-sm text-label-sm text-text-secondary uppercase mb-2">
                Active Watchlist ({watchlist.length})
              </div>
              <div className="flex flex-wrap gap-1.5">
                {watchlist.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-full bg-surface-canvas text-text-primary font-ticker text-[12px] uppercase shadow-2xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsGetStartedOpen(false)}
              className="w-full h-10 rounded-full bg-gradient-to-r from-primary-container to-cta-gradient-end text-on-primary font-label-md text-label-md flex items-center justify-center shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
            >
              Continue to Markets Workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
