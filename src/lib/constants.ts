/**
 * Constants for the distribution system
 */

export const DELIVERY_METHODS = {
  PHYSICAL: 'physical',
  EMAIL: 'email',
  SMS: 'sms'
} as const;

export const TEST_AMOUNTS = [1, 5, 10, 25, 50] as const;
export const TEST_VALUES = [100, 200, 500, 1000, 2000, 5000, 10000] as const;

export const MAX_GIFT_CARDS = 100;
export const MIN_GIFT_CARDS = 1;

export const COLORS = {
  primary: '#D4A574',
  primaryDark: '#C49560',
  primaryLight: '#FDF9F5',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6'
} as const;

export const ANIMATION_DURATIONS = {
  fast: 200,
  normal: 300,
  slow: 500
} as const;

export const METHOD_CONFIGS = {
  physical: {
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2V9a2 2 0 00-2-2H7a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z"></path>
    </svg>`,
    name: 'Fysisk',
    textColor: 'text-orange-600',
    bgColor: 'bg-orange-50',
    description: 'PDF for utskrift'
  },
  email: {
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
    </svg>`,
    name: 'E-post',
    textColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Send digitalt'
  },
  sms: {
    icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
    </svg>`,
    name: 'SMS',
    textColor: 'text-green-600',
    bgColor: 'bg-green-50',
    description: 'Til mobil'
  }
} as const;