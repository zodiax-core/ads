const urlsToTest = [
  'https://cdn.brandfetch.io/arydigital.tv/w/400/h/400',
  'https://cdn.brandfetch.io/samsung.com/w/400/h/400',
  'https://cdn.brandfetch.io/coca-cola.com/w/400/h/400',
  'https://cdn.brandfetch.io/packagesmall.com/w/400/h/400',
  'https://cdn.brandfetch.io/dib.ae/w/400/h/400',
  'https://upload.wikimedia.org/wikipedia/en/e/e0/Jeeto_Pakistan_Logo.png',
  'https://upload.wikimedia.org/wikipedia/en/4/4b/ARY_News_logo.svg',
  'https://upload.wikimedia.org/wikipedia/en/4/47/ARY_QTV_logo.png'
];

for (const url of urlsToTest) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    console.log(`${res.status} - ${url}`);
  } catch (e) {
    console.error(`Error ${url} - ${e.message}`);
  }
}
