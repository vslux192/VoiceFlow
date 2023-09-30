const startSpeechButton = document.getElementById('startSpeechButton');
const speechOutputDiv = document.getElementById('speechOutput');
const textInput = document.getElementById('textInput');
const convertTextButton = document.getElementById('convertTextButton');
const synth = window.speechSynthesis;

let recognizing = false;
let recognition = new webkitSpeechRecognition(); 

recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = () => {
    recognizing = true;
    startSpeechButton.textContent = 'Stop Recording';
};

recognition.onend = () => {
    recognizing = false;
    startSpeechButton.textContent = 'Start Recording';
};

recognition.onresult = (event) => {
    let interimTranscript = '';
    let finalTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
            finalTranscript += transcript;
        } else {
            interimTranscript += transcript;
        }
    }

    speechOutputDiv.textContent = finalTranscript + '\n' + interimTranscript;
};

startSpeechButton.addEventListener('click', () => {
    if (recognizing) {
        recognition.stop();
    } else {
        recognition.start();
    }
});

convertTextButton.addEventListener('click', () => {
    const textToConvert = textInput.value;
    if (textToConvert) {
        const utterance = new SpeechSynthesisUtterance(textToConvert);
        synth.speak(utterance);
    }
});
