import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F172A",
          padding: "16px",
          position: "relative",
        }}
      >
        <div
          style={{
            width: "140px",
            height: "140px",
            backgroundColor: "#A3FF47",
            borderRadius: "28px",
            border: "6px solid #F8FAFC",
            boxShadow: "8px 8px 0px 0px #FF6B35",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "96px",
            fontWeight: 900,
            color: "#0F172A",
            fontFamily: "system-ui, sans-serif",
            position: "relative",
          }}
        >
          <span style={{ marginTop: "-8px" }}>B</span>
          <div
            style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              backgroundColor: "#FF6B35",
              border: "3px solid #0F172A",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
