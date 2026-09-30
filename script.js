/* =========================================================
   OUR LITTLE STORY — V3 JAVASCRIPT
   - Reveal animation
   - Music button
   - Floating hearts
   - Automatic Portrait / Landscape sorter
   - Works for photos + local/external videos
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     REVEAL ANIMATION
     ======================================================= */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.04,
      rootMargin: "0px 0px -20px 0px"
    });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }

  /* =======================================================
     MUSIC BUTTON
     ======================================================= */
  const music = document.getElementById("music");
  const musicBtn = document.getElementById("musicBtn");
  const musicIcon = document.getElementById("musicIcon");
  const musicText = document.getElementById("musicText");

  if (music && musicBtn) {
    musicBtn.addEventListener("click", async () => {
      try {
        if (music.paused) {
          await music.play();
          musicBtn.classList.add("playing");
          if (musicIcon) musicIcon.textContent = "❚❚";
          if (musicText) musicText.textContent = "MUSIC ON";
        } else {
          music.pause();
          musicBtn.classList.remove("playing");
          if (musicIcon) musicIcon.textContent = "▶";
          if (musicText) musicText.textContent = "MUSIC OFF";
        }
      } catch (error) {
        console.warn("Music tidak dapat diputar:", error);
      }
    });

    music.addEventListener("ended", () => {
      musicBtn.classList.remove("playing");
      if (musicIcon) musicIcon.textContent = "▶";
      if (musicText) musicText.textContent = "MUSIC OFF";
    });
  }

  /* =======================================================
     FLOATING HEARTS
     ======================================================= */
  const heartContainer = document.getElementById("heartContainer");

  function createHeart() {
    if (!heartContainer) return;

    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = "♡";
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${10 + Math.random() * 12}px`;
    heart.style.animationDuration = `${7 + Math.random() * 7}s`;
    heart.style.animationDelay = `${Math.random() * 2}s`;

    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 16000);
  }

  setInterval(createHeart, 2600);

  /* =======================================================
     MEDIA ORIENTATION SYSTEM

     Semua item awalnya boleh ditulis di POOL.
     JavaScript akan membaca ukuran aslinya:
       tinggi > lebar  = PORTRAIT
       lebar >= tinggi = LANDSCAPE

     Item yang tidak bisa dibaca otomatis (mis. iframe Google Drive)
     harus diberi class "portrait" atau "landscape".
     ======================================================= */

  function addPortraitClass(item) {
    item.classList.add("portrait");
    item.classList.remove("landscape");
  }

  function addLandscapeClass(item, target) {
    item.classList.add("landscape");
    item.classList.remove("portrait");
    if (target && item.parentElement !== target) {
      target.appendChild(item);
    }
  }

  function setMediaRatio(item, width, height) {
    if (!width || !height) return;
    item.style.setProperty("--media-ratio", `${width} / ${height}`);
  }

  function classifyItem(item, target) {
    const orientation = (item.dataset.orientation || "auto").toLowerCase();

    /* Manual override untuk iframe / media yang tidak bisa dibaca */
    if (orientation === "portrait" || item.classList.contains("portrait")) {
      addPortraitClass(item);
      return;
    }

    if (orientation === "landscape" || item.classList.contains("landscape")) {
      addLandscapeClass(item, target);
      return;
    }

    const media = item.querySelector("img, video");
    if (!media) return;

    const classifyFromSize = () => {
      let width = 0;
      let height = 0;

      if (media.tagName === "IMG") {
        width = media.naturalWidth;
        height = media.naturalHeight;
      } else if (media.tagName === "VIDEO") {
        width = media.videoWidth;
        height = media.videoHeight;
      }

      if (!width || !height) return;

      setMediaRatio(item, width, height);

      if (height > width) {
        addPortraitClass(item);
      } else {
        addLandscapeClass(item, target);
      }
    };

    if (media.tagName === "IMG") {
      if (media.complete && media.naturalWidth > 0) {
        classifyFromSize();
      } else {
        media.addEventListener("load", classifyFromSize, { once: true });
      }
    }

    if (media.tagName === "VIDEO") {
      if (media.readyState >= 1 && media.videoWidth > 0) {
        classifyFromSize();
      } else {
        media.addEventListener("loadedmetadata", classifyFromSize, { once: true });
      }
    }
  }

  function setupMediaSorter() {
    const pools = document.querySelectorAll(".media-pool[data-media-sort]");

    pools.forEach((pool) => {
      const type = pool.dataset.mediaSort;
      const target = document.querySelector(
        `[data-media-target="${type}-landscape"]`
      );

      if (!target) return;

      [...pool.children].forEach((item) => {
        classifyItem(item, target);
      });
    });
  }

  setupMediaSorter();

  /* Re-check media after the browser has had time to load metadata. */
  window.addEventListener("load", () => {
    setupMediaSorter();
  });
});


/* =======================================================
   LOVE MESSAGE — WHATSAPP
   Ganti angka di bawah dengan nomor WhatsApp penerima.
   Format internasional tanpa +, spasi, atau tanda -.
   Contoh Indonesia: 6281234567890
   ======================================================= */
const LOVE_MESSAGE_WHATSAPP = "089509985612";

document.addEventListener("DOMContentLoaded", () => {
  const messageForm = document.getElementById("loveMessageForm");
  const messageStatus = document.getElementById("messageStatus");

  if (!messageForm) return;

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.getElementById("message-name");
    const messageInput = document.getElementById("message-text");
    const submitButton = messageForm.querySelector(".message-submit");

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) {
      if (messageStatus) {
        messageStatus.textContent = "Nama dan pesan jangan dikosongkan ya ♡";
      }
      return;
    }

    if (LOVE_MESSAGE_WHATSAPP === "GANTI_DENGAN_NOMOR_WA") {
      if (messageStatus) {
        messageStatus.textContent =
          "Nomor WhatsApp tujuan belum diatur. Buka script.js lalu isi LOVE_MESSAGE_WHATSAPP ♡";
      }
      return;
    }

    const whatsappNumber = LOVE_MESSAGE_WHATSAPP.replace(/\D/g, "");

    const whatsappText =
      `💌 Ini pesan untuk kamu dari ${name}\n\n` +
      `${message}\n\n` +
      `— dikirim dari Our Little Story ♡`;

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "<span>MEMBUKA WHATSAPP...</span><span>♡</span>";
    }

    if (messageStatus) {
      messageStatus.textContent =
        "WhatsApp sedang dibuka. Tinggal tekan tombol Kirim di WhatsApp ya ♡";
    }

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = "<span>KIRIM KE WHATSAPP</span><span>♡</span>";
      }
    }, 1200);
  });
});
