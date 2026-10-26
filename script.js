const header = document.querySelector('.site-header');
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');
const theme = document.querySelector('.theme-toggle');
const dialog = document.querySelector('.case-study');
const content = document.querySelector('.modal-content');
const studies = {
  exam:{title:'College Exam Portal',type:'Web application',problem:'Examination workflows can be difficult to manage when timing, evaluation, and administration are disconnected.',solution:'A web-based platform that brings student testing, timed exams, automated scoring, and administration into one workflow.',works:'Students take timed assessments while the system calculates results. The admin side supports examination management and oversight.',tech:'JSP, JDBC, MySQL, Apache Tomcat 10, HTML5, CSS3, JavaScript'},
  books:{title:'Multi-Data-Structure-Based Book Search Engine',type:'Algorithms · Java',problem:'Library search and circulation benefit from more than a single generic lookup structure.',solution:'A Java web application that combines purpose-fit data structures to make discovery and management efficient.',works:'The system uses an AVL tree, hash table, Trie autocomplete, and Max Heap alongside borrowing and return workflows.',tech:'Java, Apache Tomcat, HTML, CSS, JavaScript, Maven, AVL Tree, Hash Table, Trie, Max Heap'},
  lighting:{title:'Smart Classroom Lighting Automation',type:'Computer vision · Embedded systems',problem:'Classroom lights can remain active when a space is not in use.',solution:'A vision-based presence detection system designed to trigger lighting control only when people are detected.',works:'A camera feed is processed with OpenCV and YOLO. A presence decision is sent to an Arduino, which controls a relay connected to the lights.',tech:'Python, OpenCV, YOLO, Arduino, Relay'},
  credit:{title:'Fairness and Explainability in AI-Based Credit Risk Assessment',type:'Responsible AI · Machine learning',problem:'A model prediction alone does not explain why a decision was made or whether its behavior should be examined for fairness.',solution:'An ML study that compares credit-risk models while applying explainability techniques to inspect predictions.',works:'Logistic Regression and Random Forest models are analyzed with SHAP to support a clearer interpretation of prediction drivers.',tech:'Python, Machine Learning, Logistic Regression, Random Forest, SHAP'}
};
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>10));
menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open);});
links.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{links.classList.remove('open');menu.setAttribute('aria-expanded','false');}));
theme.addEventListener('click',()=>{document.body.classList.toggle('light');theme.textContent=document.body.classList.contains('light')?'◑':'◐';});
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const p=studies[button.dataset.project];content.innerHTML=`<p class="eyebrow">${p.type}</p><h2>${p.title}</h2><h3>Problem</h3><p>${p.problem}</p><h3>Solution</h3><p>${p.solution}</p><h3>How it works</h3><p>${p.works}</p><h3>Technology decisions</h3><p>${p.tech}</p><p><a href="https://github.com/ganesh-1508" target="_blank" rel="noreferrer">Visit GitHub profile ↗</a></p>`;dialog.showModal();}));
dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
// Replace these placeholders with the IDs and public key from your EmailJS account.
// EmailJS public keys are intended for browser use; never put a private key here.
const emailJsConfig = {
  serviceId: 'service_mxctike',
  templateId: 'template_b9u8vi5',
  publicKey: 'PzFvR9Pb_Nrg0wo4t'
};
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const statusMessage = contactForm.querySelector('.form-status');
  const idleButtonMarkup = submitButton.innerHTML;

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const configValues = Object.values(emailJsConfig);
    if (!window.emailjs || configValues.some((value) => !value || value.startsWith('YOUR_'))) {
      statusMessage.textContent = 'Email service is not configured yet. Please email me directly instead.';
      statusMessage.dataset.state = 'error';
      return;
    }

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    submitButton.textContent = 'Sending…';
    statusMessage.textContent = '';
    delete statusMessage.dataset.state;

    try {
      await window.emailjs.sendForm(
        emailJsConfig.serviceId,
        emailJsConfig.templateId,
        contactForm,
        { publicKey: emailJsConfig.publicKey }
      );
      statusMessage.textContent = 'Message sent successfully!';
      statusMessage.dataset.state = 'success';
      contactForm.reset();
    } catch (error) {
      console.error('EmailJS send failed:', error);
      statusMessage.textContent = 'Message could not be sent. Please try again or email me directly.';
      statusMessage.dataset.state = 'error';
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.innerHTML = idleButtonMarkup;
    }
  });
}
// Subtle scroll progress, reveal-on-scroll, and pointer-responsive profile lighting.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  revealItems.forEach((element, index) => {
    element.style.setProperty('--reveal-delay', `${(index % 3) * 80}ms`);
    revealObserver.observe(element);
  });
} else {
  revealItems.forEach((element) => element.classList.add('is-visible'));
}

const updateScrollProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  document.documentElement.style.setProperty('--scroll-progress', String(progress));
};
updateScrollProgress();
window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);

const profilePanel = document.querySelector('.profile-panel');
if (profilePanel && !prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  profilePanel.addEventListener('pointermove', (event) => {
    const bounds = profilePanel.getBoundingClientRect();
    profilePanel.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    profilePanel.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
  });
  profilePanel.addEventListener('pointerleave', () => {
    profilePanel.style.removeProperty('--pointer-x');
    profilePanel.style.removeProperty('--pointer-y');
  });
}
