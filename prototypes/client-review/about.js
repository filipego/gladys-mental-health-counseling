document.querySelectorAll('a[href="#privacy-note"]').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('privacy-note').hidden = false;
  });
});
