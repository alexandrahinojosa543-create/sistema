import { useState } from "react";

const C = {
  azul:    "#0a3d6b",
  azulMed: "#1565c0",
  cyan:    "#0097a7",
  blanco:  "#f4f8fb",
  gris:    "#e8eef4",
  grisTx:  "#607080",
  rojo:    "#c62828",
  verde:   "#2e7d32",
  amarillo:"#f57f17",
};

const SERVICIOS = [
  "Pipa de agua",
  "Incendios",
  "Traslados",
  "Apoyo comunitario",
  "Capacitaciones",
  "Verificación de documentos",
];

const ICONOS_SERVICIO = {
  "Pipa de agua":              "💧",
  "Incendios":                 "🔥",
  "Traslados":                 "🚑",
  "Apoyo comunitario":         "🤝",
  "Capacitaciones":            "📚",
  "Verificación de documentos":"📋",
};

function cargarReportes() {
  try {
    const guardados = localStorage.getItem("higea_reportes");
    return guardados ? JSON.parse(guardados) : [];
  } catch { return []; }
}

function cargarNextId() {
  try {
    const id = localStorage.getItem("higea_nextid");
    return id ? Number(id) : 1;
  } catch { return 1; }
}

// ── Componentes pequeños ───────────────────────────────────

function Badge({ estado }) {
  const col = estado === "Completado" ? C.verde : estado === "Pendiente" ? C.amarillo : C.grisTx;
  return (
    <span style={{ background: col + "22", color: col, border: `1px solid ${col}55`,
      borderRadius: 20, padding: "3px 12px", fontSize: 12, fontWeight: 700 }}>
      {estado}
    </span>
  );
}

function Campo({ label, name, value, onChange, type = "text", options }) {
  const inputStyle = {
    width: "100%", padding: "9px 12px", border: `1.5px solid ${C.gris}`,
    borderRadius: 8, fontSize: 14, background: "white", color: "#222",
    boxSizing: "border-box", outline: "none",
  };
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700,
        color: C.azul, marginBottom: 5, textTransform: "uppercase", letterSpacing: ".5px" }}>
        {label}
      </label>
      {options ? (
        <select name={name} value={value} onChange={onChange} style={inputStyle}>
          {options.map(o => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input name={name} type={type} value={value} onChange={onChange} style={inputStyle} />
      )}
    </div>
  );
}

function Tabla({ columnas, filas, acciones }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr style={{ background: C.azul, color: "white" }}>
            {columnas.map(c => (
              <th key={c} style={{ padding: "11px 14px", textAlign: "left",
                fontWeight: 600, whiteSpace: "nowrap" }}>{c}</th>
            ))}
            {acciones && <th style={{ padding: "11px 14px" }}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {filas.length === 0 ? (
            <tr><td colSpan={columnas.length + 1}
              style={{ padding: 24, color: C.grisTx, textAlign: "center" }}>
              No hay reportes registrados.
            </td></tr>
          ) : filas.map((f, i) => (
            <tr key={f.id} style={{ background: i % 2 === 0 ? "#f0f5fa" : "white",
              borderBottom: `1px solid ${C.gris}` }}>
              <td style={{ padding: "10px 14px", fontWeight: 700, color: C.azulMed }}>{f.folio}</td>
              <td style={{ padding: "10px 14px" }}>{f.solicitante}</td>
              <td style={{ padding: "10px 14px" }}>{ICONOS_SERVICIO[f.servicio]} {f.servicio}</td>
              <td style={{ padding: "10px 14px", maxWidth: 220,
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {f.descripcion}
              </td>
              <td style={{ padding: "10px 14px" }}>{f.responsable}</td>
              <td style={{ padding: "10px 14px" }}>{f.fecha}</td>
              <td style={{ padding: "10px 14px" }}><Badge estado={f.estado} /></td>
              {acciones && <td style={{ padding: "10px 14px" }}>{acciones(f)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Btn({ children, onClick, color = C.azulMed, outline = false }) {
  return (
    <button onClick={onClick} style={{
      padding: "9px 20px", borderRadius: 8, cursor: "pointer",
      fontWeight: 700, fontSize: 13,
      background: outline ? "transparent" : color,
      color: outline ? color : "white",
      border: `2px solid ${color}`,
    }}>
      {children}
    </button>
  );
}

// ── Formulario FRAP ────────────────────────────────────────

const formVacio = {
  solicitante: "",
  servicio: SERVICIOS[0],
  descripcion: "",
  responsable: "",
  fecha: new Date().toISOString().slice(0, 10),
  estado: "Pendiente",
};

function FormFRAP({ inicial, onGuardar, onCancelar, titulo }) {
  const [form, setForm] = useState(inicial || formVacio);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div style={{ background: "white", borderRadius: 14,
      border: `1.5px solid ${C.gris}`, padding: 28, maxWidth: 500, width: "100%" }}>
      <h3 style={{ margin: "0 0 20px", color: C.azul, fontSize: 18 }}>📋 {titulo}</h3>
      <Campo label="Nombre del solicitante / dependencia" name="solicitante"
        value={form.solicitante} onChange={handleChange} />
      <Campo label="Tipo de servicio" name="servicio"
        value={form.servicio} onChange={handleChange} options={SERVICIOS} />
      <Campo label="Descripción del reporte" name="descripcion"
        value={form.descripcion} onChange={handleChange} />
      <Campo label="Responsable asignado" name="responsable"
        value={form.responsable} onChange={handleChange} />
      <Campo label="Fecha" name="fecha" type="date"
        value={form.fecha} onChange={handleChange} />
      <Campo label="Estado" name="estado"
        value={form.estado} onChange={handleChange}
        options={["Pendiente", "Completado", "Archivado"]} />
      <div style={{ display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" }}>
        {onCancelar && <Btn onClick={onCancelar} color={C.grisTx} outline>Cancelar</Btn>}
        <Btn onClick={() => onGuardar(form)} color={C.azulMed}>Guardar Reporte</Btn>
      </div>
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────

function Footer() {
  const redes = [
    { label: "Facebook",  url: "https://www.facebook.com/share/18MXAw6KBS/?mibextid=wwXIfr" },
    { label: "Instagram", url: "https://www.instagram.com/h_i_g_e_a?igsh=MXY0NmNpZ3dnZHZxcg%3D%3D&utm_source=qr" },
    { label: "TikTok",    url: "https://www.tiktok.com/@h.i.g.e.a?_r=1&_t=ZS-95Z5qmmoXVI" },
    { label: "YouTube",   url: "https://youtube.com/@higea-s4b?si=B1MVki6YNTnbxdRV" },
    { label: "Página Web", url: "https://higea-frap-web.vercel.app/" },
  ];

  const linkStyle = {
    color: "rgba(255,255,255,.75)", textDecoration: "none",
    fontSize: 13, display: "flex", alignItems: "center", gap: 7, padding: "5px 0",
  };

  return (
    <footer style={{ background: C.azul, color: "rgba(255,255,255,.85)",
      padding: "32px 32px 0", marginTop: 40 }}>
      <div style={{ display: "flex", justifyContent: "center", gap: 80,
        alignItems: "flex-start", flexWrap: "wrap",
        maxWidth: 900, margin: "0 auto" }}>

        {/* Marca + Contacto */}
        <div style={{ maxWidth: 260 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 28 }}>🏥</span>
            <span style={{ fontWeight: 800, fontSize: 20, color: "white" }}>HIGEA</span>
          </div>
          <p style={{ margin: "0 0 16px", fontSize: 13, lineHeight: 1.7,
            color: "rgba(255,255,255,.6)" }}>
            Sistema digital para la generación, gestión y almacenamiento de reportes
            médicos en formato FRAP.
          </p>
          <p style={{ margin: "0 0 10px", fontWeight: 700, color: "white",
            fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
            Contacto
          </p>
          {redes.map(r => (
            <a key={r.label} href={r.url} target="_blank" rel="noreferrer" style={linkStyle}
              onMouseOver={e => e.currentTarget.style.color = "white"}
              onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,.75)"}>
              <span>{r.icon}</span> {r.label}
            </a>
          ))}
        </div>

        {/* Módulos */}
        <div>
          <p style={{ margin: "0 0 12px", fontWeight: 700, color: "white",
            fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
            Sistema FRAP
          </p>
          {["Alta de reportes", "Consulta de registros",
            "Actualización de datos", "Eliminación de registros"].map(m => (
            <p key={m} style={{ margin: "5px 0", fontSize: 13,
              color: "rgba(255,255,255,.65)" }}>• {m}</p>
          ))}
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.15)",
        marginTop: 28, padding: "16px 0", textAlign: "center",
        fontSize: 12, color: "rgba(255,255,255,.35)" }}>
        © {new Date().getFullYear()} HIGEA — Sistema FRAP. Todos los derechos reservados. | Uso exclusivo del personal autorizado.
      </div>
    </footer>
  );
}

// ── Componente principal ───────────────────────────────────

export default function Crud() {
  const [seccion, setSeccion]               = useState("altas");
  const [reportes, setReportes]             = useState(cargarReportes);
  const [nextId, setNextId]                 = useState(cargarNextId);
  const [editando, setEditando]             = useState(null);
  const [busqueda, setBusqueda]             = useState("");
  const [filtroServicio, setFiltroServicio] = useState("Todos");
  const [mensaje, setMensaje]               = useState(null);

  const mostrarMensaje = (txt, tipo = "ok") => {
    setMensaje({ txt, tipo });
    setTimeout(() => setMensaje(null), 3500);
  };

  const guardarEnStorage = (lista, nuevoId) => {
    try {
      localStorage.setItem("higea_reportes", JSON.stringify(lista));
      if (nuevoId !== undefined)
        localStorage.setItem("higea_nextid", String(nuevoId));
    } catch {}
  };

  const agregarReporte = (form) => {
    if (!form.solicitante || !form.descripcion || !form.responsable)
      return mostrarMensaje("⚠️ Completa los campos obligatorios: Solicitante, Descripción y Responsable.", "warn");
    const folio = `FRAP-2024-${String(nextId).padStart(3, "0")}`;
    const nuevo = { ...form, id: nextId, folio };
    const nueva = [...reportes, nuevo];
    setReportes(nueva);
    setNextId(nextId + 1);
    guardarEnStorage(nueva, nextId + 1);
    mostrarMensaje("✅ Reporte FRAP generado exitosamente.");
    setSeccion("consultas");
  };

  const guardarEdicion = (form) => {
    const nueva = reportes.map(r => r.id === editando.id ? { ...editando, ...form } : r);
    setReportes(nueva);
    guardarEnStorage(nueva);
    setEditando(null);
    mostrarMensaje("✅ Reporte actualizado correctamente.");
  };

  const eliminar = (id) => {
    if (!window.confirm("¿Confirmas la eliminación permanente de este reporte FRAP?")) return;
    const nueva = reportes.filter(r => r.id !== id);
    setReportes(nueva);
    guardarEnStorage(nueva);
    mostrarMensaje("🗑️ Reporte eliminado del sistema.", "warn");
  };

  const columnas = ["Folio", "Solicitante", "Servicio", "Descripción", "Responsable", "Fecha", "Estado"];

  const filtrados = reportes.filter(r => {
    const coincideTexto =
      r.solicitante.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.folio.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    const coincideServicio = filtroServicio === "Todos" || r.servicio === filtroServicio;
    return coincideTexto && coincideServicio;
  });

  const menu = [
    { key: "altas",           label: "Altas",          icon: "➕" },
    { key: "consultas",       label: "Consultas",       icon: "🔍" },
    { key: "actualizaciones", label: "Actualizaciones", icon: "✏️" },
    { key: "eliminacion",     label: "Eliminación",     icon: "🗑️" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: "#f4f8fb", minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.azul} 0%, ${C.azulMed} 60%, ${C.cyan} 100%)`,
        padding: "22px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ background: "rgba(255,255,255,.15)", borderRadius: 12,
          width: 48, height: 48, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 26 }}>🏥</div>
        <div>
          <div style={{ color: "white", fontSize: 22, fontWeight: 800, letterSpacing: ".5px" }}>
            HIGEA — Sistema FRAP
          </div>
          <div style={{ color: "rgba(255,255,255,.75)", fontSize: 13 }}>
            Gestión de Reportes de Atención Prehospitalaria
          </div>
        </div>
        <div style={{ marginLeft: "auto", background: "rgba(255,255,255,.12)",
          borderRadius: 10, padding: "6px 16px", color: "rgba(255,255,255,.9)", fontSize: 12 }}>
          📁 {reportes.length} reporte{reportes.length !== 1 ? "s" : ""} en sistema
        </div>
      </div>

      {/* Menú */}
      <div style={{ background: "white", borderBottom: `2px solid ${C.gris}`,
        display: "flex", padding: "0 32px", gap: 4 }}>
        {menu.map(m => (
          <button key={m.key} onClick={() => { setSeccion(m.key); setEditando(null); }}
            style={{
              padding: "14px 22px", border: "none", background: "transparent",
              cursor: "pointer", fontSize: 14, fontWeight: 700,
              color: seccion === m.key ? C.azulMed : C.grisTx,
              borderBottom: seccion === m.key ? `3px solid ${C.azulMed}` : "3px solid transparent",
            }}>
            {m.icon} {m.label}
          </button>
        ))}
      </div>

      {/* Mensaje feedback */}
      {mensaje && (
        <div style={{
          margin: "16px 32px 0", padding: "12px 18px", borderRadius: 9,
          background: mensaje.tipo === "warn" ? "#fff8e1" : "#e8f5e9",
          border: `1px solid ${mensaje.tipo === "warn" ? C.amarillo : C.verde}`,
          color: mensaje.tipo === "warn" ? C.amarillo : C.verde,
          fontWeight: 600, fontSize: 14,
        }}>
          {mensaje.txt}
        </div>
      )}

      {/* Contenido */}
      <div style={{ padding: "28px 32px", flex: 1,
        display: "flex", flexDirection: "column", alignItems: "center" }}>

        {/* ALTAS */}
        {seccion === "altas" && (
          <FormFRAP titulo="Nuevo Reporte FRAP" onGuardar={agregarReporte} />
        )}

        {/* CONSULTAS */}
        {seccion === "consultas" && (
          <div style={{ width: "100%", maxWidth: 1000 }}>
            <div style={{ display: "flex", justifyContent: "space-between",
              alignItems: "center", marginBottom: 18, flexWrap: "wrap", gap: 12 }}>
              <h3 style={{ margin: 0, color: C.azul }}>🔍 Consulta de Reportes FRAP</h3>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <select value={filtroServicio} onChange={e => setFiltroServicio(e.target.value)}
                  style={{ padding: "9px 14px", borderRadius: 8,
                    border: `1.5px solid ${C.gris}`, fontSize: 14, outline: "none" }}>
                  <option>Todos</option>
                  {SERVICIOS.map(s => <option key={s}>{s}</option>)}
                </select>
                <input
                  placeholder="Buscar por folio, solicitante..."
                  value={busqueda} onChange={e => setBusqueda(e.target.value)}
                  style={{ padding: "9px 16px", borderRadius: 8,
                    border: `1.5px solid ${C.gris}`, fontSize: 14, width: 260, outline: "none" }}
                />
              </div>
            </div>
            <div style={{ background: "white", borderRadius: 12,
              border: `1.5px solid ${C.gris}`, overflow: "hidden" }}>
              <Tabla columnas={columnas} filas={filtrados} />
            </div>
            <p style={{ color: C.grisTx, fontSize: 13, marginTop: 10 }}>
              Mostrando {filtrados.length} de {reportes.length} reportes.
            </p>
          </div>
        )}

        {/* ACTUALIZACIONES */}
        {seccion === "actualizaciones" && (
          <div style={{ width: "100%", maxWidth: 1000 }}>
            {!editando ? (
              <div>
                <h3 style={{ margin: "0 0 18px", color: C.azul }}>✏️ Selecciona un reporte para actualizar</h3>
                <div style={{ background: "white", borderRadius: 12,
                  border: `1.5px solid ${C.gris}`, overflow: "hidden" }}>
                  <Tabla columnas={columnas} filas={reportes}
                    acciones={(r) => (
                      <Btn onClick={() => setEditando(r)} color={C.amarillo}>Editar</Btn>
                    )} />
                </div>
              </div>
            ) : (
              <FormFRAP
                titulo={`Editando ${editando.folio}`}
                inicial={editando}
                onGuardar={guardarEdicion}
                onCancelar={() => setEditando(null)}
              />
            )}
          </div>
        )}

        {/* ELIMINACIÓN */}
        {seccion === "eliminacion" && (
          <div style={{ width: "100%", maxWidth: 1000 }}>
            <div style={{ background: "#fff3f3", border: `1.5px solid ${C.rojo}44`,
              borderRadius: 10, padding: "12px 18px", marginBottom: 20,
              color: C.rojo, fontSize: 14, fontWeight: 600 }}>
              ⚠️ Zona de eliminación. Esta acción es permanente e irreversible.
            </div>
            <div style={{ background: "white", borderRadius: 12,
              border: `1.5px solid ${C.gris}`, overflow: "hidden" }}>
              <Tabla columnas={columnas} filas={reportes}
                acciones={(r) => (
                  <Btn onClick={() => eliminar(r.id)} color={C.rojo}>Eliminar</Btn>
                )} />
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}