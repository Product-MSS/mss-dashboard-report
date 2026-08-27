# Business Rules — Mitra1000s Dashboard B2B

Dokumen ini mencatat **aturan bisnis resmi** yang telah diverifikasi oleh Product Manager.
Perbarui dokumen ini setiap kali ada aturan bisnis baru yang dikonfirmasi.

> [!IMPORTANT]
> Setiap implementasi di `repositories/` **wajib** memiliki referensi ke nomor aturan di dokumen ini.

---

## Konvensi Format

```
### Aturan B[nomor]: [Nama Aturan]
- **Domain**: [Fitur/Modul terkait]
- **Kondisi**: [Klausa IF / DAN / ATAU yang jelas]
- **Implementasi**: `src/features/[fitur]/repositories/[Fitur]Repository.ts`
- **Diverifikasi oleh**: [PIC] pada [Tanggal]
```

---

## Modul: Status Item / Order

### Aturan B001: Definisi Status "On-Track"
- **Domain**: Order / Invoice
- **Kondisi**: Item berstatus `Open` dianggap **On-Track** JIKA:
  - Tidak memiliki tanggal jatuh tempo, ATAU
  - Tanggal jatuh tempo >= hari ini
- **Diverifikasi oleh**: Product Team pada 2026-08-26

### Aturan B002: Definisi Status "Overdue"
- **Domain**: Order / Invoice / Piutang
- **Kondisi**: Item berstatus `Open` dianggap **Overdue** JIKA:
  - Memiliki tanggal jatuh tempo DAN tanggal tersebut < hari ini
- **Diverifikasi oleh**: Product Team pada 2026-08-26

---

## Modul: Plafon Kredit

### Aturan B003: Blokir Order saat Plafon Habis
- **Domain**: Checkout / Order
- **Kondisi**: Order baru **diblokir** JIKA:
  - `totalOrderValue + outstandingBalance > creditLimit`
- **Diverifikasi oleh**: *[Belum diverifikasi — tambahkan PIC & tanggal]*

### Aturan B004: Peringatan Plafon Hampir Penuh
- **Domain**: Dashboard / Checkout
- **Kondisi**: Tampilkan badge `warning` JIKA:
  - Utilisasi plafon >= 80% (`usedCredit / creditLimit >= 0.80`)
- **Diverifikasi oleh**: *[Belum diverifikasi]*

---

## Modul: Tempo Pembayaran

*(Dokumentasikan aturan tempo, early cashback, dan jadwal payment di sini)*

---

## Modul: Dashboard KPI

*(Dokumentasikan definisi kalkulasi GMV, AOV, dan metrik bisnis lainnya di sini)*
