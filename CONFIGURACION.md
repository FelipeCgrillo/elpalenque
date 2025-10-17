# Guía de Configuración - Cabalgatas El Palenque

## 🚀 Pasos Inmediatos para Poner en Funcionamiento

### 1. Actualizar Información de Contacto

En `index.html`, busca y actualiza:

```html
<!-- Línea ~380: Número de WhatsApp -->
<a href="https://wa.me/56987654321" class="whatsapp-float" target="_blank">

<!-- Línea ~320: Email de contacto -->
<p><i class="fas fa-envelope"></i> info@elpalenque.cl</p>

<!-- Línea ~321: Teléfono -->
<p><i class="fas fa-phone"></i> +56 9 8765 4321</p>

<!-- Línea ~322: Dirección -->
<p><i class="fas fa-map-marker-alt"></i> Aysén, Chile</p>
```

### 2. Configurar Coordenadas Reales del Mapa

En `script.js`, línea ~550, actualiza las coordenadas:

```javascript
center: { lat: -45.5736, lng: -72.0666 }, // Reemplazar con coordenadas reales
```

Para obtener coordenadas exactas:
1. Ve a Google Maps
2. Busca tu ubicación exacta
3. Haz clic derecho y selecciona "¿Qué hay aquí?"
4. Copia las coordenadas que aparecen

### 3. Integrar Google Maps (Opcional pero Recomendado)

1. Obtén una API Key de Google Maps:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un proyecto nuevo
   - Habilita "Maps JavaScript API"
   - Crea credenciales (API Key)

2. Agrega el script antes del cierre de `</body>` en `index.html`:

```html
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY&callback=initMap">
</script>
```

3. Descomenta el código del mapa en `script.js` (líneas ~550-570)

### 4. Configurar Formulario de Contacto

**Opción A: Servicio Simple (Recomendado para inicio)**
- Usa [Formspree](https://formspree.io/) o [Netlify Forms](https://www.netlify.com/products/forms/)
- Cambia la acción del formulario en `index.html`

**Opción B: Backend Personalizado**
- Modifica `handleFormSubmission()` en `script.js`
- Implementa endpoint en tu servidor

### 5. Optimizar para Producción

**Antes de subir a servidor:**

1. **Comprimir imágenes:**
   ```bash
   # Usando ImageOptim, TinyPNG, o similar
   # Objetivo: Reducir peso sin perder calidad
   ```

2. **Minificar archivos:**
   ```bash
   # CSS: Usar cssnano o similar
   # JS: Usar terser o similar
   ```

3. **Configurar HTTPS:**
   - Obligatorio para PWA
   - Usar Let's Encrypt o certificado de hosting

## 📱 Funcionalidades Incluidas

### ✅ Completamente Funcional
- [x] Diseño responsive (móvil/desktop)
- [x] Sistema bilingüe (ES/EN)
- [x] Navegación suave
- [x] Formulario de contacto con validación
- [x] Galerías de imágenes interactivas
- [x] Botón flotante de WhatsApp
- [x] Animaciones y efectos visuales
- [x] PWA (instalable como app)
- [x] SEO optimizado
- [x] Accesibilidad básica

### 🔧 Requiere Configuración
- [ ] Imágenes y videos reales
- [ ] Información de contacto real
- [ ] Coordenadas del mapa
- [ ] Integración con Google Maps
- [ ] Backend para formulario
- [ ] Iconos para PWA

## 🎨 Personalización Avanzada

### Cambiar Colores
En `styles.css`, modifica las variables CSS:

```css
:root {
    --primary-color: #8B4513;    /* Marrón principal */
    --secondary-color: #D2691E;  /* Naranja tierra */
    --accent-color: #CD853F;     /* Marrón claro */
}
```

### Agregar Nuevas Rutas
1. Duplica una tarjeta de ruta en el HTML
2. Actualiza el contenido y enlaces
3. Agrega imágenes correspondientes
4. Actualiza `galleryData` en `script.js`

### Modificar Textos
Todos los textos usan el sistema bilingüe:
```html
<elemento data-es="Texto en español" data-en="English text">Texto en español</elemento>
```

## 🚀 Deployment

### Hosting Recomendado
- **Netlify** (gratis, fácil, HTTPS automático)
- **Vercel** (gratis, rápido)
- **GitHub Pages** (gratis si el repo es público)

### Pasos para Netlify:
1. Sube los archivos a un repositorio Git
2. Conecta Netlify con tu repositorio
3. Deploy automático en cada cambio

### Configuración de Dominio
1. Compra dominio (ej: elpalenque.cl)
2. Configura DNS en tu hosting
3. Habilita HTTPS

## 📊 Analytics y Seguimiento

### Google Analytics 4
Agrega antes del cierre de `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Facebook Pixel (Opcional)
Para remarketing en redes sociales.

## 🔍 SEO Adicional

### Sitemap.xml
Crea un archivo `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://elpalenque.cl/</loc>
    <lastmod>2024-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### robots.txt
Crea un archivo `robots.txt`:

```
User-agent: *
Allow: /
Sitemap: https://elpalenque.cl/sitemap.xml
```

## 🆘 Soporte y Mantenimiento

### Actualizaciones Regulares
- Revisar formularios mensualmente
- Actualizar imágenes estacionalmente
- Verificar enlaces y funcionalidades

### Backup
- Mantén copias de seguridad regulares
- Usa control de versiones (Git)

### Monitoreo
- Google Search Console
- PageSpeed Insights
- Uptime monitoring

---

**¿Necesitas ayuda?** Revisa la documentación o contacta al desarrollador para soporte técnico específico.

