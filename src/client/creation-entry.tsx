import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import Creation from "./game/creation";

const container = document.getElementById("container");
if (container !== undefined) {
  const root = createRoot(container);
  root.render(<Creation />);
}
