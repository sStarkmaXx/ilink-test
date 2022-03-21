import "./App.css";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { Greetings } from "./components/greetings/Greetings";
import { AccountInfo } from "./components/accountInfo/AccountInfo";
import { Carousel } from "./components/carousel/Carousel";
import { CommentForm } from "./components/commentForm/CommentForm";
import { useState } from "react";
import { Toast } from "./components/toast/Toast";
import vector from "./img/vector.png";

function App() {
  const [formState, setFormState] = useState<boolean>(false);
  const openForm = () => {
    setFormState(true);
  };
  const closeForm = () => {
    setFormState(false);
  };

  const [toast, setShoeToast] = useState<boolean>(false);
  const showToast = () => {
    setShoeToast(true);
  };

  const closeToast = () => {
    setShoeToast(false);
  };

  return (
    <>
      <div className="App" style={{ backgroundImage: `url(${vector})` }}>
        <Header />
        <Greetings />
        <AccountInfo />
        <Carousel openForm={openForm} />
        <Footer />
      </div>
      {formState && <CommentForm closeForm={closeForm} showToast={showToast} />}
      {toast && <Toast closeToast={closeToast} error={null} text={""} />}
    </>
  );
}

export default App;
