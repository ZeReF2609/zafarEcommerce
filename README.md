# Documentación del Proyecto: E-commerce "Pionier"

## 1. Introducción

Este documento detalla la arquitectura, tecnologías y funcionalidades del proyecto de e-commerce "Pionier". El objetivo es proporcionar una guía clara para desarrolladores y cualquier persona interesada en entender cómo está construida la aplicación.

La tienda está diseñada para ser una plataforma de venta de ropa y accesorios moderna, rápida y completamente adaptable a cualquier dispositivo.

---

## 2. Tecnologías Utilizadas (Tech Stack)

La aplicación se ha construido utilizando un conjunto de tecnologías modernas y eficientes:

- **Framework Principal**: **Next.js 15** con **React 18**. Se utiliza el App Router para un enrutamiento optimizado y renderizado del lado del servidor (SSR) y del lado del cliente (CSR).
- **Lenguaje**: **TypeScript**, para un código más robusto, seguro y fácil de mantener.
- **Estilos**: **Tailwind CSS**, un framework de CSS "utility-first" que permite construir diseños personalizados de manera rápida y eficiente.
- **Componentes de UI**: **ShadCN UI**, una colección de componentes de interfaz de usuario reutilizables, accesibles y estéticamente agradables, construidos sobre Radix UI y Tailwind CSS.
- **Gestión de Estado**: **Zustand**, un gestor de estado pequeño, rápido y escalable, utilizado principalmente para el carrito de compras.
- **Inteligencia Artificial**: **Genkit** (de Google), integrado y listo para añadir futuras funcionalidades de IA generativa, como asistentes de compra, descripciones de productos automáticas, etc.
- **Formularios**: **React Hook Form** con **Zod** para la validación de esquemas, garantizando formularios robustos y seguros.

---

## 3. Funcionalidades Clave Implementadas

- **Catálogo de Productos**:
  - Página de listado de todos los productos con filtros y ordenación.
  - Páginas de colecciones (ej. "Novedades", "Colección de Verano").
  - Página de detalle de producto con carrusel de imágenes, descripción, especificaciones y reseñas.
- **Página de Inicio Dinámica**:
  - Carrusel de banners principal para destacar promociones.
  - Sección de "Oferta del Día" con un cronómetro de cuenta regresiva para crear urgencia.
  - Carrusel de productos destacados.
- **Carrito de Compras**:
  - Un carrito persistente (usando `localStorage`) que se puede abrir y cerrar desde un panel lateral (`Sheet`).
  - Funcionalidad para añadir, eliminar y actualizar la cantidad de productos.
- **Proceso de Compra (Checkout)**:
  - Una página de checkout en varios pasos (Información, Envío, Pago) para una experiencia de usuario fluida.
- **Sección de Cuenta de Usuario**:
  - Un panel de cuenta con navegación lateral.
  - Secciones para gestionar el perfil, ver el historial de pedidos, consultar favoritos y cambiar la contraseña.
- **Diseño Responsivo**:
  - La interfaz está completamente optimizada para una experiencia perfecta en dispositivos móviles, tabletas y ordenadores de escritorio.

---

## 4. Estructura de Archivos y Directorios

A continuación se describe la organización del código fuente (`src/`) y otros archivos importantes.

### `src/app/`
El corazón de la aplicación, donde reside el enrutamiento y las páginas principales, siguiendo la convención del App Router de Next.js.

- **`layout.tsx`**: El layout principal de la aplicación. Envuelve a todas las páginas y contiene el `Header`, `Footer` y el `Toaster` para notificaciones. Aquí se definen los metadatos globales y las fuentes.
- **`globals.css`**: Archivo de estilos globales donde se configuran las directivas de Tailwind CSS y las variables de color del tema (CSS variables HSL) para `shadcn/ui`.
- **`page.tsx`**: La página de inicio (`/`). Contiene el carrusel principal, la oferta del día y las secciones de colecciones.

#### Subdirectorios en `src/app/`

- **`products/`**:
  - **`page.tsx`**: Página que muestra todos los productos (`/products`) con filtros y ordenación.
  - **`[id]/page.tsx`**: Página de detalle de un producto específico, accesible a través de una ruta dinámica como `/products/1`.
- **`collections/[slug]/`**:
  - **`page.tsx`**: Página para una colección específica (ej. `/collections/new-arrivals`), que filtra los productos por categoría.
- **`checkout/`**:
  - **`page.tsx`**: La página de proceso de pago (`/checkout`).
- **`account/`**:
  - **`layout.tsx`**: Un layout específico para las páginas de la cuenta de usuario, que incluye el menú de navegación lateral.
  - **`page.tsx`**: Página principal del perfil del usuario (`/account`).
  - **`favorites/page.tsx`**: Página para mostrar los productos favoritos.
  - **`orders/page.tsx`**: Página con el historial de pedidos.
  - **`orders/[id]/page.tsx`**: Página con los detalles de un pedido específico.
  - **`security/page.tsx`**: Página para cambiar la contraseña.

### `src/components/`
Contiene todos los componentes de React reutilizables de la aplicación.

- **`ui/`**: Alberga los componentes de `shadcn/ui` (Button, Card, Input, etc.). Estos son los bloques de construcción fundamentales de la interfaz.
- **`layout/`**: Componentes estructurales de la página.
  - **`header.tsx`**: El encabezado de la aplicación, con el logo, la navegación y los iconos de cuenta y carrito.
  - **`footer.tsx`**: El pie de página con enlaces útiles y el formulario de suscripción.
- **`product-card.tsx`**: El componente de tarjeta que se usa para mostrar un producto en las listas.
- **`cart-sheet.tsx`**: El panel lateral que muestra el contenido del carrito de compras.
- **`star-rating.tsx`**: Componente para mostrar la calificación de productos con estrellas.
- **`countdown-timer.tsx`**: El cronómetro reutilizable para las ofertas.
- **`icons.tsx`**: Donde se define el componente del logo "Pionier".

### `src/hooks/`
Contiene los "custom hooks" de React para encapsular lógica y estado.

- **`use-cart.ts`**: Hook de Zustand que gestiona todo el estado y las acciones del carrito de compras.
- **`use-toast.ts`**: Hook para mostrar notificaciones (toasts) en la aplicación.
- **`use-debounce.ts`**: Hook útil para retrasar la ejecución de una función, usado en los filtros de productos.
- **`use-mobile.tsx`**: Hook para detectar si el usuario está en un dispositivo móvil.

### `src/lib/`
Archivos de utilidad y lógica auxiliar.

- **`utils.ts`**: Contiene la función `cn`, una utilidad para combinar clases de Tailwind CSS de forma condicional.
- **`placeholder-data.ts`**: Archivo que contiene datos de ejemplo (productos, pedidos, reseñas) que simulan una base de datos. Ideal para el desarrollo y prototipado.

### `src/ai/`
Directorio destinado a la integración con **Genkit**.
- **`genkit.ts`**: Configuración inicial del cliente de Genkit.
- **`dev.ts`**: Archivo para importar y ejecutar los flujos de Genkit en el entorno de desarrollo.
- **`flows/`** (no creado aún): Este sería el lugar para definir los flujos de IA, como un recomendador de productos o un generador de descripciones.

### `src/types/`
- **`index.ts`**: Define las interfaces de TypeScript para las principales entidades de datos de la aplicación, como `Product`, `Order`, `Review`, y `CartItem`.

### Archivos Raíz

- **`tailwind.config.ts`**: Archivo de configuración de Tailwind CSS. Aquí se personalizan los colores, fuentes y animaciones del tema.
- **`next.config.ts`**: Configuración de Next.js, donde se pueden definir reglas para imágenes, redirecciones, etc.
- **`package.json`**: Define los scripts del proyecto (como `dev`, `build`) y lista todas las dependencias (librerías externas).
- **`components.json`**: Fichero de configuración de `shadcn/ui`.
- **`tsconfig.json`**: Configuración del compilador de TypeScript.
