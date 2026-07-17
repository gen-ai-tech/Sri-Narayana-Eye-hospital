const fs = require('fs');

const files = ['index.html', 'about.html', 'services.html', 'contact.html', 'portal.html', 'css/styles.css', 'css/components.css', 'update_headers.js'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/text-align:\s*(center|left)/g, 'text-align: justify');
    content = content.replace(/\?v=24/g, '?v=25');
    fs.writeFileSync(file, content);
  }
});

let comp = fs.readFileSync('css/components.css', 'utf8');
comp = comp.replace(/(\.btn\s*\{[^}]+)text-align:\s*justify/g, '$1text-align: center');
fs.writeFileSync('css/components.css', comp);

console.log('Done');
