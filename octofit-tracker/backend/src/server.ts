const port = process.env.PORT || '8000';
const codespaceName = process.env.CODESPACE_NAME;

const apiUrl = codespaceName
  ? `https://${codespaceName}-${port}.app.github.dev`
  : `http://localhost:${port}`;

console.log('CODESPACE_NAME:', codespaceName ?? '<unset>');
console.log('Computed API URL:', apiUrl);

if (codespaceName) {
  console.log('Codespace URL check: OK — running in Codespaces environment');
} else {
  console.log('Codespace URL check: CODESPACE_NAME not set — using localhost fallback');
}

export { apiUrl, codespaceName };
