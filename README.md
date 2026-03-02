# qa.automationexercise-web.webdriverio

Automação Web end-to-end utilizando **WebdriverIO** com **Page Object Model**, seguindo boas práticas de organização e legibilidade (incluindo documentação dos métodos via JSDoc), e execução em **modo headless** para CI.

## 🎯 Objetivo

Automatizar cenários do site Automation Exercise, garantindo:

- Estrutura de código padronizada (Pages/Actions/Specs)
- Testes organizados em suítes
- Execução rápida e estável
- Relatórios de execução
- Pipeline no GitHub Actions

---

## ✅ Tecnologias

- Node.js
- WebdriverIO
- Mocha
- Allure Report (relatórios)
- GitHub Actions (CI)

---

## 📁 Estrutura do Projeto

qa.automationexercise-web.webdriverio
│
├── .github/
│ └── workflows/
│ └── ci.yml # Pipeline de CI (GitHub Actions)
│
├── .vscode/ # Configurações locais do VS Code (opcional)
│
├── allure-report/ # Relatório gerado após execução
├── allure-results/ # Resultados brutos para geração do Allure
│
├── node_modules/ # Dependências do projeto
│
├── src/
│ ├── actions/
│ │ └── user.actions.js # Orquestra fluxos completos (cadastro, exclusão, etc.)
│ │
│ ├── data/
│ │ └── user.factory.js # Factory para geração de dados dinâmicos
│ │
│ ├── pages/
│ │ ├── base.page.js # Classe base com métodos reutilizáveis
│ │ ├── home.page.js # Página inicial
│ │ ├── signup-login.page.js # Tela de login / cadastro
│ │ ├── account-information.page.js # Formulário completo de cadastro
│ │ ├── account-created.page.js # Tela de confirmação de criação
│ │ └── account-deleted.page.js # Tela de confirmação de exclusão
│ │
│ └── utils/
│ └── random.js # Utilitário para geração de dados aleatórios
│
├── test/
│ └── specs/
│ ├── register-user.spec.js # Fluxo completo: cadastro + exclusão
│ ├── login.page.js # Testes relacionados a login
│ ├── logout.spec.js # Teste de logout
│ ├── smoke.spec.js # Testes rápidos de validação geral
│ └── test2.e2e.js # Cenários adicionais E2E
│
├── .gitignore # Arquivos ignorados pelo Git
├── package.json # Dependências e scripts do projeto
├── package-lock.json # Lock de versões das dependências
└── wdio.conf.js # Configuração principal do WebdriverIO

---

### 📌 Organização Arquitetural

O projeto segue o padrão *Page Object Model (POM)* com separação clara de responsabilidades:

- *Pages* → Interação direta com elementos da interface
- *Actions* → Orquestração de fluxos de alto nível
- *Specs* → Cenários de teste
- *Factory* → Geração de dados dinâmicos
- *Utils* → Funções auxiliares reutilizáveis

---

## ⚙️ Pré-requisitos

- **Node.js 18+** (recomendado)
- **Google Chrome** instalado
- **Java** instalado (necessário para gerar Allure Report localmente)

Verifique:

```bash
node -v
npm -v
google-chrome --version
java -version

---

📦 Instalação

npm install

---

▶️ Execução dos Testes

Rodar todos os cenários

npx wdio run wdio.conf.js

---

Rodar em modo Headless (CI)

CI=true npx wdio run wdio.conf.js

---

🧾 Relatórios (Allure)

Gerar relatório:

npx allure generate allure-results --clean -o allure-report

Abrir relatório:

npx allure open allure-report

---

🤖 CI/CD

Pipeline configurada em:

.github/workflows/ci.yml

Executa automaticamente em push na branch main.

