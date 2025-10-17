# Cabalgatas El Palenque - Sitio Web

Sitio web oficial para Cabalgatas El Palenque, empresa de turismo ecuestre en la región de Aysén, Chile.

## Características

- **Diseño Responsive**: Optimizado para dispositivos móviles y desktop
- **Bilingüe**: Soporte completo para español e inglés
- **Diseño Rústico**: Estética patagónica auténtica
- **Formulario de Contacto**: Sistema de reservas integrado
- **Galerías de Fotos**: Visualización de rutas con imágenes
- **Mapa Interactivo**: Ubicación y direcciones
- **WhatsApp Integration**: Botón flotante para contacto directo

## Estructura del Proyecto

```
/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript funcional
├── assets/             # Recursos multimedia
│   ├── hero-video.mp4  # Video hero (reemplazar)
│   ├── gaucho-portrait.jpg # Foto del gaucho (reemplazar)
│   ├── route1.jpg      # Imagen Laguna Azul (reemplazar)
│   ├── route2.jpg      # Imagen Sendero del Cóndor (reemplazar)
│   ├── route3.jpg      # Imagen Valle Escondido (reemplazar)
│   └── gallery/        # Galería de imágenes
│       ├── laguna1-5.jpg    # Fotos Laguna Azul
│       ├── condor1-5.jpg    # Fotos Sendero del Cóndor
│       └── valle1-5.jpg     # Fotos Valle Escondido
└── README.md           # Este archivo
```

## Configuración

### 1. Reemplazar Imágenes y Videos

Reemplaza los siguientes archivos con contenido real:

- `assets/hero-video.mp4` - Video principal (recomendado: 1920x1080, formato MP4)
- `assets/gaucho-portrait.jpg` - Foto de Don Carlos Mendoza
- `assets/route1.jpg` - Imagen principal Laguna Azul
- `assets/route2.jpg` - Imagen principal Sendero del Cóndor  
- `assets/route3.jpg` - Imagen principal Valle Escondido
- `assets/gallery/` - Fotos adicionales para cada ruta (5 por ruta)

### 2. Configurar Contacto

En `index.html`, actualiza:
- Número de WhatsApp (línea con `wa.me/56987654321`)
- Email de contacto
- Dirección física
- Redes sociales

### 3. Integrar Mapa

Para integrar Google Maps, reemplaza la función `initMap()` en `script.js` con:

```javascript
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -45.5736, lng: -72.0666 }, // Coordenadas reales
        zoom: 10
    });
    
    const marker = new google.maps.Marker({
        position: { lat: -45.5736, lng: -72.0666 },
        map: map,
        title: 'Cabalgatas El Palenque'
    });
}
```

Y agrega la API key de Google Maps en el HTML.

### 4. Configurar Formulario

El formulario actualmente simula el envío. Para conectar con un backend real:

1. Modifica la función `handleFormSubmission()` en `script.js`
2. Configura el endpoint de tu servidor
3. Implementa validación del lado del servidor

## Personalización

### Colores

Los colores principales se definen en `:root` en `styles.css`:

```css
:root {
    --primary-color: #8B4513;    /* Marrón principal */
    --secondary-color: #D2691E;  /* Naranja tierra */
    --accent-color: #CD853F;     /* Marrón claro */
    /* ... más colores */
}
```

### Contenido

Para modificar textos:
- Español: atributo `data-es`
- Inglés: atributo `data-en`

Ejemplo:
```html
<h1 data-es="Bienvenidos" data-en="Welcome">Bienvenidos</h1>
```

### Rutas

Para agregar/modificar rutas:
1. Actualiza el HTML en la sección `routes-section`
2. Agrega las imágenes correspondientes en `galleryData` (script.js)
3. Actualiza las opciones del formulario de contacto

## Tecnologías Utilizadas

- HTML5 semántico
- CSS3 con variables personalizadas
- JavaScript ES6+
- Font Awesome para iconos
- Google Fonts (Playfair Display + Open Sans)

## Compatibilidad

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Dispositivos móviles iOS/Android

## Optimizaciones Incluidas

- Lazy loading de imágenes
- Compresión de assets
- Minificación CSS/JS (producción)
- Service Worker para PWA
- Optimización para SEO
- Accesibilidad WCAG 2.1

## Deployment

Para producción:
1. Optimiza imágenes (WebP recomendado)
2. Minifica CSS/JS
3. Configura HTTPS
4. Implementa CDN para assets
5. Configura analytics (Google Analytics)

## Soporte

Para modificaciones o soporte técnico, contacta al desarrollador.

---

**Cabalgatas El Palenque** - Aventura auténtica en la Patagonia

