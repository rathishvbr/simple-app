export let downloadJSON = (content) => {
  const a = document.createElement('a');
  const file = new Blob([JSON.stringify(content, undefined, 2)], {
    type: 'text/plain',
  });
  a.href = URL.createObjectURL(file);
  a.download = `${new Date().toISOString()}-file.json`;
  a.click();
};
