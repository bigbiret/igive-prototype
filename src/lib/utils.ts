/**
 * Utility functions for the distribution system
 */

import type { GiftCard, ValidationResult } from './types';

export function formatCurrency(amount: number): string {
  return `kr ${amount.toLocaleString('nb-NO')}`;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  // Norwegian phone number validation
  const phoneRegex = /^(\+47)?[4-9]\d{7}$/;
  const cleanPhone = phone.replace(/\s/g, '');
  return phoneRegex.test(cleanPhone);
}

export function validateGiftCardConfiguration(card: GiftCard): ValidationResult {
  const errors: string[] = [];

  if (!card.method) {
    errors.push('Leveringsmetode må velges');
    return { isValid: false, errors };
  }

  if (card.method === 'email') {
    if (!card.config?.email) {
      errors.push('E-postadresse er påkrevd');
    } else if (!validateEmail(card.config.email)) {
      errors.push('Ugyldig e-postadresse');
    }
  }

  if (card.method === 'sms') {
    if (!card.config?.phone) {
      errors.push('Mobilnummer er påkrevd');
    } else if (!validatePhone(card.config.phone)) {
      errors.push('Ugyldig mobilnummer');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function groupGiftCardsByMethod(cards: GiftCard[]): Record<string, GiftCard[]> {
  return cards.reduce((groups, card) => {
    const method = card.method || 'unselected';
    if (!groups[method]) {
      groups[method] = [];
    }
    groups[method].push(card);
    return groups;
  }, {} as Record<string, GiftCard[]>);
}

export function calculateTotalValue(cards: GiftCard[]): number {
  return cards.reduce((sum, card) => sum + card.value, 0);
}

export function generateTestGiftCards(count: number, value: number): GiftCard[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    value: value,
    code: `TEST-${String(i + 1).padStart(3, '0')}`,
    method: null,
    recipient: null,
    details: {}
  }));
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function (this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}