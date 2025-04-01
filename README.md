# Email Sequence Designer

A visual tool for designing and managing email sequences with an intuitive drag-and-drop interface. Built with React, TypeScript, and Node.js.

## 🚀 Features

- Visual email sequence builder
- Drag-and-drop interface
- Multiple node types (Lead Source, Cold Email, Wait)
- Real-time sequence validation
- Keyboard shortcuts for common actions
- Responsive design

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- React Flow
- React Query

### Backend
- Node.js
- Express
- MongoDB
- TypeScript
- Mongoose

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or pnpm
- MongoDB

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd email-sequence-designer
```

2. Install dependencies:

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

3. Set up environment variables:

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your MongoDB URI and other configurations
```

## 🚀 Running the Application

### Development Mode

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000

### Production Mode

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Build the backend:
```bash
cd backend
npm run build
```

3. Start the production server:
```bash
cd backend
npm start
```

## 📖 Documentation

Visit `/documentation` in the application for detailed usage instructions and features.

### Key Features Documentation

#### Node Types
- **Lead Source Node**: Entry point for your email sequence
- **Cold Email Node**: Configure and send automated emails
- **Wait Node**: Add delays between actions

#### Building a Sequence
1. Start with a Lead Source node
2. Add email and wait nodes
3. Connect nodes by dragging between handles
4. Configure each node's settings
5. Save your sequence

#### Keyboard Shortcuts
- `Ctrl/Cmd + S`: Save sequence
- `Delete`: Remove selected node
- `Ctrl/Cmd + Z`: Undo
- `Ctrl/Cmd + Shift + Z`: Redo

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Project Structure

```
email-sequence-designer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── hooks/
│   ├── public/
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   └── middleware/
│   └── package.json
└── README.md
```

## 🔒 Security

- All environment variables should be properly configured
- Never commit `.env` files
- Use `.env.example` as a template
- Follow security best practices for production deployment

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Initial work - [Your Name]

## 🙏 Acknowledgments

- shadcn/ui for the beautiful UI components
- React Flow for the visual builder functionality
