import React from "react";
import logoUrl from "../static/logo.svg";

export function Logo() {
  return (
    <img
      src={logoUrl.src}
      alt=" Logo"
      style={{
        height: "1.5rem",
        width: "3rem",
        objectFit: "contain",
      }}
    />
  );
}
