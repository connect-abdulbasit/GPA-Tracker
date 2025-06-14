# GPA Calculator

A modern web application for university students to track and manage their academic performance. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 📊 **Smart Analytics**
  - Visualize GPA trends with beautiful charts
  - Track academic performance over time
  - Course-wise performance analysis

- 🧮 **Auto Calculations**
  - Automatic SGPA and CGPA calculations
  - Detailed grade breakdowns
  - Support for different grading scales

- 📚 **Course Management**
  - Organize courses by semester
  - Track credit hours
  - Monitor individual course performance

- 🎯 **GPA Forecasting**
  - Set academic goals
  - Forecast future CGPA
  - Plan upcoming courses

- 📱 **Modern UI/UX**
  - Responsive design
  - Dark/Light mode support
  - Beautiful animations and transitions

- 🔒 **Security**
  - User authentication with Clerk
  - Encrypted data storage
  - Private and secure

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Authentication**: Clerk
- **Database**: PostgreSQL with Drizzle ORM
- **Charts**: Recharts
- **Icons**: Lucide Icons
- **Animations**: Framer Motion

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/gpa-calculator.git
cd gpa-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Fill in the required environment variables in `.env.local`

4. Set up the database:
```bash
npm run db:generate
npm run db:migrate
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:migrate` - Run database migrations
- `npm run db:reset` - Reset database
- `npm run db:seed` - Seed database with sample data
- `npm run db:generate` - Generate database types
- `npm run db:push` - Push schema changes to database

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   └── actions/           # Server actions
├── components/            # React components
│   ├── ui/               # UI components
│   └── ...               # Feature components
├── lib/                  # Utility functions
├── public/              # Static assets
└── src/                 # Source files
    └── db/              # Database configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Clerk](https://clerk.com/) for authentication
- [Drizzle ORM](https://orm.drizzle.team/) for database management 