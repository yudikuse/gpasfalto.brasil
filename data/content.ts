// ============================================================
//  GP ASFALTO BRASIL — CONTEÚDO DO SITE
//  Edite este arquivo para atualizar qualquer texto, número,
//  obra ou informação de contato sem mexer no código.
// ============================================================

export const site = {

  // ── EMPRESA
  company: {
    name:      'GP Asfalto Brasil',
    cnpj:      '22.674.189/0001-30',
    razao:     'G.P. Concreto e Asfalto Ltda',
    founded:   '1998',           // ano de fundação — confirmar
    location:  'Rio Verde · GO · Brasil',
    address:   'Rua dos Trabalhadores, 350 — Setor Industrial, Rio Verde · GO',
    whatsapp:  '5564999317039',  // formato internacional sem + ou espaços
    phone:     '(64) 3622-0902',
    email:     'contato@gpasfaltobrasil.com',
    instagram: 'https://instagram.com/gp.asfalto',
    youtube:   'https://www.youtube.com/@tmb_brand',
  },

  // ── HERO
  hero: {
    eyebrow:     'Infraestrutura · Pavimentação · CBUQ',
    line1:       'GP ASFALTO',
    line2:       'BRASIL',
    line3:       'CONSTRÓI.',
    description: 'Terraplenagem, pavimentação CBUQ e infraestrutura completa para o agronegócio, loteamentos e empresas do Centro-Oeste.',
    // YouTube: trocar pelo ID do melhor VT drone da GP Asfalto
    // Ex: "vS6B71Pfu7c" = COMIGO Iporá | "fc37905" = COMIGO Ponte de Pedra
    videoYoutubeId: 'vS6B71Pfu7c',
    // Quando tiver o .mp4 local: colocar em /public/video/hero.mp4
    // e trocar videoYoutubeId por videoLocal: '/video/hero.mp4'
    videoLocal: '/video/hero.mp4',
  },

  // ── NÚMEROS (trust bar)
  numbers: [
    { value: 25,  suffix: '+', label: 'Anos de\nmercado'           },
    { value: 50,  suffix: '+', label: 'Loteamentos\nentregues'     },
    { value: 3,   suffix: '',  label: 'Usinas CBUQ\nem operação'   },
    { value: 28,  suffix: '',  label: 'Municípios\natendidos'      },
  ],

  // ── OBRAS (painéis individuais de projeto)
  // Para adicionar obra: copiar um objeto, ajustar os campos.
  // photo: colocar o arquivo em /public/images/obras/ e referenciar aqui.
  projects: [
    {
      slug:        'comigo-ponte-de-pedra',
      segment:     'Agronegócio · Goiás',
      title:       'COMIGO\nPONTE DE PEDRA',
      description: 'Terraplanagem, pavimentação CBUQ e drenagem de infraestrutura rural para a cooperativa COMIGO.',
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
      description: 'Infraestrutura completa: terraplanagem, rede de água tratada, esgoto, galeria pluvial e pavimentação CBUQ.',
      photo:       '/images/obras/condominio-italia.jpg',
      index:       '03',
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
    title:       'GP Asfalto Brasil — Infraestrutura e Pavimentação em Goiás',
    description: 'Terraplenagem, pavimentação CBUQ, loteamentos e infraestrutura rural. 3 usinas próprias. Rio Verde, GO.',
    keywords:    'asfalto rio verde go, pavimentação goiás, CBUQ goiás, terraplenagem loteamento rio verde, infraestrutura agronegócio',
    url:         'https://gpasfaltobrasil.com',
  },
}
