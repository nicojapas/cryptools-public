# Cryptools

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat&logo=vite&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-6.4-007FFF?style=flat&logo=mui&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack_Query-5.81-FF4154?style=flat&logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.9-CA4245?style=flat&logo=reactrouter&logoColor=white)
![Web3.js](https://img.shields.io/badge/Web3.js-1.10-F16822?style=flat&logo=web3dotjs&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-29.5-C21325?style=flat&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9.17-4B32C3?style=flat&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-3.4-F7B93E?style=flat&logo=prettier&logoColor=black)

A comprehensive cryptocurrency tools web application built with React and TypeScript. Cryptools provides real-time market data, news, token analysis, and trading tools for the cryptocurrency ecosystem.

🔗 **Live Demo**: [https://nicojapas.github.io/cryptools-public](https://nicojapas.github.io/cryptools-public)

## ✨ Features

- **📈 Real-time Market Data**: Track top cryptocurrencies, gainers, and losers
- **📰 Latest Crypto News**: Curated cryptocurrency news from multiple sources
- **🔍 Token Safety Checker**: Analyze BSC tokens for potential risks and rug pulls
- **📊 Trading Charts**: Interactive price charts powered by TradingView widgets
- **🔄 BSC Contract Monitor**: Track newly created contracts on Binance Smart Chain
- **🎯 Token Sniper Tools**: Advanced trading automation features
- **🌙 Dark/Light Theme**: Customizable UI with theme switching
- **📱 Responsive Design**: Optimized for desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Material-UI (MUI) v5 with Emotion
- **Routing**: React Router v6 with HashRouter
- **State Management**: React Context + TanStack Query
- **Blockchain**: Web3.js for Ethereum/BSC interactions
- **Charts**: Lightweight Charts + TradingView widgets

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nicojapas/cryptools-public.git
   cd cryptools-public
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API credentials
   ```

4. **Start development server**
   ```bash
   yarn dev          # Start with real API data
   yarn dev:mock     # Start with mock data for development
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
yarn build        # Build for production
yarn preview      # Preview production build locally
```

### Development Commands

```bash
yarn test         # Run Jest tests
yarn lint         # Run ESLint
yarn lint:all     # Run ESLint with auto-fix and type checking
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components and routing
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and types
├── mocks/              # Mock data for development
├── abi/                # Smart contract ABIs
└── assets/             # Static assets
```

## 🔧 Configuration

The app supports both mock and real API data:

- **Development**: Set `VITE_USE_MOCKS=true` to use mock data
- **Production**: Configure `VITE_AWS_INVOKE_URL` and `VITE_AWS_API_KEY` for real data

## 🌐 Deployment

This project is configured for GitHub Pages deployment with automated CI/CD:

1. Push to the `main` branch
2. GitHub Actions automatically builds and deploys
3. Environment variables are injected from repository secrets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED license - see the package.json file for details.

## 📞 Contact

**Nicolás Japas** - nicolasjapas@gmail.com

Project Link: [https://github.com/nicojapas/cryptools-public](https://github.com/nicojapas/cryptools-public) 

