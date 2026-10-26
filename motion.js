/* Motion layer: no third-party scripts or animation dependencies. */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const fine = window.matchMedia('(pointer: fine)');
  const root = document.documentElement;
  const progress = document.createElement('div'); progress.className = 'scroll-progress'; progress.setAttribute('aria-hidden','true'); document.body.append(progress);
  const toggle = document.createElement('button'); toggle.className = 'motion-toggle'; toggle.textContent = 'Motion on ✳'; toggle.setAttribute('aria-label','Pause decorative animation'); toggle.setAttribute('aria-pressed','true'); document.body.append(toggle);
  let paused = reduced.matches;
  function setMotion(value) { paused = value; root.classList.toggle('motion-paused',paused); toggle.textContent = paused ? 'Motion off ◌' : 'Motion on ✳'; toggle.setAttribute('aria-pressed',String(!paused)); toggle.setAttribute('aria-label',paused?'Enable decorative animation':'Pause decorative animation'); schedule(); }
  toggle.addEventListener('click',()=>setMotion(!paused));
  reduced.addEventListener('change',event=>setMotion(event.matches));

  // A short, skippable greeting; never traps focus or locks page scrolling.
  let intro;
  if (!reduced.matches && !location.hash) {
    intro = document.createElement('div'); intro.className = 'welcome-screen';
    intro.innerHTML = '<div class="welcome-grid" aria-hidden="true"></div><span class="welcome-orbit" aria-hidden="true"></span><div class="welcome-top"><span>BRECW / STUDENTS CLUB</span><span>THE FUTURE STARTS HERE ↗</span></div><div class="welcome-content"><p>WELCOME TO</p><h2><span>IIE CELL</span><em>BRECW.</em></h2><div class="welcome-caption">INNOVATE. BUILD. CREATE IMPACT.</div><div class="welcome-line"></div></div><button class="welcome-skip">Enter the experience ↗</button>';
    document.body.append(intro);
    let dismissed = false;
    const timer = setTimeout(dismiss,2300);
    function dismiss() { if(dismissed)return; dismissed=true; clearTimeout(timer); intro.classList.add('leaving'); root.classList.add('experience-ready'); setTimeout(()=>intro.remove(),800); }
    intro.querySelector('button').addEventListener('click',dismiss);
    document.addEventListener('keydown',dismiss,{once:true});
  } else root.classList.add('experience-ready');

  // Highlight text in reading order, driven by its actual viewport position.
  const reading = document.querySelector('.large-copy');
  const words = reading.textContent.trim().split(/\s+/);
  reading.textContent=''; reading.classList.add('reading-highlight');
  words.forEach(word=>{const span=document.createElement('span');span.textContent=word;reading.append(span,document.createTextNode(' '));});
  const wordNodes=[...reading.querySelectorAll('span')];
  document.querySelectorAll('main h2 em').forEach(em=>em.classList.add('ink-highlight'));

  const revealTargets = [...document.querySelectorAll('.section-heading, .about > div, .role-card, .structure > div, .journey-steps li, .weeks article, .framework-intro, .accordions details, .closing h2, .closing > p')];
  if ('IntersectionObserver' in window && !reduced.matches) {
    const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');observer.unobserve(entry.target);}}),{threshold:0.08,rootMargin:'0px 0px -20px 0px'});
    revealTargets.forEach((el,i)=>{el.classList.add('reveal');el.style.setProperty('--delay',`${el.matches('.role-card') ? i%3*65 : i%4*45}ms`);observer.observe(el);});
  }
  // Track navigation and illuminate the relevant idea-to-startup stage.
  const navLinks=[...document.querySelectorAll('nav a')];
  const sections=[...document.querySelectorAll('main section[id]')];
  const steps=[...document.querySelectorAll('.journey-steps li')];
  const heroArt=document.querySelector('.hero-art');
  const hero=document.querySelector('.hero');
  const canvas=document.createElement('canvas');canvas.className='particle-field';canvas.setAttribute('aria-hidden','true');hero.prepend(canvas);
  const ctx=canvas.getContext('2d');
  let width=0,height=0,particles=[],raf=0,previous=0,heroVisible=true;
  const pointer={x:-1000,y:-1000};
  function resize(){width=hero.clientWidth;height=hero.clientHeight;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=width*dpr;canvas.height=height*dpr;ctx?.setTransform(dpr,0,0,dpr,0,0);particles=Array.from({length:innerWidth<650?24:52},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,r:Math.random()*1.8+.6}));schedule();}
  hero.addEventListener('pointermove',event=>{const r=hero.getBoundingClientRect();pointer.x=event.clientX-r.left;pointer.y=event.clientY-r.top;});
  hero.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000;});
  function draw(dt){if(!ctx)return;ctx.clearRect(0,0,width,height);particles.forEach((p,i)=>{if(!paused){p.x=(p.x+p.vx*dt+width)%width;p.y=(p.y+p.vy*dt+height)%height;}ctx.fillStyle='rgba(105,41,59,.34)';ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();for(let j=i+1;j<particles.length;j++){const q=particles[j],d=Math.hypot(q.x-p.x,q.y-p.y);if(d<110){ctx.strokeStyle=`rgba(105,41,59,${(1-d/110)*.13})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}const distance=Math.hypot(pointer.x-p.x,pointer.y-p.y);if(fine.matches&&distance<150&&!paused){ctx.strokeStyle=`rgba(105,41,59,${(1-distance/150)*.35})`;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(pointer.x,pointer.y);ctx.stroke();}});}
  function render(now){raf=0;const dt=Math.min((now-previous)/16.67||1,2);previous=now;const scroll=window.scrollY,max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scroll/max:0})`;
    const rect=reading.getBoundingClientRect();const fraction=paused?1:Math.max(0,Math.min(1,(innerHeight*.83-rect.top)/(innerHeight*.48+rect.height*.35)));wordNodes.forEach((word,i)=>word.classList.toggle('lit',i/wordNodes.length<fraction));
    document.querySelectorAll('.ink-highlight').forEach(el=>{const r=el.getBoundingClientRect();el.classList.toggle('ink-visible',paused||r.top<innerHeight*.8);});
    sections.forEach(section=>{const r=section.getBoundingClientRect();if(r.top<innerHeight*.4&&r.bottom>innerHeight*.4){navLinks.forEach(link=>link.classList.toggle('current',link.hash==='#'+section.id));}});
    steps.forEach(step=>{const r=step.getBoundingClientRect();step.classList.toggle('step-active',paused||r.top<innerHeight*.73);});
    if(heroVisible){draw(dt);if(!paused&&innerWidth>850)heroArt.style.translate=`0 ${Math.min(scroll*.11,65)}px`;else heroArt.style.translate='';}
    if(!paused&&heroVisible&&!document.hidden)raf=requestAnimationFrame(render);
  }
  function schedule(){if(!raf&&!document.hidden)raf=requestAnimationFrame(render);}
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else schedule();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;schedule();}).observe(hero);
  // A local spotlight follows the pointer without replacing the native cursor.
  if(fine.matches){document.querySelectorAll('.role-card,.weeks article').forEach(card=>{card.addEventListener('pointermove',event=>{if(paused)return;const r=card.getBoundingClientRect();card.style.setProperty('--mx',`${event.clientX-r.left}px`);card.style.setProperty('--my',`${event.clientY-r.top}px`);});});}
  const ticker=document.createElement('div');ticker.className='idea-ticker';ticker.setAttribute('aria-hidden','true');ticker.innerHTML='<div>'+Array.from({length:4},()=>'<span>THINK BIG <i>✳</i> START SMALL <i>↗</i> BUILD TOGETHER <i>✳</i> CREATE IMPACT <i>↗</i></span>').join('')+'</div>';document.querySelector('.principles').after(ticker);
  setMotion(paused);resize();
})();

