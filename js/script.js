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

  // GA4：主要リンクのクリックを計測（既存設定を維持）
  document.querySelectorAll(".button, .text-link").forEach(link => {
    link.addEventListener("click", () => {
      if (typeof gtag === "function") {
        gtag("event", "content_link_click", {
          link_text: link.textContent.trim(),
          link_url: link.getAttribute("href")
        });
      }
    });
  });


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