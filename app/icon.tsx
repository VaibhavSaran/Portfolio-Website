import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: "#17211f",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "7px",
      }}
    >
      <span
        style={{
          color: "#f7f8f5",
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: "-0.5px",
        }}
      >
        VS
      </span>
    </div>,
    { ...size },
  );
}
