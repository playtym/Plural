/**
 * Plural shared nav + footer
 * Include with: <script src="/nav.js"></script>  (or "../nav.js" from /programs/, /blog/)
 * Reads data-page on <body> to highlight the active nav link.
 * On index.html, CTA opens the signup modal; on all other pages it redirects to /#join.
 */
(function () {
  /* ── helpers ── */
  const isIndex = location.pathname === '/' || location.pathname.endsWith('index.html');
  const depth = location.pathname.split('/').filter(Boolean).length; // 0 = root, 1 = /programs/foo.html
  const root = depth <= 1 ? '/' : '../';

  function path(rel) { return root + rel; }

  /* ── CSS injected once ── */
  if (!document.getElementById('plural-nav-css')) {
    const s = document.createElement('style');
    s.id = 'plural-nav-css';
    s.textContent = `
      :root{--saffron:#FF6B35;--ink:#1C1B29;--muted:#6E6B82;--cream:rgba(255,251,245,0.95);--line:rgba(240,234,224,0.9);}
      #plural-nav{position:fixed;top:0;left:0;right:0;z-index:900;display:flex;align-items:center;justify-content:space-between;padding:0 28px;height:68px;background:var(--cream);backdrop-filter:blur(20px) saturate(180%);border-bottom:1px solid transparent;transition:border-color .3s,box-shadow .3s;font-family:'Inter',system-ui,sans-serif;}
      #plural-nav.scrolled{border-color:var(--line);box-shadow:0 2px 12px rgba(28,27,41,.06);}
      #plural-nav .pn-logo{display:flex;align-items:center;gap:9px;font-family:'Fredoka',sans-serif;font-size:1.45rem;font-weight:600;color:var(--ink);text-decoration:none;letter-spacing:-.01em;}
      #plural-nav .pn-logo em{color:var(--saffron);font-style:normal;}
      #plural-nav .pn-mark{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#FF6B35,#FF5C8A);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(255,107,53,.35);}
      #plural-nav .pn-links{display:flex;gap:6px;list-style:none;align-items:center;}
      #plural-nav .pn-links a{font-size:.875rem;font-weight:500;color:var(--muted);text-decoration:none;padding:6px 10px;border-radius:8px;transition:color .18s,background .18s;}
      #plural-nav .pn-links a:hover{color:var(--ink);background:rgba(28,27,41,.05);}
      #plural-nav .pn-links a.active{color:var(--ink);font-weight:700;}
      #plural-nav .pn-cta{height:40px;padding:0 20px;border-radius:100px;background:var(--ink);color:#fff;font-weight:700;font-size:.875rem;font-family:inherit;border:none;cursor:pointer;display:flex;align-items:center;gap:7px;transition:background .2s,transform .2s;}
      #plural-nav .pn-cta:hover{background:var(--saffron);transform:scale(1.04);}
      #plural-nav .pn-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none;padding:6px;}
      #plural-nav .pn-hamburger span{display:block;width:22px;height:2px;background:var(--ink);border-radius:2px;transition:transform .3s,opacity .3s;}
      #plural-nav.menu-open .pn-hamburger span:nth-child(1){transform:translateY(7px) rotate(45deg);}
      #plural-nav.menu-open .pn-hamburger span:nth-child(2){opacity:0;}
      #plural-nav.menu-open .pn-hamburger span:nth-child(3){transform:translateY(-7px) rotate(-45deg);}
      #plural-mobile-menu{display:none;position:fixed;top:68px;left:0;right:0;background:rgba(255,251,245,.98);backdrop-filter:blur(20px);z-index:899;padding:16px 20px 24px;border-bottom:1px solid var(--line);font-family:'Inter',system-ui,sans-serif;}
      #plural-mobile-menu.open{display:block;}
      #plural-mobile-menu a{display:block;padding:13px 4px;font-size:1rem;font-weight:600;color:var(--ink);text-decoration:none;border-bottom:1px solid rgba(240,234,224,.7);}
      #plural-mobile-menu a:last-child{border:none;}
      #plural-mobile-menu .mm-cta{margin-top:16px;display:block;text-align:center;background:var(--saffron);color:#fff;padding:14px;border-radius:12px;font-weight:700;font-size:1rem;}
      #plural-footer{background:#1C1B29;color:rgba(255,255,255,.6);padding:64px 28px 40px;font-family:'Inter',system-ui,sans-serif;}
      #plural-footer .pf-inner{max-width:1160px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;}
      #plural-footer .pf-logo{font-family:'Fredoka',sans-serif;font-size:1.4rem;font-weight:600;color:#fff;text-decoration:none;display:flex;align-items:center;gap:9px;margin-bottom:12px;}
      #plural-footer .pf-logo em{color:var(--saffron);font-style:normal;}
      #plural-footer .pf-logo .pn-mark{width:30px;height:30px;border-radius:8px;}
      #plural-footer p{font-size:.85rem;line-height:1.7;max-width:260px;margin:0;}
      #plural-footer h5{color:#fff;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px;}
      #plural-footer ul{list-style:none;display:flex;flex-direction:column;gap:10px;}
      #plural-footer ul a{color:rgba(255,255,255,.6);text-decoration:none;font-size:.875rem;transition:color .2s;}
      #plural-footer ul a:hover{color:#fff;}
      #plural-footer .pf-bottom{max-width:1160px;margin:48px auto 0;padding-top:24px;border-top:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;font-size:.75rem;}
      @media(max-width:900px){#plural-footer .pf-inner{grid-template-columns:1fr 1fr;gap:36px;}}
      @media(max-width:640px){#plural-nav .pn-links{display:none;}#plural-nav .pn-hamburger{display:flex;}#plural-footer .pf-inner{grid-template-columns:1fr;gap:28px;}#plural-footer p{max-width:none;}}
    `;
    document.head.appendChild(s);
  }

  /* ── active page detection ── */
  const pg = location.pathname;
  function isActive(href) {
    if (href === '/') return pg === '/' || pg.endsWith('/index.html');
    return pg.includes(href.replace(/^\//, ''));
  }

  function navLink(href, label) {
    const abs = href.startsWith('http') ? href : path(href.replace(/^\//, ''));
    const cls = isActive(href) ? ' class="active"' : '';
    return `<li><a href="${abs}"${cls}>${label}</a></li>`;
  }

  /* ── CTA action: open modal on home, redirect otherwise ── */
  const ctaAction = isIndex
    ? `onclick="if(typeof openModal==='function'){openModal();}"`
    : `href="${path('')}#join" `;

  /* ── Inject NAV ── */
  const navEl = document.createElement('nav');
  navEl.id = 'plural-nav';
  navEl.setAttribute('aria-label', 'Main navigation');
  navEl.innerHTML = `
    <a href="${path('')}" class="pn-logo">
      <span class="pn-mark">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 7l8-4 8 4-8 4-8-4z" fill="#fff"/><path d="M4 12l8 4 8-4M4 17l8 4 8-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      Plural<em>.</em>
    </a>
    <ul class="pn-links">
      ${navLink('/programs/little-makers.html', 'Little Makers')}
      ${navLink('/programs/code-explorers.html', 'Code Explorers')}
      ${navLink('/programs/ai-builders.html', 'AI Builders')}
      ${navLink('/blog/', 'Blog')}
      ${navLink('/about.html', 'About')}
    </ul>
    <button class="pn-cta" ${ctaAction}>
      Reserve a seat
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg>
    </button>
    <button class="pn-hamburger" aria-label="Toggle menu" onclick="pluralToggleMenu()">
      <span></span><span></span><span></span>
    </button>
  `;
  document.body.prepend(navEl);

  /* ── Inject mobile menu ── */
  const mmEl = document.createElement('div');
  mmEl.id = 'plural-mobile-menu';
  mmEl.innerHTML = `
    <a href="${path('programs/little-makers.html')}">Little Makers (ages 8-10)</a>
    <a href="${path('programs/code-explorers.html')}">Code Explorers (ages 10-13)</a>
    <a href="${path('programs/ai-builders.html')}">AI Builders (ages 13-18)</a>
    <a href="${path('blog/')}">Blog</a>
    <a href="${path('about.html')}">About</a>
    <a class="mm-cta" href="${path('')}#join">Reserve a seat - 2 weeks free →</a>
  `;
  navEl.after(mmEl);

  window.pluralToggleMenu = function () {
    navEl.classList.toggle('menu-open');
    mmEl.classList.toggle('open');
  };

  /* close menu on outside click */
  document.addEventListener('click', function (e) {
    if (!navEl.contains(e.target) && !mmEl.contains(e.target)) {
      navEl.classList.remove('menu-open');
      mmEl.classList.remove('open');
    }
  });

  /* scroll state */
  window.addEventListener('scroll', function () {
    navEl.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ── Inject FOOTER ── */
  const ftEl = document.createElement('footer');
  ftEl.id = 'plural-footer';
  ftEl.innerHTML = `
    <div class="pf-inner">
      <div>
        <a href="${path('')}" class="pf-logo">
          <span class="pn-mark">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 7l8-4 8 4-8 4-8-4z" fill="#fff"/><path d="M4 12l8 4 8-4M4 17l8 4 8-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          Plural<em>.</em>
        </a>
        <p>Building India's AI generation - one curious kid at a time. The only education that will matter in the age of AI.</p>
        <div style="margin-top:18px;display:flex;gap:10px;">
          <a href="https://twitter.com/pluraldotai" target="_blank" rel="noopener" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6);text-decoration:none;font-size:.8rem;transition:background .2s;" onmouseover="this.style.background='#FF6B35'" onmouseout="this.style.background='rgba(255,255,255,.08)'">&#x1D54F;</a>
          <a href="https://linkedin.com/company/plural-ai" target="_blank" rel="noopener" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6);text-decoration:none;font-size:.75rem;font-weight:700;transition:background .2s;" onmouseover="this.style.background='#FF6B35'" onmouseout="this.style.background='rgba(255,255,255,.08)'">in</a>
          <a href="https://wa.me/919999999999" target="_blank" rel="noopener" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6);text-decoration:none;font-size:.75rem;transition:background .2s;" onmouseover="this.style.background='#25D366'" onmouseout="this.style.background='rgba(255,255,255,.08)'">&#x1F4AC;</a>
        </div>
      </div>
      <div>
        <h5>Programs</h5>
        <ul>
          <li><a href="${path('programs/little-makers.html')}">Little Makers (8-10)</a></li>
          <li><a href="${path('programs/code-explorers.html')}">Code Explorers (10-13)</a></li>
          <li><a href="${path('programs/ai-builders.html')}">AI Builders (13-18)</a></li>
          <li><a href="${path('') + '#batches'}">Live Batches</a></li>
          <li><a href="${path('') + '#pricing'}">Pricing</a></li>
        </ul>
      </div>
      <div>
        <h5>Compare</h5>
        <ul>
          <li><a href="${path('vs-byjus.html')}">Plural vs Byju's</a></li>
          <li><a href="${path('vs-whitehat-jr.html')}">Plural vs WhiteHat Jr</a></li>
          <li><a href="${path('blog/')}">Blog</a></li>
          <li><a href="${path('about.html')}">About Us</a></li>
        </ul>
      </div>
      <div>
        <h5>Contact</h5>
        <ul>
          <li><a href="mailto:hello@plural.ai">hello@plural.ai</a></li>
          <li><a href="https://wa.me/919999999999" target="_blank">WhatsApp us</a></li>
          <li><a href="${path('privacy.html')}">Privacy Policy</a></li>
          <li><a href="${path('terms.html')}">Terms of Use</a></li>
        </ul>
      </div>
    </div>
    <div class="pf-bottom">
      <span>&copy; 2025 Plural Technologies Pvt. Ltd.</span>
      <span>Made with pride in &#x1F1EE;&#x1F1F3; India</span>
    </div>
  `;

  /* append after existing footer if present, else at end of body */
  const existingFooter = document.querySelector('footer');
  if (existingFooter) {
    existingFooter.replaceWith(ftEl);
  } else {
    document.body.appendChild(ftEl);
  }

  /* ── Push body down so content isn't under fixed nav ── */
  document.documentElement.style.scrollPaddingTop = '80px';
  const main = document.querySelector('main, header, .hero, .page, section');
  if (main && !isIndex) {
    main.style.paddingTop = main.style.paddingTop || '88px';
  }
})();
