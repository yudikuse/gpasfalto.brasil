import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { site } from '@/data/content'
import { CookiePrefsButton } from '@/components/CookiePrefsButton'

export const metadata = {
  title: 'Política de Privacidade e Cookies · GP Asfalto Brasil',
  description:
    'Como a GP Asfalto coleta, usa e protege dados pessoais, e como você controla os cookies do site, conforme a LGPD.',
  robots: { index: true, follow: true },
}

const atualizado = 'junho de 2026'

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 font-display text-2xl font-bold text-gp-bone sm:text-3xl">
      {children}
    </h2>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 leading-relaxed text-gp-bone/75">{children}</p>
}

export default function PrivacidadePage() {
  const { company } = site

  return (
    <div className="bg-gp-navy">
      <section className="pb-28 pt-[calc(var(--header-h)+4rem)]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="eyebrow mb-4">Legal</div>
          <h1 className="font-display text-4xl font-extrabold leading-[0.95] text-gp-bone sm:text-5xl">
            Política de Privacidade <span className="text-gp-green-bright">e Cookies</span>
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-widest text-gp-steel">
            Última atualização: {atualizado}
          </p>

          <P>
            Esta política explica como a {company.name} ({company.razao}, CNPJ {company.cnpj})
            trata dados pessoais e utiliza cookies neste site, em conformidade com a Lei Geral de
            Proteção de Dados (Lei nº 13.709/2018 — LGPD). Ao usar o site, você concorda com as
            práticas descritas aqui.
          </P>

          <H2>1. Quem é o controlador</H2>
          <P>
            O controlador dos dados é a {company.razao} (CNPJ {company.cnpj}), com sede em
            Rio Verde — GO. Para qualquer questão sobre privacidade, fale conosco pelo e-mail{' '}
            <a href={`mailto:${company.email}`} className="text-gp-green-bright underline underline-offset-2">
              {company.email}
            </a>
            .
          </P>

          <H2>2. Dados que coletamos</H2>
          <P>
            <strong className="text-gp-bone">Dados que você nos envia:</strong> ao preencher o
            formulário de contato ou solicitar orçamento, coletamos nome, e-mail, telefone e a
            mensagem/descrição da obra que você informar.
          </P>
          <P>
            <strong className="text-gp-bone">Dados de navegação:</strong> coletamos, por meio de
            cookies e tecnologias semelhantes, informações técnicas como páginas visitadas e
            interações — mas apenas as não-essenciais mediante o seu consentimento (ver seção 5).
          </P>

          <H2>3. Para que usamos e a base legal</H2>
          <P>
            Usamos os dados de contato para responder à sua solicitação, elaborar orçamentos e
            executar procedimentos preliminares relacionados a um possível contrato — base legal de
            procedimentos preliminares e legítimo interesse (art. 7º da LGPD). Os dados de navegação
            não-essenciais são usados, mediante consentimento, para medir audiência e melhorar a
            comunicação.
          </P>

          <H2>4. Com quem compartilhamos</H2>
          <P>
            Não vendemos seus dados. Eles podem ser processados por prestadores que viabilizam o
            site, como serviços do Google (recebimento de formulários, e — somente com o seu
            consentimento — Google Ads e vídeos do YouTube). Esses provedores tratam os dados
            conforme suas próprias políticas e a finalidade aqui descrita.
          </P>

          <H2>5. Cookies</H2>
          <P>
            <strong className="text-gp-bone">Essenciais:</strong> necessários para o site funcionar.
            Ficam sempre ativos e não exigem consentimento.
          </P>
          <P>
            <strong className="text-gp-bone">Estatística e marketing (não-essenciais):</strong>{' '}
            cookies do Google Ads (nas páginas de campanha) e do YouTube (quando você reproduz um
            vídeo). Eles ficam <strong className="text-gp-bone">desativados por padrão</strong> e só
            passam a funcionar se você aceitar no aviso de cookies. Você pode mudar sua escolha a
            qualquer momento:
          </P>
          <div className="mt-5">
            <CookiePrefsButton className="inline-flex items-center gap-2 rounded-md border border-gp-green-bright/40 px-4 py-2 font-mono text-xs uppercase tracking-widest text-gp-green-bright transition-colors hover:bg-gp-green-bright/10" />
          </div>

          <H2>6. Seus direitos</H2>
          <P>
            Como titular, você pode solicitar a confirmação da existência de tratamento, o acesso,
            a correção, a anonimização, a portabilidade e a eliminação dos seus dados, além de
            revogar o consentimento — conforme o art. 18 da LGPD. Para exercer qualquer direito,
            escreva para{' '}
            <a href={`mailto:${company.email}`} className="text-gp-green-bright underline underline-offset-2">
              {company.email}
            </a>
            .
          </P>

          <H2>7. Segurança e retenção</H2>
          <P>
            Adotamos medidas técnicas e organizacionais para proteger seus dados e os mantemos apenas
            pelo tempo necessário às finalidades acima ou às obrigações legais aplicáveis.
          </P>

          <H2>8. Alterações</H2>
          <P>
            Podemos atualizar esta política periodicamente. A data de revisão no topo indica a versão
            vigente.
          </P>

          <div className="mt-14 border-t border-gp-bone/10 pt-8">
            <Link href="/" className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-widest text-gp-green-bright hover:opacity-80">
              Voltar ao início
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
