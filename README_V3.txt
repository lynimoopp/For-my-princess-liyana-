OUR LITTLE STORY — V3 REVISED

PERUBAHAN VERSI INI
1. Ukuran video landscape dibuat kembali besar seperti screenshot:
   - desktop: 2 video berdampingan
   - rasio video: 16:9
   - panel video diperlebar supaya kartu video lebih besar
   - mobile: otomatis menjadi 1 video per baris
2. Ditambahkan bagian "A Message For Us".
3. Pacar bisa mengisi Nama + Pesan lalu menekan "KIRIM PESAN".
4. Form menggunakan Netlify Forms, jadi pesan bisa masuk ke dashboard Netlify.
5. JavaScript mengirim form tanpa memindahkan pengunjung ke halaman lain.

CARA DEPLOY
1. Extract ZIP.
2. Drag-and-drop folder `v3_site` ke Netlify.
3. Setelah deploy, buka website dan coba kirim satu pesan percobaan.
4. Di dashboard situs Netlify, buka menu Forms untuk melihat pesan masuk.
5. Kalau ingin setiap pesan juga masuk ke email:
   Netlify Dashboard -> Site -> Forms -> Notifications -> Email notification
   lalu masukkan email yang ingin menerima notifikasi.

VIDEO
- Video lokal diletakkan di folder `video/`.
- Nama contoh: `video1.mp4`, `video2.mp4`, `video3.mp4`.
- Video landscape otomatis dibuat 16:9 dan tampil 2 kolom di desktop.
- Video portrait tetap dipisahkan oleh sistem orientasi.

CATATAN PENTING
- Pesan benar-benar bisa tersimpan/diterima setelah situs di-deploy ke Netlify.
- Jika hanya membuka `index.html` langsung dari komputer (file://), Netlify Forms tidak akan memproses pesan.
- Untuk pesan masuk ke email, notifikasi email perlu diaktifkan sekali dari dashboard Netlify.
- Form memakai nama `love-message`.


WHATSAPP MESSAGE
-----------------
Bagian "A Message For Us" sekarang mengirim pesan langsung ke WhatsApp melalui link wa.me.
Sebelum deploy, buka script.js dan ganti:
  const LOVE_MESSAGE_WHATSAPP = "GANTI_DENGAN_NOMOR_WA";
dengan nomor WhatsApp tujuan dalam format internasional tanpa tanda +, spasi, atau strip.
Contoh Indonesia: 6281234567890

Format pesan yang otomatis dibuat:
💌 Ini pesan untuk kamu dari [nama]

[isi pesan]

— dikirim dari Our Little Story ♡

Catatan: website tidak dapat mengirim WhatsApp secara diam-diam. Setelah WhatsApp terbuka,
pengirim tetap perlu menekan tombol "Kirim" di WhatsApp.
