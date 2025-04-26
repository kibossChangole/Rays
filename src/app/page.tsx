import WeatherCard from "../../components/WeatherCard";
import RainBackground from "../../components/rain";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-200">
       <RainBackground />
      <div style={{ position: 'relative', zIndex: 1 }}>
      <WeatherCard />
      </div>
     
    </main>
  );
}
