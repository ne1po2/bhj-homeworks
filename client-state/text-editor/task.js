const editor = document.getElementById('editor');
const storedValue = localStorage.getItem('editorValue');

if (storedValue) {
  editor.value = storedValue;
}

editor.addEventListener('input', () => {
  const value = editor.value;
  localStorage.setItem('editorValue', value);
});
