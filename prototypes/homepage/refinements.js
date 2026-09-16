const rows = document.querySelectorAll('.audience-row');
const preview = document.querySelector('.audience-preview img');
for (const row of rows) {
  const activate = () => {
    rows.forEach(item => item.classList.toggle('active', item === row));
    if (preview && preview.getAttribute('src') !== `assets/${row.dataset.image}`) {
      preview.src = `assets/${row.dataset.image}`;
      preview.alt = row.querySelector('.row-image').alt;
    }
  };
  row.addEventListener('pointerenter', activate);
  row.addEventListener('focusin', activate);
}
document.querySelector('a[href="#privacy-note"]')?.addEventListener('click', () => {
  document.querySelector('#privacy-note').hidden = false;
});
