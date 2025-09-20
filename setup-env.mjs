import fs from "fs";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function pregunta(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

async function configurar() {
  console.log("========================================");
  console.log("    CONFIGURACION - SISTEMA ESTETICA    ");
  console.log("========================================\n");
  
  console.log("Presiona Enter para usar valores por defecto\n");

  const respuestas = {};

  console.log("\n--- CONFIGURACION DE LA APP ---");
  
  respuestas.NODE_ENV = await pregunta("Entorno [development]: ") || "development";
  respuestas.PORT = await pregunta("Puerto [3000]: ") || "3000";
  respuestas.NEXT_PUBLIC_APP_URL = await pregunta("URL [http://localhost:3000]: ") || "http://localhost:3000";
  respuestas.NEXT_PUBLIC_APP_NAME = await pregunta("Nombre [Sistema Estetica]: ") || "Sistema Estetica";

  console.log("\n--- BASE DE DATOS ---");
  respuestas.MONGODB_URI = await pregunta("MongoDB URI [mongodb://localhost:27017]: ") || "mongodb://localhost:27017";
  respuestas.DATABASE_NAME = await pregunta("Nombre BD [sistema_estetica]: ") || "sistema_estetica";

  console.log("\n--- AUTENTICACION ---");
  respuestas.JWT_SECRET = await pregunta("JWT Secret (Enter para generar automatico): ");
  
  if (!respuestas.JWT_SECRET) {
    respuestas.JWT_SECRET = Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
    console.log("JWT_SECRET generado automaticamente");
  }
  
  respuestas.JWT_EXPIRATION = await pregunta("Tiempo expiracion [7d]: ") || "7d";

  rl.close();

  const contenido = `# CONFIGURACION - SISTEMA ESTETICA
# ${new Date().toLocaleString()}

# APLICACION
NODE_ENV=${respuestas.NODE_ENV}
PORT=${respuestas.PORT}
NEXT_PUBLIC_APP_URL=${respuestas.NEXT_PUBLIC_APP_URL}
NEXT_PUBLIC_APP_NAME="${respuestas.NEXT_PUBLIC_APP_NAME}"

# BASE DE DATOS
MONGODB_URI=${respuestas.MONGODB_URI}
DATABASE_NAME=${respuestas.DATABASE_NAME}

# AUTENTICACION
JWT_SECRET=${respuestas.JWT_SECRET}
JWT_EXPIRATION=${respuestas.JWT_EXPIRATION}
`;

  try {
    fs.writeFileSync('.env.local', contenido);
    console.log("\nArchivo .env.local creado!");
    
    const ejemplo = contenido
      .replace(/JWT_SECRET=.*/g, 'JWT_SECRET=')
      .replace(/MONGODB_URI=.*/g, 'MONGODB_URI=');
    
    fs.writeFileSync('.env.example', ejemplo);
    console.log("Archivo .env.example creado!");
    
    if (fs.existsSync('.gitignore')) {
      let gitignore = fs.readFileSync('.gitignore', 'utf8');
      if (!gitignore.includes('.env')) {
        gitignore += '\n# Variables de entorno\n.env\n.env.local\n';
        fs.writeFileSync('.gitignore', gitignore);
        console.log("Archivo .gitignore actualizado!");
      }
    }
    
    console.log("\n--- LISTO ---");
    console.log("1. Revisa tu archivo .env.local");
    console.log("2. Ejecuta: npm install");
    console.log("3. Ejecuta: npm run dev");
    
  } catch (error) {
    console.error("Error:", error);
  }
}

configurar();