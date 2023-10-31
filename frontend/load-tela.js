document.addEventListener('DOMContentLoaded', () => {
  const missionForm = document.getElementById('missionForm');
  const messageDiv = document.getElementById('message');

  missionForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(missionForm);
    const missionData = {};
    formData.forEach((value, key) => {
      missionData[key] = value;
    });

    try {
      const response = await fetch('/api/mission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(missionData),
      });

      if (response.ok) {
        const result = await response.json();
        messageDiv.textContent = result.message;
      } else {
        messageDiv.textContent = 'Erro ao enviar missão para o servidor.';
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
      messageDiv.textContent = 'Erro na solicitação para o servidor.';
    }
  });
});