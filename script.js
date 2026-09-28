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
