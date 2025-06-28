# 🍽️ Bon Service

**Bon Service** is an innovative application designed for the **management, standardization, and sharing of recipes** within professional kitchens. It helps chefs streamline operations such as **cost calculation**, **inventory organization**, and **PDF export** of recipes.

Built with **Next.js**, **TypeScript**, and **Tailwind CSS**, the app offers a modern and responsive user interface. Data is stored using **PostgreSQL** and files are hosted with **Amazon S3**.

🔗 [Watch the LinkedIn demo](https://www.linkedin.com/posts/remi-chuet_programming-typescript-web-activity-7232413573312901122-W4nw?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD1EaqABCnci4wMsLt3JatEzCkbRMogTir8)

---

## ⚙️ Installation

Open a terminal at the root of the project and run the following steps:

1. **Navigate to the project directory**:

   ```bash
   cd KitchenCompanion/dev/kitchencompanion
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up the environment variables**:

   Ask a project admin for the `.env` file and place it in the current directory.

4. **Generate Prisma client**:

   ```bash
   npx prisma generate
   ```

5. **Start the development server**:

   ```bash
   npm run dev
   ```

6. Open your browser and visit:

   ```
   http://localhost:3000
   ```

---

## 🧩 Features

* 🛒 **Market Management**: Add or edit ingredients manually or upload a PDF receipt.
* 📖 **Recipe Management**: Create, edit, and delete recipes.
* 🤝 **Team Collaboration**: Share recipes and contacts within your kitchen team.
* 🗂️ **Recipe Organization**: Categorize recipes into cookbooks for easier browsing.
* 📄 **Export**: Download recipes, ingredients, or contacts as PDF files.

---

## 🛠️ Tech Stack

* **TypeScript** – Type-safe JavaScript for more robust code.
* **Next.js** – React framework for building full-stack web applications.
* **NextAuth** – Authentication library for secure sign-in (Credentials provider).
* **React** – Component-based library for dynamic UIs.
* **Prisma** – Type-safe ORM for PostgreSQL.
* **ShadCN** – Beautiful component library built on Radix UI + Tailwind.
* **Zod** – Schema validation for frontend and backend.
* **Tailwind CSS** – Utility-first CSS framework for rapid UI design.
* **Jest** – Testing framework for unit and integration tests.
* **Bcrypt** – Password hashing for secure storage.
* **Resend** – Email sending API for password reset and notifications.
* **JsPDF** – Client-side PDF generation from the browser.

---

## 📚 Learning Resources

* **NextAuth Credentials Tutorial** – YouTube guide on implementing custom auth.
* **Next.js Clean Architecture** – Architectural inspiration from early development.
* **Web Dev Cody** – Next.js + deployment tutorials.
* **Theo Browne** – Advanced TypeScript and React content.
* **Josh W Comeau** – High-quality blog on React and frontend patterns.

---

## 👥 Team

| Name                    | Role                | Contact                                                         |
| ----------------------- | ------------------- | --------------------------------------------------------------- |
| Rémi Chuet              | Developer, Designer | [remschuet@gmail.com](mailto:remschuet@gmail.com)               |
| Julien Coulombe-Morency | Developer, Designer | [jcoulombemorency@gmail.com](mailto:jcoulombemorency@gmail.com) |

---

## 🙏 Special Thanks

* **Pierre-Paul Monty** – Discussions on tree traversal algorithms.
* **Frédéric Thériault** – Guidance on web security.
* **Martine Coulombe** – Technical document proofreading.
* **David Chuet** – Technical document proofreading.
