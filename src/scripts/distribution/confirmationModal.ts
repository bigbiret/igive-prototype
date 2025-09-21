/**
 * Confirmation modal management
 */

import { distributionState } from './state';
import { formatCurrency } from '../../lib/utils';

/**
 * Show confirmation modal
 */
export function showConfirmationModal(): void {
  const modal = document.getElementById('confirmation-modal');
  if (!modal) return;

  // Generate modal summary
  generateModalSummary();

  // Show modal with animation
  modal.classList.remove('hidden');
  const backdrop = modal.querySelector('.modal-backdrop');
  const dialog = modal.querySelector('.modal-dialog');

  requestAnimationFrame(() => {
    backdrop?.classList.add('opacity-100');
    dialog?.classList.add('scale-100', 'opacity-100');
    dialog?.classList.remove('scale-95', 'opacity-0');
  });
}

/**
 * Hide confirmation modal
 */
export function hideConfirmationModal(): void {
  const modal = document.getElementById('confirmation-modal');
  if (!modal) return;

  const backdrop = modal.querySelector('.modal-backdrop');
  const dialog = modal.querySelector('.modal-dialog');

  backdrop?.classList.remove('opacity-100');
  dialog?.classList.remove('scale-100', 'opacity-100');
  dialog?.classList.add('scale-95', 'opacity-0');

  setTimeout(() => {
    modal.classList.add('hidden');
  }, 300);
}

/**
 * Generate modal summary
 */
function generateModalSummary(): void {
  const container = document.getElementById('modal-summary');
  if (!container) return;

  const state = distributionState.getState();
  const selectedCards = state.giftCards.filter(c => c.method !== null);
  const totalValue = selectedCards.reduce((sum, card) => sum + card.value, 0);

  let summaryHtml = `
    <div class="space-y-3">
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Antall gavekort:</span>
        <span class="font-semibold">${selectedCards.length}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-gray-600">Total verdi:</span>
        <span class="font-semibold">${formatCurrency(totalValue)}</span>
      </div>
  `;

  // Group by method
  const byMethod = {
    physical: selectedCards.filter(c => c.method === 'physical'),
    email: selectedCards.filter(c => c.method === 'email'),
    sms: selectedCards.filter(c => c.method === 'sms')
  };

  if (byMethod.physical.length > 0) {
    summaryHtml += `
      <div class="pt-3 border-t">
        <p class="text-sm font-medium text-gray-700 mb-2">
          <svg class="w-4 h-4 inline mr-1 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
          </svg>
          Fysisk utskrift (${byMethod.physical.length} stk)
        </p>
        <p class="text-xs text-gray-500 pl-5">PDF vil lastes ned for utskrift</p>
      </div>
    `;
  }

  if (byMethod.email.length > 0) {
    summaryHtml += `
      <div class="pt-3 border-t">
        <p class="text-sm font-medium text-gray-700 mb-2">
          <svg class="w-4 h-4 inline mr-1 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          E-post (${byMethod.email.length} stk)
        </p>
        <div class="space-y-1 pl-5">
    `;
    byMethod.email.forEach(card => {
      const emailInput = document.querySelector(`[data-card-id="${card.id}"][data-field="email"]`) as HTMLInputElement;
      const nameInput = document.querySelector(`[data-card-id="${card.id}"][data-field="name"]`) as HTMLInputElement;
      const email = emailInput?.value || card.config?.email || 'Ikke angitt';
      const name = nameInput?.value || card.config?.name || '';
      const displayName = name ? `${name} - ` : '';
      summaryHtml += `<p class="text-xs text-gray-600">• ${displayName}${email}</p>`;
    });
    summaryHtml += `</div></div>`;
  }

  if (byMethod.sms.length > 0) {
    summaryHtml += `
      <div class="pt-3 border-t">
        <p class="text-sm font-medium text-gray-700 mb-2">
          <svg class="w-4 h-4 inline mr-1 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
          SMS (${byMethod.sms.length} stk)
        </p>
        <div class="space-y-1 pl-5">
    `;
    byMethod.sms.forEach(card => {
      const phoneInput = document.querySelector(`[data-card-id="${card.id}"][data-field="phone"]`) as HTMLInputElement;
      const nameInput = document.querySelector(`[data-card-id="${card.id}"][data-field="name"]`) as HTMLInputElement;
      const phone = phoneInput?.value || card.config?.phone || 'Ikke angitt';
      const name = nameInput?.value || card.config?.name || '';
      const displayName = name ? `${name} - ` : '';
      summaryHtml += `<p class="text-xs text-gray-600">• ${displayName}${phone}</p>`;
    });
    summaryHtml += `</div></div>`;
  }

  summaryHtml += `</div>`;
  container.innerHTML = summaryHtml;
}

/**
 * Handle confirm send
 */
export function handleConfirmSend(): void {
  const btn = document.getElementById('confirm-send') as HTMLButtonElement;
  btn.disabled = true;
  btn.innerHTML = `
    <svg class="animate-spin h-5 w-5 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    Sender...
  `;

  // Simulate sending
  setTimeout(() => {
    hideConfirmationModal();
    showSuccessView();
  }, 1500);
}

/**
 * Show success view
 */
function showSuccessView(): void {
  // Show success banner
  const banner = document.getElementById('success-banner');
  if (banner) {
    banner.style.display = 'block';
  }

  // Hide all steps
  document.querySelectorAll('.step-content').forEach(step => {
    step.classList.add('hidden');
  });

  // Create success content
  const mainContent = document.querySelector('.max-w-4xl.mx-auto > div');
  if (mainContent) {
    mainContent.innerHTML = `
      <div class="text-center py-12 animate-fadeInUp">
        <div class="w-20 h-20 bg-gradient-to-br from-[#D4A574] to-[#C49560] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-once">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-gray-900 mb-3">Distribusjon fullført!</h2>
        <p class="text-gray-600 mb-8">Gavekortene er sendt til mottakerne</p>

        <div class="bg-gray-50 rounded-xl p-6 max-w-md mx-auto mb-8">
          <p class="text-sm text-gray-600 mb-2">Bestillingsnummer</p>
          <p class="text-2xl font-bold text-[#D4A574]">#2024-${Math.floor(Math.random() * 9000) + 1000}</p>
        </div>

        <div class="flex gap-4 max-w-md mx-auto">
          <a href="/" class="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
            Tilbake til forsiden
          </a>
          <button class="flex-1 px-6 py-3 bg-gradient-to-r from-[#D4A574] to-[#C49560] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
            Se mine distribusjoner
          </button>
        </div>
      </div>
    `;
  }
}