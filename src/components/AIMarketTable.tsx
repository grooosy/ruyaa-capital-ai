import React from 'react';
import { useMarketData } from '@/hooks/useMarketData';
import AssetRow from './market/AssetRow';
import AIMarketHeader from './market/AIMarketHeader';
import AIMarketFooter from './market/AIMarketFooter';

const AIMarketTable: React.FC = () => {
  const { btc, gold } = useMarketData();

  return (
    <div className="space-y-4">
      {/* AI Header */}
      <AIMarketHeader />

      {/* Asset Rows */}
      <div className="space-y-3">
        <AssetRow
          asset={btc}
          name="Bitcoin"
          symbol="BTC"
          icon="/logos/btc-official.svg"
        />
        <AssetRow
          asset={gold}
          name="Gold"
          symbol="GOLD"
          icon="/icons/gold-bars.svg"
        />
      </div>

      {/* AI Insights Footer */}
      <AIMarketFooter />
    </div>
  );
};

export default AIMarketTable;
