// ==========================================
// OpenSpec 文档交互脚本
// ==========================================

// 粒子背景
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.radius = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${this.alpha})`;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / 120) * 0.12})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    animationId = requestAnimationFrame(animate);
  }

  resize();
  initParticles();
  animate();

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
})();

// ==========================================
// 选项卡切换
// ==========================================
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const tabGroup = this.closest('.install-tabs') || this.parentElement;
    const tabId = this.dataset.tab;

    // 同一容器下的 tab-btn
    const siblingBtns = tabGroup.querySelectorAll('.tab-btn');
    siblingBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    // 找到同级或后面的 tab-content
    const parent = tabGroup.parentElement;
    const contents = parent.querySelectorAll('.tab-content');
    contents.forEach(c => {
      c.classList.remove('active');
      if (c.dataset.content === tabId) {
        c.classList.add('active');
      }
    });
  });
});

// ==========================================
// 折叠面板
// ==========================================
function toggleAccordion(header) {
  const item = header.closest('.accordion-item');
  const isOpen = item.classList.contains('open');

  // 关闭同级所有
  const accordion = item.closest('.accordion');
  if (accordion) {
    accordion.querySelectorAll('.accordion-item').forEach(i => {
      i.classList.remove('open');
      const body = i.querySelector('.accordion-body');
      if (body) body.style.display = 'none';
    });
  }

  // 如果原来关着就打开
  if (!isOpen) {
    item.classList.add('open');
    const body = item.querySelector('.accordion-body');
    if (body) body.style.display = 'block';
  }
}

// ==========================================
// 复制代码
// ==========================================
function copyCode(btn) {
  const codeBlock = btn.closest('.code-block');
  const code = codeBlock.querySelector('code');
  if (!code) return;

  navigator.clipboard.writeText(code.textContent.trim()).then(() => {
    const original = btn.textContent;
    btn.textContent = '✓ 已复制';
    btn.style.color = '#10b981';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.color = '';
    }, 2000);
  }).catch(() => {
    // 降级方案
    const range = document.createRange();
    range.selectNodeContents(code);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    btn.textContent = '✓ 已复制';
    setTimeout(() => { btn.textContent = '复制'; }, 2000);
  });
}

// ==========================================
// 返回顶部
// ==========================================
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// ==========================================
// 侧边栏滚动高亮
// ==========================================
const sections = document.querySelectorAll('[id]');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sidebarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
            // 让侧边栏滚动到对应链接
            const sidebar = link.closest('.sidebar');
            if (sidebar) {
              const linkTop = link.offsetTop;
              const sidebarScrollTop = sidebar.scrollTop;
              const sidebarHeight = sidebar.offsetHeight;
              if (linkTop < sidebarScrollTop || linkTop > sidebarScrollTop + sidebarHeight - 80) {
                sidebar.scrollTo({ top: linkTop - sidebarHeight / 2, behavior: 'smooth' });
              }
            }
          }
        });
      }
    });
  },
  {
    rootMargin: '-80px 0px -60% 0px',
    threshold: 0
  }
);

sections.forEach(section => observer.observe(section));

// ==========================================
// 移动端菜单
// ==========================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const sidebar = document.getElementById('sidebar');

if (mobileMenuBtn && sidebar) {
  mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // 点击侧边栏链接后关闭
  sidebar.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        sidebar.classList.remove('open');
      }
    });
  });

  // 点击内容区关闭
  document.querySelector('.main-content')?.addEventListener('click', () => {
    if (window.innerWidth <= 1024) {
      sidebar.classList.remove('open');
    }
  });
}

// ==========================================
// 顶部导航链接高亮
// ==========================================
const topNavLinks = document.querySelectorAll('.nav-link[href^="#"]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = '#' + section.id;
    }
  });
  topNavLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === current) {
      link.style.color = '#6366f1';
    }
  });
});

// ==========================================
// 平滑进入动画
// ==========================================
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animationObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.05 }
);

document.querySelectorAll('.feature-card, .cmd-card, .phi-card, .wf-pattern, .bp-item, .compare-card, .tool-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  animationObserver.observe(el);
});

// ==========================================
// 终端打字效果（Hero 区域）
// ==========================================
(function typingEffect() {
  const lines = document.querySelectorAll('.term-line');
  if (!lines.length) return;

  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      line.style.opacity = '1';
    }, i * 150 + 500);
  });
})();

// ==========================================
// 代码块语法高亮（简单版）
// ==========================================
document.querySelectorAll('.code-block code').forEach(block => {
  let html = block.innerHTML;

  // 注释
  html = html.replace(/(#[^\n]*)/g, '<span style="color:#64748b;font-style:italic">$1</span>');
  // openspec 命令
  html = html.replace(/\b(openspec\s+\w[\w-]*)/g, '<span style="color:#a5b4fc">$1</span>');
  // /opsx: 命令
  html = html.replace(/(\/opsx:[a-z-]+)/g, '<span style="color:#818cf8;font-weight:600">$1</span>');
  html = html.replace(/(\/opsx-[a-z-]+)/g, '<span style="color:#818cf8;font-weight:600">$1</span>');
  // bash 关键词
  html = html.replace(/\b(npm|pnpm|yarn|bun|nix|export|cd)\b/g, '<span style="color:#c4b5fd">$1</span>');
  // YAML 键
  html = html.replace(/^(\s*)(\w[\w-]*):/gm, '$1<span style="color:#93c5fd">$2</span>:');
  // 字符串值
  html = html.replace(/:\s*"([^"]+)"/g, ': <span style="color:#6ee7b7">"$1"</span>');
  html = html.replace(/:\s*'([^']+)'/g, ': <span style="color:#6ee7b7">\'$1\'</span>');
  // 打勾符号
  html = html.replace(/(✓)/g, '<span style="color:#10b981">$1</span>');
  html = html.replace(/(⚠)/g, '<span style="color:#f59e0b">$1</span>');

  block.innerHTML = html;
});

console.log('%cOpenSpec Docs', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cAI-native spec-driven development system', 'color: #94a3b8');
