import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a12 0%, #171730 100%)",
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
            backgroundImage:
              "linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)",
            backgroundClip: "text",
            color: "transparent",
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: "-0.5px",
          }}
        >
          VS
        </span>
      </div>
    ),
    { ...size }
  );
}
