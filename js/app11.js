const filter_btns = document.querySelectorAll(".filter-btn");
const skills_wrap = document.querySelector(".skills");
const skills_bars = document.querySelectorAll(".skill-progress");
const records_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const footer_input = document.querySelector(".footer-input");
const hamburger_menu = document.querySelector(".hamburger-menu");
const navbar = document.querySelector("header nav");
const links = document.querySelectorAll(".links a");

footer_input.addEventListener("focus", () => {
  footer_input.classList.add("focus");
});

footer_input.addEventListener("blur", () => {
  if (footer_input.value != "") return;
  footer_input.classList.remove("focus");
});

function closeMenu() {
  navbar.classList.remove("open");
  document.body.classList.remove("stop-scrolling");
}

hamburger_menu.addEventListener("click", () => {
  if (!navbar.classList.contains("open")) {
    navbar.classList.add("open");
    document.body.classList.add("stop-scrolling");
  } else {
    closeMenu();
  }

  smoothScrollTo(0);
});

links.forEach((link) =>
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    smoothScrollTo(target.offsetTop);
    closeMenu();
  })
);

filter_btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filter_btns.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    let filterValue = btn.dataset.filter;

    $(".grid").isotope({ filter: filterValue });
  })
);

$(".grid").isotope({
  itemSelector: ".grid-item",
  layoutMode: "fitRows",
  transitionDuration: "0.6s",
});

window.addEventListener("scroll", () => {
  skillsEffect();
  countUp();
});

function checkScroll(el) {
  let rect = el.getBoundingClientRect();
  if (window.innerHeight >= rect.top + el.offsetHeight) return true;
  return false;
}

function skillsEffect() {
  if (!checkScroll(skills_wrap)) return;
  skills_bars.forEach((skill) => (skill.style.width = skill.dataset.progress));
}

function countUp() {
  if (!checkScroll(records_wrap)) return;
  records_numbers.forEach((numb) => {
    const updateCount = () => {
      let currentNum = +numb.innerText;
      let maxNum = +numb.dataset.num;
      let speed = 200;
      const increment = Math.ceil(maxNum / speed);

      if (currentNum < maxNum) {
        numb.innerText = currentNum + increment;
        setTimeout(updateCount, 1);
      } else {
        numb.innerText = maxNum;
      }
    };

    setTimeout(updateCount, 400);
  });
}

var mySwiper = new Swiper(".swiper-container", {
  speed: 1100,
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});

const backBtn = document.querySelector(".back-btn");

backBtn.addEventListener("click", (event) => {
  event.preventDefault();
  smoothScrollTo(0);
});

function smoothScrollTo(targetPosition) {
  const startPosition =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop;
  const distance = targetPosition - startPosition;
  const duration = 800;
  let startTimestamp = null;

  function step(timestamp) {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = timestamp - startTimestamp;
    window.scrollTo(
      0,
      easeInOutCubic(progress, startPosition, distance, duration)
    );
    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

///matikan klik kanan
document.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});
////

/// canvas 
    // Fungsi untuk melindungi gambar dengan menambahkan watermark
    function protectImage(imagePaths) {
      for (var i = 0; i < imagePaths.length; i++) {
        var imagePath = imagePaths[i];
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        var image = new Image();
        image.crossOrigin = "Anonymous"; // Mengizinkan gambar untuk diambil dari sumber lintas domain
        image.src = imagePath;

        image.onload = function() {
          canvas.width = image.width;
          canvas.height = image.height;

          // Menggambar gambar asli pada elemen canvas
          ctx.drawImage(image, 0, 0);

          // Menambahkan watermark
          ctx.font = "20px Arial";
          ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
          ctx.fillText("Watermark", 10, 30);

          // Mengganti gambar asli dengan gambar yang dilindungi
          image.src = canvas.toDataURL();
        };
      }
    }

    // Memanggil fungsi protectImage() saat halaman dimuat
    window.addEventListener("DOMContentLoaded", function() {
      var imagePaths = [
        "img/map.jpg",
        "img/logo.png"
      ]; // Ganti dengan path gambar-gambar yang ingin dilindungi
      protectImage(imagePaths);
    });

/// Galery
function showLargeImage(imagePath) {
  var largeImage = document.createElement('img');
  largeImage.src = imagePath;
  largeImage.style.maxWidth = '100%';
  largeImage.style.maxHeight = '100%';
  
  var overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.zIndex = '9999';
  
  overlay.appendChild(largeImage);
  document.body.appendChild(overlay);
  
  overlay.addEventListener('click', function() {
    document.body.removeChild(overlay);
  });
}

/// Jam kerja
function updateWorkHours() {
  const workHourElement = document.querySelector('.number[data-num="0"]');
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const startMonth = 0; // Bulan pertama (Januari)
  const startYear = 2022; // Tahun mulai

  const monthsDiff = (currentYear - startYear) * 12 + (currentMonth - startMonth);
  const workHours = monthsDiff * 160; // Asumsi 160 jam kerja per bulan
  workHourElement.textContent = workHours;
}

// Panggil fungsi updateWorkHours setiap detik
setInterval(updateWorkHours, 1000);

/// Music
var audio = document.getElementById('myAudio');
var playIcon = document.querySelector('.play_pause_icon');
var checkbox = document.getElementById('checkbox');

playIcon.addEventListener('click', function() {
  if (audio.paused) {
    audio.play();
    playIcon.classList.remove('play');
    playIcon.classList.add('pause');
  } else {
    audio.pause();
    playIcon.classList.remove('pause');
    playIcon.classList.add('play');
  }
});

checkbox.addEventListener('change', function() {
  if (checkbox.checked) {
    audio.play();
    playIcon.classList.remove('play');
    playIcon.classList.add('pause');
  } else {
    audio.pause();
    playIcon.classList.remove('pause');
    playIcon.classList.add('play');
  }
});

audio.addEventListener('play', function() {
  playIcon.classList.remove('play');
  playIcon.classList.add('pause');
});

audio.addEventListener('pause', function() {
  playIcon.classList.remove('pause');
  playIcon.classList.add('play');
});