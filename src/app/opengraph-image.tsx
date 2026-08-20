import { ImageResponse } from "next/og";
import { formatProjectList, getLiveProjectTitles } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Pranav Bhat — Systems Design Engineering, University of Waterloo";

export default function OpengraphImage() {
  const shippedList = formatProjectList(getLiveProjectTitles());
  const shipped = shippedList ? `Shipped: ${shippedList}` : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#070a08",
          color: "rgba(255,255,255,0.92)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(255,255,255,0.68)",
            marginBottom: 20,
          }}
        >
          Systems Design Engineering · University of Waterloo
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: 28,
          }}
        >
          Pranav Bhat
        </div>
        {shipped ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 30,
              fontWeight: 500,
              color: "#0a7a4b",
            }}
          >
            {shipped}
          </div>
        ) : null}
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: 80,
            bottom: 64,
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          pbhat.me
        </div>
      </div>
    ),
    { ...size }
  );
}
