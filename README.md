# 🌾 CropGuard AI — Smart Farming for a Stronger Telangana

> **Data-driven precision agriculture for smarter crop decisions, risk awareness, and resilient farming in Telangana.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-CropGuard%20AI-success?style=for-the-badge)](https://cropguard-ai-1.ai.studio/#home)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge\&logo=github)](https://github.com/SAINIKHILCHARY/CropGuard_AI)

---

## 🚀 Live Demo

### 🌱 [CropGuard AI — Smart Farming for a Stronger Telangana](https://cropguard-ai-1.ai.studio/#home)

Explore the deployed application and interact with the CropGuard AI platform.

---

## 📌 Overview

**CropGuard AI** is a data-driven precision agriculture platform designed specifically for **Telangana farmers**.

The platform combines agricultural data, environmental factors, machine learning concepts, and an interactive web interface to help users understand:

* 🌾 Crop productivity and yield patterns
* 🌧️ Rainfall and environmental conditions
* ⚠️ Agricultural risk at the district level
* 📊 Historical crop performance
* 🌱 Resilient crop recommendations
* 📈 Data-driven farming decisions

The goal is to transform agricultural data into **simple, actionable insights** that can support farmers, agricultural stakeholders, and decision-makers.

---

## 🎯 Problem Statement

Agriculture in Telangana is strongly influenced by factors such as:

* Rainfall variability
* Irrigation availability
* Soil conditions
* Crop selection
* Seasonal changes
* District-level differences in productivity
* Climate-related agricultural risks

Traditional decision-making often depends heavily on historical experience and fragmented information.

CropGuard AI addresses this challenge by bringing relevant agricultural information together into an **interactive decision-support platform**.

---

## 💡 Solution

CropGuard AI provides a centralized platform where agricultural data can be analyzed and presented through:

### 1. 📊 Agricultural Analytics

Analyze historical agricultural patterns across Telangana using crop, district, season, area, production, and environmental data.

### 2. ⚠️ District Risk Classification

Identify differences in agricultural risk across districts and provide a clearer view of areas that may require greater attention.

### 3. 🌾 Yield Estimation

Use historical agricultural and environmental factors to understand and estimate crop yield patterns.

### 4. 🌱 Resilient Crop Recommendations

Support crop-selection decisions by considering agricultural conditions and historical performance.

### 5. 📈 Interactive Visualizations

Present complex agricultural information through interactive charts, indicators, and dashboards.

### 6. 🤖 AI-Assisted Insights

Use AI capabilities to make agricultural information easier to understand and convert analytical results into practical insights.

---

## 🧠 Key Features

| Feature                  | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| 🌾 Crop Analytics        | Explore crop production and productivity patterns                 |
| 📍 District Analysis     | Compare agricultural conditions across Telangana districts        |
| ⚠️ Risk Classification   | Identify relative agricultural risk levels                        |
| 📈 Yield Estimation      | Estimate crop yield using relevant agricultural factors           |
| 🌱 Crop Recommendations  | Identify crops suited to observed agricultural conditions         |
| 🌧️ Rainfall Analysis    | Analyze rainfall patterns and their relationship with agriculture |
| 📊 Interactive Dashboard | Explore agricultural insights through visualizations              |
| 🤖 AI Insights           | Generate understandable insights from agricultural information    |
| 📱 Responsive UI         | Designed for convenient access across modern devices              |

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────────┐
                    │   Agricultural Data     │
                    │                         │
                    │ • Crop Production      │
                    │ • Rainfall             │
                    │ • Soil / Environment   │
                    │ • District Information  │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │     Data Processing     │
                    │                         │
                    │ • Cleaning              │
                    │ • Transformation        │
                    │ • Feature Engineering   │
                    │ • Data Integration      │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │   Analytics / ML Layer  │
                    │                         │
                    │ • EDA                  │
                    │ • Risk Analysis         │
                    │ • Yield Estimation      │
                    │ • Crop Recommendation   │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │       CropGuard AI      │
                    │     Web Application     │
                    │                         │
                    │ • Dashboard             │
                    │ • Visualizations        │
                    │ • AI Insights           │
                    │ • Recommendations       │
                    └─────────────────────────┘
```

---

## 🔬 Data & Analytical Approach

The project follows a complete data-to-insight workflow:

### Step 1 — Data Collection

Agricultural and environmental datasets are collected for Telangana.

Important variables include:

* District
* Crop
* Season
* Year
* Cultivated Area
* Production
* Rainfall
* Soil-related information
* Irrigation-related information
* Temperature and environmental variables

### Step 2 — Data Cleaning

The data is prepared by handling:

* Missing values
* Duplicate records
* Inconsistent formats
* Date transformations
* Categorical variables
* Numerical variables
* Outliers where appropriate

### Step 3 — Feature Engineering

Useful agricultural features are derived from the available data.

For example:

```text
Yield = Production / Area
```

Additional temporal and environmental features can then be used for analysis and modeling.

### Step 4 — Exploratory Data Analysis

The project analyzes:

* Crop-wise performance
* District-wise productivity
* Year-wise production
* Rainfall patterns
* Area vs Production
* Area vs Yield
* Environmental relationships
* Agricultural risk patterns

### Step 5 — Machine Learning / Analytics

Relevant machine-learning and analytical techniques are applied to support:

* Yield estimation
* Risk classification
* Crop recommendation
* Agricultural pattern identification

---

## 📊 Important Agricultural Insights

Some of the analysis performed during the project showed:

### Area vs Production

The correlation between **Area and Production was approximately 0.6602**, indicating a moderate positive relationship.

This suggests that production generally increases with cultivated area, although cultivated area alone does not determine agricultural productivity.

### Area vs Yield

The correlation between **Area and Yield was approximately -0.0067**, which is very close to zero.

This indicates that cultivated area by itself has almost no direct linear relationship with yield in the analyzed data.

### District-Level Variation

Average yield differed substantially across districts, demonstrating that agricultural productivity is not uniform across Telangana.

This highlights the importance of considering **district-specific agricultural conditions** rather than applying the same recommendation everywhere.

### Year-wise Production Variation

Agricultural production also varied significantly across different agricultural years, highlighting the importance of temporal and environmental factors in agricultural planning.

> These values represent findings from the project's analyzed dataset and should not be interpreted as universal agricultural laws.

---

## 🛠️ Technology Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide React
* Recharts
* Motion

### Backend

* Node.js
* Express
* TypeScript

### AI

* Google Gemini / Google GenAI

### Data & Analytics

* Python
* Pandas
* NumPy
* Scikit-learn
* Jupyter Notebook

### Development Tools

* Git
* GitHub
* VS Code
* Vite
* npm

The current repository's `package.json` confirms the React, Vite, Express, Google GenAI, Recharts, Tailwind, Motion, TypeScript, and related dependencies used by the web application.

---

## 📁 Project Structure

```text
CropGuard_AI/
│
├── data/
│   └── Agricultural datasets
│
├── docs/
│   └── Project documentation
│
├── notebooks/
│   └── Data analysis & ML notebooks
│
├── src/
│   └── Application source code
│
├── .env.example
├── .gitignore
├── bun.lock
├── index.html
├── metadata.json
├── package.json
├── server.ts
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/SAINIKHILCHARY/CropGuard_AI.git
```

### 2. Navigate into the project

```bash
cd CropGuard_AI
```

### 3. Install dependencies

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### 4. Configure environment variables

Create your environment file from the provided example:

```bash
cp .env.example .env
```

Then configure the required API credentials/environment variables.

> **Important:** Never commit API keys, passwords, tokens, or other secrets to GitHub.

### 5. Start the development server

```bash
npm run dev
```

The project's current development script runs the application through `tsx server.ts`.

---

## 🏭 Production Build

Create a production build using:

```bash
npm run build
```

Then start the production server:

```bash
npm start
```

The repository defines the build and start scripts in `package.json`.

---

## 🧪 Code Quality

TypeScript checking can be performed with:

```bash
npm run lint
```

This runs:

```bash
tsc --noEmit
```

---

## 🌐 Deployment

The production application is available at:

### 👉 [CropGuard AI — Live Application](https://cropguard-ai-1.ai.studio/#home)

The source code is available at:

### 👉 [CropGuard AI — GitHub Repository](https://github.com/SAINIKHILCHARY/CropGuard_AI)

---

## 🔮 Future Enhancements

Potential future improvements include:

* 📡 Real-time weather integration
* 🌧️ Weather-based crop risk alerts
* 🛰️ Satellite-based crop monitoring
* 🌱 Soil health integration
* 📍 More granular location-level recommendations
* 📱 Progressive Web App / mobile support
* 🔔 Farmer notification system
* 📊 Advanced district-level dashboards
* 🤖 Improved ML models with continuous retraining
* 🌾 More crop varieties and regional datasets
* 🗣️ Telugu-language farmer assistance
* 📴 Offline/low-connectivity support

---

## 🎯 Project Impact

CropGuard AI is designed to bridge the gap between **agricultural data and practical decision-making**.

Instead of presenting raw datasets, the platform converts agricultural information into:

```text
Raw Agricultural Data
        ↓
Data Cleaning
        ↓
Feature Engineering
        ↓
Analytics & Machine Learning
        ↓
Risk & Yield Insights
        ↓
Crop Recommendations
        ↓
Actionable Agricultural Intelligence
```

This makes the system useful not only as an ML/data-science project but also as a **precision-agriculture decision-support platform**.

---

## 👨‍💻 Developer

### **Sainikhil Chary**

B.Tech — Computer Science & Engineering (AI)

Interested in:

* Data Science
* Machine Learning
* Full Stack Development
* AI Applications
* Data Analytics
* Precision Agriculture

### 🔗 Links

* **GitHub:** https://github.com/SAINIKHILCHARY
* **Project Repository:** https://github.com/SAINIKHILCHARY/CropGuard_AI
* **Live Project:** https://cropguard-ai-1.ai.studio/#home

---

## 📜 License

This project is intended for educational, research, and portfolio purposes.

If you plan to distribute or commercially deploy the project, add an explicit open-source license such as MIT after confirming that the project's datasets, dependencies, and other assets permit that use.

---

## ⭐ Support

If you find **CropGuard AI** useful, consider giving the repository a ⭐ on GitHub.

**CropGuard AI — Smart Farming for a Stronger Telangana 🌾**
