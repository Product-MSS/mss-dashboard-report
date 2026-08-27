// ==============================================================================
// Template: ApiClient.ts
// Description: HTTP client wrapper berbasis fetch dengan typed response,
//              automatic token injection, dan structured error handling.
// ==============================================================================

import { UiErrorFactory, type UiError } from '@/core/states/UiError';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: UiError;
  statusCode?: number;
}

export class ApiClient {
  private readonly baseUrl: string;
  private getToken: (() => string | null) | null = null;

  constructor(baseUrl: string, getToken?: () => string | null) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // remove trailing slash
    this.getToken = getToken ?? null;
  }

  private buildHeaders(): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = this.getToken?.();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint);
  }

  async post<TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody
  ): Promise<ApiResponse<TResponse>> {
    return this.request<TResponse>('POST', endpoint, body);
  }

  async put<TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody
  ): Promise<ApiResponse<TResponse>> {
    return this.request<TResponse>('PUT', endpoint, body);
  }

  async patch<TResponse, TBody = unknown>(
    endpoint: string,
    body: TBody
  ): Promise<ApiResponse<TResponse>> {
    return this.request<TResponse>('PATCH', endpoint, body);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}/${endpoint.replace(/^\//, '')}`;

    try {
      const response = await fetch(url, {
        method,
        headers: this.buildHeaders(),
        body: body !== undefined ? JSON.stringify(body) : undefined,
      });

      if (response.status === 204) {
        return { success: true, statusCode: 204 };
      }

      const json = await response.json().catch(() => null);

      if (!response.ok) {
        // Delegate error mapping ke ApiErrorMapper
        const { ApiErrorMapper } = await import('./ApiErrorMapper');
        const error = ApiErrorMapper.fromResponse(response.status, json);
        return { success: false, error, statusCode: response.status };
      }

      return { success: true, data: json as T, statusCode: response.status };
    } catch {
      return {
        success: false,
        error: UiErrorFactory.network(),
        statusCode: 0,
      };
    }
  }
}
