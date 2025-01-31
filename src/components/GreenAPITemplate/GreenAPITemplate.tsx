class GreenApiVoipClient {
}

// Инициализация объекта VoipClient
const greenApiClient = new GreenApiVoipClient();

// Создание переменных
const connectButton = document.getElementById('connectButton');
const disconnectButton = document.getElementById('disconnectButton');
const startCallButton = document.getElementById('startCallButton');
const endCallButton = document.getElementById('endCallButton');
const phoneNumberInput = document.getElementById('phoneNumber');

let isInitialized = false;

// Запуск обработчика событий
connectButton.addEventListener('click', async () => {
    const idInstance = document.getElementById('idInstance').innerText;
    const apiTokenInstance = document.getElementById('apiTokenInstance').innerText;
    const apiUrl = document.getElementById('apiUrl').innerText;
    await greenApiClient.init({
        idInstance: idInstance,
        apiTokenInstance: apiTokenInstance,
        apiUrl: apiUrl
    });

    isInitialized = true;
    phoneNumberInput.disabled = false;
    startCallButton.disabled = false;
    disconnectButton.disabled = false;
    connectButton.disabled = true;
    endCallButton.disabled = false;
});
