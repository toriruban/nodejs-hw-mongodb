# 📦 ContactsApp (Node.js REST API)

## 🧠 Description
A RESTful API for managing user contacts.  
The project includes user authentication (JWT), refresh tokens, password reset via email, and contact management with image upload.  
Built with **Node.js**, **Express**, and **MongoDB**.

---

## 🧰 Tech Stack
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth & Security:** JWT, bcryptjs  
**Validation:** Joi  
**Email:** Nodemailer  
**File Upload:** Multer, Jimp  
**Docs:** Swagger / OpenAPI  
**Other:** dotenv, morgan, cors

---

## 📁 Project Structure
```
src/
 ├─ server.js
 ├─ app.js
 ├─ routes/
 │   ├─ authRoutes.js
 │   └─ contactsRoutes.js
 ├─ controllers/
 ├─ services/
 ├─ models/
 ├─ middlewares/
 ├─ helpers/
 └─ schemas/
```

---

## 🔐 Authentication Routes (`/api/auth`)
| Method | Endpoint | Description |
|--------|-----------|-------------|
| **POST** | `/register` | Register new user |
| **POST** | `/login` | Log in user |
| **POST** | `/logout` | Log out current user |
| **POST** | `/refresh` | Refresh JWT access token |
| **POST** | `/send-reset-email` | Send password reset link via email |
| **POST** | `/reset-pwd` | Reset user password |

---

## 👥 Contacts Routes (`/api/contacts`)
> All routes require authentication via Bearer Token.

| Method | Endpoint | Description |
|--------|-----------|-------------|
| **GET** | `/` | Get all user contacts |
| **GET** | `/:contactId` | Get contact by ID |
| **POST** | `/` | Create new contact (with photo upload) |
| **PATCH** | `/:contactId` | Update contact info or photo |
| **DELETE** | `/:contactId` | Delete contact by ID |

---

## 🧾 Validation Schemas
- `registerUserSchema`
- `loginUserSchema`
- `createContactSchema`
- `updateContactSchema`
- `sendResetPasswordEmailValidationSchema`
- `resetPasswordValidationSchema`

---

## 🧪 Usage

### Run locally
```bash
npm install
npm run dev
```
Create `.env` file:
```
PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
REFRESH_SECRET=your_refresh_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
```

---

## 🚀 Deployment
Deployed on **Render`https://contacts-app-ov41.onrender.com`**.  
API tested with **Postman** and documented with **Swagger `http://localhost:3000/api-docs/`**.

🔗 **Example base URL:**  
`https://contacts-app-ov41.onrender.com/contacts`

---

## 📌 Author
**Viktoriia Ruban** — Junior Back-End Developer  
📧 toriruban@icloud.com  
🔗 [GitHub Profile](https://github.com/toriruban)
