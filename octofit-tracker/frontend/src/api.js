export function getApiUrl(resource) {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME?.trim();
  const host = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const path = resource.replace(/^\/|\/$/g, '');
  const url = `${host}/api/${path}/`;
  console.log('[api] using endpoint', url);
  return url;
}
