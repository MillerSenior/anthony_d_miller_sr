# Tech Terms — Personal Reference Guide

Plain-English explanations for every term on my resume. For when someone asks "what's that mean?"

---

## Authentication & Security

| Term | What it means in plain English | Where it shows up |
|---|---|---|
| **WebAuthn** | A web standard that lets you log in using your fingerprint, face, or a device PIN instead of a password. Your browser handles it — no password ever gets sent. | Roeslein: biometric login feature I built |
| **FIDO2** | The industry standard behind WebAuthn. FIDO2 is the full spec; WebAuthn is the web version of it. Think of FIDO2 as the rulebook and WebAuthn as the implementation. | Roeslein: same biometric auth feature |
| **Passkeys** | The modern "passwordless" login method. Your phone or computer holds a key — you prove it's you with your face or fingerprint — and that's it. No typing a password. | Roeslein: users can log in with their device |
| **Windows Hello** | Microsoft's built-in biometric login for Windows — face recognition or fingerprint. The Roeslein app supports it as a login method. | Roeslein: login on Windows machines |
| **Face ID** | Apple's face recognition login on iPhones and Macs. Same idea — user looks at camera, gets logged in. | Roeslein: login on Apple devices |
| **Challenge storage** | A one-time code the server sends during login to prove the request isn't a replay. I store it temporarily and discard it after use. | Roeslein: security mechanism inside the auth system |
| **Replay protection** | Prevents someone from intercepting your login signal and reusing it to log in as you. The challenge code expires so it can't be replayed. | Roeslein: security inside biometric auth |
| **JWT** | JSON Web Token. A secure digital pass the server gives you after login — your browser holds it and shows it on every request to prove you're logged in. Like a wristband at an event. | Darro Tech: darrotech.com platform login system |
| **RBAC** | Role-Based Access Control. Different users get different permissions based on their role (admin, client, viewer). The system checks your role before letting you do things. | Darro Tech: client portals with different access levels |
| **JWT session token bridge** | Connecting two different login systems — FIDO2 (the biometric part) and JWT (the "stay logged in" part) — so after your fingerprint works, the app knows who you are going forward. | Roeslein: linking biometric login to the rest of the app |
| **Argon2id** | A password-hashing algorithm. When you set a password, it gets scrambled in a way that can't be reversed. Even if someone stole the database, they'd only see scrambled nonsense. | Skills section: how passwords are stored securely |
| **CSRF protection** | Cross-Site Request Forgery protection. Prevents a malicious website from secretly sending requests to your app pretending to be a logged-in user. | Skills section: standard security layer on web apps |
| **Brute-force & rate limiting** | Brute-force is when someone tries thousands of passwords to guess yours. Rate limiting slows them down by blocking too many attempts in a short window. | Skills section: security hardening on login systems |
| **Attack-vector test suites** | Automated tests that specifically try to break the app the way a hacker would — wrong passwords, bad inputs, unauthorized access attempts. | Skills section: security testing practice |

---

## Web Frameworks & Languages

| Term | What it means in plain English | Where it shows up |
|---|---|---|
| **Spring Boot** | A Java-based toolkit for building web servers and APIs. It handles a lot of the boring setup so I can focus on the actual logic. | Roeslein: backend server powering the analytics platform |
| **Next.js** | A React-based framework for building fast, modern websites. Handles routing, page loading, and server communication. | Darro Tech / projects: frontend web apps |
| **React** | A JavaScript library for building the interactive parts of a website — buttons, forms, dashboards that update without reloading the page. | Most frontend projects across the resume |
| **Angular** | A JavaScript framework similar to React, made by Google. More structured, often used in enterprise apps. | Skills section: used in earlier or client projects |
| **Flask** | A lightweight Python web framework. Good for building small APIs or data services quickly. | Skills section / data projects |
| **Node.js** | Lets JavaScript run on the server (not just in the browser). Used to build backends and APIs with JavaScript. | Skills section / various projects |
| **PHP** | An older web programming language still widely used, especially on sites like WordPress. | Skills section |
| **Go** | A fast, simple programming language made by Google. Good for performance-sensitive backend services. | Skills section / homelab projects |
| **Python** | A general-purpose programming language great for data, AI, scripting, and web backends. | AI & data work, Flask projects |
| **JavaScript** | The programming language of the web. Makes websites interactive and powers most modern frontend and Node.js backend code. | Almost everything frontend |
| **Java** | A widely-used programming language that runs on virtually any platform. Spring Boot is built on Java. | Roeslein backend, LaunchCode certification |
| **HTML** | The structure of a webpage — headings, paragraphs, buttons, images. It's what the browser reads to know what to display. | Every web project |
| **CSS** | The styling of a webpage — colors, fonts, layout, spacing. Controls how HTML looks. | Every web project |

---

## Databases

| Term | What it means in plain English | Where it shows up |
|---|---|---|
| **PostgreSQL** | A powerful, reliable open-source database. Stores and retrieves structured data — users, transactions, records. The primary database on most projects. | Darro Tech platform, Roeslein app |
| **MySQL** | Another popular relational database, similar to PostgreSQL. Often used in older or simpler web projects. | Skills section |
| **SQLite** | A tiny database stored in a single file. No server needed — good for local development or small apps. | Skills section / development use |
| **MongoDB** | A database that stores data as flexible documents instead of rigid rows and columns. Good when the data structure changes a lot. | Skills section |
| **Prisma ORM** | A tool that lets you work with your database using normal code instead of writing raw database queries. It translates your code into database instructions. ORM = Object Relational Mapper. | Skills section / Next.js projects |
| **pgvector** | A PostgreSQL extension that lets the database store and search AI embeddings (see RAG below). Allows similarity search — "find me things that are close in meaning to this." | AI & data projects, iSeedogs |

---

## Infrastructure & DevOps

| Term | What it means in plain English | Where it shows up |
|---|---|---|
| **Docker** | A tool that packages an app and everything it needs into a container — like a self-contained box that runs the same everywhere. No "it works on my machine" problems. | Roeslein deployment, Darro Tech |
| **Git-to-container deployment** | The process of: push code to Git → Docker builds it into a container → that container gets deployed to the server. My current deployment workflow at Roeslein. | Roeslein: how I ship code updates |
| **Render** | A cloud hosting platform (like Heroku). I deploy web apps there — it handles the servers, HTTPS, and uptime. | Darro Tech: darrotech.com is hosted here |
| **AWS RDS** | Amazon's managed database hosting. Instead of running your own database server, Amazon runs it for you and handles backups and scaling. RDS = Relational Database Service. | Roeslein: production database hosting |
| **AWS EC2** | Amazon's virtual server service. I spin up a Windows server in the cloud and run software on it. EC2 = Elastic Compute Cloud. | Roeslein: Windows-based automation server |
| **PowerShell automation** | Scripts written in Windows' built-in scripting language (PowerShell) that automate repetitive tasks — scheduled jobs, file management, server configuration. | Roeslein: automating tasks on the Windows EC2 server |
| **Firebase** | Google's backend-as-a-service platform. Commonly used for real-time databases, authentication, and hosting — especially in mobile or rapid-prototype apps. | Skills section |
| **VPN mesh** | A private network that connects multiple machines securely over the internet as if they were on the same local network. Used to access homelab servers remotely. | Network setup / homelab |
| **DNS filtering** | Blocking certain websites or domains at the network level before they even reach a device. Like a parental filter but for security — blocks malware domains network-wide. | Homelab / network setup |
| **UFW firewall** | UFW = Uncomplicated Firewall. A Linux tool that controls which network traffic is allowed in and out of a server. Blocks unauthorized access. | Homelab / server hardening |
| **Uptime monitoring** | Automated checks that ping your app every few minutes and alert you if it goes down. | Darro Tech: monitoring client sites |
| **Self-hosting** | Running your own servers at home or on your own hardware rather than paying a cloud provider. More control, more responsibility. | Homelab / network setup |
| **Headless Chromium** | A web browser running without a visible window. Used to automate things like generating PDF reports from web pages — the browser loads the page, I capture it as a PDF. | Roeslein: automated PDF report generation |

---

## AI & Data

| Term | What it means in plain English | Where it shows up |
|---|---|---|
| **RAG** | Retrieval-Augmented Generation. A technique where an AI looks up relevant information from your own documents before answering a question. Instead of guessing, it reads your actual data first. | Civic tech dashboard / AI article summarization |
| **Vector embeddings** | Numbers that represent the meaning of a piece of text. Similar meanings produce similar numbers, which lets AI find related content by meaning instead of exact keyword matching. | AI projects using pgvector |
| **Semantic chunking** | Breaking a large document into meaningful pieces (by topic or paragraph) before feeding it to an AI — so the AI gets relevant context, not a wall of unrelated text. | AI / RAG pipelines |
| **ARIMA forecasting** | A statistical method for predicting future values based on past patterns — like forecasting next month's energy usage based on historical data. | Data dashboard at Unlocked Labs / energy company |
| **Z-score anomaly detection** | A math technique that flags data points that are unusually high or low compared to the normal range. Used to automatically detect when something is behaving abnormally. | Data analytics / Roeslein platform |
| **Pandas** | A Python library for working with data — reading spreadsheets, filtering rows, calculating statistics. The go-to tool for data manipulation in Python. | AI & data projects |
| **NumPy** | A Python library for fast math and number crunching. Used under the hood by most data and AI tools. | AI & data projects |
| **PDF document intelligence** | Using AI to read and extract information from PDF files — pulling out key data, summarizing content, or answering questions about what's in the document. | AI projects |

---

## Testing

| Term | What it means in plain English | Where it shows up |
|---|---|---|
| **Jest** | A JavaScript testing framework. I write code that automatically checks whether the app behaves correctly — runs hundreds of checks in seconds. | Roeslein: 230+ automated tests |
| **Playwright** | A tool that automates a real browser to test a web app — clicks buttons, fills forms, checks that the right things appear on screen. Tests the whole app the way a user would. | Roeslein: end-to-end testing |
| **Vitest** | A faster, modern alternative to Jest for JavaScript testing. Same idea — automated code checks. | Skills section / newer projects |
| **pytest** | Python's standard testing framework. Same concept as Jest but for Python code. | Python / AI projects |
| **Go test** | Go's built-in testing tool. Used to write and run automated tests for Go code. | Go / homelab projects |
| **k6** | A load testing tool. Simulates hundreds or thousands of users hitting your app at once to see if it holds up under pressure. | Skills section: performance testing |
| **TDD** | Test-Driven Development. A discipline where you write the test first (which fails), then write the code to make it pass. Ensures every feature has a test before it's built. | Roeslein: how I approach development |
| **E2E testing** | End-to-End testing. Tests the entire application from the user's perspective — login, navigate, click, submit — to make sure everything works together, not just individual pieces. | Roeslein: Playwright tests |
| **Unit tests** | Tests that check one small piece of code in isolation. Fast, specific, and run constantly during development. | Roeslein: 230+ Jest unit tests |

---

## Concepts & Platforms

| Term | What it means in plain English | Where it shows up |
|---|---|---|
| **Multi-tenant SaaS** | Software that serves multiple separate customers (tenants) from one application — each client has their own data and portal, but it runs on shared infrastructure. SaaS = Software as a Service. | Darro Tech: darrotech.com platform; Roeslein app |
| **WebRTC** | A browser technology that enables real-time video and audio calls directly between users — no app install needed. Like what powers browser-based video calls. | Darro Tech: pet owner social platform (iSeedogs) |
| **Stripe** | The payment processing platform used to handle subscriptions and billing in web apps. Like the engine behind "enter your card" screens. | Darro Tech: subscription billing on client platform |
| **Bulk aggregation** | Instead of running a separate database query for every single item, you fetch everything at once in one big query and calculate results in code. Much faster. | Roeslein: database performance optimization |
| **Cache strategy** | Storing the result of a slow operation (like a database query) temporarily so you don't have to run it again for every request. Like remembering an answer instead of recalculating it. | Roeslein: performance improvement |
| **Full-stack** | Working on both the frontend (what users see) and the backend (the server, database, logic). A full-stack engineer handles the whole thing. | My title throughout the resume |
| **API** | Application Programming Interface. A defined way for two pieces of software to talk to each other. When your phone app loads data from a server, it calls an API. | Every project — the glue between frontend and backend |
| **CI/CD** | Continuous Integration / Continuous Deployment. Automated pipelines that test and deploy code every time you push a change. | Git-to-container deployment, infrastructure work |
| **VS Code** | Visual Studio Code — the most popular code editor. Where most of the actual coding happens day-to-day. | Tools section |
| **IntelliJ** | A Java-focused code editor made by JetBrains. Preferred for Spring Boot / Java development. | Tools section (Roeslein backend) |
| **Git** | Version control — tracks every change made to code, who made it, and when. Lets you roll back mistakes and collaborate without overwriting each other's work. | Tools section: used on every project |
| **Jupyter Notebook** | An interactive coding environment mostly used for data science — write code, run it cell by cell, and see charts and results inline. | Tools section: AI & data work |
