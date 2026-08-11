const reveal = () => {
  const nodes = document.querySelectorAll('.reveal, .reveal-scale');
  if (!('IntersectionObserver' in window)) {
    nodes.forEach((node) => node.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  nodes.forEach((node) => observer.observe(node));
};

const theme = () => {
  const button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  const sync = () => {
    const isDark = document.documentElement.classList.contains('dark');
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    button.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  };

  button.addEventListener('click', () => {
    const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    document.documentElement.classList.add('theme-transition');
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.dataset.theme = nextTheme;

    try {
      localStorage.setItem('site-theme', nextTheme);
    } catch {
      // Ignore storage failures so the toggle still works for the current page.
    }

    sync();
    window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 300);
  });

  sync();
};

const nav = () => {
  const header = document.querySelector('[data-site-header]');
  const menuButton = document.querySelector('[data-menu-button]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const menuIcon = document.querySelector('[data-menu-icon]');
  const closeIcon = document.querySelector('[data-close-icon]');
  const servicesRoot = document.querySelector('[data-services-menu-root]');
  const servicesButton = document.querySelector('[data-services-menu-button]');
  const servicesMenu = document.querySelector('[data-services-menu]');
  const servicesChevron = document.querySelector('[data-services-menu-chevron]');
  const mobileServicesButton = document.querySelector('[data-mobile-services-button]');
  const mobileServicesList = document.querySelector('[data-mobile-services-list]');
  const mobileServicesChevron = document.querySelector('[data-mobile-services-chevron]');

  const syncHeader = () => {
    header?.classList.toggle('shadow-sm', window.scrollY > 8);
  };

  const setServicesOpen = (open) => {
    if (!servicesMenu || !servicesButton) return;
    servicesMenu.dataset.open = String(open);
    servicesButton.setAttribute('aria-expanded', String(open));
    servicesChevron?.classList.toggle('rotate-180', open);
  };

  const setMobileServicesOpen = (open) => {
    if (!mobileServicesList || !mobileServicesButton) return;
    mobileServicesList.dataset.open = String(open);
    mobileServicesButton.setAttribute('aria-expanded', String(open));
    mobileServicesChevron?.classList.toggle('rotate-180', open);
  };

  servicesButton?.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setServicesOpen(servicesMenu?.dataset.open !== 'true');
  });

  servicesMenu?.addEventListener('click', (event) => {
    event.stopPropagation();
  });

  document.addEventListener('click', (event) => {
    if (!servicesRoot?.contains(event.target)) setServicesOpen(false);
    if (!mobileServicesButton?.contains(event.target) && !mobileServicesList?.contains(event.target)) {
      setMobileServicesOpen(false);
    }
  });

  document.querySelectorAll('[data-nav-close]').forEach((link) => {
    link.addEventListener('click', () => setServicesOpen(false));
  });

  menuButton?.addEventListener('click', () => {
    const isOpen = mobileMenu?.dataset.open === 'true';
    mobileMenu.dataset.open = String(!isOpen);
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuIcon?.classList.toggle('hidden', !isOpen);
    closeIcon?.classList.toggle('hidden', isOpen);
    document.documentElement.classList.toggle('overflow-hidden', !isOpen);
  });

  mobileServicesButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    const isOpen = mobileServicesList?.dataset.open === 'true';
    setMobileServicesOpen(!isOpen);
  });

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      setMobileServicesOpen(false);
      mobileMenu.dataset.open = 'false';
      menuButton?.setAttribute('aria-expanded', 'false');
      menuIcon?.classList.remove('hidden');
      closeIcon?.classList.add('hidden');
      document.documentElement.classList.remove('overflow-hidden');
    });
  });

  mobileMenu?.querySelectorAll('[data-mobile-service-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const service = button.closest('[data-mobile-service]');
      const panel = service?.querySelector('[data-mobile-service-panel]');
      const chevron = service?.querySelector('[data-mobile-service-chevron]');
      const isOpen = service?.dataset.open === 'true';

      mobileMenu.querySelectorAll('[data-mobile-service]').forEach((item) => {
        item.dataset.open = 'false';
        item.querySelector('[data-mobile-service-toggle]')?.setAttribute('aria-expanded', 'false');
        item.querySelector('[data-mobile-service-panel]')?.classList.add('hidden');
        item.querySelector('[data-mobile-service-chevron]')?.classList.remove('rotate-180');
      });

      if (!isOpen && service && panel) {
        service.dataset.open = 'true';
        button.setAttribute('aria-expanded', 'true');
        panel.classList.remove('hidden');
        chevron?.classList.add('rotate-180');
      }
    });
  });

  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();
};

const faq = () => {
  document.querySelectorAll('[data-faq-item]').forEach((item) => {
    const button = item.querySelector('button');
    const panel = item.querySelector('[data-faq-panel]');
    button?.addEventListener('click', () => {
      const isOpen = item.dataset.open === 'true';
      item.dataset.open = String(!isOpen);
      button.setAttribute('aria-expanded', String(!isOpen));
      const icon = button.querySelector('[data-faq-icon]');
      if (icon) icon.textContent = isOpen ? '+' : '−';
      if (panel) panel.hidden = isOpen;
    });
  });
};

const contact = () => {
  const form = document.querySelector('[data-quote-form]');
  const done = document.querySelector('[data-quote-done]');
  const reset = document.querySelector('[data-quote-reset]');
  if (!form || !done) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending...';
    }

    await new Promise((resolve) => setTimeout(resolve, 450));
    form.hidden = true;
    done.classList.remove('hidden');
    done.classList.add('flex');
    form.reset();

    if (button) {
      button.disabled = false;
      button.textContent = 'Request Free Quote';
    }
  });

  reset?.addEventListener('click', () => {
    done.classList.add('hidden');
    done.classList.remove('flex');
    form.hidden = false;
  });
};

const voiceGreeting = () => {
  const button = document.querySelector('[data-voice-greeting]');
  if (!button || !('speechSynthesis' in window)) {
    button?.remove();
    return;
  }

  const greeting = "Welcome to Pro Handyman SG — Singapore's trusted home repair experts. We're here to help!";
  let speaking = false;

  const pickVoice = (voices) => {
    const en = voices.filter((voice) => /en[-_]/i.test(voice.lang));
    const pool = en.length ? en : voices;
    const preferred = ['Daniel', 'Google UK English Male', 'Microsoft Guy', 'Microsoft David', 'Rishi', 'Fred', 'Alex', 'male'];
    return preferred.map((name) => pool.find((voice) => voice.name.toLowerCase().includes(name.toLowerCase()))).find(Boolean) || pool[0];
  };

  const speak = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(greeting);
    const voice = pickVoice(window.speechSynthesis.getVoices());
    if (voice) utterance.voice = voice;
    utterance.rate = 0.98;
    utterance.pitch = 0.85;
    utterance.onstart = () => {
      speaking = true;
      button.dataset.speaking = 'true';
      button.querySelector('[data-voice-label]').textContent = 'Stop greeting';
    };
    utterance.onend = utterance.onerror = () => {
      speaking = false;
      button.dataset.speaking = 'false';
      button.querySelector('[data-voice-label]').textContent = 'Play welcome';
    };
    window.speechSynthesis.speak(utterance);
  };

  button.addEventListener('click', () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      speaking = false;
      button.dataset.speaking = 'false';
      button.querySelector('[data-voice-label]').textContent = 'Play welcome';
    } else {
      speak();
    }
  });
};

const init = () => {
  if (document.documentElement.dataset.siteReady === 'true') return;
  document.documentElement.dataset.siteReady = 'true';
  theme();
  reveal();
  nav();
  faq();
  contact();
  voiceGreeting();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init, { once: true });
} else {
  init();
}

document.addEventListener('astro:page-load', init);
