
# 🎓 GPA Calculator

A modern, feature-rich web application designed for university students to track, analyze, and forecast their academic performance with ease. Built using **Next.js**, **TypeScript**, and **Tailwind CSS** for optimal developer and user experience.

---

## ✨ Features

### 📊 Smart Analytics
- Visualize GPA trends with interactive charts
- Track academic performance over semesters
- Analyze course-wise grade breakdowns

### 🧮 Automatic Calculations
- Real-time SGPA & CGPA calculations
- Supports various grading scales
- Instant feedback on course grades

### 📚 Course Management
- Organize courses by semester
- Track credit hours and grades
- Easily add/edit/remove subjects

### 🎯 GPA Forecasting
- Set CGPA goals and forecast future scores
- Plan upcoming semesters
- Make informed academic decisions

### 🖥️ Modern UI/UX
- Fully responsive design
- Dark mode / Light mode toggle
- Smooth animations and transitions

### 🔐 Security First
- User authentication via Clerk
- Encrypted, private academic data
- Secure sessions and protected routes

---

## 🧰 Tech Stack

| Layer        | Technology                    |
|--------------|-------------------------------|
| **Frontend** | Next.js 14, TypeScript, Tailwind CSS |
| **UI Kit**   | shadcn/ui, Lucide Icons        |
| **Database** | PostgreSQL + Drizzle ORM       |
| **Auth**     | Clerk                          |
| **Charts**   | Recharts                       |
| **Animations** | Framer Motion                |

---

## ⚙️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gpa-calculator.git
   cd gpa-calculator

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   > Update `.env.local` with your database, Clerk, and other config values.

4. **Initialize the database**

   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Now open your browser at [http://localhost:3000](http://localhost:3000) 🚀

---

## 📜 Available Scripts

| Script                | Description                     |
| --------------------- | ------------------------------- |
| `npm run dev`         | Start development server        |
| `npm run build`       | Build for production            |
| `npm run start`       | Start production server         |
| `npm run lint`        | Run ESLint                      |
| `npm run db:migrate`  | Apply database migrations       |
| `npm run db:reset`    | Reset and reinitialize database |
| `npm run db:seed`     | Populate DB with test data      |
| `npm run db:generate` | Generate types from schema      |
| `npm run db:push`     | Push schema to the database     |

---

## 📁 Project Structure

```
├── app/                     # Next.js app directory
│   ├── (auth)/             # Authentication routes
│   ├── (dashboard)/        # Main dashboard routes
│   └── actions/            # Server actions
├── components/             # Reusable UI and feature components
│   └── ui/                 # UI components (shadcn)
├── lib/                    # Utility functions & helpers
├── public/                 # Static assets
└── src/
    └── db/                 # Drizzle config & schema
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. Fork this repo
2. Create a new branch:
   `git checkout -b feature/your-feature-name`
3. Make your changes and commit:
   `git commit -m "Add your feature"`
4. Push to your fork:
   `git push origin feature/your-feature-name`
5. Open a Pull Request and describe your changes 🙌

---

## 📄 License

This project is licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for more details.

---

## 🙏 Acknowledgments

* [shadcn/ui](https://ui.shadcn.com/) – Clean, composable UI components
* [Clerk](https://clerk.com/) – Easy and secure user authentication
* [Drizzle ORM](https://orm.drizzle.team/) – Type-safe SQL ORM for TS
* [Recharts](https://recharts.org/) – Elegant charting library
* [Framer Motion](https://www.framer.com/motion/) – Beautiful animations for React

---

> Made with 💙 by student, for students.

```

Let me know if you'd like:
- A deployment section (e.g., Vercel or Docker)
- CI/CD instructions
- A live demo badge
- Screenshots or GIFs added to showcase the UI
```
