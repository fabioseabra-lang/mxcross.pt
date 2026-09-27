
(function(){
  const t=document.getElementById('mxchatToggle');
  const p=document.getElementById('mxchatPanel');
  const c=document.getElementById('mxchatClose');
  const body=document.getElementById('mxchatBody');
  const faq=document.getElementById('mxchatFaq');
  const form=document.getElementById('mxchatForm');
  const input=document.getElementById('mxchatInput');
  const cats=document.querySelectorAll('.mxchat-chip');

  const qa={
    "Fazem banco de potência?":"Sim. A MXCross.pt faz testes em banco de potência exclusivamente para motos até 70 CV, com medição de potência e binário.",
    "Qual é o limite do banco?":"Neste momento, testamos apenas motos até 70 CV no banco de potência.",
    "O que é o Dyno Saturday?":"É um sábado dedicado a testes no banco de potência, por marcação, para medir resultados e comparar alterações.",
    "Testam motos 2T?":"Sim, desde que estejam em boas condições mecânicas e não ultrapassem 70 CV.",
    "Testam motos 4T?":"Sim, desde que não ultrapassem 70 CV.",
    "Dão gráfico do teste?":"Sim. Podemos apresentar gráfico de potência e binário.",
    "Posso comparar antes e depois?":"Sim. Podemos testar antes e depois de alterações para comparar resultados.",
    "Quanto custa o banco?":"O valor depende do tipo de teste e número de passagens. Envia mensagem para confirmar o preço atual.",

    "Fazem peças à medida?":"Sim. Fabricamos peças à medida para motos, automóveis e projetos especiais.",
    "Fazem flanges?":"Sim. Podemos fabricar flanges e adaptadores após análise de medidas e material.",
    "Fazem casquilhos?":"Sim. Podemos fabricar casquilhos e espaçadores à medida.",
    "Têm torno mecânico?":"Sim. Temos torno mecânico para eixos, casquilhos, espaçadores, adaptadores e outros componentes.",
    "Têm fresadora?":"Sim. Temos fresadora convencional para maquinação, furação, faceamento, encaixes e ajustes.",
    "Têm CNC?":"Sim. Temos fresadora CNC para maquinação de precisão.",
    "Fazem CAD?":"Podemos desenvolver soluções com desenho CAD antes do fabrico, quando necessário.",

    "Fazem soldadura TIG?":"Sim. Fazemos TIG em inox, alumínio e aço, incluindo escapes, tubagens, suportes e reparações.",
    "Fazem soldadura MIG?":"Sim. Temos capacidade de soldadura MIG para trabalhos adequados ao processo.",
    "Soldam alumínio?":"Sim. Fazemos soldadura TIG e trabalhos técnicos em alumínio.",
    "Trabalham inox?":"Sim. Trabalhamos inox em escapes, tubagens, suportes e componentes personalizados.",
    "Fazem escapes?":"Sim. Fazemos reparação, adaptação e fabrico de escapes à medida para motos, carros, Jeeps e 4x4.",

    "Fazem manutenção de motos?":"Sim. Fazemos manutenção e reparação de motos e projetos especiais.",
    "Fazem diagnóstico?":"Sim. Fazemos diagnóstico mecânico e análise de comportamento, com apoio do banco quando aplicável.",
    "Trabalham com 4x4?":"Sim. Também desenvolvemos projetos 4x4, adaptações e fabrico técnico.",
    "Têm microesferas de vidro?":"Sim. Temos cabine de decapagem com microesferas de vidro para limpeza e renovação de peças.",

    "Onde ficam?":"A MXCross.pt fica em Rio Maior, Portugal. Para a morada exata, envia mensagem.",
    "Como faço marcação?":"Envia mensagem com o serviço pretendido, marca/modelo e uma breve descrição do trabalho.",
    "Qual é o horário?":"O horário definitivo da nova oficina ainda está a ser preparado. Confirma disponibilidade por mensagem.",
    "Como peço orçamento?":"Envia fotografias, medidas e descrição do trabalho. Alguns projetos precisam de avaliação presencial.",
    "Têm Instagram?":"Sim. Instagram: @mxcross.pt",
    "Têm Facebook?":"Sim. Podes contactar a MXCross.pt através da página de Facebook."
  };

  const groups={
    dyno:["Fazem banco de potência?","Qual é o limite do banco?","O que é o Dyno Saturday?","Testam motos 2T?","Testam motos 4T?","Dão gráfico do teste?","Posso comparar antes e depois?","Quanto custa o banco?"],
    fabricacao:["Fazem peças à medida?","Fazem flanges?","Fazem casquilhos?","Têm torno mecânico?","Têm fresadora?","Têm CNC?","Fazem CAD?"],
    soldadura:["Fazem soldadura TIG?","Fazem soldadura MIG?","Soldam alumínio?","Trabalham inox?","Fazem escapes?"],
    oficina:["Fazem manutenção de motos?","Fazem diagnóstico?","Trabalham com 4x4?","Têm microesferas de vidro?"],
    contacto:["Onde ficam?","Como faço marcação?","Qual é o horário?","Como peço orçamento?","Têm Instagram?","Têm Facebook?"]
  };

  function msg(text,who){
    const d=document.createElement('div'); d.className='mxmsg '+who; d.textContent=text;
    body.appendChild(d); body.scrollTop=body.scrollHeight;
  }
  function show(cat){
    faq.innerHTML='';
    (groups[cat]||[]).forEach(q=>{
      const b=document.createElement('button'); b.className='mxchat-q'; b.textContent=q;
      b.addEventListener('click',()=>{msg(q,'user');setTimeout(()=>msg(qa[q],'bot'),180)});
      faq.appendChild(b);
    });
  }
  function norm(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[?!.;,]/g,' ').replace(/\s+/g,' ').trim()}
  function answer(text){
    const q=norm(text); let best=null,score=0;
    Object.keys(qa).forEach(k=>{
      const words=norm(k).split(' ').filter(w=>w.length>2);
      let s=0; words.forEach(w=>{if(q.includes(w)) s++});
      if(s>score){score=s;best=k}
    });
    if(best && score>=2) return qa[best];
    if(q.includes('70') && (q.includes('cv')||q.includes('cavalos'))) return 'Sim. O limite atual do nosso banco de potência é 70 CV.';
    if(q.includes('ola')||q.includes('bom dia')||q.includes('boa tarde')||q.includes('boa noite')) return 'Olá! Escolhe uma categoria ou escreve a tua pergunta.';
    return 'Não tenho essa informação definida. Para não te dar uma resposta errada, envia mensagem à MXCross.pt e respondemos-te diretamente.';
  }

  if(t && p){
    t.addEventListener('click',()=>p.classList.toggle('open'));
    c.addEventListener('click',()=>p.classList.remove('open'));
    cats.forEach(b=>b.addEventListener('click',()=>show(b.dataset.cat)));
    form.addEventListener('submit',e=>{
      e.preventDefault(); const x=input.value.trim(); if(!x)return;
      msg(x,'user'); input.value=''; setTimeout(()=>msg(answer(x),'bot'),220);
    });
    show('dyno');
  }
})();




/* Generic carousel */
(function(){
  document.querySelectorAll('.js-carousel').forEach(root=>{
    const slides=[...root.querySelectorAll('.dyno-slide')];
    const dots=[...root.querySelectorAll('.dyno-dot')];
    const prev=root.querySelector('.dyno-arrow.prev');
    const next=root.querySelector('.dyno-arrow.next');
    if(!slides.length) return;
    let idx=0, timer=null, startX=0;

    function show(n){
      idx=(n+slides.length)%slides.length;
      slides.forEach((s,i)=>s.classList.toggle('active',i===idx));
      dots.forEach((d,i)=>d.classList.toggle('active',i===idx));
    }
    function autoplay(){
      clearInterval(timer);
      timer=setInterval(()=>show(idx+1),4200);
    }
    prev?.addEventListener('click',()=>{show(idx-1);autoplay()});
    next?.addEventListener('click',()=>{show(idx+1);autoplay()});
    dots.forEach((d,i)=>d.addEventListener('click',()=>{show(i);autoplay()}));
    root.addEventListener('touchstart',e=>{startX=e.touches[0].clientX},{passive:true});
    root.addEventListener('touchend',e=>{
      const dx=e.changedTouches[0].clientX-startX;
      if(Math.abs(dx)>45){show(idx+(dx<0?1:-1));autoplay();}
    },{passive:true});
    show(0);
    autoplay();
  });
})();
