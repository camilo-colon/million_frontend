export const formatPrice = (price: number): string => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(0)}M`;
  } else if (price >= 1000) {
    return `${(price / 1000).toFixed(0)}K`;
  } else {
    return price.toString();
  }
};
