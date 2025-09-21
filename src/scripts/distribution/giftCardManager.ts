/**
 * Gift card management functions
 */

import type { GiftCard, DeliveryMethod } from '../../lib/types';
import { distributionState } from './state';
import { generateTestGiftCards, groupGiftCardsByMethod } from '../../lib/utils';

/**
 * Initialize gift cards based on test configuration
 */
export function initializeGiftCards(count: number, value: number): void {
  const giftCards = generateTestGiftCards(count, value);
  distributionState.setState({ giftCards });
}

/**
 * Select delivery method for a specific card
 */
export function selectMethod(cardId: number, method: DeliveryMethod): void {
  distributionState.updateGiftCard(cardId, { method });
  updateMethodCounts();
}

/**
 * Select same method for all cards
 */
export function selectAllMethod(method: DeliveryMethod): void {
  const state = distributionState.getState();
  const updatedCards = state.giftCards.map(card => ({
    ...card,
    method
  }));
  distributionState.setState({ giftCards: updatedCards });
  updateMethodCounts();
}

/**
 * Toggle card expanded/collapsed state
 */
export function toggleCard(cardId: number): void {
  const state = distributionState.getState();
  const card = state.giftCards.find(c => c.id === cardId);

  // Only allow toggle if method is selected
  if (!card || !card.method) return;

  const contentEl = document.getElementById(`card-content-${cardId}`);
  const toggleBtn = document.getElementById(`toggle-btn-${cardId}`);

  if (!contentEl || !toggleBtn) return;

  const isCollapsed = contentEl.classList.contains('collapsed');

  if (isCollapsed) {
    // Expand
    contentEl.classList.remove('collapsed');
    toggleBtn.style.transform = 'rotate(90deg)';
  } else {
    // Collapse
    contentEl.classList.add('collapsed');
    toggleBtn.style.transform = 'rotate(0deg)';
  }
}

/**
 * Update method counts in the UI
 */
export function updateMethodCounts(): void {
  const state = distributionState.getState();
  const grouped = groupGiftCardsByMethod(state.giftCards);

  const counts = {
    physical: grouped.physical?.length || 0,
    email: grouped.email?.length || 0,
    sms: grouped.sms?.length || 0,
    unselected: grouped.unselected?.length || 0
  };

  // Update UI elements
  updateCountElement('count-physical', counts.physical);
  updateCountElement('count-email', counts.email);
  updateCountElement('count-sms', counts.sms);
  updateCountElement('count-unselected', counts.unselected);

  // Update continue button state
  updateContinueButtonState();
}

/**
 * Helper to update count elements
 */
function updateCountElement(elementId: string, count: number): void {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = count.toString();
  }
}

/**
 * Update continue button based on selection state
 */
function updateContinueButtonState(): void {
  const state = distributionState.getState();
  const hasSelection = state.giftCards.some(card => card.method !== null);
  const continueBtn = document.getElementById('continue-btn') as HTMLButtonElement;

  if (continueBtn) {
    continueBtn.disabled = !hasSelection;
  }
}

/**
 * Get method configuration for display
 */
export function getMethodConfig(method: string): { icon: string; name: string; textColor: string; bgColor: string } {
  const configs = {
    physical: {
      icon: '<svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg>',
      name: 'Fysisk',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50 border-2 border-orange-300'
    },
    email: {
      icon: '<svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
      name: 'E-post',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-50 border-2 border-blue-300'
    },
    sms: {
      icon: '<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>',
      name: 'SMS',
      textColor: 'text-green-700',
      bgColor: 'bg-green-50 border-2 border-green-300'
    }
  };

  return configs[method as keyof typeof configs] || {
    icon: '',
    name: 'Ukjent',
    textColor: 'text-gray-500',
    bgColor: 'bg-gray-50 border border-gray-200'
  };
}