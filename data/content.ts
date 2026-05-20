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
    founded:   '1998',
    location:  'Rio Verde · GO · Brasil',
    address:   'Rua dos Trabalhadores, 350 — Setor Industrial, Rio Verde · GO',
    email:     'contato@gpasfalto.com.br',
    instagram: 'https://instagram.com/gp.asfalto',
    youtube:   'https://www.youtube.com/@tmb_brand',
    facebook:  'https://facebook.com/gpasfalto',
    // Telefone WhatsApp principal (mantido pra retrocompatibilidade com Hero/CtaBanner)
    phone:     '(64) 99931-7039',
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
      number:   '(64) 99945-2124',
      whatsapp: '5564999452124',
      isWhatsApp: true,
      primary:  false,
    },
    {
      label:    'WhatsApp Alternativo',
      number:   '(64) 98133-0088',
      whatsapp: '5564981330088',
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
    eyebrow:     'Pavimentação · Terraplenagem · Infraestrutura',
    line1:       'CBUQ PRÓPRIO.',
    line2:       'ENGENHARIA APLICADA.',
    line3:       'ENTREGA NO PRAZO.',
    description: 'Da usina à compactação final, a GP Asfalto entrega pavimentação, terraplenagem e infraestrutura com controle técnico, equipe própria e compromisso de cronograma.',
    videoYoutubeId: 'vS6B71Pfu7c',
    videoLocal: 'https://res.cloudinary.com/dfw7h9c2j/video/upload/v1777986525/17215135-uhd_3840_2160_30fps_lyotyu.mp4',
  },

  // ── NÚMEROS (trust bar)
  numbers: [
    { value: 25,  suffix: '+', label: 'Anos de\nmercado'           },
    { value: 50,  suffix: '+', label: 'Loteamentos\nentregues'     },
    { value: 3,   suffix: '',  label: 'Usinas CBUQ\nem operação'   },
    { value: 28,  suffix: '',  label: 'Municípios\natendidos'      },
  ],

  // ── OBRAS (painéis individuais de projeto)
  projects: [
    {
      slug:        'comigo-ponte-de-pedra',
      segment:     'Agronegócio · Goiás',
      title:       'COMIGO\nPONTE DE PEDRA',
      description: 'Terraplenagem, pavimentação CBUQ e drenagem de infraestrutura rural para a cooperativa COMIGO.',
      photo:       '/images/obras/comigo-pp.jpg',
      index:       '01',
    },
    {
      slug:        'nutrien-rio-verde',
      segment:     'Empresa Privada · Rio Verde, GO',
      title:       'NUTRIEN\nRIO VERDE',
      description: 'Infraestrutura e pavimentação asfáltica CBUQ para pátio industrial e área de manobra.',
      photo:       '/images/obras/nutrien.jpg',
      index:       '02',
    },
    {
      slug:        'condominio-italia',
      segment:     'Loteamento · Jataí, GO',
      title:       'CONDOMÍNIO\nITÁLIA',
      description: 'Infraestrutura completa: terraplenagem, rede de água tratada, esgoto, galeria pluvial e pavimentação CBUQ.',
      photo:       '/images/obras/condominio-italia.jpg',
      index:       '03',
    },
    {
      slug:        'comigo-ipora',
      segment:     'Agronegócio · Iporá, GO',
      title:       'COMIGO\nIPORÁ',
      description: 'Infraestrutura e pavimentação asfáltica CBUQ para unidade da cooperativa COMIGO em Iporá.',
      photo:       '/images/obras/comigo-ipora.jpg',
      index:       '04',
    },
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

  // ── FORMULÁRIO — opções dos selects
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
