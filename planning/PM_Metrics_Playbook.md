# 📈 PM Metrics Playbook — B2B E-Commerce
### Supplier → Distributor → Retailer (Toko Bangunan)

> **Versi:** 1.0  
> **Dibuat oleh:** Tim Product Manager  
> **Tanggal:** 2026-08-21  
> **Audience:** Product Manager  
> **Companion doc:** [B2B Ecommerce Data Tracking Plan](./B2B_Ecommerce_Data_Tracking_Plan.md)  
> **Visualisasi:** Power BI  
> **Review cadence:** Daily · Weekly · Monthly · Quarterly

---

## 📋 Brief & Konteks untuk Tim Data

### Latar Belakang

Dokumen ini adalah **formal data request dari Tim Product Manager** kepada Tim Data Analytics sebagai bagian dari inisiatif membangun fondasi data-driven product management di sistem B2B e-commerce kami.

Sistem kami menghubungkan tiga layer bisnis:

```
Supplier  →  Distributor  →  Retailer (Toko Bangunan)
```

Seluruh transaksi, interaksi pengguna, dan aktivitas program loyalty berjalan melalui **Mobile App (Android/iOS)** dan **Web App/Dashboard Admin**. Saat ini kami belum memiliki visibility yang memadai atas performa produk secara kuantitatif, sehingga keputusan product roadmap masih banyak bergantung pada asumsi dan feedback kualitatif.

---

### Mengapa Kami Meminta Data Ini

Tim Product Manager membutuhkan data yang terstruktur dan konsisten untuk dapat menjawab pertanyaan-pertanyaan bisnis berikut secara objektif:

1. **Apakah produk kami tumbuh?** — Berapa user baru yang join dan berhasil aktif bertransaksi?
2. **Apakah user kami loyal?** — Berapa % yang kembali order bulan berikutnya dan tidak churn?
3. **Di mana user drop-off?** — Step mana dalam checkout atau onboarding yang paling banyak ditinggalkan?
4. **Apakah fitur yang kami bangun dipakai?** — Seberapa besar adoption voucher, loyalty scan, dan fitur lainnya?
5. **Seberapa sehat revenue kami?** — Bagaimana tren GMV, AOV, dan payment success rate dari waktu ke waktu?

Tanpa data ini, tim PM tidak dapat membuat keputusan prioritas fitur yang berbasis bukti, mengukur dampak eksperimen produk, atau mendeteksi masalah pengalaman pengguna secara cepat.

---

### Scope & Batasan

| Item | Detail |
|---|---|
| **Periode data yang dibutuhkan** | Mulai dari tanggal go-live sistem hingga real-time (ongoing) |
| **Granularitas data** | Event-level (per-user, per-session) untuk analisis funnel; agregasi harian/mingguan untuk dashboard |
| **Visualisasi akhir** | Power BI — dashboard akan dikonsumsi oleh tim PM secara mandiri |
| **Yang TIDAK termasuk dalam request ini** | Data fraud & integrity (akan di-request terpisah setelah sistem fraud engine siap) |

---

### Cara Data Ini Akan Digunakan

- **Review mingguan & bulanan** oleh PM untuk memantau product health
- **Pengambilan keputusan roadmap** — fitur apa yang diprioritaskan di sprint berikutnya
- **Evaluasi eksperimen** — mengukur apakah perubahan fitur berdampak positif pada metrics
- **Laporan ke stakeholder** — update performa produk ke leadership secara berkala

---

### Dokumen Pendukung

| Dokumen | Isi | Link |
|---|---|---|
| **B2B Ecommerce Data Tracking Plan** | Event dictionary lengkap, struktur tabel database, dan naming convention | [Buka dokumen](./B2B_Ecommerce_Data_Tracking_Plan.md) |
| **PM Metrics Playbook** (dokumen ini) | Daftar metrics, formula, cadence review, dan ownership | — |

---

> [!IMPORTANT]
> Seluruh metrics dalam dokumen ini sudah dilengkapi dengan **formula kalkulasi**, **event source** dari tracking plan, dan **cadence review**. Tim Data cukup merujuk ke event dictionary di dokumen Tracking Plan untuk memastikan data yang dibutuhkan sudah ter-capture dengan benar.

---

## ⭐ North Star Metric (NSM)

> **"Satu angka yang kalau naik, berarti produk berhasil."**

| North Star Metric | Definisi | Formula |
|---|---|---|
| **GMV (Gross Merchandise Value)** | Total nilai seluruh transaksi order yang berhasil disubmit dalam periode tertentu | `SUM(gross_amount) dari fact_orders WHERE order_status NOT IN ('cancelled', 'rejected')` |

**Kenapa GMV?**
- Mencerminkan volume bisnis keseluruhan di ekosistem (supplier ↔ distributor ↔ retailer)
- Naik ketika akuisisi user berhasil, retention baik, dan product experience lancar
- Dipengaruhi langsung oleh semua journey (onboarding, order, payment, logistik, loyalty)

---

## 🌳 Metrics Tree — L1 Supporting Metrics

GMV didukung oleh **5 driver utama** yang harus semua naik:

```
GMV
├── 1. Acquisition       → Berapa banyak user baru yang join?
├── 2. Activation        → Berapa % yang langsung transaksi?
├── 3. Retention         → Berapa % yang balik order bulan depan?
├── 4. Revenue           → Seberapa besar nilai per transaksi?
└── 5. Referral          → Berapa user baru yang datang dari referral?
     └── (Bonus) Feature Adoption → Seberapa dalam user pakai fitur?
```

---

## 📊 AARRR Metrics — Detail per Kategori

---

### 1️⃣ ACQUISITION — Berapa user baru yang kita dapatkan?

**Pertanyaan bisnis:** Apakah saluran akuisisi kita berjalan? Apakah sales force efektif onboarding retailer baru?

| Metric | Definisi | Formula | Cadence | Event Source |
|---|---|---|---|---|
| **New Registered Users** | Jumlah akun baru yang berhasil registrasi | `COUNT(user_id) WHERE registered_at IN [periode]` | Weekly | `onboarding_register_submitted` |
| **New Verified Accounts** | Jumlah akun yang lolos KYC & diaktifkan | `COUNT(user_id) WHERE kyc_status = 'verified' AND first_active_at IN [periode]` | Weekly | `onboarding_account_approved` |
| **Registration-to-Approval Rate** | % dari yang daftar hingga disetujui | `(New Verified / New Registered) × 100` | Weekly | O-03 → O-08 |
| **New Retailer per Sales Force** | Rata-rata retailer baru yang di-onboard per 1 sales force | `COUNT(new_retailer) / COUNT(active_sales_force)` | Monthly | `onboarding_first_login` (role=retailer) |
| **NIK Verification Success Rate** | % verifikasi NIK yang berhasil | `(success / total_attempts) × 100` | Weekly | O-05 / (O-05+O-06) |
| **Time-to-Active** | Rata-rata hari dari registrasi hingga akun aktif | `AVG(first_active_at - registered_at) in days` | Monthly | O-03 → O-10 |

**Breakdown yang dibutuhkan:** per region, per role (retailer vs distributor), per referral source (sales force vs organik)

---

### 2️⃣ ACTIVATION — Berapa % user yang langsung "merasakan value"?

**Pertanyaan bisnis:** Apakah user baru langsung tahu cara pakai produk? Apakah onboarding cukup smooth untuk langsung transaksi?

| Metric | Definisi | Formula | Cadence | Event Source |
|---|---|---|---|---|
| **D-7 Activation Rate** | % user baru yang melakukan order dalam 7 hari pertama | `(user_baru_order_d7 / new_verified_accounts) × 100` | Weekly | `onboarding_first_login` → `order_submitted` |
| **D-30 Activation Rate** | % user baru yang melakukan order dalam 30 hari pertama | `(user_baru_order_d30 / new_verified_accounts) × 100` | Monthly | same |
| **Onboarding Completion Rate** | % user yang mengisi profil lengkap setelah aktif | `COUNT(onboarding_profile_completed) / COUNT(first_login) × 100` | Weekly | O-10 → O-11 |
| **First Order Value (FOV)** | Rata-rata nilai order pertama user baru | `AVG(gross_amount) WHERE is_first_order = true` | Monthly | `order_submitted` |
| **Checkout Funnel Drop-off Rate** | % user yang drop di setiap step checkout | `(user_at_step_n - user_at_step_n+1) / user_at_step_n × 100` | Weekly | OR-01 → OR-03 → OR-08 |

**Funnel Checkout yang dimonitor:**
```
Cart Viewed → Checkout Started → Address Selected → Shipping Selected → Order Submitted
```

---

### 3️⃣ RETENTION — Apakah user balik lagi?

**Pertanyaan bisnis:** Apakah retailer puas dan repeat order? Apakah distributor setia ke platform kita?

| Metric | Definisi | Formula | Cadence | Event Source |
|---|---|---|---|---|
| **Monthly Active Buyers (MAB)** | Jumlah unique buyer yang bertransaksi dalam 30 hari | `COUNT(DISTINCT user_id) WHERE order_submitted_at IN [last_30_days]` | Monthly | `order_submitted` |
| **Weekly Active Buyers (WAB)** | Jumlah unique buyer yang bertransaksi dalam 7 hari | `COUNT(DISTINCT user_id) WHERE order_submitted_at IN [last_7_days]` | Weekly | `order_submitted` |
| **M1 Retention Rate** | % buyer bulan ini yang juga order bulan lalu | `(buyer_repeat_this_month / buyer_last_month) × 100` | Monthly | `fact_orders` |
| **Churn Rate** | % buyer yang tidak order sama sekali dalam 60 hari | `COUNT(user_no_order_60d) / COUNT(total_active_buyers) × 100` | Monthly | `fact_orders` |
| **Order Frequency** | Rata-rata berapa kali seorang buyer order per bulan | `COUNT(orders) / COUNT(DISTINCT buyer_id)` dalam 30 hari | Monthly | `order_submitted` |
| **Repeat Order Rate** | % order yang berasal dari user yang sudah pernah order | `COUNT(order WHERE user is repeat) / COUNT(all_orders) × 100` | Weekly | OR-12 `order_reordered` |
| **Loyalty Scan Retention** | % scanner aktif yang masih scan minggu ini vs minggu lalu | `(scanner_this_week / scanner_last_week) × 100` | Weekly | `loyalty_barcode_scan_success` |

---

### 4️⃣ REVENUE — Seberapa besar nilai yang dihasilkan?

**Pertanyaan bisnis:** Seberapa besar transaksi? Apakah nilai order meningkat? Apakah metode pembayaran yang kita dorong efektif?

| Metric | Definisi | Formula | Cadence | Event Source |
|---|---|---|---|---|
| **GMV** ⭐ | Total nilai transaksi | `SUM(gross_amount) WHERE status valid` | Daily / Weekly / Monthly | `order_submitted` |
| **Net GMV** | GMV dikurangi cancel & reject | `SUM(net_amount) WHERE status = 'completed'` | Monthly | `fact_orders` |
| **Average Order Value (AOV)** | Rata-rata nilai per order | `GMV / COUNT(orders)` | Weekly | `order_submitted` |
| **GMV per Distributor** | Kontribusi GMV per distributor | `SUM(gross_amount) GROUP BY distributor_id` | Monthly | `fact_orders` |
| **GMV per Region** | Kontribusi GMV per wilayah | `SUM(gross_amount) GROUP BY region` | Monthly | `fact_orders` |
| **Payment Success Rate** | % transaksi yang berhasil dibayar | `COUNT(payment_completed) / COUNT(payment_initiated) × 100` | Daily | P-04 / P-03 |
| **Payment Method Mix** | Distribusi metode pembayaran yang dipakai | `COUNT(orders) GROUP BY payment_method` | Monthly | `payment_method_selected` |
| **Invoice Outstanding (Aging)** | Total piutang yang belum dibayar per aging bucket | `SUM(amount) WHERE status='pending' GROUP BY aging_days` | Weekly | `fact_payments` |
| **Credit Utilization Rate** | Rata-rata % limit kredit yang terpakai per user | `AVG(credit_used / credit_limit) × 100` | Monthly | `credit_limit_checked` |
| **Discount Burn Rate** | Total diskon/voucher yang di-burn per periode | `SUM(discount_amount)` | Monthly | `order_submitted` |

---

### 5️⃣ REFERRAL — Seberapa organik pertumbuhan kita?

**Pertanyaan bisnis:** Apakah retailer merekomendasikan ke retailer lain? Seberapa efektif sales force sebagai channel akuisisi?

| Metric | Definisi | Formula | Cadence | Event Source |
|---|---|---|---|---|
| **New User via Sales Force** | Jumlah user baru yang di-onboard oleh sales force (bukan self-register) | `COUNT(user WHERE registered_by = 'sales_force')` | Monthly | `onboarding_register_started` (source=sales_force) |
| **Sales Force Conversion Rate** | % retailer yang di-prospek dan akhirnya aktif & transaksi | `(activated_retailer_by_SF / total_prospected) × 100` | Monthly | `onboarding_account_approved` linked to sales_force |
| **Referral Attribution Rate** | % akun baru dari referral code / link | `COUNT(registered_via_referral) / COUNT(all_new_users) × 100` | Monthly | `onboarding_register_started` (source=referral) |

---

### 6️⃣ FEATURE ADOPTION — Seberapa dalam user pakai fitur?

**Pertanyaan bisnis:** Apakah fitur yang kita bangun dipakai? Apakah loyalty program berhasil mendorong retensi?

| Metric | Definisi | Formula | Cadence | Event Source |
|---|---|---|---|---|
| **Loyalty Adoption Rate** | % active retailer yang aktif scan barcode | `COUNT(DISTINCT scanner_id in last_30d) / COUNT(active_retailers) × 100` | Monthly | `loyalty_barcode_scan_success` |
| **DAU (Daily Active Users)** | Jumlah unik user yang melakukan aktivitas apapun di app dalam 1 hari — digunakan sebagai sanity check teknis, bukan KPI utama | `COUNT(DISTINCT user_id) WHERE activity_date = today` | Daily | Semua event (any event fired) |
| **WAU (Weekly Active Users)** | Jumlah unik user yang melakukan aktivitas apapun dalam 7 hari — lebih realistis untuk mengukur engagement B2B | `COUNT(DISTINCT user_id) WHERE activity_date IN [last_7_days]` | Weekly | Semua event (any event fired) |
| **Voucher Claim Rate** | % user yang mengklaim voucher dari yang melihat list | `COUNT(voucher_claimed) / COUNT(voucher_list_viewed) × 100` | Weekly | LV-06 / LV-05 |
| **Voucher Redemption Rate** | % voucher yang diklaim dan benar-benar dipakai | `COUNT(voucher_redeemed) / COUNT(voucher_claimed) × 100` | Monthly | LV-07 / LV-06 |
| **Voucher Waste Rate** | % voucher yang expire tanpa digunakan | `COUNT(voucher_expired) / COUNT(voucher_claimed) × 100` | Monthly | LV-08 / LV-06 |
| **Search-to-Order Rate** | % user yang search produk dan akhirnya order | `COUNT(user_search_then_order) / COUNT(user_searched) × 100` | Weekly | C-01 → OR-08 |
| **Reorder Rate** | % order yang merupakan repeat dari order sebelumnya | `COUNT(order_reordered) / COUNT(all_orders) × 100` | Monthly | `order_reordered` |

---

## 🏥 PRODUCT HEALTH METRICS

Indikator teknis yang PM perlu monitor agar tahu produk berjalan normal.

| Metric | Definisi | Cadence | Signal Buruk |
|---|---|---|---|
| **Order Submit Success Rate** | % order yang berhasil di-submit tanpa error | Daily | Kalau turun mendadak → ada bug di checkout |
| **Payment Error Rate** | % payment yang error (bukan gagal bayar, tapi error sistem) | Daily | Spike → ada isu di payment gateway |
| **App Crash during Scan** | Jumlah session yang crash saat proses scan barcode | Daily | Naik → ada isu versi app tertentu |
| **Zero-Result Search Rate** | % search query yang tidak menghasilkan produk apapun | Weekly | Naik → catalog kurang lengkap / search kurang relevan |
| **Data Freshness Lag** | Selisih antara event terjadi dengan data muncul di Power BI | Daily | Melebihi SLA → pipeline bermasalah |

---

## 📅 PM Review Cadence & Checklist

### 🔴 Daily Check (< 10 menit)
Lihat anomali — jangan review tren, cukup cek apakah ada yang abnormal.

```
[ ] GMV hari ini vs hari yang sama minggu lalu — ada perbedaan > 30%?
[ ] Payment success rate — ada drop mendadak?
[ ] Order submit error rate — ada error baru?
[ ] DAU hari ini — ada penurunan > 20% dari baseline?
```

### 🟡 Weekly Review (30-45 menit)
Lihat tren 7 hari dan bandingkan dengan minggu lalu (WoW).

```
[ ] GMV WoW — naik atau turun? Apa penyebabnya?
[ ] WAB (Weekly Active Buyers) — stabil atau ada churn?
[ ] Checkout funnel drop-off — di step mana paling banyak?
[ ] Voucher claim & redemption rate — sehat?
[ ] NIK verification success rate — ada penurunan?
[ ] Top zero-result search queries — perlu update catalog?
```

### 🟢 Monthly Review (2-3 jam)
Deep-dive tren 30 hari dan buat keputusan produk.

```
[ ] GMV MoM — Growth rate berapa %? Sesuai target?
[ ] MAB & Retention Rate — Churn dari segmen mana?
[ ] AOV trend — Naik/turun? Apa faktor yang memengaruhi?
[ ] Acquisition funnel — Berapa user baru? Dari mana sumbernya?
[ ] D-7 & D-30 Activation Rate — User baru langsung transaksi?
[ ] Feature adoption — Loyalty/voucher dipakai berapa %?
[ ] Credit utilization — Risiko piutang macet?
[ ] Payment method mix — Ada pergeseran preferensi?
```

### 🔵 Quarterly Review (Half-day session)
Review strategis — sesuaikan roadmap, evaluasi eksperimen, update target.

```
[ ] GMV QoQ & growth trajectory — On track menuju target tahunan?
[ ] Retention cohort analysis — Cohort bulan mana yang paling sehat?
[ ] LTV per segment (retailer besar vs kecil, per region) — Segment mana paling valuable?
[ ] Feature adoption maturity — Fitur mana yang perlu di-improve vs deprecated?
[ ] Competitor benchmarking — Apakah metrics kita kompetitif?
[ ] Roadmap adjustment berdasarkan data — Fitur apa yang paling move the needle?
```

---

## 👤 Metric Ownership Matrix

Setiap metric harus ada PIC-nya agar tidak ada yang "tidak ada yang punya".

| Area Metric | PM Owner | Data Requester | Dashboard Power BI |
|---|---|---|---|
| GMV & Revenue | PM Lead / CPO | Tim Data | Executive Dashboard |
| Acquisition & Onboarding | PM Onboarding/Growth | Tim Data | Growth Dashboard |
| Activation & Checkout Funnel | PM Core Product | Tim Data | Product Health Dashboard |
| Retention & Churn | PM Core Product | Tim Data | Retention Dashboard |
| Loyalty & Voucher | PM Loyalty | Tim Data | Loyalty Dashboard |
| Feature Adoption | PM per Fitur | Tim Data | Feature Adoption Dashboard |

---

## 📐 Glossary & Definisi Standar

| Term | Definisi |
|---|---|
| **Active Buyer** | User dengan minimal 1 order submitted (non-cancelled) dalam 30 hari terakhir |
| **Active Scanner** | User dengan minimal 1 successful scan dalam 30 hari terakhir |
| **Verified Account** | Akun yang status KYC = `verified` dan `is_active = true` |
| **First Order** | Order pertama yang pernah dibuat oleh user_id tertentu |
| **Repeat Order** | Order ke-2 dan seterusnya dari user yang sama |
| **Churn** | User yang tidak melakukan order sama sekali selama 60 hari berturut-turut |
| **WoW** | Week-over-Week: perbandingan minggu ini vs minggu yang sama sebelumnya |
| **MoM** | Month-over-Month: perbandingan bulan ini vs bulan lalu |
| **QoQ** | Quarter-over-Quarter: perbandingan kuartal ini vs kuartal sebelumnya |
| **GMV** | Gross Merchandise Value: total `gross_amount` dari semua order valid |
| **Net GMV** | GMV setelah dikurangi cancel, reject, dan retur |

---

*Dokumen ini adalah **living document** — update setiap ada metric baru atau definisi yang berubah.*  
*Last updated: 2026-08-21 | Tim Product Manager*
