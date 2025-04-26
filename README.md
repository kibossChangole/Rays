Here’s a README documentation for your weather project, incorporating details from our previous discussions:

---

# Weather App

This project is a weather application built using **Next.js**, **TypeScript**, **Tailwind CSS**, and **Three.js**. The app displays weather information, including temperature, weather conditions, and a background that simulates rain. It also features a lightning flicker effect for added realism.

### Key Features:
- **Real-time Weather Data**: Displays temperature, weather conditions, and a city name.
- **Interactive Rain Animation**: Using Three.js to create a visually appealing rain effect in the background.
- **Lightning Flicker Effect**: A lightning effect that randomly flickers on the screen for atmospheric conditions.
- **Responsive Design**: The app is fully responsive and adapts to different screen sizes.

## Tech Stack:
- **Frontend**: 
  - Next.js (with TypeScript)
  - Tailwind CSS
  - Three.js (for the rain effect)
  - Fetching weather data via API (OpenWeatherMap)

## Getting Started

### Prerequisites:
Before you begin, make sure you have the following installed on your system:
- **Node.js** (version >= 16.x)
- **npm** or **Yarn**
- A code editor (e.g., VSCode)

### Installation:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd weather-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   # or if you use Yarn
   yarn install
   ```

4. Set up environment variables for weather API. Create a `.env.local` file in the root of your project and add your API key for OpenWeatherMap:

   ```bash
   NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key_here
   ```

   You can get a free API key from [OpenWeatherMap](https://openweathermap.org/).

5. Run the development server:

   ```bash
   npm run dev
   # or with Yarn
   yarn dev
   ```

   The app should now be running at `http://localhost:3000`.

### Project Structure:

- **pages/**: Contains all pages for the app.
  - `index.tsx`: Main weather page that displays current weather.
- **components/**: Contains reusable components.
  - `RainBackground.tsx`: A component for the rain animation using Three.js.
- **styles/**: Tailwind CSS configuration and other global styles.
- **public/**: Contains static files, such as images (e.g., `rayslogo.jpg` and weather icons).
- **utils/**: Helper functions like `convertTemp`, `formatDate`, and API calls.


### Project Flow:
1. The **RainBackground** component is rendered as a full-screen background to simulate rain using Three.js.
2. Weather data is fetched from the OpenWeatherMap API and displayed, including temperature, conditions, and location.
3. The app is responsive and adjusts for various screen sizes, including mobile and desktop views.

### Customization:
- You can change the background effect by modifying the fragment shader in the `RainBackground.tsx` file.
- Update the API key for OpenWeatherMap in the `.env.local` file.
- Modify the weather icon styling and the temperature unit conversion logic in the **utils/** directory.

### Deploying to Vercel:
1. Push the code to your GitHub repository.
2. Link the repository to your Vercel project.
3. Vercel will automatically deploy your project with each commit.

---

This README includes details on the weather app functionality, setup, and customization. You can expand on this based on additional features and specific customizations you make.
