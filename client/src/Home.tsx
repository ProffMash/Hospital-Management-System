import LandingPage from "./landingPage";
import BotpressChat from "./Bot/Assistant";

const Home: React.FC = () => {
  return (
    <div>
      <BotpressChat />
      <LandingPage />
    </div>
  );
};

export default Home;