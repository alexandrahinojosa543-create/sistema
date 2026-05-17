import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import PageContainer from "../../components/common/PageContainer";

const integrantes = [
{ nombre: "Sebastián Álvarez Narcizo",   rol: "Frontend" },
{ nombre: "Karla Gerardo Faustino",      rol: "Backend"  },
{ nombre: "Alexandra Hinojosa Becerril", rol: "Frontend" },
{ nombre: "Fátima Hurtado Rodríguez",    rol: "Backend"  },
{ nombre: "Shaila Vite Antonio",         rol: "Frontend" },
];

const C = {
azul:    "#0a3d6b",
azulMed: "#1565c0",
cyan:    "#0097a7",
gris:    "#e8eef4",
};

const redes = [
{ label: "Facebook",   url: "https://www.facebook.com/share/18MXAw6KBS/?mibextid=wwXIfr" },
{ label: "Instagram",  url: "https://www.instagram.com/h_i_g_e_a?igsh=MXY0NmNpZ3dnZHZxcg%3D%3D&utm_source=qr" },
{ label: "TikTok",     url: "https://www.tiktok.com/@h.i.g.e.a?_r=1&_t=ZS-95Z5qmmoXVI" },
{ label: "YouTube",    url: "https://youtube.com/@higea-s4b?si=B1MVki6YNTnbxdRV" },
{ label: "Página Web", url: "https://higea-frap-web.vercel.app/" },
];

export default function Equipo() {
return (
    <Box sx={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: "#f4f8fb", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── HEADER ── */}
    <Box sx={{
        background: `linear-gradient(135deg, ${C.azul} 0%, ${C.azulMed} 60%, ${C.cyan} 100%)`,
        padding: "22px 32px", display: "flex", alignItems: "center", gap: 2 }}>
        <Box sx={{ background: "rgba(255,255,255,.15)", borderRadius: "12px",
        width: 48, height: 48, display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 26 }}>🏥</Box>
        <Box>
        <Typography sx={{ color: "white", fontSize: 22, fontWeight: 800, letterSpacing: ".5px" }}>
            HIGEA — Sistema FRAP
        </Typography>
        <Typography sx={{ color: "rgba(255,255,255,.75)", fontSize: 13 }}>
            Gestión de Reportes de Atención Prehospitalaria
        </Typography>
        </Box>
    </Box>

      {/* ── CONTENIDO ── */}
    <Box sx={{ flex: 1, padding: "40px 32px" }}>
        <PageContainer title="Integrantes del equipo de trabajo">
        <Grid container spacing={3}>
            {integrantes.map((p, i) => (
            <Grid item xs={12} md={6} key={i}>
                <Card>
                <CardContent>
                    <Typography variant="h6">{p.nombre}</Typography>
                    <Typography>Rol: {p.rol}</Typography>
                </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
        </PageContainer>
    </Box>

      {/* ── FOOTER ── */}
    <Box sx={{ background: C.azul, color: "rgba(255,255,255,.85)",
        padding: "32px 32px 0", marginTop: "40px" }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 8,
        alignItems: "flex-start", flexWrap: "wrap",
        maxWidth: 700, margin: "0 auto" }}>

          {/* Descripción */}
        <Box sx={{ maxWidth: 240 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <span style={{ fontSize: 26 }}>🏥</span>
            <Typography sx={{ fontWeight: 800, fontSize: 18, color: "white" }}>
                HIGEA
            </Typography>
            </Box>
            <Typography sx={{ fontSize: 13, lineHeight: 1.7,
            color: "rgba(255,255,255,.6)" }}>
            Sistema digital para la generación, gestión y almacenamiento
            de reportes médicos en formato FRAP.
            </Typography>
        </Box>

          {/* Contacto */}
        <Box>
            <Typography sx={{ fontWeight: 700, color: "white", fontSize: 13,
            textTransform: "uppercase", letterSpacing: 1, mb: 1.5 }}>
            Contacto
            </Typography>
            {redes.map(r => (
            <a key={r.label} href={r.url} target="_blank" rel="noreferrer"
                style={{ color: "rgba(255,255,255,.75)", textDecoration: "none",
                fontSize: 13, display: "flex", alignItems: "center",
                gap: 7, padding: "4px 0" }}>
                <span>{r.icon}</span> {r.label}
            </a>
            ))}
        </Box>
        </Box>

        <Box sx={{ borderTop: "1px solid rgba(255,255,255,.15)",
        mt: 3, py: 2, textAlign: "center" }}>
        <Typography sx={{ fontSize: 12, color: "rgba(255,255,255,.35)" }}>
            © {new Date().getFullYear()} HIGEA — Sistema FRAP. Todos los derechos reservados. | Uso exclusivo del personal autorizado.
        </Typography>
        </Box>
    </Box>

    </Box>
);
}