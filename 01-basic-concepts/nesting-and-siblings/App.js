const parent = React.createElement(
  "div",
  { id: "parent" }, // parent props
  React.createElement(
    // child element
    "div",
    { id: "child" }, // child props
    [
      React.createElement("h1", {}, "I'm an h1 tag"), // first child of child
      React.createElement("h2", {}, "I'm an h2 tag"), // second child of child
    ]
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);
