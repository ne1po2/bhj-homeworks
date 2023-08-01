document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (!file) {
    alert("Пожалуйста, выберите файл для загрузки.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const progress = document.getElementById("progress");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://students.netoservices.ru/nestjs-backend/upload");

  xhr.upload.onprogress = function (e) {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100;
      progress.value = percentComplete;
    }
  };

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      alert("Файл успешно загружен!");
      progress.value = 0;
    } else {
      alert("Ошибка загрузки файла.");
    }
  };

  xhr.onerror = function () {
    alert("Произошла ошибка при загрузке файла.");
  };

  xhr.send(formData);
});