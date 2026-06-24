// CUSTOM CURSOR
const cur = document.getElementById('cur');
const curRing = document.getElementById('curRing');
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
  setTimeout(() => {
    curRing.style.left = e.clientX + 'px';
    curRing.style.top = e.clientY + 'px';
  }, 60);
});
document.querySelectorAll('a,button,.menu-card,.bs-card,.g-item,.social-item,.tab-btn').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cur.style.width = '20px'; cur.style.height = '20px';
    curRing.style.width = '50px'; curRing.style.height = '50px'; curRing.style.opacity = '.8';
  });
  el.addEventListener('mouseleave', () => {
    cur.style.width = '12px'; cur.style.height = '12px';
    curRing.style.width = '36px'; curRing.style.height = '36px'; curRing.style.opacity = '.5';
  });
});

// SCROLL REVEAL
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// NAVBAR SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.padding = window.scrollY > 60 ? '.7rem 4rem' : '1.1rem 4rem';
  const btt = document.getElementById('btt');
  btt.classList.toggle('show', window.scrollY > 400);
});

// MENU FILTER
function filterMenu(cat, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('#menuGrid .menu-card').forEach(card => {
    if (cat === 'semua' || card.dataset.cat === cat) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

// SUBMIT REVIEW
function submitReview() {
  const name = document.getElementById('rvName').value.trim();
  const text = document.getElementById('rvText').value.trim();
  const menu = document.getElementById('rvMenu').value;
  const ratingEl = document.querySelector('input[name="rating"]:checked');
  const rating = ratingEl ? parseInt(ratingEl.value) : 0;

  if (!name || !text || !rating) {
    alert('Harap isi nama, ulasan, dan rating terlebih dahulu! ⭐');
    return;
  }

  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  const initials = name.split(' ').map(w => w[0]).join('').substring(0,2).toUpperCase();
  const colors = ['#C9A84C','#8B5E3C','#2C5F2E','#4A2210','#1E4B7A','#7B2D8B'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const now = new Date();
  const date = now.toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});

  const card = document.createElement('div');
  card.className = 'review-card reveal';
  card.innerHTML = `
    <span class="review-quote">"</span>
    <div class="review-top">
      <div class="reviewer-info">
        <div class="reviewer-avatar" style="background:${color}">${initials}</div>
        <div>
          <div class="reviewer-name">${name}</div>
          <div class="reviewer-date">${date}${menu ? ' · ' + menu : ''}</div>
        </div>
      </div>
      <div class="review-stars">${stars}</div>
    </div>
    <p class="review-text">${text}</p>
  `;
  document.getElementById('reviewsGrid').prepend(card);
  setTimeout(() => card.classList.add('visible'), 50);

  document.getElementById('reviewForm').style.display = 'none';
  document.getElementById('successMsg').style.display = 'block';

  // reset form
  document.getElementById('rvName').value = '';
  document.getElementById('rvText').value = '';
  document.getElementById('rvMenu').value = '';
  if (ratingEl) ratingEl.checked = false;

  setTimeout(() => {
    document.getElementById('successMsg').style.display = 'none';
    document.getElementById('reviewForm').style.display = 'block';
  }, 5000);
}

// Navigasi Responisif Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Otomatis tutup menu jika salah satu link diklik (opsional, sangat disarankan)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

// VALIDASI DAN KIRIM KONTAK (DENGAN VALIDASI EMAIL)
function sendContact() {
  const nama = document.getElementById('cfNama').value.trim();
  const email = document.getElementById('cfEmail').value.trim();
  const pesan = document.getElementById('cfPesan').value.trim();

  // 1. Memeriksa apakah ada kolom yang kosong
  if (!nama || !email || !pesan) {
    alert('Harap isi semua kolom terlebih dahulu sebelum mengirim pesan! ☕');
    return;
  }

  // 2. Memeriksa apakah format input adalah email yang valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Format email tidak valid! Harap masukkan alamat email yang benar (contoh: nama@email.com). ✉️');
    return; // Menghentikan proses jika format email salah
  }

  // Jika semua kolom terisi dan email sudah benar
  alert('Pesan terkirim! ☕ Kami akan segera membalas.');

  // Mengosongkan kembali form setelah berhasil dikirim
  document.getElementById('cfNama').value = '';
  document.getElementById('cfEmail').value = '';
  document.getElementById('cfPesan').value = '';
}
