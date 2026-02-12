# Frontend - Waste Reporting App

React + TypeScript + Vite frontend for the Geo-Tagged Waste Reporting App.

## Features

- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📱 Responsive design for mobile and desktop
- 👥 Role-based interfaces (Citizen, Cleaner, Admin)
- 🗺️ Interactive map integration
- 📸 Image upload and management
- 🎯 Real-time notifications
- 🏆 Rewards and gamification

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **UI Library:** shadcn/ui
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context

## Setup

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Configuration

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_AI_MODEL_URL=http://localhost:8000/api
VITE_MAP_API_KEY=your_map_api_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

App will start at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

Built files will be in `dist/` directory.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── screens/         # Screen components
│   │   │   ├── admin/       # Admin screens
│   │   │   ├── citizen/     # Citizen screens
│   │   │   └── cleaner/     # Cleaner screens
│   │   ├── ui/              # Reusable UI components
│   │   └── figma/           # Figma-exported components
│   ├── context/             # React context providers
│   │   └── AppContext.tsx   # Global state management
│   ├── styles/              # Global styles
│   │   └── globals.css
│   ├── App.tsx              # Main app component
│   └── main.tsx             # Entry point
├── index.html
├── package.json
└── vite.config.ts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## User Roles

### Citizen
- Report waste with location and images
- Track report status
- Earn reward points
- View map of reports

### Cleaner
- View assigned tasks
- Update task status
- Upload before/after photos
- Complete cleanup reports

### Admin
- Manage all reports
- Assign tasks to cleaners
- View analytics dashboard
- Manage users

## Features by Screen

### Citizen Dashboard
- Quick report creation
- Report statistics
- Recent reports
- Reward points

### Map View
- Interactive map with markers
- Filter by category
- Real-time updates
- Cluster view

### Report Waste
- Category selection
- Location picker
- Image upload
- Description

### My Reports
- List of user's reports
- Status tracking
- Report details

### Cleaner Dashboard
- Assigned tasks
- Task statistics
- Quick actions

### Admin Dashboard
- Overview statistics
- Report management
- User management
- Analytics

## Styling

The app uses:
- **Tailwind CSS** for utility-first styling
- **shadcn/ui** for pre-built components
- **CSS Variables** for theming
- **Responsive design** with mobile-first approach

## API Integration

The frontend connects to the backend API at:
- Default: `http://localhost:5000/api`
- Configure via `VITE_API_URL` environment variable

## Deployment

### Vercel
```bash
npm run build
# Deploy dist/ folder
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## Contributing

1. Follow TypeScript best practices
2. Use existing UI components from `components/ui/`
3. Maintain responsive design
4. Add proper TypeScript types
5. Test on multiple devices

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
