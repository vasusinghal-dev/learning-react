import { useState } from "react";

function TruncatedText({ text, limit = 100 }) {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > limit;
  const displayText = !expanded && isLong ? text.slice(0, limit) + "..." : text;

  return (
    <p className={`menu-description ${expanded ? "expanded" : ""}`}>
      {displayText}{" "}
      {isLong && (
        <span
          role="button"
          onClick={() => setExpanded(!expanded)}
          className="expanded"
        >
          {expanded ? "less" : "more"}
        </span>
      )}
    </p>
  );
}

export default TruncatedText;
