export const formatPrice = (price: number, symbol: string): string => {
  // Validate the price is a valid number
  if (!isFinite(price) || isNaN(price)) {
    return '$0.00';
  }

  try {
    // Determine decimal places based on symbol and price magnitude
    let maximumFractionDigits = 2;
    let minimumFractionDigits = 2;

    if (symbol === 'BTC') {
      // For Bitcoin, show no decimals if price is high, 2 decimals if lower
      maximumFractionDigits = price > 1000 ? 0 : 2;
      minimumFractionDigits = price > 1000 ? 0 : 2;
    } else {
      // For other assets like Gold, always show 2 decimal places
      maximumFractionDigits = 2;
      minimumFractionDigits = 2;
    }

    return price.toLocaleString('en-US', { 
      minimumFractionDigits, 
      maximumFractionDigits 
    });
  } catch (error) {
    console.warn('Error formatting price:', error, 'Price:', price, 'Symbol:', symbol);
    // Fallback to simple formatting
    return price.toFixed(2);
  }
};
