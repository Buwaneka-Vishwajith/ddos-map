# Real-time DDoS & Cyber Attack Visualization

A **real-time** web application that visualizes DDoS and other cyber attack data on a 3D globe using live data from [AbuseIPDB](https://www.abuseipdb.com/) and interactive arcs visualization powered by [globe.gl](https://globe.gl/#arcs-layer).

---

## Features

- Real-time streaming of cyber attack data
- Interactive 3D globe visualization with arcs representing attack vectors
- Backend powered by Node.js + Express + Socket.IO for real-time communication
- Frontend built with React, Vite, and TailwindCSS for responsive and modern UI
- Uses AbuseIPDB API to fetch threat intelligence data
- Smooth animations and visual cues powered by Three.js and globe.gl

---

## Tech Stack

### Frontend
- React 19.x
- Vite
- TailwindCSS
- globe.gl (3D globe visualization)
- Socket.IO client
- Axios (HTTP requests)

### Backend
- Node.js (ES modules)
- Express.js
- Socket.IO server
- Axios (API requests)
- CORS & dotenv for configuration

---

## Getting Started

### Prerequisites
- Node.js v16+ installed
- AbuseIPDB API key (get one free at [https://www.abuseipdb.com/](https://www.abuseipdb.com/))

### Installation

#### Clone the repository
```bash
git clone https://github.com/yourusername/ddos-visualization.git
cd ddos-visualization
