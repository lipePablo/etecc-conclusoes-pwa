// Tema
function applyTheme(theme) {
  const isDark = theme === 'dark';
  document.body.classList.toggle('dark-theme', isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  // Ícone do botão do topo
  const icon = document.getElementById('btnTemaTopoIcon');
  if (icon) {
    icon.classList.remove('fa-sun','fa-moon');
    icon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
  }
}
    // Observador global para reforçar setups quando novas seções forem inseridas dinamicamente
    try { wireDynamicEnhancers(formId, container); } catch {}
    
function toggleTheme() {
  const current = localStorage.getItem('theme') || 'light';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// última rota não-form para comportamento do botão Voltar
let __lastNonFormRoute = '/';
// Rota atual e controle de reversao de navegacao (SPA)
let __currentRoute = (location.hash || '#/').replace('#','');
// Bypass de uma tentativa de navegação após confirmação positiva
let __bypassDirtyGuardOnce = false;
// Pular o próximo processamento do roteador (usado ao reverter hash para cancelar navegação)
let __skipNextRender = false;

  document.addEventListener('DOMContentLoaded', () => {
      // Carregar tema salvo
    const saved = localStorage.getItem('theme') || 'light';
    applyTheme(saved);

    // Botão de tema no topo
    const btnTemaTopo = document.getElementById('btnTemaTopo');
    if (btnTemaTopo) btnTemaTopo.addEventListener('click', toggleTheme);

    // Remover item "Histórico de versões" do menu lateral
    try { const mvh = document.getElementById('menuVersionHistory'); if (mvh) mvh.remove(); } catch {}

    // Reforço global: manter placeholder de supervisão no exemplo quando nada selecionado
    try {
      const enforceSupPlaceholder = () => {
        try {
          const ex = document.querySelector('[data-ctx="exemplo-ausencia"]');
          const fc = document.getElementById('formContainer');
          if (!ex || !fc || (fc.__formId !== 'comunicado-ausencia')) return;
          const sel = fc.querySelector('input[name="aus_sup_comunicada"]:checked');
          if (!sel) {
            const base = 'A supervisão [selecione] previamente comunicada sobre a minha ausência.';
            const cur = ex.textContent || '';
            try { ex.textContent = /A supervis[^\n]*/.test(cur) ? cur.replace(/A supervis[^\n]*/, base) : (cur ? (cur+'\n'+base) : base); } catch {}
          }
        } catch {}

        // Ajuste do campo de tomada e inserção do aviso de ciência
        try {
          const temBlock = (typeof root !== 'undefined' && root && ((root.__formId||'') === 'ponto-adicional')) ? root.querySelector('input[name="tem_tomada"]')?.closest('.form-block') : null;
          if (temBlock) {
            try {
              const lab = temBlock.querySelector('label.form-label');
              if (lab) lab.textContent = 'Será necessário uma tomada ou foi somente cabeamento neste caso:';
            } catch {}
            try {
              const labSim = temBlock.querySelector('label[for="tem_tomada_sim"]');
              if (labSim) labSim.innerHTML = '<i class="fa-solid fa-check"></i> Será necessário tomada';
            } catch {}
            try {
              const labNao = temBlock.querySelector('label[for=\'tem_tomada_nao\']');
              if (labNao) labNao.innerHTML = '<i class="fa-solid fa-xmark"></i> Somente cabeamento';
            } catch {}
            // Inserir campo de ciência do cliente e aviso, se ainda não existirem
            if (!root.querySelector('#cli_tomada_ciente_sim')) {
              const wrap1 = document.createElement('div');
              wrap1.className = 'form-block';
              wrap1.setAttribute('data-when-field', 'tem_tomada');
              wrap1.setAttribute('data-when-equals', 'sim');
              wrap1.setAttribute('data-clear-on-hide', '1');
              wrap1.innerHTML = ''
                + '<label class="form-label">O cliente está ciente da necessidade de uma tomada no local?</label>\n'
                + '  <div class="segmented" role="radiogroup" aria-label="Cliente ciente sobre tomada?">\n'
                + '    <input type="radio" id="cli_tomada_ciente_sim" name="cli_ciente_tomada" value="sim">\n'
                + '    <label for="cli_tomada_ciente_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
                + '    <input type="radio" id="cli_tomada_ciente_nao" name="cli_ciente_tomada" value="nao">\n'
                + '    <label for="cli_tomada_ciente_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
                + '  </div>';
              temBlock.insertAdjacentElement('afterend', wrap1);
              const wrap2 = document.createElement('div');
              wrap2.className = 'form-block';
              wrap2.setAttribute('data-when-field', 'cli_ciente_tomada');
              wrap2.setAttribute('data-when-equals', 'nao');
              wrap2.setAttribute('data-clear-on-hide', '1');
              wrap2.innerHTML = '<div class="form-hint sinal-los-hint is-highlight">Avise o cliente sobre a necessidade de instalar uma tomada neste local.</div>';
              wrap1.insertAdjacentElement('afterend', wrap2);
              // Ajustes solicitados: rótulo da pergunta, opções Sim/Não e regra de exibição
              try { const lab = temBlock.querySelector('label.form-label'); if (lab) lab.textContent = 'Tem tomada para ligar o equipamento neste local:'; } catch {}
              try { const lSim = temBlock.querySelector('label[for="tem_tomada_sim"]'); if (lSim) lSim.innerHTML = '<i class="fa-solid fa-check"></i> Sim'; } catch {}
              try { const lNao = temBlock.querySelector('label[for=\'tem_tomada_nao\']'); if (lNao) lNao.innerHTML = '<i class="fa-solid fa-xmark"></i> N\u00e3o'; } catch {}
              try { const extra = temBlock.querySelector('#tem_tomada_nao_nec'); if (extra) { const lbl = temBlock.querySelector('label[for="tem_tomada_nao_nec"]'); if (lbl && lbl.parentNode) lbl.parentNode.removeChild(lbl); if (extra && extra.parentNode) extra.parentNode.removeChild(extra); } } catch {}
              // Exibir pergunta de ciência quando NÃO há tomada
              try { const w1 = root.querySelector('div.form-block[data-when-field="tem_tomada"][data-when-equals="sim"]'); if (w1) w1.setAttribute('data-when-equals','nao'); } catch {}
              // Substituir aviso por justificativa (textarea 1 linha)
              try {
                const w2 = root.querySelector('div.form-block[data-when-field="cli_ciente_tomada"][data-when-equals="nao"]');
                if (w2) {
                  w2.innerHTML = ''
                    + '<label class="form-label" for="cli_tomada_ciente_just">Justifique o motivo pelo qual o cliente n\u00e3o foi informado sobre esta necessidade:</label>\\n'
                    + '  <textarea id="cli_tomada_ciente_just" name="cli_tomada_ciente_just" class="form-input--underline auto-expand" placeholder="Digite..." rows="1" data-min-height="32"></textarea>';
                }
              } catch {}
              try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
            }
          }
        } catch {}
        try {
          Array.from(root.querySelectorAll('input[name="stc_tipo_serv"]')).forEach(r => {
            r.addEventListener('change', () => {
              try { if (typeof setFormState==='function') setFormState('suporte-tecnico-carro', { stc_tipo_serv: r.value }); } catch {}
              try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('suporte-tecnico-carro', root); } catch {}
            });
          });
          try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('suporte-tecnico-carro', root); } catch {}
        } catch {}
      };
      // Observa apenas mudanças explícitas do campo; evita observar todo o body (performance)
      document.addEventListener('change', (e)=>{ const n=(e.target&&e.target.name)||''; if (n==='aus_sup_comunicada') enforceSupPlaceholder(); }, true);
      setTimeout(enforceSupPlaceholder, 50);
      // Força o placeholder do período a exibir "/ o dia inteiro" logo no carregamento
      try {
        const forceDiaInteiro = () => {
          try {
            const fc = document.getElementById('formContainer');
            if (!fc || fc.__formId !== 'comunicado-ausencia') return;
            const ex = document.querySelector('[data-ctx="exemplo-ausencia"]');
            if (!ex) return;
            const cur = ex.textContent || '';
            if (cur && !(/\/ o dia inteiro/i.test(cur))) {
              try { ex.textContent = cur.replace(/no\s+ho.*?rio\s+das\s+\[[^\]]*\]/i, (m) => m + ' / o dia inteiro'); } catch {}
            }
          } catch {}
        };
        setTimeout(forceDiaInteiro, 80);
      } catch {}
    } catch {}

    // Saudação e frases motivacionais
  (function setupGreetingAndQuotes(){
    const NAME_KEY = 'unificado.userName';
    const IDX_KEY = 'unificado.motivation.idx';
    const DECK_KEY = 'unificado.motivation.deck';
    const POOL_LEN_KEY = 'unificado.motivation.poolLen';
    const QUOTES_BASE = [
      'A cada novo dia, plante uma semente de coragem e colha um futuro de vitórias.',
      'Seus sonhos são o mapa; sua determinação é o caminho.',
      'O primeiro passo é sempre o mais difícil, mas também o mais transformador.',
      'Transforme seus medos em degraus para alcançar seus objetivos.',
      'A força que você procura está dentro de você, esperando para ser despertada.',
      'Não espere o momento perfeito; faça do agora o seu momento.',
      'Cada obstáculo é uma lição disfarçada de desafio.',
      'Acredite: o que parece impossível hoje será sua conquista amanhã.',
      'Sua jornada é única; celebre cada passo, por menor que seja.',
      'O sucesso não é o destino, mas a coragem de continuar a caminhada.',
      'Deixe suas ações falarem mais alto que suas dúvidas.',
      'O futuro pertence a quem ousa sonhar e trabalha para realizar.',
      'Pequenos esforços diários constroem grandes resultados.',
      'Você é mais forte do que qualquer tempestade que enfrentar.',
      'A mudança começa com um pensamento e ganha vida com uma ação.',
      'Não se compare; sua luz brilha de forma única.',
      'Persista, pois até as menores gotas moldam a rocha com o tempo.',
      'O fracasso é apenas um convite para tentar de novo, com mais sabedoria.',
      'Seus sonhos merecem sua dedicação, não suas desculpas.',
      'Acredite em si mesmo, mesmo quando o mundo duvidar.',
      'Cada dia é uma nova chance para reescrever sua história.',
      'A força do seu coração é maior que qualquer obstáculo.',
      'O caminho pode ser longo, mas cada passo te aproxima do topo.',
      'Não deixe o medo apagar a chama dos seus sonhos.',
      'Você é o autor da sua história; escreva capítulos de coragem.',
      'A vitória começa no momento em que você decide não desistir.',
      'Transforme suas cicatrizes em estrelas que guiam seu caminho.',
      'Sonhe grande, mas comece pequeno; todo império começa com um tijolo.',
      'Sua determinação é a chave que abre todas as portas.',
      'Não espere por aplausos; sua conquista é o maior reconhecimento.',
      'O hoje é o alicerce do seu amanhã; construa com firmeza.',
      'Cada esforço é um passo mais perto do seu sonho.',
      'Você é capaz de transformar impossíveis em realidades.',
      'A coragem não é ausência de medo, mas a ação apesar dele.',
      'O mundo muda quando você decide mudar a si mesmo.',
      'Sua paixão é o combustível; sua ação é o motor.',
      'Não há limites para quem acredita no próprio potencial.',
      'A jornada é tão importante quanto o destino; aproveite cada passo.',
      'Você é mais forte do que imagina; descubra sua força hoje.',
      'O sucesso é a soma de pequenos esforços repetidos com amor.',
      'Deixe o passado ensinar, mas não prender você.',
      'Cada novo amanhecer traz a chance de recomeçar.',
      'Você não precisa ser perfeito, apenas precisa começar.',
      'Acredite: o universo conspira a favor de quem persiste.',
      'Suas escolhas de hoje moldam o seu amanhã.',
      'O brilho dos seus sonhos ilumina até os dias mais escuros.',
      'Não deixe as dúvidas ofuscarem sua determinação.',
      'Cada passo, por menor que seja, é uma vitória em construção.',
      'Você é o escultor do seu futuro; molde-o com ousadia.',
      'A força de um sonho é maior que qualquer obstáculo.',
      'O caminho do sucesso é pavimentado com paciência e esforço.',
      'Não espere permissão para brilhar; o palco é seu.',
      'Cada desafio é uma oportunidade para crescer mais forte.',
      'Sua história ainda está sendo escrita; faça dela uma obra-prima.',
      'Acredite no seu valor, e o mundo também acreditará.',
      'O primeiro passo é sempre o mais valente.',
      'Não há atalhos para o sucesso, mas cada passo vale a pena.',
      'Você é a chama que ilumina sua própria jornada.',
      'Transforme o “e se” em “vou tentar”.',
      'O futuro é seu para criar; comece agora.',
      'A determinação transforma sonhos em conquistas.',
      'Não tema o fracasso; ele é apenas um professor exigente.',
      'Sua coragem é a ponte entre o sonho e a realidade.',
      'Cada dia é uma tela em branco; pinte-a com ousadia.',
      'Você é maior que suas dúvidas e mais forte que seus medos.',
      'O sucesso não vem por acaso; ele é construído com esforço.',
      'Acredite no seu potencial, mesmo nos dias mais difíceis.',
      'Cada passo te aproxima do topo; continue subindo.',
      'Você é o arquiteto dos seus sonhos; construa sem medo.',
      'A persistência é a chave que abre as portas do impossível.',
      'Não deixe o passado apagar o brilho do seu futuro.',
      'Cada novo dia é uma chance de ser melhor que ontem.',
      'Sua força interior é maior que qualquer tempestade.',
      'O caminho para o sucesso é trilhado com pequenos passos.',
      'Acredite: você é capaz de mover montanhas.',
      'Não espere o momento certo; faça o momento acontecer.',
      'Sua determinação é a faísca que acende grandes mudanças.',
      'O fracasso é apenas um degrau para o sucesso.',
      'Você é o autor do seu destino; escreva com coragem.',
      'Cada obstáculo é uma chance de mostrar sua força.',
      'Sonhe alto, mas trabalhe com os pés no chão.',
      'A mudança começa com um passo; dê o seu hoje.',
      'Sua jornada é única; celebre suas conquistas.',
      'Não deixe o medo apagar a chama da sua ambição.',
      'Você é mais forte do que qualquer desafio que enfrentar.',
      'O sucesso é construído com paciência e persistência.',
      'Acredite no seu sonho, mesmo quando ninguém mais acreditar.',
      'Cada dia é uma oportunidade para recomeçar com força.',
      'Sua coragem é a luz que guia seu caminho.',
      'Não há limites para quem acredita em si mesmo.',
      'Transforme seus sonhos em metas e suas metas em realidade.',
      'O futuro pertence a quem ousa lutar por ele.',
      'Cada esforço é um tijolo na construção do seu sucesso.',
      'Você é capaz de superar qualquer barreira.',
      'Acredite: o melhor ainda está por vir.',
      'Não deixe as dúvidas silenciarem sua voz interior.',
      'Cada passo é uma vitória sobre o medo.',
      'Sua determinação é a força que move montanhas.',
      'O sucesso é a recompensa de quem nunca desiste.',
      'Você é o mestre do seu destino; comande com coragem.',
      'A jornada mais longa começa com um único passo.',
      'Não tema os tropeços; eles ensinam o caminho.',
      'Sua paixão é a luz que ilumina seus objetivos.',
      'Acredite no seu valor; o mundo precisa da sua luz.',
      'Cada dia é uma chance de construir um novo você.',
      'O sucesso não é sorte; é trabalho e dedicação.',
      'Você é mais forte do que qualquer obstáculo no caminho.',
      'Transforme seus sonhos em planos e seus planos em ação.',
      'A coragem é o primeiro passo para a vitória.',
      'Não espere o amanhã; comece a brilhar hoje.',
      'Sua determinação é a chave para abrir novas portas.',
      'Cada desafio é uma oportunidade para crescer.',
      'Você é o autor da sua história; escreva com ousadia.',
      'O fracasso é apenas um convite para tentar novamente.',
      'Acredite: sua força é maior que qualquer tempestade.',
      'O caminho para o sucesso é trilhado com persistência.',
      'Não deixe o medo apagar o fogo dos seus sonhos.',
      'Você é capaz de transformar o impossível em possível.',
      'Cada novo dia é uma chance de reescrever sua história.',
      'Sua coragem é a faísca que acende grandes conquistas.',
      'O sucesso é construído com pequenos passos diários.',
      'Acredite no seu potencial, mesmo nos dias mais difíceis.',
      'Não há limites para quem sonha com coragem.',
      'Transforme suas dúvidas em degraus para o sucesso.',
      'Você é mais forte do que qualquer barreira que enfrentar.',
      'O futuro é moldado pelas escolhas que você faz hoje.',
      'Cada esforço é um passo rumo à sua melhor versão.',
      'Acredite: o universo está torcendo pelo seu sucesso.',
      'Não deixe o passado apagar a luz do seu futuro.',
      'Sua determinação é a ponte para seus sonhos.',
      'O sucesso é a soma de pequenos esforços diários.',
      'Você é capaz de superar qualquer desafio com coragem.',
      'Cada dia é uma nova oportunidade para brilhar.',
      'Não tema o fracasso; ele é apenas um professor.',
      'Sua paixão é o motor que impulsiona suas conquistas.',
      'Acredite no seu valor, mesmo quando ninguém mais acreditar.',
      'O caminho para o sucesso é pavimentado com esforço.',
      'Você é o escultor do seu destino; molde-o com ousadia.',
      'Cada obstáculo é uma chance de mostrar sua força.',
      'Não espere o momento perfeito; faça o agora valer.',
      'Sua coragem é a luz que guia sua jornada.',
      'O sucesso é construído com paciência e determinação.',
      'Acredite: você é capaz de alcançar o impossível.',
      'Cada passo é uma vitória sobre suas dúvidas.',
      'Não deixe o medo apagar a chama da sua ambição.',
      'Você é mais forte do que qualquer tempestade.',
      'O futuro pertence a quem ousa lutar por ele.',
      'Cada esforço é um tijolo na construção dos seus sonhos.',
      'Acredite no seu potencial; o mundo está esperando por você.',
      'Sua jornada é única; transforme-a em uma obra-prima.',
      { text: 'Não espere por circunstâncias ideais. Crie-as.', author: 'George Bernard Shaw' },
      { text: 'Não é o que acontece com você, mas como você reage a isso que importa.', author: 'Epicteto' },
      { text: 'A felicidade não é algo pronto. Ela vem das suas próprias ações.', author: 'Dalai Lama' },
      { text: 'A vida é 10% o que nos acontece e 90% como reagimos a isso.', author: 'Charles R. Swindoll' },
      { text: 'O sucesso nasce do querer, da determinação e da persistência.', author: 'Napoleon Hill' },
      { text: 'A jornada de mil milhas começa com um único passo.', author: 'Lao Tsé' },
      { text: 'A coragem é a resistência ao medo, o domínio do medo, e não a ausência dele.', author: 'Mark Twain' },
      { text: 'Creia em si, e todo o resto virá naturalmente.', author: 'Elon Musk' },
      { text: 'A maior glória em viver não está em nunca cair, mas em nos levantar cada vez que caímos.', author: 'Nelson Mandela' },
      { text: 'Faça hoje o que outros não querem, e amanhã fará o que outros não podem.', author: 'Jerry Rice' },
      { text: 'O único lugar onde o sucesso vem antes do trabalho é no dicionário.', author: 'Vidal Sassoon' },
      { text: 'Pessoas que são loucas o bastante para achar que podem mudar o mundo são as que o mudam.', author: 'Rob Siltanen' },
      { text: 'Não é porque as coisas são difíceis que não ousamos; é porque não ousamos que elas são difíceis.', author: 'Sêneca' },
      { text: 'O que não provoca minha morte faz com que eu fique mais forte.', author: 'Friedrich Nietzsche' },
      { text: 'A disciplina é a mãe do êxito.', author: 'Ésquilo' },
      { text: 'Age como se o que você faz fizesse diferença. Faz.', author: 'William James' },
      { text: 'Não deixe o medo decidir o seu futuro.', author: 'Shalane Flanagan' },
      { text: 'Você não precisa ser grande para começar, mas precisa começar para ser grande.', author: 'Zig Ziglar' },
      { text: 'Conhece-te a ti mesmo e conhecerás o universo e os deuses.', author: 'Sócrates' },
      { text: 'Transforme suas feridas em sabedoria.', author: 'Oprah Winfrey' },
      { text: 'Quem olha para fora sonha; quem olha para dentro desperta.', author: 'Carl Jung' },
      { text: 'A adversidade desperta em nós capacidades que estavam adormecidas.', author: 'Horácio' },
      { text: 'Suba o primeiro degrau com fé. Não é necessário ver toda a escada.', author: 'Martin Luther King Jr.' },
      { text: 'A mente é tudo. Você se torna aquilo que pensa.', author: 'Buda' },
      { text: 'Nunca é tarde demais para ser aquilo que sempre se desejou ser.', author: 'George Eliot' },
      { text: 'O fracasso é apenas a oportunidade de começar de novo, desta vez de forma mais inteligente.', author: 'Henry Ford' },
      { text: 'Viver é enfrentar um problema atrás do outro. O modo como você encara é que faz a diferença.', author: 'Benjamin Franklin' },
      { text: 'Não se pode ensinar nada a um homem; pode-se apenas ajudá-lo a encontrar a resposta dentro de si mesmo.', author: 'Galileu Galilei' },
      { text: 'Não confunda movimento com progresso.', author: 'Denzel Washington' },
      { text: 'A vida se encolhe ou se expande na medida da sua coragem.', author: 'Anaïs Nin' }
    ];
    function timeGreeting(){
      try { const h = new Date().getHours(); if (h>=5 && h<12) return 'Bom dia'; if (h>=12 && h<18) return 'Boa tarde'; return 'Boa noite'; } catch { return 'Olá'; }
    }
    // Emojis exibidos após o nome na saudação (variedade maior; corações aparecem o mínimo possível)
    const EMOJI_FACES = ['😊','😄','😀','😉','😎','🤗','🙂','😌','😇','😁','😃','🥳','😺'];
    const EMOJI_POS = ['👍','👊','👏','🙌','💪','🤝','🫶'];
    const EMOJI_STARS = ['✨','⭐️','🌟','💫','🌈'];
    const EMOJI_FUN = ['🔥','🎉','🚀','🏆','🎯','🧠','🛠️'];
    const EMOJI_HEARTS = ['❤️','💖','💗','💓','💕','💞'];
    // Offline-only: usando apenas QUOTES locais (sem rede)
    function nextEmoji(){
      try {
        const r = Math.random();
        // Pesos: Hearts ~0.5%, Faces ~32%, Positivos ~22%, Stars ~18%, Fun ~27.5%
        let arr;
        if (r < 0.005) arr = EMOJI_HEARTS;
        else if (r < 0.40) arr = EMOJI_FACES;
        else if (r < 0.62) arr = EMOJI_POS;
        else if (r < 0.80) arr = EMOJI_STARS;
        else arr = EMOJI_FUN;
        return arr[Math.floor(Math.random() * arr.length)] || '😊';
      } catch { return '😊'; }
    }
    // Conjunto curado de frases mais contextuais (PT-BR, serviço/campo)
    const CURATED_QUOTES = QUOTES_BASE;
    // Ajuste de emojis: aumenta frequência de 🦇, 🦥 e 🧟 ao lado do nome
    try {
      const __origNextEmoji = nextEmoji;
      nextEmoji = function(){
        try {
          if (Math.random() < 0.35) {
            const SPOOKY = ['🦇','🦥','🧟','🧟‍♂️','🧟‍♀️'];
            return SPOOKY[Math.floor(Math.random() * SPOOKY.length)] || __origNextEmoji();
          }
          return __origNextEmoji();
        } catch { return __origNextEmoji(); }
      };
    } catch {}
    // Geração leve de frases extras (offline) para ampliar a variedade sem pesar o bundle
    function buildOfflinePool(total){
      const norm = (s) => String(s||'').trim().replace(/\s+/g,' ');
      const map = new Map();
      const upsert = (item) => {
        if (!item) return;
        const obj = (typeof item === 'string') ? { text: item } : { text: item.text, author: item.author||item.credit };
        const key = norm(obj.text).toLowerCase();
        if (obj.text && !map.has(key)) map.set(key, { text: obj.text, author: obj.author, source: 'local' });
      };
      // 1) Adiciona as frases curadas (inclui as creditadas que você forneceu)
      try { (CURATED_QUOTES||[]).forEach(upsert); } catch {}
      // 2) Gera um pool extra offline para variedade
      const A1 = ['Coragem','Disciplina','Constância','Foco','Paciência','Ação','Aprendizado','Gentileza','Organização','Clareza','Calma','Humildade','Confiança','Gratidão'];
      const A2 = ['constrói','impulsiona','sustenta','transforma','ilumina','protege','acelera','simplifica','eleva','fortalece','orienta','destrava','nutre'];
      const A3 = ['resultados','o caminho','grandes mudanças','o futuro','seu hoje','o progresso','a jornada','sua entrega','seu potencial','suas escolhas','seus hábitos'];
      const A4 = ['todos os dias.','aos poucos.','no tempo certo.','com prática.','com presença.','com propósito.','com atenção.','com paciência.'];
      for (let i=0;i<A1.length && map.size<total+40;i++){
        upsert(`${A1[i]} ${A2[i % A2.length]} ${A3[i % A3.length]} ${A4[i % A4.length]}`);
      }
      const T1 = ['Comece','Avance','Foque','Ajuste','Siga','Respire','Insista','Aprenda','Simplifique','Organize'];
      const T2 = ['hoje','agora','um pouco','no essencial','com calma','com propósito','com atenção','com constância'];
      const T3 = ['e confie no processo.','e celebre o progresso.','e respeite seu ritmo.','e elimine o excesso.','e refine a direção.'];
      outer: for (let a of T1){ for (let b of T2){ for (let c of T3){ upsert(`${a} ${b} ${c}`); if (map.size>=total+40) break outer; } } }
      // 3) Remove similares (apenas entre frases sem autor), mantendo 1 por contexto
      const vals = Array.from(map.values());
      const isAlpha = (ch) => /[A-Za-zÀ-ÿ]/.test(ch);
      const tokenize = (s) => {
        const stop = new Set(['o','a','os','as','de','do','da','dos','das','e','é','para','por','com','que','em','um','uma','no','na','nos','nas','ao','aos','à','às','seu','sua','seus','suas','mais','menos','não','nem','ou','se','sem','sobre','como','já','até','também','pois','porque','mas','há','cada','todo','toda','todos','todas','são','entre','ser','estar','ter','vai','vem','foi']);
        const cleaned = String(s||'').toLowerCase().normalize('NFD').split('').filter(ch=> isAlpha(ch) || ch===' ' ).join('').replace(/\s+/g,' ');
        const toks = cleaned.split(' ').filter(w => w.length>=3 && !stop.has(w));
        return Array.from(new Set(toks));
      };
      const jacc = (a,b) => {
        const sa = new Set(a), sb = new Set(b);
        let inter = 0; for (const w of sa) if (sb.has(w)) inter++;
        const uni = sa.size + sb.size - inter; return uni ? inter/uni : 0;
      };
      const kept = [];
      const keptTok = [];
      const TH = 0.5; // mais agressivo: considera similares com menor interseção
      for (const it of vals){
        if (it.author){ kept.push(it); keptTok.push(null); continue; }
        const tk = tokenize(it.text);
        let similar = false;
        for (let i=0;i<kept.length;i++){
          if (kept[i] && !kept[i].author){
            const kt = keptTok[i] || tokenize(kept[i].text);
            keptTok[i] = kt;
            if (jacc(tk, kt) >= TH){ similar = true; break; }
          }
        }
        if (!similar){ kept.push(it); keptTok.push(tk); }
      }
      return kept.slice(0, total);
    }
    // Pool combinado (offline+online quando disponível)
    let __quotesPool = null;
    function getQuotesPool(){ if (!__quotesPool) __quotesPool = buildOfflinePool(200); return __quotesPool; }
    function shuffle(arr){ for (let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; } return arr; }
    function loadDeck(){ try { const raw=localStorage.getItem(DECK_KEY); const deck=JSON.parse(raw||'[]'); return Array.isArray(deck)?deck:null; } catch { return null; } }
    function saveDeck(deck){ try { localStorage.setItem(DECK_KEY, JSON.stringify(deck||[])); } catch {} }
    function ensureDeck(){
      const pool = getQuotesPool();
      // Cria uma lista de índices únicos por texto, garantindo 1 ocorrência por ciclo
      const seen = new Set();
      const uniqueIdx = [];
      for (let i=0;i<pool.length;i++){
        const key = String(pool[i]?.text || '').trim().toLowerCase();
        if (!key) continue;
        if (!seen.has(key)) { seen.add(key); uniqueIdx.push(i); }
      }
      const targetLen = uniqueIdx.length;
      let okLen = false; try { okLen = parseInt(localStorage.getItem(POOL_LEN_KEY)||'0',10) === targetLen; } catch {}
      let deck = okLen ? (loadDeck()||[]) : [];
      if (!Array.isArray(deck) || deck.length === 0){
        // Embaralha os índices únicos; um ciclo completo sem repetições
        deck = shuffle(uniqueIdx.slice());
        try { localStorage.setItem(POOL_LEN_KEY, String(targetLen)); } catch {}
        saveDeck(deck);
      }
      return deck;
    }
    // Busca online (limita a 100) e combina com 100 locais
    async function fetchOnlineQuotes(limit=100){
      try {
        const controller = new AbortController();
        const to = setTimeout(()=>controller.abort(), 3500);
        const resp = await fetch('https://type.fit/api/quotes', { signal: controller.signal });
        clearTimeout(to);
        if (!resp.ok) return [];
        const data = await resp.json();
        const list = (Array.isArray(data) ? data : [])
          .map(x => (x && (x.text||x.quote||'')).toString().trim())
          .filter(Boolean)
          .slice(0, limit)
          .map(t => ({ text: t, source: 'type.fit' }));
        return list;
      } catch { return []; }
    }
    async function ensurePoolOnlinePreferred(){
      // Força 100% frases motivacionais locais (sem buscar online)
      __quotesPool = buildOfflinePool(200);
      // Resetar deck quando o pool mudar
      try { localStorage.removeItem(DECK_KEY); localStorage.removeItem(POOL_LEN_KEY); } catch {}
    }
    function waitForAppModal(maxWaitMs){
      return new Promise((resolve) => {
        const start = Date.now();
        if (window.__appModal && typeof window.__appModal.showPrompt === 'function') return resolve(true);
        const iv = setInterval(() => {
          if (window.__appModal && typeof window.__appModal.showPrompt === 'function') { clearInterval(iv); resolve(true); }
          else if (Date.now() - start > (maxWaitMs||2000)) { clearInterval(iv); resolve(false); }
        }, 30);
      });
    }
    async function ensureUserName(){
      let name = (localStorage.getItem(NAME_KEY) || '').trim();
      if (!name){
        // Garante que o modal esteja pronto antes de solicitar o nome
        await waitForAppModal(2500);
        const msg = 'Qual é o seu nome? (Você poderá editar depois pelo menu lateral esquerdo)';
        const val = await (window.__appModal?.showPrompt(msg, { title: 'Bem-vindo', placeholder: 'Digite seu nome...', okText: 'Salvar', validate: (v)=> String(v||'').trim().length > 0, noCancel: true, okClass: 'btn-action btn-action--red', locked: true, requiredMsg: 'Este campo é obrigatório.' }) || Promise.resolve(null));
        if (val && String(val).trim()) { name = String(val).trim(); localStorage.setItem(NAME_KEY, name); }
      }
      return name;
    }
    function nextQuote(){
      try {
        const pool = getQuotesPool();
        let deck = ensureDeck();
        if (!deck || deck.length === 0) deck = ensureDeck();
        const idx = deck.shift();
        saveDeck(deck);
        return pool[idx] || pool[0];
      } catch { const p=getQuotesPool(); return p[0]; }
    }
    async function renderHomeGreeting(){
      try {
        const home = document.getElementById('view-home'); if (!home) return;
        const hero = home.querySelector('.hero'); if (!hero) return;
        const name = await ensureUserName();
        // monta pool preferindo online (com fallback)
        await ensurePoolOnlinePreferred();
        // Remover qualquer resíduo anterior (header/hero)
        try { const header=document.getElementById('topbar'); header?.classList.remove('topbar--with-extra'); header?.querySelector('#homeHeaderBox')?.remove(); } catch {}
        try { hero.querySelector('#homeHeroBox')?.remove(); } catch {}
        try { hero.querySelector('#homeGreeting')?.remove(); hero.querySelector('#homeQuoteBox')?.remove(); hero.querySelector('#homeQuoteDivider')?.remove(); } catch {}
        // Render: posiciona greeting acima do logo e mantém a quote onde estava (no final do hero)
        const greetEl = document.createElement('div'); greetEl.id='homeGreeting'; greetEl.className='home-greeting';
        const quoteBox = document.createElement('div'); quoteBox.id='homeQuoteBox'; quoteBox.className='home-quote';
        const anchor = hero.firstElementChild;
        if (anchor) {
          hero.insertBefore(greetEl, anchor);
        } else {
          hero.appendChild(greetEl);
        }
        // Quote permanece após os elementos existentes
        hero.appendChild(quoteBox);
        const caption = document.createElement('div'); caption.className='home-quote__caption'; caption.textContent='MOTIVAÇÃO DO DIA'; quoteBox.appendChild(caption);
        const quoteEl = document.createElement('div'); quoteEl.id='homeQuote'; quoteEl.className='home-quote__text'; quoteBox.appendChild(quoteEl);
        const creditEl = document.createElement('div'); creditEl.id='homeQuoteCredit'; creditEl.className='home-quote__credit'; quoteBox.appendChild(creditEl);
        const esc = (s) => String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
        const greet = timeGreeting() + (name ? (', ' + '<span class="hg-name">' + esc(name) + '</span> ' + nextEmoji()) : '');
        greetEl.innerHTML = greet;
        const q = nextQuote();
        if (q && typeof q === 'object') {
          quoteEl.textContent = q.text || '';
          const isOnline = (q.source && q.source !== 'local');
          if (isOnline) {
            creditEl.textContent = 'Fonte: type.fit (coletânea)';
            creditEl.style.display = 'block';
            try { if (quoteBox.__creditTO) clearTimeout(quoteBox.__creditTO); } catch {}
            quoteBox.__creditTO = setTimeout(() => { try { creditEl.style.display = 'none'; } catch {} }, 6000);
          } else if (q.author || q.credit) {
            creditEl.textContent = '— ' + (q.author || q.credit);
            creditEl.style.display = 'block';
          } else {
            creditEl.style.display = 'none';
          }
        } else {
          quoteEl.textContent = String(q||'');
          creditEl.style.display='none';
        }
        const afterDivider = document.createElement('div'); afterDivider.id='homeQuoteDivider'; afterDivider.className='menu-divider'; hero.appendChild(afterDivider);
      } catch {}
    }
    // Render inicial (home pode estar ativo na chegada)
    renderHomeGreeting();
    // Também renderiza quando voltar à Home pela SPA
    try { window.__renderHomeGreeting = renderHomeGreeting; } catch {}
  })();

  // Menu: Editar nome do usuário
  try {
    const NAME_KEY = 'unificado.userName';
    const edit = document.getElementById('menuEditarNome');
    if (edit) edit.addEventListener('click', async (e) => {
      e.preventDefault();
      const cur = (localStorage.getItem(NAME_KEY) || '').trim();
      const msg = 'Qual é o seu nome?';
      const val = await (window.__appModal?.showPrompt(msg, { title: 'Editar nome', placeholder: 'Digite seu nome...', okText: 'Salvar', cancelText: 'Cancelar', defaultValue: cur, validate: (v)=> String(v||'').trim().length > 0, okClass: 'btn-action btn-action--red' }) || Promise.resolve(null));
      if (val && String(val).trim()) {
        localStorage.setItem(NAME_KEY, String(val).trim());
        try { if (typeof window.__renderHomeGreeting === 'function') window.__renderHomeGreeting(); } catch {}
      }
      // Mantém o menu aberto após fechar o modal de edição de nome
      try { const overlay = document.getElementById('menuOverlay'); if (overlay) { overlay.classList.add('active'); overlay.removeAttribute('aria-hidden'); overlay.removeAttribute('inert'); } document.body.classList.add('no-scroll'); } catch {}
    });
  } catch {}

  // Botão voltar (telas internas)
  const btnBack = document.getElementById('btnBack');
  // handler definido dinamicamente pelo router

  // Menu lateral
  const overlay = document.getElementById('menuOverlay');
  const btnAbrirMenu = document.getElementById('btnAbrirMenu');
  const btnFecharMenu = document.getElementById('btnFecharMenu');
  let __menuEscHandler = null;
  const openMenu = () => {
    if (overlay) {
      overlay.classList.add('active');
      try { overlay.removeAttribute('aria-hidden'); overlay.removeAttribute('inert'); } catch {}
      try { btnFecharMenu && btnFecharMenu.focus(); } catch {}
    }
    document.body.classList.add('no-scroll');
    // ESC fecha o menu
    try {
      if (!__menuEscHandler) {
        __menuEscHandler = (e) => {
          if (e.key === 'Escape') {
            // Evita conflito com modal ativo
            try { const modal = document.getElementById('appModal'); if (modal && modal.classList.contains('active')) return; } catch {}
            e.preventDefault();
            closeMenu();
          }
        };
        document.addEventListener('keydown', __menuEscHandler, true);
      }
    } catch {}
  };
  const closeMenu = () => {
    if (overlay) {
      overlay.classList.remove('active');
      try { overlay.setAttribute('aria-hidden','true'); overlay.setAttribute('inert',''); } catch {}
    }
    try { btnAbrirMenu && btnAbrirMenu.focus(); } catch {}
    document.body.classList.remove('no-scroll');
    // Remove ESC handler
    try { if (__menuEscHandler) { document.removeEventListener('keydown', __menuEscHandler, true); __menuEscHandler = null; } } catch {}
  };
  if (btnAbrirMenu) btnAbrirMenu.addEventListener('click', openMenu);
  if (btnFecharMenu) btnFecharMenu.addEventListener('click', closeMenu);
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeMenu(); });
  // Assegura funcionalidade dos ramais (links tel:) mesmo dentro do overlay
  try {
    document.querySelectorAll('a.menu-item[href^="tel:"]').forEach((a) => {
      a.addEventListener('click', (ev) => {
        try { ev.stopPropagation(); } catch {}
        const href = a.getAttribute('href');
        try { closeMenu(); } catch {}
        // Navega para o discador após fechar o menu
        setTimeout(() => { try { window.location.href = href; } catch { location.href = href; } }, 60);
      });
    });
  } catch {}

  // Utilitário de modal genérico (alert/confirm/prompt customizados)
  (function initAppModal(){
    const modal = document.getElementById('appModal');
    const title = document.getElementById('appModalTitle');
    const body = document.getElementById('appModalBody');
    const footer = document.getElementById('appModalFooter');
    const btnClose = document.getElementById('appModalClose');
    const header = modal ? modal.querySelector('.modal-header') : null;
    if (!modal || !title || !body || !footer || !btnClose) return;
    let resolver = null;
    let rejecter = null;
    let lastFocus = null;
    let currentType = 'alert'; // 'alert' | 'confirm' | 'prompt'
    let currentLocked = false; // quando true, impede fechar por ESC/overlay/btn X
    function close(value){
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden','true');
      try { body.innerHTML = ''; footer.innerHTML=''; } catch {}
      if (resolver) { resolver(value); }
      resolver = rejecter = null;
      if (lastFocus) { try { lastFocus.focus(); } catch {} }
      lastFocus = null;
      document.removeEventListener('keydown', onKey);
    }
    function onKey(e){
      if (e.key === 'Escape') {
        if (currentLocked) return; // não fecha por ESC quando travado
        e.preventDefault();
        if (currentType === 'confirm' || currentType === 'prompt') close(false);
        else close(undefined);
      }
      if (e.key === 'Enter') {
        // Aciona o primeiro botão primário
        const primary = footer.querySelector('[data-primary="1"]');
        if (primary) { e.preventDefault(); primary.click(); }
      }
    }
    function open(opts){
      currentType = opts.type || 'alert';
      currentLocked = !!opts.locked;
      lastFocus = document.activeElement;
      title.textContent = opts.title || (opts.type==='confirm' ? 'Confirmar' : 'Aviso');
      body.innerHTML = typeof opts.html === 'string' ? opts.html : '';
      // Exibir sem header quando solicitado (ex.: alerts destacados)
      try {
        const noHeader = !!opts.noHeader;
        if (noHeader) {
          try { modal.classList.add('no-header'); } catch {}
          if (header) header.style.display = 'none';
          // garantir que o botão X fique dentro do body
          if (btnClose && body && btnClose.parentElement !== body) {
            try { body.insertBefore(btnClose, body.firstChild || null); } catch {}
          }
        } else {
          try { modal.classList.remove('no-header'); } catch {}
          if (header) header.style.display = '';
          // garantir que o botão X volte para o header
          if (btnClose && header && btnClose.parentElement !== header) {
            try { header.appendChild(btnClose); } catch {}
          }
        }
      } catch {}
      if (!opts.html) {
        const p = document.createElement('p');
        p.textContent = opts.message || '';
        body.appendChild(p);
      }
      footer.innerHTML = '';
      const buttons = opts.buttons || [];
      buttons.forEach((b, idx) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = b.className || (b.role==='cancel' ? 'btn-ghost' : 'btn-action');
        // Classe base para normalizar dimensões dos botões do modal
        try { btn.classList.add('modal-btn'); } catch {}
        btn.textContent = b.text || (b.role==='cancel' ? 'Cancelar' : 'OK');
        if (b.primary) btn.setAttribute('data-primary','1');
        if (!(currentType === 'prompt' && b.primary && opts && opts.handlePrimaryManually)) {
          btn.addEventListener('click', () => close(b.value));
        }
        footer.appendChild(btn);
        if (b.autofocus) setTimeout(()=>{ try { btn.focus(); } catch {} }, 0);
      });
      // Botão X: se travado, não permite fechar e esconde o botão
      if (currentLocked) {
        try { btnClose.style.visibility = 'hidden'; } catch {}
        btnClose.onclick = () => {};
      } else {
        try { btnClose.style.visibility = ''; } catch {}
        btnClose.onclick = () => {
          if (currentType === 'confirm' || currentType === 'prompt') close(false);
          else close(undefined);
        };
      }
      if (!modal.__overlayHandlerSet) {
        modal.addEventListener('click', (e)=>{ if (e.target === modal) { if (currentLocked) return; if (currentType === 'confirm' || currentType === 'prompt') close(false); else close(undefined); } });
        modal.__overlayHandlerSet = true;
      }
      modal.classList.add('active');
      modal.removeAttribute('aria-hidden');
      document.addEventListener('keydown', onKey);
      // Efeito de tremor opcional para chamar atenção
      try {
        if (opts && opts.shake) {
          const box = modal.querySelector('.modal-box');
          if (box) {
            box.classList.add('modal-shake');
            setTimeout(() => { try { box.classList.remove('modal-shake'); } catch {} }, 360);
          }
        }
      } catch {}
      const primary = footer.querySelector('[data-primary="1"]') || footer.querySelector('button');
      if (primary) setTimeout(()=>{ try { primary.focus(); } catch {} }, 0);
    }
    function showAlert(message, opts){
      return new Promise((resolve) => {
        resolver = resolve; rejecter = null;
        open({
          type: 'alert',
          title: opts?.title || 'Aviso',
          message,
          html: opts?.html,
          noHeader: opts?.noHeader,
          shake: opts?.shake,
          buttons: [ { text: opts?.okText || 'OK', value: true, primary: true, autofocus: true, className: (opts?.className || 'btn-action btn-action--red') } ]
        });
      });
    }
    function showConfirm(message, opts){
      return new Promise((resolve) => {
        resolver = resolve; rejecter = null;
        open({
          type: 'confirm',
          title: opts?.title || 'Confirmar',
          message,
          buttons: [
            { text: opts?.cancelText || 'Cancelar', value: false, role: 'cancel', className: 'btn-ghost' },
            { text: opts?.okText || 'Confirmar', value: true, primary: true, autofocus: true, className: opts?.danger ? 'btn-action btn-action--red' : 'btn-action' }
          ]
        });
      });
    }
    function showPrompt(message, opts){
      return new Promise((resolve) => {
        resolver = resolve; rejecter = null;
        const inputId = 'appModalPromptInput';
        const placeholder = opts?.placeholder || '';
        const def = opts?.defaultValue || '';
        const req = opts?.requiredMsg ? `<div class="form-hint" style="color:#dc2626">${opts.requiredMsg}</div>` : '';
        const __msgTxt = String(message||'');
        let __labelText = __msgTxt;
        let __subNote = '';
        try {
          const m = __msgTxt.match(/\((.*?)\)\s*$/);
          if (m) {
            __labelText = __msgTxt.replace(/\s*\(.*\)\s*$/, '');
            __subNote = `<div class="form-subnote">(${m[1]})</div>`;
          } else if (opts && opts.subNoteHtml) {
            __subNote = `<div class="form-subnote">${opts.subNoteHtml}</div>`;
          }
        } catch {}
        const html = `<div class="form-block"><label class="form-label" for="${inputId}">${__labelText}</label>${__subNote}<input id="${inputId}" class="form-input" type="text" placeholder="${placeholder}" value="${def}">${req}</div>`;
        open({
          type: 'prompt',
          title: opts?.title || 'Digite um valor',
          html,
          handlePrimaryManually: true,
          locked: !!(opts && opts.locked),
          buttons: [
            ...(opts?.noCancel ? [] : [{ text: opts?.cancelText || 'Cancelar', value: null, role: 'cancel', className: 'btn-ghost' }]),
            { text: opts?.okText || 'Salvar', value: '__OK__', primary: true, autofocus: true, className: (opts?.okClass || 'btn-action btn-action--red') }
          ]
        });
        setTimeout(()=>{
          const input = document.getElementById(inputId);
          if (input) {
            try { input.focus(); input.select(); } catch {}
          }
          // intercepta clique do botão OK para validar e retornar o texto
          const primary = footer.querySelector('[data-primary="1"]');
          if (primary) primary.addEventListener('click', (e)=>{
            const v = input ? String(input.value||'') : '';
            if (opts?.validate && !opts.validate(v)) { try { e.preventDefault(); e.stopPropagation(); } catch {} return; }
            try { e.preventDefault(); e.stopPropagation(); } catch {}
            close(v);
          }, { once: true });
        }, 0);
      });
    }
    window.__appModal = { showAlert, showConfirm, showPrompt };
  })();

  // Nossos Planos (modal)
  const planosBtn = document.getElementById('menuPlanos');
  const planosModal = document.getElementById('planosModal');
  const planosClose = document.getElementById('btnFecharPlanos');
  const plansContent = document.getElementById('plansContent');
  const PLANOS_DATA = {
    internet: {
      resid: [
        { t: '600 Mega', d: 'Wi-Fi de última geração', p: 'R$ 99,90/mês' },
        { t: '800 Mega', d: 'Wi-Fi de última geração', p: 'R$ 129,90/mês' },
        { t: '1000 Mega', d: 'Wi-Fi de última geração', p: 'R$ 149,90/mês' },
        { t: 'Plano ETECC Gamer - 1000 Mega', d: 'Inclui Exitlag + 2 Pontos Cabeados', p: 'R$ 169,90/mês' }
      ],
      emp: [
        { t: '600 Mega Empresarial', feats: ['Internet Fibra Óptica', 'Instalação Grátis', 'Wi-Fi Premium', 'Atendimento 24h'] },
        { t: '800 Mega Empresarial', feats: ['Internet Fibra Óptica', 'Instalação Grátis', 'Wi-Fi Premium', 'Atendimento 24h'] },
        { t: 'Link Dedicado', feats: ['Internet Fibra Óptica', 'Atendimento 24h', 'Valores sob consulta com setor comercial'] }
      ]
    },
    chips: {
      emp: [
        { t: '1 Giga', d: 'Empresas', p: 'R$ 29,90/mês' },
        { t: '3 Giga + WhatsApp livre', d: 'Empresas', p: 'R$ 34,90/mês' },
        { t: '5 Giga + WhatsApp livre', d: 'Empresas', p: 'R$ 39,90/mês' }
      ],
      pf: [
        { t: '10 Giga + WhatsApp livre', d: 'Pessoa Física', p: 'R$ 49,90/mês' },
        { t: '20 Giga + WhatsApp livre', d: 'Pessoa Física', p: 'R$ 69,90/mês' },
        { t: '35 Giga + WhatsApp + Waze livre', d: 'Pessoa Física', p: 'R$ 84,90/mês' },
        { t: '45 Giga + WhatsApp + Waze livre', d: 'Pessoa Física', p: 'R$ 94,90/mês' },
        { t: '55 Giga + WhatsApp + Waze livre', d: 'Pessoa Física', p: 'R$ 114,90/mês' }
      ]
    },
    combos: {
      resid: [
        { t: 'BÁSICO', feats: ['Internet Fibra 600 Mega', 'TV Streaming (+50 canais e +650 filmes)', '4 Telas simultâneas'], p: 'R$ 139,90/mês' },
        { t: 'ESSENCIAL', feats: ['Internet Fibra 1000 Mega', 'TV Streaming (+70 canais e +1.300 filmes)', '4 Telas simultâneas', 'Inclui plano básico'], p: 'R$ 179,90/mês' },
        { t: 'TURBO SKY+', feats: ['Internet Fibra 1000 Mega', 'TV Streaming (+80 canais)', 'Telefonia fixa', '3 Telas simultâneas'], p: 'R$ 259,90/mês' },
        { t: 'FAMÍLIA SKY+', feats: ['Internet Fibra 1000 Mega', 'TV Streaming (+80 canais)', 'Telefonia fixa', '3 Telas simultâneas', 'Inclui Telecine'], p: 'R$ 299,90/mês' },
        { t: 'ULTRA SKY+', feats: ['Internet Fibra 1000 Mega', 'TV Streaming (+80 canais)', 'Telefonia fixa', '3 Telas simultâneas', 'Inclui Premiere'], p: 'R$ 319,90/mês' }
      ],
      emp: [
        { t: 'START (1000 Mega)', feats: ['Internet Fibra Óptica', 'Televisão Streaming', 'Telefonia Fixa', '1 Tela simultânea'], p: 'R$ 209,90/mês' },
        { t: 'SELECT (1000 Mega)', feats: ['Internet Fibra Óptica', 'Televisão Streaming', 'Telefonia Fixa', '3 Telas simultâneas'], p: 'R$ 289,90/mês' },
        { t: 'PREMIUM (1000 Mega)', feats: ['Internet Fibra Óptica', 'Televisão Streaming', 'Telefonia Fixa', '3 Telas simultâneas'], p: 'R$ 349,90/mês' }
      ]
    }
  };

  function renderPlans(tab){
    if (!plansContent) return;
    plansContent.innerHTML = '';
    if (tab === 'internet'){
      const addSection = (title, arr, opts={}) => {
        const h = document.createElement('div'); h.className='plan-section-title'; h.textContent = title; plansContent.appendChild(h);
        arr.forEach(item => {
          const el = document.createElement('div'); el.className='plan-card';
          let left = '<div><div class="plan-card__title">'+item.t+'</div>';
          if (item.d) left += '<div class="plan-card__desc">'+item.d+'</div>';
          if (item.feats) left += '<div class="plan-feats">'+item.feats.map(f => '<span><i class="fa-solid fa-check"></i>'+f+'</span>').join('')+'</div>';
          left += '</div>';
          let right = item.p ? '<div class="plan-card__price">'+item.p+'</div>' : '';
          el.innerHTML = left + right;
          plansContent.appendChild(el);
        });
      };
      addSection('Internet Residencial', PLANOS_DATA.internet.resid);
      addSection('Internet Empresarial', PLANOS_DATA.internet.emp);
    } else if (tab === 'chips'){
      const addSection = (title, arr) => {
        const h = document.createElement('div'); h.className='plan-section-title'; h.textContent = title; plansContent.appendChild(h);
        arr.forEach(item => {
          const el = document.createElement('div'); el.className='plan-card';
          el.innerHTML = '<div><div class="plan-card__title">'+item.t+'</div>'+
            '<div class="plan-card__desc">'+item.d+'</div></div>'+
            '<div class="plan-card__price">'+item.p+'</div>';
          plansContent.appendChild(el);
        });
      };
      addSection('Chips para Empresas', PLANOS_DATA.chips.emp);
      addSection('Chips para Pessoa Física', PLANOS_DATA.chips.pf);
    } else if (tab === 'combos'){
      const addSection = (title, arr) => {
        const h = document.createElement('div'); h.className='plan-section-title'; h.textContent = title; plansContent.appendChild(h);
        arr.forEach(c => {
          const el = document.createElement('div'); el.className='plan-card';
          const feats = (c.feats||[]).map(f => '<span><i class="fa-solid fa-check"></i>'+f+'</span>').join('');
          el.innerHTML = '<div><div class="plan-card__title">'+c.t+'</div>'+
            '<div class="plan-feats">'+feats+'</div></div>'+
            '<div class="plan-card__price">'+c.p+'</div>';
          plansContent.appendChild(el);
        });
      };
      addSection('Combos Residenciais', PLANOS_DATA.combos.resid);
      addSection('Combos para Empresas', PLANOS_DATA.combos.emp);
    }
  }

  let __plansEscHandler = null;
  function openPlans(){
    if (!planosModal) return;
    planosModal.classList.add('active');
    try { planosModal.removeAttribute('aria-hidden'); planosModal.removeAttribute('inert'); } catch {}
    document.body.classList.add('no-scroll');
    renderPlans('internet');
    try { const bodyEl = planosModal.querySelector('.modal-body'); if (bodyEl) bodyEl.scrollTop = 0; } catch {}
    // marca a aba inicial como ativa e foca
    const tabs = Array.from(document.querySelectorAll('.plan-tab'));
    tabs.forEach(b=>b.classList.toggle('is-active', b.getAttribute('data-tab')==='internet'));
    try { if (tabs.length) tabs[0].focus(); } catch {}
    // ESC fecha o modal de planos
    try {
      if (!__plansEscHandler) {
        __plansEscHandler = (e) => {
          if (e.key === 'Escape') { e.preventDefault(); closePlans(); }
        };
        document.addEventListener('keydown', __plansEscHandler, true);
      }
    } catch {}
  }
  function closePlans(){
    if (!planosModal) return;
    planosModal.classList.remove('active');
    try { planosModal.setAttribute('aria-hidden','true'); planosModal.setAttribute('inert',''); } catch {}
    // remove ESC handler
    try { if (__plansEscHandler) { document.removeEventListener('keydown', __plansEscHandler, true); __plansEscHandler = null; } } catch {}
    // Volta para o menu aberto
    openMenu();
  }
  if (planosBtn) planosBtn.addEventListener('click', (e)=>{ e.preventDefault(); closeMenu(); setTimeout(openPlans, 10); });
  if (planosClose) planosClose.addEventListener('click', closePlans);
  if (planosModal) planosModal.addEventListener('click', (e)=>{ if (e.target === planosModal) closePlans(); });
  document.querySelectorAll('.plan-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.plan-tab').forEach(b=>b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderPlans(btn.getAttribute('data-tab'));
      try {
        const bodyEl = planosModal && planosModal.querySelector('.modal-body');
        if (bodyEl) { bodyEl.scrollTop = 0; }
      } catch {}
    });
    // Ajuste de formatação na cópia: adiciona 'dBm' ao campo 'sinal_fibra'
    try {
      const __copyBtn2 = document.getElementById('btnCopiarForm');
      if (__copyBtn2) __copyBtn2.addEventListener('click', function(){
        try {
          const cur = getFormState(formId);
          const snap = { ...cur };
          if (Object.prototype.hasOwnProperty.call(snap, 'sinal_fibra')) {
            snap.sinal_fibra = (typeof formatSinalFibraForCopy === 'function') ? formatSinalFibraForCopy(snap.sinal_fibra) : snap.sinal_fibra;
          }
          localStorage.setItem(formStateKey(formId), JSON.stringify(snap));
        } catch {}
      });
    } catch {}
  });
  // ===================== Atividades Recentes (V2 - refeito do zero) =====================
  (function initRecentV2(){
    const lista = document.getElementById('listaAtividades');
    const empty = document.getElementById('recentEmpty');
    if (!lista || !empty) return;

    const KEY = 'unificado.v2.history';
    const SNAP = 'unificado.v2.snap.';

    const load = () => { try { return JSON.parse(localStorage.getItem(KEY)||'[]'); } catch { return []; } };
    const save = (arr) => { try { localStorage.setItem(KEY, JSON.stringify(arr||[])); } catch {} };
    const snapKey = (id) => SNAP + id;
    const saveSnap = (id, data) => { try { localStorage.setItem(snapKey(id), JSON.stringify(data||{})); } catch {} };
    const getSnap = (id) => { try { return JSON.parse(localStorage.getItem(snapKey(id))||'{}'); } catch { return {}; } };
    const removeSnap = (id) => { try { localStorage.removeItem(snapKey(id)); } catch {} };

    const nowId = () => Date.now();

    const MAX_HISTORY = 50;
    function enforceLimit(arr){
      try {
        while ((arr||[]).length > MAX_HISTORY) {
          const removed = arr.shift();
          if (removed && removed.id) removeSnap(removed.id);
        }
      } catch {}
      return arr;
    }
    function addFinal(item, snapshot){
      const arr = load();
      const id = nowId();
      arr.push({ id, ...item, isDraft:false, data: Date.now() });
      enforceLimit(arr);
      save(arr); saveSnap(id, snapshot||{});
      render();
      return id;
    }

    function upsertDraft(formId, state){
      try {
        const arr = load();
        const equipe = localStorage.getItem('unificado.selectedTeam') || '';
        const def = (typeof FORMS_CATALOG!=='undefined' && FORMS_CATALOG) ? FORMS_CATALOG[formId] : null;
        const cliente = state?.clienteNome || state?.cliente || '';
        const entry = { isDraft:true, formId, cliente, equipe, formulario: def?.titulo || 'Formulário', data: Date.now() };
        // Política: 1 rascunho por formId (mantém o mais recente)
        let idx = arr.findIndex(i => i && i.isDraft && i.formId === formId);
        if (idx >= 0) {
          const cur = arr[idx];
          arr[idx] = { ...cur, ...entry }; // preserva id
          saveSnap(cur.id, state||{});
        } else {
          // remove rascunho genérico antigo (se houver)
          const anyDraft = arr.findIndex(i => i && i.isDraft);
          if (anyDraft >= 0) { removeSnap(arr[anyDraft].id); arr.splice(anyDraft,1); }
          const id = nowId();
          arr.push({ id, ...entry });
          saveSnap(id, state||{});
        }
        enforceLimit(arr); save(arr); render();
      } catch {}
    }

    function clearAll(){
      const arr = load();
      arr.forEach(i => removeSnap(i.id));
      save([]); render();
    }

    function render(){
      lista.innerHTML = '';
      const panel = document.querySelector('.recent__panel');
      if (panel) panel.classList.remove('fade-on');
      let arr = load();
      const q = (document.getElementById('fltBusca')?.value || '').toLowerCase();
      const equipeF = document.getElementById('fltEquipe')?.value || 'todos';
      const ord = document.getElementById('fltOrdenacao')?.value || 'desc';
      if (q) arr = arr.filter(i => (i.cliente||'').toLowerCase().includes(q));
      if (equipeF !== 'todos') arr = arr.filter(i => (i.equipe||'') === equipeF);
      arr.sort((a,b) => ord === 'asc' ? (a.data||0) - (b.data||0) : (b.data||0) - (a.data||0));
      if (!arr.length) { empty.style.display = 'block'; if (panel) panel.classList.remove('fade-on'); return; }
      empty.style.display = 'none';
      arr.forEach(a => {
        const li = document.createElement('li');
        li.className = 'recent__item';
        const equipeChip = (a.equipe||'') === 'moto' ? '<span class="chip-mini chip--moto">Moto</span>' : (a.equipe==='carro' ? '<span class="chip-mini chip--carro">Carro</span>' : '');
        const dt = new Date(a.data||Date.now());
        const rightText = dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        const statusChip = a.isDraft
          ? '<span class="chip-mini chip--draft"><i class="fa-solid fa-pen"></i> Rascunho</span>'
          : ((a.equipe||'')==='moto'
              ? '<span class="chip-mini chip--final"><i class="fa-solid fa-motorcycle"></i> <i class="fa-solid fa-check"></i> Finalizado</span>'
              : '<span class="chip-mini chip--final"><i class="fa-solid fa-car"></i> <i class="fa-solid fa-check"></i> Finalizado</span>');
        li.innerHTML = `<span style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
            <i class="fa-regular fa-file-lines" style="color:var(--brand);"></i>
            <strong>${a.cliente || 'Cliente'}</strong>
            ${equipeChip}
            ${statusChip}
            <span style="color:var(--muted);font-size:12px;">${a.conclusao || a.formulario || ''}</span>
          </span>
          <span style="color:var(--muted);font-size:12px;white-space:nowrap;">${rightText}</span>`;
        li.addEventListener('click', () => {
          try {
            if (a.formId) {
              const snap = getSnap(a.id);
              window.__pendingFormPrefill = { formId: a.formId, state: snap };
              location.hash = '/form/' + a.formId;
            }
          } catch {}
        });
        lista.appendChild(li);
      });
      // Ativa degradê somente quando houver pelo menos 3 itens
      try { if (panel) panel.classList.toggle('fade-on', (arr.length || 0) >= 3); } catch {}
    }

    // Controles de filtro
    const filtersWrap = document.getElementById('recentFilters');
    const setFiltersExpand = (which) => {
      if (!filtersWrap) return;
      filtersWrap.classList.remove('expand-1','expand-2','expand-3');
      if (which) filtersWrap.classList.add(which);
    };
    const busca = document.getElementById('fltBusca');
    const equipeSel = document.getElementById('fltEquipe');
    const ordSel = document.getElementById('fltOrdenacao');
    const setupSmoothSelect = (sel, expandClass) => {
      if (!sel) return;
      const wrap = filtersWrap;
      sel.addEventListener('focus', () => setFiltersExpand(expandClass));
      sel.addEventListener('blur', () => setFiltersExpand(''));
      function primeExpand(){ if (!wrap) return; wrap.classList.add('no-transition'); setFiltersExpand(expandClass); setTimeout(()=>wrap.classList.remove('no-transition'), 220); }
      sel.addEventListener('mousedown', primeExpand);
      sel.addEventListener('touchstart', primeExpand, { passive: true });
    };
    if (busca) { busca.addEventListener('focus', () => setFiltersExpand('expand-1')); busca.addEventListener('blur', () => setFiltersExpand('')); }
    setupSmoothSelect(equipeSel, 'expand-2');
    setupSmoothSelect(ordSel, 'expand-3');
    ['fltBusca','fltEquipe','fltOrdenacao'].forEach(id => {
      const el = document.getElementById(id); if (!el) return; const evt = el.tagName === 'SELECT' ? 'change' : 'input'; el.addEventListener(evt, render);
    });
    const btnLimpar = document.getElementById('btnLimparFiltros');
    if (btnLimpar) btnLimpar.addEventListener('click', () => { const b=document.getElementById('fltBusca'); const e=document.getElementById('fltEquipe'); const o=document.getElementById('fltOrdenacao'); if (b) b.value=''; if (e) e.value='todos'; if (o) o.value='desc'; setFiltersExpand(''); render(); });

    // API pública (v2) + compatibilidade
    window.__clearHistory = clearAll;
    window.__addHistoryWithSnapshot = (item, snapshot) => addFinal(item, snapshot);
    window.__upsertDraftHistory = (formId, state) => upsertDraft(formId, state);
    // Override: rascunhos independentes por formulário e nome do usuário no Comunicado de Ausência
    try {
      if (!window.__upsertDraftHistoryPatched){
        window.__upsertDraftHistoryPatched = true;
        window.__upsertDraftHistory = function(formId, state){
          try {
            const arr = load();
            const equipe = (formId === 'comunicado-ausencia') ? 'especial' : (localStorage.getItem('unificado.selectedTeam') || '');
            const def = (typeof FORMS_CATALOG!=='undefined' && FORMS_CATALOG) ? FORMS_CATALOG[formId] : null;
            let cliente = state?.clienteNome || state?.cliente || '';
            try { if (formId === 'comunicado-ausencia') cliente = (localStorage.getItem('unificado.userName')||'').trim() || 'Usuário'; } catch {}
            const entry = { isDraft:true, formId, cliente, equipe, formulario: def?.titulo || 'Formulário', data: Date.now() };
            const idx = arr.findIndex(i => i && i.isDraft && i.formId === formId);
            if (idx >= 0){
              const cur = arr[idx];
              arr[idx] = { ...cur, ...entry };
              saveSnap(cur.id, state||{});
            } else {
              const id = nowId();
              arr.push({ id, ...entry });
              saveSnap(id, state||{});
            }
            enforceLimit(arr); save(arr); render();
          } catch {}
        };
      }
    } catch {}

    // Render inicial
    render();
  })();
  // ===================== /Atividades Recentes (V2) =====================

  // Grid (placeholder vazio)

  // Chip da equipe na tela de conclusões
  const chip = document.getElementById('chipEquipe');
  const chipIcon = document.getElementById('chipIcon');
  const chipText = document.getElementById('chipText');
  if (chip && chipIcon && chipText) {
    const team = localStorage.getItem('unificado.selectedTeam');
    if (team) {
      chip.hidden = false;
      if (team === 'moto') { chipIcon.classList.add('fa-motorcycle'); chipText.textContent = 'Equipe Moto'; }
      else if (team === 'carro') { chipIcon.classList.add('fa-car'); chipText.textContent = 'Equipe Carro'; }
      else { chip.hidden = true; }
    }
  }

  // Helpers para garantir equipe e renderização em página standalone (tela-conclusoes.html)
  function __ensureSelectedTeamFromContext(){
    try {
      let team = localStorage.getItem('unificado.selectedTeam');
      if (!team) {
        const q = new URLSearchParams(location.search||'');
        const t = (q.get('team')||'').toLowerCase();
        if (t === 'moto' || t === 'carro') team = t; else team = 'moto';
        localStorage.setItem('unificado.selectedTeam', team);
      }
      try { if (typeof updateChipFromStorage === 'function') updateChipFromStorage(); } catch {}
      return team;
    } catch { return 'moto'; }
  }
// standalone conclusões removido (página separada não utilizada)

  // Contagem dos cards por localStorage
  const defaultCounts = { moto: 0, carro: 0 };
  let storedCounts = JSON.parse(localStorage.getItem('unificado.serviceConclusionsCount') || 'null');
  if (!storedCounts) {
    const legacy = JSON.parse(localStorage.getItem('unificado.formCounts') || 'null');
    storedCounts = legacy || defaultCounts;
    localStorage.setItem('unificado.serviceConclusionsCount', JSON.stringify(storedCounts));
  }
  const setCountText = (id, n) => { const el = document.getElementById(id); if (el) el.textContent = Number(n || 0); };
  setCountText('count-moto', storedCounts.moto);
  setCountText('count-carro', storedCounts.carro);
  window.__setConclusionCounts = (counts) => {
    const merged = { ...storedCounts, ...counts };
    localStorage.setItem('unificado.serviceConclusionsCount', JSON.stringify(merged));
    setCountText('count-moto', merged.moto);
    setCountText('count-carro', merged.carro);
  };

  // Conta dinamicamente a quantidade de formulários por equipe a partir do catálogo
  function __updateHomeCountsFromCatalog(){
    try {
      const cat = (typeof FORMS_CATALOG !== 'undefined') ? FORMS_CATALOG : null;
      if (!cat) return;
      const entries = Object.entries(cat || {});
      const counts = { moto: 0, carro: 0 };
      entries.forEach(([id, def]) => {
        try {
          if (id === 'comunicado-ausencia') return; // não conta este formulário exclusivo
          if (!def || !def.equipe) return;
          if (def.equipe === 'moto') counts.moto++;
          else if (def.equipe === 'carro') counts.carro++;
        } catch {}
      });
      localStorage.setItem('unificado.serviceConclusionsCount', JSON.stringify(counts));
      setCountText('count-moto', counts.moto);
      setCountText('count-carro', counts.carro);
    } catch {}
  }

  // ================= Draft Refactor (garante 100% dos campos no rascunho) =================
  // Reimplementa a coleta e a persistência de rascunho sempre a partir do DOM atual.
  (function refactorDraftSystem(){
    function snapshot(container){
      const snap = {};
      try {
        const all = container.querySelectorAll('input, select, textarea');
        all.forEach((el) => {
          const key = el.name || el.id; if (!key) return;
          const tag = (el.tagName||'').toUpperCase();
          if (tag === 'SELECT') { snap[key] = el.value; return; }
          const t = (el.type||'').toLowerCase();
          if (t === 'radio') { if (el.checked) snap[key] = el.value; if (!(key in snap)) snap[key] = snap[key] || ''; return; }
          if (t === 'checkbox') { snap[key] = !!el.checked; return; }
          snap[key] = el.value;
        });
      } catch {}
      return snap;
    }

    function saveDraft(formId, container){
      try {
        const st = snapshot(container);
        if (typeof window.__upsertDraftHistory === 'function') window.__upsertDraftHistory(formId, st);
      } catch {}
    }

    // Substitui a função existente por uma baseada em snapshot completo + debounce + observer
    const newWire = function(formId, container){
      try {
        if (!container) return;
        if (container.__persistHandler) {
          container.removeEventListener('change', container.__persistHandler, true);
          container.removeEventListener('input', container.__persistHandler, true);
        }
        if (container.__draftObserver) { try { container.__draftObserver.disconnect(); } catch {} container.__draftObserver=null; }
      } catch {}

      const schedule = () => {
        try { clearTimeout(container.__draftSaveTO); } catch {}
        container.__draftSaveTO = setTimeout(() => saveDraft(formId, container), 400);
      };

      const handler = (e) => {
        const t = e.target; if (!t) return;
        const name = t.name || t.id; if (name) {
          let val; if (t.type==='radio'){ if(!t.checked) return; val=t.value; }
          else if (t.type==='checkbox'){ val=!!t.checked; } else { val=t.value; }
          try { const cur = (typeof getFormState==='function') ? getFormState(formId) : {}; if (typeof setFormState==='function') setFormState(formId, { [name]: val }); else { try { window.FORM_TMP_STATE=formId?window.FORM_TMP_STATE||{}:window.FORM_TMP_STATE; } catch {} } } catch {}
        }
        schedule();
        try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
      };
      container.__persistHandler = handler;
      container.addEventListener('change', handler, true);
      container.addEventListener('input', handler, true);

      try {
        const obs = new MutationObserver(() => schedule());
        obs.observe(container, { childList:true, subtree:true, attributes:true });
        container.__draftObserver = obs;
      } catch {}

      // Snapshot inicial
      saveDraft(formId, container);

      // Salvamento ao fechar/atualizar
      if (!window.__globalDraftGuard) {
        window.addEventListener('beforeunload', () => {
          try { const fc=document.getElementById('formContainer'); if (fc && fc.__formId) saveDraft(fc.__formId, fc); } catch {}
        });
        window.__globalDraftGuard = true;
      }
    };

    // Aplica substituições
    try { window.wireFormPersistence = newWire; } catch { }
    try { wireFormPersistence = newWire; } catch { }
    try { window.collectCurrentFormState = snapshot; } catch { }
  })();
  // ================= /Draft Refactor =================
  window.__setFormCounts = window.__setConclusionCounts;
  document.querySelectorAll('.card--team').forEach((card) => {
    card.addEventListener('click', (e) => {
      // aplica estado ativo e armazena equipe
      const team = card.getAttribute('data-team');
      if (!team) return;
      e.preventDefault();
      document.querySelectorAll('.card--team').forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');
      localStorage.setItem('unificado.selectedTeam', team);
      const href = card.getAttribute('href');
      setTimeout(() => { location.hash = href.replace('#',''); }, 220);
    });
  });
  // Atualiza contadores dos cards na Home (logo após carregar)
  try { if (typeof __updateHomeCountsFromCatalog === 'function') __updateHomeCountsFromCatalog(); } catch {}
});
function setTopbarMode(internal){
    const topbar = document.getElementById('topbar');
    const backEl = document.getElementById('btnBack');
    const brand = document.querySelector('.brand');
    if (!topbar || !backEl || !brand) return;
    const first = brand.getBoundingClientRect();
    if (internal) { topbar.classList.add('topbar--center'); backEl.style.display=''; }
    else { topbar.classList.remove('topbar--center'); backEl.style.display='none'; }
    const last = brand.getBoundingClientRect();
    const dx = first.left - last.left;
    brand.style.transition = 'none';
    brand.style.transform = `translateX(${dx}px)`;
    requestAnimationFrame(() => {
      brand.style.transition = 'transform .24s ease';
      brand.style.transform = 'translateX(0)';
      brand.addEventListener('transitionend', () => { brand.style.transition=''; brand.style.transform=''; }, { once: true });
    });
  }
  function scrollToTop(){
    try {
      const sc = (document.scrollingElement || document.documentElement);
      sc.scrollTo({ top: 0, behavior: 'smooth' });
    } catch(e){ try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(_) {} }
    const content = document.querySelector('.content');
    if (content) { try { content.scrollTo({ top: 0, behavior: 'smooth' }); } catch(_) {} }
  }
  function scrollToCenter(el){
    try {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const sc = (document.scrollingElement || document.documentElement);
      const current = sc.scrollTop || 0;
      const offset = rect.top + current - Math.max(0, (window.innerHeight/2 - Math.min(rect.height, window.innerHeight)/2));
      sc.scrollTo({ top: Math.max(0, offset), behavior: 'smooth' });
    } catch {}
  }
  function switchView(next){
    const active = document.querySelector('.view.is-active');
    if (active === next) return;
    const showNext = () => {
      if (!next) return;
      scrollToTop();
      next.classList.add('pre-active');
      requestAnimationFrame(() => {
        next.classList.add('is-active');
        next.classList.remove('pre-active');
      });
    };
    if (active){
      active.classList.add('is-leaving');
      active.classList.remove('is-active');
      // aguarda a saída para evitar interferência visual
      setTimeout(() => { active.classList.remove('is-leaving'); showNext(); }, 160);
    } else {
      showNext();
    }
  }
  function updateChipFromStorage(){
    const chip = document.getElementById('chipEquipe');
    const chipIcon = document.getElementById('chipIcon');
    const chipText = document.getElementById('chipText');
    if (!chip || !chipIcon || !chipText) return;
    const team = localStorage.getItem('unificado.selectedTeam');
    if (team === 'moto') { chip.hidden = false; chipIcon.className='fa-solid fa-motorcycle'; chipText.textContent='Equipe Moto'; }
    else if (team === 'carro') { chip.hidden = false; chipIcon.className='fa-solid fa-car'; chipText.textContent='Equipe Carro'; }
    else { chip.hidden = true; }
  }
  // Catálogo de formulários para navegação SPA
  /*
   * Catálogo de formulários (SPA)
   * Como adicionar um novo formulário:
   * 1) Crie uma entrada abaixo com um id único (ex.: 'instalacao-fibra').
   * 2) Defina equipe, titulo, descricao e, opcionalmente, icon/badge.
   * 3) Implemente render(root) inserindo o HTML do formulário no contêiner root.
   * 4) A listagem (renderForms) usa este catélogo automaticamente e navega via #/form/:id.
   */
  const FORMS_CATALOG = {
    'comunicado-ausencia': {
      equipe: 'especial',
      titulo: 'Comunicado de Ausência',
      descricao: 'Informe data, horário e motivo; selecione o retorno.',
      icon: 'fa-calendar-xmark',
      badge: 'teal',
      atualizadoEm: '19/09/2025 00:00',
      render: (root) => {
        root.innerHTML = ''+
        '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-calendar-xmark"></i> COMUNICADO DE AUSÊNCIA</div>\n'
        + '    <div class="form-subtitle">Preencha e copie o comunicado</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Exemplo de formato:</label>\n'
        + '    <div class="form-hint" data-ctx="exemplo-ausencia" style="white-space: pre-line; line-height:1.4;">' +
               'Boa tarde, Venho, por meio deste, informar que no dia [data], no horário das [horário] / o dia inteiro, precisarei me ausentar para [motivo].\n\n' +
               '( ) Iniciarei a rota mais tarde.\n' +
               '(✔) Retornarei para finalizar o expediente.\n' +
               '( ) Não retornarei para finalizar o expediente.' +
             '</div>\n'
        + '  </div>\n'
        + '  <div class="menu-divider"></div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="aus_data">Data da Ausência:<span class="req">*</span></label>\n'
        + '    <input id="aus_data" name="aus_data" type="text" class="form-input--underline" placeholder="dd/mm/aaaa" inputmode="numeric" pattern="^\\d{2}/\\d{2}/\\d{4}$" maxlength="10" required />\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="aus_hora">Horário da Ausência:<span class="req">*</span></label>\n'
        + '    <input id="aus_hora" name="aus_hora" type="text" class="form-input--underline" placeholder="hh:mm" inputmode="numeric" pattern="^\\d{2}:\\d{2}$" maxlength="5" required />\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="aus_motivo">Motivo da Ausência:<span class="req">*</span></label>\n'
        + '    <textarea id="aus_motivo" name="aus_motivo" class="form-input--underline auto-expand" placeholder="Descreva o motivo" rows="2" data-min-height="64" required></textarea>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Opções de Retorno:<span class="req">*</span></label>\n'
        + '    <div class="segmented segmented--stack" role="radiogroup" aria-label="Opções de Retorno" aria-required="true">\n'
        + '      <input type="radio" id="ret_inicio_tarde" name="aus_retorno" value="inicio_tarde">\n'
        + '      <label for="ret_inicio_tarde">Iniciarei a rota mais tarde.</label>\n'
        + '      <input type="radio" id="ret_retornar_finalizar" name="aus_retorno" value="retornar">\n'
        + '      <label for="ret_retornar_finalizar">Retornarei para finalizar o expediente.</label>\n'
        + '      <input type="radio" id="ret_nao_retornar" name="aus_retorno" value="nao_retornar">\n'
        + '      <label for="ret_nao_retornar">Não retornarei para finalizar o expediente.</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">A supervisão técnica foi comunicada previamente sobre esta ausência?<span class="req">*</span></label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Supervisão técnica comunicada" aria-required="true">\n'
        + '      <input type="radio" id="sup_comunicada_sim" name="aus_sup_comunicada" value="sim">\n'
        + '      <label for="sup_comunicada_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="sup_comunicada_nao" name="aus_sup_comunicada" value="nao">\n'
        + '      <label for="sup_comunicada_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<div class="form-actions">\n'
        + '  <button id="btnLimparForm" type="button" class="btn-action btn-action--gray"><i class="fa-solid fa-eraser"></i> Limpar respostas</button>\n'
        + '  <button id="btnCopiarForm" type="button" class="btn-action btn-action--red"><i class="fa-solid fa-copy"></i> Copiar</button>\n'
        + '</div>\n';

        // Comunicado de Ausência: seleção de horário (específico vs dia inteiro) e retorno automático para dia inteiro
        try {
          const horaInput = root.querySelector('#aus_hora');
          const horaBlock = horaInput ? horaInput.closest('.form-block') : null;
          const retNormBlock = root.querySelector('input[name="aus_retorno"]') ? root.querySelector('input[name="aus_retorno"]').closest('.form-block') : null;
          if (horaBlock && retNormBlock && !root.querySelector('input[name="aus_hora_tipo"]')) {
            try { root.__ausHorarioPatched = true; } catch {}
            const segBlk = document.createElement('div');
            segBlk.className = 'form-block';
            segBlk.innerHTML = ''
              + '    <label class="form-label">Horário da Ausência:<span class="req">*</span></label>'
              + '    <div class="segmented" role="radiogroup" aria-label="Horário da Ausência" aria-required="true">'
              + '      <input type="radio" id="aus_horario_especifico" name="aus_hora_tipo" value="especifico">'
              + '      <label for="aus_horario_especifico">Horário específico</label>'
              + '      <input type="radio" id="aus_horario_dia" name="aus_hora_tipo" value="dia_inteiro">'
              + '      <label for="aus_horario_dia">O dia inteiro</label>'
              + '    </div>';
            horaBlock.parentNode.insertBefore(segBlk, horaBlock);
            // bloco alternativo para retorno automático em dia inteiro
            const retAutoBlock = document.createElement('div');
            retAutoBlock.className = 'form-block';
            retAutoBlock.setAttribute('data-alt-ret', '1');
            retAutoBlock.innerHTML = ''
              + '    <label class="form-label">Opções de Retorno:<span class="req">*</span></label>'
              + '    <div class="segmented segmented--stack" role="radiogroup" aria-label="Opções de Retorno" aria-required="true">'
              + '      <input type="radio" id="ret_nao_retornar_auto" name="aus_retorno" value="nao_retornar" checked>'
              + '      <label for="ret_nao_retornar_auto">Não estarei na rota neste dia</label>'
              + '    </div>';
            retNormBlock.parentNode.insertBefore(retAutoBlock, retNormBlock.nextSibling);
            const applyHoraTipo = () => {
              try {
                const sel = root.querySelector('input[name="aus_hora_tipo"]:checked');
                const val = sel ? String(sel.value || '') : '';
                // Sempre limpar o campo de horário ao alternar o tipo
                try { if (horaInput) horaInput.value = ''; } catch {}
                if (val === 'dia_inteiro') {
                  horaBlock.style.display = 'none';
                  retNormBlock.style.display = 'none';
                  retAutoBlock.style.display = '';
                  try { const auto = retAutoBlock.querySelector('input[name="aus_retorno"]'); if (auto) auto.checked = true; } catch {}
                } else if (val === 'especifico') {
                  horaBlock.style.display = '';
                  retNormBlock.style.display = '';
                  retAutoBlock.style.display = 'none';
                  try { Array.from(root.querySelectorAll('input[name="aus_retorno"]')).forEach(r => { r.checked = false; }); } catch {}
                } else {
                  // Nenhuma seleção: esconde horário e mantém opções padrão visíveis, sem seleção
                  horaBlock.style.display = 'none';
                  retNormBlock.style.display = '';
                  retAutoBlock.style.display = 'none';
                  try { Array.from(root.querySelectorAll('input[name="aus_retorno"]')).forEach(r => { r.checked = false; }); } catch {}
                }
                try { const exFn = (typeof root.__updateAusenciaExample === 'function') ? root.__updateAusenciaExample : null; if (exFn) exFn(); } catch {}
                try { setTimeout(() => { try { const f = root.__updateAusenciaExample; if (typeof f === 'function') f(); } catch {} }, 0); } catch {}
                // Garantir placeholder com "/ o dia inteiro" no carregamento
                try {
                  const exInit = root.querySelector('[data-ctx="exemplo-ausencia"]');
                  if (exInit) {
                    const t = exInit.textContent || '';
                    if (t && !/\/ o dia inteiro/i.test(t)) {
                      try { exInit.textContent = t.replace(/no\s+ho.*?rio\s+das\s+\[[^\]]*\]/i, (m)=> m + ' / o dia inteiro'); } catch {}
                    }
                  }
                } catch {}
              } catch {}
            };
            root.addEventListener('change', (e) => { const n = (e.target && e.target.name) || ''; if (n === 'aus_hora_tipo') applyHoraTipo(); }, true);
            applyHoraTipo();
            // Override final do exemplo para considerar o tipo de horário
            const ensureExample = () => {
              try {
                const exEl = root.querySelector('[data-ctx="exemplo-ausencia"]');
                if (!exEl) return;
                const greet = (()=>{ try { const h=new Date().getHours(); if (h>=5&&h<12) return 'Bom dia.'; if (h<18) return 'Boa tarde.'; return 'Boa noite.'; } catch { return 'Olá.'; } })();
                const d = (root.querySelector('#aus_data')?.value || '[data]').trim();
                const hh = (root.querySelector('#aus_hora')?.value || '[horário]').trim();
                const mm = (root.querySelector('#aus_motivo')?.value || '[motivo]').trim();
                const tipoSel = root.querySelector('input[name="aus_hora_tipo"]:checked');
                const tipoVal = tipoSel ? String(tipoSel.value||'') : '';
                const periodo = (tipoVal === 'dia_inteiro')
                  ? 'o dia inteiro'
                  : (tipoVal === 'especifico'
                      ? ('no horário das ' + hh)
                      : ('no horário das ' + hh + ' / o dia inteiro'));
                const msg = `${greet} Venho por meio deste comunicado, informar que no dia ${d}, ${periodo}, precisarei me ausentar para ${mm}.`;
                let retLine = '';
                if (tipoVal === 'dia_inteiro') retLine = 'Não estarei na rota neste dia.';
                else {
                  const sel = root.querySelector('input[name="aus_retorno"]:checked');
                  if (sel) { const lab = root.querySelector(`label[for="${sel.id}"]`); retLine = (lab && lab.textContent || '').trim() || ''; }
                }
                const supSel = root.querySelector('input[name="aus_sup_comunicada"]:checked');
                const supLine = (supSel && String(supSel.value||'').toLowerCase()==='nao')
                  ? 'A supervisão não foi previamente comunicada sobre a minha ausência.'
                  : 'A supervisão foi previamente comunicada sobre a minha ausência.';
                const parts = [msg, ''];
                if (retLine) parts.push(`(?) ${retLine}`, '');
                else parts.push('( ) Iniciarei a rota mais tarde.', '( ) Retornarei para finalizar o expediente.', '( ) Não retornarei para finalizar o expediente.', '');
                parts.push(supLine);
                exEl.textContent = parts.join('\n');
                // Ajuste final: se supervisor foi comunicado e nome informado, refletir no exemplo
                try {
                  const supCk = root.querySelector('input[name="aus_sup_comunicada"]:checked');
                  if (supCk && String(supCk.value||'').toLowerCase()==='sim') {
                    const nm = (root.querySelector('#aus_sup_nome')?.value || '').trim();
                    if (nm) {
                      const fmt = (s)=> (s||'').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');
                      const n2 = fmt(nm);
                      const cur = exEl.textContent || '';
                      try {
                        exEl.textContent = cur.replace(/A supervis[^\n]*aus[^\n]*\./i, `O supervisor ${n2} foi previamente comunicada sobre a minha ausência.`);
                      } catch {}
                    }
                  }
                } catch {}
              } catch {}
            };
            root.addEventListener('input', (e)=>{ const id=(e.target&&e.target.id)||''; if (id==='aus_data'||id==='aus_hora'||id==='aus_motivo'){ ensureExample(); } }, true);
            root.addEventListener('change', (e)=>{ const n=(e.target&&e.target.name)||''; if (n==='aus_retorno'||n==='aus_sup_comunicada'||n==='aus_hora_tipo'){ ensureExample(); } }, true);
            setTimeout(ensureExample, 0);
            // Ajuste imediato do placeholder para refletir ambos os modos na carga
            try {
              const exInit = root.querySelector('[data-ctx="exemplo-ausencia"]');
              if (exInit) {
                const t = exInit.textContent || '';
                if (!/\/ o dia inteiro/i.test(t)) {
                  exInit.textContent = t.replace(/no\s+ho.*?rio\s+das\s+\[[^\]]*\]/i, (m)=> m + ' / o dia inteiro');
                }
              }
            } catch {}
            try { root.__updateAusenciaExample = ensureExample; } catch {}
            // Inserir campo de nome do supervisor (quando "Sim") e aviso (quando "Não")
            try {
              const supRadio = root.querySelector('input[name="aus_sup_comunicada"]');
              const supBlock = supRadio ? supRadio.closest('.form-block') : null;
              // Inserir somente se o campo ainda não existir no DOM
              if (supBlock && !root.querySelector('#aus_sup_nome')) {
                const nomeBlk = document.createElement('div');
                nomeBlk.className = 'form-block';
                nomeBlk.setAttribute('data-when-field', 'aus_sup_comunicada');
                nomeBlk.setAttribute('data-when-equals', 'sim');
                nomeBlk.setAttribute('data-clear-on-hide', '1');
                nomeBlk.innerHTML = ''
                  + '  <label class="form-label" for="aus_sup_nome">Informe o nome do supervisor informado:</label>\n'
                  + '  <input id="aus_sup_nome" name="aus_sup_nome" type="text" class="form-input--underline" placeholder="Ex.: João Silva" autocomplete="name" required />';
                supBlock.insertAdjacentElement('afterend', nomeBlk);
                // Fallback de visibilidade independente do motor condicional
                try {
                  const applyNomeBlk = () => {
                    try {
                      const sel = root.querySelector('input[name="aus_sup_comunicada"]:checked');
                      const isSim = !!(sel && String(sel.value||'').toLowerCase()==='sim');
                      if (isSim) { try { nomeBlk.removeAttribute('hidden'); } catch {} nomeBlk.style.display = ''; }
                      else { try { nomeBlk.setAttribute('hidden','hidden'); } catch {} nomeBlk.style.display = 'none'; }
                      const inp = root.querySelector('#aus_sup_nome');
                      if (inp) inp.required = !!isSim;
                    } catch {}
                  };
                  applyNomeBlk();
                  root.addEventListener('change', (e)=>{ const n=(e.target&&e.target.name)||''; if (n==='aus_sup_comunicada') applyNomeBlk(); }, true);
                } catch {}
                // Aviso discreto dentro do próprio bloco da pergunta (abaixo dos botões)
                try {
                  const segEl = supBlock.querySelector('.segmented');
                  if (segEl && !supBlock.querySelector('#sup_nao_hint')) {
                    const hint = document.createElement('div');
                    hint.id = 'sup_nao_hint';
                    hint.className = 'form-hint';
                    hint.style.cssText = 'color:#dc2626;font-style:italic;font-size:12px;margin-top:6px;';
                    hint.textContent = 'Informe ao seu supervisor sobre esta ausência.';
                    hint.hidden = true;
                    segEl.insertAdjacentElement('afterend', hint);
                    const applySupHint = () => {
                      try {
                        const sel = root.querySelector('input[name="aus_sup_comunicada"]:checked');
                        const isNo = !!(sel && String(sel.value||'').toLowerCase()==='nao');
                        hint.hidden = !isNo;
                      } catch { hint.hidden = true; }
                    };
                    applySupHint();
                    root.addEventListener('change', (e)=>{ const n=(e.target&&e.target.name)||''; if (n==='aus_sup_comunicada') applySupHint(); }, true);
                  }
                } catch {}
                try {
                  const inp = root.querySelector('#aus_sup_nome');
                  if (inp && !inp.__wired){
                    inp.__wired = true;
                    const toTitle = (s) => (s||'').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');
                    // Permitir espaços livremente; capitalizar em tempo real e no blur
                    const capitalizeWords = (value) => {
                      return (value || '').replace(/(^|\s)(\p{L})(\S*)/gu, (match, separator, first, rest) => separator + first.toUpperCase() + rest.toLowerCase());
                    };
                    inp.addEventListener('input', () => {
                      try {
                        const cur = inp.value;
                        const fmt = capitalizeWords(cur);
                        if (cur !== fmt) {
                          const pos = inp.selectionStart || fmt.length;
                          inp.value = fmt;
                          try { inp.setSelectionRange(pos, pos); } catch {}
                        }
                      } catch {}
                      try { if (typeof root.__updateAusenciaExample==='function') root.__updateAusenciaExample(); } catch {}
                    });
                    inp.addEventListener('blur', () => {
                      const cur = inp.value;
                      const fmt = capitalizeWords(cur);
                      if (cur !== fmt) inp.value = fmt;
                      try { if (typeof root.__updateAusenciaExample==='function') root.__updateAusenciaExample(); } catch {}
                    });
                  }
                } catch {}
                try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('comunicado-ausencia', root); } catch {}
              }
            } catch {}
          }
        } catch {}

        try {
          // Ajusta saudação do exemplo conforme hora atual
          try {
            const greet = (()=>{ try { const h=new Date().getHours(); if (h>=5&&h<12) return 'Bom dia'; if (h<18) return 'Boa tarde'; return 'Boa noite'; } catch { return 'Olá'; } })();
            const ex = root.querySelector('[data-ctx="exemplo-ausencia"]');
            if (ex) {
              const rest = 'Venho, por meio deste, informar que no dia [data], no horário das [horário] / o dia inteiro, precisarei me ausentar para [motivo].\n\n( ) Iniciarei a rota mais tarde.\n(✔) Retornarei para finalizar o expediente.\n( ) Não retornarei para finalizar o expediente.';
              ex.textContent = greet + '. ' + rest + '\nA supervisão [selecione] previamente comunicada sobre a minha ausência.';
            }
            // Ajuste do exemplo: acrescentar "/ o dia inteiro" no placeholder inicial
            try {
              const exFix0 = root.querySelector('[data-ctx="exemplo-ausencia"]');
              if (exFix0) {
                const tFix0 = exFix0.textContent || '';
                if (tFix0 && !(/\/ o dia inteiro/i.test(tFix0))) {
                  try { exFix0.textContent = tFix0.replace(/no\s+ho.*?rio\s+das\s+\[[^\]]*\]/i, (m) => m + ' / o dia inteiro'); } catch {}
                }
              }
            } catch {}
          } catch {}
          // Exemplo dinâmico: saudação + somente a opção selecionada
          try {
            const ex = root.querySelector('[data-ctx="exemplo-ausencia"]');
            const getGreet = () => { try { const h=new Date().getHours(); if (h>=5&&h<12) return 'Bom dia.'; if (h<18) return 'Boa tarde.'; return 'Boa noite.'; } catch { return 'Olá.'; } };
            const updateExample = () => {
              if (!ex) return;
              const msg = getGreet() + ' Venho por meio deste comunicado, informar que no dia [data], no horário das [horário] / o dia inteiro, precisarei me ausentar para [motivo].';
              const parts = [msg];
              try {
                const sel = root.querySelector('input[name="aus_retorno"]:checked');
                if (sel) {
                  const lab = root.querySelector('label[for="'+sel.id+'"]');
                  const t = (lab && lab.textContent || '').trim();
                  if (t) parts.push('', '(✔) ' + t);
                }
              } catch {}
              try {
                const sup = root.querySelector('input[name="aus_sup_comunicada"]:checked');
                if (sup) {
                  const v = String(sup.value||'').toLowerCase();
                  if (v === 'sim') {
                    const nm = (root.querySelector('#aus_sup_nome')?.value || '').trim();
                    const fmt = (s)=> (s||'').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');
                    const n2 = fmt(nm);
                    parts.push('', n2 ? (`O supervisor ${n2} foi previamente comunicada sobre a minha ausência.`) : 'A supervisão foi previamente comunicada sobre a minha ausência.');
                  } else {
                    parts.push('', 'Não foi previamente comunicada sobre a minha ausência.');
                  }
                }
              } catch {}
              ex.textContent = parts.filter(Boolean).join('\n');
            };
            updateExample();
            try { root.__updateAusenciaExample = updateExample; } catch {}
            try { root.addEventListener('change', (e)=>{ const n=(e.target&&e.target.name)||''; if (n==='aus_retorno' || n==='aus_sup_comunicada') { try { updateExample(); } catch {} } }, true); } catch {}
            // Override com reflexão de valores digitados e padrões completos
            try {
              const ex2 = root.querySelector('[data-ctx="exemplo-ausencia"]');
              const getGreet2 = () => { try { const h=new Date().getHours(); if (h>=5&&h<12) return 'Bom dia.'; if (h<18) return 'Boa tarde.'; return 'Boa noite.'; } catch { return 'Olá.'; } };
              const updateExample2 = () => {
                if (!ex2) return;
                const d = (root.querySelector('#aus_data')?.value || '[data]').trim();
                const hh = (root.querySelector('#aus_hora')?.value || '[horário]').trim();
                const mm = (root.querySelector('#aus_motivo')?.value || '[motivo]').trim();
                const msg = getGreet2() + ` Venho por meio deste comunicado, informar que no dia ${d}, no horário das ${hh} / o dia inteiro, precisarei me ausentar para ${mm}.`;
                let ret = 'Retornarei para finalizar o expediente.';
                try { const sel = root.querySelector('input[name="aus_retorno"]:checked'); if (sel){ const lab = root.querySelector('label[for="'+sel.id+'"]'); const t=(lab&&lab.textContent||'').trim(); if (t) ret = t; } } catch {}
                let supLine = 'A supervisão foi previamente comunicada sobre a minha ausência.';
                try { const sup = root.querySelector('input[name="aus_sup_comunicada"]:checked'); if (sup){ const v=(sup.value||'').toLowerCase(); if (v==='nao') supLine = 'Não foi previamente comunicada sobre a minha ausência.'; } } catch {}
                const out = [msg, '', '(✔) ' + ret, '', supLine].join('\n');
                ex2.textContent = out;
                // Ajuste final: nome do supervisor quando informado
                try {
                  const supCk = root.querySelector('input[name="aus_sup_comunicada"]:checked');
                  if (supCk && String(supCk.value||'').toLowerCase()==='sim') {
                    const nm = (root.querySelector('#aus_sup_nome')?.value || '').trim();
                    if (nm) {
                      const fmt = (s)=> (s||'').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');
                      const n2 = fmt(nm);
                      const cur = ex2.textContent || '';
                      try { ex2.textContent = cur.replace(/A supervis[^\n]*aus[^\n]*\./i, `O supervisor ${n2} foi previamente comunicada sobre a minha ausência.`); } catch {}
                    }
                  }
                } catch {}
              };
              updateExample2();
            try { root.__updateAusenciaExample = updateExample2; } catch {}
            try { root.addEventListener('input', (e)=>{ const id=(e.target&&e.target.id)||''; if (id==='aus_data'||id==='aus_hora'||id==='aus_motivo'){ try { updateExample2(); } catch {} } }, true); } catch {}
            try { root.addEventListener('change', (e)=>{ const n=(e.target&&e.target.name)||''; if (n==='aus_retorno'||n==='aus_sup_comunicada'){ try { updateExample2(); } catch {} } }, true); } catch {}
              // Reforço: quando nenhuma opção de retorno estiver selecionada, exibir as três linhas com ( )
              try {
                const ex3 = root.querySelector('[data-ctx="exemplo-ausencia"]');
                const greet3 = () => { try { const h=new Date().getHours(); if (h>=5&&h<12) return 'Bom dia.'; if (h<18) return 'Boa tarde.'; return 'Boa noite.'; } catch { return 'Olá.'; } };
                const updateExample3 = () => {
                  if (!ex3) return;
                  const d = (root.querySelector('#aus_data')?.value || '[data]').trim();
                  const hh = (root.querySelector('#aus_hora')?.value || '[horário]').trim();
                  const mm = (root.querySelector('#aus_motivo')?.value || '[motivo]').trim();
                  const tipoSel = root.querySelector('input[name="aus_hora_tipo"]:checked');
                  const tipoVal = tipoSel ? String(tipoSel.value||'') : '';
                  const periodoStr = (tipoVal === 'dia_inteiro')
                    ? 'o dia inteiro'
                    : (tipoVal === 'especifico'
                        ? (`no horário das ${hh}`)
                        : (`no horário das ${hh} / o dia inteiro`));
                  const msg = greet3() + ` Venho por meio deste comunicado, informar que no dia ${d}, ${periodoStr}, precisarei me ausentar para ${mm}.`;
                  let retornoLines = [];
                  const sel = root.querySelector('input[name="aus_retorno"]:checked');
                  if (sel) {
                    const lab = root.querySelector('label[for="'+sel.id+'"]');
                    const t = (lab && lab.textContent || '').trim();
                    retornoLines = t ? ['(✔) ' + t] : [];
                  } else {
                    retornoLines = [
                      '( ) Iniciarei a rota mais tarde.',
                      '( ) Retornarei para finalizar o expediente.',
                      '( ) Não retornarei para finalizar o expediente.'
                    ];
                  }
                  const supSel = root.querySelector('input[name="aus_sup_comunicada"]:checked');
                  const supLine = (supSel && String(supSel.value||'').toLowerCase()==='nao')
                    ? 'A supervisão não foi previamente comunicada sobre a minha ausência.'
                    : 'A supervisão foi previamente comunicada sobre a minha ausência.';
                  ex3.textContent = [msg, '', ...retornoLines, '', supLine].join('\n');
                  // Ajuste final: nome do supervisor quando informado
                  try {
                    const supSel2 = root.querySelector('input[name="aus_sup_comunicada"]:checked');
                    if (supSel2 && String(supSel2.value||'').toLowerCase()==='sim') {
                      const nm = (root.querySelector('#aus_sup_nome')?.value || '').trim();
                      if (nm) {
                        const fmt = (s)=> (s||'').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');
                        const n2 = fmt(nm);
                        const cur = ex3.textContent || '';
                        try { ex3.textContent = cur.replace(/A supervis[^\n]*aus[^\n]*\./i, `O supervisor ${n2} foi previamente comunicada sobre a minha ausência.`); } catch {}
                      }
                    }
                  } catch {}
                };
                try { root.__updateAusenciaExample = updateExample3; } catch {}
                // Fix: placeholder de supervisão quando não houver seleção (exemplo de formato)
                try {
                  const exFix = root.querySelector('[data-ctx="exemplo-ausencia"]');
                  const applySupPlaceholder = () => {
                    if (!exFix) return;
                    const sel = root.querySelector('input[name="aus_sup_comunicada"]:checked');
                    if (!sel) {
                      try {
                        const base = 'A supervisão [selecione] previamente comunicada sobre a minha ausência.';
                        const cur = exFix.textContent || '';
                        if (/A supervis[^\n]*/.test(cur)) exFix.textContent = cur.replace(/A supervis[^\n]*/, base);
                        else exFix.textContent = (cur ? (cur + '\n') : '') + base;
                      } catch {}
                    }
                  };
                  applySupPlaceholder();
                  root.addEventListener('change', (e)=>{ const n=(e.target&&e.target.name)||''; if (n==='aus_sup_comunicada') applySupPlaceholder(); }, true);
                } catch {}
                // Exibir pergunta de tomada apenas na Avaliação
                try {
                  const tBlk = root.querySelector('#tem_tomada_sim')?.closest('.form-block');
                  if (tBlk) {
                    tBlk.setAttribute('data-when-field', 'tipo_serv');
                    tBlk.setAttribute('data-when-in', 'avaliacao');
                    tBlk.setAttribute('data-clear-on-hide', '1');
                    try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
                  }
                } catch {}
                try { updateExample3(); } catch {}
                try { root.addEventListener('input', (e)=>{ const id=(e.target&&e.target.id)||''; if (id==='aus_data'||id==='aus_hora'||id==='aus_motivo'){ try { updateExample3(); } catch {} } }, true); } catch {}
                try { root.addEventListener('change', (e)=>{ const n=(e.target&&e.target.name)||''; if (n==='aus_retorno'||n==='aus_sup_comunicada'||n==='aus_hora_tipo'){ try { updateExample3(); } catch {} } }, true); } catch {}
              } catch {}
            } catch {}
          } catch {}

          // Máscara leve para data dd/mm/aaaa (sem validação em tempo real)
          const data = root.querySelector('#aus_data');
          if (data && !data.__wired){
            data.__wired = true;
            data.addEventListener('input', () => {
              const digits = (data.value||'').replace(/\D+/g,'').slice(0,8);
              let out = '';
              if (digits.length <= 2) out = digits;
              else if (digits.length <= 4) out = digits.slice(0,2) + '/' + digits.slice(2);
              else out = digits.slice(0,2) + '/' + digits.slice(2,4) + '/' + digits.slice(4);
              data.value = out;
            });
            data.addEventListener('input', () => { try { const b=data.closest('.form-block'); data.classList.remove('error'); data.style.boxShadow=''; data.style.borderBottomColor=''; const err=b?.querySelector('.form-error'); if (err) err.remove(); const hint=b?.querySelector('.sinal-los-hint[data-error="1"]'); if (hint) hint.remove(); } catch {} });
          }
          // Máscara leve para hora hh:mm (sem validação em tempo real)
          const hora = root.querySelector('#aus_hora');
          if (hora && !hora.__wired){
            hora.__wired = true;
            hora.addEventListener('input', () => {
              const digits = (hora.value||'').replace(/\D+/g,'').slice(0,4);
              let out = '';
              if (digits.length <= 2) out = digits;
              else out = digits.slice(0,2) + ':' + digits.slice(2);
              hora.value = out;
            });
            hora.addEventListener('input', () => { try { const b=hora.closest('.form-block'); hora.classList.remove('error'); hora.style.boxShadow=''; hora.style.borderBottomColor=''; const err=b?.querySelector('.form-error'); if (err) err.remove(); const hint=b?.querySelector('.sinal-los-hint[data-error="1"]'); if (hint) hint.remove(); } catch {} });
          }
          const motivo = root.querySelector('#aus_motivo');
          if (motivo && !motivo.__wired){
            motivo.__wired = true;
            motivo.addEventListener('input', () => { try { const b=motivo.closest('.form-block'); motivo.classList.remove('error'); motivo.style.boxShadow=''; motivo.style.borderBottomColor=''; const err=b?.querySelector('.form-error'); if (err) err.remove(); const hint=b?.querySelector('.sinal-los-hint[data-error="1"]'); if (hint) hint.remove(); } catch {} });
          }
          try {
            const segWrap = root.querySelector('div.segmented [name="aus_retorno"]').closest('.form-block');
            if (segWrap && !segWrap.__wired){
              segWrap.__wired = true;
              segWrap.addEventListener('change', (e) => { const t=e.target; if (!t) return; if ((t.name||'')==='aus_retorno'){ try { const seg=segWrap.querySelector('.segmented'); if (seg){ seg.classList.remove('error'); seg.style.boxShadow=''; seg.style.border=''; seg.style.borderColor=''; } const err=segWrap.querySelector('.form-error'); if (err) err.remove(); const hint=segWrap.querySelector('.sinal-los-hint[data-error="1"]'); if (hint) hint.remove(); } catch {} } }, true);
            }
          } catch {}
          try {
            const segWrap2 = root.querySelector('div.segmented [name="aus_sup_comunicada"]').closest('.form-block');
            if (segWrap2 && !segWrap2.__wired){
              segWrap2.__wired = true;
              segWrap2.addEventListener('change', (e) => { const t=e.target; if (!t) return; if ((t.name||'')==='aus_sup_comunicada'){ try { const seg=segWrap2.querySelector('.segmented'); if (seg){ seg.classList.remove('error'); seg.style.boxShadow=''; seg.style.border=''; seg.style.borderColor=''; } const err=segWrap2.querySelector('.form-error'); if (err) err.remove(); const hint=segWrap2.querySelector('.sinal-los-hint[data-error="1"]'); if (hint) hint.remove(); } catch {} } }, true);
            }
          } catch {}
        } catch {}
      }
    },
    'suporte-moto': {
      equipe: 'moto',
      titulo: 'Suporte Técnico',
      descricao: 'Atendimento e checklist de suporte em campo',
      icon: 'fa-screwdriver-wrench',
      badge: 'red',
      atualizadoEm: '09/09/2025 00:23',
      render: (root) => {
        root.innerHTML = ''+
        '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-id-card"></i> Informações do Cliente</div>\n'
        + '    <div class="form-subtitle">Preencha quem acompanhou</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="clienteNome">Quem acompanhou</label>\n'
        + '    <input id="clienteNome" name="clienteNome" type="text" class="form-input" placeholder="Ex.: Maria Souza" autocomplete="name" />\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="cliente_relato">Relato do cliente</label>\n'
        + '    <div class="form-hint" style="margin-top:6px;">Relate a dificuldade explicada diretamente pelo cliente no local</div>\n'
        + '    <textarea id="cliente_relato" name="cliente_relato" class="form-input--underline auto-expand" placeholder="Digite o relato do cliente..." rows="2" data-min-height="60"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '  <div class="form-cond" data-when-field="tipo_serv" data-when-equals="cabeamento" data-clear-on-hide="1">\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Cabeamento viável:</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Cabeamento viável?">\n'
        + '        <input type="radio" id="cd_viavel_sim" name="cd_viavel" value="sim">\n'
        + '        <label for="cd_viavel_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_viavel_nao" name="cd_viavel" value="nao">\n'
        + '        <label for="cd_viavel_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Há passagem adequada para o cabo de rede (Ex.: Conduite):</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Passagem adequada?">\n'
        + '        <input type="radio" id="cd_passagem_sim" name="cd_passagem" value="sim">\n'
        + '        <label for="cd_passagem_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_passagem_nao" name="cd_passagem" value="nao">\n'
        + '        <label for="cd_passagem_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_trajeto_obs">Observações sobre o trajeto do cabo de rede:</label>\n'
        + '      <textarea id="cd_trajeto_obs" name="cd_trajeto_obs" class="form-input--underline auto-expand" placeholder="Explique o trajeto do cabo de rede Ex.: Necessário passar por cima do forro..." rows="3" data-min-height="90"></textarea>\n'
        + '      <div class="textarea-counter">0 caracteres</div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_qt_cabos">Quantos cabos de rede foram passados?</label>\n'
        + '      <input id="cd_qt_cabos" name="cd_qt_cabos" type="text" inputmode="decimal" class="form-input--underline" placeholder="Ex.: 2" />\n'
        + '      <input id="cd_cabos_multi" name="cd_cabos_multi" type="hidden" value="nao" />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_quais_disp">Quais dispositivos foram cabeados:</label>\n'
        + '      <input id="cd_quais_disp" name="cd_quais_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_qual_disp">Qual dispositivo foi cabeado:</label>\n'
        + '      <input id="cd_qual_disp" name="cd_qual_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_cabometros">Metragem de cabo de rede total para este serviço:</label>\n'
        + '      <input id="cd_cabometros" name="cd_cabometros" type="text" inputmode="decimal" class="form-input--underline" placeholder="Digite a metragem, ex.: 10m" />\n'
        + '      <div class="form-hint" id="cd_cabocusto" style="margin-top:6px;">Previsão de custos sobre este cabeamento: R$0,00</div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">O cabeamento é na mesma residência?</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Mesma residência?">\n'
        + '        <input type="radio" id="cd_mesma_res_sim" name="cd_mesma_res" value="sim">\n'
        + '        <label for="cd_mesma_res_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_mesma_res_nao" name="cd_mesma_res" value="nao">\n'
        + '        <label for="cd_mesma_res_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_desc_onde">Neste caso informe para onde o cabo foi passado:</label>\n'
        + '      <input id="cd_desc_onde" name="cd_desc_onde" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label">Informe para qual cômodo foi este cabo:</label>\n'
        + '      <div class="segmented segmented--stack" role="radiogroup" aria-label="Cômodo">\n'
        + '        <input type="radio" id="cd_comodo_sala" name="cd_comodo" value="sala">\n'
        + '        <label for="cd_comodo_sala">Sala</label>\n'
        + '        <input type="radio" id="cd_comodo_quarto" name="cd_comodo" value="quarto">\n'
        + '        <label for="cd_comodo_quarto">Quarto</label>\n'
        + '        <input type="radio" id="cd_comodo_area" name="cd_comodo" value="area">\n'
        + '        <label for="cd_comodo_area">Área</label>\n'
        + '        <input type="radio" id="cd_comodo_cozinha" name="cd_comodo" value="cozinha">\n'
        + '        <label for="cd_comodo_cozinha">Cozinha</label>\n'
        + '        <input type="radio" id="cd_comodo_outros" name="cd_comodo" value="outros">\n'
        + '        <label for="cd_comodo_outros">Outros</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_comodo" data-when-equals="outros" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_instal_local">Neste caso descreva para onde o cabo de rede foi passado:</label>\n'
        + '      <input id="cd_instal_local" name="cd_instal_local" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '    </div>\n'
        + '  </div>\n' 
        + '  <div class="form-cond" data-when-field="tipo_serv" data-when-equals="cabeamento" data-clear-on-hide="1">\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Cabeamento viável:</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Cabeamento viável?">\n'
        + '        <input type="radio" id="cd_viavel_sim" name="cd_viavel" value="sim">\n'
        + '        <label for="cd_viavel_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_viavel_nao" name="cd_viavel" value="nao">\n'
        + '        <label for="cd_viavel_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Há passagem adequada para o cabo de rede (Ex.: Conduite):</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Passagem adequada?">\n'
        + '        <input type="radio" id="cd_passagem_sim" name="cd_passagem" value="sim">\n'
        + '        <label for="cd_passagem_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_passagem_nao" name="cd_passagem" value="nao">\n'
        + '        <label for="cd_passagem_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_trajeto_obs">Observações sobre o trajeto do cabo de rede:</label>\n'
        + '      <textarea id="cd_trajeto_obs" name="cd_trajeto_obs" class="form-input--underline auto-expand" placeholder="Explique o trajeto do cabo de rede Ex.: Necessário passar por cima do forro..." rows="3" data-min-height="90"></textarea>\n'
        + '      <div class="textarea-counter">0 caracteres</div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_qt_cabos">Quantos cabos de rede foram passados?</label>\n'
        + '      <input id="cd_qt_cabos" name="cd_qt_cabos" type="text" inputmode="decimal" class="form-input--underline" placeholder="Ex.: 2" />\n'
        + '      <input id="cd_cabos_multi" name="cd_cabos_multi" type="hidden" value="nao" />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_quais_disp">Quais dispositivos foram cabeados:</label>\n'
        + '      <input id="cd_quais_disp" name="cd_quais_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_qual_disp">Qual dispositivo foi cabeado:</label>\n'
        + '      <input id="cd_qual_disp" name="cd_qual_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_cabometros">Metragem de cabo de rede total para este serviço:</label>\n'
        + '      <input id="cd_cabometros" name="cd_cabometros" type="text" inputmode="decimal" class="form-input--underline" placeholder="Digite a metragem, ex.: 10m" />\n'
        + '      <div class="form-hint" id="cd_cabocusto" style="margin-top:6px;">Previsão de custos sobre este cabeamento: R$0,00</div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">O cabeamento é na mesma residência?</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Mesma residência?">\n'
        + '        <input type="radio" id="cd_mesma_res_sim" name="cd_mesma_res" value="sim">\n'
        + '        <label for="cd_mesma_res_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_mesma_res_nao" name="cd_mesma_res" value="nao">\n'
        + '        <label for="cd_mesma_res_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_desc_onde">Neste caso informe para onde o cabo foi passado:</label>\n'
        + '      <input id="cd_desc_onde" name="cd_desc_onde" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label">Informe para qual cômodo foi este cabo:</label>\n'
        + '      <div class="segmented segmented--stack" role="radiogroup" aria-label="Cômodo">\n'
        + '        <input type="radio" id="cd_comodo_sala" name="cd_comodo" value="sala">\n'
        + '        <label for="cd_comodo_sala">Sala</label>\n'
        + '        <input type="radio" id="cd_comodo_quarto" name="cd_comodo" value="quarto">\n'
        + '        <label for="cd_comodo_quarto">Quarto</label>\n'
        + '        <input type="radio" id="cd_comodo_area" name="cd_comodo" value="area">\n'
        + '        <label for="cd_comodo_area">Área</label>\n'
        + '        <input type="radio" id="cd_comodo_cozinha" name="cd_comodo" value="cozinha">\n'
        + '        <label for="cd_comodo_cozinha">Cozinha</label>\n'
        + '        <input type="radio" id="cd_comodo_outros" name="cd_comodo" value="outros">\n'
        + '        <label for="cd_comodo_outros">Outros</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_comodo" data-when-equals="outros" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_instal_local">Neste caso descreva para onde o cabo de rede foi passado:</label>\n'
        + '      <input id="cd_instal_local" name="cd_instal_local" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '    </div>\n'
        + '  </div>\n' 
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-location-dot"></i> ENDEREÇO E INFORMAÇÕES DA O.S</div>\n'
        + '    <div class="form-subtitle">Dados iniciais do atendimento</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foto da frente da casa anexada no MK?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto frente anexada?">\n'
        + '      <input type="radio" id="mkfoto_sim" name="mkfoto" value="sim">\n'
        + '      <label for="mkfoto_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="mkfoto_nao" name="mkfoto" value="nao">\n'
        + '      <label for="mkfoto_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n' 
        + '  </div>\n' 
        + '  <div class="form-block">\n'
        + '    <label class="form-label">A ordem de serviço foi gerada (pelo atendente) com as informações necessárias?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="O.S gerada com informações?">\n'
        + '      <input type="radio" id="osinfo_sim" name="osinfo" value="sim">\n'
        + '      <label for="osinfo_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="osinfo_nao" name="osinfo" value="nao">\n'
        + '      <label for="osinfo_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n' 
        + '  </div>\n' 
        + '  <div class="form-block" data-when-field="fotos_anex" data-when-equals="nao" data-clear-on-hide="1">\n' 
        + '    <label class="form-label" for="fotos_just">Justifique o motivo de não ter anexado:</label>\n' 
        + '    <input id="fotos_just" name="fotos_just" type="text" class="form-input--underline" placeholder="Digite..." />\n' 
        + '  </div>\n' 
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-square-check"></i> Conferências Técnicas</div>\n'
        + '    <div class="form-subtitle">Checklist de verificações técnicas</div>\n'
        + '  </div>\n'
        + '  <div class="form-block form-cond" data-when-field="tipo_serv" data-when-in="avaliacao,avaliacao_cab,instalacao" data-clear-on-hide="1">\\n'
        + '    <label class="form-label">Verificações de cabos de rede</label>\\n'
        + '    <div class="form-hint" style="margin-top:6px;">O que foi verificado referente aos cabos de rede do local:</div>\\n'
        + '    <label class="form-label" style="margin-top:10px;">Cabo de Rede da WAN:</label>\\n'
        + '    <div class="choices">\\n' 
        + '      <label class="choice"><input type="checkbox" id="wan_gigabit" name="wan_gigabit"><span>Cabo de rede Gigabit</span></label>\\n'
        + '      <label class="choice"><input type="checkbox" id="wan_powermitter" name="wan_powermitter"><span>Teste no Powermitter</span></label>\\n'
        + '      <label class="choice"><input type="checkbox" id="wan_ping" name="wan_ping"><span>Teste de Ping no Cabo</span></label>\\n'
        + '    </div>\\n'
        + '    <label class="form-label" for="wan_obs" style="margin-top:10px;">Observação adicional sobre o cabo de rede (caso tenha):</label>\\n'
        + '    <textarea id="wan_obs" name="wan_obs" class="form-input--underline auto-expand" placeholder="Digite..." rows="1" data-min-height="32"></textarea>\\n'
        + '  </div>\\n'
        + '  <div class="form-block" data-wan-add="1">\\n'
        + '    <button type="button" class="btn-ghost wan-add"><i class="fa-solid fa-plus"></i> Adicionar verificação adicional (cabo de rede)</button>\\n'
        + '  </div>\\n'
        + '  <div class="form-block">\\n'
        + '    <label class="form-label">Verificação das fontes</label>\\n'        + '    <div class="form-hint" style="margin-top:6px;margin-bottom:6px;">Marque todas as conferências realizadas sobre as fontes dos equipamentos</div>\\n'
        + '    <div class="choices">\\n'
        + '      <label class="choice"><input type="checkbox" id="fonte_mau_contato" name="fonte_mau_contato"><span>Mau contato mecânico (manipulou a fonte para verificar se terá queda de energia)</span></label>\\n'
        + '      <label class="choice"><input type="checkbox" id="fonte_amperagem_tipo" name="fonte_amperagem_tipo"><span>Verificou se as Amperagens e se o tipo de fonte estão corretas</span></label>\\n'
        + '      <label class="choice"><input type="checkbox" id="fonte_uso_corretamente" name="fonte_uso_corretamente"><span>Se estão sendo usadas corretamente (Ex.: Filtro de Linha)</span></label>\\n'
        + '    </div>\\n'
        + '    <label class="form-label" for="fonte_obs" style="margin-top:10px;">Observações (caso tenha) sobre as fontes dos equipamentos no local:</label>\\n'
        + '    <textarea id="fonte_obs" name="fonte_obs" class="form-input--underline auto-expand" placeholder="Digite..." rows="1" data-min-height="32"></textarea>\\n'
        + '  </div>\\n'
        + '  </div>\\n'
        + ''
        + '  <div class="form-block">\n'
        + '    <label class="form-label">A firmware do roteador/ONT está atualizada?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Firmware atualizada?">\n'
        + '      <input type="radio" id="fw_atualizada_sim" name="fw_atualizada" value="sim">\n'
        + '      <label for="fw_atualizada_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="fw_atualizada_nao" name="fw_atualizada" value="nao">\n'
        + '      <label for="fw_atualizada_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Teste de navegação</label>\n'
        + '    <div class="form-hint" style="margin-top:6px;">Verificações que foram realizadas para testar a navegação:</div>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="nav_empresa" name="nav_empresa"><span>Realizado um teste de navegação nos ativos da empresa (Youtube, Sites e etc);</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="nav_cliente" name="nav_cliente"><span>Realizado um teste de navegação nos ativos do Cliente (Youtube, Sites e etc);</span></label>\n'
        + '    </div>\n'
        + '    <label class="form-label" for="nav_ativos" style="margin-top:10px;">Ativos testados</label>\n'
        + '    <input id="nav_ativos" name="nav_ativos" type="text" class="form-input--underline" placeholder="Ativos avaliados e observações complementares dos testes" />\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Os equipamentos estão em local adequado?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Local adequado?">\n'
        + '      <input type="radio" id="local_ok_sim" name="local_ok" value="sim">\n'
        + '      <label for="local_ok_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="local_ok_nao" name="local_ok" value="nao">\n'
        + '      <label for="local_ok_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="local_ok" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="local_qual">Qual local?</label>\n'
        + '    <input id="local_qual" name="local_qual" type="text" class="form-input--underline" placeholder="Ex.: Sala, escritório, corredor..." />\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="local_ok" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Cliente ciente da necessidade de mudança de local?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Cliente ciente?">\n'
        + '      <input type="radio" id="local_ciente_sim" name="local_ciente" value="sim">\n'
        + '      <label for="local_ciente_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="local_ciente_nao" name="local_ciente" value="nao">\n'
        + '      <label for="local_ciente_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="local_ciente" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="local_motivo_desciente">Motivo de não estar ciente sobre esta necessidade:</label>\n'
        + '    <input id="local_motivo_desciente" name="local_motivo_desciente" type="text" class="form-input--underline" placeholder="Descreva o motivo..." />\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="local_ciente" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Cliente de acordo com a orientação passada?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Cliente de acordo?">\n'
        + '      <input type="radio" id="local_deacordo_sim" name="local_deacordo" value="sim">\n'
        + '      <label for="local_deacordo_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="local_deacordo_nao" name="local_deacordo" value="nao">\n'
        + '      <label for="local_deacordo_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="local_deacordo" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="local_motivo_mudanca">Motivo da necessidade de mudança de local dos equipamentos:</label>\n'
        + '    <input id="local_motivo_mudanca" name="local_motivo_mudanca" type="text" class="form-input--underline" placeholder="Descreva o motivo..." />\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="local_deacordo" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="local_motivo_naoacordo">Motivo de não estar de acordo com as orientações:</label>\n'
        + '    <input id="local_motivo_naoacordo" name="local_motivo_naoacordo" type="text" class="form-input--underline" placeholder="Descreva o motivo..." />\n'
        + '  </div>\n'
        + ''
        + ''
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="sinal_fibra">Sinal da fibra na PTO:</label>\n'
        + '    <input id="sinal_fibra" name="sinal_fibra" type="text" class="form-input--underline" inputmode="decimal" placeholder="-00.00" />\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foto da medição do sinal anexada?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto da medição do sinal anexada?">\n'
        + '      <input type="radio" id="sinalfoto_sim" name="sinal_foto" value="sim">\n'
        + '      <label for="sinalfoto_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="sinalfoto_nao" name="sinal_foto" value="nao">\n'
        + '      <label for="sinalfoto_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Realizou a limpeza do leitor óptico da ONU e do conector:</label>\n'
        + '    <div class="segmented segmented--stack" role="radiogroup" aria-label="Realizou a limpeza do leitor óptico da ONU e do conector?">\n'
        + '      <input type="radio" id="limpeza_sim" name="limpeza_optica" value="sim">\n'
        + '      <label for="limpeza_sim">Sim</label>\n'
        + '      <input type="radio" id="limpeza_nao" name="limpeza_optica" value="nao">\n'
        + '      <label for="limpeza_nao">Não</label>\n'
        + '      <input type="radio" id="limpeza_onucomp" name="limpeza_optica" value="onu-compartilhada">\n'
        + '      <label for="limpeza_onucomp">ONU compartilhada (não teve acesso)</label>\n'
        + '    </div>\n' 
        + '  </div>\n' 
        + '  <div class="form-block">\\n'
        + '    <label class="form-label">As fotos dos equipamentos no local e do serviço realizado foram anexadas?</label>\\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Fotos dos equipamentos anexadas?">\\n'
        + '      <input type="radio" id="fotos_anex_sim" name="fotos_anex" value="sim">\\n'
        + '      <label for="fotos_anex_sim"><i class="fa-solid fa-check"></i> Sim</label>\\n'
        + '      <input type="radio" id="fotos_anex_nao" name="fotos_anex" value="nao">\\n'
        + '      <label for="fotos_anex_nao"><i class="fa-solid fa-xmark"></i> Não</label>\\n'
        + '    </div>\\n'
        + '  </div>\n' 
        + '  <div class="form-cond" data-when-field="tipo_serv" data-when-equals="cabeamento" data-clear-on-hide="1">\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Cabeamento viável:</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Cabeamento viável?">\n'
        + '        <input type="radio" id="cd_viavel_sim" name="cd_viavel" value="sim">\n'
        + '        <label for="cd_viavel_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_viavel_nao" name="cd_viavel" value="nao">\n'
        + '        <label for="cd_viavel_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Há passagem adequada para o cabo de rede (Ex.: Conduite):</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Passagem adequada?">\n'
        + '        <input type="radio" id="cd_passagem_sim" name="cd_passagem" value="sim">\n'
        + '        <label for="cd_passagem_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_passagem_nao" name="cd_passagem" value="nao">\n'
        + '        <label for="cd_passagem_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_trajeto_obs">Observações sobre o trajeto do cabo de rede:</label>\n'
        + '      <textarea id="cd_trajeto_obs" name="cd_trajeto_obs" class="form-input--underline auto-expand" placeholder="Explique o trajeto do cabo de rede Ex.: Necessário passar por cima do forro..." rows="3" data-min-height="90"></textarea>\n'
        + '      <div class="textarea-counter">0 caracteres</div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_qt_cabos">Quantos cabos de rede foram passados?</label>\n'
        + '      <input id="cd_qt_cabos" name="cd_qt_cabos" type="text" inputmode="decimal" class="form-input--underline" placeholder="Ex.: 2" />\n'
        + '      <input id="cd_cabos_multi" name="cd_cabos_multi" type="hidden" value="nao" />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_quais_disp">Quais dispositivos foram cabeados:</label>\n'
        + '      <input id="cd_quais_disp" name="cd_quais_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_qual_disp">Qual dispositivo foi cabeado:</label>\n'
        + '      <input id="cd_qual_disp" name="cd_qual_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_cabometros">Metragem de cabo de rede total para este serviço:</label>\n'
        + '      <input id="cd_cabometros" name="cd_cabometros" type="text" inputmode="decimal" class="form-input--underline" placeholder="Digite a metragem, ex.: 10m" />\n'
        + '      <div class="form-hint" id="cd_cabocusto" style="margin-top:6px;">Previsão de custos sobre este cabeamento: R$0,00</div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">O cabeamento é na mesma residência?</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Mesma residência?">\n'
        + '        <input type="radio" id="cd_mesma_res_sim" name="cd_mesma_res" value="sim">\n'
        + '        <label for="cd_mesma_res_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_mesma_res_nao" name="cd_mesma_res" value="nao">\n'
        + '        <label for="cd_mesma_res_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_desc_onde">Neste caso informe para onde o cabo foi passado:</label>\n'
        + '      <input id="cd_desc_onde" name="cd_desc_onde" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label">Informe para qual cômodo foi este cabo:</label>\n'
        + '      <div class="segmented segmented--stack" role="radiogroup" aria-label="Cômodo">\n'
        + '        <input type="radio" id="cd_comodo_sala" name="cd_comodo" value="sala">\n'
        + '        <label for="cd_comodo_sala">Sala</label>\n'
        + '        <input type="radio" id="cd_comodo_quarto" name="cd_comodo" value="quarto">\n'
        + '        <label for="cd_comodo_quarto">Quarto</label>\n'
        + '        <input type="radio" id="cd_comodo_area" name="cd_comodo" value="area">\n'
        + '        <label for="cd_comodo_area">Área</label>\n'
        + '        <input type="radio" id="cd_comodo_cozinha" name="cd_comodo" value="cozinha">\n'
        + '        <label for="cd_comodo_cozinha">Cozinha</label>\n'
        + '        <input type="radio" id="cd_comodo_outros" name="cd_comodo" value="outros">\n'
        + '        <label for="cd_comodo_outros">Outros</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_comodo" data-when-equals="outros" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_instal_local">Neste caso descreva para onde o cabo de rede foi passado:</label>\n'
        + '      <input id="cd_instal_local" name="cd_instal_local" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  </div>\n'
        + '  <div class="form-cond" data-when-field="tipo_serv" data-when-equals="cabeamento" data-clear-on-hide="1">\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Cabeamento viável:</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Cabeamento viável?">\n'
        + '        <input type="radio" id="cd_viavel_sim" name="cd_viavel" value="sim">\n'
        + '        <label for="cd_viavel_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_viavel_nao" name="cd_viavel" value="nao">\n'
        + '        <label for="cd_viavel_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Há passagem adequada para o cabo de rede (Ex.: Conduite):</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Passagem adequada?">\n'
        + '        <input type="radio" id="cd_passagem_sim" name="cd_passagem" value="sim">\n'
        + '        <label for="cd_passagem_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_passagem_nao" name="cd_passagem" value="nao">\n'
        + '        <label for="cd_passagem_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_trajeto_obs">Observações sobre o trajeto do cabo de rede:</label>\n'
        + '      <textarea id="cd_trajeto_obs" name="cd_trajeto_obs" class="form-input--underline auto-expand" placeholder="Explique o trajeto do cabo de rede Ex.: Necessário passar por cima do forro..." rows="3" data-min-height="90"></textarea>\n'
        + '      <div class="textarea-counter">0 caracteres</div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_qt_cabos">Quantos cabos de rede foram passados?</label>\n'
        + '      <input id="cd_qt_cabos" name="cd_qt_cabos" type="text" inputmode="decimal" class="form-input--underline" placeholder="Ex.: 2" />\n'
        + '      <input id="cd_cabos_multi" name="cd_cabos_multi" type="hidden" value="nao" />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_quais_disp">Quais dispositivos foram cabeados:</label>\n'
        + '      <input id="cd_quais_disp" name="cd_quais_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_qual_disp">Qual dispositivo foi cabeado:</label>\n'
        + '      <input id="cd_qual_disp" name="cd_qual_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_cabometros">Metragem de cabo de rede total para este serviço:</label>\n'
        + '      <input id="cd_cabometros" name="cd_cabometros" type="text" inputmode="decimal" class="form-input--underline" placeholder="Digite a metragem, ex.: 10m" />\n'
        + '      <div class="form-hint" id="cd_cabocusto" style="margin-top:6px;">Previsão de custos sobre este cabeamento: R$0,00</div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">O cabeamento é na mesma residência?</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Mesma residência?">\n'
        + '        <input type="radio" id="cd_mesma_res_sim" name="cd_mesma_res" value="sim">\n'
        + '        <label for="cd_mesma_res_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_mesma_res_nao" name="cd_mesma_res" value="nao">\n'
        + '        <label for="cd_mesma_res_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_desc_onde">Neste caso informe para onde o cabo foi passado:</label>\n'
        + '      <input id="cd_desc_onde" name="cd_desc_onde" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label">Informe para qual cômodo foi este cabo:</label>\n'
        + '      <div class="segmented segmented--stack" role="radiogroup" aria-label="Cômodo">\n'
        + '        <input type="radio" id="cd_comodo_sala" name="cd_comodo" value="sala">\n'
        + '        <label for="cd_comodo_sala">Sala</label>\n'
        + '        <input type="radio" id="cd_comodo_quarto" name="cd_comodo" value="quarto">\n'
        + '        <label for="cd_comodo_quarto">Quarto</label>\n'
        + '        <input type="radio" id="cd_comodo_area" name="cd_comodo" value="area">\n'
        + '        <label for="cd_comodo_area">Área</label>\n'
        + '        <input type="radio" id="cd_comodo_cozinha" name="cd_comodo" value="cozinha">\n'
        + '        <label for="cd_comodo_cozinha">Cozinha</label>\n'
        + '        <input type="radio" id="cd_comodo_outros" name="cd_comodo" value="outros">\n'
        + '        <label for="cd_comodo_outros">Outros</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_comodo" data-when-equals="outros" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_instal_local">Neste caso descreva para onde o cabo de rede foi passado:</label>\n'
        + '      <input id="cd_instal_local" name="cd_instal_local" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-gauge-high"></i> TESTES DE VELOCIDADE</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Prints dos testes de velocidade anexados:</label>\n'
        + '    <div class="segmented segmented--stack" role="radiogroup" aria-label="Prints dos testes de velocidade anexados?">\n'
        + '      <input type="radio" id="veltest_prints_sim" name="veltest_prints" value="sim">\n'
        + '      <label for="veltest_prints_sim">Sim</label>\n'
        + '      <input type="radio" id="veltest_prints_nao" name="veltest_prints" value="nao">\n'
        + '      <label for="veltest_prints_nao">Não</label>\n'
        + '      <input type="radio" id="veltest_prints_naoreal" name="veltest_prints" value="nao-realizado">\n'
        + '      <label for="veltest_prints_naoreal">Teste não realizado</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="veltest_prints" data-when-in="sim,nao" data-clear-on-hide="1" data-clear-on-hide="1" data-veltest-block="1">\n'
        + '    <label class="form-label">Resultado dos testes de velocidade:</label>\n'
        + '    <div class="triple-inputs">\n'
        + '      <input id="vel_down" name="vel_down_1" type="text" class="form-input--underline vel-down" placeholder="DOWN" inputmode="decimal" />\n'
        + '      <input id="vel_up" name="vel_up_1" type="text" class="form-input--underline vel-up" placeholder="UP" inputmode="decimal" />\n'
        + '      <input id="vel_ping" name="vel_ping_1" type="text" class="form-input--underline vel-ping" placeholder="PING" inputmode="numeric" />\n'
        + '    </div>\n'
        + '    <label class="form-label" for="vel_device_1">Informe em qual dispositivo você realizou esse teste:</label>\n'
        + '    <input id="vel_device_1" name="vel_device_1" type="text" class="form-input--underline vel-device" placeholder="Ex.: Notebook do cliente, celular do técnico..." />\n'
        + '    <label class="form-label">O teste foi realizado via:</label>\n'
        + '    <div class="segmented vel-via" role="radiogroup" aria-label="Teste realizado via">\n'
        + '      <input type="radio" id="vel_via_1_cabo" name="vel_via_1" value="cabo">\n'
        + '      <label for="vel_via_1_cabo">Cabo de rede</label>\n'
        + '      <input type="radio" id="vel_via_1_wifi" name="vel_via_1" value="wifi">\n'
        + '      <label for="vel_via_1_wifi">Wi-Fi</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="veltest_prints" data-when-in="sim,nao" data-clear-on-hide="1" data-veltest-add="1">\n'
        + '    <button type="button" class="btn-ghost vel-add"><i class="fa-solid fa-plus"></i> Adicionar outro teste realizado</button>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="veltest_prints" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="vel_motivo_nao_anexar">Motivo de não anexar as fotos do resultado do teste de velocidade:</label>\n'
        + '    <input id="vel_motivo_nao_anexar" name="vel_motivo_nao_anexar" type="text" class="form-input--underline" placeholder="Descreva o motivo..." />\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="veltest_prints" data-when-equals="nao-realizado" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="vel_motivo_nao_realizar">Motivo de não realizar o teste de velocidade:</label>\n'
        + '    <input id="vel_motivo_nao_realizar" name="vel_motivo_nao_realizar" type="text" class="form-input--underline" placeholder="Descreva o motivo..." />\n'
        + '  </div>\n'
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-people-group"></i> EQUIPE EXTERNA</div>\n'
        + '    <div class="form-subtitle">Se necessário, encaminhe para a equipe de carro</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Necessário encaminhar equipe externa:</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Necessário encaminhar equipe externa?">\n'
        + '      <input type="radio" id="enc_ext_sim" name="encaminhar_equipe_externa" value="sim">\n'
        + '      <label for="enc_ext_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="enc_ext_nao" name="encaminhar_equipe_externa" value="nao">\n'
        + '      <label for="enc_ext_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<div class="form-actions">\n'
        + '  <button id="btnLimparForm" type="button" class="btn-action btn-action--gray"><i class="fa-solid fa-eraser"></i> Limpar respostas</button>\n'
        + '  <button id="btnCopiarForm" type="button" class="btn-action btn-action--red"><i class="fa-solid fa-copy"></i> Copiar</button>\n'
          + '</div>';
          try {
            const navBlock = root.querySelector('#nav_ativos')?.closest('.form-block');
            const limpezaBlock = root.querySelector('#limpeza_sim')?.closest('.form-block');
            if (navBlock && limpezaBlock) {
              // posiciona o bloco de Teste de navegação logo após o bloco de limpeza
              /* nav será reposicionado após Conferências */
              // cria e posiciona o bloco "Mapa de calor" imediatamente abaixo do Teste de navegação
              let mapaBlock = root.querySelector('#mapa_calor_desc')?.closest('.form-block');
              if (!mapaBlock) {
                mapaBlock = document.createElement('div');
                mapaBlock.className = 'form-block';
                mapaBlock.innerHTML =
                  '    <label class="form-label">Mapa de calor</label>\n'
                + '    <div class="form-hint" style="margin-top:6px;">Descrição geral do teste realizado, incluindo se toda a casa foi inspecionada, identificação de possíveis pontos de sombra e a reação do cliente às informações fornecidas.</div>\n'
                + '    <textarea id="mapa_calor_desc" name="mapa_calor_desc" class="form-input--underline auto-expand" placeholder="Digite..." rows="2" data-min-height="90"></textarea>\n';
              }
              /* mapa será reposicionado após Conferências/Navegação */

              // bloco: Conferências nos roteadores
              let confRotBlock = root.querySelector('[data-conf-rot="1"]');
              if (!confRotBlock) {
                confRotBlock = document.createElement('div');
                confRotBlock.className = 'form-block';
                confRotBlock.setAttribute('data-conf-rot','1');
                confRotBlock.innerHTML =
                  '    <label class="form-label">Conferências nos roteadores</label>\\n'
                + '    <div class="form-hint" style="margin-top:6px;margin-bottom:12px;">Selecione as modificações realizadas na configuração dos roteadores do cliente.</div>\\n'
                + '    <div class="choices" style="display:flex;flex-direction:row;gap:12px;align-items:center;flex-wrap:wrap;">\\n'
                + '      <label class="choice"><input type="checkbox" id="conf_dns" name="conf_dns"><span>DNS configurado:</span></label>\\n'
                + '    </div>\\n'
                + '    <div class="form-block" data-when-field="conf_dns" data-when-equals="true" data-clear-on-hide="1" hidden style="border:none;background:transparent;box-shadow:none;padding:4px 0 0 12px;margin-top:2px;">\\n'
                + '      <div class="choices" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">\\n'
                + '        <label class="choice"><input type="checkbox" id="dns_etecc" name="dns_etecc"><span>Etecc</span></label>\\n'
                + '        <label class="choice"><input type="checkbox" id="dns_google" name="dns_google"><span>Google</span></label>\\n'
                + '        <label class="choice"><input type="checkbox" id="dns_outro" name="dns_outro"><span>Outro</span></label>\\n'
                + '      </div>\\n'
                + '    </div>\\n'
                + '    <div class="form-block" data-when-field="dns_outro" data-when-equals="true" data-clear-on-hide="1" hidden style="border:none;background:transparent;box-shadow:none;padding:4px 0 0 24px;margin-top:2px;">\\n'
                + '      <label class="form-label" for="dns_outro_val">Qual foi o DNS utilizado?</label>\\n'
                + '      <input id="dns_outro_val" name="dns_outro_val" type="text" class="form-input--underline" placeholder="Digite o DNS..." />\\n'
                + '    </div>\\n'
                + '    <div class="choices" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;margin-top:8px;">\\n'
                + '      <label class="choice"><input type="checkbox" id="upnp_ok" name="upnp_ok"><span>UPnP: Verifiquei/Habilitei</span></label>\\n'
                + '      <label class="choice"><input type="checkbox" id="ipv6_slaac" name="ipv6_slaac"><span>IPv6: Ativado no protocolo SLAAC</span></label>\\n'
                + '      <label class="choice"><input type="checkbox" id="lb24_parent" name="lb24_parent"><span>Largura de banda da rede 2.4:</span></label>\\n'
                + '    </div>\\n'
                + '    <div class="form-block" data-when-field="lb24_parent" data-when-equals="true" data-clear-on-hide="1" hidden style="border:none;background:transparent;box-shadow:none;padding:4px 0 0 12px;margin-top:2px;">\\n'
                + '      <div class="choices" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">\\n'
                + '        <label class="choice"><input type="checkbox" id="lb24_20" name="lb24_20"><span>20MHz</span></label>\\n'
                + '        <label class="choice"><input type="checkbox" id="lb24_40" name="lb24_40"><span>40MHz</span></label>\\n'
                + '        <label class="choice"><input type="checkbox" id="lb24_20_40" name="lb24_20_40"><span>20/40MHz</span></label>\\n'
                + '      </div>\\n'
                + '    </div>\\n'
                + '    <div class="choices" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;margin-top:8px;">\\n'
                + '      <label class="choice"><input type="checkbox" id="acesso_remoto" name="acesso_remoto"><span>Acesso remoto: Confirmei se os IPs estavam corretos e, se necessário, reconfigurei para os padrões de acesso remoto</span></label>\\n'
                + '    </div>\\n'
                + '    <label class="form-label" style="margin-top:10px;">Quantidade de ativos acima do normal?</label>\\n'
                + '    <div class="choices" style="display:flex;flex-direction:row;gap:12px;align-items:center;flex-wrap:wrap;">\\n'
                + '      <label class="choice"><input type="checkbox" id="qtd_acima_sim" name="qtd_acima_sim"><span>Sim</span></label>\\n'
                + '      <label class="choice"><input type="checkbox" id="qtd_acima_nao" name="qtd_acima_nao"><span>Não</span></label>\\n'
                + '    </div>\\n'
                + '    <div class="form-block" data-when-field="qtd_acima" data-when-equals="true" data-clear-on-hide="1" hidden style="border:none;background:transparent;box-shadow:none;padding:4px 0 0 12px;margin-top:12px;">\\n'
                + '      <label class="form-label" for="qtd_acima_val">Informe a quantidade de ativos conectados</label>\\n'
                + '      <input id="qtd_acima_val" name="qtd_acima_val" type="text" class="form-input--underline" placeholder="Digite o valor..." inputmode="numeric" />\\n'
                + '    </div>\\n'
                + '    <label class="form-label" style="margin-top:10px;">Tempo de atividade acima do normal?</label>\\n'
                + '    <div class="choices" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;">\\n'
                + '      <label class="choice"><input type="checkbox" id="tempo_acima_sim" name="tempo_acima_sim"><span>Sim</span></label>\\n'
                + '      <label class="choice"><input type="checkbox" id="tempo_acima_nao" name="tempo_acima_nao"><span>Não</span></label>\\n'
                + '    </div>\\n'
                + '    <div class="form-block" data-when-field="tempo_acima" data-when-equals="true" data-clear-on-hide="1" hidden style="border:none;background:transparent;box-shadow:none;padding:4px 0 0 12px;margin-top:12px;">\\n'
                + '      <label class="form-label" for="tempo_acima_val">Informe o tempo de atividade</label>\\n'
                + '      <input id="tempo_acima_val" name="tempo_acima_val" type="text" class="form-input--underline" placeholder="Digite o tempo..." />\\n'
                + '    </div>\\n'
                + '    <label class="form-label" for="rot_obs" style="margin-top:10px;">Observações adicionais</label>\\n'
                + '    <div class="form-hint" style="margin-top:6px;">Registre observações sobre configurações realizadas além desta lista ou detalhes adicionais relacionados à rede do cliente.</div>\\n'
                + '    <textarea id="rot_obs" name="rot_obs" class="form-input--underline auto-expand" placeholder="Descreva mais informações..." rows="3" data-min-height="90"></textarea>\\n';
              }
              limpezaBlock.insertAdjacentElement('afterend', confRotBlock);

              // Reposiciona Teste de navegação abaixo de Conferências
              if (navBlock) confRotBlock.insertAdjacentElement('afterend', navBlock);

              // Reposiciona Mapa de calor abaixo de Navegação (ou Conferências, se não houver)
              const __afterNav = navBlock || confRotBlock;
              if (mapaBlock && __afterNav) __afterNav.insertAdjacentElement('afterend', mapaBlock);


              // Ajustes pós-inserção: espaçamento, textarea DNS, e botões segmentados
              try {
                // 1) Espaçamento da legenda do Teste de navegação
                const navHint = navBlock?.querySelector('.form-hint');
                if (navHint) navHint.style.marginBottom = '10px';

                const confBlock = root.querySelector('[data-conf-rot="1"]');
                if (confBlock) {
                  // Atualiza a legenda principal do bloco de conferências
                  try {
                    const mainHint = confBlock.querySelector('.form-hint');
                    if (mainHint) mainHint.textContent = 'Selecione as verificações e modificações realizadas na configuração dos roteadores do cliente.';
                  } catch {}
                  // 2) DNS Outro: transformar em textarea de 1 linha com novo rótulo/placeholder
                  try {
                    const dnsOutroBlk = confBlock.querySelector('.form-block[data-when-field="dns_outro"]');
                    if (dnsOutroBlk) {
                      const lbl = dnsOutroBlk.querySelector('label.form-label');
                      if (lbl) lbl.textContent = 'Informe qual foi o DNS utilizado';
                      const oldInput = dnsOutroBlk.querySelector('#dns_outro_val');
                      if (oldInput) {
                        const ta = document.createElement('textarea');
                        ta.id = 'dns_outro_val';
                        ta.name = 'dns_outro_val';
                        ta.className = 'form-input--underline auto-expand';
                        ta.placeholder = 'Digite...';
                        ta.rows = 1;
                        ta.setAttribute('data-min-height','32');
                        oldInput.replaceWith(ta);
                      }
                    }
                  } catch {}

                  // 3) Quantidade de ativos: converter checkboxes em botões segmentados (Sim/Não)
                  try {
                    const qLabel = Array.from(confBlock.querySelectorAll('label.form-label')).find(el => (el.textContent||'').trim().toLowerCase().startsWith('quantidade de ativos acima do normal'));
                    const qChoices = qLabel ? qLabel.nextElementSibling : null;
                    if (qLabel && qChoices && qChoices.classList.contains('choices')) {
                      const seg = document.createElement('div');
                      seg.className = 'segmented';
                      seg.setAttribute('role','radiogroup');
                      seg.setAttribute('aria-label', qLabel.textContent || '');
                      seg.innerHTML = ''
                        + '      <input type="radio" id="qtd_acima_sim" name="qtd_acima" value="sim">'
                        + '      <label for="qtd_acima_sim"><i class="fa-solid fa-check"></i> Sim</label>'
                        + '      <input type="radio" id="qtd_acima_nao" name="qtd_acima" value="nao">'
                        + '      <label for="qtd_acima_nao"><i class="fa-solid fa-xmark"></i> Não</label>';
                      qChoices.replaceWith(seg);
                    }
                    const qValBlk = confBlock.querySelector('.form-block[data-when-field="qtd_acima"]');
                    if (qValBlk) { qValBlk.setAttribute('data-when-field','qtd_acima'); qValBlk.setAttribute('data-when-equals','sim'); }
                  } catch {}

                  // 4) Tempo de atividade: converter checkboxes em botões segmentados (Sim/Não)
                  try {
                    const tLabel = Array.from(confBlock.querySelectorAll('label.form-label')).find(el => (el.textContent||'').trim().toLowerCase().startsWith('tempo de atividade acima do normal'));
                    const tChoices = tLabel ? tLabel.nextElementSibling : null;
                    if (tLabel && tChoices && tChoices.classList.contains('choices')) {
                      const seg2 = document.createElement('div');
                      seg2.className = 'segmented';
                      seg2.setAttribute('role','radiogroup');
                      seg2.setAttribute('aria-label', tLabel.textContent || '');
                      seg2.innerHTML = ''
                        + '      <input type="radio" id="tempo_acima_sim" name="tempo_acima" value="sim">'
                        + '      <label for="tempo_acima_sim"><i class="fa-solid fa-check"></i> Sim</label>'
                        + '      <input type="radio" id="tempo_acima_nao" name="tempo_acima" value="nao">'
                        + '      <label for="tempo_acima_nao"><i class="fa-solid fa-xmark"></i> Não</label>';
                      tChoices.replaceWith(seg2);
                    }
                    const tValBlk = confBlock.querySelector('.form-block[data-when-field="tempo_acima"]');
                    if (tValBlk) { tValBlk.setAttribute('data-when-field','tempo_acima'); tValBlk.setAttribute('data-when-equals','sim'); }
                  } catch {}
                }
              } catch {}
            }
          } catch {}
          try { appendIndicacaoSection(root); } catch {}
          try { appendLentidaoTests(root); } catch {}
        }
    },
    'retencao-clientes': {
      equipe: 'moto',
      titulo: 'Retenção de Clientes',
      descricao: 'Coleta de informações e registro de retenção',
      icon: 'fa-user-shield',
      badge: 'violet',
      atualizadoEm: '09/09/2025 00:23',
      render: (root) => {
        root.innerHTML = ''+
        '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-id-card"></i> Informações do Cliente</div>\n'
        + '    <div class="form-subtitle">Preencha o nome do cliente</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="clienteNome">Nome do cliente</label>\n'
        + '    <input id="clienteNome" name="clienteNome" type="text" class="form-input" placeholder="Ex.: João Silva" autocomplete="name" />\n'
        + '  </div>\n'
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-location-dot"></i> ENDEREÇO E INFORMAÇÕES DA O.S</div>\n'
        + '    <div class="form-subtitle">Dados iniciais do atendimento</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foto da frente da casa anexada no MK?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto frente anexada?">\n'
        + '      <input type="radio" id="ret_mkfoto_sim" name="ret_mkfoto" value="sim">\n'
        + '      <label for="ret_mkfoto_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_mkfoto_nao" name="ret_mkfoto" value="nao">\n'
        + '      <label for="ret_mkfoto_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-square-check"></i> INFORMAÇÕES DO ATENDIMENTO</div>\n'
        + '    <div class="form-subtitle">Detalhes do atendimento e condições</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foi atendido no local?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foi atendido no local?">\n'
        + '      <input type="radio" id="ret_atendido_sim" name="ret_atendido_local" value="sim">\n'
        + '      <label for="ret_atendido_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_atendido_nao" name="ret_atendido_local" value="nao">\n'
        + '      <label for="ret_atendido_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_atendido_local" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">A casa aparenta estar ocupada por moradores?</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Casa ocupada?">\n'
        + '        <input type="radio" id="ret_casa_ocupada_sim" name="ret_casa_ocupada" value="sim">\n'
        + '        <label for="ret_casa_ocupada_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="ret_casa_ocupada_nao" name="ret_casa_ocupada" value="nao">\n'
        + '        <label for="ret_casa_ocupada_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="ret_casa_ocupada" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="ret_just_desocupada">Justifique por que a casa aparenta estar desocupada:</label>\n'
        + '      <textarea id="ret_just_desocupada" name="ret_just_desocupada" class="form-input--underline auto-expand" placeholder="Descreva o motivo..." rows="2" data-min-height="64"></textarea>\n'
        + '      <div class="textarea-counter">0 caracteres</div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="ret_casa_ocupada" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="ret_just_ocupada">Justifique por que a casa aparenta estar ocupada:</label>\n'
        + '      <textarea id="ret_just_ocupada" name="ret_just_ocupada" class="form-input--underline auto-expand" placeholder="Descreva..." rows="2" data-min-height="64"></textarea>\n'
        + '      <div class="textarea-counter">0 caracteres</div>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_atendido_local" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Telefones de contato atualizados:</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="fone_">\n'
        + '      <input type="text" id="fone_1" name="fone_1" class="form-input--underline" placeholder="Ex.: (13) 00000-0000" inputmode="numeric" />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="fone_"><i class="fa-solid fa-plus"></i> Adicionar outro telefone</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_atendido_local" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">O cliente aceitou o acordo proposto na ordem de serviço?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Acordo aceito?">\n'
        + '      <input type="radio" id="ret_acordo_sim" name="ret_acordo_aceito" value="sim">\n'
        + '      <label for="ret_acordo_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_acordo_nao" name="ret_acordo_aceito" value="nao">\n'
        + '      <label for="ret_acordo_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_atendido_local" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Houve alteração na data de vencimento?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Alteração vencimento?">\n'
        + '      <input type="radio" id="ret_venc_alterado_sim" name="ret_venc_alterado" value="sim">\n'
        + '      <label for="ret_venc_alterado_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_venc_alterado_nao" name="ret_venc_alterado" value="nao">\n'
        + '      <label for="ret_venc_alterado_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_venc_alterado" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Qual é o novo dia de vencimento escolhido?</label>\n'
        + '    <div class="segmented segmented--sm" role="radiogroup" aria-label="Novo dia de vencimento">\n'
        + '      <input type="radio" id="ret_novo_venc_05" name="ret_novo_venc" value="05">\n'
        + '      <label for="ret_novo_venc_05">05</label>\n'
        + '      <input type="radio" id="ret_novo_venc_10" name="ret_novo_venc" value="10">\n'
        + '      <label for="ret_novo_venc_10">10</label>\n'
        + '      <input type="radio" id="ret_novo_venc_15" name="ret_novo_venc" value="15">\n'
        + '      <label for="ret_novo_venc_15">15</label>\n'
        + '      <input type="radio" id="ret_novo_venc_20" name="ret_novo_venc" value="20">\n'
        + '      <label for="ret_novo_venc_20">20</label>\n'
        + '      <input type="radio" id="ret_novo_venc_25" name="ret_novo_venc" value="25">\n'
        + '      <label for="ret_novo_venc_25">25</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_atendido_local" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Informações negociadas com vizinho, amigo, parente ou outra pessoa além do titular?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Negociado com terceiro?">\n'
        + '      <input type="radio" id="ret_neg_terceiro_sim" name="ret_neg_terceiro" value="sim">\n'
        + '      <label for="ret_neg_terceiro_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_neg_terceiro_nao" name="ret_neg_terceiro" value="nao">\n'
        + '      <label for="ret_neg_terceiro_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_neg_terceiro" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="ret_quem_terceiro">Qual é o nome e a relação com a pessoa que atendeu no local (ex.: vizinho, amigo, parente)?</label>\n'
        + '    <input id="ret_quem_terceiro" name="ret_quem_terceiro" type="text" class="form-input--underline" placeholder="Ex.: João Silva, vizinho; Maria Oliveira, irmã..." />\n'
        + '  </div>\n'
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-file-lines"></i> FINALIZAÇÃO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="descricao_os">Relato geral da ordem de serviço:</label>\n'
        + '    <textarea id="descricao_os" name="descricao_os" class="form-input--underline auto-expand" placeholder="Descreva os detalhes da execução da ordem de serviço..." rows="4" data-min-height="120"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n' 
        + '</section>\n'
        + '<div class="form-actions">\n'
        + '  <button id="btnLimparForm" type="button" class="btn-action btn-action--gray"><i class="fa-solid fa-eraser"></i> Limpar respostas</button>\n'
        + '  <button id="btnCopiarForm" type="button" class="btn-action btn-action--red"><i class="fa-solid fa-copy"></i> Copiar</button>\n'
        + '</div>'; 

        // Pós-render: visibilidade do aviso da torre (mesmo bloco da pergunta)
        try {
          const updateInvHint = () => {
            try {
              const hint = root.querySelector('#inv_torre_hint');
              const sel = root.querySelector('input[name="inv_rep_torre"]:checked');
              const v = (sel && sel.value || '').toLowerCase();
              if (hint) hint.style.display = (v === 'nao' || v === 'não') ? 'block' : 'none';
            } catch {}
          };
          const radios = root.querySelectorAll('input[name="inv_rep_torre"]');
          radios.forEach(r => r.addEventListener('change', updateInvHint));
          updateInvHint();
        } catch {}

        // Estilo compacto para botões de dia de vencimento (mesma fonte 13px; menor largura)
        try {
          const stId = 'segmentedSmStyle';
          const css = '.segmented--sm{gap:6px;grid-template-columns:repeat(5,minmax(0,1fr))}.segmented--sm label{padding:6px 6px;border-radius:8px;white-space:nowrap}';
          const exist = document.getElementById(stId);
          if (!exist) {
            const st = document.createElement('style');
            st.id = stId;
            st.textContent = css;
            document.head.appendChild(st);
          } else if (exist.textContent !== css) {
            exist.textContent = css;
          }
        } catch {}

        // Retenção: remover form-blocks aninhados. Cada bloco deve ser independente.
        try {
          const scope = root;
          const innerBlocks = Array.from(scope.querySelectorAll('.form-block .form-block'));
          const __anchors = new Map();
          innerBlocks.forEach(inner => {
            try {
              const outer = inner.parentElement;
              if (!outer || !outer.classList || !outer.classList.contains('form-block')) return;
              const pField = outer.getAttribute('data-when-field');
              const pEquals = outer.getAttribute('data-when-equals');
              const pIn = outer.getAttribute('data-when-in');
              // Se o bloco interno não tem gate próprio, herda o gate do pai
              if (!inner.hasAttribute('data-when-field') && pField && (pEquals !== null || pIn !== null)){
                inner.setAttribute('data-when-field', pField);
                if (pEquals !== null && pEquals !== '') inner.setAttribute('data-when-equals', pEquals);
                if (pIn !== null && pIn !== '') inner.setAttribute('data-when-in', pIn);
              } else if (inner.hasAttribute('data-when-field') && pField && (pEquals !== null || pIn !== null)){
                // Caso já tenha gate próprio, adiciona gate do pai como condicional extra
                if (!inner.hasAttribute('data-when-parent-field')) inner.setAttribute('data-when-parent-field', pField);
                if (pEquals !== null && pEquals !== '') inner.setAttribute('data-when-parent-equals', pEquals);
                if (pIn !== null && pIn !== '') inner.setAttribute('data-when-parent-in', pIn);
              }
              // Move para fora do bloco pai, preservando ordem relativa
              const anchor = __anchors.get(outer) || outer;
              anchor.parentNode.insertBefore(inner, anchor.nextSibling);
              __anchors.set(outer, inner);
              outer.__hadChildrenMoved = true;
            } catch {}
          });
          // Remove blocos pais esvaziados
          Array.from(scope.querySelectorAll('.form-block')).forEach(b => {
            try {
              if (b.__hadChildrenMoved){
                const hasInner = !!b.querySelector('.form-block');
                const hasContent = (b.textContent||'').trim() !== '';
                if (!hasInner && !hasContent) b.remove();
              }
            } catch {}
          });
          try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('retencao-clientes', root); } catch {}
        } catch {}
      }
    },
    'retirada-equipamentos': {
      equipe: 'moto',
      titulo: 'Retirada de Equipamentos',
      descricao: 'Registro de cancelamento e retirada em campo',
      icon: 'fa-box-archive',
      badge: 'red',
      render: (root) => {
        root.innerHTML = ''+
        // Sessao 1: Informacoes do Cliente
        '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-id-card"></i> Informações do Cliente</div>\n'
        + '    <div class="form-subtitle">Preencha o nome do cliente</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="clienteNome">Nome do cliente</label>\n'
        + '    <input id="clienteNome" name="clienteNome" type="text" class="form-input" placeholder="Ex.: João Silva" autocomplete="name" />\n'
        + '  </div>\n'
        + '</section>\n'
        // Sessao 2: Endereco e MK
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-location-dot"></i> ENDEREÇO E INFORMAÇÕES DA O.S</div>\n'
        + '    <div class="form-subtitle">Dados iniciais do atendimento</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">A foto da frente da casa foi anexada no MK?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto frente anexada?">\n'
        + '      <input type="radio" id="mkfoto_sim" name="mkfoto" value="sim">\n'
        + '      <label for="mkfoto_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="mkfoto_nao" name="mkfoto" value="nao">\n'
        + '      <label for="mkfoto_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        
        + '</section>\n'
        // Sessao 3: Motivo do cancelamento
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-circle-question"></i> MOTIVO DO CANCELAMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Selecione o informado pelo cliente:</label>\n'
        + '    <div class="segmented segmented--stack" role="radiogroup" aria-label="Motivo do cancelamento">\n'
        + '      <input type="radio" id="mot_fin" name="motivo" value="financeira">\n'
        + '      <label for="mot_fin">Condição financeira</label>\n'
        + '      <input type="radio" id="mot_mud" name="motivo" value="mudanca">\n'
        + '      <label for="mot_mud">Mudança de residência</label>\n'
        + '      <input type="radio" id="mot_perda" name="motivo" value="perda">\n'
        + '      <label for="mot_perda">Perda do equipamento</label>\n'
        + '      <input type="radio" id="mot_troca" name="motivo" value="troca-provedor">\n'
        + '      <label for="mot_troca">Troca de provedor</label>\n'
        + '      <input type="radio" id="mot_insat" name="motivo" value="insatisfacao">\n'
        + '      <label for="mot_insat">Insatisfação técnica</label>\n'
        + '      <input type="radio" id="mot_obito" name="motivo" value="obito">\n'
        + '      <label for="mot_obito">Óbito do titular</label>\n'
        + '      <input type="radio" id="mot_outros" name="motivo" value="outros">\n'
        + '      <label for="mot_outros">Outros</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="motivo" data-when-equals="troca-provedor" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="mot_troca_ident">Informe como foi identificado este motivo:</label>\n'
        + '    <textarea id="mot_troca_ident" name="mot_troca_ident" class="form-input--underline auto-expand" placeholder="Ex.: O próprio cliente informou / Identifiquei um drop de outro provedor no local." rows="2" data-min-height="80"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="motivo" data-when-equals="insatisfacao" data-clear-on-hide="1">\n'
        + '    <div class="form-header">\n'
        + '      <div class="form-title"><i class="fa-regular fa-face-frown"></i> INSATISFAÇÃO TÉCNICA</div>\n'
        + '    </div>\n'
        + '    <label class="form-label">O cliente recebeu visita técnica?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Recebeu visita técnica?">\n'
        + '      <input type="radio" id="insat_visita_sim" name="insat_visita" value="sim">\n'
        + '      <label for="insat_visita_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="insat_visita_nao" name="insat_visita" value="nao">\n'
        + '      <label for="insat_visita_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '    <label class="form-label" style="margin-top:10px;">As expectativas foram atendidas?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Expectativas atendidas?">\n'
        + '      <input type="radio" id="insat_exp_sim" name="insat_expect" value="sim">\n'
        + '      <label for="insat_exp_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="insat_exp_nao" name="insat_expect" value="nao">\n'
        + '      <label for="insat_exp_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '    <label class="form-label" for="insat_relato" style="margin-top:10px;">Descreva o relato do cliente:</label>\n'
        + '    <textarea id="insat_relato" name="insat_relato" class="form-input--underline auto-expand" placeholder="Digite o relato do cliente..." rows="3" data-min-height="100"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="motivo" data-when-equals="outros" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="mot_outros_desc">Descreva qual seria o motivo do cancelamento:</label>\n'
        + '    <input id="mot_outros_desc" name="mot_outros_desc" type="text" class="form-input--underline" placeholder="Digite..." />\n'
        + '  </div>\n'
        + '</section>\n'
        // Sessao 4: Retirada de equipamento
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-box-archive"></i> RETIRADA DE EQUIPAMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" id="lbl_ret_equip">Os equipamentos foram retirados?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Equipamentos retirados?">\n'
        + '      <input type="radio" id="ret_equip_sim" name="ret_equip" value="sim">\n'
        + '      <label for="ret_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_equip_nao" name="ret_equip" value="nao">\n'
        + '      <label for="ret_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_equip" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="ret_equip_motivo">Descreva o motivo de não ter retirado:</label>\n'
        + '    <textarea id="ret_equip_motivo" name="ret_equip_motivo" class="form-input--underline auto-expand" placeholder="Digite o motivo..." rows="3" data-min-height="100"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Informe quais equipamentos foram retirados <span class="form-hint">(múltipla escolha)</span>:</label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_ont" name="eq_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_onu" name="eq_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_rot" name="eq_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_outro" name="eq_sel_outro"><span>Outros</span></label>\n'
        + '    </div>\n'
        + '    <div class="form-hint" style="margin-top:6px;">Insira os MACs dos equipamentos retirados nos campos abaixo.</div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT:</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ont_mac_">\n'
        + '      <input type="text" id="ont_mac_1" name="ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU:</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="onu_mac_">\n'
        + '      <input type="text" id="onu_mac_1" name="onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador:</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="rot_mac_">\n'
        + '      <input type="text" id="rot_mac_1" name="rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos retirados:</label>\n'
        + '    <div class="outro-list" data-outro-list="1">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">As fontes foram retiradas?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Fontes retiradas?">\n'
        + '      <input type="radio" id="ret_fontes_sim" name="ret_fontes" value="sim">\n'
        + '      <label for="ret_fontes_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_fontes_nao" name="ret_fontes" value="nao">\n'
        + '      <label for="ret_fontes_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foto dos equipamentos retirados anexa?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto de equipamentos retirada?">\n'
        + '      <input type="radio" id="ret_fotoequip_sim" name="ret_fotoequip" value="sim">\n'
        + '      <label for="ret_fotoequip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_fotoequip_nao" name="ret_fotoequip" value="nao">\n'
        + '      <label for="ret_fotoequip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        // Sessao final: Descricao da OS
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-file-lines"></i> FINALIZAÇÃO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="descricao_os">Descreva detalhes adicionais sobre o atendimento:</label>\n'
        + '    <textarea id="descricao_os" name="descricao_os" class="form-input--underline auto-expand" placeholder="Descreva os detalhes da execução da ordem de serviço..." rows="4" data-min-height="120"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<div class="form-actions">\n'
        + '  <button id="btnLimparForm" type="button" class="btn-action btn-action--gray"><i class="fa-solid fa-eraser"></i> Limpar respostas</button>\n'
        + '  <button id="btnCopiarForm" type="button" class="btn-action btn-action--red"><i class="fa-solid fa-copy"></i> Copiar</button>\n'
        + '</div>';
      }
    }
    ,
    'instalacoes-mudancas': {
      equipe: 'carro',
      titulo: 'Instalações e Mudanças de Endereço',
      descricao: 'Registro de instalação ou mudança de endereço',
      icon: 'fa-house',
      badge: 'red',
      render: (root) => {
        root.innerHTML = ''+
        // Seção 1: Informações do Cliente
        '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-id-card"></i> Informações do Cliente</div>\n'
        + '    <div class="form-subtitle">Preencha quem acompanhou</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="clienteNome">Quem acompanhou</label>\n'
        + '    <input id="clienteNome" name="clienteNome" type="text" class="form-input" placeholder="Ex.: Maria Souza" autocomplete="name" />\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 2: Endereço e informações
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-location-dot"></i> ENDEREÇO E INFORMAÇÕES DA O.S</div>\n'
        + '    <div class="form-subtitle">Captura automática da localização</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">A foto da frente da casa foi anexada no MK?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto frente anexada?">\n'
        + '      <input type="radio" id="mkfoto_sim" name="mkfoto" value="sim">\n'
        + '      <label for="mkfoto_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="mkfoto_nao" name="mkfoto" value="nao">\n'
        + '      <label for="mkfoto_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
         + '  <div class="form-block">\n'
        + '    <label class="form-label">As fotos dos equipamentos e da instalação foram anexadas?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Fotos de equipamentos e instalação anexadas?">\n'
        + '      <input type="radio" id="im_fotos_equip_sim" name="im_fotos_equip" value="sim">\n'
        + '      <label for="im_fotos_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="im_fotos_equip_nao" name="im_fotos_equip" value="nao">\n'
        + '      <label for="im_fotos_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="im_fotos_equip" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="im_fotos_equip_just">Justifique o motivo de não ter anexado:</label>\n'
        + '    <input id="im_fotos_equip_just" name="im_fotos_equip_just" type="text" class="form-input--underline" placeholder="Digite..." />\n'
         + '  </div>\n'
        + '  <div class="form-cond" data-when-field="tipo_serv" data-when-equals="cabeamento" data-clear-on-hide="1">\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Cabeamento viável:</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Cabeamento viável?">\n'
        + '        <input type="radio" id="cd_viavel_sim" name="cd_viavel" value="sim">\n'
        + '        <label for="cd_viavel_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_viavel_nao" name="cd_viavel" value="nao">\n'
        + '        <label for="cd_viavel_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Há passagem adequada para o cabo de rede (Ex.: Conduite):</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Passagem adequada?">\n'
        + '        <input type="radio" id="cd_passagem_sim" name="cd_passagem" value="sim">\n'
        + '        <label for="cd_passagem_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_passagem_nao" name="cd_passagem" value="nao">\n'
        + '        <label for="cd_passagem_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_trajeto_obs">Observações sobre o trajeto do cabo de rede:</label>\n'
        + '      <textarea id="cd_trajeto_obs" name="cd_trajeto_obs" class="form-input--underline auto-expand" placeholder="Explique o trajeto do cabo de rede Ex.: Necessário passar por cima do forro..." rows="3" data-min-height="90"></textarea>\n'
        + '      <div class="textarea-counter">0 caracteres</div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_qt_cabos">Quantos cabos de rede foram passados?</label>\n'
        + '      <input id="cd_qt_cabos" name="cd_qt_cabos" type="text" inputmode="decimal" class="form-input--underline" placeholder="Ex.: 2" />\n'
        + '      <input id="cd_cabos_multi" name="cd_cabos_multi" type="hidden" value="nao" />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_quais_disp">Quais dispositivos foram cabeados:</label>\n'
        + '      <input id="cd_quais_disp" name="cd_quais_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_qual_disp">Qual dispositivo foi cabeado:</label>\n'
        + '      <input id="cd_qual_disp" name="cd_qual_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="cd_cabometros">Metragem de cabo de rede total para este serviço:</label>\n'
        + '      <input id="cd_cabometros" name="cd_cabometros" type="text" inputmode="decimal" class="form-input--underline" placeholder="Digite a metragem, ex.: 10m" />\n'
        + '      <div class="form-hint" id="cd_cabocusto" style="margin-top:6px;">Previsão de custos sobre este cabeamento: R$0,00</div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">O cabeamento é na mesma residência?</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Mesma residência?">\n'
        + '        <input type="radio" id="cd_mesma_res_sim" name="cd_mesma_res" value="sim">\n'
        + '        <label for="cd_mesma_res_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="cd_mesma_res_nao" name="cd_mesma_res" value="nao">\n'
        + '        <label for="cd_mesma_res_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_desc_onde">Neste caso informe para onde o cabo foi passado:</label>\n'
        + '      <input id="cd_desc_onde" name="cd_desc_onde" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '      <label class="form-label">Informe para qual cômodo foi este cabo:</label>\n'
        + '      <div class="segmented segmented--stack" role="radiogroup" aria-label="Cômodo">\n'
        + '        <input type="radio" id="cd_comodo_sala" name="cd_comodo" value="sala">\n'
        + '        <label for="cd_comodo_sala">Sala</label>\n'
        + '        <input type="radio" id="cd_comodo_quarto" name="cd_comodo" value="quarto">\n'
        + '        <label for="cd_comodo_quarto">Quarto</label>\n'
        + '        <input type="radio" id="cd_comodo_area" name="cd_comodo" value="area">\n'
        + '        <label for="cd_comodo_area">Área</label>\n'
        + '        <input type="radio" id="cd_comodo_cozinha" name="cd_comodo" value="cozinha">\n'
        + '        <label for="cd_comodo_cozinha">Cozinha</label>\n'
        + '        <input type="radio" id="cd_comodo_outros" name="cd_comodo" value="outros">\n'
        + '        <label for="cd_comodo_outros">Outros</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block" data-when-field="cd_comodo" data-when-equals="outros" data-clear-on-hide="1">\n'
        + '      <label class="form-label" for="cd_instal_local">Neste caso descreva para onde o cabo de rede foi passado:</label>\n'
        + '      <input id="cd_instal_local" name="cd_instal_local" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 3: Informações do atendimento
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-square-check"></i> INFORMAÇÕES DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Serviço executado:</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Tipo de serviço">\n'
        + '      <input type="radio" id="tipo_serv_inst" name="tipo_serv" value="instalacao">\n'
        + '      <label for="tipo_serv_inst">Instalação</label>\n'
        + '      <input type="radio" id="tipo_serv_mud" name="tipo_serv" value="mudanca">\n'
        + '      <label for="tipo_serv_mud">Mudança de endereço</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foi necessário pedir abertura de caixa?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Abertura de caixa?">\n'
        + '      <input type="radio" id="ab_caixa_sim" name="ab_caixa" value="sim">\n'
        + '      <label for="ab_caixa_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ab_caixa_nao" name="ab_caixa" value="nao">\n'
        + '      <label for="ab_caixa_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ab_caixa" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">A caixa foi aberta antes do fim da instalação:</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Caixa aberta antes?">\n'
        + '      <input type="radio" id="cx_aberta_antes_sim" name="cx_aberta_antes" value="sim">\n'
        + '      <label for="cx_aberta_antes_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="cx_aberta_antes_nao" name="cx_aberta_antes" value="nao">\n'
        + '      <label for="cx_aberta_antes_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
         + '  <div class="form-block" data-when-field="cx_aberta_antes" data-when-equals="sim" data-clear-on-hide="1">\n'
         + '    <label class="form-label" for="cx_ident1">Identificação da CTO que atende ao cliente:</label>\n'
         + '    <input id="cx_ident1" name="cx_ident1" type="text" class="form-input--underline" placeholder="Informe a caixa aqui..." />\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="cx_aberta_antes" data-when-equals="sim" data-clear-on-hide="1">\n'
         + '    <label class="form-label" for="sinal_fibra">Sinal da fibra na PTO:</label>\n'
         + '    <input id="sinal_fibra" name="sinal_fibra" data-sinal-fibra="1" type="text" class="form-input--underline" inputmode="decimal" placeholder="-00.00" />\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="ab_caixa" data-when-equals="nao" data-clear-on-hide="1">\n'
         + '    <label class="form-label" for="cx_ident2">Identificação da CTO que atende ao cliente:</label>\n'
         + '    <input id="cx_ident2" name="cx_ident2" type="text" class="form-input--underline" placeholder="Informe a caixa aqui..." />\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="ab_caixa" data-when-equals="nao" data-clear-on-hide="1">\n'
         + '    <label class="form-label" for="sinal_fibra2">Sinal da fibra na PTO:</label>\n'
         + '    <input id="sinal_fibra2" name="sinal_fibra2" data-sinal-fibra="1" type="text" class="form-input--underline" inputmode="decimal" placeholder="-00.00" />\n'
         + '  </div>\n'
         + '  <div class="form-block">\n'
         + '    <label class="form-label">Foi necessário passar cabo de rede?</label>\n'
         + '    <div class="segmented" role="radiogroup" aria-label="Passou cabo de rede?">\n'
         + '      <input type="radio" id="cab_rede_sim" name="cab_rede" value="sim">\n'
         + '      <label for="cab_rede_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
         + '      <input type="radio" id="cab_rede_nao" name="cab_rede" value="nao">\n'
         + '      <label for="cab_rede_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
         + '    </div>\n' 
         + '  </div>\n' 
         + '  <div class="form-block" data-when-field="mud_trouxe_ont" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">MAC ONT (trazido pelo cliente):</label>\n'
         + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="mud_ont_mac_">\n'
         + '      <input type="text" id="mud_ont_mac_1" name="mud_ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
         + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="mud_ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="mud_trouxe_onu" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">MAC ONU (trazido pelo cliente):</label>\n'
         + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="mud_onu_mac_">\n'
         + '      <input type="text" id="mud_onu_mac_1" name="mud_onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
         + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="mud_onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="mud_trouxe_rot" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">MAC Roteador (trazido pelo cliente):</label>\n'
         + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="mud_rot_mac_">\n'
         + '      <input type="text" id="mud_rot_mac_1" name="mud_rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
         + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="mud_rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="mud_trouxe_outro" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">Descreva os outros equipamentos trazidos:</label>\n'
         + '    <div class="outro-list" data-outro-list="1" data-outro-name-prefix="mud_outro_nome_" data-outro-mac-prefix="mud_outro_mac_">\n'
         + '      <div class="outro-rows"></div>\n'
         + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="cab_rede" data-when-equals="sim" data-clear-on-hide="1">\n'
         + '    <label class="form-label" for="qtd_cabos">Quantos cabos de rede foram passados?</label>\n'
         + '    <input id="qtd_cabos" name="qtd_cabos" type="text" inputmode="decimal" class="form-input--underline" placeholder="Ex.: 2" />\n'
         + '    <input id="cabos_multi" name="cabos_multi" type="hidden" value="nao" />\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="cabos_multi" data-when-equals="sim" data-clear-on-hide="1">\n'
         + '    <label class="form-label" for="quais_disp">Quais dispositivos foram cabeados:</label>\n'
         + '    <input id="quais_disp" name="quais_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="cabos_multi" data-when-equals="nao" data-clear-on-hide="1">\n'
         + '    <label class="form-label" for="qual_disp">Qual dispositivo foi cabeado:</label>\n'
         + '    <input id="qual_disp" name="qual_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="cab_rede" data-when-equals="sim" data-clear-on-hide="1">\n'
         + '    <label class="form-label" for="cabometros">Metragem de cabo de rede para este serviço:</label>\n'
         + '    <input id="cabometros" name="cabometros" type="text" inputmode="decimal" class="form-input--underline" placeholder="Digite a metragem, ex.: 10m" />\n'
         + '    <div class="form-hint" id="cabocusto" style="margin-top:6px;">Previsão de custos sobre este cabeamento: R$0,00</div>\n'
         + '  </div>\n'
         
         + '  ' // (equipamentos do atendimento movido para seção própria)\n'
         + '</section>\n'
         // Seção 4: Equipamentos do atendimento (movido para sua própria seção)
         + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-screwdriver-wrench"></i> EQUIPAMENTOS DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="tipo_serv" data-when-equals="mudanca" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Equipamentos que o cliente trouxe na mudança: <span class="form-hint">(múltipla escolha)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="mud_trouxe_ont" name="mud_trouxe_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="mud_trouxe_onu" name="mud_trouxe_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="mud_trouxe_rot" name="mud_trouxe_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="mud_trouxe_outro" name="mud_trouxe_outro"><span>Outros</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="tipo_serv" data-when-equals="mudanca" data-clear-on-hide="1">\n'
        + '    <label class="form-label" id="lbl_ret_equip">Foi retirado algum equipamento:</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Retirado equipamento por troca?">\n'
        + '      <input type="radio" id="ret_equip_sim" name="ret_equip" value="sim">\n'
         + '      <label for="ret_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
         + '      <input type="radio" id="ret_equip_nao" name="ret_equip" value="nao">\n'
         + '      <label for="ret_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="ret_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
         + '    <label class="form-label">Selecione o equipamento retirado e insira seu MAC: <span class="form-hint">(múltipla escolha)</span></label>\n'
         + '    <div class="choices">\n'
         + '      <label class="choice"><input type="checkbox" id="eq_sel_ont" name="eq_sel_ont"><span>ONT</span></label>\n'
         + '      <label class="choice"><input type="checkbox" id="eq_sel_onu" name="eq_sel_onu"><span>ONU</span></label>\n'
         + '      <label class="choice"><input type="checkbox" id="eq_sel_rot" name="eq_sel_rot"><span>Roteador</span></label>\n'
         + '      <label class="choice"><input type="checkbox" id="eq_sel_outro" name="eq_sel_outro"><span>Outros</span></label>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="eq_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">MAC ONT (retirado):</label>\n'
         + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ont_mac_">\n'
         + '      <input type="text" id="ont_mac_1" name="ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
         + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="eq_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">MAC ONU (retirado):</label>\n'
         + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="onu_mac_">\n'
         + '      <input type="text" id="onu_mac_1" name="onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
         + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="eq_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">MAC Roteador (retirado):</label>\n'
         + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="rot_mac_">\n'
         + '      <input type="text" id="rot_mac_1" name="rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
         + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="eq_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">Descreva os outros equipamentos retirados:</label>\n'
         + '    <div class="outro-list" data-outro-list="1">\n'
         + '      <div class="outro-rows"></div>\n'
         + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block">\n'
         + '    <label class="form-label" data-label-default="Foi inserido algum equipamento no local:" data-label-mudanca="Foi inserido algum equipamento a mais no local:">Foi inserido algum equipamento a mais no local:</label>\n'
         + '    <div class="segmented" role="radiogroup" aria-label="Inserido equipamento a mais no local?">\n'
         + '      <input type="radio" id="ficou_equip_sim" name="ficou_equip" value="sim">\n'
         + '      <label for="ficou_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
         + '      <input type="radio" id="ficou_equip_nao" name="ficou_equip" value="nao">\n'
         + '      <label for="ficou_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="ficou_equip" data-when-equals="nao" data-when-parent-field="tipo_serv" data-when-parent-equals="instalacao" data-clear-on-hide="1">\n'
         + '    <label class="form-label" for="ficou_equip_just">Justifique o motivo de não ter inserido equipamentos.</label>\n'
         + '    <textarea id="ficou_equip_just" name="ficou_equip_just" class="form-input--underline auto-expand" placeholder="Descreva o motivo" rows="2" data-min-height="64"></textarea>\n'
         + '    <div class="textarea-counter">0 caracteres</div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="ficou_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
         + '    <label class="form-label">Selecione e insira o MAC dos equipamentos comodatos ou compra que foram instalados: <span class="form-hint">(múltipla escolha)</span></label>\n'
         + '    <div class="choices">\n'
         + '      <label class="choice"><input type="checkbox" id="ins_sel_ont" name="ins_sel_ont"><span>ONT</span></label>\n'
         + '      <label class="choice"><input type="checkbox" id="ins_sel_onu" name="ins_sel_onu"><span>ONU</span></label>\n'
         + '      <label class="choice"><input type="checkbox" id="ins_sel_rot" name="ins_sel_rot"><span>Roteador</span></label>\n'
         + '      <label class="choice"><input type="checkbox" id="ins_sel_outro" name="ins_sel_outro"><span>Outros</span></label>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="ins_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">MAC ONT (instalado):</label>\n'
         + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_ont_mac_">\n'
         + '      <input type="text" id="ins_ont_mac_1" name="ins_ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
         + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="ins_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">MAC ONU (instalado):</label>\n'
         + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_onu_mac_">\n'
         + '      <input type="text" id="ins_onu_mac_1" name="ins_onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
         + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="ins_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">MAC Roteador (instalado):</label>\n'
         + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_rot_mac_">\n'
         + '      <input type="text" id="ins_rot_mac_1" name="ins_rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
         + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '  <div class="form-block" data-when-field="ins_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
         + '    <label class="form-label">Descreva os outros equipamentos inseridos:</label>\n'
         + '    <div class="outro-list" data-outro-list="1">\n'
         + '      <div class="outro-rows"></div>\n'
         + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
         + '    </div>\n'
         + '  </div>\n'
         + '</section>\n'
         // Seção final: Descrição da O.S
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-file-lines"></i> FINALIZAÇÃO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="descricao_os">Descreva detalhes adicionais sobre o atendimento:</label>\n'
        + '    <textarea id="descricao_os" name="descricao_os" class="form-input--underline auto-expand" placeholder="Deixar em branco se não tiver nenhuma observação" rows="4" data-min-height="120"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<div class="form-actions">\n'
        + '  <button id="btnLimparForm" type="button" class="btn-action btn-action--gray"><i class="fa-solid fa-eraser"></i> Limpar respostas</button>\n'
        + '  <button id="btnCopiarForm" type="button" class="btn-action btn-action--red"><i class="fa-solid fa-copy"></i> Copiar</button>\n'
        + '</div>';

        // Máscara e cálculo para metragem (quando aplicável neste formulário)
        try {
          const inp = root.querySelector('#cabometros');
          const hint = root.querySelector('#cabocusto');
          // Padroniza o texto do label para incluir "total"
          try { const lab = root.querySelector('label[for="cabometros"]'); if (lab) lab.textContent = 'Metragem de cabo de rede total para este serviço:'; } catch {}
          const fmtBRL = (n) => { try { return 'R$' + (Number(n||0).toFixed(2)).replace('.', ','); } catch { return 'R$0,00'; } };
          const recalc = () => { try { const base=(inp?.value||'').toLowerCase().replace(/m/g,'').replace(/\./g,',').replace(/[^0-9,]/g,''); const v = parseFloat(base.replace(',','.'))||0; const total=v*3; if (hint) hint.textContent = 'Previsão de custos sobre este cabeamento: ' + fmtBRL(total); } catch {} };
          if (inp){
            const onInput = (e) => { try { let s=(inp.value||'').toLowerCase().replace(/m/g,''); s=s.replace(/\./g,',').replace(/[^0-9,]/g,''); const parts=s.split(','); if (parts.length>1) s=parts.shift()+','+parts.join('').replace(/,/g,''); if (e && e.inputType==='deleteContentBackward'){ const pos=inp.selectionStart||0; const atEnd=pos===(inp.value||'').length; if (atEnd) s=s.slice(0,-1); } inp.value = s ? (s+'m') : ''; recalc(); } catch {} };
            const onKeyDown = (e) => { if (e.key==='Backspace'){ const digits=(inp.value||'').replace(/\D/g,''); if (digits.length<=1){ e.preventDefault(); inp.value=''; recalc(); } } };
            inp.addEventListener('keydown', onKeyDown);
            inp.addEventListener('input', onInput);
            inp.addEventListener('change', onInput);
            onInput();
          }
        } catch {}

        // Quantidade de cabos -> alterna entre "Qual" e "Quais dispositivos"
        try {
          const qt = root.querySelector('#qtd_cabos');
          const flag = root.querySelector('#cabos_multi');
          const cabRedeRadios = Array.from(root.querySelectorAll('input[name="cab_rede"]'));
          const cabRedeVal = () => {
            const ch = root.querySelector('input[name="cab_rede"]:checked');
            return ch ? ch.value : '';
          };
          const applyQt = () => {
            try {
              const digits = String(qt.value||'').replace(/\D/g,'');
              if (qt.value !== digits) qt.value = digits;
              const v = parseInt(digits||'0', 10);
              const isCabRedeSim = (cabRedeVal()==='sim');
              if (flag) flag.value = isCabRedeSim ? ((v>1) ? 'sim' : 'nao') : '';
              try { if (typeof setFormState === 'function') setFormState('instalacoes-mudancas', { cabos_multi: flag ? flag.value : ((v>1)?'sim':'nao') }); } catch {}
              if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('instalacoes-mudancas', root);
            } catch {}
          };
          if (qt && flag) {
            ['input','change','keyup','blur'].forEach(evt => qt.addEventListener(evt, applyQt));
            cabRedeRadios.forEach(r => r.addEventListener('change', applyQt, true));
            applyQt();
          }
        } catch {}

        // Reforço: garantir avaliação das condicionais de tipo_serv inclusive em rascunhos
        try {
          const servRadiosIM = Array.from(root.querySelectorAll('input[name="tipo_serv"]'));
          if (servRadiosIM.length && !root.__tipoServWireIM) {
            root.__tipoServWireIM = true;
            const onTipoServChangeIM = () => {
              try {
                const sel = root.querySelector('input[name="tipo_serv"]:checked');
                const val = sel ? String(sel.value || '') : '';
                if (typeof setFormState === 'function') setFormState('instalacoes-mudancas', { tipo_serv: val });
                try {
                  const label = root.querySelector('[data-label-default][data-label-mudanca]');
                  if (label) {
                    label.textContent = (val === 'mudanca') ? label.getAttribute('data-label-mudanca') : label.getAttribute('data-label-default');
                  }
                }
                catch {}
                // BEGIN equip section gating/reset
                try {
                  const equipTitle = Array.from(root.querySelectorAll('.form-title')).find(t => /EQUIPAMENTOS DO ATENDIMENTO/.test(t.textContent || ''));
                  const equipSec = equipTitle ? equipTitle.closest('section.form-section') : null;
                  if (equipSec) {
                    let hint = equipSec.querySelector('#equip_hint');
                    if (!hint) {
                      hint = document.createElement('div');
                      hint.id = 'equip_hint';
                      hint.className = 'form-hint sinal-los-hint is-highlight';
                      hint.textContent = 'Primeiro selecione o servi\u00E7o executado para que as op\u00E7\u00F5es sejam mostradas nesta se\u00E7\u00E3o.';
                      const header = equipSec.querySelector('.form-header');
                      if (header && header.parentNode) header.parentNode.insertBefore(hint, header.nextSibling);
                    }
                    const selected = (val === 'instalacao' || val === 'mudanca');
                    try {
                      const st = (typeof getFormState === 'function') ? getFormState('instalacoes-mudancas') : {};
                      const blocks = Array.from(equipSec.querySelectorAll('.form-block'));
                      blocks.forEach(b => {
                        b.querySelectorAll('input, select, textarea').forEach(el => {
                          const key = el.name || el.id;
                          if (el.type === 'radio' || el.type === 'checkbox') { el.checked = false; }
                          else { el.value = ''; }
                          try { if (key && st && typeof st === 'object') delete st[key]; } catch {}
                        });
                      });
                      equipSec.querySelectorAll('.mac-list').forEach(list => {
                        list.querySelectorAll('input').forEach(inp => { inp.value = ''; });
                        const rowsWrap = list.querySelector('.mac-rows');
                        if (rowsWrap) {
                          const rows = Array.from(rowsWrap.querySelectorAll('.mac-row'));
                          rows.slice(1).forEach(r => r.remove());
                        }
                      });
                      equipSec.querySelectorAll('.outro-list').forEach(list => {
                        list.querySelectorAll('input').forEach(inp => { inp.value = ''; });
                        const rowsWrap = list.querySelector('.outro-rows');
                        if (rowsWrap) {
                          const rows = Array.from(rowsWrap.querySelectorAll('.outro-row'));
                          rows.slice(1).forEach(r => r.remove());
                        }
                      });
                    } catch {}
                    const blocks = Array.from(equipSec.querySelectorAll('.form-block'));
                    blocks.forEach(b => {
                      if ((b.id || '') === 'equip_hint') return;
                      if (!selected) b.setAttribute('hidden','hidden');
                      else b.removeAttribute('hidden');
                    });
                    if (hint) hint.hidden = selected;
                  }
                } catch {}
                // END equip section gating/reset
                if (val !== 'mudanca') {
                  try { root.querySelectorAll('input[name="ret_equip"]').forEach(r => { r.checked = false; }); } catch {}
                  try { root.querySelectorAll('#eq_sel_ont,#eq_sel_onu,#eq_sel_rot,#eq_sel_outro').forEach(cb => cb.checked = false); } catch {}
                  try {
                    const clearMacList = (prefix) => {
                      const list = root.querySelector('.mac-list[data-mac-prefix="'+prefix+'"]');
                      if (!list) return;
                      const inputs = Array.from(list.querySelectorAll('input'));
                      inputs.forEach(inp => { inp.value = ''; });
                      const wrap = list.querySelector('.mac-rows');
                      if (wrap) {
                        const rows = Array.from(wrap.querySelectorAll('.mac-row'));
                        rows.slice(1).forEach(r => r.remove());
                      }
                    };
                    ['ont_mac_','onu_mac_','rot_mac_'].forEach(clearMacList);
                  } catch {}
                  try {
                    root.querySelectorAll('.outro-list[data-outro-list]').forEach(list => {
                      const inputs = Array.from(list.querySelectorAll('input'));
                      inputs.forEach(inp => { inp.value = ''; });
                      const rowsWrap = list.querySelector('.outro-rows');
                      if (rowsWrap) {
                        const rows = Array.from(rowsWrap.querySelectorAll('.outro-row'));
                        rows.slice(1).forEach(r => r.remove());
                      }
                    });
                  } catch {}
                }
                if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('instalacoes-mudancas', root);
              } catch {}
            };
            servRadiosIM.forEach(r => r.addEventListener('change', onTipoServChangeIM, true));
            onTipoServChangeIM();
          }
        } catch {}

        // Reposiciona blocos de MAC trazidos pelo cliente para logo abaixo do bloco de escolhas
        try {
          const moveMudTrouxeBlocks = () => {
            try {
              const base = root.querySelector('#mud_trouxe_outro')?.closest('.form-block')
                        || root.querySelector('#mud_trouxe_ont')?.closest('.form-block');
              if (!base) return;
              const getBlk = (name) => root.querySelector('.form-block[data-when-field="'+name+'"]');
              const order = ['mud_trouxe_ont','mud_trouxe_onu','mud_trouxe_rot','mud_trouxe_outro'];
              let anchor = base;
              order.forEach(n => {
                const blk = getBlk(n);
                if (blk && anchor && blk !== anchor.nextElementSibling) {
                  anchor.insertAdjacentElement('afterend', blk);
                  anchor = blk;
                }
              });
              try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('instalacoes-mudancas', root); } catch {}
            } catch {}
          };
          moveMudTrouxeBlocks();
        } catch {}

        // Ajuste de rótulo no formulário copiado: "EQUIPAMENTOS INSERIDOS:" quando SIM; caso NÃO, exibir pergunta completa
        try {
          const applyInseridosLabelIM = () => {
            try {
              const sel = root.querySelector('input[name="ficou_equip"]:checked');
              const val = sel ? String(sel.value||'') : '';
              const blk = root.querySelector('.form-block[data-when-field="ficou_equip"][data-when-equals="sim"]');
              const lab = blk ? blk.querySelector('.form-label') : null;
              if (lab) {
                if (val === 'sim') lab.textContent = 'EQUIPAMENTOS INSERIDOS:';
                else lab.textContent = 'FOI INSERIDO ALGUM EQUIPAMENTO DURANTE ESTE ATENDIMENTO?';
              }
            } catch {}
          };
          root.addEventListener('change', (e) => {
            const t = e.target; if (!t) return;
            if ((t.name||'') === 'ficou_equip') applyInseridosLabelIM();
          }, true);
          applyInseridosLabelIM();
        } catch {}

        // Removido: atalhos entre formulários. Unificação passa a ser somente por visibilidade dentro do próprio formulário.
      }
    }
    ,
    'ponto-adicional': {
      equipe: 'carro',
      titulo: 'Ponto Adicional e Cabeamentos',
      descricao: 'Instalação ou avaliação de ponto adicional',
      icon: 'fa-network-wired',
      badge: 'red',
  atualizadoEm: '11/09/2025 00:00',
  render: (root) => {
    root.innerHTML = ''+
    
        // Seção 1: Informações do Cliente (padrão igual ao de Instalações e Mudanças)
        '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-id-card"></i> Informações do Cliente</div>\n'
        + '    <div class="form-subtitle">Preencha quem acompanhou</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="clienteNome">Quem acompanhou</label>\n'
        + '    <input id="clienteNome" name="clienteNome" type="text" class="form-input" placeholder="Ex.: Maria Souza" autocomplete="name" />\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 2: Endereço e informações da O.S (com geolocalização automática para cópia)
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-location-dot"></i> ENDEREÇO E INFORMAÇÕES DA O.S</div>\n'
        + '    <div class="form-subtitle">Captura automática da localização</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foto da frente da casa anexada no MK?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto frente anexada?">\n'
        + '      <input type="radio" id="fotos_anex_sim" name="fotos_anex" value="sim">\n'
        + '      <label for="fotos_anex_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="fotos_anex_nao" name="fotos_anex" value="nao">\n'
        + '      <label for="fotos_anex_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">As fotos dos equipamentos no local, da avaliação/instalação foram anexadas?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Fotos dos equipamentos anexadas?">\n'
        + '      <input type="radio" id="fotos_equip_sim" name="fotos_equip" value="sim">\n'
        + '      <label for="fotos_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="fotos_equip_nao" name="fotos_equip" value="nao">\n'
        + '      <label for="fotos_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="fotos_equip" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="fotos_equip_just">Justifique o motivo de não ter anexado:</label>\n'
        + '    <input id="fotos_equip_just" name="fotos_equip_just" type="text" class="form-input--underline" placeholder="Digite..." />\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 3: Informações técnicas do atendimento
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-square-check"></i> INFORMAÇÕES TÉCNICAS DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Serviço executado:</label>\n'
        + '    <div class="segmented segmented--stack" role="radiogroup" aria-label="Tipo de serviço">\n'
        + '      <input type="radio" id="tipo_serv_aval" name="tipo_serv" value="avaliacao">\n'
        + '      <label for="tipo_serv_aval">Avaliação de ponto adicional</label>\n'
        + '      <input type="radio" id="tipo_serv_inst" name="tipo_serv" value="instalacao">\n'
        + '      <label for="tipo_serv_inst">Instalação de ponto adicional</label>\n'
        + '      <input type="radio" id="tipo_serv_aval_cab" name="tipo_serv" value="avaliacao_cab">\n'
        + '      <label for="tipo_serv_aval_cab">Avaliação de cabeamento</label>\n'
        + '      <input type="radio" id="tipo_serv_cab" name="tipo_serv" value="cabeamento">\n'
        + '      <label for="tipo_serv_cab">Cabeamento de dispositivo</label>\n'
        + '    </div>\n'
        + '  </div>\n' 
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Ponto adicional viável:</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Ponto adicional viável?">\n'
        + '      <input type="radio" id="pt_viavel_sim" name="pt_viavel" value="sim">\n'
        + '      <label for="pt_viavel_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="pt_viavel_nao" name="pt_viavel" value="nao">\n'
        + '      <label for="pt_viavel_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block form-cond" data-when-field="tipo_serv" data-when-in="avaliacao,avaliacao_cab,instalacao" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Há passagem adequada para o cabo de rede (Ex.: Conduite):</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Passagem adequada?">\n'
        + '      <input type="radio" id="passagem_sim" name="passagem" value="sim">\n'
        + '      <label for="passagem_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="passagem_nao" name="passagem" value="nao">\n'
        + '      <label for="passagem_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="trajeto_obs">Observações sobre o trajeto do cabo de rede (se houver):</label>\n'
        + '    <textarea id="trajeto_obs" name="trajeto_obs" class="form-input--underline auto-expand" placeholder="Explique o trajeto do cabo de rede Ex.: Necessário passar por cima do forro..." rows="3" data-min-height="90"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="cabometros">Metragem de cabo de rede para este serviço:</label>\n'
        + '    <input id="cabometros" name="cabometros" type="text" inputmode="decimal" class="form-input--underline" placeholder="Digite a metragem, ex.: 10m" />\n'
        + '    <div class="form-hint" id="cabocusto" style="margin-top:6px;">Previsão de custos sobre este cabeamento: R$0,00</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">O ponto adicional é na mesma residência?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Mesma residência?">\n'
        + '      <input type="radio" id="mesma_res_sim" name="mesma_res" value="sim">\n'
        + '      <label for="mesma_res_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="mesma_res_nao" name="mesma_res" value="nao">\n'
        + '      <label for="mesma_res_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="mesma_res" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="desc_onde">Neste caso descreva onde o ponto foi ou será feito:</label>\n'
        + '    <input id="desc_onde" name="desc_onde" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="mesma_res" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Informe qual cômodo ficou ou ficará este ponto:</label>\n'
        + '    <div class="segmented segmented--stack" role="radiogroup" aria-label="Cômodo">\n'
        + '      <input type="radio" id="comodo_sala" name="comodo" value="sala">\n'
        + '      <label for="comodo_sala">Sala</label>\n'
        + '      <input type="radio" id="comodo_quarto" name="comodo" value="quarto">\n'
        + '      <label for="comodo_quarto">Quarto</label>\n'
        + '      <input type="radio" id="comodo_area" name="comodo" value="area">\n'
        + '      <label for="comodo_area">Área</label>\n'
        + '      <input type="radio" id="comodo_cozinha" name="comodo" value="cozinha">\n'
        + '      <label for="comodo_cozinha">Cozinha</label>\n'
        + '      <input type="radio" id="comodo_outros" name="comodo" value="outros">\n'
        + '      <label for="comodo_outros">Outros</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="comodo" data-when-equals="outros" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="instal_local">Neste caso, qual o local de instalação do ponto adicional:</label>\n'
        + '    <input id="instal_local" name="instal_local" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Tem tomada para ligar o equipamento neste local?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Tem tomada?">\n'
        + '      <input type="radio" id="tem_tomada_sim" name="tem_tomada" value="sim">\n'
        + '      <label for="tem_tomada_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="tem_tomada_nao_nec" name="tem_tomada" value="nao_necessario">\n'
        + '      <label for="tem_tomada_nao_nec"><i class="fa-solid fa-xmark"></i> N\u00e3o ser\u00e1 necess\u00e1rio tomada</label>\n'
        + '      <input type="radio" id="tem_tomada_nao" name="tem_tomada" value="nao">\n'
        + '      <label for="tem_tomada_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Os aparelhos estão ou estarão em local coberto e seguro?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Local coberto e seguro?">\n'
        + '      <input type="radio" id="local_seguro_sim" name="local_seguro" value="sim">\n'
        + '      <label for="local_seguro_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="local_seguro_nao" name="local_seguro" value="nao">\n'
        + '      <label for="local_seguro_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 4: Equipamentos do atendimento
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-screwdriver-wrench"></i> EQUIPAMENTOS DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" id="lbl_ret_equip">Foi RETIRADO algum equipamento durante este atendimento?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Retirado algum equipamento?">\n'
        + '      <input type="radio" id="ret_equip_sim" name="ret_equip" value="sim">\n'
        + '      <label for="ret_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_equip_nao" name="ret_equip" value="nao">\n'
        + '      <label for="ret_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Selecione o equipamento retirado e insira seu MAC: <span class="form-hint">(múltipla escolha)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_ont" name="eq_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_onu" name="eq_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_rot" name="eq_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_outro" name="eq_sel_outro"><span>Outros</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ont_mac_">\n'
        + '      <input type="text" id="ont_mac_1" name="ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="onu_mac_">\n'
        + '      <input type="text" id="onu_mac_1" name="onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="rot_mac_">\n'
        + '      <input type="text" id="rot_mac_1" name="rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos retirados:</label>\n'
        + '    <div class="outro-list" data-outro-list="1">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foi INSERIDO algum equipamento?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Inserido algum equipamento?">\n'
        + '      <input type="radio" id="ficou_equip_sim" name="ficou_equip" value="sim">\n'
        + '      <label for="ficou_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ficou_equip_nao" name="ficou_equip" value="nao">\n'
        + '      <label for="ficou_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ficou_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Selecione os equipamentos inseridos e insira seus MACs: <span class="form-hint">(múltipla escolha)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_ont" name="ins_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_onu" name="ins_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_rot" name="ins_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_outro" name="ins_sel_outro"><span>Outros</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_ont_mac_">\n'
        + '      <input type="text" id="ins_ont_mac_1" name="ins_ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_onu_mac_">\n'
        + '      <input type="text" id="ins_onu_mac_1" name="ins_onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_rot_mac_">\n'
        + '      <input type="text" id="ins_rot_mac_1" name="ins_rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos inseridos:</label>\n'
        + '    <div class="outro-list" data-outro-list="1">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Equipamentos da ETECC (comodato ou compra) que estão no local: <span class="form-hint">(Exceto os acima, se houver. Múltipla escolha.)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="estao_sel_ont" name="estao_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="estao_sel_onu" name="estao_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="estao_sel_rot" name="estao_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="estao_sel_outro" name="estao_sel_outro"><span>Outros</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="estao_sel_none" name="estao_sel_none"><span>Nenhum</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="estao_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (no local):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="estao_ont_mac_">\n'
        + '      <input type="text" id="stc_estao_ont_mac_1" name="estao_ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="estao_ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="estao_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (no local):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="estao_onu_mac_">\n'
        + '      <input type="text" id="stc_estao_onu_mac_1" name="estao_onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="estao_onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="estao_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (no local):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="estao_rot_mac_">\n'
        + '      <input type="text" id="stc_estao_rot_mac_1" name="estao_rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="estao_rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="estao_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos que estão no local:</label>\n'
        + '    <div class="outro-list" data-outro-list="1" data-outro-name-prefix="estao_outro_nome_" data-outro-mac-prefix="estao_outro_mac_">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 5: DESCRIÇÃO DA O.S (customizada com observação)
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-file-lines"></i> FINALIZAÇÃO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="descricao_os">Descreva detalhes adicionais sobre o atendimento:</label>\n'
        + '    <div class="form-hint" style="font-style:italic;margin-bottom:6px;">Obs: Caso preciso fazer remanejamento de fibra para instalar o ponto adicional ou algo a mais, insirá aqui também</div>\n'
        + '    <textarea id="descricao_os" name="descricao_os" class="form-input--underline auto-expand" placeholder="Descreva os detalhes da avaliação/instalação do ponto adicional..." rows="4" data-min-height="120"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<div class="form-actions">\n'
        + '  <button id="btnLimparForm" type="button" class="btn-action btn-action--gray"><i class="fa-solid fa-eraser"></i> Limpar respostas</button>\n'
        + '  <button id="btnCopiarForm" type="button" class="btn-action btn-action--red"><i class="fa-solid fa-copy"></i> Copiar</button>\n'
        + '</div>';

        // Pós-render: lógica específica deste formulário
        // 1) Insere bloco de Cabeamento quando selecionar "Cabeamento de dispositivo"
        try {
          const techService = root.querySelector('input[name="tipo_serv"]');
          const serviceBlock = techService ? techService.closest('.form-block') : null;
          if (serviceBlock && !root.querySelector('#cd_qt_cabos')){
            const wrap = document.createElement('div');
            wrap.className = 'form-block';
            wrap.setAttribute('data-when-field','tipo_serv');
            wrap.setAttribute('data-when-equals','cabeamento');
            wrap.setAttribute('data-clear-on-hide','1');
            wrap.innerHTML = ''
              + '<div class="form-block">\n'
              + '  <label class="form-label">Cabeamento viável:</label>\n'
              + '  <div class="segmented" role="radiogroup" aria-label="Cabeamento viável?">\n'
              + '    <input type="radio" id="cd_viavel_sim" name="cd_viavel" value="sim">\n'
              + '    <label for="cd_viavel_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
              + '    <input type="radio" id="cd_viavel_nao" name="cd_viavel" value="nao">\n'
              + '    <label for="cd_viavel_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
              + '  </div>\n'
              + '</div>\n'
              + '<div class="form-block">\n'
              + '  <label class="form-label">Há passagem adequada para o cabo de rede (Ex.: Conduite):</label>\n'
              + '  <div class="segmented" role="radiogroup" aria-label="Passagem adequada?">\n'
              + '    <input type="radio" id="cd_passagem_sim" name="cd_passagem" value="sim">\n'
              + '    <label for="cd_passagem_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
              + '    <input type="radio" id="cd_passagem_nao" name="cd_passagem" value="nao">\n'
              + '    <label for="cd_passagem_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
              + '  </div>\n'
              + '</div>\n'
              + '<div class="form-block">\n'
              + '  <label class="form-label" for="cd_trajeto_obs">Observações sobre o trajeto do cabo de rede:</label>\n'
              + '  <textarea id="cd_trajeto_obs" name="cd_trajeto_obs" class="form-input--underline auto-expand" placeholder="Explique o trajeto do cabo de rede Ex.: Necessário passar por cima do forro..." rows="3" data-min-height="90"></textarea>\n'
              + '  <div class="textarea-counter">0 caracteres</div>\n'
              + '</div>\n'
              + '<div class="form-block">\n'
              + '  <label class="form-label" for="cd_qt_cabos">Quantos cabos de rede foram passados?</label>\n'
              + '  <input id="cd_qt_cabos" name="cd_qt_cabos" type="text" inputmode="decimal" class="form-input--underline" placeholder="Ex.: 2" />\n'
              + '  <input id="cd_cabos_multi" name="cd_cabos_multi" type="hidden" value="nao" />\n'
              + '</div>\n'
              + '<div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="sim" data-clear-on-hide="1">\n'
              + '  <label class="form-label" for="cd_quais_disp">Quais dispositivos foram cabeados:</label>\n'
              + '  <input id="cd_quais_disp" name="cd_quais_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
              + '</div>\n'
              + '<div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="nao" data-clear-on-hide="1">\n'
              + '  <label class="form-label" for="cd_qual_disp">Qual dispositivo foi cabeado:</label>\n'
              + '  <input id="cd_qual_disp" name="cd_qual_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
              + '</div>\n'
              + '<div class="form-block">\n'
              + '  <label class="form-label" for="cd_cabometros">Metragem de cabo de rede total para este serviço:</label>\n'
              + '  <input id="cd_cabometros" name="cd_cabometros" type="text" inputmode="decimal" class="form-input--underline" placeholder="Digite a metragem, ex.: 10m" />\n'
              + '  <div class="form-hint" id="cd_cabocusto" style="margin-top:6px;">Previsão de custos sobre este cabeamento: R$0,00</div>\n'
              + '</div>\n'
              + '<div class="form-block">\n'
              + '  <label class="form-label">O cabeamento é na mesma residência?</label>\n'
              + '  <div class="segmented" role="radiogroup" aria-label="Mesma residência?">\n'
              + '    <input type="radio" id="cd_mesma_res_sim" name="cd_mesma_res" value="sim">\n'
              + '    <label for="cd_mesma_res_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
              + '    <input type="radio" id="cd_mesma_res_nao" name="cd_mesma_res" value="nao">\n'
              + '    <label for="cd_mesma_res_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
              + '  </div>\n'
              + '</div>\n'
              + '<div class="form-block" data-when-field="cd_mesma_res" data-when-equals="nao" data-clear-on-hide="1">\n'
              + '  <label class="form-label" for="cd_desc_onde">Neste caso informe para onde o cabo foi passado:</label>\n'
              + '  <input id="cd_desc_onde" name="cd_desc_onde" type="text" class="form-input--underline" placeholder="Explique..." />\n'
              + '</div>\n'
              + '<div class="form-block" data-when-field="cd_mesma_res" data-when-equals="sim" data-clear-on-hide="1">\n'
              + '  <label class="form-label">Informe para qual cômodo foi este cabo:</label>\n'
              + '  <div class="segmented segmented--stack" role="radiogroup" aria-label="Cômodo">\n'
              + '    <input type="radio" id="cd_comodo_sala" name="cd_comodo" value="sala">\n'
              + '    <label for="cd_comodo_sala">Sala</label>\n'
              + '    <input type="radio" id="cd_comodo_quarto" name="cd_comodo" value="quarto">\n'
              + '    <label for="cd_comodo_quarto">Quarto</label>\n'
              + '    <input type="radio" id="cd_comodo_area" name="cd_comodo" value="area">\n'
              + '    <label for="cd_comodo_area">Área</label>\n'
              + '    <input type="radio" id="cd_comodo_cozinha" name="cd_comodo" value="cozinha">\n'
              + '    <label for="cd_comodo_cozinha">Cozinha</label>\n'
              + '    <input type="radio" id="cd_comodo_outros" name="cd_comodo" value="outros">\n'
              + '    <label for="cd_comodo_outros">Outros</label>\n'
              + '  </div>\n'
              + '</div>\n'
              + '<div class="form-block" data-when-field="cd_comodo" data-when-equals="outros" data-clear-on-hide="1">\n'
              + '  <label class="form-label" for="cd_instal_local">Neste caso descreva para onde o cabo de rede foi passado:</label>\n'
              + '  <input id="cd_instal_local" name="cd_instal_local" type="text" class="form-input--underline" placeholder="Explique..." />\n'
              + '</div>\n';
            serviceBlock.insertAdjacentElement('afterend', wrap);
            // Desembrulha: move cada .form-block interno para o mesmo nível do wrapper,
            // garantindo que cada bloco tenha sua própria condicional.
            try {
              const children = Array.from(wrap.querySelectorAll(':scope > .form-block'));
              children.forEach((blk) => {
                if (!blk.getAttribute('data-when-field')) {
                  blk.setAttribute('data-when-field','tipo_serv');
                  blk.setAttribute('data-when-equals','cabeamento');
                  blk.setAttribute('data-clear-on-hide','1');
                } else {
                  // Blocos que já têm condicional própria (ex.: cd_cabos_multi, cd_mesma_res)
                  // exigem também que tipo_serv=cabeamento esteja ativo.
                  blk.setAttribute('data-when-parent-field','tipo_serv');
                  blk.setAttribute('data-when-parent-equals','cabeamento');
                  blk.setAttribute('data-clear-on-hide','1');
                }
                wrap.insertAdjacentElement('beforebegin', blk);
              });
              wrap.remove();
            } catch {}
            // Unificar campo de dispositivo: manter um único bloco sempre visível em "Cabeamento",
            // com label dinâmica (singular/plural) conforme a quantidade de cabos (#cd_qt_cabos).
            try {
              const blkQuais = (root.querySelector('#cd_quais_disp')||null) ? root.querySelector('#cd_quais_disp').closest('.form-block') : null;
              const blkQual  = (root.querySelector('#cd_qual_disp')||null) ? root.querySelector('#cd_qual_disp').closest('.form-block') : null;
              const inpQuais = root.querySelector('#cd_quais_disp');
              const inpQual  = root.querySelector('#cd_qual_disp');
              if (blkQuais) {
                // Remover condicionais de cd_cabos_multi e fixar apenas em tipo_serv=cabeamento
                try { blkQuais.removeAttribute('data-when-field'); } catch {}
                try { blkQuais.removeAttribute('data-when-equals'); } catch {}
                try { blkQuais.removeAttribute('data-when-in'); } catch {}
                try { blkQuais.removeAttribute('data-when-parent-field'); } catch {}
                try { blkQuais.removeAttribute('data-when-parent-equals'); } catch {}
                try { blkQuais.removeAttribute('data-when-parent-in'); } catch {}
                blkQuais.setAttribute('data-when-field','tipo_serv');
                blkQuais.setAttribute('data-when-equals','cabeamento');
                blkQuais.setAttribute('data-clear-on-hide','1');
              }
              // Se houver valor no campo singular antigo, migra para o novo e limpa o antigo
              try {
                if (inpQuais && inpQual && !inpQuais.value && inpQual.value) {
                  inpQuais.value = inpQual.value;
                  try { if (typeof setFormState === 'function') setFormState('ponto-adicional', { cd_quais_disp: inpQual.value }); } catch {}
                }
              } catch {}
              // Remove o bloco antigo (singular)
              try {
                if (blkQual) blkQual.remove();
                if (typeof setFormState === 'function') setFormState('ponto-adicional', { cd_qual_disp: '' });
              } catch {}
              // Atualiza label dinamicamente conforme a quantidade de cabos
              const updateDispLabel = () => {
                try {
                  const qtEl = root.querySelector('#cd_qt_cabos');
                  const lab = blkQuais ? blkQuais.querySelector('label.form-label') : null;
                  if (!lab) return;
                  const digits = String(qtEl && qtEl.value || '').replace(/\D/g,'');
                  const n = parseInt(digits||'0', 10) || 0;
                  try {
                    const selServ = root.querySelector('input[name="tipo_serv"]:checked');
                    const tval = selServ ? String(selServ.value||'') : '';
                    if (tval === 'avaliacao_cab') {
                      lab.textContent = (n > 1) ? 'Quais dispositivos serão cabeados:' : 'Qual dispositivo será cabeado:';
                    } else {
                      lab.textContent = (n > 1) ? 'Quais dispositivos foram cabeados:' : 'Qual dispositivo foi cabeado:';
                    }
                  } catch { lab.textContent = (n > 1) ? 'Quais dispositivos foram cabeados:' : 'Qual dispositivo foi cabeado:'; }
                } catch {}
              };
              try {
                const qt = root.querySelector('#cd_qt_cabos');
                if (qt) ['input','change','keyup','blur'].forEach(evt => qt.addEventListener(evt, updateDispLabel));
              } catch {}
              updateDispLabel();
              try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
            } catch {}
            // Ajustes para "Avaliação de cabeamento": compartilhar campos de cabeamento básico
            try {
              const applyCabEvalFields = () => {
                try {
                  const sel = root.querySelector('input[name="tipo_serv"]:checked');
                  const val = sel ? String(sel.value||'') : '';
                  const qtBlk = root.querySelector('#cd_qt_cabos')?.closest('.form-block');
                  const quaisBlk = root.querySelector('#cd_quais_disp')?.closest('.form-block');
                  if (qtBlk) {
                    qtBlk.setAttribute('data-when-field','tipo_serv');
                    qtBlk.setAttribute('data-when-in','cabeamento,avaliacao_cab');
                    qtBlk.setAttribute('data-clear-on-hide','1');
                  }
                  if (quaisBlk) {
                    quaisBlk.setAttribute('data-when-field','tipo_serv');
                    quaisBlk.setAttribute('data-when-in','cabeamento,avaliacao_cab');
                    quaisBlk.setAttribute('data-clear-on-hide','1');
                  }
                  // Reordena acima de cabometros quando avaliação de cabeamento
                  try {
                    if (val === 'avaliacao_cab') {
                      const cabBlk = root.querySelector('#cabometros')?.closest('.form-block');
                      if (cabBlk && qtBlk) {
                        cabBlk.parentNode.insertBefore(qtBlk, cabBlk);
                        if (quaisBlk) cabBlk.parentNode.insertBefore(quaisBlk, cabBlk);
                      }
                    }
                  } catch {}
                  // Rótulos dos campos
                  try {
                    const labQt = root.querySelector('label[for="cd_qt_cabos"]');
                    if (labQt) labQt.textContent = (val === 'avaliacao_cab') ? 'Quantos cabos de rede serão passados?' : 'Quantos cabos de rede foram passados?';
                  } catch {}
                  try {
                    const blk = root.querySelector('#cd_quais_disp')?.closest('.form-block');
                    const lab = blk ? blk.querySelector('label.form-label') : null;
                    if (lab) {
                      const qtEl = root.querySelector('#cd_qt_cabos');
                      const digits = String(qtEl && qtEl.value || '').replace(/\D/g,'');
                      const n = parseInt(digits||'0', 10) || 0;
                      const isEvalCab = (val === 'avaliacao_cab');
                      lab.textContent = isEvalCab
                        ? ((n > 1) ? 'Quais dispositivos serão cabeados:' : 'Qual dispositivo será cabeado:')
                        : ((n > 1) ? 'Quais dispositivos foram cabeados:' : 'Qual dispositivo foi cabeado:');
                    }
                  } catch {}
                  // Ajusta outros rótulos herdados do fluxo de ponto adicional
                  try {
                    const ptBlk = root.querySelector('#pt_viavel_sim')?.closest('.form-block');
                    const labPt = ptBlk ? ptBlk.querySelector('label.form-label') : null;
                    if (labPt) labPt.textContent = (val === 'avaliacao_cab') ? 'Cabeamento viável:' : 'Ponto adicional viável:';
                  } catch {}
                  try {
                    const msBlk = root.querySelector('input[name="mesma_res"]')?.closest('.form-block');
                    const labMs = msBlk ? msBlk.querySelector('label.form-label') : null;
                    if (labMs) labMs.textContent = (val === 'avaliacao_cab') ? 'O cabeamento \u00e9 na mesma resid\u00eancia?' : (labMs.textContent || '');
                  } catch {}
                  try {
                    const labCab = root.querySelector('label[for="cabometros"]');
                    if (labCab) labCab.textContent = (val === 'avaliacao_cab') ? 'Possível metragem de cabo de rede total para este serviço:' : (labCab.textContent || '');
                  } catch {}
                  try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
                } catch {}
              };
              // Aplica agora e ao trocar o tipo de serviço
              applyCabEvalFields();
              try {
                root.addEventListener('change', (e) => { const t=e.target; if (!t) return; if ((t.name||'')==='tipo_serv') applyCabEvalFields(); }, true);
              } catch {}
            } catch {}
            // Estender visibilidade de outros blocos para "Avaliação de cabeamento"
            try {
              const ensureIn = (sel) => {
                const blk = root.querySelector(sel)?.closest('.form-block');
                if (!blk) return;
                blk.setAttribute('data-when-field','tipo_serv');
                blk.setAttribute('data-when-in','avaliacao,avaliacao_cab,instalacao');
                blk.setAttribute('data-clear-on-hide','1');
              };
              ensureIn('#trajeto_obs');
              ensureIn('#cabometros');
              ensureIn('#mesma_res_sim');
              try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
            } catch {}
          }
          // Wire mudança do tipo de serviço para reavaliar condicionais
          const servRadiosPA = Array.from(root.querySelectorAll('input[name="tipo_serv"]'));
          if (servRadiosPA.length && !root.__tipoServWirePA){
            root.__tipoServWirePA = true;
            const onTipoServChangePA = () => {
              try {
                const sel = root.querySelector('input[name="tipo_serv"]:checked');
                const val = sel ? String(sel.value||'') : '';
                if (typeof setFormState === 'function') setFormState('ponto-adicional', { tipo_serv: val });
                if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root);
                try { if (typeof root.__applyPAServiceTexts === 'function') root.__applyPAServiceTexts(); } catch {}
                // Limpa todos os campos condicionados por serviço ao alternar o tipo de serviço,
                // mesmo que permaneçam visíveis após a troca
                try {
                  const containers = Array.from(root.querySelectorAll('[data-when-field="tipo_serv"], [data-when-parent-field="tipo_serv"]'));
                  containers.forEach(ct => {
                    try {
                      const fields = ct.querySelectorAll('input, textarea, select');
                      fields.forEach(el => {
                        try {
                          const tag = (el.tagName||'').toLowerCase();
                          const type = (el.type||'').toLowerCase();
                          const name = (el.name||'');
                          if (type === 'radio' || type === 'checkbox') {
                            if (el.checked) { el.checked = false; try { el.dispatchEvent(new Event('change', { bubbles: true })); } catch {} }
                          } else if (type === 'file') {
                            try { el.value = ''; } catch {}
                          } else if (tag === 'select') {
                            try { el.selectedIndex = -1; el.value = ''; } catch {}
                            try { el.dispatchEvent(new Event('change', { bubbles: true })); } catch {}
                          } else {
                            if ((el.value||'') !== '') { el.value = ''; try { el.dispatchEvent(new Event('input', { bubbles: true })); } catch {} try { el.dispatchEvent(new Event('change', { bubbles: true })); } catch {} }
                          }
                          try { if (typeof setFormState === 'function' && name) setFormState('ponto-adicional', { [name]: '' }); } catch {}
                        } catch {}
                      });
                    } catch {}
                  });
                } catch {}
                // Força rótulo correto para "mesma residência" em Avaliação de cabeamento
                try {
                  const msBlk = root.querySelector('input[name="mesma_res"]')?.closest('.form-block');
                  const labMs = msBlk ? msBlk.querySelector('label.form-label') : null;
                  if (labMs) {
                    if (val === 'avaliacao_cab') labMs.textContent = 'O cabeamento \u00e9 na mesma resid\u00eancia?';
                    else if (val === 'avaliacao') labMs.textContent = 'O ponto adicional ser\u00e1 na mesma resid\u00eancia?';
                    else labMs.textContent = 'O ponto adicional \u00e9 na mesma resid\u00eancia?';
                  }
                } catch {}
                try {
                  const ptBlk = root.querySelector('#pt_viavel_sim')?.closest('.form-block');
                  if (ptBlk) {
                    ptBlk.setAttribute('data-when-field', 'tipo_serv');
                    ptBlk.setAttribute('data-when-in', 'avaliacao,avaliacao_cab');
                    ptBlk.setAttribute('data-clear-on-hide', '1');
                    try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
                  }
                } catch {}
                // Limpa campos afetados por alternância Avaliação/Instalação
                try {
                  const lsRadios = root.querySelectorAll('input[name="local_seguro"]');
                  lsRadios.forEach(r => { r.checked = false; });
                  const lsJust = root.querySelector('#local_seguro_just');
                  if (lsJust) lsJust.value = '';
                  // Limpa campos relativos à tomada (quando alterna serviço)
                  const ttRadios = root.querySelectorAll('input[name="tem_tomada"]');
                  ttRadios.forEach(r => { r.checked = false; });
                  const cienteRadios = root.querySelectorAll('input[name="cli_ciente_tomada"]');
                  cienteRadios.forEach(r => { r.checked = false; });
                  const cienteJust = root.querySelector('#cli_tomada_ciente_just');
                  if (cienteJust) cienteJust.value = '';

                  try { if (typeof setFormState === 'function') setFormState('ponto-adicional', { local_seguro: '', local_seguro_just: '', tem_tomada: '', cli_ciente_tomada: '', cli_tomada_ciente_just: '' }); } catch {}
                  try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
                } catch {}
              } catch {}
            };
            servRadiosPA.forEach(r => r.addEventListener('change', onTipoServChangePA, true));
            onTipoServChangePA();
          }
        } catch {}
        // Garante que blocos exclusivos de Ponto Adicional só apareçam quando
        // o serviço for "Avaliação" ou "Instalação" (não em "Cabeamento").
        try {
          const markPAOnly = (blk) => {
            if (!blk) return;
            // Não sobrescreve condicionais já existentes (ex.: data-when-field="eq_sel_*")
            if (!blk.hasAttribute('data-when-field')) {
              blk.setAttribute('data-when-field','tipo_serv');
              blk.setAttribute('data-when-in','avaliacao,instalacao');
              blk.setAttribute('data-clear-on-hide','1');
            }
          };
          const byInput = (sel) => {
            const el = root.querySelector(sel);
            return el ? el.closest('.form-block') : null;
          };
          // Blocos principais do fluxo Ponto Adicional
          markPAOnly(byInput('#pt_viavel_sim'));
          markPAOnly(byInput('#trajeto_obs'));
          markPAOnly(byInput('#cabometros'));
          markPAOnly(byInput('#mesma_res_sim'));
          // Seleção de equipamentos retirados/inseridos (blocos "choices")
          markPAOnly(byInput('#eq_sel_ont'));
          markPAOnly(byInput('#ins_sel_ont'));
          // Observação: os toggles da seção "EQUIPAMENTOS DO ATENDIMENTO"
          // devem aparecer 100% do tempo, portanto não são condicionados por serviço.
          // Verificações adicionais do ambiente
          markPAOnly(byInput('#tem_tomada_sim'));
          markPAOnly(byInput('#local_seguro_sim'));
          markPAOnly(byInput('#caborede_fast'));
          markPAOnly(byInput('#fw_atualizada_sim'));
          markPAOnly(byInput('#local_ok_sim'));
          // Reavalia visibilidades após marcar condicionais
          try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
        } catch {}
        // 2) Regras adicionais
        try {
          // Cálculo de custo por metragem (R$ 3,00 por metro)
          const inp = root.querySelector('#cabometros');
          const hint = root.querySelector('#cabocusto');
          // Padroniza o texto do label para incluir "total"
          try { const lab = root.querySelector('label[for="cabometros"]'); if (lab) lab.textContent = 'Metragem de cabo de rede total para este serviço:'; } catch {}
          // Rótulos dinâmicos conforme serviço executado (Avaliação/Instalação)
          try {
            const applyPAServiceTexts = () => {
              try {
                const sel = root.querySelector('input[name="tipo_serv"]:checked');
                const val = sel ? String(sel.value||'') : '';
                // cabometros
                try {
                  const labCab = root.querySelector('label[for="cabometros"]');
                  if (labCab) {
                    if (val === 'avaliacao') labCab.textContent = 'Possível metragem de cabo de rede total para este serviço:';
                    else if (val === 'instalacao') labCab.textContent = 'Metragem de cabo de rede total para este serviço:';
                  }
                } catch {}
                // mesma_res
                try {
                  const blocoMesma = root.querySelector('input[name="mesma_res"]')?.closest('.form-block');
                  const labMesma = blocoMesma ? blocoMesma.querySelector('label.form-label') : null;
                  if (labMesma) { if (val === 'avaliacao_cab') labMesma.textContent = 'O cabeamento \\u00e9 na mesma resid\\u00eancia?'; else if (val === 'avaliacao') labMesma.textContent = 'O ponto adicional ser\\u00e1 na mesma resid\\u00eancia?'; else labMesma.textContent = 'O ponto adicional \\u00e9 na mesma resid\\u00eancia?'; }
                } catch {}
                // desc_onde
                try {
                  const labDesc = root.querySelector('label[for="desc_onde"]');
                  if (labDesc) labDesc.textContent = (val === 'avaliacao') ? 'Neste caso descreva onde o ponto será feito:' : 'Neste caso descreva onde o ponto foi feito:';
                } catch {}
                // comodo (quando mesma_res=sim)
                try {
                  const blocoComodo = root.querySelector('div.form-block[data-when-field="mesma_res"][data-when-equals="sim"]');
                  const labComodo = blocoComodo ? blocoComodo.querySelector('label.form-label') : null;
                  if (labComodo) labComodo.textContent = (val === 'avaliacao') ? 'Informe qual cômodo ficará este ponto:' : 'Informe qual cômodo ficou este ponto:';
                } catch {}
                // local_seguro
                try {
                  const blocoLocal = root.querySelector('input[name="local_seguro"]')?.closest('.form-block');
                  const labLocal = blocoLocal ? blocoLocal.querySelector('label.form-label') : null;
                  if (labLocal) labLocal.textContent = (val === 'avaliacao') ? 'Os aparelhos ficarão em local coberto e seguro?' : 'Os aparelhos estão em local coberto e seguro?';
                  try {
                    const labNao = blocoLocal ? blocoLocal.querySelector('label[for="local_seguro_nao"]') : null;
                    if (labNao) {
                      if (val === 'instalacao') labNao.innerHTML = '<i class="fa-solid fa-xmark"></i> Não, o cliente irá providenciar';
                      else labNao.innerHTML = '<i class="fa-solid fa-xmark"></i> Não';
                    }
                  } catch {}
                } catch {}
              } catch {}
            };
            root.__applyPAServiceTexts = applyPAServiceTexts;
          } catch {}
          const fmtBRL = (n) => {
            try { return 'R$' + (Number(n||0).toFixed(2)).replace('.', ','); } catch { return 'R$0,00'; }
          };
          const parseNum = (v) => {
            try {
              if (!v) return 0;
              const s = String(v).replace(/\./g,'').replace(',', '.').replace(/[^0-9.\-]/g,'');
              const n = parseFloat(s);
              return isNaN(n) ? 0 : n;
            } catch { return 0; }
          };
          const recalc = () => {
            try {
              const m = parseNum(inp.value);
              const total = m * 3;
              if (hint) hint.textContent = 'Previsão de custos sobre este cabeamento: ' + fmtBRL(total);
            } catch {}
          };
          if (inp) { inp.addEventListener('input', recalc); inp.addEventListener('change', recalc); recalc(); try { if (typeof root.__applyPAServiceTexts === 'function') root.__applyPAServiceTexts(); } catch {} }
          // Campo de justificativa para local não coberto/seguro (somente em Avaliação)
          try {
            const locBlock = root.querySelector('input[name="local_seguro"]')?.closest('.form-block');
            if (locBlock && !root.querySelector('#local_seguro_just')) {
              const outer = document.createElement('div');
              outer.className = '';
              outer.setAttribute('data-when-field', 'tipo_serv');
              outer.setAttribute('data-when-in', 'avaliacao');
              outer.setAttribute('data-clear-on-hide', '1');
              const inner = document.createElement('div');
              inner.className = 'form-block';
              inner.setAttribute('data-when-field', 'local_seguro');
              inner.setAttribute('data-when-equals', 'nao');
              inner.setAttribute('data-clear-on-hide', '1');
              inner.innerHTML = ''
                + '<label class="form-label" for="local_seguro_just">Justifique então como esses equipamentos deverão ser instalados:</label>\n'
                + '  <textarea id="local_seguro_just" name="local_seguro_just" class="form-input--underline auto-expand" placeholder="Digite..." rows="1" data-min-height="32"></textarea>';
              outer.appendChild(inner);
              locBlock.insertAdjacentElement('afterend', outer);
              try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
            }
          } catch {}
          /* Ajustes solicitados para a pergunta de local coberto/seguro no Ponto Adicional */
          try {
            const upgradeLocalSeguro = () => {
              try {
                const selSrv = root.querySelector('input[name="tipo_serv"]:checked');
                const val = (selSrv && (selSrv.value || '').toLowerCase()) || '';
                const blk = root.querySelector('input[name="local_seguro"]')?.closest('.form-block');
                if (!blk) return;
                const labLocal = blk.querySelector('label.form-label');
                if (labLocal) labLocal.textContent = (val === 'avaliacao') ? 'Os equipamentos ficarão em local coberto e seguro?' : 'Os equipamentos estão em local coberto e seguro?';
                const seg = blk.querySelector('.segmented[aria-label="Local coberto e seguro?"]');
                const ensurePair = (id, value, html, afterSelector) => {
                  try {
                    if (!seg || document.getElementById(id)) return;
                    const inp = document.createElement('input'); inp.type = 'radio'; inp.id = id; inp.name = 'local_seguro'; inp.value = value;
                    const lab = document.createElement('label'); lab.setAttribute('for', id); lab.innerHTML = html;
                    if (afterSelector) {
                      const ref = seg.querySelector(afterSelector);
                      if (ref) { ref.insertAdjacentElement('afterend', inp); inp.insertAdjacentElement('afterend', lab); }
                      else { seg.appendChild(inp); seg.appendChild(lab); }
                    } else { seg.appendChild(inp); seg.appendChild(lab); }
                  } catch {}
                };
                ensurePair('local_seguro_sim_cli', 'sim_cli', '<i class="fa-solid fa-check"></i> Sim, o cliente irá providenciar', 'label[for="local_seguro_sim"]');
                ensurePair('local_seguro_nao_equip', 'nao_equip', '<i class="fa-solid fa-circle-xmark"></i> Não há equipamentos', 'label[for="local_seguro_sim_cli"], label[for="local_seguro_sim"]');
                ensurePair('local_seguro_nao_cli', 'nao_cli', '<i class="fa-solid fa-xmark"></i> Não, o cliente irá providenciar', 'label[for="local_seguro_nao"]');
                const opt = (id) => ({ input: root.querySelector('#' + id), label: root.querySelector('label[for="' + id + '"]') });
                const setVis = (el, show) => { if (!el) return; try { el.style.display = show ? '' : 'none'; } catch {} };
                const clearIfHidden = (inp, show) => { try { if (inp && !show && inp.checked) { inp.checked = false; inp.dispatchEvent(new Event('change', { bubbles: true })); } } catch {} };
                const oSim = opt('local_seguro_sim');
                const oSimCli = opt('local_seguro_sim_cli');
                const oNaoEq = opt('local_seguro_nao_equip');
                const oNao = opt('local_seguro_nao');
                const oNaoCli = opt('local_seguro_nao_cli');
                if (oSim?.label) oSim.label.innerHTML = '<i class="fa-solid fa-check"></i> Sim';
                if (val === 'avaliacao') {
                  setVis(oSimCli.input, true); setVis(oSimCli.label, true);
                  setVis(oNaoEq.input, false); setVis(oNaoEq.label, false); clearIfHidden(oNaoEq.input, false);
                  setVis(oNaoCli.input, false); setVis(oNaoCli.label, false); clearIfHidden(oNaoCli.input, false);
                  if (oNao?.label) oNao.label.innerHTML = '<i class="fa-solid fa-xmark"></i> Não';
                } else if (val === 'instalacao') {
                  setVis(oSimCli.input, false); setVis(oSimCli.label, false); clearIfHidden(oSimCli.input, false);
                  if (oNaoEq?.label) oNaoEq.label.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Não há equipamentos';
                  setVis(oNaoEq.input, true); setVis(oNaoEq.label, true);
                  if (oNao?.label) oNao.label.innerHTML = '<i class="fa-solid fa-xmark"></i> Não';
                  if (oNaoCli?.label) oNaoCli.label.innerHTML = '<i class="fa-solid fa-xmark"></i> Não, o cliente irá providenciar';
                  setVis(oNaoCli.input, true); setVis(oNaoCli.label, true);
                } else {
                  setVis(oSimCli.input, false); setVis(oSimCli.label, false); clearIfHidden(oSimCli.input, false);
                  setVis(oNaoEq.input, false); setVis(oNaoEq.label, false); clearIfHidden(oNaoEq.input, false);
                  setVis(oNaoCli.input, false); setVis(oNaoCli.label, false); clearIfHidden(oNaoCli.input, false);
                  if (oNao?.label) oNao.label.innerHTML = '<i class="fa-solid fa-xmark"></i> Não';
                }
                try {
                  const justLab = root.querySelector('label[for="local_seguro_just"]');
                  if (justLab) {
                    if (val === 'avaliacao') justLab.textContent = 'Justifique então como esses equipamentos deverão ser instalados:';
                    else if (val === 'instalacao') justLab.textContent = 'Por que os equipamentos foram instalados fora de um local seguro? Foi autorizado por algum supervisor? Justifique.';
                  }
                } catch {}
                try {
                  const out = root.querySelector('[data-when-field="tipo_serv"][data-when-in="avaliacao"]');
                  if (out) out.setAttribute('data-when-in', 'avaliacao,instalacao');
                } catch {}
              } catch {}
            };
            const srvRadios = root.querySelectorAll('input[name="tipo_serv"]');
            srvRadios.forEach(r => r.addEventListener('change', upgradeLocalSeguro, true));
            upgradeLocalSeguro();
          } catch {}
          // Ajuste do campo de tomada e inserção do aviso de ciência (Ponto Adicional)
          try {
            const temBlock = root.querySelector('input[name="tem_tomada"]')?.closest('.form-block');
            if (temBlock) {
              try {
                const lab = temBlock.querySelector('label.form-label');
                if (lab) lab.textContent = 'Será necessário uma tomada ou foi somente cabeamento neste caso:';
              } catch {}
              try {
                const labSim = temBlock.querySelector('label[for="tem_tomada_sim"]');
                if (labSim) labSim.innerHTML = '<i class="fa-solid fa-check"></i> Será necessário tomada';
              } catch {}
              try {
                const labNao = temBlock.querySelector('label[for=\'tem_tomada_nao\']');
                if (labNao) labNao.innerHTML = '<i class="fa-solid fa-xmark"></i> N\u00e3o';
              } catch {}
              try {
                const labNaoNec = temBlock.querySelector('label[for="tem_tomada_nao_nec"]');
                if (labNaoNec) labNaoNec.innerHTML = '<i class="fa-solid fa-xmark"></i> N\u00e3o ser\u00e1 necess\u00e1rio tomada';
              } catch {}
              try {
                const lab2 = temBlock.querySelector('label.form-label');
                if (lab2) lab2.textContent = 'Tem tomada para ligar o equipamento neste local:';
                try { const lSim = temBlock.querySelector('label[for="tem_tomada_sim"]'); if (lSim) lSim.innerHTML = '<i class="fa-solid fa-check"></i> Sim'; } catch {}
                try { const lNao = temBlock.querySelector('label[for=\'tem_tomada_nao\']'); if (lNao) lNao.innerHTML = '<i class="fa-solid fa-xmark"></i> N\u00e3o'; } catch {}
                try { const extra = temBlock.querySelector('#tem_tomada_nao_nec'); if (extra) { const lbl = temBlock.querySelector('label[for="tem_tomada_nao_nec"]'); if (lbl && lbl.parentNode) lbl.parentNode.removeChild(lbl); if (extra && extra.parentNode) extra.parentNode.removeChild(extra); } } catch {}
              } catch {}
              if (!root.querySelector('#cli_tomada_ciente_sim')) {
                const svcWrap = document.createElement('div');
                svcWrap.className = '';
                svcWrap.setAttribute('data-when-field', 'tipo_serv');
                svcWrap.setAttribute('data-when-in', 'avaliacao');
                svcWrap.setAttribute('data-clear-on-hide', '1');
                const wrap1 = document.createElement('div');
                wrap1.className = 'form-block';
                wrap1.setAttribute('data-when-field', 'tem_tomada');
                wrap1.setAttribute('data-when-equals', 'nao');
                wrap1.setAttribute('data-clear-on-hide', '1');
                wrap1.innerHTML = ''
                  + '<label class="form-label">O cliente está ciente da necessidade de uma tomada no local?</label>\n'
                  + '  <div class="segmented" role="radiogroup" aria-label="Cliente ciente sobre tomada?">\n'
                  + '    <input type="radio" id="cli_tomada_ciente_sim" name="cli_ciente_tomada" value="sim">\n'
                  + '    <label for="cli_tomada_ciente_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
                  + '    <input type="radio" id="cli_tomada_ciente_nao" name="cli_ciente_tomada" value="nao">\n'
                  + '    <label for="cli_tomada_ciente_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
                  + '  </div>';
                svcWrap.appendChild(wrap1);
                const wrap2 = document.createElement('div');
                wrap2.className = 'form-block';
                wrap2.setAttribute('data-when-field', 'cli_ciente_tomada');
                wrap2.setAttribute('data-when-equals', 'nao');
                wrap2.setAttribute('data-clear-on-hide', '1');
                // Solicita justificativa quando o cliente não foi informado sobre a necessidade de tomada
                wrap2.innerHTML = ''
                  + '<label class="form-label" for="cli_tomada_ciente_just">Justifique o motivo pelo qual o cliente não foi informado sobre esta necessidade:</label>\n'
                  + '  <textarea id="cli_tomada_ciente_just" name="cli_tomada_ciente_just" class="form-input--underline auto-expand" placeholder="Digite..." rows="1" data-min-height="32"></textarea>';
                svcWrap.appendChild(wrap2);
                temBlock.insertAdjacentElement('afterend', svcWrap);
                try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
              }
            }
          } catch {}
        } catch {}

        // Exclusividade do grupo "estão no local" com "Nenhum" + confirmação e limpeza
        try {
          const get = (id) => root.querySelector('#' + id);
          const noneEl = get('estao_sel_none');
          const normals = ['estao_sel_ont','estao_sel_onu','estao_sel_rot','estao_sel_outro'].map(get).filter(Boolean);
          const groupBox = (noneEl && (noneEl.closest('.choices') || noneEl.closest('.form-block'))) || null;
          const showInlineAlert = (message) => {
            try {
              if (!groupBox) return;
              const next = groupBox.nextElementSibling;
              if (next && next.classList && (next.classList.contains('sinal-los-hint') || next.classList.contains('inline-alert'))) next.remove();
              const el = document.createElement('div');
              el.className = 'form-hint sinal-los-hint is-highlight';
              if (!el.id) el.id = 'los_hint_' + Math.random().toString(36).slice(2);
              el.textContent = message;
              groupBox.insertAdjacentElement('afterend', el);
              const close = () => { try { el.remove(); } catch {} };
              el.addEventListener('click', close, { once: true });
              setTimeout(close, 5000);
            } catch {}
          };
          const clearMacListsByPrefixes = (prefixes) => {
            try {
              prefixes.forEach(pref => {
                root.querySelectorAll('input[name^="' + pref + '"]').forEach(inp => { inp.value = ''; });
                const list = root.querySelector('.mac-list[data-mac-prefix="' + pref + '"]');
                if (list) {
                  const rows = list.querySelectorAll('.mac-row');
                  if (rows && rows.length) { Array.from(rows).slice(1).forEach(r => r.remove()); }
                  const first = list.querySelector('.mac-row input') || list.querySelector('input');
                  if (first) first.value = '';
                }
              });
              // Limpa "outros" no local
              root.querySelectorAll('.outro-list[data-outro-list]').forEach(list => {
                list.querySelectorAll('input').forEach(inp => { inp.value = ''; });
                const rowsWrap = list.querySelector('.outro-rows');
                if (rowsWrap) {
                  const rows = Array.from(rowsWrap.querySelectorAll('.outro-row'));
                  rows.slice(1).forEach(r => r.remove());
                }
              });
            } catch {}
          };
          if (noneEl) {
            // Atualiza condicionais ao marcar/desmarcar as opções do grupo
            try {
              ['#estao_sel_ont','#estao_sel_onu','#estao_sel_rot','#estao_sel_outro','#estao_sel_none'].forEach(sel => {
                const el = root.querySelector(sel);
                if (el) el.addEventListener('change', () => { try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {} });
              });
            } catch {}
            // Bloqueia clique em outros quando "Nenhum" estiver marcado (mensagem)
            root.addEventListener('click', (e) => {
              try {
                const t = e.target;
                if (!t || t.tagName !== 'INPUT' || t.type !== 'checkbox') return;
                if (!normals.some(n => n === t) && t !== noneEl) return;
                if (t !== noneEl && noneEl.checked) {
                  showInlineAlert('Desmarque a opção "Nenhum" para selecionar algum equipamento.');
                }
              } catch {}
            }, true);
            // Enforce exclusividade + confirmação
            root.addEventListener('change', async (e) => {
              try {
                const t = e.target; if (!t || t.type !== 'checkbox') return;
                if (t === noneEl) {
                  // Ao DESMARCAR 'Nenhum', remover aviso inline imediatamente
                  try {
                    if (!noneEl.checked && groupBox) {
                      const next = groupBox.nextElementSibling;
                      if (next && next.classList && (next.classList.contains('sinal-los-hint') || next.classList.contains('inline-alert'))) next.remove();
                    }
                  } catch {}
                  if (noneEl.checked && normals.some(n => n && n.checked)) {
                    const msgNenhum = 'Ao selecionar "Nenhum", as opções marcadas serão desmarcadas e os campos de MAC serão limpos. Confirmar?';
                    const ok = (await (window.__appModal?.showConfirm(msgNenhum, { okText: 'Confirmar', cancelText: 'Cancelar', danger: true }) || Promise.resolve(null))) ?? window.confirm(msgNenhum);
                    if (!ok) { noneEl.checked = false; try { const key = noneEl.name || noneEl.id; if (key && typeof setFormState === 'function') setFormState('ponto-adicional', { [key]: false }); } catch {}; return; }
                    // Desmarca outros e limpa
                    normals.forEach(n => { if (n && n.checked) { n.checked = false; try { const key = n.name || n.id; if (key && typeof setFormState === 'function') setFormState('ponto-adicional', { [key]: false }); } catch {} } });
                    clearMacListsByPrefixes(['estao_ont_mac_','estao_onu_mac_','estao_rot_mac_','estao_outro_mac_']);
                    try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
                  }
                } else if (normals.includes(t)) {
                  if (noneEl.checked) {
                    // mantém Nenhum exclusivo
                    t.checked = false;
                    try { const key = t.name || t.id; if (key && typeof setFormState === 'function') setFormState('ponto-adicional', { [key]: false }); } catch {}
                    showInlineAlert('Desmarque a opção "Nenhum" para selecionar algum equipamento.');
                  } else {
                    // algum normal foi marcado: garante Nenhum desmarcado
                    if (noneEl.checked) { noneEl.checked = false; try { const key = noneEl.name || noneEl.id; if (key && typeof setFormState === 'function') setFormState('ponto-adicional', { [key]: false }); } catch {} }
                  }
                  try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root); } catch {}
                }
              } catch {}
            });
          }
        } catch {}

        // Cabeamento embutido: controla cd_qt_cabos -> cd_cabos_multi e aplica condicionais
        try {
          const qt = root.querySelector('#cd_qt_cabos');
          const flag = root.querySelector('#cd_cabos_multi');
          const applyQt = () => {
            try {
              const digits = String(qt.value||'').replace(/\D/g,'');
              if (qt.value !== digits) qt.value = digits;
              const v = parseInt(digits||'0', 10);
              if (flag) flag.value = (v>1) ? 'sim' : 'nao';
              try { if (typeof setFormState === 'function') setFormState('ponto-adicional', { cd_cabos_multi: flag ? flag.value : ((v>1)?'sim':'nao') }); } catch {}
              if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('ponto-adicional', root);
            } catch {}
          };
          if (qt && flag) { ['input','change','keyup','blur'].forEach(evt => qt.addEventListener(evt, applyQt)); applyQt(); }
        } catch {}

        // Cabeamento embutido: máscara e cálculo para #cd_cabometros
        try {
          const inp2 = root.querySelector('#cd_cabometros');
          const hint2 = root.querySelector('#cd_cabocusto');
          const onInput2 = (e) => {
            try {
              let s=(inp2.value||'').toLowerCase().replace(/m/g,'');
              s=s.replace(/\./g,',').replace(/[^0-9,]/g,'');
              const parts=s.split(','); if (parts.length>1) s=parts.shift()+','+parts.join('').replace(/,/g,'');
              if (e && e.inputType==='deleteContentBackward'){
                const pos=inp2.selectionStart||0; const atEnd=pos===(inp2.value||'').length; if (atEnd) s=s.slice(0,-1);
              }
              inp2.value = s ? (s+'m') : '';
              const v = parseFloat((s||'').replace(',','.'))||0;
              if (hint2) hint2.textContent = 'Previsão de custos sobre este cabeamento: ' + ('R$' + (v*3).toFixed(2).replace('.', ','));
            } catch {}
          };
          if (inp2){ inp2.addEventListener('input', onInput2); inp2.addEventListener('change', onInput2); onInput2(); }
        } catch {}

        // Máscara e normalização para metragem com sufixo 'm' (aceita somente números e separador decimal)
        try {
          const inp = root.querySelector('#cabometros');
          if (inp) {
            const clean = (v) => {
              if (!v) return '';
              let s = String(v).toLowerCase().replace(/m/g,'');
              s = s.replace(/\./g, ',');
              // mantém apenas dígitos e uma vírgula
              s = s.replace(/[^0-9,]/g, '');
              const parts = s.split(',');
              if (parts.length > 1) s = parts.shift() + ',' + parts.join('').replace(/,/g,'');
              return s;
            };
            const format = (s) => s ? (s + 'm') : '';
            const onInput = (e) => {
              let base = clean(inp.value);
              // Se apagar para trás no fim do campo, remova também um dígito
              if (e && e.inputType === 'deleteContentBackward') {
                const pos = inp.selectionStart || 0;
                const atEnd = pos === (inp.value || '').length;
                if (atEnd) base = base.slice(0, -1);
              }
              inp.value = format(base);
              try {
                const hint = root.querySelector('#cabocusto');
                const m = parseFloat((base || '0').replace(',', '.')) || 0;
                const total = m * 3;
                if (hint) hint.textContent = 'Previsão de custos sobre este cabeamento: ' + ('R$' + total.toFixed(2).replace('.', ','));
              } catch {}
            };
            const onKeyDown = (e) => {
              if (e.key === 'Backspace') {
                const base = clean(inp.value);
                if (base.length <= 1) {
                  e.preventDefault();
                  inp.value = '';
                  try { const hint = root.querySelector('#cabocusto'); if (hint) hint.textContent = 'Previsão de custos sobre este cabeamento: R$0,00'; } catch {}
                }
              }
            };
            inp.addEventListener('keydown', onKeyDown);
            inp.addEventListener('input', onInput);
            inp.addEventListener('change', onInput);
            onInput();
          }
        } catch {}
      }
    }
    ,
/*    'cabeamento-dispositivo': {
      equipe: 'carro',
      titulo: 'Cabeamento de Dispositivo',
      descricao: 'Passagem e cabeamento de dispositivo(s) do cliente',
      icon: 'fa-ethernet',
      badge: 'teal',
      atualizadoEm: '11/09/2025 00:00',
      render: (root) => {
        root.innerHTML = ''+
        // Seção 1: Informações do Cliente (padrão)
        '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-id-card"></i> Informações do Cliente</div>\n'
        + '    <div class="form-subtitle">Preencha quem acompanhou</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="clienteNome">Quem acompanhou</label>\n'
        + '    <input id="clienteNome" name="clienteNome" type="text" class="form-input" placeholder="Ex.: Maria Souza" autocomplete="name" />\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 2: Endereço e informações
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-location-dot"></i> ENDEREÇO E INFORMAÇÕES DA O.S</div>\n'
        + '    <div class="form-subtitle">Captura automática da localização</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foto da frente da casa anexada no MK?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto frente anexada?">\n'
        + '      <input type="radio" id="mkfoto_sim" name="mkfoto" value="sim">\n'
        + '      <label for="mkfoto_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="mkfoto_nao" name="mkfoto" value="nao">\n'
        + '      <label for="mkfoto_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">As fotos dos equipamentos no local e do serviço realizado foram anexadas?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Fotos dos equipamentos e serviço anexadas?">\n'
        + '      <input type="radio" id="cd_fotos_equip_sim" name="cd_fotos_equip" value="sim">\n'
        + '      <label for="cd_fotos_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="cd_fotos_equip_nao" name="cd_fotos_equip" value="nao">\n'
        + '      <label for="cd_fotos_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_fotos_equip" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="cd_fotos_equip_just">Justifique o motivo de não ter anexado:</label>\n'
        + '    <input id="cd_fotos_equip_just" name="cd_fotos_equip_just" type="text" class="form-input--underline" placeholder="Digite..." />\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 3: Informações técnicas do atendimento
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-square-check"></i> INFORMAÇÕES TÉCNICAS DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Cabeamento viável:</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Cabeamento viável?">\n'
        + '      <input type="radio" id="cd_viavel_sim" name="cd_viavel" value="sim">\n'
        + '      <label for="cd_viavel_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="cd_viavel_nao" name="cd_viavel" value="nao">\n'
        + '      <label for="cd_viavel_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Há passagem adequada para o cabo de rede (Ex.: Conduite):</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Passagem adequada?">\n'
        + '      <input type="radio" id="cd_passagem_sim" name="cd_passagem" value="sim">\n'
        + '      <label for="cd_passagem_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="cd_passagem_nao" name="cd_passagem" value="nao">\n'
        + '      <label for="cd_passagem_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="cd_trajeto_obs">Observações sobre o trajeto do cabo de rede:</label>\n'
        + '    <textarea id="cd_trajeto_obs" name="cd_trajeto_obs" class="form-input--underline auto-expand" placeholder="Explique o trajeto do cabo de rede Ex.: Necessário passar por cima do forro..." rows="3" data-min-height="90"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="cd_qt_cabos">Quantos cabos de rede foram passados?</label>\n'
        + '    <input id="cd_qt_cabos" name="cd_qt_cabos" type="text" inputmode="decimal" class="form-input--underline" placeholder="Ex.: 2" />\n'
        + '    <input id="cd_cabos_multi" name="cd_cabos_multi" type="hidden" value="nao" />\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="cd_quais_disp">Quais dispositivos foram cabeados:</label>\n'
        + '    <input id="cd_quais_disp" name="cd_quais_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_cabos_multi" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="cd_qual_disp">Qual dispositivo foi cabeado:</label>\n'
        + '    <input id="cd_qual_disp" name="cd_qual_disp" type="text" class="form-input--underline" placeholder="Ex.: Televisão, computador..." />\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="cd_cabometros">Metragem de cabo de rede total para este serviço:</label>\n'
        + '    <input id="cd_cabometros" name="cd_cabometros" type="text" inputmode="decimal" class="form-input--underline" placeholder="Digite a metragem, ex.: 10m" />\n'
        + '    <div class="form-hint" id="cd_cabocusto" style="margin-top:6px;">Previsão de custos sobre este cabeamento: R$0,00</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">O cabeamento é na mesma residência?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Mesma residência?">\n'
        + '      <input type="radio" id="cd_mesma_res_sim" name="cd_mesma_res" value="sim">\n'
        + '      <label for="cd_mesma_res_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="cd_mesma_res_nao" name="cd_mesma_res" value="nao">\n'
        + '      <label for="cd_mesma_res_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="cd_desc_onde">Neste caso informe para onde o cabo foi passado:</label>\n'
        + '    <input id="cd_desc_onde" name="cd_desc_onde" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_mesma_res" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Informe para qual cômodo foi este cabo:</label>\n'
        + '    <div class="segmented segmented--stack" role="radiogroup" aria-label="Cômodo">\n'
        + '      <input type="radio" id="cd_comodo_sala" name="cd_comodo" value="sala">\n'
        + '      <label for="cd_comodo_sala">Sala</label>\n'
        + '      <input type="radio" id="cd_comodo_quarto" name="cd_comodo" value="quarto">\n'
        + '      <label for="cd_comodo_quarto">Quarto</label>\n'
        + '      <input type="radio" id="cd_comodo_area" name="cd_comodo" value="area">\n'
        + '      <label for="cd_comodo_area">Área</label>\n'
        + '      <input type="radio" id="cd_comodo_cozinha" name="cd_comodo" value="cozinha">\n'
        + '      <label for="cd_comodo_cozinha">Cozinha</label>\n'
        + '      <input type="radio" id="cd_comodo_outros" name="cd_comodo" value="outros">\n'
        + '      <label for="cd_comodo_outros">Outros</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_comodo" data-when-equals="outros" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="cd_instal_local">Neste caso descreva para onde o cabo de rede foi passado:</label>\n'
        + '    <input id="cd_instal_local" name="cd_instal_local" type="text" class="form-input--underline" placeholder="Explique..." />\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 4: Equipamentos do atendimento
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-screwdriver-wrench"></i> EQUIPAMENTOS DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" id="cd_lbl_ret_equip">Foi RETIRADO algum equipamento durante este atendimento?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Retirado algum equipamento?">\n'
        + '      <input type="radio" id="cd_ret_equip_sim" name="cd_ret_equip" value="sim">\n'
        + '      <label for="cd_ret_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="cd_ret_equip_nao" name="cd_ret_equip" value="nao">\n'
        + '      <label for="cd_ret_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_ret_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Selecione o equipamento retirado e insira seu MAC: <span class="form-hint">(múltipla escolha)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="cd_eq_sel_ont" name="cd_eq_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="cd_eq_sel_onu" name="cd_eq_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="cd_eq_sel_rot" name="cd_eq_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="cd_eq_sel_outro" name="cd_eq_sel_outro"><span>Outros</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_eq_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ont_mac_">\n'
        + '      <input type="text" id="cd_ont_mac_1" name="ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_eq_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="onu_mac_">\n'
        + '      <input type="text" id="cd_onu_mac_1" name="onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_eq_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="rot_mac_">\n'
        + '      <input type="text" id="cd_rot_mac_1" name="rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_eq_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos retirados:</label>\n'
        + '    <div class="outro-list" data-outro-list="1">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foi INSERIDO algum equipamento?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Inserido algum equipamento?">\n'
        + '      <input type="radio" id="cd_ficou_equip_sim" name="cd_ficou_equip" value="sim">\n'
        + '      <label for="cd_ficou_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="cd_ficou_equip_nao" name="cd_ficou_equip" value="nao">\n'
        + '      <label for="cd_ficou_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_ficou_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Selecione os equipamentos inseridos e insira seus MACs: <span class="form-hint">(múltipla escolha)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="cd_ins_sel_ont" name="cd_ins_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="cd_ins_sel_onu" name="cd_ins_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="cd_ins_sel_rot" name="cd_ins_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="cd_ins_sel_outro" name="cd_ins_sel_outro"><span>Outros</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_ins_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_ont_mac_">\n'
        + '      <input type="text" id="cd_ins_ont_mac_1" name="ins_ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_ins_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_onu_mac_">\n'
        + '      <input type="text" id="cd_ins_onu_mac_1" name="ins_onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_ins_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_rot_mac_">\n'
        + '      <input type="text" id="cd_ins_rot_mac_1" name="ins_rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="cd_ins_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos inseridos:</label>\n'
        + '    <div class="outro-list" data-outro-list="1">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 5: DESCRIÇÃO DA O.S
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-file-lines"></i> FINALIZAÇÃO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="descricao_os">Descreva detalhes adicionais sobre o atendimento:</label>\n'
        + '    <textarea id="descricao_os" name="descricao_os" class="form-input--underline auto-expand" placeholder="Informe algum detalhe importante sobre este serviço, sobre o trajeto do cabeamento" rows="4" data-min-height="120"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<div class="form-actions">\n'
        + '  <button id="btnLimparForm" type="button" class="btn-action btn-action--gray"><i class="fa-solid fa-eraser"></i> Limpar respostas</button>\n'
        + '  <button id="btnCopiarForm" type="button" class="btn-action btn-action--red"><i class="fa-solid fa-copy"></i> Copiar</button>\n'
        + '</div>';

        // Pós-render: lógica específica
        try {
          // Controla cd_cabos_multi conforme quantidade digitada (>1 => sim)
          const qt = root.querySelector('#cd_qt_cabos');
          const flag = root.querySelector('#cd_cabos_multi');
          const applyQt = () => {
            try {
              // apenas números inteiros (limpa qualquer caractere não numérico)
              const digits = String(qt.value||'').replace(/\D/g,'');
              if (qt.value !== digits) qt.value = digits;
              const v = parseInt(digits || '0', 10);
              const isMulti = (typeof v === 'number' && !isNaN(v) && v > 1);
              flag.value = isMulti ? 'sim' : 'nao';
              try { if (typeof setFormState === 'function') setFormState('cabeamento-dispositivo', { cd_cabos_multi: flag.value }); } catch {}
              if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('cabeamento-dispositivo', root);
            } catch {}
          };
          if (qt && flag) { ['input','change','keyup','blur'].forEach(evt => qt.addEventListener(evt, applyQt)); applyQt(); }
        } catch {}
        try {
          // Cálculo de custo por metragem (R$ 3,00 por metro)
          const inp = root.querySelector('#cd_cabometros');
          const hint = root.querySelector('#cd_cabocusto');
          const fmtBRL = (n) => { try { return 'R$' + (Number(n||0).toFixed(2)).replace('.', ','); } catch { return 'R$0,00'; } };
          const parseNum = (v) => { try { const s=String(v||'').replace(/\./g,'').replace(',', '.').replace(/[^0-9.\-]/g,''); const n=parseFloat(s); return isNaN(n)?0:n; } catch { return 0; } };
          const recalc = () => { try { const m=parseNum(inp.value); const total=m*3; if (hint) hint.textContent = 'Previsão de custos sobre este cabeamento: ' + fmtBRL(total); } catch {} };
          if (inp) { inp.addEventListener('input', recalc); inp.addEventListener('change', recalc); recalc(); }
        } catch {}
        
        // Máscara com sufixo 'm' para metragem (aceita somente números e vírgula) + recalcula em tempo real
        try {
          const inp = root.querySelector('#cd_cabometros');
          if (inp) {
            const hint = root.querySelector('#cd_cabocusto');
            const clean = (v) => {
              if (!v) return '';
              let s = String(v).toLowerCase().replace(/m/g,'');
              s = s.replace(/\./g, ',');
              s = s.replace(/[^0-9,]/g, '');
              const parts = s.split(',');
              if (parts.length > 1) s = parts.shift() + ',' + parts.join('').replace(/,/g,'');
              return s;
            };
            const format = (s) => s ? (s + 'm') : '';
            const onInput = (e) => {
              let base = clean(inp.value);
              if (e && e.inputType === 'deleteContentBackward') {
                const pos = inp.selectionStart || 0;
                const atEnd = pos === (inp.value || '').length;
                if (atEnd) base = base.slice(0, -1);
              }
              inp.value = format(base);
              try {
                const m = parseFloat((base || '0').replace(',', '.')) || 0;
                const total = m * 3;
                if (hint) hint.textContent = 'Previsão de custos sobre este cabeamento: ' + ('R$' + total.toFixed(2).replace('.', ','));
              } catch {}
            };
            const onKeyDown = (e) => {
              if (e.key === 'Backspace') {
                const base = clean(inp.value);
                if (base.length <= 1) {
                  e.preventDefault();
                  inp.value = '';
                  try { if (hint) hint.textContent = 'Previsão de custos sobre este cabeamento: R$0,00'; } catch {}
                }
              }
            };
            inp.addEventListener('keydown', onKeyDown);
            inp.addEventListener('input', onInput);
            inp.addEventListener('change', onInput);
            onInput();
          }
        } catch {}

        // Observação: neste formulário não há opção de "Nenhum equipamento"; simplificado conforme padrão atual
      }
    } */
    'suporte-tecnico-carro': {
      equipe: 'carro',
      titulo: 'Suporte Técnico',
      descricao: 'Atendimento técnico em campo',
      icon: 'fa-screwdriver-wrench',
      badge: 'indigo',
      atualizadoEm: '11/09/2025 00:00',
      render: (root) => {
        root.innerHTML = ''+
        // Seção 1: Informações do Cliente (padrão)
        '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-id-card"></i> Informações do Cliente</div>\n'
        + '    <div class="form-subtitle">Preencha quem acompanhou</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="clienteNome">Quem acompanhou</label>\n'
        + '    <input id="clienteNome" name="clienteNome" type="text" class="form-input" placeholder="Ex.: Maria Souza" autocomplete="name" />\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 2: Endereço e informações
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-location-dot"></i> ENDEREÇO E INFORMAÇÕES DA O.S</div>\n'
        + '    <div class="form-subtitle">Captura automática da localização</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foto da frente da casa anexada no MK?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto frente anexada?">\n'
        + '      <input type="radio" id="mkfoto_sim" name="mkfoto" value="sim">\n'
        + '      <label for="mkfoto_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="mkfoto_nao" name="mkfoto" value="nao">\n'
        + '      <label for="mkfoto_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">As fotos dos equipamentos no local e do serviço realizado foram anexadas?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Fotos dos equipamentos e serviço anexadas?">\n'
        + '      <input type="radio" id="stc_fotos_equip_sim" name="stc_fotos_equip" value="sim">\n'
        + '      <label for="stc_fotos_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="stc_fotos_equip_nao" name="stc_fotos_equip" value="nao">\n'
        + '      <label for="stc_fotos_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="stc_fotos_equip" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="stc_fotos_equip_just">Justifique o motivo de não ter anexado:</label>\n'
        + '    <input id="stc_fotos_equip_just" name="stc_fotos_equip_just" type="text" class="form-input--underline" placeholder="Digite..." />\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 3: Informações técnicas do atendimento
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-square-check"></i> INFORMAÇÕES TÉCNICAS DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Selecione o tipo de serviço executado:</label>\n'
        + '    <div class="segmented segmented--stack" role="radiogroup" aria-label="Tipo de serviço">\n'
        + '      <input type="radio" id="stc_tipo_los" name="stc_tipo_serv" value="los">\n'
        + '      <label for="stc_tipo_los">LOS ou sem acesso em geral</label>\n'
        + '      <input type="radio" id="stc_tipo_mud" name="stc_tipo_serv" value="mudanca">\n'
        + '      <label for="stc_tipo_mud">Mudança cômodo/remanejar fibra</label>\n'
         + '      <input type="radio" id="stc_tipo_quebra" name="stc_tipo_serv" value="quebra_slot">\n'
         + '      <label for="stc_tipo_quebra">Quebra de slot</label>\n'
         + '      <input type="radio" id="stc_tipo_outros" name="stc_tipo_serv" value="outros">\n'
         + '      <label for="stc_tipo_outros">Outros serviços</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-cond" data-when-field="stc_tipo_serv" data-when-in="los,mudanca,outros" data-clear-on-hide="1" hidden>\n'
        + '  <div class="form-block form-cond" data-when-field="stc_tipo_serv" data-when-equals="outros" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="stc_outros_desc">Qual serviço foi executado:</label>\n'
        + '    <textarea id="stc_outros_desc" name="stc_outros_desc" class="form-input--underline auto-expand" placeholder="De forma simplificada, ex.: Troca de alça, fitagem de poste..." rows="3" data-min-height="90"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Necessário encaminhar para equipe da caixa ou da estrutura:</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Encaminhar equipe da caixa/estrutura?">\n'
        + '      <input type="radio" id="stc_enc_sim" name="stc_enc" value="sim">\n'
        + '      <label for="stc_enc_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="stc_enc_nao" name="stc_enc" value="nao">\n'
        + '      <label for="stc_enc_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="stc_enc" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="stc_enc_situacao">Qual a situação do local:</label>\n'
        + '    <textarea id="stc_enc_situacao" name="stc_enc_situacao" class="form-input--underline auto-expand" placeholder="Ex.: Troca de poste, rompimento carga alta..." rows="3" data-min-height="90"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Necessário passar uma nova fibra:</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Passar nova fibra?">\n'
        + '      <input type="radio" id="stc_novafibra_sim" name="stc_novafibra" value="sim">\n'
        + '      <label for="stc_novafibra_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="stc_novafibra_nao" name="stc_novafibra" value="nao">\n'
        + '      <label for="stc_novafibra_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foi necessário passar cabo de rede?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Passou cabo de rede?">\n'
        + '      <input type="radio" id="stc_cab_rede_sim" name="stc_cab_rede" value="sim">\n'
        + '      <label for="stc_cab_rede_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="stc_cab_rede_nao" name="stc_cab_rede" value="nao">\n'
        + '      <label for="stc_cab_rede_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="stc_cab_rede" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="cabometros">Metragem de cabo de rede para este serviço:</label>\n'
        + '    <input id="cabometros" name="cabometros" type="text" inputmode="decimal" class="form-input--underline" placeholder="Digite a metragem, ex.: 10m" />\n'
        + '    <div class="form-hint" id="cabocusto" style="margin-top:6px;">Previsão de custos sobre este cabeamento: R$0,00</div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="stc_cab_rede" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="qtd_cabos">Quantos cabos de rede foram passados?</label>\n'
        + '    <input id="qtd_cabos" name="qtd_cabos" type="text" inputmode="numeric" class="form-input--underline" placeholder="Digite a quantidade, ex.: 2" />\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="stc_cab_rede" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="disp_cabeado">Qual dispositivo foi cabeado:</label>\n'
        + '    <input id="disp_cabeado" name="disp_cabeado" type="text" class="form-input--underline" placeholder="Ex.: ONT, Roteador, DVR..." />\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="stc_cab_rede" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="trajeto_obs">Observações sobre o trajeto do cabo de rede (se houver):</label>\n'
        + '    <textarea id="trajeto_obs" name="trajeto_obs" class="form-input--underline auto-expand" placeholder="Explique o trajeto do cabo de rede Ex.: Necessário passar por cima do forro..." rows="3" data-min-height="90"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="sinal_fibra">Sinal da fibra na PTO:</label>\n'
        + '    <input id="sinal_fibra" name="sinal_fibra" data-sinal-fibra="1" type="text" class="form-input--underline" inputmode="decimal" placeholder="-00.00" />\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="stc_cx_ident">Identificação da CTO que atende ao cliente:</label>\n'
        + '    <input id="stc_cx_ident" name="stc_cx_ident" type="text" class="form-input--underline" placeholder="Informe a caixa aqui..." />\n'
        + '  </div>\n'
        + '  </div>\n'
        + '  <div class="form-cond" data-when-field="stc_tipo_serv" data-when-equals="quebra_slot" data-clear-on-hide="1" hidden>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label">Necessário passar uma nova fibra:</label>\n'
        + '      <div class="segmented" role="radiogroup" aria-label="Passar nova fibra?">\n'
        + '        <input type="radio" id="qs_novafibra_sim" name="qs_novafibra" value="sim">\n'
        + '        <label for="qs_novafibra_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '        <input type="radio" id="qs_novafibra_nao" name="qs_novafibra" value="nao">\n'
        + '        <label for="qs_novafibra_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '      </div>\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="sinal_fibra">Sinal da fibra na PTO:</label>\n'
        + '      <input id="sinal_fibra" name="sinal_fibra" data-sinal-fibra="1" type="text" class="form-input--underline" inputmode="decimal" placeholder="-00.00" />\n'
        + '    </div>\n'
        + '    <div class="form-block">\n'
        + '      <label class="form-label" for="qs_cx_ident">Identificação da CTO que atende ao cliente:</label>\n'
        + '      <input id="qs_cx_ident" name="qs_cx_ident" type="text" class="form-input--underline" placeholder="Informe a caixa aqui..." />\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 4: Equipamentos do atendimento
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-screwdriver-wrench"></i> EQUIPAMENTOS DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foi RETIRADO algum equipamento durante este atendimento?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Retirado algum equipamento?">\n'
        + '      <input type="radio" id="ret_equip_sim" name="ret_equip" value="sim">\n'
        + '      <label for="ret_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_equip_nao" name="ret_equip" value="nao">\n'
        + '      <label for="ret_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Selecione o equipamento retirado e insira seu MAC: <span class="form-hint">(múltipla escolha)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_ont" name="eq_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_onu" name="eq_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_rot" name="eq_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_outro" name="eq_sel_outro"><span>Outros</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ont_mac_">\n'
        + '      <input type="text" id="stc_ont_mac_1" name="ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="onu_mac_">\n'
        + '      <input type="text" id="stc_onu_mac_1" name="onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="rot_mac_">\n'
        + '      <input type="text" id="stc_rot_mac_1" name="rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos retirados:</label>\n'
        + '    <div class="outro-list" data-outro-list="1">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foi INSERIDO algum equipamento?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Inserido algum equipamento?">\n'
        + '      <input type="radio" id="ficou_equip_sim" name="ficou_equip" value="sim">\n'
        + '      <label for="ficou_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ficou_equip_nao" name="ficou_equip" value="nao">\n'
        + '      <label for="ficou_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ficou_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Selecione os equipamentos inseridos e insira seus MACs: <span class="form-hint">(múltipla escolha)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_ont" name="ins_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_onu" name="ins_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_rot" name="ins_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_outro" name="ins_sel_outro"><span>Outros</span></label>\n'
        
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_ont_mac_">\n'
        + '      <input type="text" id="stc_ins_ont_mac_1" name="ins_ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_onu_mac_">\n'
        + '      <input type="text" id="stc_ins_onu_mac_1" name="ins_onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_rot_mac_">\n'
        + '      <input type="text" id="stc_ins_rot_mac_1" name="ins_rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos inseridos:</label>\n'
        + '    <div class="outro-list" data-outro-list="1">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Equipamentos da ETECC (comodato ou compra) que estão no local: <span class="form-hint">(Exceto os acima, se houver. Múltipla escolha.)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="estao_sel_ont" name="estao_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="estao_sel_onu" name="estao_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="estao_sel_rot" name="estao_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="estao_sel_outro" name="estao_sel_outro"><span>Outros</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="estao_sel_none" name="estao_sel_none"><span>Nenhum</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="estao_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (no local):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="estao_ont_mac_">\n'
        + '      <input type="text" id="stc_estao_ont_mac_1" name="estao_ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="estao_ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="estao_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (no local):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="estao_onu_mac_">\n'
        + '      <input type="text" id="stc_estao_onu_mac_1" name="estao_onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="estao_onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="estao_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (no local):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="estao_rot_mac_">\n'
        + '      <input type="text" id="stc_estao_rot_mac_1" name="estao_rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="estao_rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="estao_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos que estão no local:</label>\n'
        + '    <div class="outro-list" data-outro-list="1" data-outro-name-prefix="estao_outro_nome_" data-outro-mac-prefix="estao_outro_mac_">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 5: DESCRIÇÃO DA O.S
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-file-lines"></i> FINALIZAÇÃO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="descricao_os">Descreva detalhes adicionais sobre o atendimento:</label>\n'
        + '    <textarea id="descricao_os" name="descricao_os" class="form-input--underline auto-expand" placeholder="Descreva o relatório final sobre o serviço realizado, imprevistos que podem ter ocorrido ou observações importantes que precisam ficar registradas..." rows="4" data-min-height="120"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<div class="form-actions">\n'
        + '  <button id="btnLimparForm" type="button" class="btn-action btn-action--gray"><i class="fa-solid fa-eraser"></i> Limpar respostas</button>\n'
        + '  <button id="btnCopiarForm" type="button" class="btn-action btn-action--red"><i class="fa-solid fa-copy"></i> Copiar</button>\n'
        + '</div>';

        // Pós-render: lógicas auxiliares deste formulário
        try {
          ['#eq_sel_ont','#eq_sel_onu','#eq_sel_rot','#eq_sel_outro'].forEach(sel => {
            const el = root.querySelector(sel);
            if (el) el.addEventListener('change', () => { try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('suporte-tecnico-carro', root); } catch {} });
          });
        } catch {}
        try {
          ['#ins_sel_ont','#ins_sel_onu','#ins_sel_rot','#ins_sel_outro'].forEach(sel => {
            const el = root.querySelector(sel);
            if (el) el.addEventListener('change', () => { try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('suporte-tecnico-carro', root); } catch {} });
          });
        } catch {}
        try {
          ['#estao_sel_ont','#estao_sel_onu','#estao_sel_rot','#estao_sel_outro','#estao_sel_none'].forEach(sel => {
            const el = root.querySelector(sel);
            if (el) el.addEventListener('change', () => { try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('suporte-tecnico-carro', root); } catch {} });
          });
        } catch {}

        // Exclusividade do grupo "estão no local" com "Nenhum" + confirmação e limpeza
        try {
          const get = (id) => root.querySelector('#'+id);
          const noneEl = get('estao_sel_none');
          const normals = ['estao_sel_ont','estao_sel_onu','estao_sel_rot','estao_sel_outro'].map(get).filter(Boolean);
          const groupBox = (noneEl && (noneEl.closest('.choices') || noneEl.closest('.form-block'))) || null;
          const showInlineAlert = (message) => {
            try {
              if (!groupBox) return;
              const next = groupBox.nextElementSibling;
              if (next && next.classList && (next.classList.contains('sinal-los-hint') || next.classList.contains('inline-alert'))) next.remove();
              const el = document.createElement('div');
              // Mesmo estilo visual do aviso de "Sem sinal"
              el.className = 'form-hint sinal-los-hint is-highlight';
              if (!el.id) el.id = 'los_hint_' + Math.random().toString(36).slice(2);
              el.textContent = message;
              groupBox.insertAdjacentElement('afterend', el);
              const close = () => { try { el.remove(); } catch {} };
              el.addEventListener('click', close, { once: true });
              setTimeout(close, 5000);
            } catch {}
          };
          const clearMacListsByPrefixes = (prefixes) => {
            try {
              prefixes.forEach(pref => {
                root.querySelectorAll('input[name^="'+pref+'"]').forEach(inp => { inp.value=''; });
                const list = root.querySelector('.mac-list[data-mac-prefix="'+pref+'"]');
                if (list) {
                  const rows = list.querySelectorAll('.mac-row');
                  if (rows && rows.length) { Array.from(rows).slice(1).forEach(r => r.remove()); }
                  const first = list.querySelector('.mac-row input') || list.querySelector('input');
                  if (first) first.value='';
                }
              });
              // Limpa "outros" no local
              root.querySelectorAll('.outro-list[data-outro-list]').forEach(list => {
                list.querySelectorAll('input').forEach(inp => { inp.value=''; });
                const rowsWrap = list.querySelector('.outro-rows');
                if (rowsWrap) {
                  const rows = Array.from(rowsWrap.querySelectorAll('.outro-row'));
                  rows.slice(1).forEach(r => r.remove());
                }
              });
            } catch {}
          };
          if (noneEl) {
            // Bloqueia clique em outros quando Nenhum estiver marcado (mensagem)
            root.addEventListener('click', (e) => {
              try {
                const t = e.target;
                if (!t || t.tagName !== 'INPUT' || t.type !== 'checkbox') return;
                if (!normals.some(n=>n===t) && t !== noneEl) return;
                if (t !== noneEl && noneEl.checked) {
                  showInlineAlert('Desmarque a opção "Nenhum" para selecionar algum equipamento.');
                }
              } catch {}
            }, true);
            // Enforce exclusividade + confirmação
            root.addEventListener('change', async (e) => {
              try {
                const t = e.target; if (!t || t.type !== 'checkbox') return;
                if (t === noneEl) {
                  // Ao DESMARCAR 'Nenhum', remover aviso inline imediatamente
                  try {
                    if (!noneEl.checked && groupBox) {
                      const next = groupBox.nextElementSibling;
                      if (next && next.classList && (next.classList.contains('sinal-los-hint') || next.classList.contains('inline-alert'))) next.remove();
                    }
                  } catch {}
                  if (noneEl.checked && normals.some(n => n && n.checked)) {
                    const msgNenhum = 'Ao selecionar "Nenhum", as opções marcadas serão desmarcadas e os campos de MAC serão limpos. Confirmar?';
                    const ok = (await (window.__appModal?.showConfirm(msgNenhum, { okText:'Confirmar', cancelText:'Cancelar', danger: true }) || Promise.resolve(null))) ?? window.confirm(msgNenhum);
                    if (!ok) { noneEl.checked = false; try { const key = noneEl.name||noneEl.id; if (key && typeof setFormState==='function') setFormState('suporte-tecnico-carro', { [key]: false }); } catch {}; return; }
                    // Desmarca outros e limpa
                    normals.forEach(n => { if (n && n.checked) { n.checked = false; try { const key = n.name||n.id; if (key && typeof setFormState==='function') setFormState('suporte-tecnico-carro', { [key]: false }); } catch {} } });
                    clearMacListsByPrefixes(['estao_ont_mac_','estao_onu_mac_','estao_rot_mac_','estao_outro_mac_']);
                    try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('suporte-tecnico-carro', root); } catch {}
                  }
                } else if (normals.includes(t)) {
                  if (noneEl.checked) {
                    // mantém Nenhum exclusivo
                    t.checked = false;
                    try { const key = t.name||t.id; if (key && typeof setFormState==='function') setFormState('suporte-tecnico-carro', { [key]: false }); } catch {}
                    showInlineAlert('Desmarque a opção "Nenhum" para selecionar algum equipamento.');
                  } else {
                    // algum normal foi marcado: garante Nenhum desmarcado
                    if (noneEl.checked) { noneEl.checked = false; try { const key = noneEl.name||noneEl.id; if (key && typeof setFormState==='function') setFormState('suporte-tecnico-carro', { [key]: false }); } catch {} }
                  }
                  try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('suporte-tecnico-carro', root); } catch {}
                }
              } catch {}
            });
          }
        } catch {}

        // Quebra de slot: também exibir "Necessário encaminhar..." e posicionar "Insira a identificação da caixa" logo abaixo
        try {
          const qsWrap = root.querySelector('.form-cond[data-when-field="stc_tipo_serv"][data-when-equals="quebra_slot"]');
          if (qsWrap && !qsWrap.__encCloned) {
            const encSeg = root.querySelector('.form-cond[data-when-field="stc_tipo_serv"][data-when-in="los,mudanca,outros"] .segmented[aria-label="Encaminhar equipe da caixa/estrutura?"]');
            if (encSeg) {
              const encBlock = encSeg.closest('.form-block');
              const firstBlock = qsWrap.querySelector('.form-block');
              const encClone = encBlock.cloneNode(true);
              qsWrap.insertBefore(encClone, firstBlock || null);
              // Corrige IDs/for nos radios clonados para evitar conflitos e garantir destaque visual
              try {
                const sim = encClone.querySelector('#stc_enc_sim');
                const simLab = encClone.querySelector('label[for="stc_enc_sim"]');
                const nao = encClone.querySelector('#stc_enc_nao');
                const naoLab = encClone.querySelector('label[for="stc_enc_nao"]');
                if (sim) sim.id = 'stc_enc_sim_qs';
                if (simLab) simLab.setAttribute('for','stc_enc_sim_qs');
                if (nao) nao.id = 'stc_enc_nao_qs';
                if (naoLab) naoLab.setAttribute('for','stc_enc_nao_qs');
              } catch {}
              // clonar "Qual a situação do local" e inserir logo abaixo do encaminhar
              let situClone = null;
              try {
                const baseWrap = root.querySelector('.form-cond[data-when-field="stc_tipo_serv"][data-when-in="los,mudanca,outros"]');
                const situBase = baseWrap ? baseWrap.querySelector('.form-block[data-when-field="stc_enc"][data-when-equals="sim"]') : null;
                if (situBase) {
                  situClone = situBase.cloneNode(true);
                  // Renomeia ID/for/name do textarea para evitar conflito com o original
                  try {
                    const ta = situClone.querySelector('textarea');
                    const lab = situClone.querySelector('label[for]');
                    if (ta) { ta.id = 'qs_enc_situacao'; if (ta.name) ta.name = 'qs_enc_situacao'; }
                    if (lab) lab.setAttribute('for', 'qs_enc_situacao');
                  } catch {}
                  qsWrap.insertBefore(situClone, encClone.nextSibling);
                }
              } catch {}
              // mover identificação da caixa logo abaixo (depois de situação, quando existir)
              const qsIdentInput = qsWrap.querySelector('#qs_cx_ident');
              const qsIdentBlock = qsIdentInput ? qsIdentInput.closest('.form-block') : null;
              if (qsIdentBlock) {
                const afterNode = situClone || encClone;
                qsWrap.insertBefore(qsIdentBlock, afterNode.nextSibling);
              }
              try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('suporte-tecnico-carro', root); } catch {}
              qsWrap.__encCloned = true;
            }
          }
        } catch {}
        try {
          const baseWrap = root.querySelector('.form-cond[data-when-field="stc_tipo_serv"][data-when-in="los,mudanca,outros"]');
          if (baseWrap && !baseWrap.__identMoved) {
            const encSeg = baseWrap.querySelector('.segmented[aria-label="Encaminhar equipe da caixa/estrutura?"]');
            const encBlock = encSeg ? encSeg.closest('.form-block') : null;
            const situBlock = baseWrap.querySelector('.form-block[data-when-field="stc_enc"][data-when-equals="sim"]');
            const identInput = baseWrap.querySelector('#stc_cx_ident');
            const identBlock = identInput ? identInput.closest('.form-block') : null;
            if (encBlock && identBlock) {
              baseWrap.insertBefore(identBlock, (situBlock || encBlock).nextSibling);
            }
            try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('suporte-tecnico-carro', root); } catch {}
            baseWrap.__identMoved = true;
          }
        } catch {}

        // Ajustar rótulo para "Mudança de cômodo" (pós-render para evitar problemas de encoding)
        try { const l = root.querySelector('label[for="stc_tipo_mud"]'); if (l) l.textContent = 'Mudan\u00E7a de c\u00F4modo/remanejar fibra'; } catch {}

        // Resetar campos ao alternar o tipo de serviço (inclui trocas LOS <-> Mudança de cômodo)
        try {
          const servRadios = Array.from(root.querySelectorAll('input[name="stc_tipo_serv"]'));
          if (servRadios.length && !root.__wireStcReset){
            root.__wireStcReset = true;
            const clearForServiceChange = () => {
              try {
                const sel = root.querySelector('input[name="stc_tipo_serv"]:checked');
                const newVal = sel ? String(sel.value||'') : '';
                if (root.__stcPrevVal === undefined) root.__stcPrevVal = newVal;
                const prevVal = root.__stcPrevVal;
                if (newVal && prevVal !== newVal){
                  const wraps = [];
                  const baseWrap2 = root.querySelector('.form-cond[data-when-field="stc_tipo_serv"][data-when-in="los,mudanca,outros"]');
                  const qsWrap2 = root.querySelector('.form-cond[data-when-field="stc_tipo_serv"][data-when-equals="quebra_slot"]');
                  if (baseWrap2) wraps.push(baseWrap2);
                  if (qsWrap2) wraps.push(qsWrap2);
                  wraps.forEach(w => {
                    w.querySelectorAll('input, select, textarea').forEach(el => {
                      const key = el.name || el.id; if (!key) return;
                      if (el.type === 'radio' || el.type === 'checkbox') el.checked = false; else el.value = '';
                      try { const st = (typeof getFormState==='function') ? getFormState('suporte-tecnico-carro') : null; if (st) delete st[key]; } catch {}
                    });
                    try {
                      w.querySelectorAll('.mac-list .mac-rows').forEach(rw => { const rows = Array.from(rw.querySelectorAll('.mac-row')); rows.slice(1).forEach(r => r.remove()); });
                      w.querySelectorAll('.outro-list .outro-rows').forEach(rw => { const rows = Array.from(rw.querySelectorAll('.outro-row')); rows.slice(1).forEach(r => r.remove()); });
                    } catch {}
                  });
                }
                root.__stcPrevVal = newVal;
                try { if (typeof setFormState==='function') setFormState('suporte-tecnico-carro', { stc_tipo_serv: newVal }); } catch {}
                try { if (typeof updateConditionalVisibility==='function') updateConditionalVisibility('suporte-tecnico-carro', root); } catch {}
              } catch {}
            };
            servRadios.forEach(r => r.addEventListener('change', clearForServiceChange, true));
            clearForServiceChange();
          }
        } catch {}
      }
    }
    ,
    'inviabilidade-tecnica': {
      equipe: 'carro',
      titulo: 'Inviabilidade Técnica',
      descricao: 'Registro de inviabilidade técnica em atendimento',
      icon: 'fa-triangle-exclamation',
      badge: 'pink',
      atualizadoEm: '11/09/2025 00:00',
      render: (root) => {
        root.innerHTML = ''+
        // Seção 1: Informações do Cliente (padrão)
        '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-id-card"></i> Informações do Cliente</div>\n'
        + '    <div class="form-subtitle">Preencha quem acompanhou</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="clienteNome">Quem acompanhou</label>\n'
        + '    <input id="clienteNome" name="clienteNome" type="text" class="form-input" placeholder="Ex.: Maria Souza" autocomplete="name" />\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 2: Endereço e informações
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-location-dot"></i> ENDEREÇO E INFORMAÇÕES DA O.S</div>\n'
        + '    <div class="form-subtitle">Captura automática da localização</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">A foto da frente da casa foi anexada no MK?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto frente anexada?">\n'
        + '      <input type="radio" id="mkfoto_sim" name="mkfoto" value="sim">\n'
        + '      <label for="mkfoto_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="mkfoto_nao" name="mkfoto" value="nao">\n'
        + '      <label for="mkfoto_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">As fotos do motivo da inviabilidade foram anexadas o MK?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Fotos do motivo anexadas?">\n'
        + '      <input type="radio" id="inv_fotos_motivo_sim" name="inv_fotos_motivo" value="sim">\n'
        + '      <label for="inv_fotos_motivo_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="inv_fotos_motivo_nao" name="inv_fotos_motivo" value="nao">\n'
        + '      <label for="inv_fotos_motivo_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="inv_fotos_motivo" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="inv_fotos_motivo_just">Justifique o motivo de não ter anexado:</label>\n'
        + '    <input id="inv_fotos_motivo_just" name="inv_fotos_motivo_just" type="text" class="form-input--underline" placeholder="Digite..." />\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 3: Informações do atendimento
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-square-check"></i> INFORMAÇÕES DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Selecione o tipo de serviço que seria executado:</label>\n'
        + '    <div class="segmented segmented--stack" role="radiogroup" aria-label="Tipo de serviço">\n'
        + '      <input type="radio" id="inv_tipo_inst" name="inv_tipo" value="instalacao">\n'
        + '      <label for="inv_tipo_inst">Instalação</label>\n'
        + '      <input type="radio" id="inv_tipo_mud" name="inv_tipo" value="mudanca">\n'
        + '      <label for="inv_tipo_mud">Mudança de endereço</label>\n'
        + '      <input type="radio" id="inv_tipo_sup" name="inv_tipo" value="suporte">\n'
        + '      <label for="inv_tipo_sup">Suporte técnico</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">O responsável no local está ciente da inviabilidade:</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Responsável ciente?">\n'
        + '      <input type="radio" id="inv_resp_sim" name="inv_resp" value="sim">\n'
        + '      <label for="inv_resp_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="inv_resp_nao" name="inv_resp" value="nao">\n'
        + '      <label for="inv_resp_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="inv_resp" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="inv_resp_motivo">Informe o motivo pelo qual o responsável não foi informado:</label>\n'
        + '    <textarea id="inv_resp_motivo" name="inv_resp_motivo" class="form-input--underline auto-expand" placeholder="Digite..." rows="2" data-min-height="80"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n' 
        + '    <label class="form-label">Repassou sobre essa inviabilidade para torre:</label>\n' 
        + '    <div class="segmented" role="radiogroup" aria-label="Repassou para a torre?">\n' 
        + '      <input type="radio" id="inv_rep_torre_sim" name="inv_rep_torre" value="sim">\n' 
        + '      <label for="inv_rep_torre_sim"><i class="fa-solid fa-check"></i> Sim</label>\n' 
        + '      <input type="radio" id="inv_rep_torre_nao" name="inv_rep_torre" value="nao">\n' 
        + '      <label for="inv_rep_torre_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n' 
        + '    </div>\n' 
        + '    <div id="inv_torre_hint" class="form-hint" style="color:#dc2626;font-weight:700;margin-top:6px; display:none;">Informe para a torre de serviços sobre a inviabilidade 🚨</div>\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 4: Equipamentos do atendimento (apenas RETIRADO)
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-screwdriver-wrench"></i> EQUIPAMENTOS DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foi RETIRADO algum equipamento durante este atendimento?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Retirado algum equipamento?">\n'
        + '      <input type="radio" id="ret_equip_sim" name="ret_equip" value="sim">\n'
        + '      <label for="ret_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_equip_nao" name="ret_equip" value="nao">\n'
        + '      <label for="ret_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Selecione o equipamento retirado e insira seu MAC: <span class="form-hint">(múltipla escolha)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_ont" name="eq_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_onu" name="eq_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_rot" name="eq_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_outro" name="eq_sel_outro"><span>Outros</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_nenhum_ret" name="eq_sel_nenhum_ret"><span>Nenhum equipamento retirado</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ont_mac_">\n'
        + '      <input type="text" id="inv_ont_mac_1" name="ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="onu_mac_">\n'
        + '      <input type="text" id="inv_onu_mac_1" name="onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="rot_mac_">\n'
        + '      <input type="text" id="inv_rot_mac_1" name="rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos retirados:</label>\n'
        + '    <div class="outro-list" data-outro-list="1">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        // Seção 5: DESCRIÇÃO DA O.S (customizada)
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-file-lines"></i> FINALIZAÇÃO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="descricao_os">Descreva qual foi o motivo da inviabilidade:</label>\n'
        + '    <textarea id="descricao_os" name="descricao_os" class="form-input--underline auto-expand" placeholder="Descreva em detalhes o motivo pelo qual este serviço foi dado como inviabilidade." rows="4" data-min-height="120"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<div class="form-actions">\n'
        + '  <button id="btnLimparForm" type="button" class="btn-action btn-action--gray"><i class="fa-solid fa-eraser"></i> Limpar respostas</button>\n'
        + '  <button id="btnCopiarForm" type="button" class="btn-action btn-action--red"><i class="fa-solid fa-copy"></i> Copiar</button>\n'
        + '</div>';

        // Exclusividade do grupo "equipamento retirado" com "Nenhum" + confirmação e limpeza
        try {
          const get = (id) => root.querySelector('#' + id);
          const noneEl = get('eq_sel_nenhum_ret');
          const normals = ['eq_sel_ont','eq_sel_onu','eq_sel_rot','eq_sel_outro'].map(get).filter(Boolean);
          const groupBox = (noneEl && (noneEl.closest('.choices') || noneEl.closest('.form-block'))) || null;
          const showInlineAlert = (message) => {
            try {
              if (!groupBox) return;
              const next = groupBox.nextElementSibling;
              if (next && next.classList && (next.classList.contains('sinal-los-hint') || next.classList.contains('inline-alert'))) next.remove();
              const el = document.createElement('div');
              el.className = 'form-hint sinal-los-hint is-highlight';
              if (!el.id) el.id = 'los_hint_' + Math.random().toString(36).slice(2);
              el.textContent = message;
              groupBox.insertAdjacentElement('afterend', el);
              const close = () => { try { el.remove(); } catch {} };
              el.addEventListener('click', close, { once: true });
              setTimeout(close, 5000);
            } catch {}
          };
          const clearMacListsByPrefixes = (prefixes) => {
            try {
              prefixes.forEach(pref => {
                root.querySelectorAll('input[name^="' + pref + '"]').forEach(inp => { inp.value = ''; });
                const list = root.querySelector('.mac-list[data-mac-prefix="' + pref + '"]');
                if (list) {
                  const rows = list.querySelectorAll('.mac-row');
                  if (rows && rows.length) { Array.from(rows).slice(1).forEach(r => r.remove()); }
                  const first = list.querySelector('.mac-row input') || list.querySelector('input');
                  if (first) first.value = '';
                }
              });
              // Limpa também entradas de "outros" se existirem
              root.querySelectorAll('.outro-list[data-outro-list]').forEach(list => {
                list.querySelectorAll('input').forEach(inp => { inp.value = ''; });
                const rowsWrap = list.querySelector('.outro-rows');
                if (rowsWrap) {
                  const rows = Array.from(rowsWrap.querySelectorAll('.outro-row'));
                  rows.slice(1).forEach(r => r.remove());
                }
              });
            } catch {}
          };
          if (noneEl) {
            // Atualiza condicionais ao marcar/desmarcar as opções do grupo
            try {
              ['#eq_sel_ont','#eq_sel_onu','#eq_sel_rot','#eq_sel_outro','#eq_sel_nenhum_ret'].forEach(sel => {
                const el = root.querySelector(sel);
                if (el) el.addEventListener('change', () => { try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('inviabilidade-tecnica', root); } catch {} });
              });
            } catch {}
            // Bloqueia clique em outros quando "Nenhum" estiver marcado (mensagem)
            root.addEventListener('click', (e) => {
              try {
                const t = e.target;
                if (!t || t.tagName !== 'INPUT' || t.type !== 'checkbox') return;
                if (!normals.some(n => n === t) && t !== noneEl) return;
                if (t !== noneEl && noneEl.checked) {
                  showInlineAlert('Desmarque a opção "Nenhum" para selecionar algum equipamento.');
                }
              } catch {}
            }, true);
            // Enforce exclusividade + confirmação
            root.addEventListener('change', async (e) => {
              try {
                const t = e.target; if (!t || t.type !== 'checkbox') return;
                if (t === noneEl) {
                  // Ao DESMARCAR 'Nenhum', remover aviso inline imediatamente
                  try {
                    if (!noneEl.checked && groupBox) {
                      const next = groupBox.nextElementSibling;
                      if (next && next.classList && (next.classList.contains('sinal-los-hint') || next.classList.contains('inline-alert'))) next.remove();
                    }
                  } catch {}
                  if (noneEl.checked && normals.some(n => n && n.checked)) {
                    const msgNenhum = 'Ao selecionar "Nenhum", as opções marcadas serão desmarcadas e os campos de MAC serão limpos. Confirmar?';
                    const ok = (await (window.__appModal?.showConfirm(msgNenhum, { okText: 'Confirmar', cancelText: 'Cancelar', danger: true }) || Promise.resolve(null))) ?? window.confirm(msgNenhum);
                    if (!ok) { noneEl.checked = false; try { const key = noneEl.name || noneEl.id; if (key && typeof setFormState === 'function') setFormState('inviabilidade-tecnica', { [key]: false }); } catch {}; return; }
                    // Desmarca outros e limpa
                    normals.forEach(n => { if (n && n.checked) { n.checked = false; try { const key = n.name || n.id; if (key && typeof setFormState === 'function') setFormState('inviabilidade-tecnica', { [key]: false }); } catch {} } });
                    clearMacListsByPrefixes(['ont_mac_','onu_mac_','rot_mac_']);
                    try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('inviabilidade-tecnica', root); } catch {}
                  }
                } else if (normals.includes(t)) {
                  if (noneEl.checked) {
                    // mantém Nenhum exclusivo
                    t.checked = false;
                    try { const key = t.name || t.id; if (key && typeof setFormState === 'function') setFormState('inviabilidade-tecnica', { [key]: false }); } catch {}
                    showInlineAlert('Desmarque a opção "Nenhum" para selecionar algum equipamento.');
                  } else {
                    // algum normal foi marcado: garante Nenhum desmarcado
                    if (noneEl.checked) { noneEl.checked = false; try { const key = noneEl.name || noneEl.id; if (key && typeof setFormState === 'function') setFormState('inviabilidade-tecnica', { [key]: false }); } catch {} }
                  }
                  try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility('inviabilidade-tecnica', root); } catch {}
                }
              } catch {}
            });
          }
        } catch {}

        // Máscara e cálculo de metragem (apenas para cabeamento de rede; fibra não tem custo)
        try {
          const inp = root.querySelector('#cabometros');
          const hint = root.querySelector('#cabocusto');
          // Padroniza o texto do label para incluir "total"
          try { const lab = root.querySelector('label[for="cabometros"]'); if (lab) lab.textContent = 'Metragem de cabo de rede total para este serviço:'; } catch {}
          const fmtBRL = (n) => { try { return 'R$' + (Number(n||0).toFixed(2)).replace('.', ','); } catch { return 'R$0,00'; } };
          const recalc = () => { try { const base=(inp?.value||'').toLowerCase().replace(/m/g,'').replace(/\./g,',').replace(/[^0-9,]/g,''); const v = parseFloat(base.replace(',','.'))||0; const total=v*3; if (hint) hint.textContent = 'Previsão de custos sobre este cabeamento: ' + fmtBRL(total); } catch {} };
          if (inp){
            const onInput = (e) => { try { let s=(inp.value||'').toLowerCase().replace(/m/g,''); s=s.replace(/\./g,',').replace(/[^0-9,]/g,''); const parts=s.split(','); if (parts.length>1) s=parts.shift()+','+parts.join('').replace(/,/g,''); if (e && e.inputType==='deleteContentBackward'){ const pos=inp.selectionStart||0; const atEnd=pos===(inp.value||'').length; if (atEnd) s=s.slice(0,-1); } inp.value = s ? (s+'m') : ''; recalc(); } catch {} };
            const onKeyDown = (e) => { if (e.key==='Backspace'){ const digits=(inp.value||'').replace(/\D/g,''); if (digits.length<=1){ e.preventDefault(); inp.value=''; recalc(); } } };
            inp.addEventListener('keydown', onKeyDown);
            inp.addEventListener('input', onInput);
            inp.addEventListener('change', onInput);
            onInput();
          }
        } catch {}
      }
    }
    ,
    'retirada-equipamentos-carro': {
      equipe: 'carro',
      titulo: 'Retirada de Equipamentos',
      descricao: 'Registro de cancelamento e retirada em campo',
      icon: 'fa-box-archive',
      badge: 'orange',
      render: (root) => {
        try {
          const base = (typeof FORMS_CATALOG !== 'undefined' && FORMS_CATALOG) ? FORMS_CATALOG['retirada-equipamentos'] : null;
          if (base && typeof base.render === 'function') {
            const tmp = document.createElement('div');
            base.render(tmp);
            const markup = tmp.innerHTML;
            root.innerHTML = markup;
            // Ajustes específicos da Equipe Carro (desacoplado do Moto)
            try {
              // MOTIVO DO CANCELAMENTO: atualizar texto da instrução e incluir "Inviabilidade técnica" como primeira opção
              try {
                const motivoSeg = root.querySelector('.segmented[aria-label="Motivo do cancelamento"]');
                const motivoBlock = motivoSeg ? motivoSeg.closest('.form-block') : null;
                const motivoLabel = motivoBlock ? motivoBlock.querySelector('.form-label') : null;
                if (motivoLabel) {
                  // Texto de instrução do campo
                  motivoLabel.textContent = 'Selecione o motivo que ocasionou esta retirada/cancelamento do cliente';
                }
                if (motivoSeg && !root.querySelector('#mot_inv')) {
                  // Nova opção no topo: Inviabilidade técnica
                  const invInput = document.createElement('input');
                  invInput.type = 'radio';
                  invInput.id = 'mot_inv';
                  invInput.name = 'motivo';
                  invInput.value = 'inviabilidade';
                  const invLabel = document.createElement('label');
                  invLabel.setAttribute('for', 'mot_inv');
                  invLabel.textContent = 'Inviabilidade técnica';
                  // Inserir como primeira opção do grupo
                  motivoSeg.insertBefore(invInput, motivoSeg.firstChild);
                  motivoSeg.insertBefore(invLabel, invInput.nextSibling);
                  // Bloco condicional: descrição da inviabilidade técnica
                  if (motivoBlock) {
                    const invBlk = document.createElement('div');
                    invBlk.className = 'form-block';
                    invBlk.setAttribute('data-when-field', 'motivo');
                    invBlk.setAttribute('data-when-equals', 'inviabilidade');
                    invBlk.setAttribute('data-clear-on-hide', '1');
                    invBlk.innerHTML = ''
                      + '    <label class="form-label" for="mot_inv_desc">Descreva qual foi a inviabilidade técnica</label>\n'
                      + '    <textarea id="mot_inv_desc" name="mot_inv_desc" class="form-input--underline auto-expand" placeholder="Digite..." rows="2" data-min-height="80"></textarea>\n'
                      + '    <div class="textarea-counter">0 caracteres</div>';
                    motivoBlock.insertAdjacentElement('afterend', invBlk);
                  }
                }
              } catch {}
              const insat = root.querySelector('.form-block[data-when-field="motivo"][data-when-equals="insatisfacao"]');
              if (insat){
                // Remover "O cliente recebeu visita técnica?"
                const visita = insat.querySelector('input[name="insat_visita"]');
                if (visita){ const seg = visita.closest('.segmented'); if (seg){ const prev = seg.previousElementSibling; if (prev && prev.classList && prev.classList.contains('form-label')) prev.remove(); seg.remove(); } }
                // Remover "As expectativas foram atendidas?"
                const exp = insat.querySelector('input[name="insat_expect"]');
                if (exp){ const seg2 = exp.closest('.segmented'); if (seg2){ const prev2 = seg2.previousElementSibling; if (prev2 && prev2.classList && prev2.classList.contains('form-label')) prev2.remove(); seg2.remove(); } }
                // Ajustar label e tamanho do textarea do relato
                const lab = insat.querySelector('label[for="insat_relato"]');
                if (lab) lab.textContent = 'Com o que exatamente o cliente encontra-se insatisfeito?';
                const ta = insat.querySelector('#insat_relato');
                if (ta) { ta.setAttribute('rows','2'); ta.setAttribute('data-min-height','80'); }
              }
              // Diminuir textarea de "Descreva o motivo de não ter retirado:"
              const taMot = root.querySelector('#ret_equip_motivo');
              if (taMot) { taMot.setAttribute('rows','2'); taMot.setAttribute('data-min-height','80'); }
            } catch {}
            return;
          }
        } catch {}
        // Fallback: mensagem simples se não encontrar o formulário base
        root.innerHTML = '<section class="form-section"><div class="form-header"><div class="form-title"><i class="fa-regular fa-file-lines"></i> RETIRADA DE EQUIPAMENTOS</div></div><div class="form-block">Não foi possível carregar o formulário base.</div></section>';
      }
    }
/*    'quebra-de-slot': {
      equipe: 'carro',
      titulo: 'Quebra de Slot',
      descricao: 'Registros de quebra de slot',
      icon: 'fa-layer-group',
      badge: 'violet',
      atualizadoEm: '11/09/2025 00:00',
      render: (root) => {
        root.innerHTML = ''+
        '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-id-card"></i> Informações do Cliente</div>\n'
        + '    <div class="form-subtitle">Preencha quem acompanhou</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="clienteNome">Quem acompanhou</label>\n'
        + '    <input id="clienteNome" name="clienteNome" type="text" class="form-input" placeholder="Ex.: Maria Souza" autocomplete="name" />\n'
        + '  </div>\n'
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-location-dot"></i> ENDEREÇO E INFORMAÇÕES DA O.S</div>\n'
        + '    <div class="form-subtitle">Captura automática da localização</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foto da frente da casa anexada no MK?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Foto frente anexada?">\n'
        + '      <input type="radio" id="qs_mkfoto_sim" name="qs_mkfoto" value="sim">\n'
        + '      <label for="qs_mkfoto_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="qs_mkfoto_nao" name="qs_mkfoto" value="nao">\n'
        + '      <label for="qs_mkfoto_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">As fotos dos equipamentos no local e do serviço realizado foram anexadas?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Fotos do serviço anexadas?">\n'
        + '      <input type="radio" id="qs_fotos_equip_sim" name="qs_fotos_equip" value="sim">\n'
        + '      <label for="qs_fotos_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="qs_fotos_equip_nao" name="qs_fotos_equip" value="nao">\n'
        + '      <label for="qs_fotos_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="qs_fotos_equip" data-when-equals="nao" data-clear-on-hide="1">\n'
        + '    <label class="form-label" for="qs_fotos_equip_just">Justifique o motivo de não ter anexado:</label>\n'
        + '    <input id="qs_fotos_equip_just" name="qs_fotos_equip_just" type="text" class="form-input--underline" placeholder="Digite..." />\n'
        + '  </div>\n'
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-square-check"></i> INFORMAÇÕES TÉCNICAS DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Necessário passar uma nova fibra:</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Passar nova fibra?">\n'
        + '      <input type="radio" id="qs_novafibra_sim" name="qs_novafibra" value="sim">\n'
        + '      <label for="qs_novafibra_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="qs_novafibra_nao" name="qs_novafibra" value="nao">\n'
        + '      <label for="qs_novafibra_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="sinal_fibra">Sinal da fibra na PTO:</label>\n'
        + '    <input id="sinal_fibra" name="sinal_fibra" data-sinal-fibra="1" type="text" class="form-input--underline" inputmode="decimal" placeholder="-00.00" />\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="qs_cx_ident">Identificação da CTO que atende ao cliente:</label>\n'
        + '    <input id="qs_cx_ident" name="qs_cx_ident" type="text" class="form-input--underline" placeholder="Informe a caixa aqui..." />\n'
        + '  </div>\n'
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-solid fa-screwdriver-wrench"></i> EQUIPAMENTOS DO ATENDIMENTO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foi RETIRADO algum equipamento durante este atendimento?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Retirado algum equipamento?">\n'
        + '      <input type="radio" id="ret_equip_sim" name="ret_equip" value="sim">\n'
        + '      <label for="ret_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ret_equip_nao" name="ret_equip" value="nao">\n'
        + '      <label for="ret_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ret_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Selecione o equipamento retirado e insira seu MAC: <span class="form-hint">(múltipla escolha)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_ont" name="eq_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_onu" name="eq_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_rot" name="eq_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="eq_sel_outro" name="eq_sel_outro"><span>Outros</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ont_mac_">\n'
        + '      <input type="text" id="ont_mac_1" name="ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="onu_mac_">\n'
        + '      <input type="text" id="onu_mac_1" name="onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (retirado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="rot_mac_">\n'
        + '      <input type="text" id="rot_mac_1" name="rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="eq_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos retirados:</label>\n'
        + '    <div class="outro-list" data-outro-list="1">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label">Foi INSERIDO algum equipamento?</label>\n'
        + '    <div class="segmented" role="radiogroup" aria-label="Inserido algum equipamento?">\n'
        + '      <input type="radio" id="ficou_equip_sim" name="ficou_equip" value="sim">\n'
        + '      <label for="ficou_equip_sim"><i class="fa-solid fa-check"></i> Sim</label>\n'
        + '      <input type="radio" id="ficou_equip_nao" name="ficou_equip" value="nao">\n'
        + '      <label for="ficou_equip_nao"><i class="fa-solid fa-xmark"></i> Não</label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ficou_equip" data-when-equals="sim" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Selecione os equipamentos inseridos e insira seus MACs: <span class="form-hint">(múltipla escolha)</span></label>\n'
        + '    <div class="choices">\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_ont" name="ins_sel_ont"><span>ONT</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_onu" name="ins_sel_onu"><span>ONU</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_rot" name="ins_sel_rot"><span>Roteador</span></label>\n'
        + '      <label class="choice"><input type="checkbox" id="ins_sel_outro" name="ins_sel_outro"><span>Outros</span></label>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_ont" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONT (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_ont_mac_">\n'
        + '      <input type="text" id="ins_ont_mac_1" name="ins_ont_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_ont_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_onu" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC ONU (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_onu_mac_">\n'
        + '      <input type="text" id="ins_onu_mac_1" name="ins_onu_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_onu_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_rot" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">MAC Roteador (instalado):</label>\n'
        + '    <div class="mac-list" data-mac-list="1" data-mac-prefix="ins_rot_mac_">\n'
        + '      <input type="text" id="ins_rot_mac_1" name="ins_rot_mac_1" class="form-input--underline" placeholder="Digite..." />\n'
        + '      <button type="button" class="btn-ghost mac-add" data-mac-prefix="ins_rot_mac_"><i class="fa-solid fa-plus"></i> Adicionar outro MAC</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="form-block" data-when-field="ins_sel_outro" data-when-equals="true" data-clear-on-hide="1">\n'
        + '    <label class="form-label">Descreva os outros equipamentos inseridos:</label>\n'
        + '    <div class="outro-list" data-outro-list="1">\n'
        + '      <div class="outro-rows"></div>\n'
        + '      <button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<section class="form-section">\n'
        + '  <div class="form-header">\n'
        + '    <div class="form-title"><i class="fa-regular fa-file-lines"></i> FINALIZAÇÃO</div>\n'
        + '  </div>\n'
        + '  <div class="form-block">\n'
        + '    <label class="form-label" for="descricao_os">Descreva detalhes adicionais sobre o atendimento:</label>\n'
        + '    <textarea id="descricao_os" name="descricao_os" class="form-input--underline auto-expand" placeholder="Descreva o relatório final sobre o serviço realizado, imprevistos que podem ter ocorrido ou observações importantes que precisam ficar registradas..." rows="4" data-min-height="120"></textarea>\n'
        + '    <div class="textarea-counter">0 caracteres</div>\n'
        + '  </div>\n'
        + '</section>\n'
        + '<div class="form-actions">\n'
        + '  <button id="btnLimparForm" type="button" class="btn-action btn-action--gray"><i class="fa-solid fa-eraser"></i> Limpar respostas</button>\n'
        + '  <button id="btnCopiarForm" type="button" class="btn-action btn-action--red"><i class="fa-solid fa-copy"></i> Copiar</button>\n'
        + '</div>';
        try { setupMacLists(root); } catch {}
        try { setupOutroList(root); } catch {}
        try { ensureFotosJustificativa(root); } catch {}
      }
    } */
  };
  // Estado temporário do formulário (não persiste até clicar em Copiar)
  const FORM_TMP_STATE = {};
  const formStateKey = (id) => `unificado.formstate.${id}`; // usado apenas quando clicar em Copiar

  const mapWanFieldName = (field) => {
    switch (String(field || '').toLowerCase()) {
      case 'ativo': return 'device';
      case 'gigabit': return 'gigabit';
      case 'powermitter': return 'powermitter';
      case 'ping': return 'ping';
      case 'obs': return 'obs';
      case 'device':
      case 'gigabit':
      case 'powermitter':
      case 'ping':
      case 'obs':
        return String(field).toLowerCase();
      default:
        return null;
    }
  };

  function normalizeWanState(source){
    const out = {};
    try {
      Object.keys(source || {}).forEach((key) => {
        const value = source[key];
        const oldMatch = key && key.match(/^wan(?:2)?_(ativo|gigabit|powermitter|ping|obs)_(\d+)/i);
        if (oldMatch){
          const field = mapWanFieldName(oldMatch[1]);
          const idx = oldMatch[2];
          if (field){
            const nk = `wan_item_${idx}_${field}`;
            if (!(nk in out)) out[nk] = value;
          }
          return;
        }
        const newMatch = key && key.match(/^wan_item_(\d+)_(device|gigabit|powermitter|ping|obs)$/i);
        if (newMatch){
          const idx = newMatch[1];
          const field = mapWanFieldName(newMatch[2]);
          if (field){
            const nk = `wan_item_${idx}_${field}`;
            if (!(nk in out)) out[nk] = value;
          }
          return;
        }
        out[key] = value;
      });
    } catch {
      return { ...(source || {}) };
    }
    return out;
  }

  function getFormState(id){ return FORM_TMP_STATE[id] || {}; }
  function setFormState(id, patch){
    const cur = FORM_TMP_STATE[id] || {};
    const merged = { ...cur, ...(patch || {}) };
    FORM_TMP_STATE[id] = normalizeWanState(merged);
  }
  // Captura um snapshot completo do formulário a partir do DOM (não depende de eventos anteriores)
  function collectCurrentFormState(container){
    const snap = {};
    try {
      const all = container.querySelectorAll("input, select, textarea");
      all.forEach(el => {
        const key = el.name || el.id;
        if (!key) return;
        if (el.tagName === "SELECT") {
          snap[key] = el.value;
        } else if (el.type === "radio") {
          if (el.checked) snap[key] = el.value; else if (!(key in snap)) snap[key] = snap[key] || "";
        } else if (el.type === "checkbox") {
          snap[key] = !!el.checked;
        } else {
          snap[key] = el.value;
        }
      });
    } catch {}
    return normalizeWanState(snap);
  }
  // Retorna true se houver dados preenchidos (exceto localizacao automatica)
  function hasDirtyFormState(formId){
    try {
      const st = getFormState(formId) || {};
      const keys = Object.keys(st);
      for (const k of keys){
        if (k === 'geo_coords') continue; // ignorar localizacao automatica
        const v = st[k];
        if (typeof v === 'boolean') { if (v) return true; }
        else if (v != null && String(v).trim() !== '') { return true; }
      }
      return false;
    } catch { return false; }
  }
  function restoreFormState(formId, container){
    const rawState = getFormState(formId) || {};
    const state = normalizeWanState(rawState);
    try { FORM_TMP_STATE[formId] = { ...(state||{}) }; } catch {}
    const ensureLentidaoEntriesForState = () => {
      try {
        const block = container.querySelector('.form-block[data-lentidao="1"]');
        if (!block) return;
        const ensurePing = block.__ensurePingCount;
        const ensureTracert = block.__ensureTracertCount;
        let maxPing = 0;
        let maxTracert = 0;
        Object.keys(state || {}).forEach((key) => {
          const mp = key.match(/^ping_(?:titulo|minima|media|maxima|enviados|recebidos|perdidos)_(\d+)/i);
          if (mp) {
            const idx = parseInt(mp[1], 10) || 0;
            if (idx > maxPing) maxPing = idx;
          }
          const mt = key.match(/^tracert_(?:local|url)_(\d+)/i);
          if (mt) {
            const idx = parseInt(mt[1], 10) || 0;
            if (idx > maxTracert) maxTracert = idx;
          }
        });
        if (maxPing > 0 && typeof ensurePing === 'function') ensurePing(maxPing);
        if (maxTracert > 0 && typeof ensureTracert === 'function') ensureTracert(maxTracert);
      } catch {}
    };
    ensureLentidaoEntriesForState();

    // Garante quantidade de verificações WAN (CABO 2, 3, ...) conforme estado salvo
    const ensureWanEntriesForState = () => {
      try {
        // localizar bloco principal de WAN a partir de #wan_gigabit
        const mainBlk = (() => { try { const el = container.querySelector('#wan_gigabit'); return el ? el.closest('.form-block') : null; } catch { return null; } })();
        if (!mainBlk) return;
        const list = mainBlk.querySelector('[data-wan-list="1"]');
        if (!list) return;
        const addBtn = mainBlk.querySelector('[data-wan-add="1"]');
        if (!addBtn) return;
        // identificar maior índice wan_*_N no estado
        let maxWan = 0;
        Object.keys(state || {}).forEach((key) => {
          const mw = key.match(/^wan_item_(\d+)_(?:device|gigabit|powermitter|ping|obs)$/i);
          if (mw) {
            const idx = parseInt(mw[1], 10) || 0;
            if (idx > maxWan) maxWan = idx;
          }
        });
        // já existe Verificação 1 por padrão; criar adicionais até maxWan
        const current = Array.from(list.querySelectorAll('[data-wan-item="1"]')).length;
        for (let i = current + 1; i <= maxWan; i++) { try { addBtn.click(); } catch {} }
      } catch {}
    };
    ensureWanEntriesForState();
    // 0) Aplicar primeiro apenas campos de controle que afetam visibilidade
    try {
      const __prevPrefill = !!container.__inPrefill;
      container.__inPrefill = true; // evita limpezas enquanto reorganizamos
      const applyControlValuesFirst = () => {
        try {
          // tq_troca (sim/nao)
          const vTroca = state['tq_troca'];
          if (vTroca !== undefined) {
            const radios = container.querySelectorAll('input[name="tq_troca"][type="radio"]');
            radios.forEach(r => { r.checked = (String(r.value) === String(vTroca)); });
          }
          // Versão segmentada: tq_local (onu, roteador, ambos)
          const vLocal = state['tq_local'];
          if (vLocal !== undefined) {
            const radios = container.querySelectorAll('input[name="tq_local"][type="radio"]');
            radios.forEach(r => { r.checked = (String(r.value) === String(vLocal)); });
          }
          // Checkboxes do modo Moto (tq_local_*)
          ['tq_local_ont','tq_local_onu','tq_local_rot','tq_local_outro'].forEach(k => {
            if (state[k] !== undefined) {
              const el = container.querySelector('#'+k);
              if (el && el.type === 'checkbox') el.checked = !!state[k];
            }
          });
        } catch {}
      };
      applyControlValuesFirst();
      try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
      try { container.__inPrefill = __prevPrefill; } catch {}
    } catch {}
    try {
      // Garante quantidade de linhas nas listas de MAC de acordo com o estado salvo
      const macLists = Array.from(container.querySelectorAll('.mac-list'));
      macLists.forEach(list => {
        const prefix = list.getAttribute('data-mac-prefix') || '';
        if (!prefix) return;
        try { /* debug removed */ } catch {}
        // Descobre quantos índices existem no estado para este prefixo
        let maxIdx = 0;
        try {
          Object.keys(state || {}).forEach(k => {
            if (k && k.startsWith(prefix)) {
              const tail = String(k).slice(prefix.length);
              const m = tail.match(/(\d+)$/);
              const n = m ? parseInt(m[1], 10) : NaN;
              if (!isNaN(n) && n > maxIdx) maxIdx = n;
            }
          });
        } catch {}
        if (maxIdx <= 1) return; // já existe uma linha inicial
        // Adiciona linhas extras acionando o botão de adicionar
        const addBtn = list.querySelector('.mac-add');
        if (!addBtn) return;
        try {
          const rowsWrap = list.querySelector('.mac-rows');
          const curCount = rowsWrap ? rowsWrap.querySelectorAll('input[name^="'+prefix+'"]').length : 1;
          for (let i = curCount + 1; i <= maxIdx; i++) { addBtn.click(); }
        } catch {}
      });
      // Ajusta quantidade de linhas da lista de OUTRO EQUIPAMENTO (nome + mac)
      try {
        const outroLists = Array.from(container.querySelectorAll('.outro-list'));
        outroLists.forEach(list => {
          const namePref = (list.getAttribute('data-outro-name-prefix') || 'outro_nome_').toLowerCase();
          const macPref = (list.getAttribute('data-outro-mac-prefix') || 'outro_mac_').toLowerCase();
          let maxIdx = 0;
          try {
            Object.keys(state || {}).forEach(k => {
              const kk = String(k||'').toLowerCase();
              if (kk.startsWith(namePref) || kk.startsWith(macPref)){
                const base = kk.startsWith(namePref) ? namePref : macPref;
                const tail = kk.slice(base.length);
                const m = tail.match(/(\d+)$/);
                const n = m ? parseInt(m[1], 10) : NaN;
                if (!isNaN(n) && n > maxIdx) maxIdx = n;
              }
            });
          } catch {}
          if (maxIdx <= 1) return;
          const rowsWrap = list.querySelector('.outro-rows');
          const curCount = rowsWrap ? rowsWrap.querySelectorAll('input[name^="'+namePref+'"]').length : 1;
          const addBtn = list.querySelector('.outro-add');
          for (let i = curCount + 1; i <= maxIdx; i++) { try { addBtn && addBtn.click(); } catch {} }
        });
      } catch {}
    } catch {}
    const applyValues = () => {
      container.querySelectorAll('input, select, textarea').forEach(el => {
        const nameKey = el.name || '';
        const idKey = el.id || '';
        if (!nameKey && !idKey) return;
        let v = (nameKey && state[nameKey] !== undefined) ? state[nameKey] : undefined;
        if (v === undefined && idKey) v = state[idKey];
        if (v === undefined) return;
        if (el.type === 'radio') el.checked = (el.value === v);
        else if (el.type === 'checkbox') el.checked = !!v;
        else el.value = v;
      });
    };
    // 1ª aplicação de valores
    applyValues();
    // Atualiza condicionais com estado já preenchido
    try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
    // 2ª aplicação para preencher campos exibidos após a avaliação condicional
    applyValues();
    // debug removed
    try {
      const macLists2 = Array.from(container.querySelectorAll('.mac-list'));
      macLists2.forEach(list => {
        const prefix = list.getAttribute('data-mac-prefix') || '';
        if (!/^(ficou_|onu_mac_|roteador_mac_)/.test(String(prefix))) return;
        const inputs = Array.from(list.querySelectorAll('input[name^="'+prefix+'"]'));
        const vals = inputs.map(i => (i.value||'').trim()).filter(Boolean);
        /* debug removed */
      });
    } catch {}
  }
  function wireFormPersistence(formId, container){
    // Remove handlers antigos para evitar acúmulo e manter o form atual isolado
    try {
      if (container.__persistHandler) {
        container.removeEventListener('change', container.__persistHandler);
        container.removeEventListener('input', container.__persistHandler);
      }
    } catch {}
    container.__persistWired = formId;
    const handler = (e) => {
      const t = e.target;
      if (!t || !('name' in t)) return;
      const name = t.name || t.id; if (!name) return;
      let val;
      if (t.type === 'radio') { if (!t.checked) return; val = t.value; }
      else if (t.type === 'checkbox') { val = !!t.checked; }
      else { val = t.value; }
      setFormState(formId, { [name]: val });
      // Autosave rascunho no histórico (sempre usando snapshot completo do DOM)
      try {
        const now = Date.now();
        const st = collectCurrentFormState(container);
        if (e && e.type === 'change') {
          if (typeof window.__upsertDraftHistory === 'function') window.__upsertDraftHistory(formId, st);
        } else {
          if (!window.__draftLastSavedAt || (now - window.__draftLastSavedAt) > 1200) {
            window.__draftLastSavedAt = now;
            if (typeof window.__upsertDraftHistory === 'function') window.__upsertDraftHistory(formId, st);
          }
        }
      } catch {}
      if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container);
      // Reavalia visibilidade e posição da seção INDICAÇÕES em mudanças de estado
      try { ensureIndicacaoVisibilityForRetencao(container); } catch {}
      try { ensureIndicacaoBeforeDescricao(container); } catch {}
    };
    container.__persistHandler = handler;
    container.addEventListener('change', handler);
    container.addEventListener('input', handler);
  }

  function startDraftAutosave(formId, container){
    try {
      if (!container) return;
      if (container.__draftObserver) { try { container.__draftObserver.disconnect(); } catch {} }
      let to = null;
      const save = () => { try { const st = (typeof collectCurrentFormState === 'function') ? collectCurrentFormState(container) : {}; if (typeof window.__upsertDraftHistory === 'function') window.__upsertDraftHistory(formId, st); } catch {} };
      const obs = new MutationObserver(() => { clearTimeout(to); to = setTimeout(save, 700); });
      obs.observe(container, { childList: true, subtree: true });
      container.__draftObserver = obs;
      setTimeout(save, 300);
    } catch {}
  }
function updateConditionalVisibility(formId, container){
    const state = getFormState(formId);
  const blocks = Array.from(container.querySelectorAll('.form-block[data-when-field], .form-cond[data-when-field]'));
  blocks.forEach(block => {
    const field = block.getAttribute('data-when-field');
    const equals = block.getAttribute('data-when-equals');
    const inList = block.getAttribute('data-when-in');
    let cur = state[field];
    // Robust fallback: if state is empty/unset, try reading the live DOM value
    if (cur === undefined || cur === null || String(cur) === '') {
      try {
        // radios (checked)
        const r = container.querySelector(`input[name="${field}"][type="radio"]:checked`);
        if (r) {
          cur = r.value;
        } else {
          // any element with matching name or id
          const el = container.querySelector(`[name="${field}"]`) || container.querySelector(`#${field}`);
          if (el) {
            const t = (el.type || '').toLowerCase();
            if (t === 'checkbox') {
              cur = !!el.checked;
            } else if (t === 'radio') {
              // Nenhum radio selecionado: manter cur indefinido para ocultar por padrao
            } else {
              cur = el.value;
            }
          }
        }
      } catch {}
      // Ajuste final quando for "O dia inteiro":
      try {
        const tsel = container.querySelector('input[name="aus_hora_tipo"]:checked');
        const tval = tsel ? String(tsel.value||'') : '';
        if (tval === 'dia_inteiro') {
          try { text = text.replace(/no\s+h.{0,3}rio\s+das\s+[^,]+/i, 'o dia inteiro'); } catch {}
          try { text = text.replace(/^(Iniciarei a rota mais tarde\.|Retornarei para finalizar o expediente\.|N[o�]o retornarei para finalizar o expediente\.)$/m, 'Não estarei na rota neste dia.'); } catch {}
        }
      } catch {}
    }
    let visible = false;
    if (inList) {
      const arr = inList.split(',').map(s => String(s).trim());
      visible = arr.includes(String(cur));
    } else if (equals !== null) {
      visible = String(cur) === String(equals);
    }
    // Condicional extra (pai): quando presente, exige também que seja verdadeiro
    try {
      const pField = block.getAttribute('data-when-parent-field');
      if (pField) {
        const pEquals = block.getAttribute('data-when-parent-equals');
        const pIn = block.getAttribute('data-when-parent-in');
        const pCur = state[pField];
        let pOk = false;
        if (pIn) {
          const arr2 = pIn.split(',').map(s => String(s).trim());
          pOk = arr2.includes(String(pCur));
        } else if (pEquals !== null) {
          pOk = String(pCur) === String(pEquals);
        }
        visible = visible && pOk;
      }
    } catch {}
    if (!visible){
      if (!block.hasAttribute('hidden')){
        const skipClear = !!container.__inPrefill;
        // clear on hide: somente quando não estiver em prefill
        if (!skipClear){
          block.querySelectorAll('input, select, textarea').forEach(el => {
            const key = el.name || el.id;
            if (!key) return;
            if (el.type === 'radio' || el.type === 'checkbox') el.checked = false; else el.value = '';
            const curState = getFormState(formId); try { delete curState[key]; } catch {}
          });
          // Se houver listas de MAC, remover linhas extras e manter apenas a primeira
          try {
            const macLists = block.querySelectorAll('.mac-rows');
            macLists.forEach(rowsEl => {
              const rows = Array.from(rowsEl.querySelectorAll('.mac-row'));
              if (rows.length > 1) {
                // remove inputs from state for rows > 1
                rows.slice(1).forEach(r => {
                  r.querySelectorAll('input').forEach(inp => {
                    const key = inp.name || inp.id;
                    if (!key) return;
                    const curState = getFormState(formId); try { delete curState[key]; } catch {}
                  });
                  r.remove();
                });
              }
              const first = rowsEl.querySelector('.mac-row input');
              if (first) first.value = '';
            });
          } catch {}
        }
        block.setAttribute('hidden','hidden');
      }
    } else {
      block.removeAttribute('hidden');
    }
    });
  }

  // Internal helper (schema-based builder) for faster future additions
  // Not used yet in runtime; kept for our rapid iteration

  // Renderer da view de formulário
  window.renderFormPage = function renderFormPage(formId){
    const def = FORMS_CATALOG[formId];
    const titleEl = document.getElementById('formHeaderTitle');
    const descEl = document.getElementById('formHeaderDesc');
    const container = document.getElementById('formContainer');
    if (!def || !titleEl || !descEl || !container) {
      if (titleEl) titleEl.textContent = 'Formulário não encontrado';
      if (descEl) descEl.textContent = '';
      if (container) container.innerHTML = '';
      return;
    }
    // Sempre iniciar sem resíduos de estado anterior ao abrir o formulário
    try { delete FORM_TMP_STATE[formId]; localStorage.removeItem('unificado.formstate.'+formId); } catch {}
    // Também limpar quaisquer handlers anteriores de persistência vinculados ao container
    try {
      if (container.__persistHandler) {
        container.removeEventListener('change', container.__persistHandler);
        container.removeEventListener('input', container.__persistHandler);
        container.__persistHandler = null;
        container.__persistWired = null;
      }
    } catch {}
    titleEl.textContent = def.titulo;
    descEl.textContent = def.descricao;
    // Renderiza o formulário da definição selecionada
    try { container.__formId = formId; } catch {}
    def.render(container);
    
    // Segurança: garante que seções específicas do Moto não vazem para outros formulários
    try {
      if (formId !== 'suporte-moto') {
        Array.from(container.querySelectorAll('[data-section="troca-equipamentos"], [data-section="ajuda-interna"]')).forEach(el => el.remove());
      }
    } catch {}
    
    // Adição da seção INDICAÇÕES ocorre mais adiante, junto do posicionamento/visibilidade
  // Padroniza: títulos de seções em MAIÚSCULO (preserva ícone)
  try {
    container.querySelectorAll('.form-title').forEach(t => {
      const icon = t.querySelector('i');
      const keepOriginal = !!t.closest('.lentidao-header');
      const raw = (t.textContent || '').trim();
      const text = keepOriginal ? raw : raw.toUpperCase();
      while (t.firstChild) t.removeChild(t.firstChild);
      if (icon) { t.appendChild(icon); t.appendChild(document.createTextNode(' ')); }
      t.appendChild(document.createTextNode(text));
    });
  } catch {}
    try { if (formId !== 'suporte-moto') startDraftAutosave(formId, container); } catch {}

    // Pré-carrega estado vindo do histórico; aplica depois de montar seções dinâmicas
    try {
      if (window.__pendingFormPrefill && window.__pendingFormPrefill.formId === formId) {
        const st = window.__pendingFormPrefill.state || {};
        try { container.__prefillState = normalizeWanState(st); } catch {}
      }
    } catch {}
    // Suporte Moto: carrega rascunho salvo localmente como prefill (se existir)
    try {
      if (formId === 'suporte-moto' && !container.__prefillState) {
        const raw = localStorage.getItem(formStateKey(formId));
        if (raw) {
          try {
            const parsed = JSON.parse(raw);
            container.__prefillState = normalizeWanState(parsed || {});
          } catch {}
        }
      }
    } catch {}
    // Passo 3: migração controlada de prefixos legados no Moto (ficou_* -> estao_*)
    try {
      if (formId === 'suporte-moto' && container.__prefillState) {
        const mapPrefix = {
          'ficou_ont_mac_': 'estao_ont_mac_',
          'ficou_onu_mac_': 'estao_onu_mac_',
          'ficou_rot_mac_': 'estao_rot_mac_'
        };
        const st = normalizeWanState(container.__prefillState || {});
        try { container.__prefillState = { ...st }; } catch {}
        Object.keys(st).forEach((k) => {
          const m = Object.entries(mapPrefix).find(([oldP]) => k.startsWith(oldP));
          if (!m) return;
          const [oldP, newP] = m;
          const newKey = newP + k.slice(oldP.length);
          if (!(newKey in st)) st[newKey] = st[k];
        });
        // também reflete no estado temporário para condicionais
        try { FORM_TMP_STATE[formId] = normalizeWanState({ ...(FORM_TMP_STATE[formId]||{}), ...st }); } catch {}
      }
    } catch {}
    // Acrescenta TROCA DE EQUIPAMENTOS somente onde é desejado (Suporte Moto)
    if (formId === 'suporte-moto') { try { appendTrocaEquipamentosSection(container); } catch {} }
    try { setupMacLists(container); } catch {}
    try { setupOutroList(container); } catch {}
    try { setupVelTestDynamic(container); } catch {}
    try { ensureGlobalCheckboxStyles(); } catch {}
    try { setupWanDynamic(container); } catch {}
    try { ensureFotosJustificativa(container); } catch {}
    try { setupSpeedMasks(container); } catch {}
    // Acrescenta AJUDA INTERNA somente onde é desejado (Suporte Moto)
    if (formId === 'suporte-moto') { try { appendAjudaInternaSection(container); } catch {} }
    // Garante INDICAÇÃO antes de DESCRIÇÃO DA O.S para todos
    try { appendDescricaoOSSection(container); } catch {}
    try { appendIndicacaoSection(container); } catch {}
    try { ensureIndicacaoBeforeDescricao(container); } catch {}
    try { ensureIndicacaoVisibilityForRetencao(container); } catch {}
    try { enforceMotoFinalOrder(container); } catch {}
    // Garantia adicional de posicionamento após próximo tick
    try {
      setTimeout(() => {
        try { ensureIndicacaoBeforeDescricao(container); } catch {}
        try { ensureIndicacaoVisibilityForRetencao(container); } catch {}
        try { enforceMotoFinalOrder(container); } catch {}
      }, 10);
    } catch {}
    // Retenção: revalida ao clicar no campo "Foi atendido no local?"
    try {
      if (formId === 'retencao-clientes' && !container.__retencaoWire){
        container.__retencaoWire = true;
        container.addEventListener('change', (e) => {
          const t = e.target; if (!t) return;
          if ((t.name||'') === 'ret_atendido_local'){
            try { ensureIndicacaoVisibilityForRetencao(container); } catch {}
            try { ensureIndicacaoBeforeDescricao(container); } catch {}
          }
        }, true);
      }
    } catch {}
    try { setupAutoExpand(container); } catch {}
    // Não capturar localização para Comunicado de Ausência
    if (formId !== 'comunicado-ausencia') { try { setupGeolocationCapture(container); } catch {} }
    try { fixFormA11y(container); } catch {}
    // Comunicado de Ausência: remover seções não aplicáveis (INDICAÇÕES e DESCRIÇÃO DA O.S.)
    try {
      if (formId === 'comunicado-ausencia') {
        try { const ind = container.querySelector('[data-section="indicacao"]'); if (ind) ind.remove(); } catch {}
        try {
          const desc = container.querySelector('#descricao_os');
          const sec = desc ? (desc.closest && desc.closest('.form-section')) : null;
          if (sec) sec.remove(); else if (desc) desc.remove();
        } catch {}
        // Reforço: remove novamente após pequeno atraso para evitar reaparição
        setTimeout(() => {
          try { const ind2 = container.querySelector('[data-section="indicacao"]'); if (ind2) ind2.remove(); } catch {}
          try {
            const desc2 = container.querySelector('#descricao_os');
            const sec2 = desc2 ? (desc2.closest && desc2.closest('.form-section')) : null;
            if (sec2) sec2.remove(); else if (desc2) desc2.remove();
          } catch {}
        }, 25);
      }
    } catch {}
    // Aviso da torre (Inviabilidade Técnica): alterna dentro do mesmo bloco
    try {
      const torreHint = container.querySelector('#inv_torre_hint');
      if (torreHint && !container.__invTorreHintWired){
        container.__invTorreHintWired = true;
        const updateTorreHint = () => {
          try {
            const sel = container.querySelector('input[name="inv_rep_torre"]:checked');
            const v = (sel && sel.value || '').toLowerCase();
            torreHint.style.display = (v === 'nao' || v === 'não') ? 'block' : 'none';
          } catch {}
        };
        container.addEventListener('change', (e)=>{
          const t = e.target; if (!t) return;
          if ((t.name||'') === 'inv_rep_torre') updateTorreHint();
        }, true);
        updateTorreHint();
      }
    } catch {}
    // Garantia: seção INDICAÇÃO sempre presente no Suporte Moto (mesmo em carga direta por link)
    try { if (formId === 'suporte-moto') ensureIndicacaoPosition(container); } catch {}
    // Aplica restauração após montar todas as seções dinâmicas
    try {
      if (container.__prefillState) {
  const __prefillNormalized = normalizeWanState(container.__prefillState || {});
  try { container.__prefillState = { ...__prefillNormalized }; } catch {}
  try { FORM_TMP_STATE[formId] = { ...__prefillNormalized }; } catch {}
  try { container.__inPrefill = true; } catch {}
  try { restoreFormState(formId, container); } catch {}
  if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container);
  try { restoreFormState(formId, container); } catch {}
  try { container.__inPrefill = false; } catch {}
  try { container.__prefillState = null; window.__pendingFormPrefill = null; } catch {}
  // Atualiza exemplo do Comunicado após restaurar rascunho
  try {
    if (formId === 'comunicado-ausencia' && typeof container.__updateAusenciaExample === 'function') {
      container.__updateAusenciaExample();
      setTimeout(()=>{ try { container.__updateAusenciaExample(); } catch {} }, 30);
      // Reaplica visibilidade de horário/retorno e supervisor após restauração
      try {
        const reapplyAusenciaUI = () => {
          try {
            const horaInput = container.querySelector('#aus_hora');
            const horaBlock = horaInput ? horaInput.closest('.form-block') : null;
            const retNormBlock = container.querySelector('input[name="aus_retorno"]') ? container.querySelector('input[name="aus_retorno"]').closest('.form-block') : null;
            const retAutoBlock = container.querySelector('[data-alt-ret="1"]');
            const selHora = container.querySelector('input[name="aus_hora_tipo"]:checked');
            const valHora = selHora ? String(selHora.value||'') : '';
            if (horaBlock && retNormBlock && retAutoBlock) {
              if (valHora === 'dia_inteiro') {
                horaBlock.style.display = 'none';
                retNormBlock.style.display = 'none';
                retAutoBlock.style.display = '';
                try { const auto = retAutoBlock.querySelector('input[name="aus_retorno"]'); if (auto) auto.checked = true; } catch {}
              } else if (valHora === 'especifico') {
                horaBlock.style.display = '';
                retNormBlock.style.display = '';
                retAutoBlock.style.display = 'none';
              } else {
                horaBlock.style.display = 'none';
                retNormBlock.style.display = '';
                retAutoBlock.style.display = 'none';
              }
            }
          } catch {}
          try {
            const supBlock = container.querySelector('input[name="aus_sup_comunicada"]')?.closest('.form-block');
            const nomeBlk = container.querySelector('#aus_sup_nome')?.closest('.form-block');
            const hint = supBlock ? supBlock.querySelector('#sup_nao_hint') : null;
            const selSup = container.querySelector('input[name="aus_sup_comunicada"]:checked');
            const vSup = selSup ? String(selSup.value||'').toLowerCase() : '';
            if (nomeBlk) {
              if (vSup === 'sim') { try { nomeBlk.removeAttribute('hidden'); } catch {} nomeBlk.style.display = ''; }
              else { try { nomeBlk.setAttribute('hidden','hidden'); } catch {} nomeBlk.style.display = 'none'; }
              try { const inp=container.querySelector('#aus_sup_nome'); if (inp) inp.required = (vSup === 'sim'); } catch {}
            }
            if (hint) { hint.hidden = (vSup !== 'nao'); }
          } catch {}
          try { container.__updateAusenciaExample(); } catch {}
        };
        reapplyAusenciaUI();
        setTimeout(reapplyAusenciaUI, 30);
        // Reforço: manter UI sincronizada ao alternar campos mesmo após restauro
        if (!container.__ausenciaUIWired) {
          container.__ausenciaUIWired = true;
          container.addEventListener('change', (e) => {
            try {
              const n = (e.target && e.target.name) || '';
              if (n === 'aus_hora_tipo' || n === 'aus_sup_comunicada') reapplyAusenciaUI();
            } catch {}
          }, true);
        }
      } catch {}
    }
  } catch {}
  // Recalcula contadores de textareas após restaurar rascunho
  try {
    container.querySelectorAll('textarea.auto-expand').forEach(t => {
      try { t.dispatchEvent(new Event('input', { bubbles: true })); }
      catch { try { t.dispatchEvent(new Event('input')); } catch {} }
    });
  } catch {}
}

    } catch {}
    // Habilita observador dinâmico para reforçar condicionais e posicionamentos
    try { wireDynamicEnhancers(formId, container); } catch {}
    // não restaura do localStorage; começa limpo a cada abertura
    wireFormPersistence(formId, container);


    // Correção: alguns trechos de HTML foram montados com '\\n' literais,
    // que acabam aparecendo como texto visível. Removemos esses '\\n'
    // de quaisquer nós de texto dentro do container após a renderização.
    (function stripLiteralBackslashN(rootEl){
      if (!rootEl) return;
      try {
        const walker = document.createTreeWalker(rootEl, NodeFilter.SHOW_TEXT);
        const nodes = [];
        let n;
        while ((n = walker.nextNode())) nodes.push(n);
        nodes.forEach(t => {
          const v = t.nodeValue || '';
          if (v.indexOf('\\n') !== -1) {
            // Remove sequências de uma ou mais barras invertidas seguidas de 'n'
            t.nodeValue = v.replace(/\\+n/g, '');
          }
        });
      } catch {}
    })(container);
    // não restaura do localStorage; começa limpo a cada abertura
    wireFormPersistence(formId, container);
    if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container);
    // Correção: garantir o aviso em "EQUIPAMENTOS DO ATENDIMENTO" ao abrir do zero ou pelo histórico
    try {
      if (formId === 'instalacoes-mudancas') {
        const equipTitle = Array.from(container.querySelectorAll('.form-title')).find(t => /EQUIPAMENTOS DO ATENDIMENTO/.test(t.textContent || ''));
        const equipSec = equipTitle ? equipTitle.closest('section.form-section') : null;
        if (equipSec) {
          // Garante que o hint exista
          let hint = equipSec.querySelector('#equip_hint');
          if (!hint) {
            hint = document.createElement('div');
            hint.id = 'equip_hint';
            hint.className = 'form-hint sinal-los-hint is-highlight';
            hint.textContent = 'Primeiro selecione o serviço executado para que as opções sejam mostradas nesta seção.';
            const header = equipSec.querySelector('.form-header');
            if (header && header.parentNode) header.parentNode.insertBefore(hint, header.nextSibling);
          }
          // Avalia seleção atual
          const sel = container.querySelector('input[name="tipo_serv"]:checked');
          const val = sel ? String(sel.value || '') : '';
          const selected = (val === 'instalacao' || val === 'mudanca');
          if (hint) hint.hidden = selected ? true : false;
          try {
            const blocks = Array.from(equipSec.querySelectorAll('.form-block'));
            blocks.forEach(b => { if ((b.id || '') === 'equip_hint') return; if (!selected) b.setAttribute('hidden','hidden'); else b.removeAttribute('hidden'); });
          } catch {}
        }
      }
    } catch {}
    const clearBtn = document.getElementById('btnLimparForm');
if (clearBtn) clearBtn.addEventListener('click', async function(){
  const ok = await (window.__appModal?.showConfirm('Deseja realmente limpar todas as respostas? Esta ação não pode ser desfeita.', { okText: 'Limpar', cancelText: 'Cancelar', danger: true }) || Promise.resolve(false));
  if (!ok) return;
  try { delete FORM_TMP_STATE[formId]; localStorage.removeItem('unificado.formstate.'+formId); } catch {}
  container.querySelectorAll('input, select, textarea').forEach(el => {
    if (el.type === 'radio' || el.type === 'checkbox') el.checked = false;
    else el.value = '';
  });
  // Resetar tamanho do textarea auto-expand para o mínimo
  try {
    container.querySelectorAll('textarea.auto-expand').forEach(t => {
      const min = parseInt(t.dataset.minHeight || '100', 10);
      t.style.height = min + 'px';
    });
  } catch {}
  if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container);
  // Atualiza o exemplo do Comunicado após a limpeza para refletir ( ) nas opções
  try {
    if (container.__formId === 'comunicado-ausencia' && typeof container.__updateAusenciaExample === 'function') {
      container.__updateAusenciaExample();
      // Se nenhuma opção de supervisão estiver marcada, aplicar placeholder [selecione]
      try {
        const sup = container.querySelector('input[name="aus_sup_comunicada"]:checked');
        if (!sup) {
          const exFix = container.querySelector('[data-ctx="exemplo-ausencia"]');
          if (exFix) {
            const base = 'A supervisão [selecione] previamente comunicada sobre a minha ausência.';
            const cur = exFix.textContent || '';
            if (/A supervis[^\n]*/.test(cur)) exFix.textContent = cur.replace(/A supervis[^\n]*/, base);
            else exFix.textContent = (cur ? (cur + '\n') : '') + base;
          }
        }
      } catch {}
    }
  } catch {}
  // Sobe a página para o topo após limpar
  try { scrollToTop(); } catch {}
});

// Garantir limpeza do exemplo e dos avisos ao usar "Limpar respostas"
try {
  document.addEventListener('click', function(e){
    try {
      const t = e.target;
      if (!t) return;
      const isBtn = (t.id === 'btnLimparForm') || (t.closest && t.closest('#btnLimparForm'));
      if (!isBtn) return;
      setTimeout(function(){
        try {
          const fc = document.getElementById('formContainer');
          if (!fc) return;
          // Remove avisos/hints e classes de erro
          try { fc.querySelectorAll('.sinal-los-hint[data-error="1"], .form-error').forEach(n=>{ try { n.remove(); } catch {} }); } catch {}
          try { fc.querySelectorAll('.error').forEach(el=>{ try { el.classList.remove('error'); el.style.boxShadow=''; el.style.borderBottomColor=''; } catch {} }); } catch {}
          // Atualiza exemplo do Comunicado quando aplicável
          try {
            if (fc.__formId === 'comunicado-ausencia' && typeof fc.__updateAusenciaExample === 'function') {
              fc.__updateAusenciaExample();
              // Se nenhuma opção de supervisão estiver marcada, aplicar placeholder [selecione]
              try {
                const sup = fc.querySelector('input[name="aus_sup_comunicada"]:checked');
                if (!sup) {
                  const exFix = fc.querySelector('[data-ctx="exemplo-ausencia"]');
                  if (exFix) {
                    const base = 'A supervisão [selecione] previamente comunicada sobre a minha ausência.';
                    const cur = exFix.textContent || '';
                    if (/A supervis[^\n]*/.test(cur)) exFix.textContent = cur.replace(/A supervis[^\n]*/, base);
                    else exFix.textContent = (cur ? (cur + '\n') : '') + base;
                  }
                }
              } catch {}
            }
          } catch {}
        } catch {}
      }, 30);
    } catch {}
  }, true);
} catch {}

// Função de pós-processamento específica para instalacoes-mudancas
function postProcessInstalacoesMudancas(text) {
  try {
    const lines = text.split('\n');
    const result = [];
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      // Se é um cabeçalho MAC
      if (line === 'MAC DOS EQUIPAMENTOS RETIRADOS:' || line === 'MAC DOS EQUIPAMENTOS DEIXADOS NO LOCAL:') {
        // Regra: para RETIRADOS não insere linha em branco antes;
        // para DEIXADOS, mantém uma linha em branco antes quando apropriado.
        if (line === 'MAC DOS EQUIPAMENTOS DEIXADOS NO LOCAL:' && result.length > 0 && result[result.length - 1] !== '') {
          result.push('');
        }
        result.push(line);
        i++;

        // Processar todos os MACs desta seção (aceita com ou sem prefixo '- ')
        let lastWasRouter = false;
        const isMacItem = (s) => {
          const t = String(s||'').trim();
          return /^-\s*/.test(t) || /\(MAC\):/i.test(t) || /^TELEFONE\s*:/i.test(t);
        };
        while (i < lines.length && isMacItem(lines[i])) {
          const macLine = lines[i];
          const isRouter = /roteador/i.test(macLine);
          // Apenas acumula; separações finas são tratadas depois
          result.push(macLine);
          lastWasRouter = isRouter;
          i++;
        }

        // Adicionar linha em branco após a seção MAC
        result.push('');
      } else {
        result.push(line);
        i++;
      }
    }

    let out = result.join('\n');

    // Renomear cabeçalho "DEIXADOS NO LOCAL" para "EQUIPAMENTOS INSERIDOS:" no texto copiado
    try { out = out.replace(/MAC DOS EQUIPAMENTOS DEIXADOS NO LOCAL:/g, 'EQUIPAMENTOS INSERIDOS:'); } catch {}

    // Garantia: inserir linha em branco antes de cabeçalhos esperados se vier logo após item de MAC
    try {
      out = out.replace(/([^\n])\n(QUAL EQUIPAMENTO FOI INSERIDO:)/g, '$1\n\n$2');
      // Espaço antes do cabeçalho "EQUIPAMENTOS INSERIDOS:" (após renomeação)
      out = out.replace(/([^\n])\n(EQUIPAMENTOS INSERIDOS:)/g, '$1\n\n$2');
      // Espaço antes do cabeçalho "RETIRADOS"
      out = out.replace(/([^\n])\n(MAC DOS EQUIPAMENTOS RETIRADOS:)/g, '$1\n\n$2');
      out = out.replace(/([^\n])\n(-- AJUDA INTERNA --)/g, '$1\n\n$2');
      // Espaço acima do título da seção INDICAÇÕES
      out = out.replace(/([^\n])\n(-- INDICAÇÕES --)/g, '$1\n\n$2');
      out = out.replace(/(-- AJUDA INTERNA --)\n\s*\n/g, '$1\n');
      // Remover traço antes dos títulos "CABO N:" no texto copiado
      out = out.replace(/(^|\n)-\s+CABO\s+(\d+)/g, '$1CABO $2');
      // Garantir uma linha em branco entre "CABO N" e "CABO N+1"
      out = out.replace(/(CABO\s+\d+:[\s\S]*?)\n{2,}(CABO\s+\d+:)/g, '$1\n\n$2');
      // Caso solicitado: garantir linha em branco após "FOI NECESSÁRIO A TROCA DE EQUIPAMENTO?" quando resposta = Sim
      out = out.replace(/(FOI NECESS[ÁA]RIO A TROCA DE EQUIPAMENTO[S]?\?\s*\n\s*Sim)\s*\n(\s*MAC DOS EQUIPAMENTOS RETIRADOS:)/i, '$1\n\n$2');
    } catch {}
    return out;
  } catch {
    return text; // fallback
  }
}

const copyBtn = document.getElementById('btnCopiarForm');
    if (copyBtn) copyBtn.addEventListener('click', async function(){
  // Tratamento personalizado para o formulário de Comunicado de Ausência
  try {
    const container = document.getElementById('formContainer');
    const formId = (container && container.__formId) || '';
    if (formId === 'comunicado-ausencia') {
      // Estilo de "tremidinha" (injetado uma vez)
      const ensureErrShakeStyle = () => {
        try {
          if (document.getElementById('errShakeStyle')) return;
          const st = document.createElement('style'); st.id='errShakeStyle';
          st.textContent = '@keyframes errshake{0%{transform:translateX(0)}20%{transform:translateX(-2px)}40%{transform:translateX(2px)}60%{transform:translateX(-2px)}80%{transform:translateX(2px)}100%{transform:translateX(0)}} .error-shake{animation:errshake .32s ease}';
          document.head.appendChild(st);
        } catch {}
      };
      const clearErrors = () => {
        try { Array.from(container.querySelectorAll('.form-error')).forEach(el => el.remove()); } catch {}
        try { Array.from(container.querySelectorAll('.sinal-los-hint[data-error="1"]')).forEach(el => el.remove()); } catch {}
        try { const el=container.querySelector('#aus_data'); el?.classList.remove('error'); if (el){ el.style.boxShadow=''; el.style.borderBottomColor=''; } } catch {}
        try { const el=container.querySelector('#aus_hora'); el?.classList.remove('error'); if (el){ el.style.boxShadow=''; el.style.borderBottomColor=''; } } catch {}
        try { const el=container.querySelector('#aus_motivo'); el?.classList.remove('error'); if (el){ el.style.boxShadow=''; el.style.borderBottomColor=''; } } catch {}
        try { const seg=container.querySelector('.segmented'); seg?.classList.remove('error'); if (seg){ seg.style.boxShadow=''; seg.style.border=''; seg.style.borderColor=''; } } catch {}
      };
      const addError = (el, msg) => {
        try {
          ensureErrShakeStyle();
          const block = el.closest('.form-block') || el;
          // Aviso no mesmo estilo do "Sem sinal"
          try { Array.from(block.querySelectorAll('.sinal-los-hint[data-error="1"]')).forEach(function(x){ try { x.remove(); } catch {} }); } catch {}
          const m = document.createElement('div');
          m.className = 'form-hint sinal-los-hint is-highlight';
          m.setAttribute('data-error','1');
          m.textContent = msg || 'Este campo é obrigatório.';
          if (el.classList) {
            el.classList.add('error');
            if (el.id === 'aus_data' || el.id === 'aus_hora' || el.id === 'aus_motivo') { el.style.borderBottomColor = '#ff4d4d'; el.style.boxShadow = '0 2px 0 rgba(255,77,77,.5)'; }
            // Tremidinha
            try { el.classList.add('error-shake'); setTimeout(()=>{ try { el.classList.remove('error-shake'); } catch {} }, 360); } catch {}
          } else if (el.querySelector) {
            const seg = el.querySelector('.segmented') || el;
            seg.classList.add('error');
            try { seg.classList.add('error-shake'); setTimeout(()=>{ try { seg.classList.remove('error-shake'); } catch {} }, 360); } catch {}
          }
          block.appendChild(m);
          // Remove aviso automaticamente após 7s
          setTimeout(() => {
            try { m.remove(); } catch {}
            try {
              if (el.classList) { el.classList.remove('error'); el.style.boxShadow=''; el.style.borderBottomColor=''; }
              else if (el.querySelector) { const seg = el.querySelector('.segmented') || el; seg.classList.remove('error'); seg.style.boxShadow=''; seg.style.border=''; seg.style.borderColor=''; }
            } catch {}
          }, 7000);
        } catch {}
      };
      clearErrors();
      const data = (document.getElementById('aus_data')?.value || '').trim();
      let horaRaw = (document.getElementById('aus_hora')?.value || '').trim();
      const hora = horaRaw ? horaRaw.replace(':','h') : '';
      const motivo = (document.getElementById('aus_motivo')?.value || '').trim();
      let sel = '';
      try { const r = container.querySelector('input[name="aus_retorno"]:checked'); sel = (r && r.value) || ''; } catch {}
      let sup = '';
      try { const r2 = container.querySelector('input[name="aus_sup_comunicada"]:checked'); sup = (r2 && r2.value) || ''; } catch {}
      // Tipo de horário selecionado
      const __horaTipo = (function(){ try { const s=container.querySelector('input[name="aus_hora_tipo"]:checked'); return s ? String(s.value||'') : 'especifico'; } catch { return 'especifico'; } })();
      if (__horaTipo === 'dia_inteiro') { try { if (!horaRaw) horaRaw = '08:00'; } catch {} }
      let hasErr = false; const reDate=/^\d{2}\/\d{2}\/\d{4}$/; const reTime=/^\d{2}:\d{2}$/;
      // Data: formato e ano máximo atual+1
      if (!data || !reDate.test(data)) { addError(document.getElementById('aus_data'), 'Preencha a data no formato dd/mm/aaaa.'); hasErr = true; }
      else {
        try {
          const [dd,mm,yy] = data.split('/').map(x=>parseInt(x,10));
          if (mm < 1 || mm > 12) { addError(document.getElementById('aus_data'), 'Mês inválido. Use de 01 a 12.'); hasErr = true; }
          else if (dd < 1 || dd > 31) { addError(document.getElementById('aus_data'), 'Dia inválido. Use de 01 a 31.'); hasErr = true; }
          else {
            const daysInMonth = (y, m) => { try { return new Date(y, m, 0).getDate(); } catch { return 31; } };
            const maxDay = daysInMonth(yy, mm);
            if (dd > maxDay) { addError(document.getElementById('aus_data'), 'Dia inválido para o mês informado.'); hasErr = true; }
            const d = new Date(yy, mm-1, dd);
            const curYear = new Date().getFullYear();
            const maxYear = curYear + 1;
            if (!(d.getFullYear()===yy && d.getMonth()===(mm-1) && d.getDate()===dd)) { addError(document.getElementById('aus_data'), 'Data inválida.'); hasErr = true; }
            else if (yy < curYear || yy > maxYear) { addError(document.getElementById('aus_data'), 'Ano não permitido. Use entre ' + curYear + ' e ' + maxYear + '.'); hasErr = true; }
            else {
              try {
                const today = new Date(); today.setHours(0,0,0,0);
                if (d < today) { addError(document.getElementById('aus_data'), 'A data não pode ser anterior ao dia atual.'); hasErr = true; }
              } catch {}
            }
          }
        } catch { addError(document.getElementById('aus_data'), 'Data inválida.'); hasErr = true; }
      }
      // Hora: 24h
      if (!horaRaw || !reTime.test(horaRaw)) { addError(document.getElementById('aus_hora'), 'Preencha o horário no formato hh:mm.'); hasErr = true; }
      else {
        try { const [hh,mm] = horaRaw.split(':').map(x=>parseInt(x,10)); if (!(hh>=0 && hh<=23 && mm>=0 && mm<=59)) { addError(document.getElementById('aus_hora'), 'Horário inválido. Use 00:00 a 23:59.'); hasErr = true; } } catch { addError(document.getElementById('aus_hora'), 'Horário inválido.'); hasErr = true; }
      }
      if (!motivo) { addError(document.getElementById('aus_motivo'), 'Informe o motivo da ausência.'); hasErr = true; }
      if (!sel) { const el = container.querySelector('div.segmented [name="aus_retorno"]').closest('.form-block'); if (el){ addError(el, 'Selecione uma opção de retorno.'); } hasErr = true; }
      if (!sup) { const el2 = container.querySelector('div.segmented [name="aus_sup_comunicada"]').closest('.form-block'); if (el2){ addError(el2, 'Informe se a supervisão foi previamente comunicada.'); } hasErr = true; }
      else if (sup === 'sim') {
        const nminp = container.querySelector('#aus_sup_nome');
        if (!nminp || !String(nminp.value||'').trim()) { addError(nminp || (container.querySelector('div.segmented [name="aus_sup_comunicada"]').closest('.form-block')), 'Informe o nome do supervisor (obrigatório).'); hasErr = true; }
      }
      if (hasErr) {
        try {
          // Localiza o elemento de erro mais acima na tela
          const cand = Array.from(container.querySelectorAll('.error, .sinal-los-hint[data-error="1"]'));
          let target = null;
          let bestTop = Infinity;
          cand.forEach(el => {
            const blk = (el.closest && el.closest('.form-block')) || el;
            const rect = blk.getBoundingClientRect();
            const top = rect.top + window.scrollY;
            if (top < bestTop) { bestTop = top; target = blk; }
          });
          if (target) {
            const topbar = document.querySelector('.topbar');
            const offset = (topbar && topbar.offsetHeight ? topbar.offsetHeight : 72) + 12;
            const y = bestTop - offset;
            window.scrollTo({ top: y < 0 ? 0 : y, behavior: 'smooth' });
            // Foco no primeiro campo com erro dentro do bloco
            const focusable = target.querySelector('.error, input, select, textarea, .segmented');
            if (focusable && focusable.focus) setTimeout(()=>{ try { focusable.focus(); } catch {} }, 50);
          }
        } catch {}
        return;
      }
      try { localStorage.setItem(formStateKey(formId), JSON.stringify((typeof collectCurrentFormState === "function") ? collectCurrentFormState(container) : getFormState(formId))); } catch {}
      const retornoLine = sel === 'inicio_tarde' ? 'Iniciarei a rota mais tarde.' : sel === 'retornar' ? 'Retornarei para finalizar o expediente.' : 'Não retornarei para finalizar o expediente.';
      const header = 'COMUNICADO DE AUSÊNCIA';
      const greet = (function(){ try { const h=new Date().getHours(); if (h>=5&&h<12) return 'Bom dia.'; if (h<18) return 'Boa tarde.'; return 'Boa noite.'; } catch { return 'Olá.'; } })();
      const l01 = `${greet} Venho, por meio deste, informar que no dia ${data}, no horário das ${hora}, precisarei me ausentar para ${motivo}.`;
      const lRet = retornoLine || '';
      let lSup = sup === 'sim' ? 'A supervisão foi previamente comunicada sobre a minha ausência.' : 'A supervisão não foi previamente comunicada sobre a minha ausência.';
      try {
        if (sup === 'sim') {
          const nmRaw = (container.querySelector('#aus_sup_nome')?.value || '').trim();
          if (nmRaw) {
            const toTitle = (s) => (s||'').replace(/\s+/g,' ').trim().split(' ').filter(Boolean).map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');
            const nm = toTitle(nmRaw);
            lSup = `O supervisor ${nm} foi previamente comunicada sobre a minha ausência.`;
          }
        }
      } catch {}
      let text = [header, l01, lRet, lSup].filter(Boolean).join('\n');
      try {
        const l01new = `${greet} Venho por meio deste comunicado, informar que no dia ${data}, no horário das ${hora}, precisarei me ausentar para ${motivo}.`;
        text = [header, l01new, lRet, lSup].filter(Boolean).join('\n');
      } catch {}
      // Ajuste final para opção "O dia inteiro": substitui o período e o retorno
      try {
        const tsel = container.querySelector('input[name="aus_hora_tipo"]:checked');
        const tval = tsel ? String(tsel.value||'') : '';
        if (tval === 'dia_inteiro') {
          try { text = text.replace(/no\s+h.{0,3}rio\s+das\s+[^,]+/i, 'o dia inteiro'); } catch {}
          try { text = text.replace(/^(Iniciarei a rota mais tarde\.|Retornarei para finalizar o expediente\.|N[oô]o retornarei para finalizar o expediente\.)$/m, 'Não estarei na rota neste dia.'); } catch {}
        }
      } catch {}
      try {
        const tsel2 = container.querySelector('input[name="aus_hora_tipo"]:checked');
        const tval2 = tsel2 ? String(tsel2.value||'') : '';
        if (tval2 === 'dia_inteiro') {
          try { text = text.replace(/no\s+ho.*?rio\s+das\s*,/i, 'o dia inteiro,'); } catch {}
        }
      } catch {}
      try { await navigator.clipboard.writeText(text); try { await window.__appModal?.showAlert('Texto copiado.', { title: 'Pronto' }); } catch {} }
      catch(e){
        try { const aux=document.createElement('textarea'); aux.value=text; document.body.appendChild(aux); aux.select(); document.execCommand('copy'); document.body.removeChild(aux); try { await window.__appModal?.showAlert('Texto copiado.', { title: 'Pronto' }); } catch {} }
        catch { try { await window.__appModal?.showAlert('Falha ao copiar. Selecione e copie manualmente.\n\n'+text, { title: 'Atenção' }); } catch {} }
      }
      // Salvar no histórico como finalizado
      try {
        const st = (typeof collectCurrentFormState === "function") ? collectCurrentFormState(container) : getFormState(formId);
        const equipe = 'especial';
        let cliente = '';
        try { cliente = (localStorage.getItem('unificado.userName')||'').trim(); } catch { cliente=''; }
        if (!cliente) cliente = 'Usuário';
        if (typeof window.__addHistoryWithSnapshot === 'function') {
          const titulo = 'Comunicado de Ausência';
          window.__addHistoryWithSnapshot({ formId, equipe, cliente, formulario: titulo, data: Date.now(), isDraft:false }, st);
        }
      } catch {}
      return;
    }
    else if (formId === 'retirada-equipamentos-carro') {
      // Validação: quando "Os equipamentos foram retirados?" = Sim, os MACs tornam-se obrigatórios
      try {
        const ensureErrShakeStyle = () => {
          try {
            if (document.getElementById('errShakeStyle')) return;
            const st = document.createElement('style'); st.id='errShakeStyle';
            st.textContent = '@keyframes errshake{0%{transform:translateX(0)}20%{transform:translateX(-2px)}40%{transform:translateX(2px)}60%{transform:translateX(-2px)}80%{transform:translateX(2px)}100%{transform:translateX(0)}} .error-shake{animation:errshake .32s ease}';
            document.head.appendChild(st);
          } catch {}
        };
        const clearInlineErrors = () => {
          try { Array.from(container.querySelectorAll('.form-hint.sinal-los-hint[data-error="1"]')).forEach(el => el.remove()); } catch {}
          try { Array.from(container.querySelectorAll('.form-input--underline.error')).forEach(el => { el.classList.remove('error'); el.style.boxShadow=''; el.style.borderBottomColor=''; }); } catch {}
          try { Array.from(container.querySelectorAll('.segmented.error, .choices.error')).forEach(seg => { seg.classList.remove('error'); seg.style.boxShadow=''; seg.style.border=''; seg.style.borderColor=''; }); } catch {}
        };
        const addBlockError = (block, targetEl, msg) => {
          try {
            ensureErrShakeStyle();
            const host = block || targetEl || container;
            const m = document.createElement('div');
            m.className = 'form-hint sinal-los-hint is-highlight';
            m.setAttribute('data-error','1');
            m.textContent = msg || 'Preencha este campo.';
            host.appendChild(m);
            const el = targetEl;
            if (el && el.classList) {
              el.classList.add('error');
              if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') { el.style.borderBottomColor = '#ff4d4d'; el.style.boxShadow = '0 2px 0 rgba(255,77,77,.5)'; }
              try { el.classList.add('error-shake'); setTimeout(()=>{ try { el.classList.remove('error-shake'); } catch {} }, 360); } catch {}
            } else if (block) {
              const seg = block.querySelector('.segmented, .choices');
              if (seg) {
                seg.classList.add('error');
                try { seg.classList.add('error-shake'); setTimeout(()=>{ try { seg.classList.remove('error-shake'); } catch {} }, 360); } catch {}
              }
            }
            // Remoção automática após 7s
            setTimeout(() => {
              try { m.remove(); } catch {}
              try {
                if (el && el.classList) { el.classList.remove('error'); el.style.boxShadow=''; el.style.borderBottomColor=''; }
                else if (block) { const seg = block.querySelector('.segmented, .choices'); if (seg){ seg.classList.remove('error'); seg.style.boxShadow=''; seg.style.border=''; seg.style.borderColor=''; } }
              } catch {}
            }, 7000);
            // Remoção antecipada quando o bloco for ocultado (condicional desligada)
            try {
              const targetBlock = block || (el ? el.closest && el.closest('.form-block') : null);
              if (targetBlock) {
                const obs = new MutationObserver(() => {
                  try {
                    if (targetBlock.hasAttribute('hidden') || (window.getComputedStyle(targetBlock).display === 'none')) {
                      try { m.remove(); } catch {}
                      try { if (el && el.classList) { el.classList.remove('error'); el.style.boxShadow=''; el.style.borderBottomColor=''; } } catch {}
                      try { const seg = targetBlock.querySelector('.segmented, .choices'); if (seg){ seg.classList.remove('error'); seg.style.boxShadow=''; seg.style.border=''; seg.style.borderColor=''; } } catch {}
                      try { obs.disconnect(); } catch {}
                    }
                  } catch {}
                });
                obs.observe(targetBlock, { attributes: true, attributeFilter: ['hidden', 'style', 'class'] });
              }
            } catch {}
          } catch {}
        };
        clearInlineErrors();
        const retSel = container.querySelector('input[name="ret_equip"]:checked');
        const isRetirado = !!(retSel && String(retSel.value||'').toLowerCase() === 'sim');
        if (isRetirado) {
          const errActions = [];
          let firstFocusEl = null;
          const eqBlock = container.querySelector('.form-block[data-when-field="ret_equip"][data-when-equals="sim"]');
          const eqOnt = container.querySelector('#eq_sel_ont');
          const eqOnu = container.querySelector('#eq_sel_onu');
          const eqRot = container.querySelector('#eq_sel_rot');
          const eqOut = container.querySelector('#eq_sel_outro');
          const eqChecked = [eqOnt, eqOnu, eqRot, eqOut].filter(e => e && e.checked);
          if (eqChecked.length === 0) {
            if (!firstFocusEl) {
              try { firstFocusEl = eqBlock ? (eqBlock.querySelector('input[type="checkbox"]') || eqBlock) : null; } catch {}
            }
            errActions.push(() => addBlockError(eqBlock, null, 'Selecione ao menos um equipamento retirado.'));
          }
          // Helper para checar lista de MAC por prefixo
          const hasAnyMacByPrefix = (prefix) => {
            try {
              const inputs = Array.from(container.querySelectorAll('input[name^="'+prefix+'"][type="text"]'));
              return inputs.some(i => (i.value||'').trim() !== '');
            } catch { return false; }
          };
          // ONT
          if (eqOnt && eqOnt.checked) {
            if (!hasAnyMacByPrefix('ont_mac_')) {
              const blk = container.querySelector('.form-block[data-when-field="eq_sel_ont"][data-when-equals="true"]');
              const first = blk ? (blk.querySelector('input[name^="ont_mac_"]') || blk) : null;
              if (!firstFocusEl) firstFocusEl = first;
              errActions.push(() => addBlockError(blk, first, 'Informe ao menos um MAC ONT.'));
            }
          }
          // ONU
          if (eqOnu && eqOnu.checked) {
            if (!hasAnyMacByPrefix('onu_mac_')) {
              const blk = container.querySelector('.form-block[data-when-field="eq_sel_onu"][data-when-equals="true"]');
              const first = blk ? (blk.querySelector('input[name^="onu_mac_"]') || blk) : null;
              if (!firstFocusEl) firstFocusEl = first;
              errActions.push(() => addBlockError(blk, first, 'Informe ao menos um MAC ONU.'));
            }
          }
          // Roteador
          if (eqRot && eqRot.checked) {
            if (!hasAnyMacByPrefix('rot_mac_')) {
              const blk = container.querySelector('.form-block[data-when-field="eq_sel_rot"][data-when-equals="true"]');
              const first = blk ? (blk.querySelector('input[name^="rot_mac_"]') || blk) : null;
              if (!firstFocusEl) firstFocusEl = first;
              errActions.push(() => addBlockError(blk, first, 'Informe ao menos um MAC do roteador.'));
            }
          }
          // Outros: exigir pelo menos um MAC em outro_mac_
          if (eqOut && eqOut.checked) {
            const hasOutroMac = hasAnyMacByPrefix('outro_mac_');
            if (!hasOutroMac) {
              const blk = container.querySelector('.form-block[data-when-field="eq_sel_outro"][data-when-equals="true"]');
              // Tenta focar no primeiro campo de MAC dos "outros"
              let first = null;
              try { first = blk ? blk.querySelector('input[name^="outro_mac_"]') : null; } catch {}
              if (!firstFocusEl) firstFocusEl = first || blk;
              errActions.push(() => addBlockError(blk, first, 'Informe ao menos um MAC dos outros equipamentos.'));
            }
          }
          if (errActions.length > 0) {
            try {
              const html = '<div style="display:flex;gap:10px;align-items:flex-start;background:rgba(220,38,38,.08);border-left:4px solid #dc2626;padding:12px;border-radius:6px;color:#dc2626;">'
                + '<i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>'
                + '<div><div style="font-weight:700;margin-bottom:4px;">Alerta</div>'
                + '<div>Preencha os campos obrigatórios de MAC dos equipamentos retirados.</div></div>'
                + '</div>';
              await (window.__appModal?.showAlert('', { title: 'Alerta', html, okText: 'Entendi', noHeader: true, shake: true }));
            } catch {}
            try { errActions.forEach(fn => { try { fn(); } catch {} }); } catch {}
            try {
              const tgt = firstFocusEl;
              if (tgt && typeof tgt.scrollIntoView === 'function') {
                tgt.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              const focusEl = (tgt && tgt.tagName && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA')) ? tgt : (tgt ? tgt.querySelector && tgt.querySelector('input, textarea') : null);
              try { if (focusEl && typeof focusEl.focus === 'function') focusEl.focus(); } catch {}
            } catch {}
            return;
          }
        }
      } catch {}
    }
  } catch {}
  try { localStorage.setItem(formStateKey(formId), JSON.stringify((typeof collectCurrentFormState === "function") ? collectCurrentFormState(container) : getFormState(formId))); } catch {}
  const container = document.getElementById('formContainer');
  if (!container) { try { await (window.__appModal?.showAlert('Formulário não encontrado.', { title: 'Aviso' })); } catch {} return; }
  if (navigator.geolocation && typeof navigator.geolocation.getCurrentPosition === 'function') {
    try {
      const pos = await new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy:true, timeout:3000, maximumAge:60000 });
      });
      try {
        const geoInp = document.getElementById('geo_coords');
        const { latitude, longitude } = pos?.coords || {};
        if (geoInp && typeof latitude==='number' && typeof longitude==='number') {
          geoInp.value = latitude.toFixed(6)+','+longitude.toFixed(6);
        }
      } catch {}
    } catch {}
  }
  function isVisible(el){ if (!el) return false; if (el.hasAttribute('hidden')) return false; const st = window.getComputedStyle(el); if (st.display==='none'||st.visibility==='hidden') return false; return !!el.offsetParent || st.position==='fixed' || st.position==='sticky'; }
  // Fallback global: prepara link do Maps a partir do campo geo_coords (se existir)
  let __mapsLink = '';
  let __printedMapsLink = false;
  try {
    const geoVal = (document.getElementById('geo_coords')?.value || '').trim().replace(/\s+/g,'');
    if (/^-?\d+(?:\.\d+)?,-?\d+(?:\.\d+)?$/.test(geoVal)) {
      __mapsLink = 'https://www.google.com/maps?q=' + geoVal;
    }
  } catch {}
  // Rebuilder de fallback: VERIFICAÇÕES DE CABOS DE REDE (evita duplicidade e leituras erradas)
  try {
    const st = (typeof collectCurrentFormState === 'function') ? collectCurrentFormState(container) : {};
    const wanIdx = new Set();
    try { Object.keys(st||{}).forEach(k=>{ const m=String(k||'').match(/^wan_item_(\d+)_(device|gigabit|powermitter|ping|obs)$/i); if (m) wanIdx.add(parseInt(m[1],10)||0); }); } catch {}
    let max = 0; try { wanIdx.forEach(n=>{ if(n>max) max=n; }); } catch {}
    try { const list = container.querySelector('[data-wan-list="1"]'); if (list){ const n=list.querySelectorAll('[data-wan-item="1"]').length; if (n>max) max=n; } } catch {}
    if (max>0){
      const getB = (i,k)=>{ const v=(st||{})[`wan_item_${i}_${k}`]; return (typeof v==='boolean')?v:false; };
      const getV = (i,k)=>{ const v=(st||{})[`wan_item_${i}_${k}`]; return (typeof v==='string')?v.trim():(v?String(v):''); };
      const out=[]; out.push('VERIFICAÇÕES DE CABOS DE REDE');
      for(let i=1;i<=max;i++){
        let ativo='';
        try { if(i===1){ const r=container.querySelector('#wan_ativo_tipo_1_onu'); if(r&&r.checked) ativo='Cabo da ONU pro Roteador'; else ativo=getV(1,'device')||(container.querySelector('#wan_item_1_device')?.value||'').trim(); } else { ativo=getV(i,'device'); } } catch {}
        out.push(`CABO ${i}: ${ativo || 'O técnico não preencheu este campo.'}`);
        const items=[]; try { if (getB(i,'gigabit')) items.push('Cabo de rede Gigabit'); } catch {} try { if (getB(i,'powermitter')) items.push('Teste no Powermitter'); } catch {} try { if (getB(i,'ping')) items.push('Teste de Ping no Cabo'); } catch {}
        if (items.length){ items.forEach(t=>out.push(`- ${t}`)); } else { out.push('O técnico não preencheu este campo.'); }
        const obs = getV(i,'obs'); if (obs) out.push(`- OBSERVAÇÃO: ${obs}`);
        if (i<max) out.push('');
      }
      out.push('');
      const wanStr = out.join('\n');
      const lines = text.split('\n');
      let s=-1,e=-1;
      for(let i=0;i<lines.length;i++){
        const L=(lines[i]||'').trim();
        if(s<0 && L.startsWith('VERIFICA') && L.includes('CABOS DE REDE')){ s=i; continue; }
        if(s>=0){
          if (L==='PINGS' || L==='TRACERTS' || L.startsWith('RESULTADO DO ') || L.startsWith('-- ')) { e=i; break; }
        }
      }
      if (s>=0){ if (e<0) e=lines.length; const pre=lines.slice(0,s).join('\n'); const post=lines.slice(e).join('\n'); text = pre + (pre.endsWith('\n')?'':'\n') + wanStr + (post.startsWith('\n')?'':(post?'\n':'')) + post; }
    }
  } catch {}
  function getRadioGroupValue(block){ const sel = block.querySelector('input[type="radio"]:checked'); if (!sel) return ''; const lab = block.querySelector(`label[for="${sel.id}"]`); return (lab?.textContent || sel.value || '').trim(); }
  function cleanQ(s){ try { return String(s||'').replace(/\([^)]*escolh[^)]*\)/ig,'').trim(); } catch (e) { return s||''; } }
  function collectMacRows(list){ const rows = Array.from(list.querySelectorAll('.mac-row input')); return rows.map(i => (i.value||'').trim()).filter(Boolean); }
  function formatSinalFibraCopy(v){ try { if (typeof formatSinalFibraForCopy === 'function') return formatSinalFibraForCopy(v); } catch {} return v; }
  const copyState = (typeof collectCurrentFormState === 'function') ? collectCurrentFormState(container) : {};
  const sections = Array.from(container.querySelectorAll('.form-section'));
  const parts = [];
  sections.forEach((sec) => {
    if (!isVisible(sec)) return;
    const secOut = [];
    const rawTitle = (sec.querySelector('.form-title')?.textContent || '').trim();
    let headerTitle = rawTitle || '';
    try { if (/finaliza/i.test(headerTitle)) headerTitle = 'DESCRIÇÃO DA O.S'; } catch {}
    if (headerTitle) secOut.push(`-- ${headerTitle.toUpperCase()} --`);
    try {
      const up = headerTitle.toUpperCase();
      if (up.includes('ENDERE') && up.includes('O.S')){
        const geoInp = document.getElementById('geo_coords');
        const coords = (geoInp?.value||'').trim();
        if (coords) {
          const clean = coords.replace(/\s+/g,'');
          const m = clean.match(/^(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)$/);
          const link = m ? ('https://www.google.com/maps?q=' + m[1] + ',' + m[2]) : ('https://www.google.com/maps?q=' + clean);
          secOut.push('LOCALIZAÇÃO OBTIDA AUTOMATICAMENTE:');
          secOut.push(link);
          secOut.push('');
          __printedMapsLink = true;
        }
      }
    } catch {}
    // Requisito: repetir o link de localização no topo da seção DESCRIÇÃO DA O.S (quando houver)
    try {
      const isDesc = /DESCRIÇÃO DA O\.S/i.test(headerTitle || '');
      if (isDesc && __mapsLink){
        secOut.push('LOCALIZAÇÃO DO ATENDIMENTO: ' + __mapsLink);
        secOut.push('');
      }
    } catch {}
    const blocks = Array.from(sec.querySelectorAll('.form-block'));
    const __printedQ = new Set();
    let __lentStructuredPrinted = false; // Controle para evitar impressão duplicada de PINGS/TRACERTS
    // Helpers para agrupar campos (RETIRADO/INSERIDO/FICOU) e controlar quebras em branco
    const __getCampoFromPrevSelector = (idx) => {
      try {
        for (let i = idx - 1; i >= 0; i--) {
          const pb = blocks[i]; if (!isVisible(pb)) continue;
          if (pb.querySelector('.segmented') || pb.querySelector('.choices')){
            const ql = (pb.querySelector('.form-label')?.textContent || '').trim().toUpperCase();
            if (!ql) continue;
            if (/RETIRADO/.test(ql)) return 'RETIRADO';
            if (/INSERIDO/.test(ql)) return 'INSERIDO';
            if (/FICOU/.test(ql)) return 'FICOU';
            if (/DEIXADO/.test(ql)) return 'DEIXADO';
            // Se for apenas um bloco de opções (choices) genérico, continuar buscando um seletor anterior
            if (pb.querySelector('.choices')) continue;
            return '';
          }
        }
      } catch {}
      return '';
    };
    const __hasNextSameCampoMacOrOutro = (idx, campo) => {
      try {
        for (let j = idx + 1; j < blocks.length; j++){
          const b = blocks[j]; if (!isVisible(b)) continue;
          if (!(b.querySelector('.mac-list') || b.querySelector('.outro-list'))) continue;
          const c = __getCampoFromPrevSelector(j);
          return !!(c && c === campo);
        }
      } catch {}
      return false;
    };
    const toSentence = (s) => { try { const t=String(s||'').trim(); return t ? (t.charAt(0).toUpperCase()+t.slice(1).toLowerCase()) : t; } catch { return s||''; } };
    let __velTestIndex = 0;
    const ordinalPt = (n) => {
      switch (n) {
        case 1: return 'PRIMEIRO';
        case 2: return 'SEGUNDO';
        case 3: return 'TERCEIRO';
        case 4: return 'QUARTO';
        case 5: return 'QUINTO';
        default: try { return String(n) + 'º'; } catch { return String(n); }
      }
    };
    const ordinalExtenso = (n) => {
      try {
        const M = {
          1:'PRIMEIRO', 2:'SEGUNDO', 3:'TERCEIRO', 4:'QUARTO', 5:'QUINTO',
          6:'SEXTO', 7:'SÉTIMO', 8:'OITAVO', 9:'NONO', 10:'DÉCIMO',
          11:'DÉCIMO PRIMEIRO', 12:'DÉCIMO SEGUNDO', 13:'DÉCIMO TERCEIRO', 14:'DÉCIMO QUARTO', 15:'DÉCIMO QUINTO',
          16:'DÉCIMO SEXTO', 17:'DÉCIMO SÉTIMO', 18:'DÉCIMO OITAVO', 19:'DÉCIMO NONO', 20:'VIGÉSIMO',
          21:'VIGÉSIMO PRIMEIRO', 22:'VIGÉSIMO SEGUNDO', 23:'VIGÉSIMO TERCEIRO', 24:'VIGÉSIMO QUARTO', 25:'VIGÉSIMO QUINTO',
          26:'VIGÉSIMO SEXTO', 27:'VIGÉSIMO SÉTIMO', 28:'VIGÉSIMO OITAVO', 29:'VIGÉSIMO NONO', 30:'TRIGÉSIMO'
        };
        if (M[n]) return M[n];
        const dezenas = { 30: 'TRIGÉSIMO', 40: 'QUADRAGÉSIMO', 50: 'QUINQUAGÉSIMO', 60: 'SEXAGÉSIMO', 70: 'SEPTUAGÉSIMO', 80: 'OCTOGÉSIMO', 90: 'NONAGÉSIMO', 100: 'CENTÉSIMO' };
        const unidades = { 1:'PRIMEIRO',2:'SEGUNDO',3:'TERCEIRO',4:'QUARTO',5:'QUINTO',6:'SEXTO',7:'SÉTIMO',8:'OITAVO',9:'NONO' };
        const d = Math.floor(n/10)*10; const u = n%10;
        if (dezenas[d] && u===0) return dezenas[d];
        if (dezenas[d] && unidades[u]) return dezenas[d] + ' ' + unidades[u];
        return String(n);
      } catch { return String(n); }
    };
    const printQuestionOnce = (q) => {
      try {
        let k = String(q || '').toUpperCase();
        if (!k) return false;
        if (k === 'QUAL O OUTRO EQUIPAMENTO DA ETECC QUE FICOU NO LOCAL:' || k === 'QUAL O OUTRO EQUIPAMENTO DA ETECC QUE FICOU NO LOCAL') {
          k = 'MAC DOS EQUIPAMENTOS QUE JÁ ESTAVAM NO LOCAL:';
        }
        if (__printedQ.has(k)) return false;
        __printedQ.add(k);
        secOut.push(k);
        return true;
      } catch { return false; }
    };
    blocks.forEach((block) => {
      if (!isVisible(block)) return;
      // WAN: Verificações de cabos de rede (lista dinâmica de itens)
      try {
        const wanList = block.querySelector('[data-wan-list="1"]');
        if (wanList){
          const items = Array.from(wanList.querySelectorAll('[data-wan-item="1"]'));
          if (items.length){
            // Cabeçalho do grupo (sem formatação de título com --)
            try {
              const qlbl = (block.querySelector('.form-label')?.textContent || 'Verificações de cabos de rede').trim();
              const q = cleanQ(qlbl).toUpperCase();
              const k = q || 'VERIFICAÇÕES DE CABOS DE REDE';
              if (!__printedQ.has(k)) { __printedQ.add(k); secOut.push(k); }
            } catch {}
            items.forEach((it, itemIdx) => {
              try {
                const idx = String(it.getAttribute('data-idx')||'').trim() || '?';
                // Aparelho ligado
                let ativo = '';
                try {
                  const deviceInput = it.querySelector('[data-wan-field="device"]');
                  if (idx === '1'){
                    const rOnu = it.querySelector('#wan_ativo_tipo_1_onu');
                    const rOut = it.querySelector('#wan_ativo_tipo_1_outro');
                    if (rOnu && rOnu.checked) ativo = 'Cabo da ONU pro Roteador';
                    else if (rOut && rOut.checked) ativo = (deviceInput?.value || '').trim();
                    else ativo = (deviceInput?.value || '').trim();
                  } else {
                    ativo = (deviceInput?.value || '').trim();
                  }
                } catch {}
                secOut.push(`CABO ${idx}: ${ativo ? ativo : 'O técnico não preencheu este campo.'}`);
                // Verificações marcadas
                const checks = [
                  { selector: '[data-wan-field="gigabit"]', label: 'Cabo de rede Gigabit' },
                  { selector: '[data-wan-field="powermitter"]', label: 'Teste no Powermitter' },
                  { selector: '[data-wan-field="ping"]', label: 'Teste de Ping no Cabo' }
                ];
                let any = false;
                checks.forEach(c => {
                  try {
                    const el = it.querySelector(c.selector);
                    if (el && el.checked) { secOut.push(`- ${c.label}`); any = true; }
                  } catch {}
                });
                if (!any) { secOut.push('O técnico não preencheu este campo.'); }
                // Observação adicional
                try {
                  const obsEl = it.querySelector('[data-wan-field="obs"]');
                  const obs = (obsEl?.value || '').trim();
                  if (obs) secOut.push(`- OBSERVAÇÃO: ${obs}`);
                } catch {}
                if (itemIdx < items.length - 1) secOut.push('');
              } catch {}
            });
            __lentStructuredPrinted = true;
            secOut.push('');
          }
        }
      } catch {}
      // Caso especial: grupo de checkboxes (choices)
      try {
        const choices = block.querySelector('.choices');
        if (choices){
          const isNestedConfRot = !!(block.closest('[data-conf-rot="1"]') && !block.matches('[data-conf-rot="1"]'));
          if (isNestedConfRot) return;
          // Evitar duplicidade: se este .choices pertence a um sub-bloco interno, não processe aqui
          try { const ownerBlk = choices.closest && choices.closest('.form-block'); if (ownerBlk && ownerBlk !== block) { return; } } catch {}
          const belongsToWanEntry = !!(choices.closest && choices.closest('[data-wan-item="1"]'));
          if (!belongsToWanEntry){
            const cbs = Array.from(choices.querySelectorAll('input[type="checkbox"]'));
            const anyChecked = cbs.some(cb => cb && cb.checked);
            if (!anyChecked){
              const qlbl = (block.querySelector('.form-label')?.textContent || '').trim();
              const q = cleanQ(qlbl).toUpperCase();
              if (q) printQuestionOnce(q);
              secOut.push('O técnico não preencheu este campo.');
              secOut.push('');
              return;
            }
            // Quando houver itens marcados, listar cada item marcado em sequência
            try {
              const isEquipChoices = cbs.some(cb => {
                const meta = ((cb.name||cb.id||'')+'').toLowerCase();
                return meta.startsWith('tq_') || meta.startsWith('eq_sel_') || meta.startsWith('ins_sel_') || meta.startsWith('ret_') || meta.startsWith('ficou_') || meta.startsWith('estao_');
              });
              if (!isEquipChoices){
                const qlbl = (block.querySelector('.form-label')?.textContent || '').trim();
                const q = cleanQ(qlbl).toUpperCase();
                if (q) printQuestionOnce(q);
                const selected = cbs.filter(cb => cb && cb.checked);
                selected.forEach(cb => {
                  let text = '';
                  try {
                    const lab = cb.closest('label');
                    text = (lab?.querySelector('span')?.textContent || lab?.textContent || '').trim();
                  } catch {}
                  if (text) secOut.push(`- ${text}`);
                });
                secOut.push('');
                return;
              }
            } catch {}
          }
        }
      } catch {}
      // Testes de Velocidade: suporte a múltiplos itens no mesmo bloco
      try {
        const velList = block.querySelector('[data-veltest-list="1"]');
        if (velList){
          const items = Array.from(velList.querySelectorAll('[data-veltest-item="1"]'));
          if (items.length){
            items.forEach((it) => {
              __velTestIndex++;
              const dEl = it.querySelector('.vel-down') || it.querySelector('#vel_down');
              const uEl = it.querySelector('.vel-up') || it.querySelector('#vel_up');
              const pEl = it.querySelector('.vel-ping') || it.querySelector('#vel_ping');
              const dVal = (dEl?.value || '').trim();
              const uVal = (uEl?.value || '').trim();
              const pVal = (pEl?.value || '').trim();
              secOut.push('RESULTADO DO ' + (typeof ordinalExtenso==='function' ? ordinalExtenso(__velTestIndex) : ordinalPt(__velTestIndex)) + ' TESTE:');
              secOut.push(`- DOWNLOAD: ${dVal ? dVal + 'MB' : 'O técnico não preencheu este campo.'}`);
              secOut.push(`- UPLOAD: ${uVal ? uVal + 'MB' : 'O técnico não preencheu este campo.'}`);
              secOut.push(`- PING: ${pVal ? pVal + 'MS' : 'O técnico não preencheu este campo.'}`);
              // Dispositivo
              let devVal = '';
              try { const dev = it.querySelector('.vel-device') || it.querySelector('#vel_device_1'); devVal = (dev?.value || '').trim(); } catch {}
              secOut.push(`- DISPOSITIVO: ${devVal ? devVal : 'O técnico não preencheu este campo.'}`);
              // VIA (cabo/wi-fi) por entrada
              let viaVal = '';
              try { const viaSel = it.querySelector('input[name^="vel_via_"]:checked'); viaVal = (viaSel?.value || '').trim(); } catch {}
              secOut.push(`- VIA: ${viaVal ? (viaVal === 'cabo' ? 'Cabo de rede' : 'Wi-Fi') : 'O técnico não preencheu este campo.'}`);
              secOut.push('');
            });
            // não retornar aqui; permite processar outros sub-blocos (ex.: TRACERTS) no mesmo bloco
          }
        }
      } catch {}

      // Pings (Testes relacionados a lentidão): múltiplos itens
      try {
        const pingList = block.querySelector('[data-lent-ping-list="1"]');
        // Processa apenas no bloco proprietário do pingList (evita duplicar em ancestrais)
        if (pingList && pingList.closest('.form-block') === block){
          const items = Array.from(pingList.querySelectorAll('[data-ping-item]'));
          if (items.length){
            // Subtítulo simples dentro de Conferências Técnicas (sem --)
            secOut.push('PINGS');
            items.forEach((it) => {
              try {
                const idx = String(it.getAttribute('data-idx')||'').trim() || '?';
                const get = (name) => (it.querySelector(`[name="${name}_${idx}"]`)?.value || '').trim();
                const titulo = get('ping_titulo');
                const minima = get('ping_minima');
                const media = get('ping_media');
                const maxima = get('ping_maxima');
                const enviados = get('ping_enviados');
                const recebidos = get('ping_recebidos');
                const perdidos = get('ping_perdidos');
                secOut.push(`- Ping ${idx}: ${titulo ? titulo : 'O técnico não preencheu este campo.'}`);
                secOut.push(`  - MÍNIMA: ${minima ? minima : 'O técnico não preencheu este campo.'}`);
                secOut.push(`  - MÉDIA: ${media ? media : 'O técnico não preencheu este campo.'}`);
                secOut.push(`  - MÁXIMA: ${maxima ? maxima : 'O técnico não preencheu este campo.'}`);
                secOut.push(`  - ENVIADOS: ${enviados ? enviados : 'O técnico não preencheu este campo.'}`);
                secOut.push(`  - RECEBIDOS: ${recebidos ? recebidos : 'O técnico não preencheu este campo.'}`);
                secOut.push(`  - PERDIDOS: ${perdidos ? perdidos : 'O técnico não preencheu este campo.'}`);
                secOut.push('');
              } catch {}
            });
            // não retornar; permite processar TRACERTS no mesmo bloco
            __lentStructuredPrinted = true;
          }
        }
      } catch {}

      // Conferências nos roteadores: copiar seleções
      try {
        if (block.matches('[data-conf-rot="1"]')){
          const rawHeader = (block.querySelector('.form-label')?.textContent || 'Conferências nos roteadores').trim();
          const header = cleanQ(rawHeader).toUpperCase() || 'CONFERÊNCIAS NOS ROTEADORES';
          if (!__printedQ.has(header)) { __printedQ.add(header); secOut.push(header); }

          const lines = [];
          const pushLine = (label, value) => {
            const text = (value != null && String(value).trim() !== '') ? String(value).trim() : 'O técnico não preencheu este campo.';
            lines.push(`${label}: ${text}`);
          };
          const confState = copyState || {};
          const getBool = (key, domSel) => {
            if (Object.prototype.hasOwnProperty.call(confState, key)) return !!confState[key];
            try { const el = domSel ? block.querySelector(domSel) : null; return !!(el && el.checked); } catch { return false; }
          };
          const getVal = (key, domSel) => {
            if (Object.prototype.hasOwnProperty.call(confState, key)) return confState[key];
            try { const el = domSel ? block.querySelector(domSel) : null; return (el && 'value' in el) ? el.value : ''; } catch { return ''; }
          };

          try {
            const valOutro = String(getVal('dns_outro_val', '#dns_outro_val') || '').trim();
            const dnsActive = getBool('conf_dns', '#conf_dns') || getBool('dns_etecc', '#dns_etecc') || getBool('dns_google', '#dns_google') || getBool('dns_outro', '#dns_outro') || !!valOutro;
            if (dnsActive){
              const opts = [];
              if (getBool('dns_etecc', '#dns_etecc')) opts.push('Etecc');
              if (getBool('dns_google', '#dns_google')) opts.push('Google');
              if (getBool('dns_outro', '#dns_outro') || valOutro) opts.push(valOutro || 'Outro');
              pushLine('DNS configurado', opts.join(' / '));
            }
          } catch {}

          try {
            const lbActive = getBool('lb24_parent', '#lb24_parent') || getBool('lb24_20', '#lb24_20') || getBool('lb24_40', '#lb24_40') || getBool('lb24_20_40', '#lb24_20_40');
            if (lbActive){
              const parts = [];
              if (getBool('lb24_20', '#lb24_20')) parts.push('20MHz');
              if (getBool('lb24_40', '#lb24_40')) parts.push('40MHz');
              if (getBool('lb24_20_40', '#lb24_20_40')) parts.push('20/40MHz');
              pushLine('Largura de banda da rede 2.4', parts.join(' / '));
            }
          } catch {}

          try { if (getBool('upnp_ok', '#upnp_ok')) lines.push('UPnP: Verifiquei/Habilitei'); } catch {}
          try { if (getBool('ipv6_slaac', '#ipv6_slaac')) lines.push('IPv6: Ativado no protocolo SLAAC'); } catch {}
          try {
            const remotoChecked = getBool('acesso_remoto', '#acesso_remoto');
            if (remotoChecked) {
              const lab = block.querySelector('label[for="acesso_remoto"] span');
              const text = (lab?.textContent || 'Acesso remoto: ajustado').trim();
              lines.push(text);
            }
          } catch {}

          // Campos adicionais simples (quando ativados)
          try {
            const qtdSim = (() => {
              if (Object.prototype.hasOwnProperty.call(confState, 'qtd_acima')) return String(confState['qtd_acima']||'').toLowerCase() === 'sim';
              try { return (block.querySelector('input[name="qtd_acima"]:checked')?.value || '') === 'sim'; } catch { return false; }
            })();
            if (qtdSim) {
              const qtdVal = getVal('qtd_acima_val', '#qtd_acima_val') || '';
              pushLine('Quantidade de ativos acima do normal', qtdVal);
            }
          } catch {}
          try {
            const tSim = (() => {
              if (Object.prototype.hasOwnProperty.call(confState, 'tempo_acima')) return String(confState['tempo_acima']||'').toLowerCase() === 'sim';
              try { return (block.querySelector('input[name="tempo_acima"]:checked')?.value || '') === 'sim'; } catch { return false; }
            })();
            if (tSim) {
              const tVal = getVal('tempo_acima_val', '#tempo_acima_val') || '';
              pushLine('Tempo de atividade acima do normal', tVal);
            }
          } catch {}
          if (!lines.length) { lines.push('O técnico não preencheu este campo.'); }

          lines.forEach(line => {
            secOut.push(line.startsWith('- ') ? line : `- ${line}`);
          });
          secOut.push('');
          return;
        }
      } catch {}

      // Tracerts (Testes relacionados a lentidão): múltiplos itens
      try {
        const tracList = block.querySelector('[data-lent-tracert-list="1"]');
        if (tracList){
          const items = Array.from(tracList.querySelectorAll('[data-tracert-item]'));
          if (items.length){
            secOut.push('TRACERTS');
            items.forEach((it) => {
              try {
                const idx = String(it.getAttribute('data-idx')||'').trim() || '?';
                const get = (name) => (it.querySelector(`[name="${name}_${idx}"]`)?.value || '').trim();
                const local = get('tracert_local');
                const url = get('tracert_url');
                secOut.push(`- Tracert ${idx}:`);
                secOut.push(`  - LOCAL: ${local ? local : 'O técnico não preencheu este campo.'}`);
                secOut.push(`  - URL: ${url ? url : 'O técnico não preencheu este campo.'}`);
                secOut.push('');
              } catch {}
            });
            // não retornar; continuar fluxo normal
            __lentStructuredPrinted = true;
          }
        }
      } catch {}
      // Se PINGS/TRACERTS já foram impressos neste bloco, evitar impressão genérica duplicada
      try {
        if (__lentStructuredPrinted) {
          const hasVel = !!(block.querySelector('.vel-down') || block.querySelector('#vel_down') || block.querySelector('.vel-up') || block.querySelector('#vel_up') || block.querySelector('.vel-ping') || block.querySelector('#vel_ping'));
          if (!hasVel) { return; }
        }
      } catch {}
      const d = block.querySelector('.vel-down') || block.querySelector('#vel_down');
      const u = block.querySelector('.vel-up') || block.querySelector('#vel_up');
      const p = block.querySelector('.vel-ping') || block.querySelector('#vel_ping');
      if (d || u || p){
        __velTestIndex++;
        const dVal = (d?.value || '').trim();
        const uVal = (u?.value || '').trim();
        const pVal = (p?.value || '').trim();
        secOut.push('RESULTADO DO ' + (typeof ordinalExtenso==='function' ? ordinalExtenso(__velTestIndex) : ordinalPt(__velTestIndex)) + ' TESTE:');
        secOut.push(`- DOWNLOAD: ${dVal ? dVal + 'MB' : 'O técnico não preencheu este campo.'}`);
        secOut.push(`- UPLOAD: ${uVal ? uVal + 'MB' : 'O técnico não preencheu este campo.'}`);
        secOut.push(`- PING: ${pVal ? pVal + 'MS' : 'O técnico não preencheu este campo.'}`);
        const dev = block.querySelector('.vel-device');
        const devVal = (dev?.value || '').trim();
        let viaVal = '';
        try { const viaSel = block.querySelector('input[name^="vel_via_"]:checked'); viaVal = (viaSel?.value || '').trim(); } catch {}
        secOut.push(`- DISPOSITIVO: ${devVal ? devVal : 'O técnico não preencheu este campo.'}`);
        secOut.push(`- VIA: ${viaVal ? (viaVal === 'cabo' ? 'Cabo de rede' : 'Wi-Fi') : 'O técnico não preencheu este campo.'}`);
        secOut.push('');
        return;
      }
      const seg = block.querySelector('.segmented');
      if (seg){
        // Evitar duplicidade: se este .segmented pertence a um sub-bloco interno, não processe aqui
        try { const ownerBlk = seg.closest && seg.closest('.form-block'); if (ownerBlk && ownerBlk !== block) { return; } } catch {}
        const bLabel = (block.querySelector('.form-label')?.textContent || '').trim();
        const idxB = blocks.indexOf(block);
        const combineWithMac = /retirado|ficou|inserido|deixado/i.test(bLabel) && blocks.slice(idxB+1).some(b => isVisible(b) && b.querySelector('.mac-list'));
        // Regra solicitada: se a pergunta for sobre INSERIDO e a resposta for SIM, não imprimir a pergunta
        try {
          const isInsQ = /(ficou|inserido)/i.test(bLabel);
          if (isInsQ) {
            const sel = getRadioGroupValue(block);
            const vLower = String(sel||'').toLowerCase();
            if (vLower === 'sim') { return; }
          }
        } catch {}
        // Regra solicitada: se a pergunta for sobre RETIRADO e a resposta for SIM, não imprimir a pergunta
        try {
          const isRetQ = /retirado/i.test(bLabel);
          if (isRetQ) {
            const sel = getRadioGroupValue(block);
            const vLower = String(sel||'').toLowerCase();
            if (vLower === 'sim') { return; }
          }
        } catch {}
        if (combineWithMac) {
          // Tratamento especial: pergunta "Foi inserido/deixado ...?"
          const isInseridoLocal = /(inserido|deixado)/i.test(bLabel);
          if (isInseridoLocal) {
            const sel = getRadioGroupValue(block);
            const vLower = String(sel||'').toLowerCase();
            if (vLower === 'sim') {
              // Não imprime a pergunta; os MACs (se houver) serão impressos pelas listas
              return;
            }
            if (vLower === 'nao' || vLower === 'não'){
              // Imprime a pergunta e a resposta "Não" e não imprime MACs
              const qText = cleanQ(bLabel).toUpperCase();
              printQuestionOnce(qText);
              const aText = toSentence(sel);
              if (aText) secOut.push(aText);
              secOut.push('');
              return;
            }
            // Sem resposta: para formulários visíveis, anexar mensagem automática (suporte-moto)
            try {
              const fid = (container && container.__formId) || '';
              if (fid === 'suporte-moto'){
                const qText = cleanQ(bLabel).toUpperCase();
                printQuestionOnce(qText);
                secOut.push('O técnico não preencheu este campo.');
                secOut.push('');
              }
            } catch {}
            return;
          }
          // Novo: quando a pergunta é de RETIRADO e a resposta é NÃO, precisamos imprimir a pergunta/resposta
          try {
            const isRetQ = /retirado/i.test(bLabel);
            if (isRetQ) {
              const sel = getRadioGroupValue(block);
              const vLower = String(sel||'').toLowerCase();
              if (vLower === 'nao' || vLower === 'não'){
                const qText = cleanQ(bLabel).toUpperCase();
                printQuestionOnce(qText);
                const aText = toSentence(sel);
                if (aText) secOut.push(aText);
                secOut.push('');
                return;
              }
              // Sem resposta: para suporte-moto, garantir mensagem automática
              try {
                const fid = (container && container.__formId) || '';
                if (!vLower && fid === 'suporte-moto'){
                  const qText = cleanQ(bLabel).toUpperCase();
                  printQuestionOnce(qText);
                  secOut.push('O técnico não preencheu este campo.');
                  secOut.push('');
                }
              } catch {}
              return;
            }
          } catch {}
          return;
        }
        let val = getRadioGroupValue(block);
        if (!val) val = 'O técnico não preencheu este campo.';
        // Suporte Moto: refinar cópia do gate 'tq_fic_ha_outros'
        try {
          const formIdCur = (container && container.__formId) || '';
          if (formIdCur === 'suporte-moto'){
            const firstRadio = seg.querySelector('input[type="radio"]');
            const groupName = (firstRadio && firstRadio.name) || '';
            const vLower = String(val||'').toLowerCase();
            if (groupName === 'veltest_prints') {
              const feito = (vLower === 'sim' || vLower === 'nao') ? 'Sim' : (vLower === 'nao-realizado' ? 'Não' : 'O técnico não preencheu este campo.');
              printQuestionOnce('TESTE DE VELOCIDADE FEITO:');
              let __feito = feito;
              try {
                if (/^n.?o$/i.test(vLower)) __feito = 'Sim';
                else if (/^sim$/i.test(vLower)) __feito = 'Sim';
                else if (/realizad/i.test(vLower)) __feito = 'Não';
              } catch {}
              if (__feito) secOut.push(__feito);
              try {
                if (vLower === 'nao-realizado') {
                  const j = container.querySelector('#vel_motivo_nao_realizar');
                  const jv = (j?.value || '').trim();
                  if (jv) secOut.push(jv);
                }
              } catch {}
              secOut.push('');
            }
            if (groupName === 'tq_fic_ha_outros'){
              if (vLower === 'sim') { return; }
              if (vLower === 'nao' || vLower === 'não'){
                const qShort = 'HÁ MAIS EQUIPAMENTOS DA ETECC NO LOCAL?';
                printQuestionOnce(qShort);
                const aShort = toSentence(val);
                if (aShort) secOut.push(aShort);
                secOut.push('');
                return;
              }
            }
          }
        } catch {}
        let q = bLabel ? bLabel.toUpperCase() : '';
        let isRetEquip = false; let isInsEquip = false; let valLower = String(val||'').toLowerCase();
        try {
          const radios = Array.from(block.querySelectorAll('input[type="radio"]'));
          const rn = (r) => ((r && (r.name||r.id||'')) || '').toLowerCase();
          isRetEquip = radios.some(r => rn(r).includes('ret_equip'));
          isInsEquip = radios.some(r => rn(r).includes('ficou_equip'));
          if (isRetEquip && valLower === 'sim') {
            // Verifica se existem MACs informados nos blocos subsequentes
            let hasNonOutroMacs = false;
            let hasOutroMacs = false;
            try {
              for (let j = idxB + 1; j < blocks.length; j++) {
                const nb = blocks[j];
                if (!isVisible(nb)) continue;
                const list = nb.querySelector && nb.querySelector('.mac-list');
                if (list){
                  const prefix = (list.getAttribute('data-mac-prefix')||'').toLowerCase();
                  const macs = collectMacRows(list);
          if (macs && macs.length) {
            if (prefix.startsWith('outro_mac_') || prefix.startsWith('estao_outro_mac_')) {
              hasOutroMacs = true;
            } else if (prefix.startsWith('ont_mac_') || prefix.startsWith('onu_mac_') || prefix.startsWith('rot_mac_') || prefix.startsWith('estao_ont_mac_') || prefix.startsWith('estao_onu_mac_') || prefix.startsWith('estao_rot_mac_')) {
              hasNonOutroMacs = true;
            }
          }
                }
                const outro = nb.querySelector && nb.querySelector('.outro-list');
                if (outro){
                  const rows = Array.from(outro.querySelectorAll('.outro-row'));
                  const pairs = rows.map(r => (r.querySelector('input[name^="outro_mac_"]')?.value||'').trim()).filter(Boolean);
                  if (pairs.length) hasOutroMacs = true;
                }
              }
            } catch {}
            if (hasNonOutroMacs) { q = 'MAC DOS EQUIPAMENTOS RETIRADOS:'; try { block.__onlyOutrosHeader = false; } catch {} }
            else if (hasOutroMacs) { q = 'MAC DOS EQUIPAMENTOS RETIRADOS:'; try { block.__onlyOutrosHeader = true; } catch {} }
          }
          if (isInsEquip && valLower === 'sim') {
            // Verifica se existem MACs informados nos blocos subsequentes (listas com prefixo ins_*)
            let hasInsMacs = false;
            try {
              for (let j = idxB + 1; j < blocks.length; j++) {
                const nb = blocks[j];
                if (!isVisible(nb)) continue;
                const list = nb.querySelector && nb.querySelector('.mac-list');
                if (!list) continue;
                const prefix = (list.getAttribute('data-mac-prefix')||'').toLowerCase();
                if (!prefix.startsWith('ins_')) continue;
                const macs = collectMacRows(list);
                if (macs && macs.length) { hasInsMacs = true; break; }
              }
            } catch {}
            if (hasInsMacs) { q = 'MAC DOS EQUIPAMENTOS DEIXADOS NO LOCAL:'; }
          }
        } catch {}
        const ta = block.querySelector('textarea');
        if (!((ta?.value || '').trim()) && ta?.id === 'descricao_os') {
          val = 'O técnico não preencheu este campo.';
        }
        // Espaçamento fino: se for o bloco "Foi INSERIDO algum equipamento?" e valor = Não,
        // garante uma linha em branco antes para não grudar nos MACs anteriores
        try {
          if (isInsEquip && (valLower === 'nao' || valLower === 'não')){
            const last = secOut[secOut.length-1] || '';
            if (last && last !== '') secOut.push('');
          }
        } catch {}
        let a = toSentence(val);
        if ((isRetEquip || isInsEquip) && valLower === 'sim') {
          // Se mudamos o cabeçalho para MACs por haver MACs informados, não repetir a resposta 'Sim'
          if (q === 'MAC DOS EQUIPAMENTOS RETIRADOS:' || q === 'OUTROS EQUIPAMENTOS RETIRADOS:' || q === 'MAC DOS EQUIPAMENTOS DEIXADOS NO LOCAL:') a = '';
        }
        let suppressGap = false; try { suppressGap = !!block.__onlyOutrosHeader && q === 'MAC DOS EQUIPAMENTOS RETIRADOS:'; } catch {}
        if (q) { printQuestionOnce(q); if (a) secOut.push(a); if (!suppressGap) secOut.push(''); } else { if (a) { secOut.push(a); secOut.push(''); } }
        return;
      }
      // Bloco especial: lista de OUTRO EQUIPAMENTO (nome + mac por linha)
      const outroList = block.querySelector('.outro-list');
      if (outroList){
        const rows = Array.from(outroList.querySelectorAll('.outro-row'));
        const namePref = outroList.getAttribute('data-outro-name-prefix') || 'outro_nome_';
        const macPref = outroList.getAttribute('data-outro-mac-prefix') || 'outro_mac_';
        const pairs = rows.map(r => {
          const nome = (r.querySelector('input[name^="'+namePref+'"]')?.value || '').trim();
          const mac = (r.querySelector('input[name^="'+macPref+'"]')?.value || '').trim();
          return { nome, mac };
        }).filter(p => p.mac);
        // Verifica se existem MACs de ONT/ONU/Roteador preenchidos
        let hasNonOutroMacs2 = false;
        try {
          for (let j = 0; j < blocks.length; j++){
            const b = blocks[j]; if (b === block) continue; if (!isVisible(b)) continue;
            const list = b.querySelector && b.querySelector('.mac-list');
            if (!list) continue;
            const pref = (list.getAttribute('data-mac-prefix')||'').toLowerCase();
            const isEquipList = pref.startsWith('ont_mac_') || pref.startsWith('onu_mac_') || pref.startsWith('rot_mac_')
              || pref.startsWith('estao_ont_mac_') || pref.startsWith('estao_onu_mac_') || pref.startsWith('estao_rot_mac_')
              || pref.startsWith('ficou_ont_mac_') || pref.startsWith('ficou_onu_mac_') || pref.startsWith('ficou_rot_mac_')
              || pref.startsWith('ret_ont_mac_') || pref.startsWith('ret_onu_mac_') || pref.startsWith('ret_rot_mac_')
              || pref.startsWith('ins_ont_mac_') || pref.startsWith('ins_onu_mac_') || pref.startsWith('ins_rot_mac_');
            if (!isEquipList) continue;
            const macs2 = collectMacRows(list);
            if (macs2 && macs2.length) { hasNonOutroMacs2 = true; break; }
          }
        } catch {}
        // Detecta a pergunta do grupo de checkboxes imediatamente anterior (quando houver)
        let prevChoicesQ = null;
        try {
          const __idxB = blocks.indexOf(block);
          for (let __i = __idxB - 1; __i >= 0; __i--) {
            const __pb = blocks[__i]; if (!isVisible(__pb)) continue;
            if (__pb.querySelector('.choices')) { const __ql = (__pb.querySelector('.form-label')?.textContent || '').trim(); if (__ql) { prevChoicesQ = cleanQ(__ql).toUpperCase(); break; } }
          }
        } catch (e) {}
        const outroHeader = prevChoicesQ || (function(){
          try {
            const idxB = blocks.indexOf(block);
            for (let i = idxB - 1; i >= 0; i--) {
              const pb = blocks[i];
              if (!isVisible(pb)) continue;
              if (pb.querySelector('.choices')) {
                const ql = (pb.querySelector('.form-label')?.textContent || '').trim();
                if (ql) return cleanQ(ql).toUpperCase();
              }
            }
          } catch (e) {}
          return hasNonOutroMacs2 ? 'OUTROS EQUIPAMENTOS RETIRADOS:' : 'MAC DOS EQUIPAMENTOS RETIRADOS:';
        })();
        const __skipHeader = !!(prevChoicesQ) && !!(hasNonOutroMacs2);
        if (__skipHeader) {
          try { while (secOut.length && secOut[secOut.length-1] === '') secOut.pop(); } catch {}
        } else {
          printQuestionOnce(outroHeader);
        }
        if (!pairs.length){
          secOut.push('O técnico não preencheu este campo.');
        } else {
          pairs.forEach(p => { secOut.push(`- ${(p.nome||'OUTRO EQUIPAMENTO').toUpperCase()} (MAC): ${p.mac}`); });
        }
        // Quebra somente entre campos: se não houver outro bloco (MAC/outro) do mesmo campo a seguir, adiciona linha em branco
        try { const idxB = blocks.indexOf(block); const campo = __getCampoFromPrevSelector(idxB); if (!__hasNextSameCampoMacOrOutro(idxB, campo)) secOut.push(''); } catch {}
        // Ajuste: detalhar OUTROS quando vazio
        try {
          if (!pairs.length) {
            // remove possível quebra adicionada e a mensagem genérica anterior
            while (secOut.length && secOut[secOut.length-1] === '') secOut.pop();
            if (secOut.length) secOut.pop();
            secOut.push('- OUTROS: MAC não preenchido pelo técnico.');
            // reaplica separação apenas se for o último bloco do campo
            const idxB2 = blocks.indexOf(block);
            const campo2 = __getCampoFromPrevSelector(idxB2);
            if (!__hasNextSameCampoMacOrOutro(idxB2, campo2)) secOut.push('');
          }
        } catch {}
        return;
      }
      const macList = block.querySelector('.mac-list');
      if (macList){
        const bLabel = cleanQ((block.querySelector('.form-label')?.textContent || '').trim());
        const macs = collectMacRows(macList);
        const isPhoneList = /telefone/i.test(bLabel) || /^fone_/i.test((macList.getAttribute('data-mac-prefix')||'')) || Array.from(macList.querySelectorAll('input')).some(i => ((i.name||i.id||'').toLowerCase().startsWith('fone_')));
        const all = blocks; const idxB = all.indexOf(block);
        let prevSel = null;
        for (let i = idxB - 1; i >= 0; i--) {
          const pb = all[i]; if (!isVisible(pb)) continue;
          const qlbl = (pb.querySelector('.form-label')?.textContent || '').trim();
          const hasSegmented = !!pb.querySelector('.segmented');
          const hasChoices = !!pb.querySelector('.choices');
          if (!hasSegmented && !hasChoices) continue;
          const sval = hasSegmented ? getRadioGroupValue(pb) : '';
          if ((hasSegmented && sval && /retirado|ficou|inserido|deixado/i.test(qlbl)) || hasChoices) { prevSel = { q: qlbl, sel: sval, isChoices: hasChoices }; break; }
        }
        if (prevSel) {
          try {
            const normQ = cleanQ(prevSel.q || '').toUpperCase();
            if (normQ === 'QUAL O OUTRO EQUIPAMENTO DA ETECC QUE FICOU NO LOCAL') {
              prevSel.q = 'MAC DOS EQUIPAMENTOS QUE JÁ ESTAVAM NO LOCAL:';
            }
          } catch {}
        }
        // Se o bloco de "ret_equip" anterior estiver marcado como SIM e existem MACs informados,
        // ajusta o cabeçalho para "MAC DOS EQUIPAMENTOS RETIRADOS:"
        try {
          let prevRetEquip = null;
          for (let i = idxB - 1; i >= 0; i--) {
            const pb = all[i]; if (!isVisible(pb)) continue;
            const radios = pb.querySelectorAll && pb.querySelectorAll('input[type="radio"]');
            if (!radios || !radios.length) continue;
            const hasRet = Array.from(radios).some(r => (r.name||'') === 'ret_equip');
            if (hasRet) { prevRetEquip = pb; break; }
          }
          if (prevRetEquip) {
            const sel = getRadioGroupValue(prevRetEquip);
            if (String(sel||'').toLowerCase() === 'sim' && macs && macs.length) {
              prevSel = prevSel || { q: 'MAC DOS EQUIPAMENTOS RETIRADOS:', sel: sel };
              prevSel.q = 'MAC DOS EQUIPAMENTOS RETIRADOS:';
            }
          }
        } catch {}
        // Ajuste: cabeçalho específico para listas "deixadas no local"
        try {
          const prefCur = String(macList.getAttribute('data-mac-prefix')||'').toLowerCase();
          if (prefCur.startsWith('ficou_') || prefCur.startsWith('estao_')){
            prevSel = prevSel || { q: 'MAC DOS OUTROS EQUIPAMENTOS NO LOCAL' };
            prevSel.q = 'MAC DOS OUTROS EQUIPAMENTOS NO LOCAL';
          }
        } catch {}
        const eqLabel = /ROTEADOR/i.test(bLabel) ? 'ROTEADOR' : (/\bONT\b/i.test(bLabel) ? 'ONT' : (/\bONU\b/i.test(bLabel) ? 'ONU' : (prevSel?.sel ? (String(prevSel.sel).toUpperCase().includes('ROTEADOR') ? 'ROTEADOR' : (String(prevSel.sel).toUpperCase().includes('ONT') ? 'ONT' : (String(prevSel.sel).toUpperCase().includes('ONU') ? 'ONU' : 'EQUIPAMENTO'))) : 'EQUIPAMENTO')));
        // Ajuste: cabeçalho específico para listas 'deixadas' no formulário da Equipe Carro
        try {
          const __pfx = String(macList.getAttribute('data-mac-prefix')||'').toLowerCase();
          const __fid = ((container && container.__formId) || (typeof formId!=='undefined' ? formId : ''));
          if ((__fid==='instalacoes-mudancas' || __fid==='ponto-adicional' || __fid==='suporte-tecnico-carro') && __pfx.startsWith('ins_')){
            prevSel = prevSel || { q: 'EQUIPAMENTOS INSERIDOS:' };
            prevSel.q = 'EQUIPAMENTOS INSERIDOS:';
          }
        } catch {}
        // Força cabeçalho padrão quando a pergunta anterior for de RETIRADO e houver MACs
        try {
          const prevQ = String(prevSel?.q || '').toUpperCase();
          if (prevQ && /RETIRADO/.test(prevQ)){
            const macsHere = collectMacRows(macList);
            if (macsHere && macsHere.length) { prevSel.q = 'MAC DOS EQUIPAMENTOS RETIRADOS:'; }
          }
        } catch {}
        // Garantia: antes de imprimir blocos de INSERIDO (ins_*), se a pergunta de RETIRADO anterior foi "Não",
        // imprime a pergunta de RETIRADO e sua resposta "Não" (caso ainda não tenha sido impressa)
        try {
          const prefCur2 = String(macList.getAttribute('data-mac-prefix')||'').toLowerCase();
          if (prefCur2.startsWith('ins_')){
            // busca bloco anterior com pergunta de RETIRADO
            const idxBL = blocks.indexOf(block);
            for (let k = idxBL - 1; k >= 0; k--){
              const pb = blocks[k]; if (!isVisible(pb)) continue;
              const seg2 = pb.querySelector && pb.querySelector('.segmented'); if (!seg2) continue;
              const qlbl2 = (pb.querySelector('.form-label')?.textContent || '').trim();
              if (!/retirado/i.test(qlbl2)) continue;
              const val2 = getRadioGroupValue(pb);
              const v2 = String(val2||'').toLowerCase();
              if (v2 === 'nao' || v2 === 'não'){
                const qUp = cleanQ(qlbl2).toUpperCase();
                const printed = printQuestionOnce(qUp);
                // imprime a resposta e quebra apenas se a pergunta foi inserida agora
                if (printed){ const a2 = toSentence(val2); if (a2) secOut.push(a2); secOut.push(''); }
              }
              break; // já tratou pergunta de retirado
            }
          }
        } catch {}
        const questionText = (prevSel?.q || bLabel || 'MAC').replace(/\(\s*mul[tíi]pla\s+escolha\s*\)/i,'').toUpperCase();
        printQuestionOnce(cleanQ(/SELECIONE\s+O\s+EQUIPAMENTO\s+RETIRADO\s+E\s+INSIRA\s+SEU\s+MAC/.test(String(questionText||'').toUpperCase()) ? 'MAC DOS EQUIPAMENTOS RETIRADOS:' : questionText));
        const __withinRetiradaGroup = !!(prevSel && prevSel.q && (String(prevSel.q).toUpperCase().indexOf('MAC DOS EQUIPAMENTOS RETIRADOS') !== -1 || prevSel.isChoices));
        if (!macs.length){
          secOut.push(isPhoneList ? 'O técnico não preencheu este campo.' : 'O técnico não preencheu este campo.');
          const __nextMacQ = (()=>{ try { for (let j=idxB+1;j<all.length;j++){ const b=all[j]; if (!isVisible(b)) continue; if (b.querySelector('.mac-list')) { let __qN=null; for (let k=j-1;k>=0;k--){ const pb=all[k]; if (!isVisible(pb)) continue; if (pb.querySelector('.segmented') || pb.querySelector('.choices')){ const ql=(pb.querySelector('.form-label')?.textContent||'').trim(); if (ql) { __qN=ql; break; } } } return __qN; } } } catch{} return null; })(); const __sameGroup = prevSel && __nextMacQ && String(__nextMacQ).trim().toUpperCase() === String(prevSel.q||'').trim().toUpperCase(); if (!__sameGroup && !__withinRetiradaGroup) secOut.push('');
          try { const campo = __getCampoFromPrevSelector(idxB); if (__hasNextSameCampoMacOrOutro(idxB, campo)) { while (secOut.length && secOut[secOut.length-1] === '') secOut.pop(); } } catch {}
          // Ajuste: detalhar item selecionado quando sem MAC
          try {
            // Remove possíveis quebras finais e a linha genérica anterior
            while (secOut.length && secOut[secOut.length-1] === '') secOut.pop();
            if (secOut.length) secOut.pop();
            // Reinsere mensagem detalhada do item
            if (isPhoneList) secOut.push('- TELEFONE: O técnico não preencheu este campo.');
            else secOut.push(`- ${eqLabel}: MAC não preenchido pelo técnico.`);
            // Reaplica separação entre campos, se for o último bloco do campo
            let __isLeftBehind = false; try { const __pfx2 = String(macList.getAttribute('data-mac-prefix')||'').toLowerCase(); const __fid = ((container && container.__formId) || (typeof formId!=='undefined' ? formId : '')); __isLeftBehind = __pfx2.startsWith('ficou_') || __pfx2.startsWith('estao_') || ((__fid==='instalacoes-mudancas' || __fid==='ponto-adicional' || __fid==='suporte-tecnico-carro') && __pfx2.startsWith('ins_')); } catch {}
            if (!__isLeftBehind) { if (!__sameGroup2 || !__hasNextMacBlock) secOut.push(''); }
          } catch {}
        } else {
          if (isPhoneList) {
            macs.forEach(m => { secOut.push(`- TELEFONE: ${m}`); });
          } else {
          // Remoção seletiva de linha em branco anterior ao imprimir MACs:
          // preserva a linha em branco quando o bloco anterior indicou "O técnico não preencheu este campo."
          if (__withinRetiradaGroup) {
            try {
              let __k = secOut.length - 1;
              while (__k >= 0 && secOut[__k] === '') __k--;
              const __prev = __k >= 0 ? String(secOut[__k] || '') : '';
              const __wasEmptyInfo = /PREENCHEU\s+ESTE\s+CAMPO/i.test(__prev);
              if (!__wasEmptyInfo) {
                while (secOut.length && secOut[secOut.length-1] === '') secOut.pop();
              }
            } catch {}
          }
            macs.forEach(m => { secOut.push(`- ${eqLabel} (MAC): ${m}`); });
          }
          const __nextMacQ2 = (()=>{ try { for (let j=idxB+1;j<all.length;j++){ const b=all[j]; if (!isVisible(b)) continue; if (b.querySelector('.mac-list')) { let __qN=null; for (let k=j-1;k>=0;k--){ const pb=all[k]; if (!isVisible(pb)) continue; if (pb.querySelector('.segmented') || pb.querySelector('.choices')){ const ql=(pb.querySelector('.form-label')?.textContent||'').trim(); if (ql) { __qN=ql; break; } } } return __qN; } } } catch{} return null; })(); const __sameGroup2 = prevSel && __nextMacQ2 && String(__nextMacQ2).trim().toUpperCase() === String(prevSel.q||'').trim().toUpperCase();
          // Se não houver outra lista de MAC ou "outro-list" adiante visível, garante quebra após os MACs
          let __hasNextMacBlock = false; try { for (let j=idxB+1;j<all.length;j++){ const b=all[j]; if (!isVisible(b)) continue; if (b.querySelector('.mac-list') || b.querySelector('.outro-list')) { __hasNextMacBlock = true; break; } } } catch {}
          let __isLeftBehind = false; try { const __pfx2 = String(macList.getAttribute('data-mac-prefix')||'').toLowerCase(); const __fid = ((container&&container.__formId)||''); __isLeftBehind = __pfx2.startsWith('ficou_') || __pfx2.startsWith('estao_') || ((__fid==='instalacoes-mudancas' || __fid==='ponto-adicional' || __fid==='suporte-tecnico-carro') && __pfx2.startsWith('ins_')); } catch {}
          if (!__isLeftBehind){
            if (!__sameGroup2 || !__hasNextMacBlock) secOut.push('');
          } else {
            // Mesmo para grupos "inseridos" (ins_/ficou_/estao_), garanta uma linha em branco
            // quando não houver próximo bloco de MAC/OUTRO visível, para separar da próxima seção (ex.: INDICAÇÕES)
            if (!__hasNextMacBlock) secOut.push('');
          }
          try { const campo = __getCampoFromPrevSelector(idxB); if (__hasNextSameCampoMacOrOutro(idxB, campo)) { while (secOut.length && secOut[secOut.length-1] === '') secOut.pop(); } } catch {}
        }
        return;
      }
      const ta = block.querySelector('textarea');
      if (ta){
        const bLabel = (block.querySelector('.form-label')?.textContent || '').trim();
        let val = (ta.value || '').trim();
        if (!val) val = (ta.id === 'descricao_os') ? 'O técnico não preencheu este campo.' : 'O técnico não preencheu este campo.';
        const q = bLabel ? bLabel.toUpperCase() : '';
        const a = toSentence(val);
        if (q) { secOut.push(q); secOut.push(a); secOut.push(''); } else { secOut.push(a); secOut.push(''); }
        return;
      }
      const inputs = Array.from(block.querySelectorAll('input[type="text"]'));
      inputs.forEach(inp => {
        let val = (inp.value || '').trim();
        if (inp.id === 'sinal_fibra' || inp.hasAttribute('data-sinal-fibra')) val = formatSinalFibraCopy(val);
        const lab = (block.querySelector(`label[for="${inp.id}"]`)?.textContent || block.querySelector('.form-label')?.textContent || '').trim();
        if (!val && isVisible(inp)) {
          if (inp.id === 'sinal_fibra' || inp.hasAttribute('data-sinal-fibra')) {
            val = (inp.getAttribute('data-los') === '1') ? 'Lost of signal (LOS)' : 'O técnico não preencheu este campo.';
          } else {
            val = 'O técnico não preencheu este campo.';
          }
        }
        const q = lab ? lab.toUpperCase() : '';
        if (!((inp.value || '').trim()) && isVisible(inp) && inp.id === 'clienteNome') {
          val = 'O técnico não preencheu este campo.';
        }
        const a = toSentence(val);
        if (q) { secOut.push(q); secOut.push(a); secOut.push(''); }
        else if (val) { secOut.push(a); secOut.push(''); }
      });
    });
    // Remoção específica: evitar linha em branco logo após o título de AJUDA INTERNA
    try {
      const titleUp = (sec.querySelector('.form-title')?.textContent || '').trim().toUpperCase();
      if (titleUp === 'AJUDA INTERNA') {
        while (secOut.length > 1 && typeof secOut[1] === 'string' && secOut[1].trim() === '') {
          secOut.splice(1, 1);
        }
      }
    } catch {}
    if (secOut.length){ parts.push(secOut.join('\n')); parts.push(''); }
  });
  // Se a seção específica não imprimiu as coordenadas, injeta no topo do texto copiado
  if (!__printedMapsLink && __mapsLink) {
    parts.unshift('');
    parts.unshift(__mapsLink);
    parts.unshift('LOCALIZAÇÃO OBTIDA AUTOMATICAMENTE:');
  }
  let text = '\n' + parts.join('\n');
  // Rebuilde de fallback da seção "CONFERÊNCIAS NOS ROTEADORES" (garante saída completa)
  try {
    const blk = container.querySelector('[data-conf-rot="1"]');
    if (blk) {
      const st = (typeof collectCurrentFormState === 'function') ? collectCurrentFormState(container) : {};
      const getB = (k, sel) => (Object.prototype.hasOwnProperty.call(st, k) ? !!st[k] : !!(sel && blk.querySelector(sel)?.checked));
      const getV = (k, sel) => (Object.prototype.hasOwnProperty.call(st, k) ? (st[k]||'') : ((sel && blk.querySelector(sel)?.value) || ''));
      const out = [];
      out.push('CONFERÊNCIAS NOS ROTEADORES');
      // DNS
      const outro = String(getV('dns_outro_val', '#dns_outro_val')||'').trim();
      const anyDns = getB('conf_dns', '#conf_dns') || getB('dns_etecc', '#dns_etecc') || getB('dns_google', '#dns_google') || getB('dns_outro', '#dns_outro') || !!outro;
      if (anyDns) {
        const opts = [];
        if (getB('dns_etecc', '#dns_etecc')) opts.push('Etecc');
        if (getB('dns_google', '#dns_google')) opts.push('Google');
        if (getB('dns_outro', '#dns_outro') || outro) opts.push(outro || 'Outro');
        out.push(`- DNS configurado: ${opts.length ? opts.join(' / ') : 'O técnico não preencheu este campo.'}`);
      }
      // Largura 2.4
      const anyLb = getB('lb24_parent', '#lb24_parent') || getB('lb24_20', '#lb24_20') || getB('lb24_40', '#lb24_40') || getB('lb24_20_40', '#lb24_20_40');
      if (anyLb) {
        const ps = [];
        if (getB('lb24_20', '#lb24_20')) ps.push('20MHz');
        if (getB('lb24_40', '#lb24_40')) ps.push('40MHz');
        if (getB('lb24_20_40', '#lb24_20_40')) ps.push('20/40MHz');
        out.push(`- Largura de banda da rede 2.4: ${ps.length ? ps.join(' / ') : 'O técnico não preencheu este campo.'}`);
      }
      // Demais
      if (getB('upnp_ok', '#upnp_ok')) out.push('- UPnP: Verifiquei/Habilitei');
      if (getB('ipv6_slaac', '#ipv6_slaac')) out.push('- IPv6: Ativado no protocolo SLAAC');
      if (getB('acesso_remoto', '#acesso_remoto')) {
        const lab = blk.querySelector('label[for="acesso_remoto"] span');
        out.push(`- ${(lab?.textContent || 'Acesso remoto: ajustado').trim()}`);
      }
      const qa = Object.prototype.hasOwnProperty.call(st, 'qtd_acima') ? String(st['qtd_acima']||'').toLowerCase() : ((blk.querySelector('input[name="qtd_acima"]:checked')?.value)||'').toLowerCase();
      if (qa === 'sim') out.push(`- Quantidade de ativos acima do normal: ${String(getV('qtd_acima_val', '#qtd_acima_val')||'').trim() || 'O técnico não preencheu este campo.'}`);
      const ta = Object.prototype.hasOwnProperty.call(st, 'tempo_acima') ? String(st['tempo_acima']||'').toLowerCase() : ((blk.querySelector('input[name="tempo_acima"]:checked')?.value)||'').toLowerCase();
      if (ta === 'sim') out.push(`- Tempo de atividade acima do normal: ${String(getV('tempo_acima_val', '#tempo_acima_val')||'').trim() || 'O técnico não preencheu este campo.'}`);
      out.push('');
      const confStr = out.join('\n');
      if (/^CONFER[ÊE]NCIAS NOS ROTEADORES/m.test(text)) {
        text = text.replace(/(^CONFER[^\n]*\n)([\s\S]*?)(?=\n\n|$)/m, confStr);
      } else {
        // injeta antes de PINGS/TRACERTS quando possível
        if (/^PINGS$/m.test(text)) text = text.replace(/^PINGS$/m, confStr + '\nPINGS');
        else if (/^TRACERTS$/m.test(text)) text = text.replace(/^TRACERTS$/m, confStr + '\nTRACERTS');
        else text += '\n' + confStr;
      }
    }
  } catch {}
  // Normaliza quebras em excesso
  text = text.replace(/\n{3,}/g,'\n\n');
  // Remover linha em branco logo abaixo do título "-- AJUDA INTERNA --"
  try { text = text.replace(/(-- AJUDA INTERNA --)\n\s*\n/g, '$1\n'); } catch {}
  // Remove dicas como (múltipla escolha) de qualquer linha
  try { text = text.replace(/\([^)]*escolh[^)]*\)/ig,''); } catch (e) {}
  // Evita linhas em branco entre linhas de MAC no formulário copiado
  try {
    text = text.replace(/(\n- .*?\(MAC\):[^\n]*?)\n+(?=- .*?\(MAC\):)/g, '$1\n');
  } catch {}
  // Reforço: remove linha em branco extra logo após um item de MAC, mesmo que o próximo item não case exatamente o padrão acima
  try {
    text = text.replace(/(\n- .*?\(MAC\):[^\n]*?)\n{2,}/g, '$1\n');
  } catch {}
  // Reforço 2: remove linha em branco entre quaisquer dois itens com traço "- " consecutivos
  try {
    text = text.replace(/(\n- [^\n]+)\n+(?=- )/g, '$1\n');
  } catch {}
  
  // Pós-processamento para formatações de MACs (aplica aos formulários com blocos de equipamentos)
  if (((container&&container.__formId)||'') === 'instalacoes-mudancas' || ((container&&container.__formId)||'') === 'ponto-adicional' || ((container&&container.__formId)||'') === 'suporte-tecnico-carro' || ((container&&container.__formId)||'') === 'suporte-moto') {
    text = postProcessInstalacoesMudancas(text);
  }
  // Garantir espaçamento após o último MAC da seção em "Instalações e Mudanças de Endereço"
  try {
    const __fid2 = ((container && container.__formId) || '');
    if (__fid2 === 'instalacoes-mudancas') {
      // Se uma linha de MAC for seguida imediatamente por uma linha que não começa com "- ",
      // insere uma linha em branco para separar visualmente da próxima seção.
      text = text.replace(/(- .*?\(MAC\):[^\n]*\n)(?![-\n])/g, '$1\n');
    }
    if (__fid2 === 'inviabilidade-tecnica') {
      // Se a última linha de MAC for seguida imediatamente por um cabeçalho (linhas que iniciam com "-- "),
      // insere uma linha em branco para evitar que a seção seguinte (ex.: "-- INDICAÇÕES --") fique colada.
      text = text.replace(/(- .*?\(MAC\):[^\n]*\n)(?=-- )/gm, '$1\n');
    }
  } catch {}
  // Normalização específica: substituir instrução de UI por cabeçalho canônico no texto copiado
  try {
    text = text.replace(/^\s*SELECIONE\s+O\s+EQUIPAMENTO\s+RETIRADO\s+E\s+INSIRA\s+SEU\s+MAC\s*:?\s*$/gmi, 'MAC DOS EQUIPAMENTOS RETIRADOS:');
  } catch {}
  // Garantia global: inserir linha em branco antes de "MAC DOS EQUIPAMENTOS RETIRADOS:" quando vier logo após uma linha de texto
  try {
    text = text.replace(/([^\n])\n(MAC DOS EQUIPAMENTOS RETIRADOS:)/g, '$1\n\n$2');
  } catch {}
  
  // Ajuste: garantir espaço em branco antes de "AS FONTES FORAM RETIRADAS?" em Retirada de Equipamentos
  try {
    const __fid = ((container && container.__formId) || '');
    if (__fid === 'retirada-equipamentos') {
      text = text.replace(/([^\n])\n(AS FONTES FORAM RETIRADAS\?)/g, '$1\n\n$2');
    }
  } catch {}

  // Ajuste: renomear bloco "Qual o outro equipamento da ETECC que ficou no local" no texto copiado
  try {
    text = text.replace(/^\s*QUAL O OUTRO EQUIPAMENTO DA ETECC QUE FICOU NO LOCAL:?/gmi, 'MAC DOS EQUIPAMENTOS QUE JÁ ESTAVAM NO LOCAL:');
  } catch {}

  // Headings spacing mask: ensure 2 blank lines (duas linhas vazias) acima de cada título "-- ... --"
  // (exceto o primeiro título), e 1 linha vazia abaixo de cada título, em todos os formulários copiados
  // (exceto comunicado de ausência)
  try {
    const __fid3 = ((container && container.__formId) || '');
    if (__fid3 !== 'comunicado-ausencia') {
      const headerRe = /^-- [^\n]+ --$/gm;
      const headers = text.match(headerRe) || [];
      if (headers.length) {
        const first = headers[0];
        const sentinel = '__HDR_FIRST__' + Math.random().toString(36).slice(2) + '__';
        // Preserve the first title to not add extra blank line above it
        text = text.replace(first, sentinel);
        // Garantir 2 linhas vazias acima (3 quebra de linhas) antes de cada título remanescente
        text = text.replace(/\n(?=-- [^\n]+ --)/g, '\n\n\n');
        // Restore first title
        text = text.replace(sentinel, first);
        // Ensure exactly one blank line below every title
        text = text.replace(/(^-- [^\n]+ --$)\n*/gm, '$1\n\n');
        // Guarda: comprimir 4+ quebras consecutivas para exatamente 3 antes dos títulos
        text = text.replace(/\n{4,}(?=^-- [^\n]+ --)/gm, '\n\n\n');
      }
    }
  } catch {}

  try { await navigator.clipboard.writeText(text); try { await window.__appModal?.showAlert('Texto copiado.', { title: 'Pronto' }); } catch {} }
  catch(e){
    
    try { const aux=document.createElement('textarea'); aux.value=text; document.body.appendChild(aux); aux.select(); document.execCommand('copy'); document.body.removeChild(aux); try { await window.__appModal?.showAlert('Texto copiado.', { title: 'Pronto' }); } catch {} }
    catch { try { await window.__appModal?.showAlert('Falha ao copiar. Selecione e copie manualmente.\\n\\n'+text, { title: 'Atenção' }); } catch {} }
  }
  // Salvar no histórico como finalizado
  try {
    const st = (typeof collectCurrentFormState === "function") ? collectCurrentFormState(container) : getFormState(formId);
    const equipe = localStorage.getItem('unificado.selectedTeam') || '';
    const cliente = st?.clienteNome || st?.cliente || '';
    if (typeof window.__addHistoryWithSnapshot === 'function') {
      const titulo = (typeof def !== 'undefined' && def && def.titulo) ? def.titulo : 'Formulário';
      window.__addHistoryWithSnapshot({ formId, equipe, cliente, formulario: titulo, data: Date.now(), isDraft:false }, st);
    }
  } catch {}
  });

  // Ajuste de rótulo para blocos de inserção de equipamentos
  try {
    const applyInseridosLabelGeneric = () => {
      try {
        const container = document.getElementById('formContainer') || document;
        [
          { name: 'ficou_equip', field: 'ficou_equip' },
          { name: 'cd_ficou_equip', field: 'cd_ficou_equip' },
        ].forEach(({ name, field }) => {
          const sel = container.querySelector('input[name="' + name + '"]:checked');
          const val = sel ? String(sel.value || '') : '';
          const blk = container.querySelector('.form-block[data-when-field="' + field + '"][data-when-equals="sim"]');
          const lab = blk ? blk.querySelector('.form-label') : null;
          if (lab) {
            if (val === 'sim') lab.textContent = 'EQUIPAMENTOS INSERIDOS:';
            else lab.textContent = 'FOI INSERIDO ALGUM EQUIPAMENTO DURANTE ESTE ATENDIMENTO?';
          }
        });
      } catch {}
    };
    document.addEventListener('change', (e) => {
      const t = e.target; if (!t) return;
      const nm = String(t.name || '');
      if (nm === 'ficou_equip' || nm === 'cd_ficou_equip') applyInseridosLabelGeneric();
    }, true);
    setTimeout(applyInseridosLabelGeneric, 0);
  } catch {}
    // Reordenar: garantir TESTES DE VELOCIDADE após EQUIPE EXTERNA
    try {
      const sections = Array.from(container.querySelectorAll('.form-section'));
      let ext = null, tst = null;
      sections.forEach(s => {
        const t = s.querySelector('.form-title');
        const txt = (t && t.textContent) || '';
        if (!ext && txt.indexOf('EQUIPE EXTERNA') !== -1) ext = s;
        if (!tst && txt.indexOf('TESTES DE VELOCIDADE') !== -1) tst = s;
      });
      if (ext && tst) {
        const before = (tst.compareDocumentPosition(ext) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
        if (before) container.insertBefore(tst, ext.nextSibling);
      }
    } catch {}
  };
    // Geolocalização: cria input oculto e captura localização atual
  function setupGeolocationCapture(container){
    try {
      if (!container) return;
      let geo = container.querySelector('#geo_coords');
      if (!geo) {
        geo = document.createElement('input');
        geo.type = 'text';
        geo.id = 'geo_coords';
        geo.name = 'geo_coords';
        geo.style.display = 'none';
        container.appendChild(geo);
      }
      if (navigator.geolocation && typeof navigator.geolocation.getCurrentPosition === 'function') {
        navigator.geolocation.getCurrentPosition(
          (pos)=>{
            try {
              const { latitude, longitude } = pos.coords || {};
              if (typeof latitude === 'number' && typeof longitude === 'number') {
                geo.value = latitude.toFixed(6) + ',' + longitude.toFixed(6);
              }
            } catch{}
          },
          ()=>{},
          { enableHighAccuracy:true, timeout:4000, maximumAge:60000 }
        );
      }
    } catch {}
  }

  // Acessibilidade e higiene de formulários: garante labels e ids únicos
  function fixFormA11y(container){
    try {
      if (!container) return;
      const used = new Map();
      const controls = Array.from(container.querySelectorAll('input, select, textarea'));
      controls.forEach((el) => {
        try {
          const t = (el.type || '').toLowerCase();
          if (t === 'hidden') return;
          // Radios/checkboxes normalmente já têm label associado (segmented/choices)
          if ((t === 'radio' || t === 'checkbox') && (el.closest('.segmented') || el.closest('.choices') || el.closest('.choice'))) {
            return;
          }
          let id = el.id || '';
          if (!id) {
            // gera id único previsível
            let i = 1;
            let base = 'fld_' + Math.random().toString(36).slice(2, 6);
            id = base;
            while (container.querySelector('#' + id)) { id = base + '_' + (i++); }
            el.id = id;
            used.set(id, 1);
          } else {
            const cur = used.get(id) || 0;
            if (cur > 0) {
              // duplica – renomeia apenas este elemento (preserva o primeiro)
              let i = cur + 1;
              let nid = id + '_' + i;
              while (container.querySelector('#' + nid)) { i++; nid = id + '_' + i; }
              el.id = nid;
              used.set(id, cur + 1);
              used.set(nid, 1);
            } else {
              used.set(id, 1);
            }
          }
          // associa label (for) quando houver label de bloco e controle único no bloco
          const block = el.closest('.form-block');
          if (block) {
            const formLabel = block.querySelector('.form-label');
            if (formLabel && !formLabel.getAttribute('for')){
              const q = block.querySelectorAll('input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"]), select, textarea');
              if (q.length === 1) { formLabel.setAttribute('for', el.id); }
            }
            // se não houver associação, defina aria-label a partir do texto da label
            if (!el.hasAttribute('aria-label') && !el.hasAttribute('aria-labelledby')){
              const text = (formLabel && formLabel.textContent || '').trim() || (el.placeholder || '').trim();
              if (text) el.setAttribute('aria-label', text);
            }
          }
        } catch {}
      });
      // Ajuste extra: labels que apontam para ids inexistentes tentam apontar para o primeiro controle do bloco
      container.querySelectorAll('label[for]').forEach((lab) => {
        try {
          const fid = lab.getAttribute('for');
          if (!fid) return;
          if (!container.querySelector('#' + CSS?.escape?.(fid) || fid)){
            const block = lab.closest('.form-block');
            if (!block) return;
            const firstCtrl = block.querySelector('input:not([type="hidden"]):not([type="radio"]):not([type="checkbox"]), select, textarea');
            if (firstCtrl) {
              if (!firstCtrl.id){ firstCtrl.id = 'fld_' + Math.random().toString(36).slice(2,8); }
              lab.setAttribute('for', firstCtrl.id);
            }
          }
        } catch {}
      });
    } catch {}
  }
  function renderRoute(){
    const route = (location.hash || '#/').replace('#','');
    if (__skipNextRender) { __skipNextRender = false; __currentRoute = route || '/'; return; }
    // Bloqueia navegacao se estiver saindo de um formulario com respostas preenchidas
    try {
      const prev = __currentRoute || '/';
      if (prev.startsWith('/form/')){
        const prevFormId = prev.split('/')[2] || '';
        if (route !== prev){
          if (__bypassDirtyGuardOnce) {
            __bypassDirtyGuardOnce = false; // permite essa navegação sem perguntar
          } else if (hasDirtyFormState(prevFormId)){
            // Reverte imediatamente, pergunta via modal e, se confirmar, navega novamente
            __skipNextRender = true; // evita re-render que limparia o formulário
            location.hash = prev;
            const msg = 'Você possui respostas preenchidas. As respostas são salvas como rascunho e podem ser recuperadas ao reabrir este formulário (histórico/rascunhos). Deseja sair mesmo assim?';
            (window.__appModal?.showConfirm(msg, { okText:'Sair', cancelText:'Cancelar', danger:true }) || Promise.resolve(false))
              .then((ok)=>{ if (ok) { __bypassDirtyGuardOnce = true; location.hash = route; } });
            return;
          }
        }
      }
    } catch {}
    if (!route.startsWith('/form/')) {
      __lastNonFormRoute = route || '/';
    }
    const home = document.getElementById('view-home');
    const conc = document.getElementById('view-conclusoes');
    const formView = document.getElementById('view-form');
    const inicioBtn = document.querySelector('.bottombar__item');
    const bottomConcl = document.getElementById('btnBottomConclusoes');
    const bottomBar = document.querySelector('.bottombar');
    const clearTeamCardSelection = () => {
      document.querySelectorAll('.card--team.is-active').forEach(c => c.classList.remove('is-active'));
    };
    if (route.startsWith('/conclusoes')){
      switchView(conc);
      setTopbarMode(true);
      const btnBackEl = document.getElementById('btnBack');
      btnBackEl?.classList.add('visible');
      try { __ensureSelectedTeamFromContext(); } catch {}
      updateChipFromStorage();
      if (typeof renderForms === 'function') renderForms();
      try {
        const cg = document.getElementById('listaConclusoes');
        const ce = document.getElementById('conclusoesEmpty');
        if (cg && ce) {
          const hasCards = !!cg.querySelector('.formcard');
          ce.style.display = hasCards ? 'none' : 'block';
        }
      } catch {}
      try { if (typeof __updateHomeCountsFromCatalog === 'function') __updateHomeCountsFromCatalog(); } catch {}
      clearTeamCardSelection();
      if (btnBackEl) btnBackEl.onclick = () => { location.hash = '/'; };
    } else if (route.startsWith('/form/')) {
      const formId = route.split('/')[2] || '';
      switchView(formView);
      setTopbarMode(true);
      const btnBackEl = document.getElementById('btnBack');
      btnBackEl?.classList.add('visible');
      // Runtime de formulários (opt-in): usar quando disponível e ativado
      let usedRuntime = false;
      try {
        const getRtFlag = () => {
          try {
            const h = String(location.hash||'');
            const qi = h.indexOf('?');
            const qs = qi >= 0 ? h.slice(qi+1) : '';
            const p = new URLSearchParams(qs || (location.search||''));
            return p.get('rt') === '1';
          } catch { return false; }
        };
        const enableRt = false;
        const fc = document.getElementById('formContainer');
        const cat = (typeof FORMS_CATALOG !== 'undefined') ? FORMS_CATALOG[formId] : null;
        if (enableRt && window.Forms && typeof Forms.renderById === 'function' && fc){
          // Ajusta header
          try { const t=document.getElementById('formHeaderTitle'); if (t && cat) t.textContent = cat.titulo || 'Formulário'; } catch {}
          try { const d=document.getElementById('formHeaderDesc'); if (d && cat) d.textContent = cat.descricao || ''; } catch {}
          // Renderiza schema
          fc.innerHTML = '';
          try { fc.__formId = formId; } catch {}
          Forms.renderById(formId, fc);
          // Garante ações (Limpar/Copiar) quando runtime for usado
          try {
            if (!fc.querySelector('.form-actions')){
              const actions=document.createElement('div'); actions.className='form-actions';
              const clear=document.createElement('button'); clear.id='btnLimparForm'; clear.type='button'; clear.className='btn-action btn-action--gray'; clear.innerHTML='<i class="fa-solid fa-eraser"></i> Limpar respostas';
              const copy=document.createElement('button'); copy.id='btnCopiarForm'; copy.type='button'; copy.className='btn-action btn-action--red'; copy.innerHTML='<i class="fa-solid fa-copy"></i> Copiar';
              actions.appendChild(clear); actions.appendChild(copy); fc.appendChild(actions);
            }
          } catch {}
          usedRuntime = true;
        }
      } catch {}
      if (!usedRuntime){
        if (typeof renderFormPage === 'function') renderFormPage(formId);
      }
      // Garantir INDICAÇÃO também em carga direta (reforço na camada de rota)
      try {
        if (formId === 'suporte-moto') {
          const fc = document.getElementById('formContainer');
          // Múltiplos timeouts para garantir que seja adicionado após todas as operações de DOM
          setTimeout(() => {
            try {
              if (typeof appendIndicacaoSection === 'function') {
                appendIndicacaoSection(fc);
              }
              if (typeof ensureIndicacaoPosition === 'function') {
                ensureIndicacaoPosition(fc);
              }
              if (typeof updateConditionalVisibility === 'function') {
                updateConditionalVisibility(formId, fc);
              }
              if (typeof ensureMotoTipoServDefault === 'function') {
                ensureMotoTipoServDefault(fc);
              }
              if (typeof enforceMotoFinalOrder === 'function') {
                enforceMotoFinalOrder(fc);
              }
            } catch {}
          }, 0);
          setTimeout(() => {
            try {
              if (typeof appendIndicacaoSection === 'function') {
                appendIndicacaoSection(fc);
              }
              if (typeof ensureIndicacaoPosition === 'function') {
                ensureIndicacaoPosition(fc);
              }
              if (typeof updateConditionalVisibility === 'function') {
                updateConditionalVisibility(formId, fc);
              }
              if (typeof ensureMotoTipoServDefault === 'function') {
                ensureMotoTipoServDefault(fc);
              }
              if (typeof enforceMotoFinalOrder === 'function') {
                enforceMotoFinalOrder(fc);
              }
            } catch {}
          }, 50);
          setTimeout(() => {
            try {
              if (typeof appendIndicacaoSection === 'function') {
                appendIndicacaoSection(fc);
              }
              if (typeof ensureIndicacaoPosition === 'function') {
                ensureIndicacaoPosition(fc);
              }
              if (typeof updateConditionalVisibility === 'function') {
                updateConditionalVisibility(formId, fc);
              }
              if (typeof ensureMotoTipoServDefault === 'function') {
                ensureMotoTipoServDefault(fc);
              }
              if (typeof enforceMotoFinalOrder === 'function') {
                enforceMotoFinalOrder(fc);
              }
            } catch {}
          }, 100);
        }
      } catch {}
      if (typeof setupJQueryMaskForSinalFibra === 'function') {
        try { setupJQueryMaskForSinalFibra(document.getElementById('formContainer')); } catch {}
      }
      if (typeof setupSpeedMasks === 'function') {
        try { setupSpeedMasks(document.getElementById('formContainer')); } catch {}
      }
      try { if (typeof setupSinalFibraLosControl === 'function') setupSinalFibraLosControl(document.getElementById('formContainer')); } catch {}
      if (typeof setupPhoneMasks === 'function') {
        try { setupPhoneMasks(document.getElementById('formContainer')); } catch {}
      }
      // Singular/Plural para cabeamento: cd_qt_cabos -> cd_cabos_multi
      try {
        const fc = document.getElementById('formContainer');
        const __fid = (container && container.__formId) || '';
        if (fc) setupCabosSingPlural(fc, __fid);
      } catch {}
      
      if (btnBackEl) btnBackEl.onclick = () => {
        // Comunicado de Ausência: sempre voltar para a Home
        if (formId === 'comunicado-ausencia') { location.hash = '/'; return; }
        // volta para a última tela navegada (lista), mantendo seleção
        const backTo = __lastNonFormRoute && __lastNonFormRoute !== '/' ? __lastNonFormRoute : '/conclusoes';
        location.hash = backTo;
      };
      // Menu inferior: não exibir atalho de "Formulários" para o Comunicado de Ausência
      if (formId === 'comunicado-ausencia') {
        try { if (bottomConcl) bottomConcl.hidden = true; } catch {}
        try { if (bottomBar) bottomBar.classList.remove('bottombar--three'); } catch {}
      } else {
        try { if (bottomConcl) bottomConcl.hidden = false; } catch {}
        try { if (bottomBar) bottomBar.classList.add('bottombar--three'); } catch {}
      }
    } else {
      switchView(home);
      setTopbarMode(false);
      const btnBackEl = document.getElementById('btnBack');
      btnBackEl?.classList.remove('visible');
      clearTeamCardSelection();
      try { if (typeof __updateHomeCountsFromCatalog === 'function') __updateHomeCountsFromCatalog(); } catch {}
      try { if (typeof window.__renderHomeGreeting === 'function') window.__renderHomeGreeting(); } catch {}
    }
    // Exibe/oculta atalho de conclusões no menu inferior
    try {
      let showShortcut = route.startsWith('/form/');
      if (route.startsWith('/form/')) {
        const fid = (route.split('/')[2] || '').toLowerCase();
        if (fid === 'comunicado-ausencia') showShortcut = false;
      }
      if (bottomConcl) bottomConcl.hidden = !showShortcut;
      if (bottomBar) bottomBar.classList.toggle('bottombar--three', showShortcut);
    } catch {}
    if (inicioBtn) inicioBtn.classList.toggle('is-active', !route.startsWith('/conclusoes') && !route.startsWith('/form/'));
    // Atualiza classes de rota no body (para estilos contextuais)
    try {
      const isHome = !(route.startsWith('/conclusoes') || route.startsWith('/form/'));
      document.body.classList.toggle('route-home', !!isHome);
      document.body.classList.toggle('route-conclusoes', route.startsWith('/conclusoes'));
      document.body.classList.toggle('route-form', route.startsWith('/form/'));
    } catch {}
    // Atualiza rota atual ao final do processamento
    __currentRoute = route || '/';
  }
  window.addEventListener('hashchange', renderRoute);
  renderRoute();

  // Confirma ao tentar fechar/atualizar a aba com respostas preenchidas
  window.addEventListener('beforeunload', function(e){
    try {
      if (__currentRoute && __currentRoute.startsWith('/form/')){
        const fid = __currentRoute.split('/')[2] || '';
        if (hasDirtyFormState(fid)){
          e.preventDefault();
          e.returnValue = '';
        }
      }
    } catch {}
  });

  // Integração com jQuery Mask (como no Projeto - Moto)
  // Aplica mêscara '-00.00' ao campo sinal da fibra quando presente
  function setupJQueryMaskForSinalFibra(root){
    try {
      if (!(window.jQuery && jQuery.fn && jQuery.fn.mask)) return;
      const $root = jQuery(root || document);
      const $el = $root.find('#sinal_fibra, [data-sinal-fibra]');
    if ($el.length) { $el.mask('-00.00', { reverse: false }); }
  } catch(e) { /* noop */ }
  }

  // Wiring genérico: cd_qt_cabos -> cd_cabos_multi (>1 => 'sim') para exibir bloco plural
  function setupCabosSingPlural(root, formId){
    try {
      const ctx = root || document;
      const qt = ctx.querySelector('#cd_qt_cabos');
      const flag = ctx.querySelector('#cd_cabos_multi');
      if (!qt || !flag) return;
      const apply = () => {
        try {
          const digits = String(qt.value||'').replace(/\D/g,'');
          if (qt.value !== digits) qt.value = digits;
          const n = parseInt(digits||'0', 10) || 0;
          flag.value = (n > 1) ? 'sim' : 'nao';
          if (typeof setFormState === 'function' && formId) setFormState(formId, { cd_cabos_multi: flag.value });
          if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId||'', ctx);
        } catch {}
      };
      ['input','change','keyup','blur'].forEach(evt => qt.addEventListener(evt, apply));
      apply();
    } catch {}
  }
  // Controle LOS para campos de Sinal da fibra: adiciona botão ao lado do input
  function setupSinalFibraLosControl(root){
    try {
      const r = root || document;
      const inputs = r.querySelectorAll('#sinal_fibra, [data-sinal-fibra]');
      inputs.forEach(inp => {
        if (inp.__losWired) return; inp.__losWired = true;

        // Cria um invólucro flexível para alinhar: [input] (ou) [LOS -> à direita]
        const wrap = document.createElement('div');
        wrap.className = 'sinal-fibra-row';
        wrap.style.display = 'flex';
        wrap.style.alignItems = 'center';
        wrap.style.gap = '6px';

        // Span "(ou)" entre o input e o botão
        const ou = document.createElement('span');
        ou.className = 'sinal-ou';
        ou.textContent = 'ou';

        // Botão LOS alinhado à direita
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-ghost btn-los';
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Sem sinal';
        btn.setAttribute('aria-pressed','false');
        try { btn.style.marginLeft = '0'; } catch {}
        try { btn.style.width='100%'; } catch {}

        // Mensagem inline (aparece apenas quando o usuário tenta digitar)
        const hint = document.createElement('div');
        hint.className = 'form-hint sinal-los-hint';
        hint.textContent = 'Campo bloqueado por "Sem sinal". Desative a opção para preencher.';
        try { hint.style.display = 'none'; } catch {}
        let hintTimer = null;
        const showHint = () => {
          try {
            if (hintTimer) { clearTimeout(hintTimer); hintTimer = null; }
            hint.style.display = '';
            hint.classList.add('is-highlight');
            hintTimer = setTimeout(() => { try { hint.style.display = 'none'; hint.classList.remove('is-highlight'); } catch {} }, 5000);
          } catch {}
        };

        // Atualiza estado visual/funcional quando ativa/desativa Sem sinal
        const update = (active) => {
          if (active) {
            inp.setAttribute('data-los','1');
            btn.classList.add('is-active');
            btn.setAttribute('aria-pressed','true');
            try { inp.readOnly = true; inp.setAttribute('aria-readonly','true'); inp.setAttribute('title','Sem sinal selecionado'); } catch {}
            try { if (!hint.id) hint.id = 'los_hint_'+Math.random().toString(36).slice(2); inp.setAttribute('aria-describedby', hint.id); hint.style.display = 'none'; } catch {}
          } else {
            inp.removeAttribute('data-los');
            btn.classList.remove('is-active');
            btn.setAttribute('aria-pressed','false');
            try { inp.readOnly = false; inp.removeAttribute('aria-readonly'); inp.removeAttribute('title'); } catch {}
            try { inp.removeAttribute('aria-describedby'); hint.style.display = 'none'; } catch {}
            try { if (hintTimer) { clearTimeout(hintTimer); hintTimer = null; } } catch {}
          }
        };
        btn.addEventListener('click', () => {
          const next = inp.getAttribute('data-los') !== '1';
          update(next);
          if (next) { try { inp.value = ''; } catch {} }
        });

        // Interações no input quando marcado como Sem sinal (sem popups; apenas dica visual)
        try {
          const pingBlocked = () => { try { inp.classList.add('is-blocked'); setTimeout(() => inp.classList.remove('is-blocked'), 600); } catch {} };
          const onBlockedTry = (ev) => { if (inp.getAttribute('data-los') === '1') { ev.preventDefault(); pingBlocked(); showHint(); } };
          inp.addEventListener('click', onBlockedTry);
          inp.addEventListener('focus', (ev) => { if (inp.getAttribute('data-los') === '1') { try { inp.blur(); } catch {} onBlockedTry(ev); } });
          inp.addEventListener('keydown', onBlockedTry);
        } catch {}

        // Move o input para dentro do invólucro e aplica flex para ocupar espaço
        try { inp.style.flex = '1 1 auto'; } catch {}
        try {
          const parent = inp.parentNode;
          if (parent) {
            parent.insertBefore(wrap, inp);
            wrap.appendChild(inp);
            wrap.appendChild(ou);
            wrap.appendChild(btn);
            try { wrap.insertAdjacentElement('afterend', hint); } catch {}
          }
        } catch {}
      });
    } catch {}
  }

  // Máscara e cálculo para metragem de cabo (#cabometros e #cd_cabometros)
  function setupCabometrosMaskAndCost(root){
    try {
      const ctx = root || document;
      const bindOne = (id, hintId) => {
        const inp = ctx.querySelector('#'+id);
        if (!inp || inp.__cabMaskWired) return;
        inp.__cabMaskWired = true;
        const hint = ctx.querySelector('#'+hintId);
        try {
          const lab = ctx.querySelector('label[for="'+id+'"]');
          if (lab) lab.textContent = 'Metragem de cabo de rede total para este serviço:';
        } catch {}
        const clean = (v) => {
          if (!v) return '';
          let s = String(v).toLowerCase().replace(/m/g,'');
          s = s.replace(/\./g, ',');
          s = s.replace(/[^0-9,]/g, '');
          const parts = s.split(',');
          if (parts.length > 1) s = parts.shift() + ',' + parts.join('').replace(/,/g,'');
          return s;
        };
        const recalc = (base) => {
          try {
            const m = parseFloat((base || '0').replace(',', '.')) || 0;
            const total = m * 3;
            if (hint) hint.textContent = 'Previsão de custos sobre este cabeamento: ' + ('R$' + total.toFixed(2).replace('.', ','));
          } catch {}
        };
        const onInput = (e) => {
          let base = clean(inp.value);
          if (e && e.inputType === 'deleteContentBackward') {
            const pos = inp.selectionStart || 0;
            const atEnd = pos === (inp.value || '').length;
            if (atEnd) base = base.slice(0, -1);
          }
          inp.value = base ? (base + 'm') : '';
          recalc(base);
        };
        const onKeyDown = (e) => {
          if (e.key === 'Backspace') {
            const digits = (inp.value||'').replace(/\D/g,'');
            if (digits.length <= 1) {
              e.preventDefault();
              inp.value = '';
              recalc('');
            }
          }
        };
        inp.addEventListener('keydown', onKeyDown);
        inp.addEventListener('input', onInput);
        inp.addEventListener('change', onInput);
        onInput();
      };
      bindOne('cabometros', 'cabocusto');
      bindOne('cd_cabometros', 'cd_cabocusto');
    } catch {}
  }

  // Singular/Plural do label de dispositivo cabeado em Suporte Técnico
  function setupQtdCabosDispLabel(root){
    try {
      const ctx = root || document;
      const qty = ctx.querySelector('#qtd_cabos');
      const lab = ctx.querySelector('label[for="disp_cabeado"]');
      if (!qty || !lab) return;
      if (qty.__dispLblWired) return; qty.__dispLblWired = true;
      const apply = () => {
        try {
          const n = parseInt(String(qty.value||'').replace(/\D/g,''), 10) || 0;
          lab.textContent = (n > 1) ? 'Quais dispositivos foram cabeados:' : 'Qual dispositivo foi cabeado:';
        } catch {}
      };
      ['input','change','keyup','blur'].forEach(evt => qty.addEventListener(evt, apply));
      // também reage quando a seção é exibida ao marcar "Passou cabo de rede?"
      try { Array.from(ctx.querySelectorAll('input[name="stc_cab_rede"]')).forEach(r => r.addEventListener('change', apply, true)); } catch {}
      apply();
    } catch {}
  }
  // tenta aplicar em carregamento inicial e também após renderizações futuras
  setupJQueryMaskForSinalFibra(document);

  // Máscaras simples para DOWN/UP/PING
  function setupSpeedMasks(root){
    const ctx = root || document;
    const dList = Array.from(ctx.querySelectorAll('.vel-down, #vel_down'));
    const uList = Array.from(ctx.querySelectorAll('.vel-up, #vel_up'));
    const pList = Array.from(ctx.querySelectorAll('.vel-ping, #vel_ping'));
    function onDecimalInput(el){
      if (!el) return;
      try { el.readOnly = false; el.removeAttribute('readonly'); } catch {}
      try { el.disabled = false; el.removeAttribute('disabled'); } catch {}
      try { el.style.pointerEvents = 'auto'; } catch {}
      try { el.style.userSelect = 'text'; } catch {}
      try { el.tabIndex = 0; } catch {}
      try {
        el.addEventListener('focus', () => {
          try { el.readOnly = false; el.removeAttribute('readonly'); } catch {}
          try { el.disabled = false; el.removeAttribute('disabled'); } catch {}
          try { el.style.pointerEvents = 'auto'; el.style.userSelect = 'text'; } catch {}
        }, { capture: false });
      } catch {}
      const handler = () => {
        let v = String(el.value || '').replace(/[^0-9.]/g,'');
        const parts = v.split('.');
        const head = parts.shift();
        let rest = parts.join(''); // remove dots beyond first
        // limit before/after decimal
        let intp = (head || '').slice(0,4);
        let frac = (rest || '').slice(0,2);
        el.value = frac ? intp + '.' + frac : intp;
      };
      el.addEventListener('input', handler);
      el.addEventListener('blur', handler);
      el.setAttribute('inputmode','decimal');
    }
    function onIntInput(el, maxLen){
      if (!el) return;
      try { el.readOnly = false; el.removeAttribute('readonly'); } catch {}
      try { el.disabled = false; el.removeAttribute('disabled'); } catch {}
      try { el.style.pointerEvents = 'auto'; } catch {}
      try { el.style.userSelect = 'text'; } catch {}
      try { el.tabIndex = 0; } catch {}
      try {
        el.addEventListener('focus', () => {
          try { el.readOnly = false; el.removeAttribute('readonly'); } catch {}
          try { el.disabled = false; el.removeAttribute('disabled'); } catch {}
          try { el.style.pointerEvents = 'auto'; el.style.userSelect = 'text'; } catch {}
        }, { capture: false });
      } catch {}
      const handler = () => { el.value = String(el.value || '').replace(/\D/g,'').slice(0, maxLen||3); };
      el.addEventListener('input', handler);
      el.addEventListener('blur', handler);
      el.setAttribute('inputmode','numeric');
    }
    dList.forEach(onDecimalInput);
    uList.forEach(onDecimalInput);
    pList.forEach((el) => onIntInput(el, 4));
  }

  // Máscara dinâmica para telefones brasileiros (DDD + 8/9 dígitos)
  function setupPhoneMasks(root){
    try {
      const ctx = root || document;
      const inputs = Array.from(ctx.querySelectorAll('input[id^="fone_"], input[name^="fone_"]'));
      const formatPhone = (raw) => {
        const d = String(raw||'').replace(/\D/g,'').slice(0,11);
        // Permitir apagar DDD sem travar: enquanto tiver 0, 1 ou 2 dígitos, não aplicar máscara
        if (d.length <= 2) return d;
        const ddd = d.slice(0,2);
        const rest = d.slice(2);
        if (rest.length <= 8){
          const a = rest.slice(0,4);
          const b = rest.slice(4,8);
          return `(${ddd}) ${a}${b?('-'+b):''}`.trim();
        } else {
          const a = rest.slice(0,5);
          const b = rest.slice(5,9);
          return `(${ddd}) ${a}${b?('-'+b):''}`.trim();
        }
      };
      inputs.forEach(inp => {
        const handler = () => { const cur = inp.value || ''; inp.value = formatPhone(cur); };
        inp.addEventListener('input', handler);
        inp.addEventListener('blur', handler);
        inp.setAttribute('inputmode','numeric');
        try { if (!inp.placeholder || inp.placeholder.trim() === '' || /\bdigite\b/i.test(inp.placeholder)) inp.placeholder = 'Ex.: (13) 00000-0000'; } catch {}
      });
    } catch {}
  }

  // Lista dinâmica de MACs com botão "Adicionar outro MAC"
  function setupMacLists(root){
    const ctx = root || document;
    const formId = (ctx && ctx.__formId) || '';
    try { ensureMacScanStyles(); } catch {}
    function addMacRow(list, prefix, idx, canDelete){
      const row = document.createElement('div'); row.className = 'mac-row';
      let listUid = list.getAttribute('data-uid');
      if (!listUid){ listUid = Math.random().toString(36).slice(2, 8); list.setAttribute('data-uid', listUid); }
      const id = prefix + listUid + '_' + idx;
      const isPhone = /^fone_/i.test(prefix);
      const inp = document.createElement('input'); inp.type='text'; inp.id=id; inp.name=prefix+idx; inp.className='form-input--underline'; inp.placeholder= (isPhone ? 'Ex.: (13) 00000-0000' : 'Digite...');
      let ariaLabel = 'MAC';
      try { ariaLabel = (list.closest('.form-block')?.querySelector('.form-label')?.textContent||'MAC').trim() || 'MAC'; } catch {}
      try { inp.setAttribute('aria-label', ariaLabel); } catch {}
      try { inp.dataset.scanTarget = id; } catch {}
      const wrap = document.createElement('div'); wrap.className = 'mac-input-wrap';
      wrap.appendChild(inp);
      row.appendChild(wrap);
      let scanBtn = null;
      if (!isPhone){
        scanBtn = document.createElement('button'); scanBtn.type='button'; scanBtn.className='btn-ghost mac-scan'; scanBtn.setAttribute('data-mac-scan','1'); scanBtn.setAttribute('data-scan-target', id); scanBtn.innerHTML='<i class="fa-solid fa-barcode"></i> Ler código de barras';
        try { scanBtn.setAttribute('aria-label', 'Ler código de barras para ' + ariaLabel); } catch {}
        scanBtn.addEventListener('click', (ev) => {
          ev.preventDefault();
          try { openMacScanForInput(inp); } catch {}
        });
        row.appendChild(scanBtn);
      }
      if (canDelete){
        const del = document.createElement('button'); del.type='button'; del.className='btn-ghost lent-remove mac-del'; del.innerHTML='<i class="fa-solid fa-trash-can"></i>';
        del.addEventListener('click', () => {
          try { const key = inp.name || inp.id; if (formId && key && typeof getFormState==='function'){ const st=getFormState(formId); if (st) delete st[key]; } } catch {}
          row.remove();
        });
        wrap.appendChild(del);
      }
      return row;
    }
    ctx.querySelectorAll('.mac-list').forEach(list => {
      // ensure structure has a rows container and one initial row
      let rows = list.querySelector('.mac-rows');
      if (!rows){ rows = document.createElement('div'); rows.className='mac-rows';
        // move any existing first input into a row
        const oldInp = list.querySelector('input');
        const prefix = list.getAttribute('data-mac-prefix') || '';
        if (oldInp){
          const first = addMacRow(list, prefix, 1, false);
          const newInp = first.querySelector('input');
          const scanBtn = first.querySelector('.mac-scan');
          if (newInp){
            const targetId = oldInp.id || newInp.id;
            try { newInp.name = oldInp.name || (prefix + '1'); } catch {}
            try { newInp.value = oldInp.value || ''; } catch {}
            if (oldInp.id){
              try { newInp.id = oldInp.id; } catch {}
              try { newInp.dataset.scanTarget = newInp.id; } catch {}
              if (scanBtn){
                try { scanBtn.setAttribute('data-scan-target', newInp.id); } catch {}
              }
            }
          }
          rows.appendChild(first);
          oldInp.remove();
        }
        list.insertBefore(rows, list.firstChild);
        // aplica máscara de telefone ao(s) novo(s) input(s) se forem prefixo de telefone
        try { if (typeof setupPhoneMasks === 'function') setupPhoneMasks(list); } catch {}
      }
      const addBtn = list.querySelector('.mac-add');
      if (addBtn){
        // Proteção: evita ligar o mesmo listener múltiplas vezes
        if (addBtn.dataset && addBtn.dataset.macWired === '1') return;
        try { addBtn.classList.add('lent-add'); } catch {}
        addBtn.addEventListener('click', () => {
          try {
            const prefix = addBtn.getAttribute('data-mac-prefix') || list.getAttribute('data-mac-prefix') || '';
            const nextIdx = rows.querySelectorAll('input[name^="'+prefix+'"]').length + 1;
            const row = addMacRow(list, prefix, nextIdx, true);
            rows.appendChild(row);
            row.querySelector('input').focus();
            // aplica máscara de telefone ao input recém-criado, quando aplicável
            try { if (typeof setupPhoneMasks === 'function') setupPhoneMasks(row); } catch {}
          } catch {}
        });
        try { if (addBtn.dataset) addBtn.dataset.macWired = '1'; } catch {}
      }
      // Envolver a lista em um card visual, se ainda não estiver
      try {
        if (!list.closest('.lentidao-card')){
          const card = document.createElement('div'); card.className='lentidao-card mac-card';
          const title = (list.closest('.form-block')?.querySelector('.form-label')?.textContent || 'MACs').trim();
          card.innerHTML = '<div class="lentidao-card__header"><span class="lentidao-card__title"><i class="fa-solid fa-network-wired"></i> ' + title + '</span></div>';
          list.parentNode.insertBefore(card, list);
          card.appendChild(list);
        }
      } catch {}
    });
  }



  let macScanOverlay = null;
  let macScanVideo = null;
  let macScanStatus = null;
  let macScanFallback = null;
  let macScanManual = null;
  let macScanActiveInput = null;
  let macScanStream = null;
  let macScanDetector = null;
  let macScanLoopId = null;
  let macScanCanvas = null;
  let macScanCtx = null;
  let macScanLastDetect = 0;
  let macScanGraceUntil = 0;
  let macScanScrollY = 0;
  let macScanConfirmModal = null;
  let macScanConfirmCode = null;
  let macScanConfirmAccept = null;
  let macScanConfirmRetry = null;
  let macScanAwaitingConfirm = false;
  let macScanPendingCode = '';
  const MAC_SCAN_ROI_W = 0.94;
  const MAC_SCAN_ROI_H = 0.1067;

  function ensureMacScanStyles(){
    try {
      const css = [
        '.mac-row{display:flex;align-items:center;gap:10px;margin-bottom:10px}',
        '.mac-input-wrap{position:relative;flex:1 1 auto;min-width:0}',
        '.mac-input-wrap .form-input--underline{width:100%;padding-right:50px}',
        '.mac-row .btn-ghost.mac-scan{flex:0 0 auto;white-space:nowrap;font-weight:700;gap:8px;display:inline-flex;align-items:center;justify-content:center;padding:0 18px;height:42px;border:1px solid #e11d1d;color:#fff;background:linear-gradient(90deg,#d31f1f 0%,#ff4d4d 50%,#d31f1f 100%);box-shadow:0 6px 18px rgba(255,59,59,.25), inset 0 1px 0 rgba(255,255,255,.10)}',
        '.mac-row .btn-ghost.mac-scan i{color:#fff !important}',
        '.mac-row .btn-ghost.mac-scan:hover{filter:brightness(1.05)}',
        '.mac-row .mac-del{flex:0 0 auto}',
        '.mac-scan-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);display:none;align-items:center;justify-content:center;z-index:10000;padding:20px}',
        '.mac-scan-overlay.is-visible{display:flex}',
        'body.mac-scan-open{overflow:hidden}',
        '.mac-scan-box{background:#fff;border-radius:18px;width:min(92vw,560px);max-height:90vh;padding:clamp(14px,2vw,22px);box-shadow:0 22px 48px rgba(0,0,0,.28);overflow:auto;-ms-overflow-style:none;scrollbar-width:none}',
        '.mac-scan-box::-webkit-scrollbar{width:0;height:0}',
        '.mac-scan-video-wrap{position:relative}',
        '.mac-scan-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}',
        '.mac-scan-header h2{margin:0;font-size:18px;display:flex;align-items:center;gap:8px;color:#222}',
        '.mac-scan-header .mac-scan-close{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center}',
        '.mac-scan-video{width:100%;aspect-ratio:3/4;border-radius:14px;background:#000;object-fit:cover}',
        '.mac-scan-roi{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border:2px dashed var(--brand);border-radius:12px;width:94%;height:10.67%;box-shadow:0 0 0 9999px rgba(0,0,0,.25) inset;pointer-events:none}',
        '.mac-scan-status{margin-top:12px;font-size:14px;color:#333}',
        '.mac-scan-fallback{margin-top:10px;font-size:13px;color:#555}',
        '.mac-scan-manual{margin-top:14px}',
        '.mac-scan-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:16px}',
        '.mac-scan-actions .btn-primary{flex:1 1 160px}',
        '.mac-scan-actions .btn-ghost{flex:1 1 120px;justify-content:center;font-size:14px}',
        '.mac-scan-actions .btn-ghost.mac-scan-close{height:46px;border-color:#e11d1d;color:#e11d1d;background:transparent}',
        '.mac-scan-actions .btn-ghost.mac-scan-close:hover{background:rgba(225,29,29,.08)}',
        'body.dark-theme .mac-scan-box{background:var(--card);color:var(--text);border:1px solid var(--border);box-shadow:0 22px 48px rgba(0,0,0,.55)}',
        'body.dark-theme .mac-scan-header h2{color:var(--text)}',
        'body.dark-theme .mac-scan-status{color:var(--muted)}',
        'body.dark-theme .mac-scan-fallback{color:var(--muted)}',
        '.mac-scan-box{position:relative}',
        '.mac-scan-confirm{position:absolute;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.45);border-radius:inherit}',
        '.mac-scan-confirm.is-visible{display:flex}',
        '.mac-scan-confirm-dialog{background:var(--card);color:var(--text);border:1px solid var(--border);border-radius:14px;padding:16px;max-width:92%;width:100%;box-shadow:0 20px 40px rgba(0,0,0,.35)}',
        'body:not(.dark-theme) .mac-scan-confirm-dialog{background:#fff;color:#111;border-color:var(--border)}',
        '.mac-scan-confirm-title{font-weight:700;margin-bottom:8px;display:flex;gap:8px;align-items:center}',
        '.mac-scan-confirm-code{font-family:monospace;background:rgba(0,0,0,.08);padding:8px 10px;border-radius:8px;margin:8px 0;word-break:break-all;color:inherit}',
        '.mac-scan-confirm-actions{display:flex;gap:10px;margin-top:10px}',
        '.mac-scan-confirm-actions .btn-primary{flex:1 1 160px;justify-content:center;font-size:14px}',
        '.mac-scan-confirm-actions .btn-ghost{flex:1 1 160px;justify-content:center;font-size:14px}',
        '@media (max-width:540px){.mac-row{flex-direction:column;align-items:stretch}.mac-row .btn-ghost.mac-scan{width:100%}.mac-scan-box{width:96vw}.mac-scan-header h2{font-size:16px}}',
        '@media (min-width:600px){.mac-scan-box{width:min(88vw,640px)}}',
        '@media (min-width:1024px){.mac-scan-box{width:min(70vw,720px)}}'
      ].join('');
      let st = document.getElementById('macScanStyles');
      if (!st){ st = document.createElement('style'); st.id='macScanStyles'; document.head.appendChild(st); }
      st.textContent = css;
    } catch {}
  }

  function ensureMacScanOverlay(){
    if (macScanOverlay) return;
    const overlay = document.createElement('div'); overlay.id='macScanOverlay'; overlay.className='mac-scan-overlay'; overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-modal','true');
    overlay.innerHTML = ''
      + '<div class="mac-scan-box" role="document">'
      + '  <div class="mac-scan-header">'
      + '    <h2><i class="fa-solid fa-barcode"></i> Leitor de código de barras</h2>'
      + '    <button type="button" class="btn-ghost mac-scan-close" data-scan-close="1" aria-label="Fechar leitor"><i class="fa-solid fa-xmark"></i></button>'
      + '  </div>'
      + '  <div class="mac-scan-video-wrap">'
      + '    <video class="mac-scan-video" data-scan-video="1" autoplay playsinline muted></video>'
      + '    <div class="mac-scan-roi" aria-hidden="true"></div>'
      + '    <canvas class="mac-scan-canvas" data-scan-canvas="1" hidden></canvas>'
      + '  </div>'
      + '  <div class="mac-scan-status" data-scan-status="1">Aponte a câmera para o código de barras.</div>'
      + '  <div class="mac-scan-fallback" data-scan-fallback="1" hidden></div>'
      + '  <input type="text" class="form-input mac-scan-manual" data-scan-manual="1" placeholder="Caso necessário, digite o código manualmente" inputmode="text" autocomplete="off" />'
      + '  <div class="mac-scan-actions">'
      + '    <button type="button" class="btn-primary mac-scan-confirm" data-scan-confirm="1"><i class="fa-solid fa-check"></i> Usar código digitado</button>'
      + '    <button type="button" class="btn-ghost mac-scan-close" data-scan-close="1"><i class="fa-solid fa-xmark"></i> Cancelar</button>'
      + '  </div>'
      + '  <div class="mac-scan-confirm" data-scan-confirm-modal="1" hidden>'
      + '    <div class="mac-scan-confirm-dialog">'
      + '      <div class="mac-scan-confirm-title"><i class="fa-solid fa-check-double"></i> Confirmar leitura</div>'
      + '      <div class="mac-scan-confirm-code" data-scan-confirm-code="1"></div>'
      + '      <div class="mac-scan-confirm-actions">'
      + '        <button type="button" class="btn-primary" data-scan-confirm-accept="1"><i class="fa-solid fa-check"></i> Confirmar</button>'
      + '        <button type="button" class="btn-ghost" data-scan-confirm-retry="1"><i class="fa-solid fa-rotate-right"></i> Ler novamente</button>'
      + '      </div>'
      + '    </div>'
      + '  </div>'
      + '</div>';
    document.body.appendChild(overlay);
    macScanOverlay = overlay;
    macScanVideo = overlay.querySelector('[data-scan-video]');
    macScanStatus = overlay.querySelector('[data-scan-status]');
    macScanFallback = overlay.querySelector('[data-scan-fallback]');
    macScanManual = overlay.querySelector('[data-scan-manual]');
    try { macScanCanvas = overlay.querySelector('[data-scan-canvas]'); macScanCtx = macScanCanvas ? macScanCanvas.getContext('2d', { willReadFrequently: true }) : null; } catch {}
    try {
      macScanConfirmModal = overlay.querySelector('[data-scan-confirm-modal]');
      macScanConfirmCode = overlay.querySelector('[data-scan-confirm-code]');
      macScanConfirmAccept = overlay.querySelector('[data-scan-confirm-accept]');
      macScanConfirmRetry = overlay.querySelector('[data-scan-confirm-retry]');
      if (macScanConfirmAccept){
        macScanConfirmAccept.addEventListener('click', () => {
          try { hideMacScanConfirm(); } catch {}
          try { if (macScanPendingCode) applyMacScanValue(macScanPendingCode); } catch {}
          macScanPendingCode = '';
          macScanAwaitingConfirm = false;
        });
      }
      if (macScanConfirmRetry){
        macScanConfirmRetry.addEventListener('click', () => { try { hideMacScanConfirm(); } catch {} macScanPendingCode = ''; macScanAwaitingConfirm = false; try { macScanGraceUntil = 0; } catch { macScanGraceUntil = 0; } try { openMacScanForInput(macScanActiveInput); } catch {} });
      }
    } catch {}
    const closeButtons = overlay.querySelectorAll('[data-scan-close]');
    closeButtons.forEach(btn => btn.addEventListener('click', () => closeMacScanOverlay()));
    overlay.addEventListener('click', (ev) => { if (ev.target === overlay) closeMacScanOverlay(); });
    const confirmBtn = overlay.querySelector('[data-scan-confirm]');
    if (confirmBtn){
      confirmBtn.addEventListener('click', () => {
        if (!macScanManual) return;
        const code = (macScanManual.value || '').trim();
        if (code){
          applyMacScanValue(code);
        } else {
          if (macScanStatus) macScanStatus.textContent = 'Digite ou aponte a câmera para captar o código.';
          try { macScanManual.focus(); } catch {}
        }
      });
    }
  }

  function getMacScanRoi(video){
    if (!video) return null;
    const vw = video.videoWidth || 0;
    const vh = video.videoHeight || 0;
    if (!vw || !vh) return null;
    const ew = video.clientWidth || 0;
    const eh = video.clientHeight || 0;
    if (!ew || !eh) return null;
    const scale = Math.max(ew / vw, eh / vh);
    const dispW = vw * scale;
    const dispH = vh * scale;
    const offX = (dispW - ew) / 2;
    const offY = (dispH - eh) / 2;
    const rW = ew * MAC_SCAN_ROI_W;
    const rH = eh * MAC_SCAN_ROI_H;
    const rX = (ew - rW) / 2;
    const rY = (eh - rH) / 2;
    const srcX = Math.max(0, (rX + offX) / scale);
    const srcY = Math.max(0, (rY + offY) / scale);
    const srcW = Math.max(1, rW / scale);
    const srcH = Math.max(1, rH / scale);
    return { x: srcX, y: srcY, w: srcW, h: srcH };
  }

  function setMacScanFallback(message){
    if (!macScanFallback) return;
    if (message){
      macScanFallback.textContent = message;
      macScanFallback.removeAttribute('hidden');
    } else {
      macScanFallback.textContent = '';
      macScanFallback.setAttribute('hidden','');
    }
  }

  function showMacScanConfirm(code){
    try {
      macScanPendingCode = String(code || '');
      macScanAwaitingConfirm = true;
      if (!macScanConfirmModal){ try { macScanConfirmModal = document.querySelector('[data-scan-confirm-modal]'); } catch {} }
      if (!macScanConfirmCode){ try { macScanConfirmCode = document.querySelector('[data-scan-confirm-code]'); } catch {} }
      if (macScanConfirmCode){ macScanConfirmCode.textContent = macScanPendingCode; }
      if (macScanConfirmModal){
        macScanConfirmModal.hidden = false;
        macScanConfirmModal.classList.add('is-visible');
      }
    } catch {}
  }

  function hideMacScanConfirm(){
    try {
      if (macScanConfirmModal){
        macScanConfirmModal.classList.remove('is-visible');
        macScanConfirmModal.hidden = true;
      }
    } catch {}
  }

  function stopMacScanStream(){
    try { if (macScanLoopId) cancelAnimationFrame(macScanLoopId); } catch {}
    macScanLoopId = null;
    if (macScanVideo){
      try { macScanVideo.pause(); } catch {}
      try { macScanVideo.srcObject = null; } catch {}
    }
    if (macScanStream){
      try { macScanStream.getTracks().forEach(track => { try { track.stop(); } catch {} }); } catch {}
    }
    macScanStream = null;
  }

  function closeMacScanOverlay(){
    stopMacScanStream();
    if (macScanOverlay){
      macScanOverlay.classList.remove('is-visible');
      macScanOverlay.removeAttribute('data-active-id');
    }
    try {
      document.body.classList.remove('mac-scan-open');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, macScanScrollY || 0);
    } catch {}
    if (macScanManual){
      macScanManual.value = '';
    }
    setMacScanFallback('');
    macScanActiveInput = null;
    macScanGraceUntil = 0;
    macScanLastDetect = 0;
    macScanPendingCode = '';
    macScanAwaitingConfirm = false;
    try { hideMacScanConfirm(); } catch {}
  }

  function applyMacScanValue(code){
    if (!macScanActiveInput) return;
    macScanActiveInput.value = code;
    try { macScanActiveInput.dispatchEvent(new Event('input', { bubbles: true })); } catch {}
    try { macScanActiveInput.dispatchEvent(new Event('change', { bubbles: true })); } catch {}
    const target = macScanActiveInput;
    closeMacScanOverlay();
    try { setTimeout(() => { try { target.focus(); if (target.select) target.select(); } catch {} }, 80); } catch {}
  }

  function ensureBarcodeDetector(){
    if (macScanDetector !== null) return macScanDetector;
    if ('BarcodeDetector' in window){
      try {
        macScanDetector = new window.BarcodeDetector({
          formats: ['code_128','code_39','code_93','ean_13','ean_8','codabar','upc_a','upc_e','itf','qr_code']
        });
      } catch {
        macScanDetector = null;
      }
    } else {
      macScanDetector = null;
    }
    return macScanDetector;
  }

  function scheduleBarcodeDetection(){
    const detector = ensureBarcodeDetector();
    if (!detector){
      setMacScanFallback('Este navegador não suporta leitura automática. Utilize o campo para digitar o código.');
      return;
    }
    const detectLoop = async () => {
      if (!macScanOverlay || !macScanVideo || macScanVideo.readyState < 2){
        macScanLoopId = requestAnimationFrame(detectLoop);
        return;
      }
      try {
        const now = (typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now();
        if (macScanAwaitingConfirm){
          macScanLoopId = requestAnimationFrame(detectLoop);
          return;
        }
        if (now < macScanGraceUntil){
          macScanLoopId = requestAnimationFrame(detectLoop);
          return;
        }
        if (now - macScanLastDetect < 120){
          macScanLoopId = requestAnimationFrame(detectLoop);
          return;
        }
        macScanLastDetect = now;
        let source = macScanVideo;
        if (macScanCanvas && macScanCtx){
          const rect = getMacScanRoi(macScanVideo);
          if (rect){
            try {
              const cw = Math.max(160, Math.floor(rect.w));
              const ch = Math.max(120, Math.floor(rect.h));
              if (macScanCanvas.width !== cw || macScanCanvas.height !== ch){
                macScanCanvas.width = cw;
                macScanCanvas.height = ch;
              }
              macScanCtx.drawImage(macScanVideo, rect.x, rect.y, rect.w, rect.h, 0, 0, cw, ch);
              source = macScanCanvas;
            } catch {}
          }
        }
        const barcodes = await detector.detect(source);
        if (barcodes && barcodes.length){
          const val = String(barcodes[0].rawValue || '').trim();
          if (val){
            if (macScanStatus) macScanStatus.textContent = 'Código identificado! Confirme a leitura.';
            macScanGraceUntil = 0;
            showMacScanConfirm(val);
            return;
          }
        }
      } catch (err) {
        setMacScanFallback('Não foi possível interpretar o vídeo. Digite o código manualmente se necessário.');
        macScanLoopId = null;
        return;
      }
      macScanLoopId = requestAnimationFrame(detectLoop);
    };
    macScanLoopId = requestAnimationFrame(detectLoop);
  }

  async function openMacScanForInput(input){
    if (!input) return;
    ensureMacScanStyles();
    ensureMacScanOverlay();
    stopMacScanStream();
    macScanActiveInput = input;
    macScanLastDetect = 0;
    macScanAwaitingConfirm = false;
    macScanPendingCode = '';
    try { hideMacScanConfirm(); } catch {}
    if (macScanOverlay){
      macScanOverlay.classList.add('is-visible');
      macScanOverlay.setAttribute('data-active-id', input.id || input.name || '');
    }
    try {
      macScanScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      document.body.classList.add('mac-scan-open');
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + macScanScrollY + 'px';
      document.body.style.width = '100%';
    } catch {}
    if (macScanStatus) macScanStatus.textContent = 'Aponte a câmera para o código de barras.';
    setMacScanFallback('');
    if (macScanManual){
      macScanManual.value = '';
    }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
      setMacScanFallback('Não foi possível acessar a câmera neste dispositivo. Digite o código manualmente.');
      if (macScanManual){ try { macScanManual.focus(); } catch {} }
      return;
    }
    try {
      macScanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' } }, audio: false });
      if (macScanVideo){
        macScanVideo.srcObject = macScanStream;
        try { await macScanVideo.play(); } catch {}
      }
      try {
        macScanGraceUntil = ((typeof performance !== 'undefined' && performance.now) ? performance.now() : Date.now()) + 600;
      } catch { macScanGraceUntil = Date.now() + 600; }
      scheduleBarcodeDetection();
    } catch (err) {
      setMacScanFallback('Não foi possível iniciar a câmera. Verifique as permissões e tente novamente.');
      stopMacScanStream();
      if (macScanManual){ try { macScanManual.focus(); } catch {} }
    }
  }
  // Lista dinâmica de "OUTRO EQUIPAMENTO": cada linha contém Nome + MAC
  function setupOutroList(root){
    const ctx = root || document;
    const formId = (ctx && ctx.__formId) || '';
    function addOutroRow(list, idx, canDelete){
      const row = document.createElement('div'); row.className='outro-row';
      // IDs únicos por lista para evitar conflitos; names permanecem previsíveis para persistência
      let listUid = list.getAttribute('data-uid');
      if (!listUid){ listUid = Math.random().toString(36).slice(2, 8); list.setAttribute('data-uid', listUid); }
      const namePref = list.getAttribute('data-outro-name-prefix') || 'outro_nome_';
      const macPref = list.getAttribute('data-outro-mac-prefix') || 'outro_mac_';
      const nome = document.createElement('input'); nome.type='text'; nome.id=namePref+listUid+'_'+idx; nome.name=namePref+idx; nome.className='form-input'; nome.placeholder='Tipo de equipamento, ex.: Switch, Disco...'; nome.setAttribute('aria-label','Tipo de equipamento');
      const macWrap = document.createElement('div'); macWrap.className='outro-mac-wrap';
      const mac = document.createElement('input'); mac.type='text'; mac.id=macPref+listUid+'_'+idx; mac.name=macPref+idx; mac.className='form-input--underline'; mac.placeholder='MAC...'; mac.setAttribute('aria-label','MAC do outro equipamento');
      // Persistência imediata para OUTROS: grava por name e por id
      try {
        const formId = (ctx && ctx.__formId) || '';
        const persistOutro = (inp) => { return () => { try {
          const nameKey = inp.name || '';
          const idKey = inp.id || '';
          if (formId && typeof setFormState==='function'){
            if (nameKey) setFormState(formId, { [nameKey]: inp.value });
            if (idKey && idKey !== nameKey) setFormState(formId, { [idKey]: inp.value });
            try { /* debug removed */ } catch {}
            if (typeof window.__upsertDraftHistory === 'function'){
              const patch = {};
              if (nameKey) patch[nameKey] = inp.value;
              if (idKey && idKey !== nameKey) patch[idKey] = inp.value;
              window.__upsertDraftHistory(formId, patch);
            }
          }
        } catch {} }; };
        const pn = persistOutro(nome); const pm = persistOutro(mac);
        try { nome.addEventListener('input', pn); nome.addEventListener('change', pn); } catch {}
        try { mac.addEventListener('input', pm); mac.addEventListener('change', pm); } catch {}
      } catch {}
      macWrap.appendChild(mac);
      if (canDelete){
        const del = document.createElement('button'); del.type='button'; del.className='btn-ghost lent-remove mac-del'; del.innerHTML='<i class="fa-solid fa-trash-can"></i>';
        del.addEventListener('click', () => {
          try {
            const nkey = nome.name || nome.id; const mkey = mac.name || mac.id;
            if (formId && typeof getFormState==='function'){
              const st=getFormState(formId)||{}; if (nkey) delete st[nkey]; if (mkey) delete st[mkey];
            }
          } catch {}
          row.remove();
        });
        macWrap.appendChild(del);
      }
      row.appendChild(nome); row.appendChild(macWrap);
      return row;
    }
    ctx.querySelectorAll('.outro-list').forEach(list => {
      let rows = list.querySelector('.outro-rows');
      if (!rows){ rows = document.createElement('div'); rows.className='outro-rows'; list.insertBefore(rows, list.firstChild); }
      if (!rows.querySelector('.outro-row')){ rows.appendChild(addOutroRow(list, 1, false)); }
      const addBtn = list.querySelector('.outro-add');
      if (addBtn){
        // Proteção: evita ligar o mesmo listener múltiplas vezes
        if (addBtn.dataset && addBtn.dataset.outroWired === '1') return;
        try { addBtn.classList.add('lent-add'); } catch {}
        addBtn.addEventListener('click', () => {
          const namePref = list.getAttribute('data-outro-name-prefix') || 'outro_nome_';
          const nextIdx = rows.querySelectorAll('input[name^="'+namePref+'"]').length + 1;
          const row = addOutroRow(list, nextIdx, true);
          rows.appendChild(row);
          row.querySelector('input').focus();
        });
        try { if (addBtn.dataset) addBtn.dataset.outroWired = '1'; } catch {}
      }
      // Card visual para OUTROS
      try {
        if (!list.closest('.lentidao-card')){
          const card = document.createElement('div'); card.className='lentidao-card outro-card';
          const title = (list.closest('.form-block')?.querySelector('.form-label')?.textContent || 'Outros').trim();
          card.innerHTML = '<div class="lentidao-card__header"><span class="lentidao-card__title"><i class="fa-solid fa-boxes-stacked"></i> ' + title + '</span></div>';
          list.parentNode.insertBefore(card, list);
          card.appendChild(list);
        }
      } catch {}
    });
  }

  // CSS runtime para ajustar espaçamentos do bloco de testes de velocidade
  function ensureVelTestStyles(){
    try {
      const css = [
        '.form-block[data-veltest-block="1"] .triple-inputs + label.form-label{margin-top:14px;display:block}',
        '.form-block[data-veltest-block="1"] .vel-device + label.form-label{margin-top:14px;display:block}',
        // Garantir que campos de velocidade sejam clicáveis e não fiquem sob elementos vizinhos
        '.form-block[data-veltest-block="1"] .triple-inputs{position:relative}',
        '.form-block[data-veltest-block="1"] .triple-inputs input{position:relative;z-index:2;pointer-events:auto}',
        '.form-block[data-veltest-block="1"] .lent-entry__header{position:relative;z-index:0}',
        '.form-block[data-veltest-block="1"] input.vel-device{position:relative;z-index:2;pointer-events:auto}',
        '.form-block[data-veltest-block="1"] .segmented.vel-via{position:relative;z-index:2}',
        '.form-block[data-veltest-block="1"] .segmented.vel-via label{pointer-events:auto}',
        // Botão de adicionar outro teste: ocupar toda a largura mantendo o estilo btn-ghost e cores da mac-add
        '.form-block[data-veltest-add="1"] .vel-add{display:flex;width:100%;justify-content:center;align-items:center;gap:6px;border-color:var(--brand);color:var(--brand);font-weight:700}',
        '.form-block[data-veltest-add="1"] .vel-add:hover{background:rgba(255,77,77,.08)}'
      ].join('');
      let st = document.getElementById('veltestStyles');
      if (!st){ st = document.createElement('style'); st.id = 'veltestStyles'; document.head.appendChild(st); }
      st.textContent = css;
      // estilos adicionais para botão lixeira dos blocos de teste
      try {
        let st2 = document.getElementById('veltestStyles2');
        if (!st2){ st2 = document.createElement('style'); st2.id = 'veltestStyles2'; document.head.appendChild(st2); }
        st2.textContent = ''
          + '.form-block[data-veltest-block="1"] .vel-del{'
          + '  border:1px solid var(--brand);'
          + '  color:var(--brand);'
          + '  background:transparent;'
          + '  border-radius:10px;'
          + '  padding:0 18px;'
          + '  height:38px;'
          + '  display:inline-flex; align-items:center; justify-content:center; gap:8px;'
          + '}'
          + '.form-block[data-veltest-block="1"] .vel-del i{ font-size:16px; }'
          + '.form-block[data-veltest-block="1"] .vel-del:hover{background:rgba(255,77,77,.08)}';
      } catch {}
    } catch {}
  }

  // Estilos globais para checkboxes com check vermelho
  function ensureGlobalCheckboxStyles(){
    try {
      const css = [
        '.choice input:checked{border-color:#e11d1d;background:transparent}',
        '.choice input:checked::after{content:"\\2713";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#e11d1d;font-size:12px;line-height:1}',
        'input[type="checkbox"]{appearance:none;width:16px;height:16px;border:2px solid var(--border);border-radius:4px;background:transparent;position:relative;margin:0}',
        'input[type="checkbox"]:focus{outline:none;box-shadow:0 0 0 3px rgba(255,77,77,.15)}',
        'input[type="checkbox"]:checked{border-color:#e11d1d;background:transparent}',
        'input[type="checkbox"]:checked::after{content:"\\2713";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);color:#e11d1d;font-size:12px;line-height:1}'
      ].join('');
      let st = document.getElementById('globalCheckboxStyles');
      if (!st){ st = document.createElement('style'); st.id = 'globalCheckboxStyles'; document.head.appendChild(st); }
      st.textContent = css;
    } catch {}
  }
  // WAN: estilos do botão de adicionar verificação adicional
  function ensureWanStyles(){
    try {
      const css = [
        '.form-block .wan-card{margin-top:18px}',
        '.form-block[data-wan-add="1"] .wan-add{display:flex;width:100%;justify-content:center;align-items:center;gap:6px;border-color:var(--brand);color:var(--brand);font-weight:700}',
        '.form-block[data-wan-add="1"] .wan-add:hover{background:rgba(255,77,77,.08)}',
        // Lixeira: manter mesmo estilo visual dos testes de velocidade
        '.form-block[data-wan-block="1"] .vel-del{border:1px solid var(--brand);color:var(--brand);background:transparent;border-radius:10px;padding:0 18px;height:38px;display:inline-flex;gap:8px;align-items:center;justify-content:center}',
        '.form-block[data-wan-block="1"] .vel-del i{font-size:16px}',
        '.form-block[data-wan-block="1"] .vel-del:hover{background:rgba(255,77,77,.08)}'
      ].join('');
      let st = document.getElementById('wanStyles');
      if (!st){ st = document.createElement('style'); st.id = 'wanStyles'; document.head.appendChild(st); }
      st.textContent = css;
    } catch {}
  }

  // Suporte Técnico: adicionar dinamicamente novos blocos de "RESULTADO DOS TESTES DE VELOCIDADE"
  function setupVelTestDynamic(root){
    try {
      const container = root || document;
      const formId = (container && container.__formId) || '';
      try { ensureVelTestStyles(); } catch {}
      try { ensureSpeedCardLayout(container); } catch {}
      const sec = container.querySelector('.form-block[data-veltest-block="1"]');
      const addBtn = sec ? sec.querySelector('[data-veltest-add="1"]') : null;
      const list = sec ? sec.querySelector('[data-veltest-list="1"]') : null;
      if (!addBtn || !list) return;
      if (addBtn.__wired) return; addBtn.__wired = true;
      // Clique para adicionar novo teste
      addBtn.addEventListener('click', () => {
        try {
          const idx = Array.from(list.querySelectorAll('[data-veltest-item="1"]')).length + 1;
          const item = document.createElement('div'); item.className='lent-entry'; item.setAttribute('data-veltest-item','1'); item.setAttribute('data-idx', String(idx));
          item.innerHTML = ''
            + '  <div class="lent-entry__header">'
            + '    <div class="lent-entry__badge"><i class="fa-solid fa-gauge-high"></i> Teste ' + idx + '</div>'
            + (idx > 1 ? '    <button type="button" class="btn-ghost lent-remove vel-del" data-remove-veltest="' + idx + '"><i class="fa-solid fa-trash-can"></i> Remover teste</button>' : '')
            + '  </div>'
            + '  <label class="form-label">Resultados obtidos</label>'
            + '  <div class="triple-inputs">'
            + '    <input name="vel_down_' + idx + '" type="text" class="form-input--underline vel-down" placeholder="DOWN" inputmode="decimal" />'
            + '    <input name="vel_up_' + idx + '" type="text" class="form-input--underline vel-up" placeholder="UP" inputmode="decimal" />'
            + '    <input name="vel_ping_' + idx + '" type="text" class="form-input--underline vel-ping" placeholder="PING" inputmode="numeric" />'
            + '  </div>'
            + '  <label class="form-label" for="vel_device_' + idx + '">Informe em qual dispositivo realizou esse teste:</label>'
            + '  <input id="vel_device_' + idx + '" name="vel_device_' + idx + '" type="text" class="form-input--underline vel-device" placeholder="Ex.: Notebook do cliente, celular do técnico..." />'
            + '  <label class="form-label">O teste foi realizado via:</label>'
            + '  <div class="segmented vel-via" role="radiogroup" aria-label="Teste realizado via">'
            + '    <input type="radio" id="vel_via_' + idx + '_cabo" name="vel_via_' + idx + '" value="cabo">'
            + '    <label for="vel_via_' + idx + '_cabo">Cabo de rede</label>'
            + '    <input type="radio" id="vel_via_' + idx + '_wifi" name="vel_via_' + idx + '" value="wifi">'
            + '    <label for="vel_via_' + idx + '_wifi">Wi-Fi</label>'
            + '  </div>';
          list.appendChild(item);
          try { if (typeof setupSpeedMasks === 'function') setupSpeedMasks(item); } catch {}
          try { item.querySelector('input')?.focus(); } catch {}
        } catch {}
      });
      // Exclusão delegada
      sec.addEventListener('click', (e) => {
        const btn = e.target && e.target.closest && e.target.closest('button'); if (!btn) return;
        if (btn.hasAttribute('data-remove-veltest')){
          e.preventDefault();
          const id = btn.getAttribute('data-remove-veltest');
          if (String(id) === '1') return;
          const it = sec.querySelector('.lent-entry[data-veltest-item="1"][data-idx="' + id + '"]');
          if (it){
            try {
              const fields = Array.from(it.querySelectorAll('input[name], textarea[name], select[name]'));
              const cleared = {};
              let st = null;
              if (formId && typeof getFormState === 'function'){
                st = getFormState(formId) || null;
              }
              fields.forEach(field => {
                const key = field.name || field.id;
                if (!key) return;
                cleared[key] = '';
                if (st && Object.prototype.hasOwnProperty.call(st, key)) delete st[key];
              });
              if (formId && typeof window !== 'undefined' && typeof window.__upsertDraftHistory === 'function' && Object.keys(cleared).length){
                try { window.__upsertDraftHistory(formId, cleared); } catch {}
              }
            } catch {}
            it.remove();
          }
        }
      }, true);
      // Mudança nos prints: limpar e manter apenas primeiro item
      try {
        (container).addEventListener('change', (e) => {
          const t = e.target; if (!t) return;
          if ((t.name||'') !== 'veltest_prints') return;
          try {
            const items = Array.from(list.querySelectorAll('[data-veltest-item="1"]'));
            if (items.length > 1) items.slice(1).forEach(n => n.remove());
            const first = items[0] || list.querySelector('[data-veltest-item="1"]');
            if (first){
              first.querySelectorAll('input').forEach(inp => { const type=(inp.type||'').toLowerCase(); if (type==='radio'||type==='checkbox') inp.checked=false; else inp.value=''; });
              try { if (typeof setupSpeedMasks === 'function') setupSpeedMasks(first); } catch {}
            }
          } catch {}
        }, true);
      } catch {}
    } catch {}
  }

  // Conferências Técnicas: adicionar dinamicamente blocos de "Verificação de cabo de rede adicional"
  function setupWanDynamic(root){
    try {
      const container = root || document;
      try { ensureWanStyles(); } catch {}
      try { ensureWanCardLayout(container); } catch {}
      const mainBlk = (() => { try { const el = container.querySelector('#wan_gigabit'); return el ? el.closest('.form-block') : null; } catch { return null; } })();
      if (!mainBlk) return;
      const addBtn = mainBlk.querySelector('[data-wan-add="1"]');
      const list = mainBlk.querySelector('[data-wan-list="1"]');
      if (!addBtn || !list) return;
      if (addBtn.__wired) return; addBtn.__wired = true;
      addBtn.addEventListener('click', () => {
        try {
          const idx = Array.from(list.querySelectorAll('[data-wan-item="1"]')).length + 1;
          const item = document.createElement('div'); item.className='lent-entry'; item.setAttribute('data-wan-item','1'); item.setAttribute('data-idx', String(idx));
          const deviceId = `wan_item_${idx}_device`;
          const gigabitId = `wan_item_${idx}_gigabit`;
          const powermitterId = `wan_item_${idx}_powermitter`;
          const pingId = `wan_item_${idx}_ping`;
          const obsId = `wan_item_${idx}_obs`;
          item.innerHTML = ''
            + '  <div class="lent-entry__header">'
            + '    <div class="lent-entry__badge"><i class="fa-solid fa-network-wired"></i> Verificação ' + idx + '</div>'
            + '    <button type="button" class="btn-ghost lent-remove" data-remove-wan="' + idx + '"><i class="fa-solid fa-trash-can"></i> Remover verificação</button>'
            + '  </div>'
            + '  <label class="form-label" for="' + deviceId + '">Aparelho ligado por esse cabo:</label>'
            + '  <input id="' + deviceId + '" name="' + deviceId + '" data-wan-field="device" type="text" class="form-input--underline" placeholder="Ex.: Segundo ponto, TVs, PCs etc." />'
            + '  <label class="form-label" style="margin-top:10px;">Verificações realizadas neste cabeamento</label>'
            + '  <div class="choices" style="margin-top:0;">'
            + '    <label class="choice"><input type="checkbox" id="' + gigabitId + '" name="' + gigabitId + '" data-wan-field="gigabit"><span>Cabo de rede Gigabit</span></label>'
            + '    <label class="choice"><input type="checkbox" id="' + powermitterId + '" name="' + powermitterId + '" data-wan-field="powermitter"><span>Teste no Powermitter</span></label>'
            + '    <label class="choice"><input type="checkbox" id="' + pingId + '" name="' + pingId + '" data-wan-field="ping"><span>Teste de Ping no Cabo</span></label>'
            + '  </div>'
            + '  <label class="form-label" for="' + obsId + '" style="margin-top:10px;">Observação adicional sobre o cabo de rede:</label>'
            + '  <textarea id="' + obsId + '" name="' + obsId + '" data-wan-field="obs" class="form-input--underline auto-expand" placeholder="Digite..." rows="1" data-min-height="32"></textarea>';
          list.appendChild(item);
          try { if (typeof setupAutoExpand === 'function') setupAutoExpand(item); } catch {}
          try { item.querySelector('input')?.focus(); } catch {}
        } catch {}
      });
      // Criar Verificação 1 fixa movendo conteúdo original para dentro do card
      try {
        const hasAny = Array.from(list.querySelectorAll('[data-wan-item="1"]')).length > 0;
        if (!hasAny){
          const item = document.createElement('div'); item.className='lent-entry'; item.setAttribute('data-wan-item','1'); item.setAttribute('data-idx','1');
          item.innerHTML = ''
            + '  <div class="lent-entry__header">'
            + '    <div class="lent-entry__badge"><i class="fa-solid fa-network-wired"></i> Verificação 1</div>'
            + '  </div>'
            + '  <label class="form-label" for="wan_ativo_tipo_1_onu">Aparelho ligado por esse cabo:</label>'
            + '  <div class="segmented wan-ativo-type" role="radiogroup" aria-label="Aparelho ligado por esse cabo">'
            + '    <input type="radio" id="wan_ativo_tipo_1_onu" name="wan_ativo_tipo_1" value="onu">'
            + '    <label for="wan_ativo_tipo_1_onu">Cabo da ONU pro Roteador</label>'
            + '    <input type="radio" id="wan_ativo_tipo_1_outro" name="wan_ativo_tipo_1" value="outro">'
            + '    <label for="wan_ativo_tipo_1_outro">Outro</label>'
            + '  </div>'
            + '  <input id="wan_item_1_device" name="wan_item_1_device" data-wan-field="device" type="text" class="form-input--underline" placeholder="Ex.: Segundo ponto, TVs, PCs etc." style="display:none" disabled />'
            + '  <label class="form-label" style="margin-top:10px;">Verificações realizadas neste cabeamento</label>'
            + '  <div class="choices" data-wan-first-choices="1" style="margin-top:0;"></div>'
            + '  <label class="form-label" for="wan_item_1_obs" style="margin-top:10px;">Observação adicional sobre o cabo de rede:</label>';
          list.appendChild(item);
          try { if (typeof setupAutoExpand === 'function') setupAutoExpand(item); } catch {}
          // Toggle do campo "Outro" para Aparelho ligado por esse cabo (Verificação 1)
          try {
            const rOnu = item.querySelector('#wan_ativo_tipo_1_onu');
            const rOutro = item.querySelector('#wan_ativo_tipo_1_outro');
            const inOutro = item.querySelector('#wan_item_1_device');
            const applyToggle = () => {
              const isOutro = !!(rOutro && rOutro.checked);
              if (inOutro){
                inOutro.disabled = !isOutro;
                inOutro.style.display = isOutro ? '' : 'none';
                if (!isOutro) { try { inOutro.value = ''; } catch {} }
              }
            };
            if (rOnu) rOnu.addEventListener('change', applyToggle);
            if (rOutro) rOutro.addEventListener('change', applyToggle);
            applyToggle();
          } catch {}
          // mover choices e observação originais
          try {
            const origChoices = mainBlk.querySelector('.choices');
            const targetChoices = item.querySelector('[data-wan-first-choices="1"]');
            if (origChoices && targetChoices){
              const mapChoices = [
                { selector: '#wan_gigabit', name: 'wan_item_1_gigabit', field: 'gigabit' },
                { selector: '#wan_powermitter', name: 'wan_item_1_powermitter', field: 'powermitter' },
                { selector: '#wan_ping', name: 'wan_item_1_ping', field: 'ping' }
              ];
              mapChoices.forEach(({ selector, name, field }) => {
                const el = origChoices.querySelector(selector);
                if (el){
                  try {
                    el.name = name;
                    el.setAttribute('data-wan-field', field);
                  } catch {}
                }
              });
              Array.from(origChoices.children).forEach(ch => targetChoices.appendChild(ch));
              try { origChoices.remove(); } catch {}
            }
          } catch {}
          try {
            const oldObsLbl = mainBlk.querySelector('label[for="wan_obs"]'); if (oldObsLbl) oldObsLbl.remove();
            const oldObs = mainBlk.querySelector('#wan_obs');
            if (oldObs){
              try {
                oldObs.id='wan_item_1_obs';
                oldObs.name='wan_item_1_obs';
                oldObs.setAttribute('data-wan-field','obs');
              } catch {}
              item.appendChild(oldObs);
            } else {
              try {
                const ta = document.createElement('textarea');
                ta.id = 'wan_item_1_obs'; ta.name = 'wan_item_1_obs';
                ta.setAttribute('data-wan-field','obs');
                ta.className = 'form-input--underline auto-expand';
                ta.placeholder = 'Digite...'; ta.rows = 1; ta.setAttribute('data-min-height','32');
                item.appendChild(ta);
                if (typeof setupAutoExpand === 'function') setupAutoExpand(item);
              } catch {}
            }
          } catch {}
          try { const oldWanLabel = Array.from(mainBlk.querySelectorAll('.form-label')).find(l => /Cabo de Rede da WAN/i.test(String(l.textContent||''))); if (oldWanLabel) oldWanLabel.remove(); } catch {}
        }
      } catch {}
      // remover verificação
      mainBlk.addEventListener('click', (e) => {
        const btn = e.target && e.target.closest && e.target.closest('button'); if (!btn) return;
        if (btn.hasAttribute('data-remove-wan')){
          e.preventDefault();
          const id = btn.getAttribute('data-remove-wan');
          const it = mainBlk.querySelector('.lent-entry[data-wan-item="1"][data-idx="' + id + '"]');
          if (it) it.remove();
        }
      }, true);
    } catch {}
  }

  // Acrescenta dinamicamente a seção "TROCA DE EQUIPAMENTOS" ao final do formulário
function appendTrocaEquipamentosSection(container){
  if (!container) return;
  try { const fid = (container && container.__formId) || ''; if (fid !== 'suporte-moto') return; } catch {}
  // Evita duplicação
  try { if (container.querySelector('[data-section="troca-equipamentos"]')) return; } catch {}
  const sec = document.createElement('section'); sec.className='form-section'; sec.setAttribute('data-section','troca-equipamentos');
  try {
    const head = document.createElement('div'); head.className='form-header';
    const ttl = document.createElement('div'); ttl.className='form-title'; ttl.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> TROCA DE EQUIPAMENTOS';
    head.appendChild(ttl); sec.appendChild(head);
  } catch {}
  const makeSegmented = (name, items) => {
    const wrap = document.createElement('div');
    const cls = (items && items.length === 2) ? 'segmented' : 'segmented segmented--stack';
    wrap.className = cls;
    wrap.setAttribute('role','radiogroup');
    items.forEach(it => {
      const val = String(it[0]||'').toLowerCase();
      const text = String(it[1]||'');
      const inpt = document.createElement('input'); inpt.type='radio'; inpt.id=name+'_'+it[0]; inpt.name=name; inpt.value=it[0];
      const lab = document.createElement('label'); lab.setAttribute('for', inpt.id);
      if (val === 'sim') lab.innerHTML = '<i class="fa-solid fa-check"></i> ' + text;
      else if (val === 'nao' || val === 'não') lab.innerHTML = '<i class="fa-solid fa-xmark"></i> ' + text;
      else lab.textContent = text;
      wrap.appendChild(inpt); wrap.appendChild(lab);
    });
    return wrap;
  };
  const addBlock = (opts) => { const b=document.createElement('div'); b.className='form-block'; if (opts.whenField){ b.setAttribute('data-when-field', opts.whenField); } if (opts.whenEquals!=null){ b.setAttribute('data-when-equals', String(opts.whenEquals)); } if (opts.whenIn){ b.setAttribute('data-when-in', opts.whenIn); } if (opts.clearOnHide){ b.setAttribute('data-clear-on-hide','1'); } if (opts.label){ const l=document.createElement('label'); l.className='form-label'; l.textContent=opts.label; b.appendChild(l); } if (opts.content) b.appendChild(opts.content); sec.appendChild(b); return b; };
  const makeMacList = (prefix) => { const d=document.createElement('div'); d.className='mac-list'; d.setAttribute('data-mac-list','1'); d.setAttribute('data-mac-prefix',prefix); const inp=document.createElement('input'); inp.type='text'; inp.id=prefix+'1'; inp.name=prefix+'1'; inp.className='form-input--underline'; inp.placeholder='Digite...'; const btn=document.createElement('button'); btn.type='button'; btn.className='btn-ghost mac-add'; btn.setAttribute('data-mac-prefix',prefix); btn.innerHTML='<i class="fa-solid fa-plus"></i> Adicionar outro MAC'; d.appendChild(inp); d.appendChild(btn); return d; };
  // Pergunta principal
  addBlock({ label: 'Foi necessário a troca de equipamento?', content: makeSegmented('tq_troca', [['sim','Sim'],['nao','Não']]) });
  // NÃO: equipamentos no local
  try {
    const formId = (container && container.__formId) || '';
    if (formId === 'suporte-moto') {
      const fragNo = document.createElement('div');
      const labNo = document.createElement('label'); labNo.className='form-label'; labNo.innerHTML = 'Equipamentos da ETECC (comodato ou compra) que estão no local: <span class="form-hint">(múltipla escolha)</span>';
      fragNo.appendChild(labNo);
      const chNo = document.createElement('div'); chNo.className='choices';
      chNo.innerHTML = [
        '<label class="choice"><input type="checkbox" id="tq_local_ont" name="tq_local_ont"><span>ONT</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_local_onu" name="tq_local_onu"><span>ONU</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_local_rot" name="tq_local_rot"><span>Roteador</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_local_outro" name="tq_local_outro"><span>Outros</span></label>'
      ].join('');
      fragNo.appendChild(chNo);
      addBlock({ whenField:'tq_troca', whenEquals:'nao', clearOnHide:1, content: fragNo });
      addBlock({ whenField:'tq_local_ont', whenEquals:'true', clearOnHide:1, label:'MAC ONT (no local):', content: makeMacList('estao_ont_mac_') });
      addBlock({ whenField:'tq_local_onu', whenEquals:'true', clearOnHide:1, label:'MAC ONU (no local):', content: makeMacList('estao_onu_mac_') });
      addBlock({ whenField:'tq_local_rot', whenEquals:'true', clearOnHide:1, label:'MAC Roteador (no local):', content: makeMacList('estao_rot_mac_') });
      const fragNoOut = document.createElement('div');
      const labNoOut = document.createElement('label'); labNoOut.className='form-label'; labNoOut.textContent='Descreva os outros equipamentos que ficaram no local:'; fragNoOut.appendChild(labNoOut);
      const olNo = document.createElement('div'); olNo.className='outro-list'; olNo.setAttribute('data-outro-list','1');
      // Prefixos específicos para o caso "no local" (evita colisão com outros fluxos)
      olNo.setAttribute('data-outro-name-prefix','estao_outro_nome_');
      olNo.setAttribute('data-outro-mac-prefix','estao_outro_mac_');
      olNo.innerHTML = '<div class="outro-rows"></div><button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>';
      fragNoOut.appendChild(olNo);
      addBlock({ whenField:'tq_local_outro', whenEquals:'true', clearOnHide:1, content: fragNoOut });
    } else {
      addBlock({ whenField:'tq_troca', whenEquals:'nao', clearOnHide:1, label:'Equipamentos da ETECC (comodato ou compra) que estão no local:', content: makeSegmented('tq_local', [['onu','Somente ONU/ONT'],['roteador','Somente Roteador (podem ser vários)'],['ambos','Ambos']]) });
      addBlock({ whenField:'tq_local', whenIn:'onu,ambos', clearOnHide:1, label:'ONU/ONT MAC:', content: makeMacList('onu_mac_') });
      addBlock({ whenField:'tq_local', whenIn:'roteador,ambos', clearOnHide:1, label:'ROTEADOR MAC:', content: makeMacList('roteador_mac_') });
    }
  } catch {}
  // SIM: retirado
  try {
    const formId = (container && container.__formId) || '';
    if (formId === 'suporte-moto') {
      // RETIRADO (checkboxes + dica múltipla escolha)
      const fragRet = document.createElement('div');
      const labRet = document.createElement('label'); labRet.className='form-label'; labRet.innerHTML = 'Qual equipamento da ETECC foi RETIRADO: <span class="form-hint">(múltipla escolha)</span>';
      fragRet.appendChild(labRet);
      const chRet = document.createElement('div'); chRet.className='choices';
      chRet.innerHTML = [
        '<label class="choice"><input type="checkbox" id="tq_ret_ont" name="tq_ret_ont"><span>ONT</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_ret_onu" name="tq_ret_onu"><span>ONU</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_ret_rot" name="tq_ret_rot"><span>Roteador</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_ret_outro" name="tq_ret_outro"><span>Outros</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_ret_none" name="tq_ret_none"><span>Nenhum</span></label>'
      ].join('');
      fragRet.appendChild(chRet);
      addBlock({ whenField:'tq_troca', whenEquals:'sim', clearOnHide:1, content: fragRet });
      addBlock({ whenField:'tq_ret_ont', whenEquals:'true', clearOnHide:1, label:'MAC ONT (retirado):', content: makeMacList('ret_ont_mac_') });
      addBlock({ whenField:'tq_ret_onu', whenEquals:'true', clearOnHide:1, label:'MAC ONU (retirado):', content: makeMacList('ret_onu_mac_') });
      addBlock({ whenField:'tq_ret_rot', whenEquals:'true', clearOnHide:1, label:'ROTEADOR MAC (retirado):', content: makeMacList('ret_rot_mac_') });
      const fragRetOut = document.createElement('div');
      const labRetOut = document.createElement('label'); labRetOut.className='form-label'; labRetOut.textContent='Descreva os outros equipamentos retirados:'; fragRetOut.appendChild(labRetOut);
      const ol1 = document.createElement('div'); ol1.className='outro-list'; ol1.setAttribute('data-outro-list','1');
      ol1.innerHTML = '<div class="outro-rows"></div><button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>';
      fragRetOut.appendChild(ol1);
      addBlock({ whenField:'tq_ret_outro', whenEquals:'true', clearOnHide:1, content: fragRetOut });

      // INSERIDO (checkboxes)
      const fragIns = document.createElement('div');
      const labIns = document.createElement('label'); labIns.className='form-label'; labIns.innerHTML = 'Qual equipamento foi INSERIDO: <span class="form-hint">(múltipla escolha)</span>';
      fragIns.appendChild(labIns);
      const chIns = document.createElement('div'); chIns.className='choices';
      chIns.innerHTML = [
        '<label class="choice"><input type="checkbox" id="tq_ins_ont" name="tq_ins_ont"><span>ONT</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_ins_onu" name="tq_ins_onu"><span>ONU</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_ins_rot" name="tq_ins_rot"><span>Roteador</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_ins_outro" name="tq_ins_outro"><span>Outros</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_ins_none" name="tq_ins_none"><span>Nenhum / do cliente</span></label>'
      ].join('');
      fragIns.appendChild(chIns);
      addBlock({ whenField:'tq_troca', whenEquals:'sim', clearOnHide:1, content: fragIns });
      addBlock({ whenField:'tq_ins_ont', whenEquals:'true', clearOnHide:1, label:'MAC ONT (inserido):', content: makeMacList('ins_ont_mac_') });
      addBlock({ whenField:'tq_ins_onu', whenEquals:'true', clearOnHide:1, label:'MAC ONU (inserido):', content: makeMacList('ins_onu_mac_') });
      addBlock({ whenField:'tq_ins_rot', whenEquals:'true', clearOnHide:1, label:'ROTEADOR MAC (inserido):', content: makeMacList('ins_rot_mac_') });
      const fragInsOut = document.createElement('div');
      const labInsOut = document.createElement('label'); labInsOut.className='form-label'; labInsOut.textContent='Descreva os outros equipamentos inseridos:'; fragInsOut.appendChild(labInsOut);
      const ol2 = document.createElement('div'); ol2.className='outro-list'; ol2.setAttribute('data-outro-list','1');
      ol2.innerHTML = '<div class="outro-rows"></div><button type="button" class="btn-ghost outro-add"><i class="fa-solid fa-plus"></i> Adicionar outro equipamento</button>';
      fragInsOut.appendChild(ol2);
      addBlock({ whenField:'tq_ins_outro', whenEquals:'true', clearOnHide:1, content: fragInsOut });

      // Gate: Existem outros equipamentos além dos listados acima?
      addBlock({ whenField:'tq_troca', whenEquals:'sim', clearOnHide:1, label:'Além dos equipamentos com MAC listados acima, há outros equipamentos da ETECC no local?', content: makeSegmented('tq_fic_ha_outros', [['sim','Sim'],['nao','Não']]) });
      // FICOU NO LOCAL (checkboxes) – aparece somente se gate = Sim
      const fragFic = document.createElement('div');
      const labFic = document.createElement('label'); labFic.className='form-label'; labFic.innerHTML = 'Qual o outro equipamento da ETECC que ficou no local: <span class="form-hint">(múltipla escolha)</span>';
      fragFic.appendChild(labFic);
      const chFic = document.createElement('div'); chFic.className='choices';
      chFic.innerHTML = [
        '<label class="choice"><input type="checkbox" id="tq_fic_ont" name="tq_fic_ont"><span>ONT</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_fic_onu" name="tq_fic_onu"><span>ONU</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_fic_rot" name="tq_fic_rot"><span>Roteador</span></label>',
        '<label class="choice"><input type="checkbox" id="tq_fic_outro" name="tq_fic_outro"><span>Outros</span></label>'
      ].join('');
      fragFic.appendChild(chFic);
      addBlock({ whenField:'tq_fic_ha_outros', whenEquals:'sim', clearOnHide:1, content: fragFic });
      addBlock({ whenField:'tq_fic_ont', whenEquals:'true', clearOnHide:1, label:'MAC ONT (ficou):', content: makeMacList('ficou_ont_mac_') });
      addBlock({ whenField:'tq_fic_onu', whenEquals:'true', clearOnHide:1, label:'MAC ONU (ficou):', content: makeMacList('ficou_onu_mac_') });
      addBlock({ whenField:'tq_fic_rot', whenEquals:'true', clearOnHide:1, label:'ROTEADOR MAC (ficou):', content: makeMacList('ficou_rot_mac_') });
    } else {
      // Comportamento anterior (radios)
      addBlock({ whenField:'tq_troca', whenEquals:'sim', clearOnHide:1, label:'Qual equipamento da ETECC foi RETIRADO?', content: makeSegmented('tq_ret', [['onu','ONU/ONT'],['roteador','Roteador'],['ambos','Ambos'],['nenhum','Nenhum']]) });
      addBlock({ whenField:'tq_ret', whenIn:'onu,ambos', clearOnHide:1, label:'ONU/ONT MAC (retirado):', content: makeMacList('ret_onu_mac_') });
      addBlock({ whenField:'tq_ret', whenIn:'roteador,ambos', clearOnHide:1, label:'ROTEADOR MAC (retirado):', content: makeMacList('ret_rot_mac_') });
      addBlock({ whenField:'tq_ret', whenIn:'onu,roteador,ambos', clearOnHide:1, label:'Qual equipamento foi INSERIDO?', content: makeSegmented('tq_ins', [['onu','ONU/ONT'],['roteador','Roteador'],['ambos','Ambos'],['nenhum','Nenhum / do cliente']]) });
      addBlock({ whenField:'tq_ins', whenIn:'onu,ambos', clearOnHide:1, label:'ONU/ONT MAC (inserido):', content: makeMacList('ins_onu_mac_') });
      addBlock({ whenField:'tq_ins', whenIn:'roteador,ambos', clearOnHide:1, label:'ROTEADOR MAC (inserido):', content: makeMacList('ins_rot_mac_') });
      addBlock({ whenField:'tq_ret', whenIn:'onu,roteador,nenhum', clearOnHide:1, label:'Qual o outro equipamento da ETECC que ficou no local:', content: makeSegmented('tq_ficou', [['onu','ONU/ONT'],['roteador','Roteador'],['sem','Sem equipamentos']]) });
      addBlock({ whenField:'tq_ficou', whenEquals:'onu', clearOnHide:1, label:'ONU/ONT MAC (ficou):', content: makeMacList('ficou_onu_mac_') });
      addBlock({ whenField:'tq_ficou', whenEquals:'roteador', clearOnHide:1, label:'ROTEADOR MAC (ficou):', content: makeMacList('ficou_rot_mac_') });
    }
  } catch {}
  // Inserção padronizada via utilitário
  try { container.appendChild(sec); } catch {}
  try { ensureSectionAfter(null, sec); } catch {}
  // Exclusividade dos checkboxes especiais (Suporte Moto):
  try {
    const formId = (container && container.__formId) || '';
    if (formId === 'suporte-moto'){
      const clearMacListsByPrefixes = (prefixes) => {
        try {
          prefixes.forEach(pref => {
            // Limpa valores dos inputs
            sec.querySelectorAll('input[name^="'+pref+'"]').forEach(inp => { inp.value=''; });
            // Remove linhas extras nas listas de MAC e limpa a primeira
            const list = sec.querySelector('.mac-list[data-mac-prefix="'+pref+'"]');
            if (list){
              const rowsWrap = list.querySelector('.mac-rows');
              if (rowsWrap){
                const rows = Array.from(rowsWrap.querySelectorAll('.mac-row'));
                rows.slice(1).forEach(r => r.remove());
                const first = rowsWrap.querySelector('.mac-row input'); if (first) first.value='';
              }
            }
          });
        } catch {}
      };
      const clearOutroListsInSection = () => {
        try {
          sec.querySelectorAll('.outro-list input').forEach(inp => { inp.value=''; });
          // Mantém apenas a primeira linha em cada outro-list
          sec.querySelectorAll('.outro-list .outro-rows').forEach(rows => {
            const rowEls = Array.from(rows.querySelectorAll('.outro-row'));
            rowEls.slice(1).forEach(r => r.remove());
          });
        } catch {}
      };
      const enforceExclusive = () => {
        const get = (id) => container.querySelector('#'+id);
        // Grupos: RETIRADO, INSERIDO
        const groups = [
          { none: 'tq_ret_none', normals: ['tq_ret_ont','tq_ret_onu','tq_ret_rot','tq_ret_outro'] },
          { none: 'tq_ins_none', normals: ['tq_ins_ont','tq_ins_onu','tq_ins_rot','tq_ins_outro'] }
        ];
        groups.forEach(g => {
          const noneEl = get(g.none);
          const normals = g.normals.map(get).filter(Boolean);
          if (!noneEl) return;
          if (noneEl.checked){
            normals.forEach(n => {
              if (n && n.checked) n.checked = false;
              // Reflete no estado para condicional esconder blocos dependentes
              try { const key = n && (n.name || n.id); if (key && typeof setFormState==='function') setFormState(formId, { [key]: false }); } catch {}
            });
            // Limpa campos associados ao grupo
            if (g.none === 'tq_ret_none') { clearMacListsByPrefixes(['ret_ont_mac_','ret_onu_mac_','ret_rot_mac_']); clearOutroListsInSection(); }
            if (g.none === 'tq_ins_none') { clearMacListsByPrefixes(['ins_ont_mac_','ins_onu_mac_','ins_rot_mac_']); clearOutroListsInSection(); }
            if (g.none === 'tq_fic_sem') { clearMacListsByPrefixes(['ficou_ont_mac_','ficou_onu_mac_','ficou_rot_mac_','estao_ont_mac_','estao_onu_mac_','estao_rot_mac_']); }
          }
          else {
            // if any normal got checked, uncheck none
            if (normals.some(n => n && n.checked)) {
              noneEl.checked = false;
              try { const key = noneEl.name || noneEl.id; if (key && typeof setFormState==='function') setFormState(formId, { [key]: false }); } catch {}
            }
          }
        });
      };
      // Aviso visual inline abaixo do grupo de checkboxes
      const showInlineAlert = (groupEl, message) => {
        try {
          if (!groupEl) return;
          // Evita avisos duplicados simultâneos no mesmo grupo
          const existing = groupEl.nextElementSibling;
          if (existing && existing.classList && (existing.classList.contains('inline-alert') || existing.classList.contains('sinal-los-hint'))) {
            existing.remove();
          }
          const el = document.createElement('div');
          // Padronização visual do alerta: form-hint destacado
          el.className = 'form-hint sinal-los-hint is-highlight';
          el.setAttribute('role','alert');
          try { el.setAttribute('data-error','1'); } catch {}
          el.textContent = message;
          // Inserir logo abaixo do grupo
          groupEl.insertAdjacentElement('afterend', el);
          // Fecha ao clicar
          const close = () => { try { el.remove(); } catch {} };
          el.addEventListener('click', close, { once: true });
          // Auto-ocultar após 5 segundos
          setTimeout(close, 5000);
        } catch {}
      };
      // Remove aviso inline do grupo, se existir
      const clearInlineAlert = (groupEl) => {
        try {
          if (!groupEl) return;
          const next = groupEl.nextElementSibling;
          if (next && next.classList && (next.classList.contains('inline-alert') || next.classList.contains('sinal-los-hint'))) next.remove();
        } catch {}
      };
      // Detecta tentativas conflitantes para exibir aviso (antes de mudar estados)
      container.addEventListener('click', (e) => {
        try {
          const t = e.target;
          if (!t || t.tagName !== 'INPUT' || t.type !== 'checkbox') return;
          const get = (id) => container.querySelector('#'+id);
          const groups = [
            { none: 'tq_ret_none', normals: ['tq_ret_ont','tq_ret_onu','tq_ret_rot','tq_ret_outro'], msg: "A opção 'Nenhum' impede a seleção de outros equipamentos neste grupo. Desmarque-a para continuar." },
            { none: 'tq_ins_none', normals: ['tq_ins_ont','tq_ins_onu','tq_ins_rot','tq_ins_outro'], msg: "A opção 'Nenhum / do cliente' impede a seleção de outros equipamentos neste grupo. Desmarque-a para continuar." }
          ];
          // Encontra o grupo relacionado ao input clicado
          const group = groups.find(g => g.none === t.id || g.normals.includes(t.id));
          if (!group) return;
          const noneEl = get(group.none);
          const normals = group.normals.map(get).filter(Boolean);
          // Encontrar o container visual do grupo
          const groupBox = t.closest('.choices') || t.closest('.form-block') || sec;
          // Caso 1: usuário tentou marcar um normal enquanto 'none' está marcado
          if (noneEl && noneEl.checked && group.normals.includes(t.id)) {
            showInlineAlert(groupBox, group.msg);
            return;
          }
          // Caso 2: usuário clicou em 'none' enquanto havia algum normal marcado
          if (t.id === group.none && normals.some(n => n && n.checked)) {
            showInlineAlert(groupBox, group.msg);
            return;
          }
        } catch {}
      }, true);
      // Delegated change listener on container
      container.addEventListener('change', (e) => {
        try {
          const t = e.target; if (!t) return;
          if (t.type === 'checkbox') {
            enforceExclusive();
            if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility((container && container.__formId)||'', container);
            // Se o usuário desmarcar o checkbox "Nenhum", remover o aviso imediatamente
            const get = (id) => container.querySelector('#'+id);
            const groups = [
              { none: 'tq_ret_none', normals: ['tq_ret_ont','tq_ret_onu','tq_ret_rot','tq_ret_outro'] },
              { none: 'tq_ins_none', normals: ['tq_ins_ont','tq_ins_onu','tq_ins_rot','tq_ins_outro'] }
            ];
            groups.forEach(g => {
              const noneEl = get(g.none);
              if (!noneEl) return;
              const groupBox = noneEl.closest('.choices') || noneEl.closest('.form-block') || sec;
              if (!groupBox) return;
              if (!noneEl.checked) clearInlineAlert(groupBox);
            });
          }
          // Gate: se respondeu "Não" para haver outros equipamentos, limpar seleções e listas de MAC de FICOU
          if (t.name === 'tq_fic_ha_outros'){
            const val = (t && t.value) || '';
            const checked = !!t.checked;
            // Só agir quando a seleção ficar efetivamente em 'nao'
            const isNo = (checked && val === 'nao') || (val === 'nao' && container.querySelector('input[name="tq_fic_ha_outros"][value="nao"]')?.checked);
            if (isNo){
              try {
                ['tq_fic_ont','tq_fic_onu','tq_fic_rot'].forEach(id => {
                  const el = container.querySelector('#'+id);
                  if (el) { el.checked = false; try { const key = el.name||el.id; if (key && typeof setFormState==='function') setFormState(formId, { [key]: false }); } catch {} }
                });
                clearMacListsByPrefixes(['ficou_ont_mac_','ficou_onu_mac_','ficou_rot_mac_']);
                if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility((container && container.__formId)||'', container);
              } catch {}
            }
          }
        } catch {}
      });
    }
  } catch {}
}function appendAjudaInternaSection(container){
    if (!container) return;
    try { const fid = (container && container.__formId) || ''; if (fid !== 'suporte-moto') return; } catch {}
    // Evita duplicação
    try { if (container.querySelector('[data-section="ajuda-interna"]')) return; } catch {}
    const sec = document.createElement('section'); sec.className = 'form-section'; sec.setAttribute('data-section','ajuda-interna');
    try { const head = document.createElement('div'); head.className='form-header'; const ttl = document.createElement('div'); ttl.className='form-title'; ttl.innerHTML = '<i class="fa-solid fa-hands-helping"></i> AJUDA INTERNA'; head.appendChild(ttl); sec.appendChild(head); } catch {}
    const addBlock = (opts) => {
      const b=document.createElement('div'); b.className='form-block';
      const isConditional = !!opts.whenField;
      if (opts.whenField){ b.setAttribute('data-when-field', opts.whenField); }
      if (opts.whenEquals!=null){ b.setAttribute('data-when-equals', String(opts.whenEquals)); }
      if (opts.whenIn){ b.setAttribute('data-when-in', String(opts.whenIn)); }
      if (opts.clearOnHide){ b.setAttribute('data-clear-on-hide','1'); }
      if (opts.label){ const l=document.createElement('label'); l.className='form-label'; l.textContent=opts.label; b.appendChild(l); }
      if (opts.content) b.appendChild(opts.content);
      // Inicialmente esconde blocos condicionais até avaliação
      if (isConditional) { try { b.setAttribute('hidden','hidden'); } catch {} }
      sec.appendChild(b); return b;
    };
    const makeSegmented = (name, items) => {
      const wrap = document.createElement('div');
      const cls = (items && items.length === 2) ? 'segmented' : 'segmented segmented--stack';
      wrap.className = cls; wrap.setAttribute('role','radiogroup');
      items.forEach(it => {
        const val = String(it[0]||'').toLowerCase();
        const text = String(it[1]||'');
        const inpt=document.createElement('input'); inpt.type='radio'; inpt.id=name+'_'+it[0]; inpt.name=name; inpt.value=it[0];
        const lab=document.createElement('label'); lab.setAttribute('for', inpt.id);
        if (val === 'sim') lab.innerHTML = '<i class="fa-solid fa-check"></i> ' + text;
        else if (val === 'nao' || val === 'não') lab.innerHTML = '<i class="fa-solid fa-xmark"></i> ' + text;
        else lab.textContent = text;
        wrap.appendChild(inpt); wrap.appendChild(lab);
      });
      return wrap;
    };
    // Pergunta inicial
    addBlock({ label:'Foi necessário ajuda de alguém do setor interno?', content: makeSegmented('ajuda_necessaria', [['sim','Sim'],['nao','Não']]) });
    // Se sim: setor
    addBlock({ whenField:'ajuda_necessaria', whenEquals:'sim', clearOnHide:1, label:'Qual setor auxiliou:', content: makeSegmented('ajuda_setor', [['torre','Torre'],['ti','T.I'],['supervisao','Supervisão']]) });
    // Se setor escolhido: nome de quem auxiliou
    const nomeBlk = document.createElement('input'); nomeBlk.type='text'; nomeBlk.id='ajuda_nome'; nomeBlk.name='ajuda_nome'; nomeBlk.className='form-input--underline'; nomeBlk.placeholder='Digite...';
    addBlock({ whenField:'ajuda_setor', whenIn:'torre,ti,supervisao', clearOnHide:1, label:'Nome de quem auxiliou:', content: nomeBlk });

    // Inserção padronizada via utilitário
    try { container.appendChild(sec); } catch {}
    try { ensureSectionAfter(null, sec); } catch {}
  }

  // Textareas auto-expand
function setupAutoExpand(root){
  const ctx = root || document;
  // Remover contadores existentes para leveza
  try { ctx.querySelectorAll('.textarea-counter').forEach(el => { try { el.remove(); } catch {} }); } catch {}
  ctx.querySelectorAll("textarea.auto-expand").forEach(t => {
    const min = parseInt(t.dataset.minHeight || '100', 10);
    t.style.minHeight = min + 'px';
    t.style.overflow = 'hidden';
    // Flag de digitação para controlar auto-scroll somente enquanto digita
    let typing = false; let to = null;
    const setTyping = () => { typing = true; try { clearTimeout(to); } catch {}; to = setTimeout(() => { typing = false; }, 600); };
    t.addEventListener('keydown', setTyping, { passive: true });
    t.addEventListener('input', setTyping, { passive: true });
    const getScrollParent = (el) => {
      let p = el.parentElement;
      const docEl = document.scrollingElement || document.documentElement;
      while (p) {
        const cs = getComputedStyle(p);
        const can = /(auto|scroll)/.test(cs.overflowY) && p.scrollHeight > p.clientHeight;
        if (can) return p;
        p = p.parentElement;
      }
      return docEl;
    };
    const handler = () => {
      const sp = getScrollParent(t);
      // recalcula altura para caber o conteúdo
      t.style.height = 'auto';
      const h = Math.max(min, t.scrollHeight + 2);
      t.style.height = h + 'px';
      // acompanha o FINAL do textarea somente enquanto digita
      try {
        if (!typing) return;
        const pad = 16;
        const tr = t.getBoundingClientRect();
        const isDoc = (sp === document.scrollingElement || sp === document.documentElement);
        const bottomBar = document.querySelector('.bottombar');
        const bottomPad = bottomBar ? Math.max(0, bottomBar.getBoundingClientRect().height) : 0;
        const visibleBottom = isDoc ? (window.innerHeight - bottomPad) : sp.getBoundingClientRect().bottom;
        const overflow = tr.bottom - (visibleBottom - pad);
        if (document.activeElement === t && overflow > 0) {
          if (isDoc) window.scrollBy({ top: overflow, left: 0, behavior: 'auto' });
          else sp.scrollTop += overflow;
        }
      } catch {}
    };
    t.addEventListener('input', handler);
    // initial pass (ajusta altura, sem seguir scroll)
    handler();
  });
}function appendDescricaoOSSection(container){
    if (!container) return;
    try { const fid = (container && container.__formId) || ''; if (fid === 'comunicado-ausencia') return; } catch {}
    try { if (container.querySelector('#descricao_os')) return; } catch {}
    const sec = document.createElement('section'); sec.className='form-section'; sec.setAttribute('data-section','descricao-os');
    try { const head = document.createElement('div'); head.className='form-header'; const ttl = document.createElement('div'); ttl.className='form-title'; ttl.innerHTML = '<i class="fa-regular fa-file-lines"></i> DESCRIÇÃO DA O.S'; head.appendChild(ttl); sec.appendChild(head); } catch {}
    const block = document.createElement('div'); block.className='form-block';
    const lab = document.createElement('label'); lab.className='form-label'; lab.textContent='Relato da solução para a visita técnica:'; block.appendChild(lab);
    const ta = document.createElement('textarea'); ta.id='descricao_os'; ta.name='descricao_os'; ta.className='form-input--underline auto-expand'; ta.placeholder='Digite aqui o relato da solução...'; ta.rows = 4; ta.dataset.minHeight = '120'; block.appendChild(ta);
    const counter = document.createElement('div'); counter.className='textarea-counter'; counter.textContent = '0 caracteres'; block.appendChild(counter);
    sec.appendChild(block);
    try { const actions = container.querySelector('.form-actions'); if (actions) container.insertBefore(sec, actions); else container.appendChild(sec); } catch { container.appendChild(sec); }
  }

  // Layout: garante cards para Testes de Velocidade e WAN dentro do mesmo form-block
  function ensureSpeedCardLayout(root){
    try {
      const container = root || document;
      const blk = container.querySelector('.form-block[data-veltest-block="1"]');
      if (!blk) return;
      // Evita reestruturações repetidas que podem causar perda de foco
      try { if (blk.getAttribute('data-veltest-structured') === '1') return; } catch {}
      // Localiza ou cria o card
      let listWrap = blk.querySelector('.lentidao-card.veltest-card');
      const addWrap = blk.parentNode && blk.parentNode.querySelector('.form-block[data-veltest-add="1"]');
      if (!listWrap){
        listWrap = document.createElement('div'); listWrap.className = 'lentidao-card veltest-card';
        listWrap.innerHTML = ''
          + '<div class="lentidao-card__header"><span class="lentidao-card__title"><i class="fa-solid fa-gauge-high"></i> Resultados</span></div>'
          + '<div class="lentidao-list" data-veltest-list="1"></div>'
          + '<button type="button" class="btn-ghost lent-add" data-veltest-add="1"><i class="fa-solid fa-plus"></i> Adicionar teste</button>';
        // Se houver botão original, remove o botão padrão do card para evitar duplicidade
        try {
          if (addWrap && addWrap.querySelector && addWrap.querySelector('button')){
            const defBtn = listWrap.querySelector('[data-veltest-add="1"]');
            if (defBtn) defBtn.remove();
          }
        } catch {}
        blk.appendChild(listWrap);
      }
      // Localiza ou cria a primeira entrada
      const list = listWrap.querySelector('[data-veltest-list="1"]');
      let entry = list ? list.querySelector('[data-veltest-item="1"]') : null;
      if (!entry){
        entry = document.createElement('div'); entry.className='lent-entry'; entry.setAttribute('data-veltest-item','1'); entry.setAttribute('data-idx','1');
        const header = document.createElement('div'); header.className='lent-entry__header';
        const badge = document.createElement('div'); badge.className='lent-entry__badge'; badge.innerHTML = '<i class="fa-solid fa-gauge-high"></i> Teste 1'; header.appendChild(badge);
        entry.appendChild(header);
        if (list) list.appendChild(entry);
      }
      if (entry){
        try {
          const lockBtn = entry.querySelector('button[data-remove-veltest="1"]');
          if (lockBtn) lockBtn.remove();
        } catch {}
      }
      // Move elementos dentro da entrada, preservando ordem: triple -> label dispositivo -> input dispositivo -> label via -> radios
      const triple = blk.querySelector('.triple-inputs'); if (triple) entry.appendChild(triple);
      let lblDev = null; try { lblDev = Array.from(blk.querySelectorAll('label.form-label')).find(l => (String(l.htmlFor||'') === 'vel_device_1') || /Informe em qual dispositivo/i.test(String(l.textContent||''))); } catch {}
      const inDev = blk.querySelector('input.vel-device') || blk.querySelector('#vel_device_1');
      if (lblDev) entry.appendChild(lblDev);
      if (inDev) entry.appendChild(inDev);
      let lblVia = null; try { lblVia = Array.from(blk.querySelectorAll('label.form-label')).find(l => /O teste foi realizado via/i.test(String(l.textContent||''))); } catch {}
      const seg = blk.querySelector('.segmented.vel-via');
      if (lblVia) entry.appendChild(lblVia);
      if (seg) entry.appendChild(seg);
      // Fallback: se ainda existir algum input .vel-device fora do card, move para dentro do entry
      try {
        Array.from(blk.querySelectorAll('input.vel-device, #vel_device_1')).forEach((inp) => {
          if (!listWrap.contains(inp)){
            const lid = inp.id || 'vel_device_1';
            const assoc = blk.querySelector('label.form-label[for="'+lid+'"]');
            if (assoc && !listWrap.contains(assoc)) entry.appendChild(assoc);
            entry.appendChild(inp);
          }
        });
      } catch {}
      // Botão de ação: incorporar o existente ao card e remover o bloco antigo
      if (addWrap){
        const btn = addWrap.querySelector('button'); if (btn){ try { btn.setAttribute('data-veltest-add','1'); btn.classList.add('lent-add'); btn.innerHTML = '<i class="fa-solid fa-plus"></i> Adicionar teste'; } catch {} listWrap.appendChild(btn); }
        try { addWrap.remove(); } catch {}
      }
      // Marca como estruturado para não reexecutar e perder foco
      try { blk.setAttribute('data-veltest-structured','1'); } catch {}
    } catch {}
  }

  // Garante foco e clique confiáveis nos campos do bloco de Testes de Velocidade
  function ensureVelTestFocusHandlers(root){
    try {
      const container = root || document;
      const blk = container.querySelector('.form-block[data-veltest-block="1"]');
      if (!blk || blk.__velFocusWired) return; blk.__velFocusWired = true;
      const focusableSel = 'input.vel-down, input#vel_down, input.vel-up, input#vel_up, input.vel-ping, input#vel_ping, input.vel-device, #vel_device_1, .segmented.vel-via input[type="radio"], .segmented.vel-via label';
      blk.addEventListener('pointerdown', (ev) => {
        try {
          const t = ev.target;
          if (!t) return;
          const el = t.closest && t.closest(focusableSel);
          if (!el) return;
          // Se for label, encaminha foco ao input associado
          if (el.tagName === 'LABEL'){
            const forId = el.getAttribute('for');
            const inp = forId ? blk.querySelector('#'+forId) : null;
            if (inp) { setTimeout(() => { try { inp.focus(); } catch {} }, 0); }
            return;
          }
          if (el.tagName === 'INPUT'){
            // Força interatividade
            try { el.readOnly = false; el.removeAttribute('readonly'); } catch {}
            try { el.disabled = false; el.removeAttribute('disabled'); } catch {}
            try { el.style.pointerEvents = 'auto'; el.style.userSelect = 'text'; } catch {}
            setTimeout(() => { try { el.focus(); } catch {} }, 0);
          }
        } catch {}
      }, true);
    } catch {}
  }

  function ensureWanCardLayout(root){
    try {
      const container = root || document;
      // localiza o bloco principal de WAN pela presença do checkbox wan_gigabit
      const mainBlk = (() => { try { const el = container.querySelector('#wan_gigabit'); return el ? el.closest('.form-block') : null; } catch { return null; } })();
      if (!mainBlk) return;
      if (mainBlk.querySelector('[data-wan-card="1"]')) return;
      const card = document.createElement('div'); card.className = 'lentidao-card wan-card'; card.setAttribute('data-wan-card','1');
      card.innerHTML = ''
        + ''
        + '<div class="lentidao-list" data-wan-list="1"></div>'
        + '<button type="button" class="btn-ghost lent-add wan-add" data-wan-add="1"><i class="fa-solid fa-plus"></i> Adicionar verificação</button>';
      mainBlk.appendChild(card);
      // botão de ação para adicionar verificação
      try {
        const extraBlk = container.querySelector('.form-block[data-wan-add="1"]');
        if (extraBlk){
          const btn = extraBlk.querySelector('button');
          if (btn){ btn.classList.add('lent-add','wan-add'); btn.setAttribute('data-wan-add','1'); card.appendChild(btn); }
          extraBlk.remove();
        }
      } catch {}
    } catch {}
  }

  

  function ensureWanCardLayout(root){
    try {
      const container = root || document;
      // localiza o bloco principal de WAN pela presença do checkbox wan_gigabit
      const mainBlk = (() => { try { const el = container.querySelector('#wan_gigabit'); return el ? el.closest('.form-block') : null; } catch { return null; } })();
      if (!mainBlk) return;
      if (mainBlk.querySelector('[data-wan-card="1"]')) return;
      // Verifica se existe um bloco antigo (form-block) com o botão de adicionar verificação
      const extraBlk = container.querySelector('.form-block[data-wan-add="1"]');
      const card = document.createElement('div'); card.className = 'lentidao-card wan-card'; card.setAttribute('data-wan-card','1');
      card.innerHTML = ''
        + ''
        + '<div class="lentidao-list" data-wan-list="1"></div>'
        + '<button type="button" class="btn-ghost lent-add wan-add" data-wan-add="1"><i class="fa-solid fa-plus"></i> Adicionar verificação</button>';
      // Se houver botão original, remove o botão padrão do card para evitar duplicidade
      try {
        if (extraBlk && extraBlk.querySelector && extraBlk.querySelector('button')){
          const defBtn = card.querySelector('[data-wan-add="1"]');
          if (defBtn) defBtn.remove();
        }
      } catch {}
      mainBlk.appendChild(card);
      // mover botão antigo, caso exista em outro form-block
      try {
        if (extraBlk){
          const btn = extraBlk.querySelector('button');
          if (btn){ btn.classList.add('lent-add','wan-add'); btn.setAttribute('data-wan-add','1'); btn.innerHTML = '<i class="fa-solid fa-plus"></i> Adicionar verificação'; card.appendChild(btn); }
          extraBlk.remove();
        }
      } catch {}
    } catch {}
  }

  // Override: torna a última pergunta do Suporte Moto condicional (Sim/Não)
  function appendDescricaoOSSection(container){
    if (!container) return;
    try { if (container.querySelector('#descricao_os')) return; } catch {}
    const formId = (container && container.__formId) || '';
    if (formId === 'comunicado-ausencia') return;
    const sec = document.createElement('section'); sec.className='form-section'; sec.setAttribute('data-section','descricao-os');
    try { const head = document.createElement('div'); head.className='form-header'; const ttl = document.createElement('div'); ttl.className='form-title'; ttl.innerHTML = '<i class="fa-regular fa-file-lines"></i> FINALIZAÇÃO'; head.appendChild(ttl); sec.appendChild(head); } catch {}
    
    // Bloco: Informações passadas ao Cliente
    const infoBlock = document.createElement('div'); infoBlock.className='form-block';
    const infoLab = document.createElement('label'); infoLab.className='form-label'; infoLab.textContent='Informações passadas ao Cliente'; infoBlock.appendChild(infoLab);
    const infoHint = document.createElement('div'); infoHint.className='form-hint'; infoHint.textContent = 'Deve-se reforçar com o cliente, após repassar qualquer informação, se ele possui alguma dúvida. É importante esclarecer que a assinatura realizada na baixa da OS confirma que o cliente compreendeu plenamente todas as informações e orientações fornecidas.'; infoHint.style.marginBottom = '10px'; infoBlock.appendChild(infoHint);
    const infoChoices = document.createElement('div'); infoChoices.className='choices'; infoChoices.style.display='flex'; infoChoices.style.flexDirection='column'; infoChoices.style.gap='6px'; infoChoices.style.alignItems='flex-start';
    function addInfoCheck(id, text){ const lbl=document.createElement('label'); lbl.className='choice'; const inp=document.createElement('input'); inp.type='checkbox'; inp.id=id; inp.name=id; const span=document.createElement('span'); span.textContent=text; lbl.appendChild(inp); lbl.appendChild(span); infoChoices.appendChild(lbl); }
    addInfoCheck('cli_info_reiniciar','Necessidade de Reiniciar o Roteador (a cada três dias/ 1 semana)');
    addInfoCheck('cli_info_redes','Diferença entre as Redes 2.4 GHz e 5 GHz do WiFi');
    addInfoCheck('cli_info_distribuicao','Distribuição de Banda Larga entre os ativos');
    addInfoCheck('cli_info_tvbox','Problemas com TVBox e IPTV não Homologados pela Anatel');
    addInfoCheck('cli_info_limpeza','Manutenção da Limpeza dos Aparelhos');
    addInfoCheck('cli_info_interferencias','Como Evitar Interferências (Micro-ondas, Outros aparelhos eletrônicos, paredes e etc...)');
    addInfoCheck('cli_info_velocidade','Como Realizar testes de velocidade');
    addInfoCheck('cli_info_lentidao','Como Realizar Testes de Lentidão');
    addInfoCheck('cli_info_cabear','Necessidade de Cabear Ativos e o porque');
    addInfoCheck('cli_info_repetidores','Problema no uso de Repetidores');
    addInfoCheck('cli_info_sem_rede','Wifi sem Rede');
    addInfoCheck('cli_info_oscilacoes','Oscilações em Períodos Específicos');
    addInfoCheck('cli_info_qtd_ativos','Quantidade de Ativos conectados ao Roteador');
    addInfoCheck('cli_info_segundo_ponto','Segundo ponto');
    addInfoCheck('cli_info_ativos_antigos','Ativos Antigos');
    addInfoCheck('cli_info_manut_cabos','Manutenção de Cabos de Rede (Necessidade e como fazer o básico)');
    addInfoCheck('cli_info_router_externo','Problemas do Router em área externa (Avarias e cobranças por mau uso)');
    addInfoCheck('cli_info_interf_24','Intreferência da rede 2.4 em apartamentos');
    addInfoCheck('cli_info_treinamento','Treinamento Básico de Análise de Rede');
    addInfoCheck('cli_info_wifiman','WiFiman: Análise de canal e distribuição do Wi-Fi');
    addInfoCheck('cli_info_speedtest','SpeedTest: Teste de velocidade em conexões cabeadas e Wi-Fi');
    addInfoCheck('cli_info_downdetector','Downdetector');
    infoBlock.appendChild(infoChoices);
    sec.appendChild(infoBlock);

    // Campo de Texto adicional
    const infoTextBlock = document.createElement('div'); infoTextBlock.className='form-block';
    const infoTextLab = document.createElement('label'); infoTextLab.className='form-label'; infoTextLab.textContent='Descreva neste campo quaisquer informações adicionais que não se enquadrem na lista acima.'; infoTextBlock.appendChild(infoTextLab);
    const infoText = document.createElement('textarea'); infoText.id='cli_info_texto'; infoText.name='cli_info_texto'; infoText.className='form-input--underline auto-expand'; infoText.placeholder='Digite aqui as informações adicionais...'; infoText.rows = 3; infoText.dataset.minHeight = '96'; infoTextBlock.appendChild(infoText);
    const infoCounter = document.createElement('div'); infoCounter.className='textarea-counter'; infoCounter.textContent = '0 caracteres'; infoTextBlock.appendChild(infoCounter);
    sec.appendChild(infoTextBlock);

    // Pergunta final: deseja acrescentar informações adicionais sobre a visita técnica?
    const qBlock = document.createElement('div'); qBlock.className='form-block';
    const qLab = document.createElement('label'); qLab.className='form-label'; qLab.textContent='Deseja acrescentar informações adicionais sobre a visita técnica?'; qBlock.appendChild(qLab);
    const seg = document.createElement('div'); seg.className = 'segmented'; seg.setAttribute('role','radiogroup'); seg.setAttribute('aria-label','Adicionar informações adicionais');
    const mkRadio = (namePrefix, val, text, icon) => { const inp = document.createElement('input'); inp.type='radio'; inp.id=namePrefix+'_'+val; inp.name=namePrefix; inp.value=val; const lab = document.createElement('label'); lab.setAttribute('for', inp.id); lab.innerHTML = (icon ? ('<i class="fa-solid '+icon+'"></i> ') : '') + text; seg.appendChild(inp); seg.appendChild(lab); return inp; };
    const groupName = (formId === 'suporte-moto') ? 'moto_desc_extra' : 'desc_extra';
    const rSim = mkRadio(groupName,'sim','Sim','fa-check');
    mkRadio(groupName,'nao','Não','fa-xmark');
    qBlock.appendChild(seg);
    sec.appendChild(qBlock);

    const cond = document.createElement('div'); cond.className='form-block';
    cond.setAttribute('data-when-field', groupName);
    cond.setAttribute('data-when-equals','sim');
    cond.setAttribute('data-clear-on-hide','1');
    try { cond.setAttribute('hidden','hidden'); } catch {}
    sec.appendChild(cond);

    const ensureTextarea = () => {
      if (container.querySelector('#descricao_os')) return;
      const lab = document.createElement('label'); lab.className='form-label'; lab.textContent = (formId === 'suporte-moto') ? 'Relatos adicionais para a visita técnica:' : 'Relato da solução para a visita técnica:';
      const ta = document.createElement('textarea'); ta.id='descricao_os'; ta.name='descricao_os'; ta.className='form-input--underline auto-expand'; ta.placeholder = (formId === 'suporte-moto') ? 'Digite aqui os relatos adicionais...' : 'Digite aqui o relato da solução...'; ta.rows = 4; ta.dataset.minHeight = '120';
      const counter = document.createElement('div'); counter.className='textarea-counter'; counter.textContent = '0 caracteres';
      cond.appendChild(lab); cond.appendChild(ta); cond.appendChild(counter);
      try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
      try { if (typeof setupAutoExpand === 'function') setupAutoExpand(container); } catch {}
    };
    const removeTextarea = () => {
      const ta = container.querySelector('#descricao_os');
      const secTa = ta ? (ta.closest && ta.closest('.form-section')) : null;
      if (ta && secTa === sec) {
        try {
          const lab = ta.previousElementSibling; const counter = ta.nextElementSibling;
          if (lab && lab.classList && lab.classList.contains('form-label')) lab.remove();
          if (counter && counter.classList && counter.classList.contains('textarea-counter')) counter.remove();
          ta.remove();
        } catch {}
        try { if (typeof setFormState === 'function') setFormState(formId, { descricao_os: '' }); } catch {}
      }
      try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
    };
    const update = () => {
      try {
        const sel = container.querySelector(`input[name="${groupName}"]:checked`);
        const v = (sel && sel.value || '').toLowerCase();
        if (v === 'sim') ensureTextarea(); else removeTextarea();
      } catch {}
    };
    try { container.addEventListener('change', (e)=>{ const t=e.target; if (!t) return; if ((t.name||'')===groupName) update(); }, true); } catch {}
    try { const st = container.__prefillState || {}; if (st && typeof st['descricao_os'] === 'string' && st['descricao_os'].trim() !== '') { rSim.checked = true; } } catch {}

    try { const actions = container.querySelector('.form-actions'); if (actions) container.insertBefore(sec, actions); else container.appendChild(sec); } catch { container.appendChild(sec); }
    try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
    update();
  }

  // Formatação para cópia: normaliza 'Sinal da fibra' conforme regras solicitadas
  function formatSinalFibraForCopy(raw){
    try {
      const d = String(raw || '').replace(/\D/g,'');
      if (!d) return '';
      const n = d.length;
      let intPart = '00';
      let fracPart = '00';
      if (n === 1) {
        intPart = ('0' + d);
        fracPart = '00';
      } else if (n === 2) {
        intPart = d;
        fracPart = '00';
      } else {
        intPart = (d.slice(0,2).padStart(2,'0'));
        const rest = d.slice(2,4);
        if (rest.length === 0) fracPart = '00';
        else if (rest.length === 1) fracPart = rest + '0';
        else fracPart = rest;
      }
      return `-${intPart}.${fracPart}dBm`;
    } catch { return raw || ''; }
  }







// Unified renderer from FORMS_CATALOG (overrides previous definitions)
(function(){
  const conclGrid = document.getElementById('listaConclusoes');
  const emptyConcl = document.getElementById('conclusoesEmpty');
  window.renderForms = function renderForms(){
    if (!conclGrid || !emptyConcl) return;
    const team = localStorage.getItem('unificado.selectedTeam') || 'moto';
    // Helpers: assinatura de formulário e última modificação automática
    function __hashString(s){ try { let h=5381; for (let i=0;i<s.length;i++){ h=((h<<5)+h) ^ s.charCodeAt(i); } return (h>>>0).toString(36); } catch { return String(Math.random()).slice(2); } }
    function __fmtToday(){ try { const d=new Date(); const dd=String(d.getDate()).padStart(2,'0'); const mm=String(d.getMonth()+1).padStart(2,'0'); const yyyy=String(d.getFullYear()); return dd+'/'+mm+'/'+yyyy; } catch { return '-'; } }
    function __ensureLastMod(id, def){
      try {
        const keySig = `unificado.formSig.${id}`;
        const keyDate = `unificado.formLastMod.${id}`;
        const src = [def?.render?.toString?.()||'', def?.titulo||'', def?.descricao||'', def?.icon||''].join('|');
        const sig = __hashString(src);
        const prev = localStorage.getItem(keySig) || '';
        if (prev !== sig){
          localStorage.setItem(keySig, sig);
          const today = __fmtToday();
          localStorage.setItem(keyDate, today);
          return today;
        }
        const saved = localStorage.getItem(keyDate);
        return saved || def.atualizadoEm || '-';
      } catch { return def?.atualizadoEm || '-'; }
    }
      const items = Object.entries(FORMS_CATALOG).map(([id, def]) => ({
        id,
        equipe: def.equipe,
        titulo: def.titulo,
        descricao: def.descricao,
        atualizadoEm: __ensureLastMod(id, def),
        icon: def.icon || 'fa-screwdriver-wrench',
        badge: def.badge || 'red'
      }))
      .filter(f => {
        if (f.equipe !== team) return false;
        if (f.id === 'comunicado-ausencia') return false; // não exibir na grade de formulários
        // Ocultar formulários incorporados por unificação
        if (f.id === 'cabeamento-dispositivo') return false;
        if (f.id === 'quebra-de-slot') return false;
        return true;
      });
    // Ordenação customizada dos cards por formulário (equipes específicas)
    try {
      const orderMap = {
        // Equipe Carro: colocar 'Suporte Técnico' como segundo
        'instalacoes-mudancas': 1,
        'suporte-tecnico-carro': 2,
        'ponto-adicional': 3
      };
      items.sort((a,b) => (orderMap[a.id]||999) - (orderMap[b.id]||999));
    } catch {}
    conclGrid.innerHTML = '';
    if (!items.length) { emptyConcl.style.display = 'block'; return; }
    emptyConcl.style.display = 'none';
    const palette = ['red','violet','blue','green','orange','teal','pink','indigo'];
      const badgeMap = {
        'suporte-moto': 'red',
        'retencao-clientes': 'violet',
        'retirada-equipamentos': 'orange',
        'instalacoes-mudancas': 'blue',
        'ponto-adicional': 'green',
        'suporte-tecnico-carro': 'indigo',
        'inviabilidade-tecnica': 'pink',
        'retirada-equipamentos-carro': 'orange'
      };
    items.forEach((f, idx) => {
      const card = document.createElement('div');
      card.className = 'formcard';
      const color = badgeMap[f.id] || palette[idx % palette.length];
      const badgeClass = 'formcard__badge--' + color;
      card.innerHTML =
        '<div class="formcard__head">' +
        '  <div class="formcard__badge ' + badgeClass + '"><i class="fa-solid ' + f.icon + '"></i></div>' +
        '  <div>' +
        '    <div class="formcard__title">' + f.titulo + '</div>' +
        '    <div class="formcard__desc">' + f.descricao + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="formcard__meta">' +
        '  <div><i class="fa-regular fa-clock"></i> Última modificação em ' + f.atualizadoEm + '</div>' +
        '</div>' +
        '<div class="formcard__actions">' +
        '  <button class="btn-primary"><i class="fa-solid fa-plus"></i> Abrir</button>' +
        '</div>';
      try {
        const metaDiv = card.querySelector('.formcard__meta div');
        if (metaDiv) metaDiv.innerHTML = '<i class="fa-regular fa-clock"></i> Última modificação em ' + f.atualizadoEm;
      } catch {}
      conclGrid.appendChild(card);
      try {
        var btn = card.querySelector('.btn-primary');
        if (btn) {
          btn.addEventListener('click', function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            location.hash = '/form/' + f.id;
          });
        }
        card.addEventListener('click', function () {
          location.hash = '/form/' + f.id;
        });
      } catch (e) {}
    });
  };
  try { if (typeof __updateHomeCountsFromCatalog === 'function') __updateHomeCountsFromCatalog(); } catch {}
})();

// Garantia: se a página carregar diretamente em #/conclusoes
// e renderForms ainda não tinha sido chamada antes, chama agora
try {
  const __routeOnLoad = (location.hash || '#/').replace('#','');
  if (__routeOnLoad.startsWith('/conclusoes') && typeof window.renderForms === 'function') {
    window.renderForms();
  }
} catch {}



































// Ao fechar/atualizar, salva rascunho do formulário atual
try {
  window.addEventListener('beforeunload', function(){
    try {
      const route = (location.hash || '#/').replace('#','');
      if (route.startsWith('/form/')){
        const formId = route.split('/')[2] || '';
        if (formId && typeof window.__upsertDraftHistory === 'function') {
          const st = (typeof getFormState==='function') ? getFormState(formId) : {};
          window.__upsertDraftHistory(formId, st);
        }
      }
    } catch {}
  });
} catch {}

// ======================= Suporte Moto: Draft Refactor =======================
// Dedicated persistence for form 'suporte-moto':
// - Snapshot-based save to localStorage on input/change with debounce
// - MutationObserver to catch dynamic lists
// - Lazy-load from localStorage via getFormState override
function wireMotoDraft(formId, container){
  try {
    if (!container) return;
    if (formId !== 'suporte-moto') return;
    // remove previous custom handlers
    try {
      if (container.__motoPersistHandler){
        container.removeEventListener('input', container.__motoPersistHandler, true);
        container.removeEventListener('change', container.__motoPersistHandler, true);
      }
    } catch {}
    const scheduleSave = (() => {
      let to=null;
      const save = () => {
        try {
          const st = (typeof collectCurrentFormState === 'function') ? collectCurrentFormState(container) : {};
          try { FORM_TMP_STATE[formId] = { ...(st||{}) }; } catch {}
          try { localStorage.setItem(formStateKey(formId), JSON.stringify(st)); } catch {}
          // Também reflete no histórico de rascunhos para aparecer completo na listagem
          try { if (typeof window.__upsertDraftHistory === 'function') window.__upsertDraftHistory(formId, st); } catch {}
        } catch {}
      };
      return () => { try { clearTimeout(to); } catch {}; to = setTimeout(save, 350); };
    })();
    const handler = (e) => {
      try {
        if (!e || !e.target) return;
        const t = e.target;
        const name = (t && (t.name || t.id)) || '';
        // Espelha imediatamente o valor alterado no estado em memória
        try {
          if (name && typeof setFormState === 'function') {
            let val;
            if (t.type === 'radio') { if (!t.checked) return; val = t.value; }
            else if (t.type === 'checkbox') { val = !!t.checked; }
            else { val = t.value; }
            setFormState(formId, { [name]: val });
          }
        } catch {}
        // Persiste snapshot com debounce
        scheduleSave();
        // Reavalia condicionais imediatamente (usa getFormState)
        try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
      } catch {}
    };
    container.__motoPersistHandler = handler;
    container.addEventListener('input', handler, true);
    container.addEventListener('change', handler, true);
    // Observe dynamic changes (rows added/removed)
    try {
      if (container.__motoObserver) { try { container.__motoObserver.disconnect(); } catch {} }
      const obs = new MutationObserver(() => scheduleSave());
      obs.observe(container, { childList:true, subtree:true, attributes:true });
      container.__motoObserver = obs;
    } catch {}
    // initial save
    scheduleSave();
  } catch {}
}

// Override startDraftAutosave to skip for 'suporte-moto'
try {
  if (!window.__startDraftAutosaveWrapped){
    window.__startDraftAutosaveWrapped = true;
    const __origStart = startDraftAutosave;
    startDraftAutosave = function(formId, container){
      if (formId === 'suporte-moto') return; // skip, use wireMotoDraft
      return __origStart.apply(this, arguments);
    };
  }
  // Utilitário: garante inserir/mover uma seção após uma âncora; caso não haja âncora, insere antes de `.form-actions` ou no final
  function ensureSectionAfter(anchorSection, newSection){
    try {
      if (!newSection) return;
      // Determina o container destino prioritariamente como o pai compartilhado
      let container = null;
      if (anchorSection && anchorSection.parentNode && newSection.parentNode && anchorSection.parentNode === newSection.parentNode) {
        container = anchorSection.parentNode;
      } else {
        container = (newSection.parentNode) || (anchorSection && anchorSection.parentNode) || null;
      }
      if (!container) return;
      if (anchorSection && anchorSection.parentNode === container) {
        // Insere imediatamente após a âncora
        try { if (newSection.previousElementSibling !== anchorSection) container.insertBefore(newSection, anchorSection.nextSibling); } catch {}
      } else {
        // Sem âncora: tenta inserir antes de `.form-actions`, senão no final do container
        try {
          const actions = container.querySelector && container.querySelector('.form-actions');
          if (actions && actions.parentNode === container) container.insertBefore(newSection, actions); else container.appendChild(newSection);
        } catch { try { container.appendChild(newSection); } catch {} }
      }
      // Reavalia condicionais após inserir/mover a seção
      try { const formId = (container && container.__formId) || ''; if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
    } catch {}
  }

  // Garante que a seção INDICAÇÃO exista e esteja logo abaixo de AJUDA INTERNA
  function ensureIndicacaoPosition(container){
    try {
      if (!container) return;
      const formId = (container && container.__formId) || '';
      if (formId !== 'suporte-moto') return;
      let indic = container.querySelector('[data-section="indicacao"]');
      if (!indic) { try { appendIndicacaoSection(container); } catch {} indic = container.querySelector('[data-section="indicacao"]'); }
      if (!indic) return;
      const ajuda = container.querySelector('[data-section="ajuda-interna"]');
      ensureSectionAfter(ajuda, indic);
    } catch {}
  }
  // Garante que a seção INDICAÇÃO fique acima de "DESCRIÇÃO DA O.S" em qualquer formulário
  function ensureIndicacaoBeforeDescricao(container){
    try {
      if (!container) return;
      const fid = (container && container.__formId) || '';
      if (fid === 'comunicado-ausencia') return; // não aplicar neste formulário exclusivo
      let indic = container.querySelector('[data-section="indicacao"]');
      if (!indic) { try { appendIndicacaoSection(container); } catch {} indic = container.querySelector('[data-section="indicacao"]'); }
      if (!indic) return;
      // Localiza a seção de descrição mesmo quando o textarea ainda não existe
      let descSec = container.querySelector('[data-section="descricao-os"]');
      if (!descSec) {
        const desc = container.querySelector('#descricao_os');
        descSec = desc ? (desc.closest && desc.closest('.form-section')) : null;
      }
      if (descSec && descSec.parentNode === container){
        // posiciona INDICAÇÃO imediatamente antes da seção de DESCRIÇÃO DA O.S
        try { if (indic.nextElementSibling !== descSec) container.insertBefore(indic, descSec); } catch {}
      } else {
        // fallback: antes das ações
        try { const actions = container.querySelector('.form-actions'); if (actions && actions.parentNode === container) container.insertBefore(indic, actions); } catch {}
      }
      try { const formId = (container && container.__formId) || ''; if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
    } catch {}
  }
  // Visibilidade da seção INDICAÇÕES no formulário Retenção
  function ensureIndicacaoVisibilityForRetencao(container){
    try {
      if (!container) return;
      const fid0 = (container && container.__formId) || '';
      if (fid0 === 'comunicado-ausencia') return; // não aplicar
      const formId = (container && container.__formId) || '';
      if (formId !== 'retencao-clientes') return;
      let indic = container.querySelector('[data-section="indicacao"]');
      if (!indic) { try { appendIndicacaoSection(container); } catch {} indic = container.querySelector('[data-section="indicacao"]'); }
      if (!indic) return;
      // Captura valor atual do DOM (fallback ao estado em memória)
      let v = '';
      try { const sel = container.querySelector('input[name="ret_atendido_local"]:checked'); if (sel) v = String(sel.value||'').toLowerCase(); } catch {}
      if (!v) {
        try { const state = (typeof getFormState === 'function') ? getFormState(formId) : {}; v = String(state['ret_atendido_local'] || '').toLowerCase(); } catch {}
      }
      const answered = v === 'sim' || v === 'nao' || v === 'não';
      const shouldShow = v === 'sim';
      if (!answered || !shouldShow){
        // Limpa campos se estava visível e agora deve ocultar
        try {
          indic.querySelectorAll('input, select, textarea').forEach(el => {
            const key = el.name || el.id;
            if (el.type === 'radio' || el.type === 'checkbox') el.checked = false; else el.value = '';
            try { const cur = getFormState(formId) || {}; if (key) delete cur[key]; } catch {}
          });
        } catch {}
        try { indic.setAttribute('hidden','hidden'); } catch {}
      } else {
        try { indic.removeAttribute('hidden'); } catch {}
        // Garante posição acima de DESCRIÇÃO
        try { ensureIndicacaoBeforeDescricao(container); } catch {}
      }
    } catch {}
  }
  // Enforce final order for Moto form sections: TROCA -> AJUDA -> INDICAÇÕES -> DESCRIÇÃO
  function enforceMotoFinalOrder(container){
    try {
      if (!container) return;
      const formId = (container && container.__formId) || '';
      if (formId !== 'suporte-moto') return;
      const troca = container.querySelector('[data-section="troca-equipamentos"]');
      const ajuda = container.querySelector('[data-section="ajuda-interna"]');
      const indic = container.querySelector('[data-section="indicacao"]');
      // Enxerga a seção de descrição mesmo sem o textarea existir ainda
      let descSec = container.querySelector('[data-section="descricao-os"]');
      if (!descSec) {
        const desc = container.querySelector('#descricao_os');
        descSec = desc ? (desc.closest && desc.closest('.form-section')) : null;
      }
      // Ajuda após Troca
      if (troca && ajuda) { try { ensureSectionAfter(troca, ajuda); } catch {} }
      // Indicação após Ajuda
      if (ajuda && indic) { try { ensureSectionAfter(ajuda, indic); } catch {} }
      // Descrição após Indicação
      if (indic && descSec) { try { ensureSectionAfter(indic, descSec); } catch {} }
      // Fallbacks
      if (!indic && ajuda && descSec) { try { ensureSectionAfter(ajuda, descSec); } catch {} }
      if (!ajuda && troca && descSec) { try { ensureSectionAfter(troca, descSec); } catch {} }
      try { ensureFormActionsAtEnd(container); } catch {}
    } catch {}
  }
  // Garante que o bloco de ações (Limpar/Copiar) fique no final do formulário
  function ensureFormActionsAtEnd(container){
    try {
      if (!container) return;
      const actions = container.querySelector('.form-actions');
      if (!actions) return;
      if (actions.parentNode === container) {
        const last = container.lastElementChild;
        if (last !== actions) {
          container.appendChild(actions);
        }
      }
    } catch {}
  }
  // Suporte Moto: define valor padrão de 'tipo_serv' para destravar condicionais antigas
  function ensureMotoTipoServDefault(container){
    try {
      if (!container) return;
      const formId = (container && container.__formId) || '';
      if (formId !== 'suporte-moto') return;
      let inp = container.querySelector('input[name="tipo_serv"]');
      if (!inp) {
        inp = document.createElement('input');
        inp.type = 'hidden'; inp.id = 'tipo_serv'; inp.name = 'tipo_serv'; inp.value = 'instalacao';
        try { container.appendChild(inp); } catch {}
      }
      try { if (typeof setFormState === 'function') setFormState(formId, { tipo_serv: inp.value }); } catch {}
      try { if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
    } catch {}
  }
  // Form Carro: garante campo de justificativa quando fotos não forem anexadas
  function ensureFotosJustificativa(container){
    try {
      if (!container) return;
      // Procura o bloco da pergunta de fotos (aceita 'fotos_anex' ou 'fotos_equip')
      const fotosBlock = Array.from(container.querySelectorAll('.form-block')).find(b => {
        if (!b.querySelector) return false;
        return !!(b.querySelector('input[name="fotos_anex"]') || b.querySelector('input[name="fotos_equip"]'));
      });
      if (!fotosBlock) return;
      // Evita duplicar se já existir o input de justificativa
      if (container.querySelector('#fotos_just')) return;
      const just = document.createElement('div'); just.className='form-block';
      // Vincula a condicional ao campo encontrado
      let whenField = 'fotos_anex';
      try {
        if (fotosBlock.querySelector('input[name="fotos_equip"]')) whenField = 'fotos_equip';
      } catch {}
      just.setAttribute('data-when-field', whenField);
      just.setAttribute('data-when-equals','nao');
      just.setAttribute('data-clear-on-hide','1');
      const lab = document.createElement('label'); lab.className='form-label'; lab.htmlFor='fotos_just'; lab.textContent='Justifique o motivo de não ter anexado:';
      const inp = document.createElement('input'); inp.id='fotos_just'; inp.name='fotos_just'; inp.type='text'; inp.className='form-input--underline'; inp.placeholder='Digite...';
      just.appendChild(lab); just.appendChild(inp);
      fotosBlock.insertAdjacentElement('afterend', just);
      try { const formId = (container && container.__formId) || ''; if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
    } catch {}
  }
  // Observador global para reforçar setups/condicionais após inserções dinâmicas
  function wireDynamicEnhancers(formId, container){
    try {
      if (!container) return;
      if (container.__dynEnhancerObs) { try { container.__dynEnhancerObs.disconnect(); } catch {} }
      let to = null;
      const run = () => {
        try {
          if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container);
          if (formId === 'suporte-moto') { try { ensureIndicacaoPosition(container); } catch {} }
          if (formId !== 'comunicado-ausencia') { try { ensureIndicacaoBeforeDescricao(container); } catch {} }
          if (formId !== 'comunicado-ausencia') { try { ensureIndicacaoVisibilityForRetencao(container); } catch {} }
          try { ensureSpeedCardLayout(container); } catch {}
          try { ensureVelTestFocusHandlers(container); } catch {}
          try { ensureWanCardLayout(container); } catch {}
          try { setupMacLists(container); } catch {}
          try { setupOutroList(container); } catch {}
          try { ensureFotosJustificativa(container); } catch {}
          // Remover contadores de caracteres para leveza
          try { container.querySelectorAll('.textarea-counter').forEach(el => { try { el.remove(); } catch {} }); } catch {}
          try { setupCabometrosMaskAndCost(container); } catch {}
          try { setupQtdCabosDispLabel(container); } catch {}
          try { ensureMotoTipoServDefault(container); } catch {}
          try { enforceMotoFinalOrder(container); } catch {}
          try { setupAutoExpand(container); } catch {}
        } catch {}
      };
      const obs = new MutationObserver(() => { try { clearTimeout(to); } catch {}; to = setTimeout(run, 50); });
      obs.observe(container, { childList:true, subtree:true });
      container.__dynEnhancerObs = obs;
      run();
    } catch {}
  }
  
  // Sessão: INDICAÇÃO (apenas Suporte Moto)
  function appendIndicacaoSection(container){
    if (!container) return;
    // Evita duplicação se já existir
    try { if (container.querySelector('[data-section="indicacao"]')) return; } catch {}
    const sec = document.createElement('section'); sec.className = 'form-section'; sec.setAttribute('data-section','indicacao');
    try { const head = document.createElement('div'); head.className='form-header'; const ttl = document.createElement('div'); ttl.className='form-title'; ttl.innerHTML = '<i class="fa-solid fa-bullhorn"></i> INDICAÇÕES'; head.appendChild(ttl); sec.appendChild(head); } catch {}
    const addBlock = (opts) => {
      const b=document.createElement('div'); b.className='form-block';
      if (opts.whenField){ b.setAttribute('data-when-field', opts.whenField); }
      if (opts.whenEquals!=null){ b.setAttribute('data-when-equals', String(opts.whenEquals)); }
      if (opts.whenIn){ b.setAttribute('data-when-in', String(opts.whenIn)); }
      if (opts.clearOnHide){ b.setAttribute('data-clear-on-hide','1'); }
      if (opts.label){ const l=document.createElement('label'); l.className='form-label'; l.textContent=opts.label; b.appendChild(l); }
      if (opts.content) b.appendChild(opts.content);
      sec.appendChild(b); return b;
    };
    const makeSegmented = (name, items) => {
      const wrap = document.createElement('div');
      const cls = (items && items.length === 2) ? 'segmented' : 'segmented segmented--stack';
      wrap.className = cls; wrap.setAttribute('role','radiogroup');
      items.forEach(it => {
        const val = String(it[0]||'').toLowerCase();
        const text = String(it[1]||'');
        const inpt=document.createElement('input'); inpt.type='radio'; inpt.id=name+'_'+it[0]; inpt.name=name; inpt.value=it[0];
        const lab=document.createElement('label'); lab.setAttribute('for', inpt.id);
        if (val === 'sim') lab.innerHTML = '<i class="fa-solid fa-check"></i> ' + text;
        else if (val === 'nao' || val === 'não') lab.innerHTML = '<i class="fa-solid fa-xmark"></i> ' + text;
        else lab.textContent = text;
        wrap.appendChild(inpt); wrap.appendChild(lab);
      });
      return wrap;
    };
    // Pergunta 1
    addBlock({ label:'Foi solicitado alguma indicação para o cliente?', content: makeSegmented('ind_solicitada', [['sim','Sim'],['nao','Não']]) });
    // Se NÃO: motivo
    const motivo = document.createElement('input'); motivo.type='text'; motivo.id='ind_motivo'; motivo.name='ind_motivo'; motivo.className='form-input--underline'; motivo.placeholder='Descreva o motivo...';
    addBlock({ whenField:'ind_solicitada', whenEquals:'nao', clearOnHide:1, label:'Informe o motivo pelo qual não solicitou:', content: motivo });
    // Se SIM: pergunta 2
    addBlock({ whenField:'ind_solicitada', whenEquals:'sim', clearOnHide:1, label:'O cliente teve alguma indicação para passar?', content: makeSegmented('ind_cliente_tem', [['sim','Sim'],['nao','Não']]) });
    // Botão do grupo (sempre visível) + mensagem condicional acima dele
    const ctaWrap = document.createElement('div'); ctaWrap.style.textAlign = 'center'; ctaWrap.style.marginTop = '4px';
    const msg = document.createElement('div'); msg.className='form-hint'; msg.style.textAlign='center'; msg.style.fontStyle='italic'; msg.style.marginBottom='6px'; msg.textContent='';
    ctaWrap.appendChild(msg);
    const btn = document.createElement('a'); btn.href='https://chat.whatsapp.com/BoQZOFhgU9jFBEav8EoUfq'; btn.target='_blank'; btn.rel='noopener';
    btn.className='btn-action btn-gradient-red';
    btn.style.width='100%'; btn.style.display='inline-flex'; btn.style.minWidth='160px'; btn.style.justifyContent='center';
    btn.style.padding='8px 12px'; btn.style.fontSize='13px';
    btn.textContent='Grupo de Indicações';
    ctaWrap.appendChild(btn);
    addBlock({ content: ctaWrap });
    // Controla visibilidade e texto da mensagem dentro do mesmo bloco
    const updateMsg = () => {
      try {
        const sel = container.querySelector('input[name="ind_cliente_tem"]:checked');
        const v = (sel && sel.value || '').toLowerCase();
        if (v === 'sim') { msg.textContent = 'Ótimo! Não esqueça de mandar no grupo de indicações 😉'; msg.style.display = 'block'; }
        else if (v === 'nao' || v === 'não') { msg.textContent = 'Continue tentando, o próximo com certeza irá te passar uma indicação 😊'; msg.style.display = 'block'; }
        else { msg.style.display = 'none'; }
      } catch { msg.style.display='none'; }
    };
    try { updateMsg(); } catch {}
    try { container.addEventListener('change', (e)=>{ const t=e.target; if (!t) return; if ((t.name||'')==='ind_cliente_tem') updateMsg(); }, true); } catch {}
    try {
      const actions = container.querySelector('.form-actions');
      if (actions && actions.parentNode === container) container.insertBefore(sec, actions); else container.appendChild(sec);
    } catch { container.appendChild(sec); }
    // Avalia condições imediatamente após inserir a seção
    try { const formId = (container && container.__formId) || ''; if (typeof updateConditionalVisibility === 'function') updateConditionalVisibility(formId, container); } catch {}
  }
} catch {}

// Override wireFormPersistence to route 'suporte-moto' to custom wire
try {
  if (!window.__wireFormPersistenceWrapped){
    window.__wireFormPersistenceWrapped = true;
    const __origWire = wireFormPersistence;
    wireFormPersistence = function(formId, container){
      if (formId === 'suporte-moto'){ try { wireMotoDraft(formId, container); } catch {} return; }
      return __origWire.apply(this, arguments);
    };
  }
} catch {}

// Lazy-load state for 'suporte-moto' from localStorage on first access
try {
  if (!window.__getFormStateWrapped){
    window.__getFormStateWrapped = true;
    const __origGet = getFormState;
    getFormState = function(id){
      try {
        if (id === 'suporte-moto'){
          const cur = __origGet.call(this, id) || {};
          if (!cur || Object.keys(cur).length === 0){
            try {
              const raw = localStorage.getItem(formStateKey(id));
              if (raw){
                const parsed = JSON.parse(raw);
                try { FORM_TMP_STATE[id] = { ...(parsed||{}) }; } catch {}
                return parsed || {};
              }
            } catch {}
          }
        }
      } catch {}
      return __origGet.call(this, id);
    };
  }
} catch {}



































// Seção: Testes relacionados a lentidão
function appendLentidaoTests(container){
  try { if (!container) return; } catch { return; }
  try { if (container.querySelector('.form-block[data-lentidao="1"]')) return; } catch {}
  try {
    const block = document.createElement('div');
    block.className = 'form-block lentidao-block';
    block.setAttribute('data-lentidao','1');
    block.innerHTML = ''
      + '  <div class="form-header lentidao-header">'
      + '    <div class="form-title">Testes relacionados a lentid\u00E3o</div>'
      + '  </div>'
      + '  <div class="lentidao-card lentidao-card--ping">'
      + '    <div class="lentidao-card__header"><span class="lentidao-card__title"><i class="fa-solid fa-tachograph-digital"></i> Pings</span></div>'
      + '    <div class="form-hint">Campo relacionado a todos os testes de ping realizados no local.</div>'
      + '    <div class="lentidao-list" data-lent-ping-list="1"></div>'
      + '    <button type="button" class="btn-ghost lent-add" data-lent-ping-add="1"><i class="fa-solid fa-plus"></i> Adicionar ping</button>'
      + '  </div>'
      + '  <div class="lentidao-card lentidao-card--tracert">'
      + '    <div class="lentidao-card__header"><span class="lentidao-card__title"><i class="fa-solid fa-route"></i> Tracert</span></div>'
      + '    <div class="form-hint">Campo para agrupar todos os tracerts realizados no local.</div>'
      + '    <div class="lentidao-list" data-lent-tracert-list="1"></div>'
      + '    <button type="button" class="btn-ghost lent-add" data-lent-tracert-add="1"><i class="fa-solid fa-plus"></i> Adicionar tracert</button>'
      + '  </div>';

    const anchor = container.querySelector('#mapa_calor_desc')?.closest('.form-block') || container.querySelector('[data-conf-rot="1"]') || container;
    if (anchor && anchor.parentElement) anchor.insertAdjacentElement('afterend', block);
    else container.appendChild(block);

    const addPing = () => {
      const list = block.querySelector('[data-lent-ping-list="1"]'); if (!list) return;
      const idx = Array.from(list.querySelectorAll('[data-ping-item]')).reduce((m, el) => { const n = parseInt(el.getAttribute('data-idx') || '0', 10) || 0; return Math.max(m, n); }, 0) + 1;
      const item = document.createElement('div');
      item.className = 'lent-entry';
      item.setAttribute('data-ping-item','1');
      item.setAttribute('data-idx', String(idx));
      item.innerHTML = ''
        + '  <div class="lent-entry__header">'
        + '    <div class="lent-entry__badge"><i class="fa-solid fa-wave-square"></i> Ping ' + idx + '</div>'
        + '    <button type="button" class="btn-ghost lent-remove" data-remove-ping="' + idx + '"><i class="fa-solid fa-trash-can"></i> Remover ping</button>'
        + '  </div>'
        + '  <label class="form-label">Título do teste</label>'
        + '  <input type="text" class="form-input--underline" name="ping_titulo_' + idx + '" placeholder="Ex.: Ativo do cliente ou da empresa" />'
        + '  <label class="form-label">Resultados obtidos</label>'
        + '  <div class="lent-grid">'
        + '    <input type="text" class="form-input--underline" name="ping_minima_' + idx + '" placeholder="Mínima" inputmode="decimal" />'
        + '    <input type="text" class="form-input--underline" name="ping_media_' + idx + '" placeholder="Média" inputmode="decimal" />'
        + '    <input type="text" class="form-input--underline" name="ping_maxima_' + idx + '" placeholder="Máxima" inputmode="decimal" />'
        + '    <input type="text" class="form-input--underline" name="ping_enviados_' + idx + '" placeholder="Enviados" inputmode="decimal" />'
        + '    <input type="text" class="form-input--underline" name="ping_recebidos_' + idx + '" placeholder="Recebidos" inputmode="decimal" />'
        + '    <input type="text" class="form-input--underline" name="ping_perdidos_' + idx + '" placeholder="Perdidos" inputmode="decimal" />'
        + '  </div>';
      list.appendChild(item);
      // Ajusta inputmode dos campos de 'Resultados obtidos' para decimal
      try {
        const wireDecimal = (el) => {
          if (!el) return;
          const handler = () => {
            try {
              let v = String(el.value || '').replace(/,/g, '.').replace(/[^0-9.]/g, '');
              const parts = v.split('.');
              if (parts.length > 2) v = parts.shift() + '.' + parts.join('');
              el.value = v;
            } catch {}
          };
          el.addEventListener('input', handler);
          el.addEventListener('blur', handler);
          el.setAttribute('inputmode','decimal');
        };
        ['minima','media','maxima','enviados','recebidos','perdidos'].forEach(function(suf){
          wireDecimal(item.querySelector('[name="ping_' + suf + '_' + idx + '"]'));
        });
      } catch {}
      // Persistência imediata ao editar ping
      try {
        const fid = (container && container.__formId) || '';
        Array.from(item.querySelectorAll('input[name]')).forEach((inp) => {
          const onAny = () => {
            try {
              if (fid && typeof setFormState === 'function') setFormState(fid, { [inp.name || inp.id]: inp.value });
              if (fid) {
                const snapshot = collectCurrentFormState(container);
                try { FORM_TMP_STATE[fid] = { ...(snapshot||{}) }; } catch {}
                try { localStorage.setItem(formStateKey(fid), JSON.stringify(snapshot)); } catch {}
              }
            } catch {}
          };
          inp.addEventListener('input', onAny);
          inp.addEventListener('change', onAny);
        });
      } catch {}
    };
    const addTracert = () => {
      const list = block.querySelector('[data-lent-tracert-list="1"]'); if (!list) return;
      const idx = Array.from(list.querySelectorAll('[data-tracert-item]')).reduce((m, el) => { const n = parseInt(el.getAttribute('data-idx') || '0', 10) || 0; return Math.max(m, n); }, 0) + 1;
      const item = document.createElement('div');
      item.className = 'lent-entry';
      item.setAttribute('data-tracert-item','1');
      item.setAttribute('data-idx', String(idx));
      item.innerHTML = ''
        + '  <div class="lent-entry__header">'
        + '    <div class="lent-entry__badge"><i class="fa-solid fa-road"></i> Tracert ' + idx + '</div>'
        + '    <button type="button" class="btn-ghost lent-remove" data-remove-tracert="' + idx + '"><i class="fa-solid fa-trash-can"></i> Remover tracert</button>'
        + '  </div>'
        + '  <label class="form-label">Local do tracert</label>'
        + '  <input type="text" class="form-input--underline" name="tracert_local_' + idx + '" placeholder="Ex.: Ativo do cliente ou da empresa" />'
        + '  <label class="form-label">URL utilizada</label>'
        + '  <input type="text" class="form-input--underline" name="tracert_url_' + idx + '" placeholder="Ex.: https://exemplo.com" />';
      list.appendChild(item);
      // Persistência imediata ao editar tracert
      try {
        const fid = (container && container.__formId) || '';
        Array.from(item.querySelectorAll('input[name]')).forEach((inp) => {
          const onAny = () => {
            try {
              if (fid && typeof setFormState === 'function') setFormState(fid, { [inp.name || inp.id]: inp.value });
              if (fid) {
                const snapshot = collectCurrentFormState(container);
                try { FORM_TMP_STATE[fid] = { ...(snapshot||{}) }; } catch {}
                try { localStorage.setItem(formStateKey(fid), JSON.stringify(snapshot)); } catch {}
              }
            } catch {}
          };
          inp.addEventListener('input', onAny);
          inp.addEventListener('change', onAny);
        });
      } catch {}
    };
    const ensurePingCount = (count) => {
      try {
        const list = block.querySelector('[data-lent-ping-list="1"]');
        if (!list) return;
        const target = Math.max(0, Number(count) || 0);
        while (Array.from(list.querySelectorAll('[data-ping-item]')).length < target) {
          addPing();
        }
      } catch {}
    };
    const ensureTracertCount = (count) => {
      try {
        const list = block.querySelector('[data-lent-tracert-list="1"]');
        if (!list) return;
        const target = Math.max(0, Number(count) || 0);
        while (Array.from(list.querySelectorAll('[data-tracert-item]')).length < target) {
          addTracert();
        }
      } catch {}
    };
    try {
      block.__addPing = addPing;
      block.__addTracert = addTracert;
      block.__ensurePingCount = ensurePingCount;
      block.__ensureTracertCount = ensureTracertCount;
    } catch {}
    try {
      const formId = (container && container.__formId) || '';
      let initialState = {};
      if (container.__prefillState) initialState = container.__prefillState;
      else if (typeof getFormState === 'function' && formId) initialState = getFormState(formId) || {};
      const pingIdx = new Set();
      const tracertIdx = new Set();
      Object.keys(initialState || {}).forEach((key) => {
        const mp = key.match(/^ping_(?:titulo|minima|media|maxima|enviados|recebidos|perdidos)_(\d+)/i);
        if (mp) pingIdx.add(parseInt(mp[1], 10) || 0);
        const mt = key.match(/^tracert_(?:local|url)_(\d+)/i);
        if (mt) tracertIdx.add(parseInt(mt[1], 10) || 0);
      });
      const pingNeeded = pingIdx.size ? Math.max(...pingIdx) : 0;
      const tracertNeeded = tracertIdx.size ? Math.max(...tracertIdx) : 0;
      if (pingNeeded > 0) ensurePingCount(pingNeeded);
      if (tracertNeeded > 0) ensureTracertCount(tracertNeeded);
    } catch {}
    block.addEventListener('click', (ev) => {
      const btn = ev.target && ev.target.closest && ev.target.closest('button'); if (!btn) return;
      const fid = (container && container.__formId) || '';
      if (btn.hasAttribute('data-lent-ping-add')) { ev.preventDefault(); addPing(); }
      else if (btn.hasAttribute('data-lent-tracert-add')) { ev.preventDefault(); addTracert(); }
      else if (btn.hasAttribute('data-remove-ping')) {
        ev.preventDefault();
        const id = btn.getAttribute('data-remove-ping');
        const it = block.querySelector('.lent-entry[data-ping-item="1"][data-idx="' + id + '"]');
        if (it) {
          try {
            Array.from(it.querySelectorAll('input[name]')).forEach((input) => {
              const key = input.name || '';
              if (!key) return;
              try { if (fid && FORM_TMP_STATE && FORM_TMP_STATE[fid]) delete FORM_TMP_STATE[fid][key]; } catch {}
            });
          } catch {}
          it.remove();
          try {
            if (fid) {
              const snapshot = collectCurrentFormState(container);
              if (typeof FORM_TMP_STATE === 'object' && FORM_TMP_STATE !== null) {
                FORM_TMP_STATE[fid] = { ...(snapshot || {}) };
              }
              if (typeof window.__upsertDraftHistory === 'function') {
                window.__upsertDraftHistory(fid, snapshot);
              }
            }
          } catch {}
          try {
            const ensurePing = block.__ensurePingCount;
            if (typeof ensurePing === 'function') {
              const list = block.querySelector('[data-lent-ping-list="1"]');
              const remaining = list ? Array.from(list.querySelectorAll('[data-ping-item]')).length : 0;
              ensurePing(Math.max(remaining, 0));
            }
          } catch {}
        }
      }
      else if (btn.hasAttribute('data-remove-tracert')) {
        ev.preventDefault();
        const id = btn.getAttribute('data-remove-tracert');
        const it = block.querySelector('.lent-entry[data-tracert-item="1"][data-idx="' + id + '"]');
        if (it) {
          try {
            Array.from(it.querySelectorAll('input[name]')).forEach((input) => {
              const key = input.name || '';
              if (!key) return;
              try { if (fid && FORM_TMP_STATE && FORM_TMP_STATE[fid]) delete FORM_TMP_STATE[fid][key]; } catch {}
            });
          } catch {}
          it.remove();
          try {
            if (fid) {
              const snapshot = collectCurrentFormState(container);
              if (typeof FORM_TMP_STATE === 'object' && FORM_TMP_STATE !== null) {
                FORM_TMP_STATE[fid] = { ...(snapshot || {}) };
              }
              if (typeof window.__upsertDraftHistory === 'function') {
                window.__upsertDraftHistory(fid, snapshot);
              }
            }
          } catch {}
          try {
            const ensureTracert = block.__ensureTracertCount;
            if (typeof ensureTracert === 'function') {
              const list = block.querySelector('[data-lent-tracert-list="1"]');
              const remaining = list ? Array.from(list.querySelectorAll('[data-tracert-item]')).length : 0;
              ensureTracert(Math.max(remaining, 0));
            }
          } catch {}
        }
      }
    }, true);
  } catch {}
}





