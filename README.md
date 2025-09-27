Claro\! A secção de Contactos foi atualizada com o seu nome, GitHub e LinkedIn.

Pode copiar o texto abaixo e guardá-lo como `README.md` para *download*.

-----

# 🛠️ Sistema de Gestão de Reparadores de Eletrodomésticos

Um sistema moderno e eficaz, desenvolvido num **monorepo**, concebido para otimizar o fluxo de trabalho de empresas de reparação de eletrodomésticos, desde a marcação de serviços até à gestão de técnicos e peças.

## 🌟 Tecnologias em Destaque (Stack)

O projeto está construído para ser incrivelmente rápido e escalável, aproveitando o que há de mais recente na comunidade JavaScript:

| Componente | Tecnologia | Função |
| :--- | :--- | :--- |
| **Monorepo** | **Turborepo & pnpm** | Estrutura de código unificada, de alta performance. |
| **Frontend** | **Next.js** | Framework React para a interface de utilizador (UI). |
| **Bundler** | **Turbopack** | Empacotador de *assets* de alto desempenho para um desenvolvimento ultrarrápido. |
| **API/Backend** | **Fastify** | Framework Node.js rápido e *low-overhead* para a lógica de negócio. |

### 🎨 Design

A experiência de utilizador e a interface foram cuidadosamente desenhadas e planeadas pela **Paloma Teles** ([@palomateles](https://github.com/palomateles)).

-----

## 🚀 Como Começar (Setup Local)

Siga estes passos para ter o projeto a correr na sua máquina.

### Pré-requisitos

Certifique-se de que tem o **Node.js** (versão LTS recomendada) e o **pnpm** (gestor de pacotes preferencial para *monorepos*) instalados.

### 1\. Clonar o Repositório

```bash
git clone https://github.com/vasco-martins/repair
cd repair
```

### 2\. Instalar Dependências

Instale todas as dependências do monorepo:

```bash
pnpm install
```

### 3\. Configurar Variáveis de Ambiente

Crie os ficheiros `.env` necessários nos respetivos diretórios e preencha com as suas configurações (ex: chaves de base de dados, segredos, etc.):

  * `apps/api/.env`
  * `apps/web/.env`

### 4\. Executar os Serviços

Inicie a API (Fastify) e o Frontend (Next.js com Turbopack) em modo de desenvolvimento:

```bash
# Este comando deve estar configurado no package.json para iniciar
# os dois serviços em paralelo.
pnpm dev
```

  * **Frontend (Web):** Acessível em `http://localhost:3000`
  * **API (Fastify):** Acessível em `http://localhost:[PORTA_DA_API]`

-----

## 📂 Estrutura do Projeto

O monorepo está organizado para separar os serviços e o código partilhado:

```
.
├── apps/
│   ├── api/          # Serviço de Backend principal (Fastify)
│   └── web/          # Interface de Utilizador (Next.js/Turbopack)
├── packages/         # Pacotes de código reutilizável e partilhado
│   └── auth/         # Lógica centralizada de Autenticação e Autorização
├── config/           # Configurações globais, utilitários e ficheiros de ambiente
└── ...               # Ficheiros de configuração do monorepo (pnpm-workspace.yaml, turbo.json)
```

-----

## 🤝 Contribuições

Este é um projeto **open-source** e agradecemos a sua colaboração\! Para contribuir:

1.  Crie um *fork* do projeto.
2.  Crie um *branch* para a sua *feature* ou correção (`git checkout -b feature/minha-nova-funcionalidade`).
3.  Faça o *commit* das suas alterações. Sugerimos o uso do padrão [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (ex: `feat: Adiciona novo endpoint para agendamento`).
4.  Abra um **Pull Request** para o *branch* principal.

-----

## 📝 Licença

Distribuído sob a Licença **MIT**.

## 📞 Contactos

  * **Desenvolvedor:** [Vasco Martins](https://github.com/vasco-martins/repair)
  * **LinkedIn:** [Vasco Martins](https://www.linkedin.com/in/vasco-martins-826220187/)
  * **Designer (UI/UX):** [Paloma Teles](https://github.com/palomateles)

-----