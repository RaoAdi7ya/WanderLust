# 🏕️ WanderLust

A full-stack property listing and booking platform inspired by Airbnb. Built with Node.js, Express, MongoDB, and EJS.

🔗 **Live Demo:** _Coming soon on Render_

---

## ✨ Features

- **User Authentication** — Secure signup/login with session management using Passport.js
- **Listings CRUD** — Create, edit, and delete property listings with full authorization
- **Image Upload** — Upload listing photos via Cloudinary
- **Reviews & Ratings** — Authenticated users can post and delete reviews on listings
- **Interactive Map** — Mapbox integration to visualize listing locations

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Templating | EJS, EJS-Mate |
| Auth | Passport.js, express-session |
| Image Storage | Cloudinary, Multer |
| Maps | Mapbox GL JS |
| Validation | Joi |

---

## 📁 Project Structure

```
WanderLust/
├── models/         # Mongoose schemas (Listing, Review, User)
├── routes/         # Express route handlers
├── views/          # EJS templates
├── public/         # Static assets (CSS, JS)
├── utils/          # Error handling utilities
├── app.js          # Entry point
└── schema.js       # Joi validation schemas
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account
- Mapbox account

### Installation

```bash
# Clone the repo
git clone https://github.com/RaoAdi7ya/WanderLust.git
cd WanderLust

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the root:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
```

### Run Locally

```bash
node app.js
```

App runs at `http://localhost:8080`

---

## 👨‍💻 Author

**Aditya Yadav**  
[GitHub](https://github.com/RaoAdi7ya) • [LinkedIn](https://linkedin.com/in/aditya-yadav-301409396)
