const PRODUCTION_ENDPOINT = 'stats.api.generative.fm/v1';
const ENV_VAR = 'GFM_STATS_ENDPOINT';

const envVarValue = process.env[ENV_VAR];

const endpoint = envVarValue || PRODUCTION_ENDPOINT;

export default endpoint;
