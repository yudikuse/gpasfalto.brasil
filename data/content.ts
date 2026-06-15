// ============================================================
//  GP ASFALTO BRASIL — CONTEÚDO DO SITE
//  Edite este arquivo para atualizar qualquer texto, número,
//  obra ou informação de contato sem mexer no código.
// ============================================================

export const site = {

  // ── EMPRESA
  company: {
    name:      'GP Asfalto',
    cnpj:      '22.674.189/0001-30',
    razao:     'GPAsfalto Ltda',
    location:  'Rio Verde · GO · Brasil',
    address:   'Rua dos Trabalhadores, 350 — Setor Industrial · CEP 75905-020 · Rio Verde · GO',
    email:     'contato@gpasfalto.com.br',
    instagram: 'https://instagram.com/gp.asfalto',
    phone:     '(64) 98133-0088',
    whatsapp:  '5564999317039',
  },

  // ── CONTATOS (todos os telefones)
  phones: [
    {
      label:    'WhatsApp Principal',
      number:   '(64) 99931-7039',
      whatsapp: '5564999317039',
      isWhatsApp: true,
      primary:  true,
    },
    {
      label:    'WhatsApp Comercial',
      number:   '(64) 98133-0088',
      whatsapp: '5564981330088',
      isWhatsApp: true,
      primary:  false,
    },
    {
      label:    'WhatsApp Alternativo',
      number:   '(64) 99945-2124',
      whatsapp: '5564999452124',
      isWhatsApp: true,
      primary:  false,
    },
    {
      label:    'Fixo',
      number:   '(64) 3622-0902',
      whatsapp: '',
      isWhatsApp: false,
      primary:  false,
    },
  ],

  // ── HERO
  hero: {
    eyebrow:     'Pavimentação\u00A0· Terraplenagem\u00A0· Infraestrutura',
    line1:       'CBUQ PRÓPRIO.',
    line2:       'ENTREGA NO PRAZO.',
    description: 'Da usina à compactação final, a GP Asfalto entrega pavimentação, terraplenagem e infraestrutura com controle técnico, equipe própria e compromisso de cronograma.',
    videoYoutubeId: 'vS6B71Pfu7c',
    videoLocal: 'https://res.cloudinary.com/dfw7h9c2j/video/upload/q_auto:best,ac_none/0608_wbqp6m.mp4',
    videoLocalMobile: 'https://res.cloudinary.com/dfw7h9c2j/video/upload/q_auto:best,ac_none/0608-vertical_ukeq9g.mp4',
  },

  // ── NÚMEROS (trust bar)
  numbers: [
    { value: 40,  suffix: '+', label: 'Anos de\nmercado'           },
    { value: 50,  suffix: '+', label: 'Loteamentos\nentregues'     },
    { value: 3,   suffix: '',  label: 'Usinas CBUQ\nem operação'   },
    { value: 28,  suffix: '',  label: 'Municípios\natendidos'      },
  ],

  // ── OBRAS (cada uma com vídeo do YouTube embedado)
  projects: [
    {
      slug:        'comigo-ponte-de-pedra',
      segment:     'Agronegócio · Goiás',
      title:       'COMIGO\nPONTE DE PEDRA',
      description: 'Terraplenagem, pavimentação CBUQ e drenagem de infraestrutura rural para a cooperativa COMIGO.',
      photo:       '/images/obras/comigo-pp.jpg',
      videoId:     'PvG0aEMyf4Y',
      index:       '01',
    },
    {
      slug:        'nutrien-rio-verde',
      segment:     'Empresa Privada · Rio Verde, GO',
      title:       'NUTRIEN\nRIO VERDE',
      description: 'Infraestrutura e pavimentação asfáltica CBUQ para pátio industrial e área de manobra.',
      photo:       '/images/obras/nutrien.jpg',
      videoId:     'Xne1VjTpzm4',
      index:       '02',
    },
    {
      slug:        'condominio-italia',
      segment:     'Loteamento · Jataí, GO',
      title:       'CONDOMÍNIO\nITÁLIA',
      description: 'Infraestrutura completa: terraplenagem, rede de água tratada, esgoto, galeria pluvial e pavimentação CBUQ.',
      photo:       '/images/obras/condominio-italia.jpg',
      videoId:     '5hUNiYjKfqM',
      index:       '03',
    },
    {
      slug:        'comigo-ipora',
      segment:     'Agronegócio · Iporá, GO',
      title:       'COMIGO\nIPORÁ',
      description: 'Infraestrutura e pavimentação asfáltica CBUQ para unidade da cooperativa COMIGO em Iporá.',
      photo:       '/images/obras/comigo-ipora.jpg',
      videoId:     'KV1QgeEX40U',
      index:       '04',
    },
  ],

  // ── VÍDEOS INSTITUCIONAIS (não duplicar obras aqui)
  videos: [
    {
      id:       'XwOw0FP32DA',
      title:    'Pavimentação Nutrien',
      subtitle: 'Rio Verde · GO',
      tag:      'Bastidores',
    },
    {
      id:       'EhYhPPiYYX8',
      title:    'VT GP Asfalto',
      subtitle: 'Vídeo institucional',
      tag:      'Institucional',
    },
    {
      id:       '-bxy5VSAx3c',
      title:    'VT GP Asfalto 2',
      subtitle: 'Vídeo institucional',
      tag:      'Institucional',
    },
    {
      id:       '-4wzpJ-_I1c',
      title:    'VT GP Asfalto 3',
      subtitle: 'Vídeo institucional',
      tag:      'Institucional',
    },
  ],

  // ── CLIENTES (logos)
  // visualScale: ajuste individual de tamanho pra equilibrar visualmente
  clients: [
    { slug: 'comigo',        name: 'Comigo',                segment: 'Cooperativa Agro',     visualScale: 0.80 },
    { slug: 'nutrien',       name: 'Nutrien',               segment: 'Insumos Agrícolas',    visualScale: 1.00 },
    { slug: 'raizen',        name: 'Raízen',                segment: 'Energia / Bioenergia', visualScale: 1.05 },
    { slug: 'ldc',           name: 'Louis Dreyfus Company', segment: 'Agroindústria',        visualScale: 1.20 },
    { slug: 'mercado-livre', name: 'Mercado Livre',         segment: 'E-commerce',           visualScale: 1.20 },
    { slug: 'grupo-cereal',  name: 'Grupo Cereal',          segment: 'Agroindústria',        visualScale: 1.20 },
    { slug: 'cereal-ouro',   name: 'Cereal Ouro',           segment: 'Agroindústria',        visualScale: 1.00 },
    { slug: 'grupo-fetz',    name: 'Grupo Fetz',            segment: 'Construtora',          visualScale: 0.85 },
    { slug: 'realiza',       name: 'Realiza Construtora',   segment: 'Loteamentos',          visualScale: 1.00 },
  ],

  // ── USINAS
  usinas: [
    { number: '01', name: 'Usina Central',  location: 'Rio Verde · GO · Setor Industrial' },
    { number: '02', name: 'Usina 02',       location: 'Rio Verde · GO'                    },
    { number: '03', name: 'Usina 03',       location: 'Região Centro-Oeste'               },
  ],

  // ── TABELA TÉCNICA CBUQ
  specs: [
    { key: 'Raio de atendimento',  value: '90 km',      sub: 'das usinas'     },
    { key: 'Norma de referência',  value: 'DNIT',       sub: '/ NBR 7207'     },
    { key: 'Licença ambiental',    value: 'LO Ativa',   sub: 'SEMAD-GO'       },
    { key: 'Ensaio Marshall',      value: 'Certificado',sub: 'por traço'      },
    { key: 'Fornecimento externo', value: 'Disponível', sub: 'sob contrato'   },
  ],

  // ── FORMULÁRIO
  formOptions: {
    projectTypes: [
      'Estrada / Pátio Rural — Agronegócio',
      'Loteamento — Infraestrutura Completa',
      'Pátio Industrial / Empresa Privada',
      'Obra Pública / Licitação',
      'Fornecimento de CBUQ',
      'Outro',
    ],
    clientTypes: [
      'Produtor / Proprietário Rural',
      'Incorporador / Loteador',
      'Empresa Privada',
      'Prefeitura / Órgão Público',
      'Construtora / Empreiteira',
    ],
  },

  // ── SEO
  seo: {
    title:       'GP Asfalto Brasil — CBUQ Próprio, Engenharia Aplicada, Entrega no Prazo',
    description: 'Pavimentação asfáltica CBUQ, terraplenagem e infraestrutura completa em Goiás. 3 usinas próprias, controle técnico e cronograma cumprido. Rio Verde · GO.',
    keywords:    'CBUQ rio verde, pavimentação asfáltica goiás, terraplenagem centro-oeste, usina de asfalto rio verde, infraestrutura loteamento goiás, pavimentação agronegócio',
    url:         'https://gpasfaltobrasil.com',
  },
}
