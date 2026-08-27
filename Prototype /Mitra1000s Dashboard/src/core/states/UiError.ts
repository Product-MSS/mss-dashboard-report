// ==============================================================================
// Template: UiError.ts
// Description: Typed error system - menstandarisasi kategori error untuk UI.
// ==============================================================================

export type UiErrorType =
  | 'unauthorized'
  | 'validation'
  | 'network'
  | 'not_found'
  | 'unknown';

export interface ValidationFieldErrors {
  [field: string]: string[];
}

export interface UiError {
  type: UiErrorType;
  message: string;
  detail?: string;
  validationErrors?: ValidationFieldErrors;
}

// Factory helpers untuk membuat UiError dengan cepat
export const UiErrorFactory = {
  unauthorized: (message = 'Sesi telah berakhir. Silakan login kembali.'): UiError => ({
    type: 'unauthorized',
    message,
  }),

  network: (message = 'Koneksi jaringan bermasalah. Periksa internet Anda.'): UiError => ({
    type: 'network',
    message,
  }),

  validation: (
    message: string,
    validationErrors?: ValidationFieldErrors,
    detail?: string
  ): UiError => ({
    type: 'validation',
    message,
    detail,
    validationErrors,
  }),

  notFound: (message = 'Data yang diminta tidak ditemukan.'): UiError => ({
    type: 'not_found',
    message,
  }),

  unknown: (message = 'Terjadi kesalahan yang tidak terduga.', detail?: string): UiError => ({
    type: 'unknown',
    message,
    detail,
  }),
};
