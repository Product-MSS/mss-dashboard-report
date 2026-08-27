// ==============================================================================
// Template: UiState.ts
// Placeholder: {{FEATURE_NAME}} akan di-replace oleh scaffold-feature.sh
// Description: Generic reactive UI state container dengan 4 status.
// ==============================================================================

export type UiStateKind = 'loading' | 'success' | 'empty' | 'failure';

export type UiState<T> =
  | { kind: 'loading' }
  | { kind: 'success'; data: T }
  | { kind: 'empty' }
  | { kind: 'failure'; error: UiError };

// Factory helpers untuk membuat state dengan mudah
export const UiStateFactory = {
  loading: <T>(): UiState<T> => ({ kind: 'loading' }),
  success: <T>(data: T): UiState<T> => ({ kind: 'success', data }),
  empty: <T>(): UiState<T> => ({ kind: 'empty' }),
  failure: <T>(error: UiError): UiState<T> => ({ kind: 'failure', error }),
};

// Import UiError from the same module - ditempatkan di states/
// Impor UiError secara eksplisit saat menggunakan template ini:
// import { UiError } from './UiError';
import type { UiError } from './UiError';
