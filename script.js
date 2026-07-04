const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = menuButton.querySelector('.menu-icon');

function closeMenu() {
  mobileMenu.classList.remove('open');
  menuIcon.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}

menuButton.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuIcon.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('#mobile-menu a').forEach(link => link.addEventListener('click', closeMenu));

const header = document.getElementById('site-header');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];

function updateNavigation() {
  header.classList.toggle('header-compact', window.scrollY > 20);
  if (document.body.dataset.page) return;
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}

window.addEventListener('scroll', updateNavigation, { passive: true });
updateNavigation();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const track = document.getElementById('project-track');
const nextProject = document.getElementById('next-project');
const prevProject = document.getElementById('prev-project');
if (track && nextProject && prevProject) {
  nextProject.addEventListener('click', () => track.scrollBy({ left: track.clientWidth * 0.7, behavior: 'smooth' }));
  prevProject.addEventListener('click', () => track.scrollBy({ left: -track.clientWidth * 0.7, behavior: 'smooth' }));
}

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
if (form && formStatus) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    formStatus.classList.remove('hidden');
    form.reset();
    setTimeout(() => formStatus.classList.add('hidden'), 5000);
  });
}

document.querySelectorAll('.faq-button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(openItem => openItem.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();
