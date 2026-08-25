import { useState } from "react";
import "./OrientationHint.css";

function OrientationHint() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <aside className="orientation-hint" aria-label="Phone viewing tip">
      <span className="orientation-hint-icon" aria-hidden="true">↻</span>
      <span>For a wider view, rotate your phone.</span>
      <button type="button" onClick={() => setIsDismissed(true)} aria-label="Dismiss viewing tip">×</button>
    </aside>
  );
}

export default OrientationHint;
