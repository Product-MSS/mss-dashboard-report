// ==============================================================================
// Template: useUiState.ts
// Description: Custom hook untuk mengelola UiState<T> secara reaktif.
//              Menyediakan setter factories yang terstandarisasi untuk
//              setiap transisi state (loading, success, empty, failure).
// ==============================================================================

import { useState, useCallback } from 'react';
import { UiStateFactory, type UiState } from '@/core/states/UiState';
import { type UiError } from '@/core/states/UiError';

export interface UseUiStateReturn<T> {
  state: UiState<T>;
  setLoading: () => void;
  setSuccess: (data: T) => void;
  setEmpty: () => void;
  setFailure: (error: UiError) => void;
  reset: () => void;
}

/**
 * `useUiState<T>` — Hook reaktif untuk mengelola 4 status antarmuka:
 *  - loading: Menampilkan skeleton / indikator loading.
 *  - success: Menampilkan data hasil fetch.
 *  - empty: Menampilkan placeholder "belum ada data".
 *  - failure: Menampilkan pesan error terstandarisasi.
 *
 * @param initialState - State awal. Default ke `loading`.
 * @example
 * const { state, setLoading, setSuccess, setFailure } = useUiState<MyDto>();
 */
export function useUiState<T>(
  initialState: UiState<T> = UiStateFactory.loading<T>()
): UseUiStateReturn<T> {
  const [state, setState] = useState<UiState<T>>(initialState);

  const setLoading = useCallback(() => {
    setState(UiStateFactory.loading());
  }, []);

  const setSuccess = useCallback((data: T) => {
    setState(UiStateFactory.success(data));
  }, []);

  const setEmpty = useCallback(() => {
    setState(UiStateFactory.empty());
  }, []);

  const setFailure = useCallback((error: UiError) => {
    setState(UiStateFactory.failure(error));
  }, []);

  const reset = useCallback(() => {
    setState(UiStateFactory.loading());
  }, []);

  return { state, setLoading, setSuccess, setEmpty, setFailure, reset };
}
