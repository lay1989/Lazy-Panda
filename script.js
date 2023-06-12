// Activate the modal when the page loads
window.addEventListener("DOMContentLoaded", function () {
  var myModal = new bootstrap.Modal(document.getElementById("welcomeModal"));
  myModal.show();
});
// Add your custom JavaScript code here

var questions = [
  {
    question: "I am lay's favorite food. What am I?",
    answer: "maggie"
  },
  {
    question: "I am an object that serves as a decorative and functional item in many households. People use me to display and preserve their cherished memories captured in still images. I am usually made of materials such as wood, metal, or plastic, and come in various shapes and sizes. What am I?",
    answer: "photo"
  },
  {
    question: "I am a personal and private repository of thoughts, experiences, and emotions. People often confide in me by writing down their daily activities, reflections, and innermost feelings. I hold the secrets and memories of those who trust me with their words. What am I?",
    answer: "diary"
  },
  {
    question: "I am a garment worn by both men and women that typically covers the body from the shoulders to the knees or ankles, often designed with various styles, colors, and fabrics. What am I?",
    answer: "dress"
  },
  {
    question: "I am a highly trained and qualified professional in the field of accounting and finance. I provide expert financial advice, perform audits, and help individuals and businesses manage their financial records, tax obligations, and overall financial health. I often work independently or as part of an accounting firm. What am I?",
    answer: "ca"
  },
  {
    question: "I am a place dedicated to promoting relaxation, wellness, and rejuvenation. People visit me to indulge in various therapeutic treatments such as massages, facials, body treatments, and more. I offer a serene and tranquil environment, often accompanied by soothing music, aromatic scents, and skilled professionals who cater to the well-being of my guests. What am I?",
    answer: "spa"
  },
  {
    question: "I am a form of artistic expression created using various mediums such as oils, acrylics, watercolors, or pastels. Artists use me to visually depict their ideas, emotions, or observations on a canvas or other surfaces. I can be found in museums, galleries, and homes, inviting viewers to interpret and appreciate the skill, creativity, and beauty within me. What am I?",
    answer: "painting"
  },
  {
    question: " I am a living organism that utilizes photosynthesis to convert sunlight into energy. I come in a wide variety of shapes, sizes, and colors, and can be found in ecosystems all around the world. Humans often cultivate me for food, medicine, and aesthetic purposes. What am I?",
    answer: "plant"
  }
];

// Get the form element
const scavengerHuntForm = document.querySelector('#scavenger-hunt form');
const scavengerHuntAlert = document.querySelector('#scavenger-hunt .card');


// Set initial question index
var questionIndex = 0;

// Display the current question
displayQuestion();

// Add event listener for form submission
scavengerHuntForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form submission

  // Get the user's answer
  const answerInput = scavengerHuntForm.querySelector('#answer');
  const userAnswer = answerInput.value.trim().toLowerCase();


  // Get the current question's answer
  var currentAnswer = questions[questionIndex].answer;

  // Validate the answer
  if (userAnswer === currentAnswer) {
    // Correct answer
    showAlert("Congratulations! You've answered correctly.", "success");

    // Move to the next question
    questionIndex++;

    // Check if there are more questions
    if (questionIndex < questions.length) {
      // Display the next question
      displayQuestion();
    } else {
      // All questions answered
      showAlert("You've answered all the questions!", "info");
    }
  } else {
    // Incorrect answer
    showAlert("Sorry, your answer is incorrect. Please try again.", "danger");
  }

  // Clear the answer input field
  answerInput.value = "";
});

// Function to display the current question
function displayQuestion() {
  // Get the question element
  var questionElement = document.getElementById('question');

  // Get the question number element
  var questionNumberElement = document.getElementById('question-number');

  // Set the question number
  questionNumberElement.textContent = "Question " + (questionIndex + 1) + ":";

  // Set the question text
  questionElement.textContent = questions[questionIndex].question;
}


// Function to show Bootstrap alert
function showAlert(message, alertType) {
  // Create the alert element
  var alertElement = document.createElement('div');
  alertElement.classList.add('alert', 'alert-' + alertType, 'alert-dismissible', 'fade', 'show');
  alertElement.role = 'alert';

  // Create the close button
  var closeButton = document.createElement('button');
  closeButton.classList.add('btn-close');
  closeButton.setAttribute('aria-label', 'Close');
  closeButton.addEventListener('click', function () {
    alertElement.remove();
  });

  // Create the icon element
  var iconElement = document.createElement('i');
  iconElement.classList.add('bi');

  // Set the icon based on the alert type
  if (alertType === 'success') {
    iconElement.classList.add('bi-check-circle-fill');
  } else if (alertType === 'danger') {
    iconElement.classList.add('bi-exclamation-circle-fill');
  } else {
    iconElement.classList.add('bi-info-circle-fill');
  }

  // Create the message element
  var messageElement = document.createElement('span');
  messageElement.textContent = message;

  // Append the elements to the alert element
  alertElement.appendChild(iconElement);
  alertElement.appendChild(messageElement);
  alertElement.appendChild(closeButton);


  // Insert the alert element before the form
  scavengerHuntAlert.parentNode.insertBefore(alertElement, scavengerHuntAlert);

  // Automatically close the alert after 3 seconds
  setTimeout(function () {
    alertElement.remove();
  }, 3000);
}

// Initialize the quote carousel
const quoteCarousel = new bootstrap.Carousel(document.getElementById('quote-carousel'), {
  interval: 5000 // Change slide every 3 seconds
});

// Generate a random quote
    async function generateRandomQuote() {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        return data.content;
      } catch (error) {
        console.log('Error:', error);
        return 'Failed to fetch quote';
      }
    }

    // Create a QR code with the initial quote
    var qrcode = new QRCode(document.getElementById("qrcode"), {
      text: '',
      width: 180,
      height: 180
    });

    // Function to update the quote and QR code with a new quote
    async function updateQuoteAndQRCode() {
      var newQuote = await generateRandomQuote();
      qrcode.clear();
      qrcode.makeCode(newQuote);
    }

    // Display the first quote when the website loads
    updateQuoteAndQRCode();

    // Update the quote and QR code periodically (every 60 seconds in this example)
    setInterval(updateQuoteAndQRCode, 60000);
