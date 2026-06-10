/****************************************************************************
 *  GP ASFALTO — Webhook de leads do site (Apps Script / Google)
 *
 *  O QUE FAZ: recebe o POST do formulário de contato do site, grava numa
 *  aba da planilha E dispara um e-mail pros 4 destinatários.
 *
 *  COMO INSTALAR (5 min):
 *  1. Abra sheets.google.com → crie uma planilha nova (ou use uma existente).
 *  2. Menu: Extensões → Apps Script.
 *  3. Apague o conteúdo e cole TODO este arquivo. Salve (disquete).
 *  4. Implantar → Nova implantação → tipo "App da Web".
 *       - Executar como: Eu
 *       - Quem pode acessar: Qualquer pessoa
 *     → Implantar → Autorizar acesso (aceite as permissões da sua conta Google).
 *  5. Copie a URL gerada (termina em /exec).
 *  6. Cole essa URL na constante LEAD_WEBHOOK em components/ContactSection.tsx.
 *
 *  OBS: os e-mails saem DA conta Google que é dona deste script. Use a conta
 *  que vocês quiserem como remetente (ex.: a mariana.gpa@gmail.com).
 ****************************************************************************/

var RECIPIENTS = [
  'givago@gpasfalto.com.br',
  'mariana.gpa@gmail.com',
  'marcelo@gpasfalto.com.br',
  'contato@gpasfalto.com.br'
].join(',')

var SHEET_NAME = 'Leads Site'

function doPost(e) {
  try {
    var d = JSON.parse(e.postData.contents)
    logToSheet(d)
    sendMail(d)
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  }
}

function logToSheet(d) {
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sh = ss.getSheetByName(SHEET_NAME)
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME)
    sh.appendRow(['Data', 'Nome', 'WhatsApp', 'E-mail', 'Cidade', 'Tipo', 'Descrição', 'Origem'])
  }
  sh.appendRow([
    new Date(),
    d.nome || '', d.whatsapp || '', d.email || '',
    d.cidade || '', d.tipo || '', d.descricao || '', d.origem || 'site'
  ])
}

function sendMail(d) {
  var subject = 'Novo orçamento — ' + (d.nome || 'sem nome') + ' (' + (d.cidade || '—') + ')'
  var body =
    'Novo pedido de orçamento pelo site GP Asfalto.\n\n' +
    'Nome: ' + (d.nome || '—') + '\n' +
    'WhatsApp: ' + (d.whatsapp || '—') + '\n' +
    'E-mail: ' + (d.email || '—') + '\n' +
    'Cidade: ' + (d.cidade || '—') + '\n' +
    'Tipo de projeto: ' + (d.tipo || '—') + '\n' +
    'Descrição: ' + (d.descricao || '—') + '\n\n' +
    'Recebido em ' + new Date().toLocaleString('pt-BR') + '.'

  var opts = { to: RECIPIENTS, subject: subject, body: body, name: 'Site GP Asfalto' }
  if (d.email) opts.replyTo = d.email
  MailApp.sendEmail(opts)
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON)
}
