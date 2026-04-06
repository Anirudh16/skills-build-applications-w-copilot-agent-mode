function getCodespaceNameFromCurrentHost() {
  if (typeof window === 'undefined') {
    return null;
  }

  const hostname = window.location.hostname || '';
  const match = hostname.match(/^(.+)-3000\.app\.github\.dev$/);
  return match ? match[1] : null;
}

export function getApiUrl(resource) {
  const path = resource.replace(/^\/|\/$/g, '');
  const useProxy = process.env.NODE_ENV !== 'production';

  if (useProxy) {
    const url = `/api/${path}/`;
    console.log('[api] using proxy endpoint', url);
    return url;
  }

  const codespaceName =
    process.env.REACT_APP_CODESPACE_NAME?.trim() || getCodespaceNameFromCurrentHost();
  const host = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  const url = `${host}/api/${path}/`;
  console.log('[api] using endpoint', url);
  return url;
}
