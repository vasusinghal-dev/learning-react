import ReactDOM from "react-dom/client";

// --- Small components ---
const Header = () => (
  <header>
    <h1>My Website</h1>
  </header>
);

const Content = () => (
  <main>
    <p>Welcome to my website. This is the content section.</p>
  </main>
);

const Footer = () => (
  <footer>
    <p>© 2025 My Website</p>
  </footer>
);

// Component Composition of Parent Component
const App = () => {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

// --- Render ---
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
