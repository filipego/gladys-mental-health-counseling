/* Place Yourself: rows toggle open and shut. Home still links to
   #parents / #teens / #adults; those hashes open the matching row. */

const stack = document.querySelector('[data-stack]');

if (stack) {
  const items = Array.from(stack.querySelectorAll('.stack-item'));

  const setItem = (entry, selected) => {
    const panel = entry.querySelector('.stack-panel');
    entry.classList.toggle('is-open', selected);
    entry.querySelector('.stack-toggle').setAttribute('aria-expanded', String(selected));
    panel.setAttribute('aria-hidden', String(!selected));
    if (selected) panel.removeAttribute('inert');
    else panel.setAttribute('inert', '');
  };

  const closeAll = ({ updateHash = false } = {}) => {
    items.forEach((entry) => setItem(entry, false));
    if (updateHash) history.replaceState(null, '', window.location.pathname + window.location.search);
  };

  const open = (item, { updateHash = false } = {}) => {
    items.forEach((entry) => setItem(entry, entry === item));
    if (updateHash && item.id) {
      history.replaceState(null, '', `#${item.id}`);
    }
  };

  items.forEach((item, index) => {
    const toggle = item.querySelector('.stack-toggle');
    toggle.addEventListener('click', () => {
      if (item.classList.contains('is-open')) {
        closeAll({ updateHash: true });
        return;
      }
      open(item, { updateHash: true });
    });
    toggle.addEventListener('keydown', (event) => {
      const step = { ArrowUp: -1, ArrowLeft: -1, ArrowDown: 1, ArrowRight: 1 }[event.key];
      if (!step) return;
      event.preventDefault();
      const next = items[(index + step + items.length) % items.length];
      next.querySelector('.stack-toggle').focus();
    });
  });

  const pinItemToHeader = (item) => {
    const header = document.querySelector(".header-band");
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const top = item.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
  };

  const openFromHash = () => {
    const match = items.find((item) => `#${item.id}` === window.location.hash);
    if (!match) return;
    stack.classList.add("is-pinning");
    open(match);
    pinItemToHeader(match);
    window.requestAnimationFrame(() => {
      pinItemToHeader(match);
      stack.classList.remove("is-pinning");
    });
  };

  window.addEventListener('hashchange', openFromHash);
  openFromHash();
}

/* Focal Rail: the three audience sections all stay in the document. The rail
   only decides which one is beside the photograph, and the page's own
   #parents / #teens / #adults links keep working by driving it. */

const rail = document.querySelector('[data-rail]');

if (rail) {
  const tabs = Array.from(rail.querySelectorAll('[role="tab"]'));
  const photo = document.querySelector('[data-rail-photo]');

  const select = (tab, { focus = false } = {}) => {
    tabs.forEach((item) => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (photo && tab.dataset.image) {
      photo.src = tab.dataset.image;
      photo.alt = tab.dataset.alt;
    }
    if (focus) tab.focus();
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => select(tab));
  });

  rail.addEventListener('keydown', (event) => {
    const step = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 }[event.key];
    if (!step) return;
    event.preventDefault();
    const current = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    select(tabs[(current + step + tabs.length) % tabs.length], { focus: true });
  });

  const selectFromHash = () => {
    const tab = tabs.find((item) => `#${item.id}` === window.location.hash);
    if (tab) select(tab);
  };

  window.addEventListener('hashchange', selectFromHash);
  selectFromHash();
}

document.querySelectorAll('a[href="#privacy-note"]').forEach((link) => {
  link.addEventListener('click', () => {
    document.getElementById('privacy-note').hidden = false;
  });
});
