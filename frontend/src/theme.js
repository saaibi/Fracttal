const commonColors = {
  primary: '#007bff',
  secondary: '#6c757d',
  success: '#28a745',
  danger: '#dc3545',
  warning: '#ffc107',
  info: '#17a2b8',
};

const commonProperties = {
  fonts: {
    body: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    heading: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
  },
  fontSizes: {
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
    h1: '3.2em',
  },
  spacing: {
    small: '0.5rem',
    medium: '1rem',
    large: '2rem',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
};

export const lightTheme = {
  id : "light",
  ...commonProperties,
  colors: {
    ...commonColors,
    background: '#ffffff',
    text: '#213547',
    cardBackground: '#f8f9fa',
    cardBorder: '#e0e0e0',
  },
};

export const darkTheme = {
   id : "dark",
  ...commonProperties,
  colors: {
    ...commonColors,
    background: '#242424',
    text: 'rgba(255, 255, 255, 0.87)',
    cardBackground: '#343a40',
    cardBorder: '#495057',
  },
};
