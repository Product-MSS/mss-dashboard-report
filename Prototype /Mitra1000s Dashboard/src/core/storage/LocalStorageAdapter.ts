// ==============================================================================
// Template: LocalStorageAdapter.ts
// Description: Abstraksi untuk localStorage dengan type-safe serialization /
//              deserialization. Menghindari spread try/catch di seluruh codebase.
// ==============================================================================

export class LocalStorageAdapter {
  /**
   * Simpan data ke localStorage dengan key yang diberikan.
   * Data akan di-serialize ke JSON.
   */
  static set<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (err) {
      console.error(`[LocalStorageAdapter] Failed to set key "${key}":`, err);
    }
  }

  /**
   * Baca data dari localStorage dan deserialize ke tipe T.
   * Mengembalikan `null` jika key tidak ada atau data korup.
   */
  static get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(key);
      if (raw === null) return null;
      return JSON.parse(raw) as T;
    } catch (err) {
      console.error(`[LocalStorageAdapter] Failed to get key "${key}":`, err);
      return null;
    }
  }

  /**
   * Hapus satu key dari localStorage.
   */
  static remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.error(`[LocalStorageAdapter] Failed to remove key "${key}":`, err);
    }
  }

  /**
   * Hapus semua key yang dimulai dengan prefix tertentu.
   * Berguna untuk membersihkan data fitur tertentu.
   */
  static clearByPrefix(prefix: string): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch (err) {
      console.error(`[LocalStorageAdapter] Failed to clear prefix "${prefix}":`, err);
    }
  }

  /**
   * Cek apakah sebuah key ada di localStorage.
   */
  static exists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
