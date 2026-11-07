const pages = document.querySelectorAll(".page");

function showPage(id) {
  pages.forEach(page => {
    page.classList.toggle("active", page.id === id);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Membuka amplop sekaligus memutar lagu
document.getElementById("openEnvelope").addEventListener("click", function () {
  this.classList.add("opened");

  music.play().catch(() => {
    console.log("Musik belum bisa diputar.");
  });

  setTimeout(() => {
    showPage("letterPage");
  }, 450);
});

// Tombol MAUUU
document.getElementById("yesButton").addEventListener("click", () => {
  showPage("albumPage");
  makeConfetti();
});

// Tombol Nggak ah
const noButton = document.getElementById("noButton");

noButton.addEventListener("mouseenter", moveNoButton);
noButton.addEventListener("click", moveNoButton);

function moveNoButton() {
  const x = Math.random() * 180 - 90;
  const y = Math.random() * 100 - 50;

  noButton.style.transform = `translate(${x}px, ${y}px)`;
}

// Menambahkan foto
const photoInput = document.getElementById("photoInput");
const photoGrid = document.getElementById("photoGrid");

photoInput.addEventListener("change", event => {
  const files = Array.from(event.target.files || []);

  files.forEach(file => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();

    reader.onload = e => {
      const card = document.createElement("article");
      card.className = "photo-card";

      const image = document.createElement("img");
      image.src = e.target.result;
      image.alt = file.name;

      const caption = document.createElement("p");
      caption.textContent = file.name.replace(/\.[^/.]+$/, "");

      card.append(image, caption);
      photoGrid.appendChild(card);
    };

    reader.readAsDataURL(file);
  });
});

// Halaman kenangan
document.getElementById("toMemories").addEventListener("click", () => {
  showPage("memoriesPage");
});

// Halaman terakhir
document.getElementById("toFinal").addEventListener("click", () => {
  showPage("finalPage");
  makeConfetti();
});

// Mengulang website
document.getElementById("restart").addEventListener("click", () => {
  noButton.style.transform = "";
  showPage("envelopePage");
});

// Memilih musik
const musicInput = document.getElementById("musicInput");
const music = document.getElementById("backgroundMusic");

musicInput.addEventListener("change", event => {
  const file = event.target.files[0];

  if (!file) return;

  music.src = URL.createObjectURL(file);

  music.play().catch(() => {
    alert("Tekan tombol play pada browser jika musik belum berjalan.");
  });
});

// Efek confetti
function makeConfetti() {
  const symbols = ["💗", "💕", "✨", "🌸"];

  for (let i = 0; i < 24; i++) {
    const piece = document.createElement("span");

    piece.textContent = symbols[
      Math.floor(Math.random() * symbols.length)
    ];

    Object.assign(piece.style, {
      position: "fixed",
      left: Math.random() * 100 + "vw",
      top: "-30px",
      zIndex: 10,
      fontSize: (16 + Math.random() * 18) + "px",
      pointerEvents: "none",
      transition: "transform 2.4s ease-in, opacity 2.4s ease-in"
    });

    document.body.appendChild(piece);

    requestAnimationFrame(() => {
      piece.style.transform =
        `translateY(${window.innerHeight + 70}px) rotate(${Math.random() * 500}deg)`;

      piece.style.opacity = "0";
    });

    setTimeout(() => {
      piece.remove();
    }, 2500);
  }
}