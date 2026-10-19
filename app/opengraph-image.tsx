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
          border: "12px solid #A3FF47",
        }}
      >
        {/* Background Decorative Pattern */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            backgroundColor: "#A3FF47",
            opacity: 0.12,
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: 200,
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            backgroundColor: "#FF6B35",
            opacity: 0.1,
            display: "flex",
          }}
        />

        {/* Top Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            zIndex: 10,
          }}
        >
          {/* Logo Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div
              style={{
                width: "74px",
                height: "74px",
                backgroundColor: "#A3FF47",
                border: "4px solid #F8FAFC",
                boxShadow: "6px 6px 0px 0px #F8FAFC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "44px",
                fontWeight: 900,
                color: "#0F172A",
              }}
            >
              B
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: 900,
                  letterSpacing: "-1px",
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
                  color: "#FF6B35",
                  textTransform: "uppercase",
                }}
              >
                NIAMEY • NIGER
              </span>
            </div>
          </div>

          {/* WhatsApp Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#1E293B",
              border: "3px solid #A3FF47",
              padding: "10px 22px",
              borderRadius: "999px",
              color: "#A3FF47",
              fontSize: "18px",
              fontWeight: 800,
            }}
          >
            <span>WHATSAPP : +227 77 39 41 65</span>
          </div>
        </div>

        {/* Center Main Punchline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            zIndex: 10,
            margin: "30px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                padding: "6px 16px",
                backgroundColor: "#FF6B35",
                color: "#FFFFFF",
                fontSize: "16px",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
            >
              LE 1ER BAR À BOBA DU SAHEL
            </div>
          </div>

          <h1
            style={{
              fontSize: "76px",
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
            <span>LA VRAIE BOBA CULTURE</span>
            <span style={{ color: "#A3FF47" }}>DIRECTEMENT À NIAMEY</span>
          </h1>

          <p
            style={{
              fontSize: "24px",
              color: "#CBD5E1",
              maxWidth: "880px",
              lineHeight: 1.3,
              margin: 0,
              fontWeight: 500,
            }}
          >
            Perles de tapioca fraîches du matin, Matcha de cérémonie, Milkshakes de docteurs & Thés glacés sahariens.
          </p>
        </div>

        {/* Footer Badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "3px solid rgba(255, 255, 255, 0.15)",
            paddingTop: "24px",
            zIndex: 10,
          }}
        >
          {/* Features pills */}
          <div style={{ display: "flex", gap: "16px" }}>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                padding: "8px 18px",
                color: "#F8FAFC",
                fontSize: "16px",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              🛵 Livraison dans tout Niamey
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                padding: "8px 18px",
                color: "#F8FAFC",
                fontSize: "16px",
                fontWeight: 700,
                textTransform: "uppercase",
              }}
            >
              📍 4 Spots (Plateau, Niamey 2000...)
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "2px solid rgba(255, 255, 255, 0.2)",
                padding: "8px 18px",
                color: "#A3FF47",
                fontSize: "16px",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              ⚡️ Commande Instantanée WhatsApp
            </div>
          </div>

          {/* Domain name */}
          <div
            style={{
              fontSize: "20px",
              fontWeight: 900,
              color: "#A3FF47",
              letterSpacing: "1px",
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
