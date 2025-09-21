/**
 * State management for the distribution system
 */

import type { AppState, GiftCard } from '../../lib/types';

class DistributionState {
  private state: AppState = {
    currentStep: 0,
    testCount: 10,
    testValue: 500,
    giftCards: [],
    termsAccepted: false
  };

  private listeners: Set<(state: AppState) => void> = new Set();

  /**
   * Get the current state
   */
  getState(): AppState {
    return { ...this.state };
  }

  /**
   * Update the state with partial updates
   */
  setState(updates: Partial<AppState>): void {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  /**
   * Update a specific gift card
   */
  updateGiftCard(cardId: number, updates: Partial<GiftCard>): void {
    this.state.giftCards = this.state.giftCards.map(card =>
      card.id === cardId ? { ...card, ...updates } : card
    );
    this.notify();
  }

  /**
   * Get a specific gift card
   */
  getGiftCard(cardId: number): GiftCard | undefined {
    return this.state.giftCards.find(card => card.id === cardId);
  }

  /**
   * Reset state to initial values
   */
  reset(): void {
    this.state = {
      currentStep: 0,
      testCount: 10,
      testValue: 500,
      giftCards: [],
      termsAccepted: false
    };
    this.notify();
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: AppState) => void): () => void {
    this.listeners.add(listener);
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners of state changes
   */
  private notify(): void {
    const currentState = this.getState();
    this.listeners.forEach(listener => {
      listener(currentState);
    });
  }
}

// Create singleton instance
export const distributionState = new DistributionState();

// Export convenience functions
export const getState = () => distributionState.getState();
export const setState = (updates: Partial<AppState>) => distributionState.setState(updates);
export const subscribe = (listener: (state: AppState) => void) => distributionState.subscribe(listener);