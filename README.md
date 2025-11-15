# 💸PayFlow – Wallet Management System

A modern, secure, role-based digital wallet management system featuring Admin, Agent, and User dashboards. Built with React + TypeScript + Redux Toolkit, and designed with a premium ShadCN UI Lime theme.

---

## 🔧 Features

### 👤 User

- Wallet overview

- Send / Receive money

- View recent transactions

- View transaction history

### 🧑‍💼 Agent

- Perform Cash-In / Cash-Out for users

- Earn commission on transactions

- View own commission history

### 🧑‍⚖️ Admin

- Manage users, agents, wallets, and transactions

- Approve / Suspend agents

- Block / Unblock user wallets

- View all system data (users, agents, wallets, transactions)

---

## 🚀 Technologies Used

| Layer              | Technology                          |
| ------------------ | ----------------------------------- |
| **Language**       | React.js,TypeScript                          |
| **Framework**      | Express.js                          |
| **Database**       | MongoDB (Mongoose ORM)              |
| **Authentication** | JWT (JSON Web Token)                |
| **Security**       | bcryptjs, dotenv, role-based access |
| **Error Handling** | Centralized custom AppError handler |
| **Code Quality**   | ESLint, Prettier                    |
| **Environment**    | Node.js                             |

---

## 📁 Project Structure
```
src/
│
├── assets/            # Images, icons
├── components/        # Reusable UI + modules
│   └── ui/            # ShadCN UI components
├── config/            # Global config
├── constants/         # App constants (roles, enums)
├── hooks/             # Custom hooks (useAuth, useMobile)
├── layout/            # Layouts (Navbar, DashboardLayout)
├── lib/               # Axios instance, utilities
├── pages/             # All pages (admin, agent, user)
├── redux/             # Store, slices, RTK Query APIs
├── routes/            # Role-based routes + sidebar items
├── types/             # TypeScript types/interfaces
└── utils/             # Helpers (withAuth, formatData, etc.)
```


---

## 🛠️ Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/digital-wallet-frontend.git
cd digital-wallet-frontend

```

### 2. Install Dependencies
```bash
npm install
```
### 3. Setup Environment Variables
```
//Create a .env file in the root directory and add:

VITE_API_URL=https://your-backend-url.com/api/v1


```
### 4. Start the Development Server
```
npm run dev
```
Server will run at: http://localhost:5173



# 📬 API Endpoints Overview
##  💼 WALLET MODULE
Method	Endpoint	Description:
```
POST    /api/v1/wallet/create           (Create wallet for a user)
GET     /api/v1/wallet                  (Get logged-in user wallet)
POST    /api/v1/wallet/transfer         (Transfer funds between users)
PATCH  /api/v1/admin/wallet/:id/block  (Admin: Block user wallet)
PATCH   /api/v1/admin/wallet/:id/unblock(Admin: Unblock user wallet)

```
## 💰 TRANSACTION MODULE
Method	Endpoint	Description:
```
GET     /api/v1/transactions/:userId    (Get all transactions for a specific user)
GET     /api/v1/admin/transactions      (Admin: Get all transactions)


```
## 🧑‍⚖️ ADMIN MODULE
Method	Endpoint	Description:
```
GET     /api/v1/admin/users             (Admin: View all users)
GET     /api/v1/admin/agents            (Admin: View all agents)
GET     /api/v1/admin/wallets           (Admin: View all wallets)
GET     /api/v1/admin/transactions      (Admin: View all transactions)
PATCH   /api/v1/admin/agents/:id/block (Admin: Block user)
PATCH   /api/v1/admin/agents/:id/inblock (Admin: Unblock user)
PATCH   /api/v1/admin/agents/:id/approve (Admin: Approve agent)
PATCH   /api/v1/admin/agents/:id/suspend (Admin: Suspend agent)


```



## 🔑 Authentication
JWT tokens are required for all protected routes.

Header Example:
```
Authorization: Bearer <your_token_here>

```
## 🧪 Testing with Postman
You can test all endpoints easily using Postman.
Import the ready-to-use Postman Collection:
/postman_collection.json

Then:

- Register or login to get a token

- Add the token to the Authorization header

- Test any module (User / Agent / Admin)
## 🧠 Role-Based Access
| Role      | Permissions                              |
| --------- | ---------------------------------------- |
| **User**  | Manage profile, wallet, and transactions |
| **Agent** | Perform cash-in/out and view commission  |
| **Admin** | Full system access and control           |

## 🧾 Example Transaction Flow
- User registers → wallet automatically created
- Agent performs cash-in to user wallet
- User can now transfer or withdraw
- All transactions recorded in DB
- Agent earns commission
- Admin monitors everything


