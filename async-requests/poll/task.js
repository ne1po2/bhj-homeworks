const pollElement = document.querySelector('.poll');
const titleElement = document.getElementById('poll__title');
const answersElement = document.getElementById('poll__answers');

async function fetchPollData() {
  try {
    const response = await fetch('https://students.netoservices.ru/nestjs-backend/poll');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при загрузке данных опроса:', error);
    return null;
  }
}

async function displayPoll() {
  const pollData = await fetchPollData();
  if (!pollData) {
    return;
  }

  titleElement.textContent = pollData.data.title;
  answersElement.innerHTML = '';

  pollData.data.answers.forEach((answer) => {
    const answerElement = document.createElement('button');
    answerElement.classList.add('poll__answer');
    answerElement.textContent = answer;
    answerElement.addEventListener('click', showConfirmationDialog);
    answersElement.appendChild(answerElement);
  });
}

function showConfirmationDialog() {
  alert('Спасибо, ваш голос засчитан!');
}

displayPoll();