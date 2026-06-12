const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let matrixEnabled = false;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const fontSize = 14;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  function drawMatrix() {
    if (!matrixEnabled) return;
    ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#3fb950';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
      drops[i]++;
    }
  }

  let matrixInterval;

  document.getElementById('matrixToggle').addEventListener('click', function() {
    matrixEnabled = !matrixEnabled;
    this.textContent = matrixEnabled ? '[matrix] on' : '[matrix] off';
    if (matrixEnabled) {
      matrixInterval = setInterval(drawMatrix, 50);
    } else {
      clearInterval(matrixInterval);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  });

  const nameEl = document.getElementById('hero-name');
  const cursorEl = document.getElementById('hero-cursor');
  const nameText = 'jc';

  function typeName() {
    let i = 0;
    cursorEl.style.display = 'inline-block';
    function type() {
      if (i < nameText.length) {
        nameEl.textContent += nameText[i];
        i++;
        setTimeout(type, 120);
      }
    }
    type();
  }

  setTimeout(typeName, 500);

  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));