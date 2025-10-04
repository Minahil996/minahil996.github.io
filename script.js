// Shared JS: reveal on scroll, typing mimic, nav active, projects modal
document.addEventListener('DOMContentLoaded', ()=> {
  // reveal sections
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=> {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:0.18});
  reveals.forEach(r => io.observe(r));

  // simple typing (target elements with data-type attribute)
  function type(el, text, delay=60) {
    if(!el) return;
    el.textContent = '';
    let i=0;
    const t = setInterval(()=> {
      el.textContent += text.charAt(i);
      i++;
      if(i>=text.length) clearInterval(t);
    }, delay);
  }
  const nameEl = document.querySelector('[data-type="name"]');
  const lineEl = document.querySelector('[data-type="line"]');
  if(nameEl) type(nameEl, nameEl.datasetText || nameEl.textContent.trim(), 70);
  if(lineEl) setTimeout(()=> type(lineEl, lineEl.datasetText || lineEl.textContent.trim(), 45), 900);

  // nav active on scroll (highlight based on id in viewport)
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('nav a');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      const id = e.target.id;
      const link = document.querySelector(`nav a[href="#${id}"]`);
      if(e.isIntersecting) {
        navLinks.forEach(l=>l.classList.remove('active'));
        if(link) link.classList.add('active');
      }
    });
  }, {threshold:0.45});
  sections.forEach(s => navObserver.observe(s));

  // projects modal (works if .project elements exist)
  const projectEls = document.querySelectorAll('.project');
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeBtn = document.getElementById('close-modal');
  if(projectEls && modal) {
    projectEls.forEach(p => {
      p.addEventListener('click', ()=> {
        const title = p.querySelector('h3') ? p.querySelector('h3').textContent : 'Project';
        modalTitle.textContent = title;
        modalDesc.textContent = '🚀 Projects are coming soon — I am building them and will share updates here. Follow my GitHub/LinkedIn for progress.';
        modal.classList.add('open');
      });
    });
    closeBtn.addEventListener('click', ()=> modal.classList.remove('open'));
    modal.addEventListener('click', (e)=> { if(e.target === modal) modal.classList.remove('open'); });
  }

  // simple contact form demo (if present)
  const form = document.getElementById('contact-form');
  if(form) form.addEventListener('submit', (e)=>{ e.preventDefault(); alert('Thanks! Message received (demo).'); form.reset(); });
});
