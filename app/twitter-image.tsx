import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Boba Express Niamey | Le Meilleur Bubble Tea & Milkshake au Niger";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0F172A",
          padding: "60px 70px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
          border: "12px solid #FF6B35",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "74px",
                height: "74px",
                backgroundColor: "#FF6B35",
                border: "4px solid #F8FAFC",
                boxShadow: "6px 6px 0px 0px #F8FAFC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "44px",
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              B
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  color: "#F8FAFC",
                  textTransform: "uppercase",
                }}
              >
                BOBA EXPRESS
              </span>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: 800,
                  letterSpacing: "5px",
                  color: "#A3FF47",
                  textTransform: "uppercase",
                }}
              >
                NIAMEY • NIGER
              </span>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "#A3FF47",
              border: "3px solid #0F172A",
              padding: "10px 22px",
              color: "#0F172A",
              fontSize: "18px",
              fontWeight: 900,
            }}
          >
            CONFIRMATION WHATSAPP : +227 77 39 41 65
          </div>
        </div>

        {/* Center Punchline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            margin: "30px 0",
          }}
        >
          <h1
            style={{
              fontSize: "74px",
              fontWeight: 900,
              lineHeight: 0.95,
              color: "#F8FAFC",
              letterSpacing: "-2px",
              textTransform: "uppercase",
              margin: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>BUBBLE TEA & MILKSHAKES</span>
            <span style={{ color: "#FF6B35" }}>ARTISANAUX À NIAMEY</span>
          </h1>

          <p
            style={{
              fontSize: "24px",
              color: "#CBD5E1",
              maxWidth: "880px",
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            Commande ton Boba sur-mesure en direct sur WhatsApp. Livraison express à domicile dans tout Niamey ou retrait dans nos 4 spots.
          </p>
        </div>

        {/* Bottom */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "3px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "8px 18px",
                color: "#F8FAFC",
                fontSize: "16px",
                fontWeight: 700,
              }}
            >
              📍 Plateau • Niamey 2000 • Nouveau Marché • Centre Aéré
            </div>
          </div>

          <div
            style={{
              fontSize: "20px",
              fontWeight: 900,
              color: "#FF6B35",
            }}
          >
            bobaexpress.vercel.app
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
