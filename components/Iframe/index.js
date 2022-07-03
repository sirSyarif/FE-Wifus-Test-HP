import React from "react";

export default function index({ link }) {
  return (
    <iframe
      src={link}
      name="thumbnails"
      frameborder="0"
      style={{ width: "100%", height: "150px" }}
    />
  );
}
