/**
 * Main entry point for the distribution system
 * This can be imported into distribusjonv2.astro when ready to migrate
 */

import { distributionState, subscribe } from './state';
import {
  initializeGiftCards,
  updateMethodCounts,
  selectMethod,
  selectAllMethod,
  toggleCard
} from './giftCardManager';
import { initializeNavigation, goToStep } from './navigation';
import { validateInput, showInputError, clearInputError } from './validation';
import type { AppState, DeliveryMethod } from '../../lib/types';

/**
 * Initialize the distribution system
 */
export function initializeDistribution(): void {
  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}

/**
 * Main initialization
 */
function init(): void {
  console.log('Initializing distribution system...');

  // Initialize navigation
  initializeNavigation();

  // Initialize test configuration
  initializeTestConfiguration();

  // Initialize event listeners
  initializeEventListeners();

  // Subscribe to state changes
  const unsubscribe = subscribe(handleStateChange);

  // Initial UI update
  updateUI(distributionState.getState());

  // Store unsubscribe function for cleanup if needed
  (window as any).__distributionUnsubscribe = unsubscribe;
}

/**
 * Initialize test configuration handlers
 */
function initializeTestConfiguration(): void {
  const state = distributionState.getState();

  // Handle count buttons
  document.querySelectorAll('.test-count-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const count = parseInt((e.target as HTMLElement).dataset.count || '10');
      distributionState.setState({ testCount: count });
      updateTestSelection();
      updateTestSummary();
    });
  });

  // Handle custom count input
  const customCount = document.getElementById('custom-count') as HTMLInputElement;
  if (customCount) {
    customCount.addEventListener('input', (e) => {
      const value = parseInt((e.target as HTMLInputElement).value);
      if (value >= 1 && value <= 100) {
        distributionState.setState({ testCount: value });
        updateTestSelection();
        updateTestSummary();
      }
    });
  }

  // Handle value buttons
  document.querySelectorAll('.test-value-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const value = parseInt((e.target as HTMLElement).dataset.value || '500');
      distributionState.setState({ testValue: value });
      updateTestSelection();
      updateTestSummary();
    });
  });

  // Handle start test button
  const startTestBtn = document.getElementById('start-test-btn');
  if (startTestBtn) {
    startTestBtn.addEventListener('click', () => {
      const currentState = distributionState.getState();
      initializeGiftCards(currentState.testCount, currentState.testValue);
      goToStep(1);
      renderGiftCards();
    });
  }

  // Initialize with default values
  updateTestSelection();
  updateTestSummary();
}

/**
 * Initialize global event listeners
 */
function initializeEventListeners(): void {
  // Quick action buttons
  const allPhysical = document.getElementById('all-physical');
  if (allPhysical) {
    allPhysical.addEventListener('click', () => selectAllMethod('physical'));
  }

  const allEmail = document.getElementById('all-email');
  if (allEmail) {
    allEmail.addEventListener('click', () => selectAllMethod('email'));
  }

  const allSms = document.getElementById('all-sms');
  if (allSms) {
    allSms.addEventListener('click', () => selectAllMethod('sms'));
  }

  // Modal handlers
  const closeModal = document.getElementById('close-modal');
  if (closeModal) {
    closeModal.addEventListener('click', hideConfirmationModal);
  }

  const cancelConfirm = document.getElementById('cancel-confirm');
  if (cancelConfirm) {
    cancelConfirm.addEventListener('click', hideConfirmationModal);
  }

  const termsCheckbox = document.getElementById('terms-checkbox') as HTMLInputElement;
  if (termsCheckbox) {
    termsCheckbox.addEventListener('change', (e) => {
      const confirmBtn = document.getElementById('confirm-send') as HTMLButtonElement;
      if (confirmBtn) {
        confirmBtn.disabled = !(e.target as HTMLInputElement).checked;
      }
    });
  }

  // Delegate method selection clicks
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const methodBtn = target.closest('.method-btn');
    if (methodBtn) {
      const cardId = parseInt(methodBtn.getAttribute('data-card') || '0');
      const method = methodBtn.getAttribute('data-method') as DeliveryMethod;
      if (cardId && method) {
        selectMethod(cardId, method);
      }
    }

    // Toggle card expansion
    const toggleTarget = target.closest('[data-toggle-target]');
    if (toggleTarget) {
      const cardId = parseInt(toggleTarget.getAttribute('data-toggle-target') || '0');
      if (cardId) {
        toggleCard(cardId);
      }
    }
  });
}

/**
 * Handle state changes
 */
function handleStateChange(state: AppState): void {
  updateUI(state);
}

/**
 * Update UI based on state
 */
function updateUI(state: AppState): void {
  updateMethodCounts();
  // Add more UI updates as needed
}

/**
 * Update test configuration selection UI
 */
function updateTestSelection(): void {
  const state = distributionState.getState();

  // Update count buttons
  document.querySelectorAll('.test-count-btn').forEach(btn => {
    const count = parseInt((btn as HTMLElement).dataset.count || '0');
    if (count === state.testCount) {
      btn.classList.add('border-[#D4A574]', 'bg-[#FDF9F5]');
      btn.classList.remove('border-gray-200');
    } else {
      btn.classList.remove('border-[#D4A574]', 'bg-[#FDF9F5]');
      btn.classList.add('border-gray-200');
    }
  });

  // Update value buttons
  document.querySelectorAll('.test-value-btn').forEach(btn => {
    const value = parseInt((btn as HTMLElement).dataset.value || '0');
    if (value === state.testValue) {
      btn.classList.add('border-[#D4A574]', 'bg-[#FDF9F5]');
      btn.classList.remove('border-gray-200');
    } else {
      btn.classList.remove('border-[#D4A574]', 'bg-[#FDF9F5]');
      btn.classList.add('border-gray-200');
    }
  });
}

/**
 * Update test configuration summary
 */
function updateTestSummary(): void {
  const state = distributionState.getState();
  const totalValue = state.testCount * state.testValue;

  const totalValueEl = document.getElementById('test-total-value');
  if (totalValueEl) {
    totalValueEl.textContent = `kr ${totalValue.toLocaleString('nb-NO')}`;
  }

  const totalCountEl = document.getElementById('test-total-count');
  if (totalCountEl) {
    totalCountEl.textContent = `${state.testCount} stk`;
  }
}

/**
 * Render gift cards (for dynamic generation)
 */
function renderGiftCards(): void {
  // This function would dynamically render gift cards
  // For now, the cards are rendered by Astro components
  console.log('Gift cards initialized:', distributionState.getState().giftCards);
}

/**
 * Hide confirmation modal
 */
function hideConfirmationModal(): void {
  const modal = document.getElementById('confirmation-modal');
  if (modal) {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  }
}

// Export for use in Astro components
export {
  distributionState,
  selectMethod,
  selectAllMethod,
  toggleCard,
  goToStep
};

// Auto-initialize if this script is loaded directly
if (typeof window !== 'undefined') {
  initializeDistribution();
}