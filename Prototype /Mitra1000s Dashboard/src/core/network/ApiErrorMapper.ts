// ==============================================================================
// Template: ApiErrorMapper.ts
// Description: Konversi HTTP response status & payload error dari backend
//              menjadi instance UiError yang terstandarisasi.
// ==============================================================================

import { UiErrorFactory, type UiError, type ValidationFieldErrors } from '@/core/states/UiError';

interface BackendErrorPayload {
  message?: string;
  detail?: string;
  errors?: Record<string, string | string[]>;
}

export class ApiErrorMapper {
  /**
   * Memetakan HTTP status code dan payload error dari backend ke UiError.
   * @param status - HTTP status code (e.g. 401, 422, 500)
   * @param payload - JSON body yang dikembalikan server saat error
   */
  static fromResponse(status: number, payload: BackendErrorPayload | null): UiError {
    const message = payload?.message ?? '';
    const detail = payload?.detail;

    switch (status) {
      case 401:
      case 403:
        return UiErrorFactory.unauthorized(message || undefined);

      case 404:
        return UiErrorFactory.notFound(message || undefined);

      case 422:
      case 400: {
        const validationErrors = ApiErrorMapper.parseValidationErrors(payload?.errors);
        return UiErrorFactory.validation(
          message || 'Terdapat kesalahan validasi input.',
          validationErrors,
          detail
        );
      }

      case 0:
      case 503:
        return UiErrorFactory.network(message || undefined);

      default:
        return UiErrorFactory.unknown(
          message || 'Terjadi kesalahan pada server.',
          detail
        );
    }
  }

  /**
   * Mengonversi format error validasi dari backend ke format terstandarisasi.
   * Mendukung format Django REST, Laravel, dan ASP.NET.
   */
  private static parseValidationErrors(
    raw: Record<string, string | string[]> | undefined
  ): ValidationFieldErrors | undefined {
    if (!raw) return undefined;

    const result: ValidationFieldErrors = {};
    for (const [field, value] of Object.entries(raw)) {
      result[field] = Array.isArray(value) ? value : [value];
    }
    return result;
  }
}
