# NCM Digital 🚀

**Agencia de Desarrollo Web y Automatización con Inteligencia Artificial**

NCM Digital construye soluciones digitales de alto impacto para comercios y empresas: desde páginas web profesionales y visualmente atractivas hasta pipelines de automatización end-to-end con IA.

---

## ¿Qué hacemos?

| Servicio | Descripción |
|---|---|
| 🌐 **Páginas Web** | Sitios web modernos, responsivos y optimizados para conversión |
| 🤖 **Agentes de IA** | Chatbots conversacionales entrenados con GPT y conectados al contexto de tu empresa |
| ⚡ **Automatizaciones** | Flujos de datos sin fricciones usando **n8n**, deployados en **Railway** |

---

## Tecnologías

- **Frontend:** HTML5, CSS3 (Vanilla), JavaScript ES6+
- **Automatización:** [n8n](https://n8n.io/) — orquestación de flujos con nodos visuales
- **Infraestructura:** [Railway](https://railway.app/) — deploy de webhooks y backends en la nube
- **IA:** Modelos GPT (OpenAI) integrados vía API para agentes conversacionales

---

## Estructura del Proyecto

```
NCM-Digital/
├── index.html                  # Página principal
├── assets/
│   ├── img/
│   │   └── og-image.jpg        # Imagen para Open Graph / redes sociales
│   └── svg/
│       └── ncm-favicon.svg     # Favicon del sitio
├── css/
│   └── styles.css              # Todos los estilos (variables, componentes, responsive)
├── js/
│   ├── chatbot.js              # Lógica del chatbot conectado a n8n
│   └── main.js                 # Menú hamburguesa, tema oscuro, scroll, animaciones
├── politica-de-privacidad.html
├── terminos-y-condiciones.html
└── eliminacion-de-datos.html
```

---

## Chatbot — Integración n8n + Railway

El chatbot integrado usa un webhook de n8n alojado en Railway. Cuando un usuario envía un mensaje:

1. El cliente genera un `sessionId` único (persistido en `localStorage`)
2. El payload se envía vía `POST` al webhook de n8n en Railway
3. n8n procesa el mensaje (con el agente de IA configurado) y retorna una respuesta
4. La respuesta se renderiza en el chat en tiempo real

---

## Contacto

- 🌐 [ncmdigital.com](https://www.ncmdigital.com)
- 📘 [Facebook](https://www.facebook.com/profile.php?id=61586417062179)
- 📸 [Instagram](https://www.instagram.com/ncm__digital/)

---

© 2026 NCM Digital. Construyendo juntos.
