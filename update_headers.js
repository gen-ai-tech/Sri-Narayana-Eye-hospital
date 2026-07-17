const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const headerRegex = /<header class="header">[\s\S]*?<\/header>/;
const newHeaderMatch = indexHtml.match(headerRegex);

if (!newHeaderMatch) {
  console.error("Could not find header in index.html");
  process.exit(1);
}
const newHeader = newHeaderMatch[0];

['about.html', 'services.html', 'contact.html', 'portal.html'].forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(headerRegex, newHeader);
  content = content.replace(/href="css\/components\.css(\?v=\d+)?"/g, 'href="css/components.css?v=13"');
  content = content.replace(/href="css\/styles\.css(\?v=\d+)?"/g, 'href="css/styles.css?v=13"');
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});
