/**
 * Validation functions for the distribution system
 */

import type { GiftCard, ValidationResult } from '../../lib/types';
import { validateEmail, validatePhone } from '../../lib/utils';

/**
 * Validate all gift card configurations
 */
export function validateAllConfigurations(cards: GiftCard[]): ValidationResult {
  const errors: string[] = [];

  cards.forEach(card => {
    const result = validateCardConfiguration(card);
    if (!result.isValid) {
      errors.push(`Gavekort #${card.id}: ${result.errors.join(', ')}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate a single gift card configuration
 */
export function validateCardConfiguration(card: GiftCard): ValidationResult {
  const errors: string[] = [];

  if (!card.method) {
    errors.push('Leveringsmetode må velges');
    return { isValid: false, errors };
  }

  switch (card.method) {
    case 'email':
      if (!card.config?.email) {
        errors.push('E-postadresse er påkrevd');
      } else if (!validateEmail(card.config.email)) {
        errors.push('Ugyldig e-postadresse');
      }
      break;

    case 'sms':
      if (!card.config?.phone) {
        errors.push('Mobilnummer er påkrevd');
      } else if (!validatePhone(card.config.phone)) {
        errors.push('Ugyldig mobilnummer');
      }
      break;

    case 'physical':
      // No validation needed for physical cards
      break;
  }

  // Validate message length if present
  if (card.config?.message && card.config.message.length > 500) {
    errors.push('Melding kan ikke være lengre enn 500 tegn');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate form input in real-time
 */
export function validateInput(type: 'email' | 'phone' | 'message', value: string): boolean {
  switch (type) {
    case 'email':
      return value === '' || validateEmail(value);
    case 'phone':
      return value === '' || validatePhone(value);
    case 'message':
      return value.length <= 500;
    default:
      return true;
  }
}

/**
 * Show validation error on input field
 */
export function showInputError(inputElement: HTMLElement, message: string): void {
  inputElement.classList.add('border-red-500', 'focus:border-red-500');
  inputElement.classList.remove('border-gray-200', 'focus:border-[#D4A574]');

  // Find or create error message element
  let errorEl = inputElement.parentElement?.querySelector('.error-message');
  if (!errorEl) {
    errorEl = document.createElement('p');
    errorEl.className = 'error-message text-xs text-red-500 mt-1';
    inputElement.parentElement?.appendChild(errorEl);
  }
  errorEl.textContent = message;
}

/**
 * Clear validation error on input field
 */
export function clearInputError(inputElement: HTMLElement): void {
  inputElement.classList.remove('border-red-500', 'focus:border-red-500');
  inputElement.classList.add('border-gray-200', 'focus:border-[#D4A574]');

  const errorEl = inputElement.parentElement?.querySelector('.error-message');
  if (errorEl) {
    errorEl.remove();
  }
}

/**
 * Validate before proceeding to next step
 */
export function canProceedToNextStep(currentStep: number, cards: GiftCard[]): boolean {
  switch (currentStep) {
    case 1: // Method selection step
      return cards.some(card => card.method !== null);

    case 2: // Configuration step
      const digitalCards = cards.filter(c => c.method === 'email' || c.method === 'sms');
      const validationResult = validateAllConfigurations(digitalCards);
      return validationResult.isValid;

    default:
      return true;
  }
}