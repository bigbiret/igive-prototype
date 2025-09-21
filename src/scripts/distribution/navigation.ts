/**
 * Navigation and step management
 */

import { distributionState } from './state';
import { canProceedToNextStep } from './validation';
import { updateMethodCounts } from './giftCardManager';
import { generateConfigurationForms, validateConfiguration } from './configurationManager';
import { showConfirmationModal } from './confirmationModal';

/**
 * Initialize navigation
 */
export function initializeNavigation(): void {
  // Back button
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', handleBack);
  }

  // Continue button
  const continueBtn = document.getElementById('continue-btn');
  if (continueBtn) {
    continueBtn.addEventListener('click', handleContinue);
  }

  // Step items (if clickable)
  document.querySelectorAll('.step-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const step = parseInt((e.currentTarget as HTMLElement).dataset.step || '1');
      if (canNavigateToStep(step)) {
        goToStep(step);
      }
    });
  });
}

/**
 * Go to specific step
 */
export function goToStep(step: number): void {
  const state = distributionState.getState();

  // Validate before moving forward
  if (step > state.currentStep) {
    if (!canProceedToNextStep(state.currentStep, state.giftCards)) {
      showValidationError();
      return;
    }
  }

  // Update state
  distributionState.setState({ currentStep: step });

  // Update UI
  updateStepDisplay(step);
  updateProgressBar(step);
  updateButtons(step);

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Handle back button click
 */
function handleBack(): void {
  const state = distributionState.getState();
  if (state.currentStep > 0) {
    goToStep(state.currentStep - 1);
  }
}

/**
 * Handle continue button click
 */
function handleContinue(): void {
  const state = distributionState.getState();

  if (state.currentStep === 1) {
    // Step 1: Check if methods are selected
    const hasSelection = state.giftCards.some(c => c.method !== null);
    if (!hasSelection) {
      alert('Velg leveringsmetode for minst ett gavekort.');
      return;
    }

    // Move to configuration step
    goToStep(2);
    generateConfigurationForms();

  } else if (state.currentStep === 2) {
    // Step 2: Validate configuration and show modal
    if (!validateConfiguration()) {
      return;
    }

    // Show confirmation modal
    showConfirmationModal();
  } else if (state.currentStep === 0) {
    // This is handled by the test configuration button
    goToStep(1);
  }
}

/**
 * Update step display
 */
function updateStepDisplay(step: number): void {
  // Hide all steps
  document.querySelectorAll('.step-content').forEach(content => {
    content.classList.add('hidden');
  });

  // Show current step
  const currentStepEl = document.getElementById(`step-${step}`);
  if (currentStepEl) {
    currentStepEl.classList.remove('hidden');
  }

  // Update stepper indicators
  document.querySelectorAll('.step-item').forEach((item, index) => {
    const stepNum = index + 1;
    item.classList.remove('active', 'completed');

    if (stepNum === step) {
      item.classList.add('active');
    } else if (stepNum < step) {
      item.classList.add('completed');
    }

    updateStepIcon(item, stepNum, step);
  });
}

/**
 * Update step icon (number or checkmark)
 */
function updateStepIcon(item: Element, stepNum: number, currentStep: number): void {
  const stepNumber = item.querySelector('.step-number');
  const stepCheck = item.querySelector('.step-check');

  if (stepNum < currentStep) {
    // Completed - show checkmark
    stepNumber?.classList.add('hidden');
    stepCheck?.classList.remove('hidden');
  } else {
    // Not completed - show number
    stepNumber?.classList.remove('hidden');
    stepCheck?.classList.add('hidden');
  }
}

/**
 * Update progress bar
 */
function updateProgressBar(step: number): void {
  const progressLine = document.querySelector('.progress-line') as HTMLElement;
  if (progressLine) {
    const percentage = ((step - 1) / 1) * 100; // Adjust based on total steps
    progressLine.style.width = `${percentage}%`;
  }
}

/**
 * Update navigation buttons
 */
function updateButtons(step: number): void {
  const backBtn = document.getElementById('back-btn');
  const continueBtn = document.getElementById('continue-btn');

  // Show/hide back button
  if (backBtn) {
    if (step <= 1) {
      backBtn.classList.add('hidden');
    } else {
      backBtn.classList.remove('hidden');
    }
  }

  // Update continue button text
  if (continueBtn) {
    if (step === 0) {
      continueBtn.innerHTML = `
        Start testdistribusjon
        <svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      `;
    } else if (step === 1) {
      continueBtn.innerHTML = `
        Fortsett til konfigurasjon
        <svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      `;
    } else if (step === 2) {
      continueBtn.innerHTML = `
        Bekreft distribusjon
        <svg class="w-5 h-5 inline ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      `;
    }
  }
}

/**
 * Check if can navigate to a specific step
 */
function canNavigateToStep(targetStep: number): boolean {
  const state = distributionState.getState();

  // Can always go back
  if (targetStep < state.currentStep) {
    return true;
  }

  // Check if can go forward
  for (let step = state.currentStep; step < targetStep; step++) {
    if (!canProceedToNextStep(step, state.giftCards)) {
      return false;
    }
  }

  return true;
}

/**
 * Show validation error message
 */
function showValidationError(): void {
  // You can customize this to show a toast or inline error
  alert('Vennligst fullfør gjeldende steg før du fortsetter.');
}