
# 📘 StudyNotion

**StudyNotion** is a full-stack EdTech web application. It empowers users to create, manage, and enroll in online courses. Built with the MERN stack, it offers robust user authentication, real-time updates, secure payments, and an intuitive UI for students and instructors.

---

## 🔧 Tech Stack

- **Frontend:** React.js, Tailwind CSS, Redux Toolkit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens), Bcrypt
- **File Uploads:** Cloudinary
- **Payments:** Razorpay
- **Email:** Nodemailer
- **Video Player:** React Player
- **Environment Management:** dotenv

---

## ✨ Features

### 👩‍🏫 Instructor Side
- Course creation with modules, lectures, and quizzes
- Video and thumbnail upload via Cloudinary
- Dashboard with earnings and course management

### 🎓 Learner Side
- Browse and enroll in courses
- Secure payment with Razorpay
- Track progress and access course materials

### 🔐 Authentication & Authorization
- Signup/login with role-based access (Student / Instructor)
- Password reset via email
- Protected routes using JWT

### 📧 Email Integration
- Welcome emails
- Password reset links
- Course enrollment confirmations

### 📦 Other Features
- Responsive design using Tailwind CSS
- Toast notifications for feedback
- Admin dashboard (optional feature for super-admins)

---

## 🏗️ Project Structure

```
StudyNotion/              # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
├── server/               # Express Backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── utils/
├── .env
├── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/studynotion.git
cd studynotion
```

### 2. Setup Environment Variables
Create a `.env` file in the `server/` directory and add:

```env
MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

### 3. Install Dependencies

#### For client
```bash
cd client
npm install
```

#### For server
```bash
cd server
npm install
```



### 4. Run Locally

#### In one terminal (backend + frontend) in parent directory:

# The project uses run concurrently
npm run dev





---

## 📸 Screenshots

> Add UI screenshots here of dashboard, course creation, player etc.

---

## 📚 License

Self Owned 

---

## 🙋 Author

**Ayushmaan Gupta**  
📧 ayush.261.gupta@gmail.com  
🔗 [GitHub](https://github.com/ayushmaangupta261)  
🔗 [LinkedIn](https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile)
