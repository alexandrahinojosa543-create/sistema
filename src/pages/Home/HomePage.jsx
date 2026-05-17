import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Stack,
  Chip
} from "@mui/material";

import BoltIcon from "@mui/icons-material/Bolt";
import { useNavigate } from "react-router-dom";
import higeaLogo from "./logo.jpeg";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "#0f172a", minHeight: "100vh", color: "white" }}>

      {/* ── HERO ── */}
      <Box sx={{
        background:
          "radial-gradient(circle at 20% 20%, rgba(0,151,167,0.3), transparent 45%), radial-gradient(circle at 80% 0%, rgba(21,101,192,0.35), transparent 45%), #020617",
        py: { xs: 10, md: 16 }
      }}>
        <Container>
          <Grid container spacing={6} alignItems="center">

            {/* Texto — izquierda */}
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <Chip
                  label="SISTEMA DE REPORTES DE ATENCIÓN PREHOSPITALARIA"
                  sx={{
                    width: "fit-content",
                    background: "rgba(0,151,167,0.2)",
                    color: "#67e8f9",
                    border: "1px solid rgba(0,151,167,0.4)"
                  }}
                />

                <Box>
                  <Typography variant="h2" sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.4rem", md: "3.2rem" },
                    lineHeight: 1.1,
                    color: "white"
                  }}>
                    HIGEA
                  </Typography>
                  <Typography variant="h4" sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.4rem", md: "1.9rem" },
                    color: "#67e8f9",
                    mt: 0.5
                  }}>
                    Sistema FRAP
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{
                  opacity: 0.75, maxWidth: 500, lineHeight: 1.8, fontSize: "1rem"
                }}>
                  Plataforma digital especializada en la generación, gestión y almacenamiento
                  de reportes médicos en formato FRAP. Apoyamos al personal médico y
                  administrativo, para reducir los tiempos administrativos
                  en instituciones médicas y servicios de emergencia.
                </Typography>

                <Stack direction="row" spacing={2} flexWrap="wrap">
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<BoltIcon />}
                    onClick={() => navigate("/crud")}
                    sx={{
                      background: "linear-gradient(135deg, #1565c0, #0097a7)",
                      fontWeight: 700, borderRadius: 2,
                      "&:hover": { background: "linear-gradient(135deg, #0d47a1, #00838f)" }
                    }}
                  >
                    Abrir Dashboard
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    sx={{
                      color: "white",
                      borderColor: "rgba(255,255,255,0.4)",
                      borderRadius: 2
                    }}
                  >
                    Ver más...
                  </Button>
                </Stack>
              </Stack>
            </Grid>

            {/* Logo — derecha */}
            <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                src={higeaLogo}
                alt="HIGEA Logo"
                sx={{
                  width: { xs: 260, md: 420 },
                  height: "auto",
                  filter: "drop-shadow(0 0 40px rgba(0,151,167,0.5))",
                  animation: "flotar 3s ease-in-out infinite",
                  "@keyframes flotar": {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%":      { transform: "translateY(-14px)" },
                  }
                }}
              />
            </Grid>

          </Grid>
        </Container>
      </Box>

      {/* ── FOOTER MÍNIMO ── */}
      <Box sx={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        py: 3, textAlign: "center"
      }}>
        <Typography variant="body2" sx={{ opacity: 0.35 }}>
          © {new Date().getFullYear()} HIGEA — Sistema FRAP. Todos los derechos reservados.
        </Typography>
      </Box>

    </Box>
  );
}