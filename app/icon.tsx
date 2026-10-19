import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#A3FF47",
          borderRadius: "6px",
          border: "2.5px solid #0F172A",
          boxShadow: "2px 2px 0px #0F172A",
          color: "#0F172A",
          fontSize: "22px",
          fontWeight: 900,
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <span style={{ marginTop: "-2px" }}>B</span>
        <div
          style={{
            position: "absolute",
            bottom: "3px",
            right: "3px",
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#FF6B35",
            border: "1px solid #0F172A",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
