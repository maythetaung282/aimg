const videos = {
  ads: [
    {
      id: "1OSVGuGPcfmk307M_Tah47BW7Y2uk95gg",
      title: "Song & Dance Style Ads",
      note: "High-energy AI performance ads",
    },
    {
      id: "1VJ2Kx33p5JZDESNriTDdwYlCvTldLbL8",
      title: "Premium Cosmetic Ads",
      note: "Luxury beauty brand films",
    },
    {
      id: "1aor6lcKScRA9oTb0hY0zb-B_Lu65yxPP",
      title: "Product Ads with Storyline",
      note: "Narrative-driven product spots",
    },
    {
      id: "1J9klsu5GSoJXfXrthDq0oU38uZQPYNZ3",
      title: "Social Media Style Ads",
      note: "Platform-ready short content",
    },
  ],
  led: [
    {
      id: "1ZKt1z4de1Wl4Ot-4F79Esz2O0b6p_KXh",
      title: "IM Car LED Ads",
      note: "Automotive LED brand film",
    },
    {
      id: "1SocjYFUZ7EH2X5K16MPW5ExXaS15JjSD",
      title: "AVATR Car LED Ads",
      note: "Electric vehicle LED showcase",
    },
    {
      id: "19zXIGo8tFzarV6zGScjQ3Swi2JEzwsYp",
      title: "3D Toothpaste Sample",
      note: "3D product LED display",
    },
    {
      id: "1hGOkLpnyxez17UtwFR1sRDbjZ7HWwDkJ",
      title: "Prudential Final",
      note: "Insurance brand LED campaign",
    },
  ],
  premium: [
    {
      id: "1mtesLMRaWmyE-64OgyaZbGUmUCUjXAOM",
      title: "Premium Spot 15.6",
      note: "Premium product film",
    },
    {
      id: "1G2OZD3-oVfvbUsS4H4XfeqrUvGnjau-2",
      title: "Premium Spot 18.6",
      note: "Premium lifestyle film",
    },
    {
      id: "1FiJRuy9U2Kp819GisnUXXEwuN3tW_Qf-",
      title: "Melt Potato Snacks",
      note: "Snack brand campaign film",
    },
    {
      id: "17mxljjDlNeE4rl3AOrUxh-aGZux7kNMI",
      title: "Mistine Aqua",
      note: "Beauty product film",
    },
    {
      id: "1KR6J1Wiix9nJwNPNSwaBqajKaGaGjsxh",
      title: "Napkiss",
      note: "Brand product film",
    },
  ],
};

function driveUrl(id) {
  return `https://drive.google.com/file/d/${id}/view`;
}

function renderVideos(targetId, items) {
  const root = document.getElementById(targetId);
  if (!root) return;

  root.innerHTML = items
    .map(
      (item, index) => `
      <a
        class="video-link"
        href="${driveUrl(item.id)}"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="video-link-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="video-link-copy">
          <span class="video-link-title">${item.title}</span>
          <span class="video-link-note">${item.note}</span>
        </span>
        <span class="video-link-action">Watch on Drive</span>
      </a>
    `
    )
    .join("");
}

function setupNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");
  const header = document.querySelector(".site-header");

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

renderVideos("adsGrid", videos.ads);
renderVideos("ledGrid", videos.led);
renderVideos("premiumGrid", videos.premium);
setupNav();
setupReveal();
document.getElementById("year").textContent = String(new Date().getFullYear());
