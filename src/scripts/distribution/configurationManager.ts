/**
 * Configuration forms management for Step 2
 */

import type { GiftCard } from '../../lib/types';
import { distributionState } from './state';

/**
 * Generate configuration forms for Step 2
 */
export function generateConfigurationForms(): void {
  const container = document.getElementById('configuration-forms');
  if (!container) return;

  const state = distributionState.getState();
  const groupedCards = {
    physical: state.giftCards.filter(c => c.method === 'physical'),
    email: state.giftCards.filter(c => c.method === 'email'),
    sms: state.giftCards.filter(c => c.method === 'sms')
  };

  let html = '';

  // Physical cards configuration
  if (groupedCards.physical.length > 0) {
    html += generatePhysicalCardsForm(groupedCards.physical);
  }

  // Email cards configuration
  if (groupedCards.email.length > 0) {
    html += generateEmailCardsForm(groupedCards.email);
  }

  // SMS cards configuration
  if (groupedCards.sms.length > 0) {
    html += generateSmsCardsForm(groupedCards.sms);
  }

  container.innerHTML = html;

  // Add event listeners after DOM update
  setTimeout(() => {
    initializeFormEventListeners();
  }, 100);
}

/**
 * Generate physical cards form
 */
function generatePhysicalCardsForm(cards: GiftCard[]): string {
  return `
    <div class="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp">
      <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div class="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
          </svg>
        </div>
        Fysisk utskrift (${cards.length} gavekort)
      </h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Velg motiv for alle</label>
          <div class="grid grid-cols-2 gap-3 max-w-lg">
            <button class="motif-option flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4A574] transition-all text-left transform hover:scale-105 active:scale-95" data-motif="birthday">
              <span class="text-2xl">🎂</span>
              <span class="text-sm font-medium">Bursdag</span>
            </button>
            <button class="motif-option flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4A574] transition-all text-left transform hover:scale-105 active:scale-95" data-motif="christmas">
              <span class="text-2xl">🎄</span>
              <span class="text-sm font-medium">Jul</span>
            </button>
            <button class="motif-option flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4A574] transition-all text-left transform hover:scale-105 active:scale-95" data-motif="love">
              <span class="text-2xl">💕</span>
              <span class="text-sm font-medium">Kjærlighet</span>
            </button>
            <button class="motif-option flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#D4A574] transition-all text-left transform hover:scale-105 active:scale-95" data-motif="neutral">
              <span class="text-2xl">⭐</span>
              <span class="text-sm font-medium">Nøytral</span>
            </button>
          </div>
        </div>
        <div class="space-y-4">
          ${cards.map(card => `
            <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div class="flex items-center justify-between mb-3">
                <p class="font-medium text-sm text-gray-900">Gavekort #${card.id}</p>
                <span class="px-2 py-1 bg-[#D4A574]/10 text-[#D4A574] rounded-md text-sm font-semibold">kr ${card.value.toLocaleString('nb-NO')}</span>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Personlig hilsen (valgfritt)</label>
                <textarea
                  rows="2"
                  data-card-id="${card.id}"
                  data-field="message"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574]"
                  placeholder="Skriv en hilsen som skal stå på dette gavekortet..."
                ></textarea>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/**
 * Generate email cards form
 */
function generateEmailCardsForm(cards: GiftCard[]): string {
  return `
    <div class="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp">
      <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
        E-post sending (${cards.length} gavekort)
      </h3>
      <div class="space-y-4">
        ${cards.map(card => `
          <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div class="flex items-center justify-between mb-3">
              <p class="font-medium text-sm text-gray-900">Gavekort #${card.id}</p>
              <span class="px-2 py-1 bg-[#D4A574]/10 text-[#D4A574] rounded-md text-sm font-semibold">kr ${card.value.toLocaleString('nb-NO')}</span>
            </div>
            <div class="space-y-3">
              <div class="grid md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">E-postadresse *</label>
                  <input
                    type="email"
                    data-card-id="${card.id}"
                    data-field="email"
                    class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] transition-all hover:border-gray-300"
                    placeholder="mottaker@eksempel.no"
                    required
                  >
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Navn (valgfritt)</label>
                  <input
                    type="text"
                    data-card-id="${card.id}"
                    data-field="name"
                    class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] transition-all hover:border-gray-300"
                    placeholder="Mottakers navn"
                  >
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Personlig melding (valgfritt)</label>
                <textarea
                  rows="2"
                  data-card-id="${card.id}"
                  data-field="message"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] transition-all hover:border-gray-300 resize-none"
                  placeholder="Skriv en personlig hilsen til denne mottakeren..."
                ></textarea>
              </div>

              <!-- Schedule sending -->
              <div class="border-t pt-3 mt-3">
                <p class="text-xs font-medium text-gray-700 mb-2">Når skal gavekortet sendes?</p>
                <div class="flex gap-2 mb-3">
                  <button type="button" class="send-time-btn flex-1 px-3 py-2 bg-[#D4A574] text-white rounded-lg text-xs font-medium transition-all" data-card-id="${card.id}" data-value="now">
                    Send umiddelbart
                  </button>
                  <button type="button" class="send-time-btn flex-1 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-all" data-card-id="${card.id}" data-value="scheduled">
                    Planlegg sending
                  </button>
                </div>
                <div class="schedule-options hidden bg-gray-50 rounded-lg p-3" id="schedule-${card.id}">
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="block text-xs text-gray-600 mb-1">Dato</label>
                      <input
                        type="date"
                        data-card-id="${card.id}"
                        data-field="date"
                        class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574]"
                      >
                    </div>
                    <div>
                      <label class="block text-xs text-gray-600 mb-1">Klokkeslett</label>
                      <input
                        type="time"
                        data-card-id="${card.id}"
                        data-field="time"
                        class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574]"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Generate SMS cards form
 */
function generateSmsCardsForm(cards: GiftCard[]): string {
  return `
    <div class="bg-white rounded-2xl border border-gray-200 p-6 animate-fadeInUp">
      <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
          </svg>
        </div>
        SMS sending (${cards.length} gavekort)
      </h3>
      <div class="space-y-4">
        ${cards.map(card => `
          <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div class="flex items-center justify-between mb-3">
              <p class="font-medium text-sm text-gray-900">Gavekort #${card.id}</p>
              <span class="px-2 py-1 bg-[#D4A574]/10 text-[#D4A574] rounded-md text-sm font-semibold">kr ${card.value.toLocaleString('nb-NO')}</span>
            </div>
            <div class="space-y-3">
              <div class="grid md:grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Mobilnummer *</label>
                  <input
                    type="tel"
                    data-card-id="${card.id}"
                    data-field="phone"
                    class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] transition-all hover:border-gray-300"
                    placeholder="+47 900 00 000"
                    required
                  >
                </div>
                <div>
                  <label class="block text-xs font-medium text-gray-700 mb-1">Navn (valgfritt)</label>
                  <input
                    type="text"
                    data-card-id="${card.id}"
                    data-field="name"
                    class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] transition-all hover:border-gray-300"
                    placeholder="Mottakers navn"
                  >
                </div>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-700 mb-1">Personlig melding (valgfritt)</label>
                <textarea
                  rows="2"
                  data-card-id="${card.id}"
                  data-field="message"
                  class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574] transition-all hover:border-gray-300 resize-none"
                  placeholder="Skriv en kort melding (maks 160 tegn)..."
                  maxlength="160"
                ></textarea>
              </div>

              <!-- Schedule sending -->
              <div class="border-t pt-3 mt-3">
                <p class="text-xs font-medium text-gray-700 mb-2">Når skal gavekortet sendes?</p>
                <div class="flex gap-2 mb-3">
                  <button type="button" class="send-time-btn flex-1 px-3 py-2 bg-[#D4A574] text-white rounded-lg text-xs font-medium transition-all" data-card-id="${card.id}" data-value="now">
                    Send umiddelbart
                  </button>
                  <button type="button" class="send-time-btn flex-1 px-3 py-2 bg-white border border-gray-200 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-50 transition-all" data-card-id="${card.id}" data-value="scheduled">
                    Planlegg sending
                  </button>
                </div>
                <div class="schedule-options hidden bg-gray-50 rounded-lg p-3" id="schedule-${card.id}">
                  <div class="grid grid-cols-2 gap-2">
                    <div>
                      <label class="block text-xs text-gray-600 mb-1">Dato</label>
                      <input
                        type="date"
                        data-card-id="${card.id}"
                        data-field="date"
                        class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574]"
                      >
                    </div>
                    <div>
                      <label class="block text-xs text-gray-600 mb-1">Klokkeslett</label>
                      <input
                        type="time"
                        data-card-id="${card.id}"
                        data-field="time"
                        class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D4A574]/30 focus:border-[#D4A574]"
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/**
 * Initialize form event listeners
 */
function initializeFormEventListeners(): void {
  // Send time buttons
  document.querySelectorAll('.send-time-btn').forEach(btn => {
    btn.addEventListener('click', handleSendTimeClick);
  });

  // Motif options
  document.querySelectorAll('.motif-option').forEach(btn => {
    btn.addEventListener('click', handleMotifClick);
  });

  // Input fields
  document.querySelectorAll('input[data-card-id], textarea[data-card-id]').forEach(input => {
    input.addEventListener('change', handleInputChange);
  });
}

/**
 * Handle send time button click
 */
function handleSendTimeClick(e: Event): void {
  const target = e.target as HTMLElement;
  const cardId = target.dataset.cardId;
  const value = target.dataset.value;
  const scheduleOptions = document.getElementById(`schedule-${cardId}`);

  // Update button states for this card
  const allButtons = document.querySelectorAll(`.send-time-btn[data-card-id="${cardId}"]`);
  allButtons.forEach(b => {
    const button = b as HTMLElement;
    if (button.dataset.value === value) {
      // Active button style
      button.classList.remove('bg-white', 'border', 'border-gray-200', 'text-gray-600', 'hover:bg-gray-50');
      button.classList.add('bg-[#D4A574]', 'text-white');
    } else {
      // Inactive button style
      button.classList.remove('bg-[#D4A574]', 'text-white');
      button.classList.add('bg-white', 'border', 'border-gray-200', 'text-gray-600', 'hover:bg-gray-50');
    }
  });

  if (scheduleOptions) {
    if (value === 'scheduled') {
      scheduleOptions.classList.remove('hidden');
      // Add smooth animation
      scheduleOptions.style.opacity = '0';
      setTimeout(() => {
        scheduleOptions.style.opacity = '1';
      }, 10);

      // Set default date to tomorrow
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateInput = scheduleOptions.querySelector('input[type="date"]') as HTMLInputElement;
      if (dateInput && !dateInput.value) {
        dateInput.value = tomorrow.toISOString().split('T')[0];
      }
      // Set default time to 09:00
      const timeInput = scheduleOptions.querySelector('input[type="time"]') as HTMLInputElement;
      if (timeInput && !timeInput.value) {
        timeInput.value = '09:00';
      }
    } else {
      scheduleOptions.classList.add('hidden');
    }
  }

  // Update card details
  if (cardId) {
    distributionState.updateGiftCard(parseInt(cardId), {
      details: { ...distributionState.getGiftCard(parseInt(cardId))?.details, sendTime: value as any }
    });
  }
}

/**
 * Handle motif selection
 */
function handleMotifClick(e: Event): void {
  const target = e.currentTarget as HTMLElement;
  const motif = target.dataset.motif;

  // Update visual state
  document.querySelectorAll('.motif-option').forEach(btn => {
    btn.classList.remove('border-[#D4A574]', 'bg-[#FDF9F5]');
    btn.classList.add('border-gray-200');
  });

  target.classList.remove('border-gray-200');
  target.classList.add('border-[#D4A574]', 'bg-[#FDF9F5]');

  // Save motif for all physical cards
  const state = distributionState.getState();
  state.giftCards
    .filter(c => c.method === 'physical')
    .forEach(card => {
      distributionState.updateGiftCard(card.id, {
        details: { ...card.details, motif }
      });
    });
}

/**
 * Handle input change
 */
function handleInputChange(e: Event): void {
  const input = e.target as HTMLInputElement | HTMLTextAreaElement;
  const cardId = parseInt(input.dataset.cardId!);
  const field = input.dataset.field!;

  const card = distributionState.getGiftCard(cardId);
  if (!card) return;

  // Update config
  const config = card.config || {};
  config[field as keyof typeof config] = input.value;

  distributionState.updateGiftCard(cardId, { config });
}

/**
 * Validate configuration
 */
export function validateConfiguration(): boolean {
  const state = distributionState.getState();
  const digitalCards = state.giftCards.filter(c => c.method === 'email' || c.method === 'sms');

  for (const card of digitalCards) {
    if (card.method === 'email') {
      const emailInput = document.querySelector(`[data-card-id="${card.id}"][data-field="email"]`) as HTMLInputElement;
      if (!emailInput || !emailInput.value) {
        alert(`Legg inn e-postadresse for gavekort #${card.id}`);
        emailInput?.focus();
        return false;
      }
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        alert(`Ugyldig e-postadresse for gavekort #${card.id}`);
        emailInput?.focus();
        return false;
      }
    }

    if (card.method === 'sms') {
      const phoneInput = document.querySelector(`[data-card-id="${card.id}"][data-field="phone"]`) as HTMLInputElement;
      if (!phoneInput || !phoneInput.value) {
        alert(`Legg inn mobilnummer for gavekort #${card.id}`);
        phoneInput?.focus();
        return false;
      }
      // Phone validation (Norwegian format)
      const phoneRegex = /^(\+47)?[49]\d{7}$/;
      const cleanedPhone = phoneInput.value.replace(/\s/g, '');
      if (!phoneRegex.test(cleanedPhone)) {
        alert(`Ugyldig mobilnummer for gavekort #${card.id}. Bruk norsk format.`);
        phoneInput?.focus();
        return false;
      }
    }
  }

  return true;
}