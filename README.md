# Ecuaplanet-Front

## Integrantes

<ul>
    <li>Carlos Oña</li>
    <li>Brandon Pozo</li>
    <li>Andrés Román</li>
    <li>Normal Uquillas</li>
</ul>

# React Native Expo Project

## ✨ Bienvenida

Este proyecto utiliza **React Native** con **Expo** para el desarrollo de aplicaciones móviles multiplataforma. Este documento detalla cómo clonar, instalar, ejecutar el proyecto y seguir las mejores prácticas.

---

## ⚡ Requisitos previos

1. **Node.js**: Descarga e instala [Node.js](https://nodejs.org/) (versión recomendada LTS).
2. **Git**: Asegúrate de tener [Git](https://git-scm.com/) instalado.
3. **Emuladores** (opcional):
   - Android: Instala Android Studio con un emulador configurado.
   - iOS: Necesitarás una Mac con Xcode instalado.
4. **Expo Go App**: Descarga la aplicación Expo Go desde la [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent) o [App Store](https://apps.apple.com/us/app/expo-go/id982107779).

---

## 💿 Clonar el proyecto

Clona este repositorio con el siguiente comando:

```bash
git clone https://github.com/andrew001s/Ecuaplanet-Front.git
cd Ecuaplanet-Front
```

---

## 📄 Instalación de dependencias

Ejecuta este comando para instalar todas las dependencias:

```bash
npm install
```

---

## 🚀 Ejecución del proyecto

### 1. Ejecutar en **Expo Go**:

```bash
npm start
```

Esto abrirá el servidor de desarrollo en tu navegador. Escanea el código QR con la aplicación **Expo Go**.

### 2. Ejecutar en **Android**:

```bash
npm run android
```

Asegúrate de tener un emulador Android en ejecución o un dispositivo físico conectado con la depuración USB habilitada.

### 3. Ejecutar en **iOS** (Mac requerido):

```bash
npm run ios
```

Esto abrirá el simulador de iOS si Xcode está instalado correctamente.

### 4. Ejecutar en **Web**:

```bash
npm run web
```

Esto abrirá la aplicación en tu navegador predeterminado.

---

## ⚖ Buenas prácticas

### Estructura de carpetas

Organiza los archivos del proyecto de esta manera:

```
root
├── assets/         # Recursos estáticos como imágenes y fuentes
├── src/
│   ├── components/  # Componentes reutilizables
│   ├── screens/     # Pantallas de la aplicación
│   ├── navigation/  # Navegación (React Navigation)
│   ├── hooks/       # Custom hooks
│   ├── utils/       # Funciones útiles
│   └── styles/      # Archivos de estilos globales
├── .eslintrc.js    # Configuración de ESLint
├── .prettierrc     # Configuración de Prettier
```

### ESLint y Prettier

1. Ejecuta el linter para verificar errores:
   ```bash
   npm run lint
   ```
2. Corrige errores automáticamente:
   ```bash
   npm run lint:fix
   ```
3. Formatea el código:
   ```bash
   npm run format
   ```

**⚠️ Importante ⚠️**: Asegúrte de ejecutar **ESLint** y **Prettier** antes de hacer push a cualquier rama.

Configura tu editor (como VS Code) para ejecutar **ESLint**, y **Prettier** automáticamente al guardar.

---

### Extensiones

1. [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
2. [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

---

## 🌈 Tailwind CSS

Este proyecto utiliza **Tailwind CSS** con [nativewind](https://www.nativewind.dev/).

### Uso:

Usa clases de Tailwind en los componentes de React Native:

```jsx
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 justify-center items-center bg-blue-500">
      {' '}
      //Clases de Tailwind
      <Text className="text-white text-lg font-bold">Hola, Tailwind!</Text>
    </View>
  );
}
```

---

## 🔣 Iconos con Expo Vector Icons

### Uso:

```jsx
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return <Ionicons name="home" size={24} color="black" />;
}
```

Encuentra más iconos disponibles en la [documentación oficial](https://icons.expo.fyi/).

---

## ✅ Conventional Commits

Utiliza el formato de **Conventional Commits** para los mensajes de commit:

### Formato básico:

```plaintext
:emoji: mensaje breve
```

### Ejemplos:

- ✨ `feat: :sparkles: agregar funcionalidad de inicio de sesión`
- 🔧 `fix: :wrench: corregir configuración del linter`
- 🖊️ `doc: :pencil: actualizar documentación del README`

**⚠️ Importante ⚠️**: Asegúrte de que todos los commits sigan el formato de **Conventional Commits** y que el código pase las verificaciones de ESLint y Prettier antes de realizar un push.

Recomendamos usar la extensión [Conventional Commits](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits) para VS Code para facilitar este proceso.
