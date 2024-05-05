function speakText() {
  var text = document.getElementById('textToSpeech').value;
  var speech = new SpeechSynthesisUtterance();
  speech.text = text;
  window.speechSynthesis.speak(speech);
}
