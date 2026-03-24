# PromptKit - Enterprise AI Workspace

PromptKit is a sophisticated, persona-aware AI prompt engineering platform designed for developers, product managers, marketers, and business professionals. It transforms raw, unrefined ideas into expert-level, highly structured instructions optimized for top-tier AI models.

## ✨ Features

* **Advanced Persona Engine**: Choose from 5 different Experience Levels (Novice to Lead/Principal) and 20+ specific Domains/Roles (Software Developer, Marketing, Operations, etc.).
* **Target AI Engine Optimization**: Outputs are specifically tailored for execution in the most popular AI tools:
  * ChatGPT, Claude 3, Gemini, Antigravity, Lovable, v0 (Vercel), Bolt.new, Cursor, GitHub Copilot, and Midjourney.
* **Output Modes**:
  * **Structured**: Clear breakdowns with Role, Task, Context, Reasoning, and Output format.
  * **Concise**: Compact, straight to the point.
  * **Detailed**: Thorough output with edge-case considerations.
  * **JSON**: Strictly formatted data output.
  * **Master Prompt**: Advanced, multi-layered framing targeting expert prompt engineers.
* **Premium UX/UI**: Beautiful corporate dark-theme implementation featuring glassmorphism, responsive layouts, and robust loading skeletons.
* **Local History**: Automatically saves your most recent 10 prompts directly into `localStorage` so you never lose your ideas.

## 🚀 Tech Stack

* **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **AI Provider**: [Google Gemini API](https://aistudio.google.com/) (`gemini-1.5-pro`)
* **Deployment**: Configured for [Netlify](https://www.netlify.com/)

## 🛠️ Getting Started

### Prerequisites
You will need a free Google Gemini API Key. You can acquire one at [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TamilselvanRaman/PromptKit.git
   ```

2. Navigate to the project directory:
   ```bash
   cd PromptKit
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to `http://localhost:3000`. You can configure your API Key directly within the web app via the "API Key" modal.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/TamilselvanRaman/PromptKit/issues).

## 📄 License

This project is licensed under the MIT License.
