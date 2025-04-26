
---

# Rays Weather App

This project is a weather application built using **Next.js**, **TypeScript**, **Laravel**, **Tailwind CSS**, and **Three.js**. The app displays weather information, including temperature, weather conditions, and a background that simulates rain. It also features a lightning flicker effect for added realism. The backend is powered by **Laravel**, and Docker is used for containerizing the backend service.

Link: https://rays-rho.vercel.app/

### Key Features:
- **Real-time Weather Data**: Displays temperature, weather conditions, and a city name.
- **Interactive Rain Animation**: Using Three.js to create a visually appealing rain effect in the background.
- **Lightning Flicker Effect**: A lightning effect that randomly flickers on the screen for atmospheric conditions.
- **Responsive Design**: The app is fully responsive and adapts to different screen sizes.
- **Backend with Laravel**: The backend API is built using Laravel to handle weather data and other related functionality.
- **Docker Integration**: The backend is containerized using Docker for easy deployment and scalability.

## Tech Stack:
- **Frontend**:
  - Next.js (with TypeScript)
  - Tailwind CSS
  - Three.js (for the rain effect)
  - Fetching weather data via OpenWeatherMap API with Geocoding API

- **Backend**:
  - Laravel (PHP framework)
  - Docker (for backend containerization)

## Getting Started

### Prerequisites:
Before you begin, make sure you have the following installed on your system:
- **Docker** (for running the Laravel backend)
- **Node.js** (version >= 16.x, for the frontend)
- **npm** or **Yarn** (for frontend dependency management)
- A code editor (e.g., VSCode)

### Installation:

#### Step 1: Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/weather-app.git
```

#### Step 2: Set Up the Backend (Laravel)

1. Navigate to the backend directory:

   ```bash
   cd weather-app/rays-backend
   ```

2. Build and run the Docker containers:

   ```bash
   docker-compose up --build
   ```

   This will set up the Laravel backend and its dependencies within Docker containers.

3. Once the containers are running, the backend will be available. You may need to set up any environment variables for your backend in the `.env` file inside the `rays-backend` directory.

#### Step 3: Set Up the Frontend (Next.js)

1. Navigate back to the root project directory:

   ```bash
   cd ..
   ```

2. Install the frontend dependencies:

   ```bash
   npm install
   # or if you use Yarn
   yarn install
   ```

3. Set up environment variables for the weather API. Create a `.env.local` file in the root of your project and add your API key for OpenWeatherMap:

   ```bash
   NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

   You can get a free API key from [OpenWeatherMap](https://openweathermap.org/).

4. Run the development server:

   ```bash
   npm run dev
   # or with Yarn
   yarn dev
   ```

   The app should now be running at `http://localhost:3000`.

### Project Structure:

- **rays-backend/**: Contains the Laravel backend API and Docker setup for containerization.
- **pages/**: Contains all pages for the frontend app.
  - `index.tsx`: Main weather page that displays the current weather.
- **components/**: Contains reusable frontend components.
  - `RainBackground.tsx`: A component for the rain animation using Three.js.
- **styles/**: Tailwind CSS configuration and other global styles.
- **public/**: Contains static files, such as images (e.g., `rayslogo.jpg` and weather icons).
- **utils/**: Helper functions like `convertTemp`, `formatDate`, and API calls.

### Project Flow:
1. The **RainBackground** component is rendered as a full-screen background to simulate rain using Three.js.
2. Weather data is fetched from the OpenWeatherMap API and displayed, including temperature, conditions, and location.
3. The app is responsive and adjusts for various screen sizes, including mobile and desktop views.
4. The Laravel backend handles requests for weather data, which is then passed to the frontend.

### Customization:
- You can change the background effect by modifying the fragment shader in the `RainBackground.tsx` file.
- Update the API key for OpenWeatherMap in the `.env.local` file.
- Modify the weather icon styling and the temperature unit conversion logic in the **utils/** directory.
- For backend customizations, modify the `.env` file inside the `rays-backend` directory for the Laravel configuration.

### Deploying to Vercel:
1. Push the frontend code to your GitHub repository.
2. Link the repository to your Vercel project.
3. Vercel will automatically deploy your frontend project with each commit.

### Deploying the Backend:
The Laravel backend can be deployed using Docker, making it easy to manage and scale. You can use services like **AWS**, **Google Cloud**, or **DigitalOcean** to host your Docker containers.

1. Push the `rays-backend` code to your GitHub repository.
2. Use Docker to deploy it to your chosen hosting service.

---
