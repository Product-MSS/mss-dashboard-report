# 📊 Data Tracking Plan — B2B E-Commerce
### Supplier → Distributor → Retailer (Toko Bangunan)

> **Versi:** 1.0  
> **Dibuat oleh:** Tim Product Manager  
> **Tanggal:** 2026-08-21  
> **Audience:** Tim Product Manager, Tim Data Analytics, Tim Engineering  
> **Tools Visualisasi:** Power BI  
> **Platform:** Mobile App (Android/iOS) + Web App/Dashboard Admin

---

## 📌 Tujuan Dokumen

Dokumen ini berfungsi sebagai **single source of truth** untuk seluruh kebutuhan data tracking sistem B2B e-commerce. Terdiri dari tiga bagian utama:

1. **Tracking Plan & Event Dictionary** — daftar lengkap event yang harus di-track
2. **Data Requirements Document** — kebutuhan data untuk tim Data Analytics
3. **PM Self-Serve Template** — framework pengisian tracking untuk fitur baru

---

## 👥 User Roles dalam Sistem

| Role | Platform | Deskripsi |
|---|---|---|
| `supplier` | Web App | Upload produk, pricing, stok |
| `distributor` | Mobile App + Web | Order ke supplier, distribusi ke retailer |
| `retailer` | Mobile App | End buyer, toko bangunan |
| `sales_force` | Mobile App | Tim lapangan, onboarding retailer |
| `admin_internal` | Web App | Ops, CS, Finance |

---

## 🏗️ Struktur Event Standard

Setiap event **WAJIB** memiliki properti berikut (Global Properties):

```json
{
  "event_name": "string",           // snake_case, format: [area]_[object]_[verb]
  "event_timestamp": "ISO8601",     // waktu event terjadi
  "session_id": "string",           // ID sesi user
  "user_id": "string",              // ID unik user
  "user_role": "string",            // supplier | distributor | retailer | sales_force | admin_internal
  "platform": "string",             // android | ios | web
  "app_version": "string",          // versi aplikasi
  "screen_name": "string",          // nama halaman/screen saat event terjadi
  "region": "string",               // kota/wilayah user
  "distributor_id": "string|null",  // jika user terkait distributor tertentu
  "supplier_id": "string|null"      // jika user terkait supplier tertentu
}
```

> **Naming Convention:** `[area]_[object]_[verb]`  
> Contoh: `order_cart_submitted`, `payment_method_selected`, `fraud_claim_flagged`

---

## 🗺️ SECTION 1 — TRACKING PLAN PER JOURNEY

---

### 🔵 Journey 1: Onboarding

**Tujuan:** Memahami conversion rate registrasi, drop-off onboarding, waktu aktivasi akun.

#### Event Dictionary

| No | Event Name | Trigger | Who |
|---|---|---|---|
| O-01 | `onboarding_register_started` | User buka form registrasi | retailer, distributor, sales_force |
| O-02 | `onboarding_register_step_completed` | User selesaikan 1 step form | retailer, distributor |
| O-03 | `onboarding_register_submitted` | User submit form registrasi | retailer, distributor |
| O-04 | `onboarding_nik_verification_started` | User mulai verifikasi NIK | retailer |
| O-05 | `onboarding_nik_verification_completed` | NIK berhasil diverifikasi | retailer |
| O-06 | `onboarding_nik_verification_failed` | NIK gagal diverifikasi | retailer |
| O-07 | `onboarding_document_uploaded` | User upload dokumen (KTP, NPWP, dll) | distributor, retailer |
| O-08 | `onboarding_account_approved` | Admin approve akun | retailer, distributor |
| O-09 | `onboarding_account_rejected` | Admin reject akun | retailer, distributor |
| O-10 | `onboarding_first_login` | User pertama kali login setelah akun aktif | semua |
| O-11 | `onboarding_profile_completed` | User lengkapi profil toko/perusahaan | retailer, distributor |

#### Properties Tambahan

```json
// O-02: onboarding_register_step_completed
{
  "step_number": "integer",
  "step_name": "string",
  "time_on_step_seconds": "integer"
}

// O-06: onboarding_nik_verification_failed
{
  "failure_reason": "string",     // "nik_not_found" | "data_mismatch" | "api_error"
  "attempt_count": "integer"
}

// O-09: onboarding_account_rejected
{
  "rejection_reason": "string",
  "reviewed_by": "string"
}
```

#### Metrics yang Dihasilkan (Power BI)
- Funnel konversi registrasi per step
- Time-to-approve (submit → approved)
- Drop-off rate per step onboarding
- NIK verification success rate

---

### 🟢 Journey 2: Catalog & Produk

**Tujuan:** Memahami perilaku user dalam mencari dan melihat produk.

#### Event Dictionary

| No | Event Name | Trigger | Who |
|---|---|---|---|
| C-01 | `catalog_search_performed` | User ketik & submit search | retailer, distributor |
| C-02 | `catalog_search_result_viewed` | Halaman hasil search muncul | retailer, distributor |
| C-03 | `catalog_product_viewed` | User buka detail produk | retailer, distributor |
| C-04 | `catalog_product_added_to_cart` | User tambah produk ke keranjang | retailer, distributor |
| C-05 | `catalog_product_wishlisted` | User tambah ke wishlist | retailer, distributor |
| C-06 | `catalog_category_browsed` | User navigasi ke kategori produk | retailer, distributor |
| C-07 | `catalog_filter_applied` | User gunakan filter (harga, brand, dll) | retailer, distributor |
| C-08 | `catalog_banner_clicked` | User klik banner promosi | retailer, distributor |

#### Properties Tambahan

```json
// C-01: catalog_search_performed
{
  "search_query": "string",
  "search_result_count": "integer",
  "search_source": "string"       // "search_bar" | "voice" | "barcode_scan"
}

// C-03: catalog_product_viewed
{
  "product_id": "string",
  "product_name": "string",
  "product_category": "string",
  "brand": "string",
  "price": "number",
  "view_source": "string"         // "search" | "category" | "recommendation" | "banner"
}

// C-04: catalog_product_added_to_cart
{
  "product_id": "string",
  "quantity": "integer",
  "unit": "string",               // "pcs" | "dus" | "sak"
  "price_per_unit": "number"
}
```

#### Metrics yang Dihasilkan
- Search-to-purchase conversion rate
- Top produk paling dilihat vs dibeli
- Zero-result search queries

---

### 🟠 Journey 3: Order

**Tujuan:** Memahami proses order dari keranjang hingga order dikonfirmasi.

#### Event Dictionary

| No | Event Name | Trigger | Who |
|---|---|---|---|
| OR-01 | `order_cart_viewed` | User buka halaman keranjang | retailer, distributor |
| OR-02 | `order_cart_item_updated` | User ubah quantity / hapus item | retailer, distributor |
| OR-03 | `order_checkout_started` | User klik "Lanjut ke Checkout" | retailer, distributor |
| OR-04 | `order_address_selected` | User pilih/konfirmasi alamat pengiriman | retailer, distributor |
| OR-05 | `order_shipping_method_selected` | User pilih metode pengiriman | retailer, distributor |
| OR-06 | `order_voucher_applied` | User apply voucher/kode promo | retailer, distributor |
| OR-07 | `order_voucher_failed` | Voucher gagal diapply | retailer, distributor |
| OR-08 | `order_submitted` | User submit order (confirm purchase) | retailer, distributor |
| OR-09 | `order_confirmed` | Sistem/supplier konfirmasi order | supplier, admin_internal |
| OR-10 | `order_rejected` | Order ditolak oleh supplier/sistem | supplier, admin_internal |
| OR-11 | `order_cancelled` | User atau admin cancel order | retailer, distributor, admin_internal |
| OR-12 | `order_reordered` | User re-order dari riwayat | retailer, distributor |
| OR-13 | `order_list_viewed` | User buka riwayat/daftar order | retailer, distributor |
| OR-14 | `order_detail_viewed` | User buka detail order spesifik | retailer, distributor, admin_internal |

#### Properties Tambahan

```json
// OR-08: order_submitted
{
  "order_id": "string",
  "order_type": "string",           // "regular" | "repeat_order" | "emergency"
  "total_items": "integer",
  "total_skus": "integer",
  "gross_amount": "number",
  "discount_amount": "number",
  "net_amount": "number",
  "voucher_id": "string|null",
  "payment_method": "string",
  "credit_used": "boolean",
  "credit_amount": "number|null",
  "shipping_method": "string"
}

// OR-10 & OR-11: order_rejected / order_cancelled
{
  "order_id": "string",
  "reason_code": "string",
  "cancelled_by": "string"          // "user" | "supplier" | "admin" | "system"
}
```

#### Metrics yang Dihasilkan
- Cart abandonment rate (per step checkout)
- Average Order Value (AOV) per role
- Order rejection rate & top rejection reasons
- Repeat order rate per retailer
- GMV per supplier / distributor / region

---

### 🔴 Journey 4: Payment

**Tujuan:** Memahami preferensi metode pembayaran, success rate, dan kasus gagal bayar.

#### Event Dictionary

| No | Event Name | Trigger | Who |
|---|---|---|---|
| P-01 | `payment_method_viewed` | User lihat opsi payment | retailer, distributor |
| P-02 | `payment_method_selected` | User pilih metode bayar | retailer, distributor |
| P-03 | `payment_initiated` | User klik "Bayar Sekarang" | retailer, distributor |
| P-04 | `payment_completed` | Pembayaran berhasil dikonfirmasi | retailer, distributor |
| P-05 | `payment_failed` | Pembayaran gagal | retailer, distributor |
| P-06 | `payment_expired` | Payment link/invoice expired | system |
| P-07 | `payment_proof_uploaded` | User upload bukti transfer | retailer, distributor |
| P-08 | `payment_proof_verified` | Admin verifikasi bukti bayar | admin_internal |
| P-09 | `payment_proof_rejected` | Admin tolak bukti bayar | admin_internal |
| P-10 | `credit_limit_checked` | Sistem cek limit kredit | system |
| P-11 | `credit_limit_exceeded` | User melebihi limit kredit | system |
| P-12 | `invoice_viewed` | User buka invoice | retailer, distributor, admin_internal |
| P-13 | `invoice_downloaded` | User download invoice | retailer, distributor, admin_internal |

#### Properties Tambahan

```json
// P-02: payment_method_selected
{
  "payment_method": "string",     // "transfer_bank" | "cod" | "kredit" | "ewallet" | "tempo"
  "payment_provider": "string|null"
}

// P-05: payment_failed
{
  "failure_reason": "string",     // "insufficient_balance" | "bank_decline" | "timeout"
  "payment_method": "string",
  "attempt_count": "integer"
}

// P-10: credit_limit_checked
{
  "credit_limit": "number",
  "credit_used": "number",
  "credit_available": "number",
  "order_amount": "number",
  "is_approved": "boolean"
}
```

#### Metrics yang Dihasilkan
- Payment method distribution
- Payment success rate per metode
- Average payment time (order submitted → confirmed)
- Outstanding invoice aging
- Credit utilization rate per distributor/retailer

---

### 🟡 Journey 5: Pengiriman & Logistik

**Tujuan:** Memantau status DO, ketepatan pengiriman, dan konfirmasi penerimaan barang.

#### Event Dictionary

| No | Event Name | Trigger | Who |
|---|---|---|---|
| L-01 | `delivery_order_created` | DO dibuat oleh sistem/admin | admin_internal, supplier |
| L-02 | `delivery_order_dispatched` | Barang dikirim / driver pickup | supplier, admin_internal |
| L-03 | `delivery_status_updated` | Update status pengiriman | system |
| L-04 | `delivery_arrived` | Barang tiba di tujuan | system |
| L-05 | `delivery_confirmed_by_buyer` | Retailer/distributor konfirmasi terima | retailer, distributor |
| L-06 | `delivery_disputed` | Ada keluhan terkait pengiriman | retailer, distributor |
| L-07 | `delivery_return_requested` | User ajukan retur barang | retailer, distributor |
| L-08 | `delivery_return_approved` | Retur disetujui admin | admin_internal |

#### Properties Tambahan

```json
// L-01: delivery_order_created
{
  "delivery_order_id": "string",
  "order_id": "string",
  "logistics_provider": "string",
  "estimated_delivery_date": "date",
  "origin_warehouse": "string",
  "total_weight_kg": "number"
}

// L-06: delivery_disputed
{
  "dispute_type": "string"        // "barang_kurang" | "barang_rusak" | "salah_produk" | "tidak_sampai"
}
```

#### Metrics yang Dihasilkan
- On-time delivery rate per logistik provider
- Average lead time (DO created → confirmed)
- Retur rate per produk / supplier
- Dispute rate per wilayah

---

### 🟣 Journey 6: Loyalty & Voucher

**Tujuan:** Memantau performa program loyalty, klaim scan barcode, dan penggunaan voucher.

#### Event Dictionary

| No | Event Name | Trigger | Who |
|---|---|---|---|
| LV-01 | `loyalty_barcode_scanned` | User scan barcode produk untuk poin | retailer, sales_force |
| LV-02 | `loyalty_barcode_scan_success` | Scan berhasil, poin diberikan | system |
| LV-03 | `loyalty_barcode_scan_failed` | Scan gagal (sudah pernah, tidak valid) | system |
| LV-04 | `loyalty_points_balance_viewed` | User lihat saldo poin | retailer |
| LV-05 | `loyalty_voucher_list_viewed` | User lihat daftar voucher tersedia | retailer, distributor |
| LV-06 | `loyalty_voucher_claimed` | User klaim voucher | retailer, distributor |
| LV-07 | `loyalty_voucher_redeemed` | Voucher digunakan saat checkout | retailer, distributor |
| LV-08 | `loyalty_voucher_expired` | Voucher kadaluarsa tanpa digunakan | system |
| LV-09 | `loyalty_tier_upgraded` | User naik tier loyalty | system |
| LV-10 | `loyalty_tier_downgraded` | User turun tier loyalty | system |
| LV-11 | `loyalty_reward_redeemed` | User tukar poin dengan reward | retailer |
| LV-12 | `loyalty_reward_catalog_viewed` | User lihat katalog reward | retailer |

#### Properties Tambahan

```json
// LV-01: loyalty_barcode_scanned
{
  "barcode_value": "string",
  "product_id": "string|null",
  "scan_method": "string",        // "camera" | "manual_input"
  "location_lat": "number|null",
  "location_lng": "number|null"
}

// LV-03: loyalty_barcode_scan_failed
{
  "failure_reason": "string",     // "already_scanned" | "invalid_barcode" | "quota_exceeded" | "product_not_eligible"
  "barcode_value": "string"
}

// LV-06: loyalty_voucher_claimed
{
  "voucher_id": "string",
  "voucher_type": "string",       // "discount_persen" | "cashback" | "free_ongkir" | "free_item"
  "voucher_value": "number",
  "voucher_expiry_date": "date",
  "claim_source": "string"        // "poin_tukar" | "event" | "milestone" | "admin_grant"
}
```

#### Metrics yang Dihasilkan
- Daily Active Scanners
- Scan success rate vs failure rate
- Voucher claim-to-redeem rate
- Voucher expiry waste rate
- Loyalty tier distribution
- Poin yang issued vs redeemed vs expired

---

### 🚨 Journey 7: Fraud Detection

**Tujuan:** Deteksi anomali, flag transaksi mencurigakan, dan log setiap intervensi akun.

#### Event Dictionary

| No | Event Name | Trigger | Who |
|---|---|---|---|
| FD-01 | `fraud_scan_anomaly_detected` | Sistem deteksi anomali scan barcode | system |
| FD-02 | `fraud_account_flagged` | Akun di-flag mencurigakan | system, admin_internal |
| FD-03 | `fraud_account_suspended` | Akun disuspend | admin_internal |
| FD-04 | `fraud_account_reactivated` | Akun diaktifkan kembali | admin_internal |
| FD-05 | `fraud_claim_reviewed` | Admin review klaim yang dicurigai | admin_internal |
| FD-06 | `fraud_claim_approved` | Klaim dinyatakan valid | admin_internal |
| FD-07 | `fraud_claim_rejected` | Klaim dinyatakan fraud | admin_internal |
| FD-08 | `fraud_transaction_anomaly_detected` | Sistem deteksi anomali transaksi | system |
| FD-09 | `fraud_alert_sent` | Alert dikirim ke admin | system |
| FD-10 | `fraud_rule_triggered` | Satu aturan fraud engine terpicu | system |
| FD-11 | `fraud_kyc_mismatch_detected` | Data KYC tidak cocok | system |
| FD-12 | `fraud_device_fingerprint_changed` | Device baru dideteksi pada akun | system |

#### Properties Tambahan

```json
// FD-01: fraud_scan_anomaly_detected
{
  "anomaly_type": "string",         // "scan_frequency_high" | "geolocation_mismatch" | "multi_device" | "time_pattern_odd"
  "risk_score": "number",           // 0-100
  "threshold_triggered": "string",
  "scan_count_last_24h": "integer"
}

// FD-10: fraud_rule_triggered
{
  "rule_id": "string",
  "rule_name": "string",
  "rule_category": "string",        // "scan" | "transaction" | "account" | "kyc"
  "triggered_value": "string",
  "threshold_value": "string",
  "action_taken": "string"          // "flag" | "suspend" | "alert" | "block"
}

// FD-02: fraud_account_flagged
{
  "flag_reason": "string",
  "flag_source": "string",          // "auto_system" | "manual_admin" | "report_user"
  "risk_level": "string",           // "low" | "medium" | "high" | "critical"
  "evidence_ids": ["string"]
}
```

#### Metrics yang Dihasilkan
- Fraud detection rate (otomatis vs manual)
- False positive rate (flagged → approved setelah review)
- Risk score distribution per wilayah/distributor
- Top fraud rules yang paling sering trigger
- Account suspension & reactivation rate

---

## 🗂️ SECTION 2 — DATA REQUIREMENTS DOCUMENT

### Untuk Tim Data Analytics

---

### 2.1 Kebutuhan Data Pipeline

| Layer | Kebutuhan | Keterangan |
|---|---|---|
| **Ingestion** | Event streaming dari mobile & web | Custom SDK / Firebase Events |
| **Storage** | Raw event log + structured tables | Data Warehouse |
| **Transformation** | ETL/ELT untuk agregasi harian, mingguan | SQL / dbt |
| **Visualization** | Dashboard eksekutif & operational | Power BI |

### 2.2 Tabel Data Utama yang Dibutuhkan

#### `dim_users` — Master User

```sql
user_id             VARCHAR     -- PK
role                VARCHAR     -- supplier | distributor | retailer | sales_force | admin_internal
registered_at       TIMESTAMP
first_active_at     TIMESTAMP
city                VARCHAR
region              VARCHAR
tier                VARCHAR     -- bronze | silver | gold | platinum
is_active           BOOLEAN
kyc_status          VARCHAR     -- unverified | pending | verified | rejected
distributor_id      VARCHAR     -- FK jika retailer di bawah distributor tertentu
```

#### `fact_orders` — Transaksi Order

```sql
order_id            VARCHAR     -- PK
buyer_id            VARCHAR     -- FK dim_users
buyer_role          VARCHAR
supplier_id         VARCHAR     -- FK dim_users
distributor_id      VARCHAR
order_submitted_at  TIMESTAMP
order_status        VARCHAR     -- pending | confirmed | rejected | cancelled | completed
gross_amount        DECIMAL
discount_amount     DECIMAL
net_amount          DECIMAL
payment_method      VARCHAR
is_credit           BOOLEAN
credit_amount       DECIMAL
voucher_id          VARCHAR
shipping_method     VARCHAR
region              VARCHAR
```

#### `fact_payments` — Data Pembayaran

```sql
payment_id          VARCHAR     -- PK
order_id            VARCHAR     -- FK fact_orders
payment_method      VARCHAR
payment_status      VARCHAR     -- pending | completed | failed | expired
initiated_at        TIMESTAMP
completed_at        TIMESTAMP
amount              DECIMAL
failure_reason      VARCHAR
attempt_count       INTEGER
```

#### `fact_scans` — Log Scan Barcode Loyalty

```sql
scan_id             VARCHAR     -- PK
user_id             VARCHAR     -- FK dim_users
barcode_value       VARCHAR
product_id          VARCHAR
scanned_at          TIMESTAMP
scan_status         VARCHAR     -- success | failed
failure_reason      VARCHAR
risk_score          DECIMAL
device_id           VARCHAR
location_lat        DECIMAL
location_lng        DECIMAL
```

#### `fact_fraud_events` — Log Fraud & Intervensi

```sql
fraud_event_id      VARCHAR     -- PK
event_type          VARCHAR
user_id             VARCHAR     -- FK dim_users
detected_at         TIMESTAMP
risk_level          VARCHAR     -- low | medium | high | critical
risk_score          DECIMAL
rule_triggered      VARCHAR
action_taken        VARCHAR     -- flag | suspend | alert | block
reviewed_by         VARCHAR
review_outcome      VARCHAR     -- approved | rejected | pending
```

#### `fact_vouchers` — Lifecycle Voucher

```sql
voucher_id          VARCHAR     -- PK
user_id             VARCHAR     -- FK dim_users
voucher_type        VARCHAR
voucher_value       DECIMAL
claimed_at          TIMESTAMP
redeemed_at         TIMESTAMP
expired_at          TIMESTAMP
status              VARCHAR     -- claimed | redeemed | expired | cancelled
order_id            VARCHAR     -- FK jika sudah redeemed
```

### 2.3 SLA Data Freshness untuk Power BI

| Tipe Data | Freshness Target | Prioritas |
|---|---|---|
| Fraud events | Real-time / < 5 menit | 🔴 Critical |
| Transaction events | < 1 jam | 🟠 High |
| User behavior events | < 3 jam | 🟡 Medium |
| Aggregated reports | Daily (refresh pagi hari) | 🟢 Normal |

---

## 📋 SECTION 3 — PM SELF-SERVE TEMPLATE

Gunakan template ini setiap PM ingin menambahkan tracking untuk fitur baru.

---

```
## 📍 Tracking Spec: [Nama Fitur]

### Informasi Umum
- Feature Name     : 
- Area/Journey     : Onboarding | Order | Payment | Loyalty | Fraud | Logistik | Catalog
- PM Owner         : 
- Target Release   : 
- Ticket Ref       : 

---

### User Story
Sebagai [role], saya ingin [aksi], agar [tujuan].

---

### Events yang Dibutuhkan

| # | Event Name              | Trigger                    | User Role | Platform          | Priority |
|---|-------------------------|----------------------------|-----------|-------------------|----------|
| 1 | [area]_[object]_[verb]  | [Kapan event ini terjadi]  | [role]    | Android/iOS/Web   | P0/P1/P2 |

---

### Event Properties

Event: `nama_event`
- property_name  (type)   : deskripsi / contoh nilai
- property_name2 (type)   : deskripsi / contoh nilai

---

### Metrics yang Ingin Diukur
1. [Metric 1] — [Cara menghitung]
2. [Metric 2] — [Cara menghitung]

---

### Dashboard Power BI yang Dibutuhkan
[ ] Funnel visualization
[ ] Time series
[ ] Table / breakdown per segment
[ ] Lainnya: ___

---

### Definisi Sukses

| Metric | Baseline | Target | Timeframe |
|--------|----------|--------|-----------|
| [metric] | [nilai sekarang] | [target] | [3/6 bulan] |

---

### Sign-off

| Role        | Nama | Status                       |
|-------------|------|------------------------------|
| PM          |      | Approved / Pending           |
| Data        |      | Approved / Pending           |
| Engineering |      | Approved / Pending           |
```

---

## 🚦 Priority Matrix — Implementasi Pertama

| Journey | Priority | Alasan |
|---|---|---|
| Fraud Detection | 🔴 **P0** | Risiko bisnis langsung, butuh real-time monitoring |
| Order Journey | 🔴 **P0** | Core revenue tracking, GMV measurement |
| Payment Journey | 🔴 **P0** | Core revenue tracking, cash flow visibility |
| Loyalty & Voucher | 🟠 **P1** | Program aktif, butuh anti-abuse monitoring |
| Onboarding | 🟠 **P1** | Growth tracking, funnel optimization |
| Logistik | 🟡 **P2** | Operational efficiency, SLA tracking |
| Catalog & Produk | 🟡 **P2** | UX & discovery optimization |

---

## 📎 Konvensi & Standar

### Penamaan Event
- Format: `[area]_[object]_[verb]`
- Semua **huruf kecil**, dipisah **underscore**
- Verb yang valid: `viewed`, `clicked`, `submitted`, `completed`, `failed`, `created`, `updated`, `deleted`, `started`, `applied`, `selected`
- ✅ Benar: `order_cart_submitted`, `fraud_account_flagged`
- ❌ Salah: `OrderCartSubmit`, `fraud-account-Flag`, `submitOrder`

### Penamaan Properties
- Format: `snake_case`
- Boolean: dimulai dengan `is_` atau `has_`
- Timestamp: diakhiri dengan `_at`
- Count: diakhiri dengan `_count`
- ID: diakhiri dengan `_id`

---

*Dokumen ini adalah **living document**. Update setiap ada fitur baru atau perubahan scope tracking.*  
*Last updated: 2026-08-21 | Tim Product Manager*
