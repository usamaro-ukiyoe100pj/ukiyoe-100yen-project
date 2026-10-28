document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".global-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
  }

  const buttons = document.querySelectorAll(".lang-btn");

  function setLanguage(lang) {
    if (lang !== "en") lang = "ja";

    document.querySelectorAll("[data-ja][data-en]").forEach(el => {
      // textContent is used for plain text; HTML is only used when the source explicitly contains <br>.
      const value = el.dataset[lang];
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll("[data-alt-ja][data-alt-en]").forEach(el => {
      el.setAttribute(
        "alt",
        lang === "ja" ? el.dataset.altJa : el.dataset.altEn
      );
    });

    buttons.forEach(btn =>
      btn.classList.toggle("active", btn.dataset.lang === lang)
    );

    document.documentElement.lang = lang;
    localStorage.setItem("siteLanguage", lang);
  }

  buttons.forEach(btn =>
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang))
  );

  setLanguage(localStorage.getItem("siteLanguage") || "ja");

  document.querySelectorAll(".accordion-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      const panel = document.getElementById(
        trigger.getAttribute("aria-controls")
      );

      const isOpen =
        trigger.getAttribute("aria-expanded") === "true";

      trigger.setAttribute("aria-expanded", String(!isOpen));

      if (panel) panel.hidden = isOpen;
    });

    trigger.addEventListener("keydown", event => {
      const items = [...document.querySelectorAll(".accordion-trigger")];
      const index = items.indexOf(trigger);

      if (event.key === "ArrowDown") {
        event.preventDefault();
        items[(index + 1) % items.length].focus();
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        items[(index - 1 + items.length) % items.length].focus();
      }

      if (event.key === "Home") {
        event.preventDefault();
        items[0].focus();
      }

      if (event.key === "End") {
        event.preventDefault();
        items[items.length - 1].focus();
      }
    });
  });

  // GA4: events for meaningful site interactions. GA4 base tag is kept in each page.
  const sendEvent = (name, parameters = {}) => {
    if (typeof window.gtag === "function") {
      window.gtag("event", name, { page_section: currentPage, ...parameters });
    }
  };

  document.addEventListener("click", event => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    const url = new URL(link.href, window.location.href);
    const label = (link.getAttribute("aria-label") || link.textContent || "").trim().slice(0, 100);
    const data = { link_text: label, link_url: url.href };

    if (link.dataset.track === "back_to_top") {
      sendEvent("back_to_top", data);
    } else if (link.dataset.track === "video_click") {
      sendEvent("video_click", { ...data, video_name: link.dataset.videoName || "unknown" });
    } else if (/instagram\.com|youtube\.com|youtu\.be|(^|\.)x\.com$|twitter\.com/.test(url.hostname)) {
      sendEvent("sns_click", { ...data, sns_platform: url.hostname.replace(/^www\./, "") });
    } else if (url.origin !== window.location.origin && /^https?:$/.test(url.protocol)) {
      sendEvent("outbound_content_click", data);
    } else if (link.closest(".global-nav")) {
      sendEvent("navigation_click", data);
    } else if (link.matches(".button, .text-link")) {
      sendEvent("content_link_click", data);
    }
  });

  // Accordion openings show which topics attract interest.
  document.querySelectorAll(".accordion-trigger").forEach(trigger => {
    trigger.addEventListener("click", () => {
      if (trigger.getAttribute("aria-expanded") === "true") {
        sendEvent("accordion_open", { topic_name: trigger.textContent.trim().slice(0, 100) });
      }
    });
  });

  // The artist cards are not links: measure visible cards, not fictitious clicks.
  if ("IntersectionObserver" in window) {
    const viewed = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const artist = entry.target.dataset.artist;
        if (artist && !viewed.has(artist)) {
          viewed.add(artist);
          sendEvent("artist_view", { artist_name: artist });
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll(".artist-card[data-artist]").forEach(card => observer.observe(card));
  }

  // =========================
  // 障子を開く
  // =========================
  const shojiBox = document.getElementById("shojiBox");

  if (shojiBox) {
    setTimeout(() => {
      shojiBox.classList.add("open");
    }, 550);
  }

});

// ========================================
// 現在のページをナビゲーションで表示
// ========================================

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".global-nav a").forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
        link.classList.add("current");
    }
});