import { Grid, Card, CardContent, Typography, Box, Avatar, Stack, Chip } from "@mui/material";
import PageContainer from "../../components/common/PageContainer";
import sebasImg from "./sebatian.jpeg";
import karlaImg from "./karla.jpeg";
import alexImg from "./alexandra.jpeg";
import fatimaImg from "./fátima.jpeg";    
import shailaImg from "./shaila.jpeg";

const integrantes = [
{ 
    nombre: "Sebastián Álvarez Narcizo", 
    matricula: "2022150480025",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "2022150480025@tesjo.edu.mx",
    foto: sebasImg,
    rol: "Frontend",
    descripcion: "Apasionado por el desarrollo de interfaces modernas y la experiencia de usuario. Lidera el diseño visual del sistema FRAP."
},
{ 
    nombre: "Karla Gerardo Faustino", 
    matricula: "2022150480397",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "2022150480397@tesjo.edu.mx",
    foto:karlaImg,
    rol: "Backend",
    descripcion: "Especialista en bases de datos y lógica de servidor. Asegura la integridad y seguridad de la información médica."
},
{ 
    nombre: "Alexandra Hinojosa Becerril", 
    matricula: "2022150480542",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "2022150480542@tesjo.edu.mx",
    foto:alexImg,
    rol: "Frontend",
    descripcion: "Creativa, se encarga de la maquetación y componentes reutilizables para una interfaz amigable."
},
{ 
    nombre: "Fátima Hurtado Rodríguez", 
    matricula: "2022150480547",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "2022150480547@tesjo.edu.mx",
    foto:fatimaImg,
    rol: "Backend",
    descripcion: "Experta en APIs REST y optimización de consultas. Implementa la lógica de negocio del sistema."
},
{ 
    nombre: "Shaila Vite Antonio", 
    matricula: "2022150481189",
    carrera: "Ingeniería en Sistemas Computacionales",
    correo: "2022150481189@tesjo.edu.mx",
    foto:shailaImg,
    rol: "Frontend",
    descripcion: "Desarrolladora frontend con enfoque en accesibilidad y rendimiento. Colabora en la integración con backend."
},
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
                <Card sx={{ height: '100%' }}>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <Avatar src={p.foto} sx={{ width: 70, height: 70 }} />
                    <Box>
                        <Typography variant="h6">{p.nombre}</Typography>
                        <Typography variant="body2" color="textSecondary">{p.rol}</Typography>
                    </Box>
                    </Stack>
                    <Typography variant="body2"><strong>Matrícula:</strong> {p.matricula}</Typography>
                    <Typography variant="body2"><strong>Carrera:</strong> {p.carrera}</Typography>
                    <Typography variant="body2"><strong>Correo:</strong> {p.correo}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}><strong>Biografía:</strong> {p.descripcion}</Typography>
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