import Header from "./components/Header.js";
import Body from "./components/Body.js";
import Footer from "./components/Footer.js";

// App Component — combines all parts together (Parent Component)
const App = () => {
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default App;
