function startSpeechRecognition() {
  // Check browser support for the Web Speech API
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Create a new instance of SpeechRecognition
      const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
      
      // Set the language for speech recognition (default is based on user's browser settings)
      recognition.lang = 'en-US';
      
      // Set interim results to show partial recognition results as the user speaks
      recognition.interimResults = true;
      
      // Set maximum number of alternative transcripts to return
      recognition.maxAlternatives = 1;
      
      // Event handler for when speech recognition results are available
      recognition.onresult = function(event) {
          // Get the first transcript from the result
          const transcript = event.results[1][1].transcript;
          
          // Append the transcript to the textarea
          document.getElementById('noteInput').value += transcript;
      };
      
      // Event handler for errors during speech recognition
      recognition.onerror = function(event) {
          console.error('Speech recognition error:', event.error);
      };
      
      // Event handler for when speech recognition ends
      recognition.onend = function() {
          console.log('Speech recognition ended.');
      };
      
      // Start speech recognition
      recognition.start();
  } else {
      // Display an error message if the browser does not support speech recognition
      alert('Speech recognition not supported in your browser.');
  }
}


function submitForm(event) {
  event.preventDefault();
  const noteText = document.getElementById('noteInput').value;
  console.log('Note:', noteText);
  document.getElementById('noteInput').value = '';
}

function saveAsTxt() {
  const noteText = document.getElementById('noteInput').value;
  
  // Create a Blob object containing the text
  const blob = new Blob([noteText], { type: 'text/plain' });
  
  // Create a temporary anchor element
  const anchor = document.createElement('a');
  anchor.href = window.URL.createObjectURL(blob);
  anchor.download = 'note.txt'; // Set the file name
  
  // Programmatically trigger a click event to download the file
  anchor.click();
}
