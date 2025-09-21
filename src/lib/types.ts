/**
 * Type definitions for the distribution system
 */

export interface GiftCard {
  id: number;
  value: number;
  code: string;
  method: DeliveryMethod | null;
  recipient: Recipient | null;
  details: CardDetails;
  config?: RecipientConfig;
}

export type DeliveryMethod = 'physical' | 'email' | 'sms';

export interface Recipient {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface RecipientConfig {
  email?: string;
  phone?: string;
  name?: string;
  message?: string;
  scheduledDate?: string;
  scheduledTime?: string;
}

export interface CardDetails {
  scheduledDate?: string;
  scheduledTime?: string;
  sendTime?: 'now' | 'tomorrow' | 'scheduled';
  [key: string]: any;
}

export interface AppState {
  currentStep: number;
  testCount: number;
  testValue: number;
  giftCards: GiftCard[];
  termsAccepted: boolean;
}

export interface MethodConfig {
  icon: string;
  name: string;
  textColor: string;
  bgColor?: string;
  description?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface TestConfiguration {
  count: number;
  value: number;
}