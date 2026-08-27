// ==============================================================================
// Template: useAsyncState.ts
// Description: High-level hook untuk menjalankan operasi async dan
//              secara otomatis mengelola UiState<T> lifecycle.
//              Ini adalah hook utama yang dipakai di Feature Hooks.
// ==============================================================================

import { useCallback, useRef } from 'react';
import { useUiState } from './useUiState';
import { UiErrorFactory } from '@/core/states/UiError';
import type { UiState } from '@/core/states/UiState';
import type { UiError } from '@/core/states/UiError';

export interface UseAsyncStateReturn<T> {
  state: UiState<T>;
  execute: (asyncFn: () => Promise<T | null | undefined>) => Promise<void>;
  isLoading: boolean;
}

/**
 * `useAsyncState<T>` — Hook utama untuk menjalankan operasi async
 *  dan secara otomatis mengelola siklus hidup UiState<T>:
 *
 *  1. Set state ke `loading`.
 *  2. Jalankan fungsi async yang diberikan.
 *  3. Jika data ada → set `success`.
 *  4. Jika data `null/undefined/[]` → set `empty`.
 *  5. Jika melempar `UiError` → set `failure` dengan error tersebut.
 *  6. Jika error umum → set `failure` dengan `unknown` error.
 *
 * @example
 * const { state, execute } = useAsyncState<MyDto[]>();
 *
 * useEffect(() => {
 *   execute(() => myRepository.getAll());
 * }, []);
 */
export function useAsyncState<T>(): UseAsyncStateReturn<T> {
  const { state, setLoading, setSuccess, setEmpty, setFailure } = useUiState<T>();
  const executingRef = useRef(false);

  const isEmptyData = (data: T): boolean => {
    if (data === null || data === undefined) return true;
    if (Array.isArray(data) && data.length === 0) return true;
    return false;
  };

  const execute = useCallback(
    async (asyncFn: () => Promise<T | null | undefined>): Promise<void> => {
      if (executingRef.current) return;
      executingRef.current = true;

      setLoading();

      try {
        const data = await asyncFn();

        if (data === null || data === undefined || isEmptyData(data as T)) {
          setEmpty();
        } else {
          setSuccess(data as T);
        }
      } catch (err: unknown) {
        // Jika error adalah UiError yang dilempar secara eksplisit oleh Repository
        if (err && typeof err === 'object' && 'type' in err && 'message' in err) {
          setFailure(err as UiError);
        } else if (err instanceof Error) {
          setFailure(UiErrorFactory.unknown(err.message));
        } else {
          setFailure(UiErrorFactory.unknown());
        }
      } finally {
        executingRef.current = false;
      }
    },
    [setLoading, setSuccess, setEmpty, setFailure]
  );

  const isLoading = state.kind === 'loading';

  return { state, execute, isLoading };
}
