import "./App.css";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Greetings } from "./components/greetings/Greetings";
import { AccountInfo } from "./components/accountInfo/AccountInfo";
import { Carousel } from "./components/carousel/Carousel";

function App() {
  return (
    <div className="App">
      <Header />
      <Greetings />
      <AccountInfo />
      <Carousel />
      <Footer />
    </div>
  );
}

export default App;
