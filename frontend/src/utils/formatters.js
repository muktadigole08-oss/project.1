export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatCurrency = (amount) => {
  if (amount === undefined || amount === null) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getStatusBadgeColor = (status) => {
  switch (status?.toUpperCase()) {
    case 'CONFIRMED':
    case 'READY':
      return 'bg-secondary-container text-on-secondary-container';
    case 'PENDING':
    case 'PROCESSING':
      return 'bg-amber-100 text-amber-800';
    case 'COMPLETED':
      return 'bg-blue-100 text-blue-800';
    case 'CANCELLED':
      return 'bg-error-container text-on-error-container';
    default:
      return 'bg-surface-container text-on-surface-variant';
  }
};
