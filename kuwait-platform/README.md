# Kuwait English Learning Platform

A comprehensive English learning platform designed specifically for Kuwait's educational ecosystem, featuring interactive lessons, AI-powered pronunciation assessment, and cultural context integration.

## 🏗️ Project Structure

```
kuwait-platform/
├── frontend/          # React-based user interface
├── backend/           # Node.js/Express API server
├── database/          # Database migrations and seeders
├── docs/             # Project documentation
├── config/           # Environment and deployment configs
├── scripts/          # Automation and deployment scripts
├── tests/            # Test suites (unit, integration, e2e)
└── assets/           # Static resources (images, fonts, audio)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB/PostgreSQL
- Git

### Installation

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd kuwait-platform
   npm install
   ```

2. **Environment Setup:**
   ```bash
   # Copy environment templates
   cp config/.env.example frontend/.env
   cp config/.env.example backend/.env
   ```

3. **Database Setup:**
   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. **Start Development:**
   ```bash
   npm run dev
   ```

## 📚 Features

- **Interactive Learning Modules**: Structured lessons with progress tracking
- **AI-Powered Assessment**: Pronunciation and grammar evaluation
- **Cultural Context**: Kuwait-specific examples and scenarios
- **Progress Analytics**: Detailed learning insights for students and educators
- **Multi-device Support**: Responsive design for all devices

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start all services in development mode
- `npm run build` - Build all applications for production
- `npm test` - Run all test suites
- `npm run deploy` - Deploy to production environment

### Architecture

- **Frontend**: React with TypeScript, Tailwind CSS
- **Backend**: Node.js with Express, TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based with role management
- **AI Services**: OpenAI GPT for content generation and assessment

## 🌍 Localization

Support for:
- English (primary)
- Arabic (UI support)
- Kuwait-specific cultural context

## 📖 Documentation

Detailed documentation available in the `docs/` directory:
- API documentation
- Deployment guides
- Contributing guidelines
- Architecture decisions

## 🤝 Contributing

Please read our contributing guidelines in `docs/CONTRIBUTING.md` before submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.