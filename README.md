# 🛍️ Documentación del Proyecto: **E-commerce "Zafar"**

---

## 📖 1. Introducción

Este documento detalla la **arquitectura**, **tecnologías** y **funcionalidades** del proyecto de e-commerce **Zafar**.  
El objetivo es proporcionar una guía clara para desarrolladores y cualquier persona interesada en entender cómo está construida la aplicación.

La tienda está diseñada para ser una **plataforma moderna de ropa y accesorios**, rápida y completamente adaptable a cualquier dispositivo.

---

## 🛠️ 2. Tecnologías Utilizadas (Tech Stack)

El proyecto se ha construido con tecnologías modernas y eficientes:

- ⚛️ **Framework Principal**: [Next.js 15](https://nextjs.org/) + **React 18**
  - Uso del **App Router** para SSR/CSR optimizado.
- 🟦 **Lenguaje**: **TypeScript** (código robusto, tipado y mantenible).
- 🎨 **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (utility-first).
- 🧩 **UI Components**: [ShadCN UI](https://ui.shadcn.com/) (basado en Radix UI + Tailwind).
- 🗂️ **Gestión de Estado**: [Zustand](https://zustand-demo.pmnd.rs/) (carrito de compras).
- 🤖 **Inteligencia Artificial**: [Genkit (Google)](https://github.com/google/genkit) (para futuras integraciones de IA).
- 📋 **Formularios**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) (validación robusta).

---

## 🚀 3. Funcionalidades Clave

### 🛒 Catálogo de Productos
- Listado completo con **filtros y ordenación**.  
- Páginas de colecciones (ej. *Novedades*, *Colección de Verano*).  
- Detalle del producto con:
  - Carrusel de imágenes.  
  - Descripción + especificaciones.  
  - ⭐ Reseñas de clientes.  

### 🏠 Página de Inicio Dinámica
- Carrusel de **banners principales**.  
- 🔥 **Oferta del Día** con cronómetro de cuenta regresiva.  
- Carrusel de productos destacados.  

### 🛍️ Carrito de Compras
- Persistente con `localStorage`.  
- Panel lateral tipo **Sheet**.  
- Añadir, eliminar y actualizar cantidades.  

### 💳 Checkout
- Flujo en varios pasos: **Información → Envío → Pago**.  

### 👤 Cuenta de Usuario
- Panel con **barra lateral de navegación**.  
- Secciones: Perfil, Favoritos, Historial de pedidos, Seguridad.  

### 📱 Responsividad
- Totalmente optimizado para **móvil, tablet y escritorio**.  

---

## 📂 4. Estructura de Archivos y Directorios

### `src/app/`  
El corazón de la app: páginas + enrutamiento con App Router.  

- `layout.tsx` → Layout global (Header, Footer, Toaster).  
- `globals.css` → Estilos globales (Tailwind + variables CSS).  
- `page.tsx` → Home con carrusel, oferta y colecciones.  

#### Subdirectorios principales
- **`products/`**
  - `page.tsx` → Catálogo `/products`.  
  - `[id]/page.tsx` → Detalle de producto `/products/1`.  

- **`collections/[slug]/page.tsx`** → Colecciones específicas.  

- **`checkout/page.tsx`** → Proceso de compra.  

- **`account/`**
  - `layout.tsx` → Layout con navegación lateral.  
  - `page.tsx` → Perfil del usuario.  
  - `favorites/page.tsx` → Favoritos.  
  - `orders/page.tsx` → Historial de pedidos.  
  - `orders/[id]/page.tsx` → Detalle de pedido.  
  - `security/page.tsx` → Seguridad (cambiar contraseña).  

---

### `src/components/`  
Componentes **reutilizables** de la interfaz.  

- `ui/` → Componentes de ShadCN UI (Button, Card, Input).  
- `layout/` → Estructura:
  - `header.tsx` → Navegación + logo + carrito + cuenta.  
  - `footer.tsx` → Enlaces y suscripción.  
- `product-card.tsx` → Tarjeta de producto.  
- `cart-sheet.tsx` → Panel lateral del carrito.  
- `star-rating.tsx` → ⭐ Calificaciones.  
- `countdown-timer.tsx` → Cronómetro de ofertas.  
- `icons.tsx` → Logo **Zafar**.  

---

### `src/hooks/`  
Custom hooks para lógica de estado.  

- `use-cart.ts` → Estado del carrito (Zustand).  
- `use-toast.ts` → Notificaciones.  
- `use-debounce.ts` → Filtros optimizados.  
- `use-mobile.tsx` → Detección de móvil.  

---

### `src/lib/`  
Funciones de utilidad.  

- `utils.ts` → `cn` (clases condicionales Tailwind).  
- `placeholder-data.ts` → Datos fake (productos, pedidos, reseñas).  

---

### `src/ai/`  
Integración con **Genkit**.  

- `genkit.ts` → Configuración inicial.  
- `dev.ts` → Flujos de prueba en desarrollo.  
- `flows/` (futuro) → Flujos de IA (recomendador, generador de descripciones).  

---

### `src/types/`  
- `index.ts` → Interfaces **TypeScript**:  
  - `Product`, `Order`, `Review`, `CartItem`.  

---

### Archivos raíz
- `tailwind.config.ts` → Configuración de Tailwind.  
- `next.config.ts` → Configuración de Next.js.  
- `package.json` → Dependencias y scripts.  
- `components.json` → Configuración de ShadCN UI.  
- `tsconfig.json` → Configuración de TypeScript.  

---

## ✅ Conclusión

**Zafar** es un e-commerce moderno, escalable y preparado para integrar **IA** en el futuro.  
La arquitectura modular, el uso de **Next.js 15** y la integración de herramientas como **Zustand** y **ShadCN UI** hacen que sea un proyecto sólido y fácil de mantener.  
