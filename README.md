
✨ Características
✅ Autenticación simple por usuario (login/registro)

➕ Crear transacciones (monto positivo = ingreso, negativo = egreso)

🗑️ Eliminar transacciones

📊 Resumen: ingresos, egresos, balance y totales por categoría

🗓️ Gastos por mes (agrupados y con total mensual)

💅 Estilos limpios y responsive

⚙️ Variables de entorno para apuntar al backend (VITE_API_URL)


🧱 Tech Stack
Frontend: React 19, Vite 7

Linter: ESLint

Despliegue recomendado: Vercel

📦 Requisitos
Node.js 18+ (recomendado 20)

npm run dev



LoguinRegister: Muestra el formulario para iniciar seccion o registrarse, lanza mensaje de error si falla la peticion, atado a back.

Summary: suma todas las transacciones, egreso, ingreso total , muestra ingresos, egresos y el total. 

TransationForm: lista las categorias de compras, describe las variables

TransationList: es el listado principal de tu app. Divide las transacciones por tipo, les da formato, y permite borrarlas


TransationByMonth: toma las transacciones y las agrupa por mes.

App.jsx: es el componente raíz de todo el gestor de finanzas, y cumple como el cerebro que conecta login, formulario, listas y resúmenes con el backend.


Como arrancar Fronted: Npm run dev

.


