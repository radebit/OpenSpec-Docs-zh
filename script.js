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
// 更新历史展开/收起
// ==========================================
function toggleChangelog(btn) {
  const details = btn.previousElementSibling;
  const isOpen = details.classList.contains('expanded');
  details.classList.toggle('expanded', !isOpen);
  btn.classList.toggle('open', !isOpen);
  btn.querySelector('span').textContent = isOpen ? '展开详情' : '收起详情';
}

// ==========================================
// FAQ 折叠面板
// ==========================================
function toggleFaq(questionEl) {
  const faqItem = questionEl.closest('.faq-item');
  const isOpen = faqItem.classList.contains('open');
  
  // 可选：关闭其他打开的 FAQ
  // const faqList = faqItem.closest('.faq-list');
  // if (faqList) {
  //   faqList.querySelectorAll('.faq-item.open').forEach(item => {
  //     if (item !== faqItem) item.classList.remove('open');
  //   });
  // }
  
  faqItem.classList.toggle('open', !isOpen);
}

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

// ==========================================
// 动态加载 sections/*.html
// ==========================================
(function loadSections() {
  const sections = [
    { containerId: 'section-getting-started', file: 'sections/getting-started.html' },
    { containerId: 'section-concepts',        file: 'sections/concepts.html' },
    { containerId: 'section-commands',        file: 'sections/commands.html' },
    { containerId: 'section-cli',             file: 'sections/cli.html' },
    { containerId: 'section-advanced',        file: 'sections/advanced.html' },
    { containerId: 'section-practice-guide',  file: 'sections/practice-guide.html' },
    { containerId: 'section-about',           file: 'sections/about.html' },
  ];

  let loadedCount = 0;

  function onAllLoaded() {
    // 重新执行需要 DOM 就绪的初始化
    reinitAfterLoad();

    // 所有 section 加载完成后，处理 URL hash 定位
    scrollToHash();
  }

  function scrollToHash() {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1); // 去掉 #
    const target = document.getElementById(id);
    if (target) {
      // 稍作延迟确保布局稳定
      setTimeout(() => {
        const offset = 72; // 顶部导航栏高度
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 80);
    }
  }

  // 拦截页面内所有 #锚点 链接，防止默认跳转导致二次重载定位失准
  function initAnchorInterceptor() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        history.pushState(null, '', hash);
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  }

  function reinitAfterLoad() {
    // 重新绑定折叠面板
    document.querySelectorAll('.accordion-header').forEach(header => {
      header.onclick = function() { toggleAccordion(this); };
    });

    // 重新绑定 Tab 切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const tab = this.dataset.tab;
        const container = this.closest('.install-tabs, .subsection') || this.parentElement.parentElement;
        // 切换按钮状态
        this.parentElement.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        // 切换内容
        const contents = container.querySelectorAll ? container.querySelectorAll('.tab-content') : [];
        if (contents.length === 0) {
          // 找兄弟节点
          let el = this.parentElement.nextElementSibling;
          while (el) {
            if (el.classList.contains('tab-content')) {
              el.classList.toggle('active', el.dataset.content === tab);
            }
            el = el.nextElementSibling;
          }
        } else {
          contents.forEach(c => c.classList.toggle('active', c.dataset.content === tab));
        }
      });
    });

    // 重新初始化 IntersectionObserver（侧边栏高亮）
    initSidebarObserver();

    // 重新初始化代码高亮
    initCodeHighlight();

    // 重新初始化卡片动画
    initCardAnimation();

    // 初始化锚点拦截（只需绑定一次，使用事件委托）
    initAnchorInterceptor();

    console.log('%c✓ All sections loaded', 'color: #10b981');
  }

  function initSidebarObserver() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    if (!sidebarLinks.length) return;
    const observerOptions = { rootMargin: '-20% 0px -70% 0px', threshold: 0 };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sidebarLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    }, observerOptions);
    document.querySelectorAll('[id]').forEach(el => {
      if (el.tagName !== 'HTML' && el.tagName !== 'BODY') observer.observe(el);
    });
  }

  function initCodeHighlight() {
    document.querySelectorAll('.code-block pre code').forEach(block => {
      let html = block.innerHTML;
      html = html.replace(/(#[^\n]*)/g, '<span style="color:#64748b;font-style:italic">$1</span>');
      html = html.replace(/\b(openspec\s+\w[\w-]*)/g, '<span style="color:#a5b4fc">$1</span>');
      html = html.replace(/(\/opsx:[a-z-]+)/g, '<span style="color:#818cf8;font-weight:600">$1</span>');
      html = html.replace(/(\/opsx-[a-z-]+)/g, '<span style="color:#818cf8;font-weight:600">$1</span>');
      html = html.replace(/\b(npm|pnpm|yarn|bun|nix|export|cd)\b/g, '<span style="color:#c4b5fd">$1</span>');
      html = html.replace(/(✓)/g, '<span style="color:#10b981">$1</span>');
      html = html.replace(/(⚠)/g, '<span style="color:#f59e0b">$1</span>');
      block.innerHTML = html;
    });
  }

  function initCardAnimation() {
    const cardObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.feature-card, .phi-card, .cmd-card, .cli-cmd-block').forEach(card => {
      cardObserver.observe(card);
    });
  }

  sections.forEach(({ containerId, file }) => {
    const container = document.getElementById(containerId);
    if (!container) { loadedCount++; if (loadedCount === sections.length) onAllLoaded(); return; }

    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load ${file}: ${res.status}`);
        return res.text();
      })
      .then(html => {
        container.innerHTML = html;
        loadedCount++;
        if (loadedCount === sections.length) onAllLoaded();
      })
      .catch(err => {
        console.warn(`[OpenSpec Docs] ${err.message}`);
        container.innerHTML = `<div style="padding:2rem;color:#f87171;text-align:center">
          ⚠ 内容加载失败，请通过 HTTP 服务访问（如 python3 -m http.server）<br>
          <small>${err.message}</small>
        </div>`;
        loadedCount++;
        if (loadedCount === sections.length) onAllLoaded();
      });
  });
})();

