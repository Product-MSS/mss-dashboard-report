// ==============================================================================
// Template: IndexedDbConfig.ts
// Placeholder: Mitra1000s akan di-replace oleh init-project.sh
// Description: Konfigurasi dan helper untuk IndexedDB (penyimpanan data besar
//              di browser, seperti cache tabel besar, blob, atau offline data).
// ==============================================================================

const DB_NAME = 'Mitra1000s_db';
const DB_VERSION = 1;

export interface IdbStoreConfig {
  name: string;
  keyPath: string;
  indexes?: { name: string; keyPath: string; unique?: boolean }[];
}

/**
 * IndexedDbConfig — Mengelola koneksi dan migrasi IndexedDB.
 * Gunakan kelas ini di DataSource untuk penyimpanan data offline / lokal yang lebih besar.
 */
export class IndexedDbConfig {
  private static db: IDBDatabase | null = null;

  /**
   * Buka koneksi ke database dan jalankan migrasi schema (upgrade).
   * @param stores - Daftar object store yang harus ada di database.
   */
  static open(stores: IdbStoreConfig[]): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      if (IndexedDbConfig.db) {
        resolve(IndexedDbConfig.db);
        return;
      }

      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        for (const store of stores) {
          if (!db.objectStoreNames.contains(store.name)) {
            const objectStore = db.createObjectStore(store.name, { keyPath: store.keyPath });

            for (const index of store.indexes ?? []) {
              objectStore.createIndex(index.name, index.keyPath, { unique: index.unique ?? false });
            }
          }
        }
      };

      request.onsuccess = (event) => {
        IndexedDbConfig.db = (event.target as IDBOpenDBRequest).result;
        resolve(IndexedDbConfig.db);
      };

      request.onerror = () => {
        reject(new Error(`[IndexedDbConfig] Failed to open database "${DB_NAME}".`));
      };
    });
  }

  /**
   * Tutup koneksi yang aktif.
   */
  static close(): void {
    IndexedDbConfig.db?.close();
    IndexedDbConfig.db = null;
  }

  /**
   * Helper: Jalankan sebuah transaksi readwrite ke object store tertentu.
   */
  static async withStore<T>(
    storeName: string,
    mode: IDBTransactionMode,
    callback: (store: IDBObjectStore) => IDBRequest<T>
  ): Promise<T> {
    const db = IndexedDbConfig.db;
    if (!db) throw new Error('[IndexedDbConfig] Database is not open. Call open() first.');

    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      const request = callback(store);

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}
