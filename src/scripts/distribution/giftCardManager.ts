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
  const contentEl = document.getElementById(`card-content-${cardId}`);
  const toggleBtn = document.getElementById(`toggle-btn-${cardId}`);
  const toggleSvg = toggleBtn?.querySelector('svg');
  const collapsedInfo = document.getElementById(`collapsed-info-${cardId}`);

  if (!contentEl || !toggleBtn) return;

  const isCollapsed = contentEl.classList.contains('collapsed');

  if (isCollapsed) {
    // Expand
    contentEl.classList.remove('collapsed');
    contentEl.classList.add('expanded');
    contentEl.style.display = 'block';
    contentEl.style.height = 'auto';
    contentEl.style.opacity = '1';

    if (toggleSvg) {
      toggleSvg.style.transform = 'rotate(90deg)';
    }

    // Hide collapsed info
    if (collapsedInfo) {
      collapsedInfo.classList.add('hidden');
    }
  } else {
    // Collapse
    contentEl.classList.remove('expanded');
    contentEl.classList.add('collapsed');
    contentEl.style.display = 'none';
    contentEl.style.height = '0';
    contentEl.style.opacity = '0';

    if (toggleSvg) {
      toggleSvg.style.transform = 'rotate(0deg)';
    }

    // Show collapsed info if there's recipient data
    updateCollapsedInfo(cardId);
  }
}

/**
 * Update collapsed info display
 */
export function updateCollapsedInfo(cardId: number): void {
  const state = distributionState.getState();
  const card = state.giftCards.find(c => c.id === cardId);
  const collapsedInfo = document.getElementById(`collapsed-info-${cardId}`);
  const nameEl = document.getElementById(`collapsed-name-${cardId}`);
  const contactEl = document.getElementById(`collapsed-contact-${cardId}`);

  if (!card || !collapsedInfo || !nameEl || !contactEl) return;

  const config = card.configuration || {};
  const cardConfig = card.config || {};

  if (config.name || config.email || config.phone) {
    let nameText = config.name || '';
    let contactText = '';

    // Build contact text with cleaner formatting
    if (config.email) {
      contactText = config.email;
    } else if (config.phone) {
      contactText = config.phone;
    }

    // Add send time info if applicable - on a new line for clarity
    if (cardConfig.sendTime === 'scheduled' && cardConfig.scheduleDate) {
      const date = new Date(cardConfig.scheduleDate);
      const formattedDate = date.toLocaleDateString('nb-NO', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
      const time = cardConfig.scheduleTime || '09:00';

      // Create separate element for schedule info
      collapsedInfo.innerHTML = `
        <div class="flex flex-col gap-0.5">
          <div class="flex items-center gap-2">
            <span id="collapsed-name-${cardId}" class="font-medium text-gray-700">${nameText}</span>
            <span id="collapsed-contact-${cardId}" class="text-gray-500">${contactText ? '• ' + contactText : ''}</span>
          </div>
          <div class="text-sm text-gray-500">
            Sendes ${formattedDate} kl. ${time}
          </div>
        </div>
      `;
    } else if (cardConfig.sendTime === 'now' || (!cardConfig.sendTime && card.method)) {
      // Show "Send med en gang" for immediate sending
      collapsedInfo.innerHTML = `
        <div class="flex flex-col gap-0.5">
          <div class="flex items-center gap-2">
            <span id="collapsed-name-${cardId}" class="font-medium text-gray-700">${nameText}</span>
            <span id="collapsed-contact-${cardId}" class="text-gray-500">${contactText ? '• ' + contactText : ''}</span>
          </div>
          <div class="text-sm text-gray-500">
            Sendes med en gang
          </div>
        </div>
      `;
    } else {
      // Simple inline display when no sending info
      nameEl.textContent = nameText;
      contactEl.textContent = contactText ? ' • ' + contactText : '';
    }

    collapsedInfo.classList.remove('hidden');
  } else {
    collapsedInfo.classList.add('hidden');
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