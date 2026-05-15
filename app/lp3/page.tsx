<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>GP Asfalto | Aplicação Asfáltica para Obras</title>

  <meta
    name="description"
    content="Aplicação asfáltica para construtoras, loteadoras, incorporadoras, usinas e obras privadas. A GP Asfalto executa da terraplenagem à capa final em CBUQ."
  />

  <style>
    :root {
      --gp-green: #167a0a;
      --gp-green-light: #22a312;
      --gp-green-dark: #063a04;
      --gp-blue: #171d5a;
      --gp-asphalt: #090909;
      --gp-graphite: #151515;
      --gp-card: rgba(255, 255, 255, 0.08);
      --gp-card-strong: rgba(255, 255, 255, 0.13);
      --gp-border: rgba(255, 255, 255, 0.16);
      --gp-text: #f8f8f2;
      --gp-muted: #b9b9b2;
      --gp-gray: #a7a9ac;
      --gp-white: #ffffff;
      --gp-danger: #ff4d3d;
      --gp-radius-xl: 34px;
      --gp-radius-lg: 24px;
      --gp-radius-md: 16px;
      --shadow-strong: 0 30px 90px rgba(0, 0, 0, 0.45);
      --hero-image: url("/assets/aplicacao-asfalto-gp.jpg");
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--gp-asphalt);
      color: var(--gp-text);
      overflow-x: hidden;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    button,
    input,
    select,
    textarea {
      font-family: inherit;
    }

    .page {
      min-height: 100vh;
      background:
        radial-gradient(circle at 20% 0%, rgba(22, 122, 10, 0.28), transparent 34%),
        radial-gradient(circle at 80% 18%, rgba(23, 29, 90, 0.38), transparent 34%),
        #090909;
    }

    .container {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
    }

    .topbar {
      position: fixed;
      inset: 16px 0 auto 0;
      z-index: 50;
      pointer-events: none;
    }

    .topbar-inner {
      width: min(1180px, calc(100% - 32px));
      margin: 0 auto;
      padding: 10px 12px;
      border: 1px solid var(--gp-border);
      border-radius: 999px;
      background: rgba(8, 8, 8, 0.58);
      backdrop-filter: blur(22px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      pointer-events: auto;
      box-shadow: 0 20px 70px rgba(0, 0, 0, 0.22);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .brand img {
      height: 34px;
      width: auto;
      display: block;
    }

    .brand-fallback {
      display: none;
      font-weight: 900;
      letter-spacing: -0.04em;
      font-size: 18px;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .nav-link {
      display: none;
      padding: 10px 13px;
      font-size: 13px;
      color: rgba(255, 255, 255, 0.76);
      border-radius: 999px;
      transition: 0.2s ease;
    }

    .nav-link:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.08);
    }

    .btn {
      border: 0;
      border-radius: 999px;
      cursor: pointer;
      font-weight: 800;
      letter-spacing: -0.01em;
      transition: 0.2s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      white-space: nowrap;
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--gp-green), var(--gp-green-light));
      color: #fff;
      box-shadow: 0 18px 45px rgba(22, 122, 10, 0.36);
    }

    .btn-primary:hover {
      transform: translateY(-1px);
      box-shadow: 0 22px 55px rgba(22, 122, 10, 0.48);
    }

    .btn-dark {
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      border: 1px solid rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(12px);
    }

    .btn-dark:hover {
      background: rgba(255, 255, 255, 0.16);
    }

    .btn-small {
      min-height: 42px;
      padding: 0 16px;
      font-size: 13px;
    }

    .btn-large {
      min-height: 58px;
      padding: 0 24px;
      font-size: 15px;
    }

    .hero {
      position: relative;
      min-height: 100svh;
      padding: 112px 0 58px;
      display: flex;
      align-items: center;
      isolation: isolate;
      overflow: hidden;
    }

    .hero::before {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, rgba(0, 0, 0, 0.86) 0%, rgba(0, 0, 0, 0.58) 48%, rgba(0, 0, 0, 0.32) 100%),
        linear-gradient(180deg, rgba(0, 0, 0, 0.08), #090909 98%),
        var(--hero-image) center / cover no-repeat;
      z-index: -2;
      transform: scale(1.02);
    }

    .hero::after {
      content: "";
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
      background-size: 72px 72px;
      mask-image: linear-gradient(90deg, #000, transparent 78%);
      opacity: 0.22;
      z-index: -1;
    }

    .hero-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 34px;
      align-items: center;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 9px;
      padding: 8px 12px;
      width: fit-content;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(18px);
      color: rgba(255, 255, 255, 0.84);
      font-size: 13px;
      font-weight: 700;
    }

    .pulse {
      width: 9px;
      height: 9px;
      background: var(--gp-green-light);
      border-radius: 999px;
      box-shadow: 0 0 0 7px rgba(34, 163, 18, 0.18);
    }

    .hero h1 {
      margin-top: 22px;
      font-size: clamp(42px, 8vw, 88px);
      line-height: 0.92;
      letter-spacing: -0.075em;
      max-width: 830px;
    }

    .hero h1 span {
      color: rgba(255, 255, 255, 0.62);
    }

    .hero-lead {
      margin-top: 24px;
      max-width: 650px;
      color: rgba(255, 255, 255, 0.76);
      font-size: clamp(17px, 2vw, 21px);
      line-height: 1.48;
      letter-spacing: -0.02em;
    }

    .hero-actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-top: 30px;
      max-width: 480px;
    }

    .hero-note {
      margin-top: 16px;
      color: rgba(255, 255, 255, 0.58);
      font-size: 13px;
      line-height: 1.45;
    }

    .hero-panel {
      position: relative;
      padding: 18px;
      border-radius: 36px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.06));
      border: 1px solid rgba(255, 255, 255, 0.18);
      backdrop-filter: blur(26px);
      box-shadow: var(--shadow-strong);
      overflow: hidden;
    }

    .hero-panel::before {
      content: "";
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 70% 0%, rgba(34, 163, 18, 0.3), transparent 40%);
      pointer-events: none;
    }

    .phone-card {
      position: relative;
      min-height: 610px;
      border-radius: 32px;
      overflow: hidden;
      background:
        linear-gradient(180deg, rgba(0, 0, 0, 0.08), rgba(0, 0, 0, 0.65)),
        url("/assets/app-asfalto-gp.jpg") center / cover no-repeat;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .phone-top {
      position: absolute;
      inset: 18px 18px auto 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 2;
    }

    .phone-pill {
      padding: 8px 11px;
      border-radius: 999px;
      background: rgba(0, 0, 0, 0.44);
      border: 1px solid rgba(255, 255, 255, 0.14);
      backdrop-filter: blur(16px);
      color: rgba(255, 255, 255, 0.86);
      font-size: 12px;
      font-weight: 800;
    }

    .floating-metric {
      position: absolute;
      z-index: 3;
      padding: 12px 13px;
      min-width: 138px;
      border-radius: 18px;
      background: rgba(0, 0, 0, 0.45);
      border: 1px solid rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(18px);
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
    }

    .floating-metric strong {
      display: block;
      font-size: 18px;
      letter-spacing: -0.04em;
    }

    .floating-metric small {
      display: block;
      margin-top: 4px;
      color: rgba(255, 255, 255, 0.62);
      font-size: 11px;
      font-weight: 700;
    }

    .metric-1 {
      top: 94px;
      left: 18px;
    }

    .metric-2 {
      top: 190px;
      right: 16px;
    }

    .metric-3 {
      bottom: 192px;
      left: 22px;
    }

    .phone-bottom {
      position: absolute;
      inset: auto 16px 16px 16px;
      z-index: 4;
      border-radius: 26px;
      background: rgba(10, 10, 10, 0.68);
      border: 1px solid rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(22px);
      padding: 16px;
    }

    .phone-bottom h3 {
      font-size: 22px;
      letter-spacing: -0.05em;
      line-height: 1;
      margin-bottom: 12px;
    }

    .phone-options {
      display: grid;
      gap: 8px;
    }

    .phone-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 13px;
      border-radius: 16px;
      background: rgba(255, 255, 255, 0.08);
      color: rgba(255, 255, 255, 0.84);
      font-size: 13px;
      font-weight: 750;
    }

    .phone-option span:last-child {
      color: var(--gp-green-light);
    }

    section {
      padding: 86px 0;
    }

    .section-head {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin-bottom: 34px;
    }

    .section-kicker {
      color: var(--gp-green-light);
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-weight: 900;
      font-size: 12px;
    }

    .section-title {
      font-size: clamp(34px, 5vw, 62px);
      line-height: 0.98;
      letter-spacing: -0.07em;
      max-width: 850px;
    }

    .section-text {
      color: var(--gp-muted);
      font-size: 18px;
      line-height: 1.55;
      max-width: 720px;
    }

    .need-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .need-card {
      position: relative;
      padding: 22px;
      min-height: 190px;
      border-radius: var(--gp-radius-lg);
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.095), rgba(255, 255, 255, 0.045));
      border: 1px solid rgba(255, 255, 255, 0.14);
      overflow: hidden;
      cursor: pointer;
      transition: 0.2s ease;
    }

    .need-card:hover {
      transform: translateY(-3px);
      border-color: rgba(34, 163, 18, 0.45);
      background: linear-gradient(180deg, rgba(34, 163, 18, 0.14), rgba(255, 255, 255, 0.045));
    }

    .need-card::after {
      content: "→";
      position: absolute;
      right: 20px;
      bottom: 16px;
      width: 42px;
      height: 42px;
      border-radius: 999px;
      display: grid;
      place-items: center;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
      font-size: 20px;
    }

    .need-icon {
      width: 46px;
      height: 46px;
      border-radius: 16px;
      background: rgba(34, 163, 18, 0.16);
      border: 1px solid rgba(34, 163, 18, 0.28);
      display: grid;
      place-items: center;
      margin-bottom: 18px;
      font-size: 22px;
    }

    .need-card h3 {
      font-size: 22px;
      letter-spacing: -0.045em;
      margin-bottom: 10px;
      max-width: 310px;
    }

    .need-card p {
      color: rgba(255, 255, 255, 0.66);
      line-height: 1.48;
      font-size: 14px;
      max-width: 340px;
    }

    .flow {
      display: grid;
      gap: 12px;
      counter-reset: step;
    }

    .flow-item {
      counter-increment: step;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 16px;
      padding: 18px;
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.055);
      border: 1px solid rgba(255, 255, 255, 0.11);
    }

    .flow-number {
      width: 42px;
      height: 42px;
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.08);
      display: grid;
      place-items: center;
      font-weight: 900;
      color: var(--gp-green-light);
    }

    .flow-number::before {
      content: counter(step, decimal-leading-zero);
    }

    .flow-item h3 {
      font-size: 19px;
      letter-spacing: -0.035em;
      margin-bottom: 6px;
    }

    .flow-item p {
      color: rgba(255, 255, 255, 0.63);
      line-height: 1.48;
      font-size: 14px;
    }

    .risk-section {
      position: relative;
      overflow: hidden;
      background:
        linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0)),
        #0d0d0d;
    }

    .risk-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .risk-card {
      padding: 20px;
      border-radius: 22px;
      border: 1px solid rgba(255, 255, 255, 0.12);
      background: rgba(255, 255, 255, 0.055);
    }

    .risk-card strong {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 17px;
      letter-spacing: -0.03em;
    }

    .risk-card strong::before {
      content: "";
      width: 8px;
      height: 8px;
      border-radius: 99px;
      background: var(--gp-green-light);
      box-shadow: 0 0 0 6px rgba(34, 163, 18, 0.12);
    }

    .risk-card p {
      margin-top: 10px;
      color: rgba(255, 255, 255, 0.62);
      line-height: 1.48;
      font-size: 14px;
    }

    .proof-layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;
      align-items: stretch;
    }

    .proof-photo {
      min-height: 440px;
      border-radius: 34px;
      background:
        linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.6)),
        url("/assets/equipe-gp-aplicacao.jpg") center / cover no-repeat;
      border: 1px solid rgba(255, 255, 255, 0.14);
      overflow: hidden;
      position: relative;
    }

    .proof-badge {
      position: absolute;
      left: 18px;
      bottom: 18px;
      right: 18px;
      padding: 16px;
      border-radius: 24px;
      background: rgba(0, 0, 0, 0.58);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.16);
    }

    .proof-badge strong {
      display: block;
      font-size: 24px;
      letter-spacing: -0.05em;
    }

    .proof-badge span {
      display: block;
      margin-top: 6px;
      color: rgba(255, 255, 255, 0.64);
      line-height: 1.44;
      font-size: 14px;
    }

    .proof-list {
      display: grid;
      gap: 12px;
    }

    .proof-item {
      padding: 18px;
      border-radius: 22px;
      background: rgba(255, 255, 255, 0.055);
      border: 1px solid rgba(255, 255, 255, 0.11);
    }

    .proof-item h3 {
      font-size: 19px;
      letter-spacing: -0.035em;
      margin-bottom: 7px;
    }

    .proof-item p {
      color: rgba(255, 255, 255, 0.62);
      line-height: 1.48;
      font-size: 14px;
    }

    .quote-section {
      position: relative;
    }

    .quote-shell {
      display: grid;
      grid-template-columns: 1fr;
      gap: 22px;
      padding: 18px;
      border-radius: 38px;
      background:
        radial-gradient(circle at 90% 10%, rgba(34, 163, 18, 0.24), transparent 36%),
        linear-gradient(180deg, rgba(255, 255, 255, 0.105), rgba(255, 255, 255, 0.05));
      border: 1px solid rgba(255, 255, 255, 0.16);
      box-shadow: var(--shadow-strong);
    }

    .quote-copy {
      padding: 14px;
    }

    .quote-copy h2 {
      font-size: clamp(34px, 5vw, 60px);
      line-height: 0.98;
      letter-spacing: -0.07em;
      margin-bottom: 16px;
    }

    .quote-copy p {
      color: rgba(255, 255, 255, 0.68);
      line-height: 1.55;
      font-size: 17px;
      max-width: 620px;
    }

    .form-card {
      border-radius: 30px;
      padding: 18px;
      background: rgba(0, 0, 0, 0.42);
      border: 1px solid rgba(255, 255, 255, 0.14);
      backdrop-filter: blur(24px);
    }

    .form-title {
      font-size: 22px;
      letter-spacing: -0.045em;
      margin-bottom: 14px;
    }

    .form-grid {
      display: grid;
      gap: 12px;
    }

    .field {
      display: grid;
      gap: 7px;
    }

    .field label {
      color: rgba(255, 255, 255, 0.66);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 0.02em;
    }

    .field input,
    .field select,
    .field textarea {
      width: 100%;
      min-height: 50px;
      border-radius: 16px;
      border: 1px solid rgba(255, 255, 255, 0.13);
      background: rgba(255, 255, 255, 0.075);
      color: #fff;
      outline: none;
      padding: 0 14px;
      font-size: 15px;
      transition: 0.2s ease;
    }

    .field textarea {
      min-height: 94px;
      padding: 14px;
      resize: vertical;
    }

    .field select option {
      color: #111;
    }

    .field input:focus,
    .field select:focus,
    .field textarea:focus {
      border-color: rgba(34, 163, 18, 0.75);
      box-shadow: 0 0 0 4px rgba(34, 163, 18, 0.12);
    }

    .form-card .btn {
      width: 100%;
      margin-top: 14px;
    }

    .form-helper {
      margin-top: 12px;
      color: rgba(255, 255, 255, 0.52);
      font-size: 12px;
      line-height: 1.4;
      text-align: center;
    }

    .use-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }

    .use-chip {
      padding: 14px;
      min-height: 76px;
      border-radius: 18px;
      background: rgba(255, 255, 255, 0.055);
      border: 1px solid rgba(255, 255, 255, 0.105);
      display: flex;
      align-items: end;
      color: rgba(255, 255, 255, 0.82);
      font-weight: 800;
      letter-spacing: -0.02em;
      font-size: 14px;
    }

    .faq {
      display: grid;
      gap: 10px;
    }

    details {
      border-radius: 20px;
      background: rgba(255, 255, 255, 0.055);
      border: 1px solid rgba(255, 255, 255, 0.105);
      overflow: hidden;
    }

    summary {
      cursor: pointer;
      padding: 18px;
      font-weight: 850;
      letter-spacing: -0.025em;
      list-style: none;
      display: flex;
      justify-content: space-between;
      gap: 18px;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    summary::after {
      content: "+";
      color: var(--gp-green-light);
      font-size: 22px;
      line-height: 1;
    }

    details[open] summary::after {
      content: "−";
    }

    details p {
      padding: 0 18px 18px;
      color: rgba(255, 255, 255, 0.62);
      line-height: 1.55;
      font-size: 14px;
    }

    .final-cta {
      padding-bottom: 120px;
    }

    .final-box {
      min-height: 420px;
      border-radius: 38px;
      padding: 28px;
      background:
        linear-gradient(90deg, rgba(0,0,0,0.76), rgba(0,0,0,0.34)),
        url("/assets/rolo-asfalto-gp.jpg") center / cover no-repeat;
      border: 1px solid rgba(255, 255, 255, 0.14);
      display: flex;
      flex-direction: column;
      justify-content: end;
      overflow: hidden;
    }

    .final-box h2 {
      font-size: clamp(38px, 6vw, 72px);
      line-height: 0.95;
      letter-spacing: -0.075em;
      max-width: 780px;
      margin-bottom: 16px;
    }

    .final-box p {
      color: rgba(255, 255, 255, 0.7);
      max-width: 620px;
      line-height: 1.55;
      font-size: 18px;
      margin-bottom: 22px;
    }

    .mobile-cta {
      position: fixed;
      z-index: 80;
      left: 12px;
      right: 12px;
      bottom: 12px;
      padding: 10px;
      border-radius: 24px;
      background: rgba(10, 10, 10, 0.74);
      border: 1px solid rgba(255, 255, 255, 0.14);
      backdrop-filter: blur(24px);
      box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);
      display: flex;
      gap: 8px;
    }

    .mobile-cta .btn {
      flex: 1;
      min-height: 52px;
      font-size: 13px;
    }

    .mobile-cta .btn-dark {
      flex: 0.62;
    }

    @media (min-width: 720px) {
      .hero-actions {
        flex-direction: row;
      }

      .need-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .risk-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .flow {
        grid-template-columns: repeat(2, 1fr);
      }

      .use-grid {
        grid-template-columns: repeat(4, 1fr);
      }

      .form-grid {
        grid-template-columns: repeat(2, 1fr);
      }

      .field-full {
        grid-column: 1 / -1;
      }
    }

    @media (min-width: 980px) {
      .nav-link {
        display: inline-flex;
      }

      .hero-grid {
        grid-template-columns: minmax(0, 1.08fr) minmax(360px, 0.72fr);
      }

      .hero-panel {
        transform: translateY(20px);
      }

      .need-grid {
        grid-template-columns: repeat(5, 1fr);
      }

      .need-card {
        min-height: 240px;
      }

      .flow {
        grid-template-columns: repeat(3, 1fr);
      }

      .proof-layout {
        grid-template-columns: 0.95fr 1.05fr;
      }

      .quote-shell {
        grid-template-columns: 0.9fr 1.1fr;
        padding: 26px;
      }

      .quote-copy {
        padding: 24px;
      }

      .mobile-cta {
        display: none;
      }

      .final-cta {
        padding-bottom: 86px;
      }
    }

    @media (max-width: 520px) {
      .brand img {
        height: 28px;
        max-width: 162px;
        object-fit: contain;
      }

      .topbar-inner {
        padding: 9px 10px;
      }

      .hero {
        padding-top: 96px;
      }

      .hero h1 {
        font-size: 48px;
      }

      .hero-panel {
        display: none;
      }

      section {
        padding: 64px 0;
      }

      .section-title {
        font-size: 38px;
      }

      .use-grid {
        grid-template-columns: 1fr;
      }

      .final-box {
        padding: 22px;
        min-height: 460px;
      }
    }
  </style>
</head>

<body>
  <div class="page">
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="#top" aria-label="GP Asfalto">
          <img src="/assets/logo-gp-branca.png" alt="GP Asfalto" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
          <span class="brand-fallback">GP Asfalto</span>
        </a>

        <nav class="nav-actions">
          <a class="nav-link" href="#necessidade">Necessidade</a>
          <a class="nav-link" href="#etapas">Etapas</a>
          <a class="nav-link" href="#orcamento">Avaliação</a>
          <a class="btn btn-primary btn-small" href="#orcamento">Solicitar avaliação</a>
        </nav>
      </div>
    </header>

    <main id="top">
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="eyebrow">
              <span class="pulse"></span>
              Aplicação asfáltica com equipe e equipamento
            </div>

            <h1>
              Aplicação de asfalto para obras que <span>não podem parar.</span>
            </h1>

            <p class="hero-lead">
              A GP Asfalto executa pavimentação para construtoras, loteadoras,
              incorporadoras, usinas e obras privadas — da terraplenagem à capa final em CBUQ.
            </p>

            <div class="hero-actions">
              <a class="btn btn-primary btn-large" href="#orcamento">Solicitar avaliação da obra</a>
              <button class="btn btn-dark btn-large" type="button" onclick="quickWhatsapp('Já tenho massa e preciso somente da aplicação')">
                Tenho massa e preciso aplicar
              </button>
            </div>

            <p class="hero-note">
              Ideal para quem precisa terceirizar a aplicação, apoiar uma usina,
              entregar loteamento, executar pátio, acesso, rua ou obra privada.
            </p>
          </div>

          <aside class="hero-panel" aria-label="Painel visual de aplicação">
            <div class="phone-card">
              <div class="phone-top">
                <span class="phone-pill">GP Aplicação</span>
                <span class="phone-pill">Obra em análise</span>
              </div>

              <div class="floating-metric metric-1">
                <strong>Base</strong>
                <small>regularização e compactação</small>
              </div>

              <div class="floating-metric metric-2">
                <strong>CBUQ</strong>
                <small>aplicação e acabamento</small>
              </div>

              <div class="floating-metric metric-3">
                <strong>Equipe</strong>
                <small>acabadora, rolos e campo</small>
              </div>

              <div class="phone-bottom">
                <h3>Qual é sua necessidade?</h3>

                <div class="phone-options">
                  <div class="phone-option">
                    <span>Só aplicação</span>
                    <span>→</span>
                  </div>
                  <div class="phone-option">
                    <span>Base + aplicação</span>
                    <span>→</span>
                  </div>
                  <div class="phone-option">
                    <span>Execução completa</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="necessidade">
        <div class="container">
          <div class="section-head">
            <div class="section-kicker">Entrada rápida</div>
            <h2 class="section-title">A GP entra exatamente onde sua obra precisa.</h2>
            <p class="section-text">
              A página foi feita para separar o lead certo: quem precisa aplicar,
              quem precisa corrigir base, quem precisa terceirizar pavimentação e quem quer solução completa.
            </p>
          </div>

          <div class="need-grid">
            <article class="need-card" onclick="selectNeed('Tenho uma obra e preciso terceirizar a pavimentação')">
              <div class="need-icon">🏗️</div>
              <h3>Tenho uma obra e preciso terceirizar</h3>
              <p>Para construtoras que assumiram contrato e precisam de execução em campo.</p>
            </article>

            <article class="need-card" onclick="selectNeed('Tenho um loteamento ou condomínio para pavimentar')">
              <div class="need-icon">🛣️</div>
              <h3>Loteamento ou condomínio</h3>
              <p>Ruas internas, acessos, urbanização, base e capa final.</p>
            </article>

            <article class="need-card" onclick="selectNeed('Já tenho massa asfáltica e preciso somente da aplicação')">
              <div class="need-icon">🚧</div>
              <h3>Já tenho massa e preciso aplicar</h3>
              <p>Equipe, acabadora, rolos, compactação e acabamento técnico.</p>
            </article>

            <article class="need-card" onclick="selectNeed('Sou uma usina e preciso de apoio na aplicação')">
              <div class="need-icon">🏭</div>
              <h3>Sou usina e preciso apoiar cliente</h3>
              <p>Aplicação terceirizada para atender obra com estrutura de campo.</p>
            </article>

            <article class="need-card" onclick="selectNeed('Preciso de terraplenagem, base e aplicação completa')">
              <div class="need-icon">✅</div>
              <h3>Preciso da solução completa</h3>
              <p>Terraplenagem, base, imprimação, aplicação de CBUQ e entrega.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="etapas">
        <div class="container">
          <div class="section-head">
            <div class="section-kicker">Execução completa</div>
            <h2 class="section-title">Da leitura da obra ao acabamento final.</h2>
            <p class="section-text">
              A aplicação asfáltica depende de sequência. Não é só jogar massa.
              É base, logística, temperatura, equipamento, compactação e acabamento.
            </p>
          </div>

          <div class="flow">
            <div class="flow-item">
              <div class="flow-number"></div>
              <div>
                <h3>Avaliação da obra</h3>
                <p>Área, prazo, acesso, tipo de tráfego, condição da base e logística de massa.</p>
              </div>
            </div>

            <div class="flow-item">
              <div class="flow-number"></div>
              <div>
                <h3>Terraplenagem</h3>
                <p>Regularização, cortes, aterros e preparo para receber a estrutura do pavimento.</p>
              </div>
            </div>

            <div class="flow-item">
              <div class="flow-number"></div>
              <div>
                <h3>Base e sub-base</h3>
                <p>Correção, execução, umidade, nivelamento e compactação da base.</p>
              </div>
            </div>

            <div class="flow-item">
              <div class="flow-number"></div>
              <div>
                <h3>Imprimação e ligação</h3>
                <p>Preparo técnico da superfície antes da camada asfáltica.</p>
              </div>
            </div>

            <div class="flow-item">
              <div class="flow-number"></div>
              <div>
                <h3>Aplicação de CBUQ</h3>
                <p>Acabadora, equipe, rolos, controle de campo e ritmo de aplicação.</p>
              </div>
            </div>

            <div class="flow-item">
              <div class="flow-number"></div>
              <div>
                <h3>Compactação e entrega</h3>
                <p>Acabamento, bordas, arremates e liberação da área conforme necessidade da obra.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="risk-section">
        <div class="container">
          <div class="section-head">
            <div class="section-kicker">Risco real</div>
            <h2 class="section-title">O problema quase nunca é só a massa. É a execução.</h2>
            <p class="section-text">
              Quando a aplicação é mal coordenada, o custo aparece em atraso,
              desperdício, retrabalho e acabamento ruim.
            </p>
          </div>

          <div class="risk-grid">
            <div class="risk-card">
              <strong>Massa chegando fora da janela ideal</strong>
              <p>Sem equipe e equipamento alinhados, a logística compromete ritmo e acabamento.</p>
            </div>

            <div class="risk-card">
              <strong>Base mal preparada</strong>
              <p>A camada asfáltica não corrige sozinha uma estrutura ruim por baixo.</p>
            </div>

            <div class="risk-card">
              <strong>Falta de equipamento no momento certo</strong>
              <p>Acabadora, rolo e equipe precisam entrar coordenados para evitar parada.</p>
            </div>

            <div class="risk-card">
              <strong>Retrabalho e imagem ruim com o cliente final</strong>
              <p>Construtoras e loteadoras precisam entregar obra com padrão, prazo e segurança.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container proof-layout">
          <div class="proof-photo">
            <div class="proof-badge">
              <strong>Estrutura de campo</strong>
              <span>Equipe, equipamentos e rotina de execução para assumir etapas críticas da pavimentação.</span>
            </div>
          </div>

          <div>
            <div class="section-head">
              <div class="section-kicker">GP Asfalto</div>
              <h2 class="section-title">Execução para quem precisa entregar obra.</h2>
            </div>

            <div class="proof-list">
              <div class="proof-item">
                <h3>Aplicação para construtoras</h3>
                <p>Atuação como parceira executora da etapa de pavimentação.</p>
              </div>

              <div class="proof-item">
                <h3>Apoio para loteadoras e incorporadoras</h3>
                <p>Ruas internas, acessos, pátios, urbanização e entrega de empreendimento.</p>
              </div>

              <div class="proof-item">
                <h3>Aplicação para quem já comprou massa</h3>
                <p>A GP pode avaliar logística e executar somente a aplicação.</p>
              </div>

              <div class="proof-item">
                <h3>Pacote completo</h3>
                <p>Terraplenagem, base, imprimação, aplicação e acabamento final.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="orcamento" class="quote-section">
        <div class="container">
          <div class="quote-shell">
            <div class="quote-copy">
              <div class="section-kicker">Solicitação inteligente</div>
              <h2>Monte sua solicitação em 30 segundos.</h2>
              <p>
                Informe o básico da obra e envie direto para a equipe da GP.
                Quanto mais clara a necessidade, mais rápida a avaliação.
              </p>
            </div>

            <form class="form-card" id="leadForm">
              <h3 class="form-title">Solicitar avaliação técnica</h3>

              <div class="form-grid">
                <div class="field">
                  <label for="nome">Nome</label>
                  <input id="nome" name="nome" type="text" placeholder="Seu nome" required />
                </div>

                <div class="field">
                  <label for="telefone">WhatsApp</label>
                  <input id="telefone" name="telefone" type="tel" placeholder="(64) 99999-9999" required />
                </div>

                <div class="field">
                  <label for="cidade">Cidade da obra</label>
                  <input id="cidade" name="cidade" type="text" placeholder="Ex: Rio Verde-GO" required />
                </div>

                <div class="field">
                  <label for="tipoObra">Tipo de obra</label>
                  <select id="tipoObra" name="tipoObra" required>
                    <option value="">Selecione</option>
                    <option>Loteamento</option>
                    <option>Condomínio</option>
                    <option>Rua ou via urbana</option>
                    <option>Pátio ou estacionamento</option>
                    <option>Acesso industrial</option>
                    <option>Obra pública terceirizada</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div class="field field-full">
                  <label for="necessidadeCampo">O que precisa?</label>
                  <select id="necessidadeCampo" name="necessidadeCampo" required>
                    <option value="">Selecione</option>
                    <option>Só aplicação</option>
                    <option>Base + aplicação</option>
                    <option>Terraplenagem + base + aplicação</option>
                    <option>Já tenho massa e preciso aplicar</option>
                    <option>Sou usina e preciso de apoio</option>
                    <option>Ainda não sei, preciso avaliar</option>
                  </select>
                </div>

                <div class="field">
                  <label for="metragem">Metragem ou volume aproximado</label>
                  <input id="metragem" name="metragem" type="text" placeholder="Ex: 8.000 m² ou 450 t" />
                </div>

                <div class="field">
                  <label for="temMassa">Já tem massa/usina?</label>
                  <select id="temMassa" name="temMassa">
                    <option>Não informado</option>
                    <option>Sim, já tenho massa</option>
                    <option>Não, preciso da solução completa</option>
                    <option>Quero que a GP avalie</option>
                  </select>
                </div>

                <div class="field field-full">
                  <label for="observacao">Observação</label>
                  <textarea id="observacao" name="observacao" placeholder="Ex: prazo, local, condição da base, acesso, etapa da obra..."></textarea>
                </div>
              </div>

              <button class="btn btn-primary btn-large" type="submit">
                Enviar para avaliação no WhatsApp
              </button>

              <p class="form-helper">
                O envio abre o WhatsApp com as informações organizadas. Nenhum dado sensível é publicado.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="section-kicker">Aplicações</div>
            <h2 class="section-title">Onde a GP pode aplicar.</h2>
          </div>

          <div class="use-grid">
            <div class="use-chip">Loteamentos</div>
            <div class="use-chip">Condomínios</div>
            <div class="use-chip">Ruas urbanas</div>
            <div class="use-chip">Pátios industriais</div>
            <div class="use-chip">Estacionamentos</div>
            <div class="use-chip">Acessos rurais</div>
            <div class="use-chip">Obras privadas</div>
            <div class="use-chip">Apoio para usinas</div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="section-head">
            <div class="section-kicker">Dúvidas rápidas</div>
            <h2 class="section-title">Antes de solicitar avaliação.</h2>
          </div>

          <div class="faq">
            <details>
              <summary>Vocês aplicam massa comprada de outra usina?</summary>
              <p>Sim. A GP pode avaliar a logística da obra e executar somente a aplicação, desde que as condições técnicas estejam adequadas.</p>
            </details>

            <details>
              <summary>Vocês fazem base e terraplenagem também?</summary>
              <p>Sim. A GP pode assumir desde a preparação da área até a aplicação final do CBUQ.</p>
            </details>

            <details>
              <summary>Atendem construtoras que já têm contrato com cliente final?</summary>
              <p>Sim. A GP pode atuar como parceira executora da etapa de pavimentação.</p>
            </details>

            <details>
              <summary>Atendem loteamentos, condomínios e obras privadas?</summary>
              <p>Sim. A GP atende obras que precisam de ruas, acessos, pátios, estacionamentos e áreas pavimentadas.</p>
            </details>

            <details>
              <summary>Como começa a avaliação?</summary>
              <p>Envie cidade, tipo de obra, metragem aproximada e o que precisa. A equipe avalia a melhor forma de atendimento.</p>
            </details>
          </div>
        </div>
      </section>

      <section class="final-cta">
        <div class="container">
          <div class="final-box">
            <h2>Sua obra precisa de aplicação, equipe ou execução completa?</h2>
            <p>
              Envie as informações básicas e solicite uma avaliação inicial da GP Asfalto.
            </p>

            <div class="hero-actions">
              <a class="btn btn-primary btn-large" href="#orcamento">Solicitar avaliação da obra</a>
              <button class="btn btn-dark btn-large" type="button" onclick="quickWhatsapp('Quero falar com a GP sobre aplicação asfáltica')">
                Chamar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <div class="mobile-cta">
      <a class="btn btn-dark" href="#orcamento">Avaliar</a>
      <button class="btn btn-primary" type="button" onclick="quickWhatsapp('Quero solicitar avaliação para aplicação asfáltica')">
        WhatsApp
      </button>
    </div>
  </div>

  <script>
    const WHATSAPP_NUMBER = "5564999999999";

    const telefoneInput = document.getElementById("telefone");
    const form = document.getElementById("leadForm");

    function maskPhone(value) {
      value = value.replace(/\D/g, "").slice(0, 11);

      if (value.length <= 10) {
        return value
          .replace(/^(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2");
      }

      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }

    telefoneInput.addEventListener("input", function (event) {
      event.target.value = maskPhone(event.target.value);
    });

    function openWhatsapp(message) {
      const encoded = encodeURIComponent(message);
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
      window.open(url, "_blank");
    }

    function quickWhatsapp(need) {
      const message =
`Olá, quero falar com a GP Asfalto sobre aplicação asfáltica.

Necessidade: ${need}

Tenho uma obra e gostaria de uma avaliação.`;

      openWhatsapp(message);
    }

    function selectNeed(need) {
      const select = document.getElementById("necessidadeCampo");

      const options = Array.from(select.options);
      const found = options.find(option => option.text.toLowerCase() === need.toLowerCase());

      if (found) {
        select.value = found.value;
      } else if (need.includes("massa")) {
        select.value = "Já tenho massa e preciso aplicar";
      } else if (need.includes("usina")) {
        select.value = "Sou usina e preciso de apoio";
      } else if (need.includes("completa") || need.includes("terraplenagem")) {
        select.value = "Terraplenagem + base + aplicação";
      } else {
        select.value = "Ainda não sei, preciso avaliar";
      }

      document.getElementById("orcamento").scrollIntoView({ behavior: "smooth" });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const data = new FormData(form);

      const nome = data.get("nome") || "";
      const telefone = data.get("telefone") || "";
      const cidade = data.get("cidade") || "";
      const tipoObra = data.get("tipoObra") || "";
      const necessidade = data.get("necessidadeCampo") || "";
      const metragem = data.get("metragem") || "Não informado";
      const temMassa = data.get("temMassa") || "Não informado";
      const observacao = data.get("observacao") || "Sem observações";

      const message =
`Olá, quero solicitar avaliação para aplicação asfáltica.

*Dados do contato*
Nome: ${nome}
WhatsApp: ${telefone}

*Dados da obra*
Cidade: ${cidade}
Tipo de obra: ${tipoObra}
Necessidade: ${necessidade}
Metragem/volume aproximado: ${metragem}
Já tem massa/usina?: ${temMassa}

*Observação*
${observacao}

Vim pela LP3 da GP Asfalto.`;

      openWhatsapp(message);
    });
  </script>
</body>
</html>
