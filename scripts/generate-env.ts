

function loadConfig(): Config {
  const configPath = join(PROJECT_ROOT, 'config.yaml');

  if (!existsSync(configPath)) {
    console.error('Error: config.yaml not found.');
    console.error('Run: cp config.yaml.example config.yaml');
    process.exit(1);
  }

  const configContent = readFileSync(configPath, 'utf-8');
  return parse(configContent) as Config;
}

function generateRootEnv(config: Config): string {
  return `# Generated from config.yaml - do not edit directly
# Regenerate with: npm run generate:env

# Application
NODE_ENV=${config.app.environment}
APP_NAME=${config.app.name}
LOG_LEVEL=${config.app.log_level}

# Ports
FRONTEND_PORT=${config.server.frontend.port}
BACKEND_PORT=${config.server.backend.port}
TSDB_PORT=${config.timescaledb.port}
MONGODB_PORT=${config.mongodb.port}
REDIS_PORT=${config.redis.port}

# API URL for frontend
VITE_API_URL=http://localhost:${config.server.backend.port}

# MongoDB
MONGODB_DBNAME=${config.mongodb.database}
MONGODB_ERP_DBNAME=${config.mongodb.erp_database}

# Authentication
JWT_SECRET=${config.auth.jwt_secret}
PASSPHRASE=${config.auth.passphrase}

# NPM (for Docker builds with private packages)
NPM_TOKEN=${config.npm.token}

# CORS
CORS_ORIGIN=${config.cors.origin}
`;
}

function generateFrontendEnv(config: Config): string {
  return `# Generated from config.yaml - do not edit directly
# Regenerate with: npm run generate:env

VITE_API_URL=http://localhost:${config.server.backend.port}
VITE_APP_NAME=${config.app.name}
VITE_APP_ENV=${config.app.environment}
`;
}

function generateBackendEnv(config: Config): string {
  return `# Generated from config.yaml - do not edit directly
# Regenerate with: npm run generate:env

# Server
NODE_ENV=${config.app.environment}
PORT=${config.server.backend.port}

# Application
LOG_LEVEL=${config.app.log_level}

# TimescaleDB (PostgreSQL)
TSDB_PG_URL=${config.timescaledb.url}

# MongoDB
MONGODB_URL=${config.mongodb.url}
MONGODB_DBNAME=${config.mongodb.database}
MONGODB_ERP_DBNAME=${config.mongodb.erp_database}


function main() {
  console.log('Generating environment files from config.yaml...\n');

  const config = loadConfig();


}

main();
