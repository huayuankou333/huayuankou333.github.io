
(() => {
  const root = document.documentElement;
  const langButton = document.getElementById('language');
  const themeButton = document.getElementById('theme');
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  function setLanguage(value) {
    const language = value === 'zh' ? 'zh' : 'en';
    root.dataset.language = language;
    root.lang = language === 'zh' ? 'zh-CN' : 'en';
    langButton.textContent = language === 'zh' ? 'EN' : '中文';
    langButton.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换为中文');
    save('yukai-language', language);
  }
  function setTheme(value) {
    const dark = value === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    save('yukai-theme', root.dataset.theme);
  }
  setLanguage(read('yukai-language') || 'en');
  setTheme(read('yukai-theme') || 'light');
  langButton.addEventListener('click', () => setLanguage(root.dataset.language === 'en' ? 'zh' : 'en'));
  themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  if ('IntersectionObserver' in window) {
    const links = [...document.querySelectorAll('.nav-link')];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        for (const a of links) {
          const active = a.hash === '#' + entry.target.id;
          a.classList.toggle('active', active);
          if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
        }
      }
    }, {rootMargin: '-12% 0px -60% 0px', threshold: 0});
    for (const section of document.querySelectorAll('main>section[id]')) if (section.id !== 'contact') observer.observe(section);
  }
})();
