// DOM Elements
const contactForm = document.getElementById('contactForm');
const messageTextarea = document.querySelector('textarea[name="message"]');
const messageCount = document.getElementById('messageCount');
const submitButton = document.getElementById('submitButton');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const copyTextElements = document.querySelectorAll('.copy-text');

// State
let formData = {
  fullName: '',
  email: '',
  phone: '',
  message: ''
};
let messageLength = 0;

// Event Listeners
contactForm.addEventListener('submit', handleSubmit);
messageTextarea.addEventListener('input', updateMessageCount);

// Add copy to clipboard functionality
copyTextElements.forEach(element => {
  element.addEventListener('click', () => {
    const text = element.querySelector('p').textContent.trim();
    copyToClipboard(text);
  });
});

// Functions
function updateMessageCount() {
  messageLength = messageTextarea.value.length;
  messageCount.textContent = `${messageLength}/500 characters`;
}

function handleSubmit(e) {
  e.preventDefault();
  
  // Get form data
  const formElements = contactForm.elements;
  formData = {
    fullName: formElements.fullName.value,
    email: formElements.email.value,
    phone: formElements.phone.value,
    message: formElements.message.value
  };
  
  // Show loading state
  submitButton.disabled = true;
  submitButton.innerHTML = '<span><i class="fas fa-spinner fa-spin mr-2"></i>Sending...</span>';
  
  // Simulate form submission
  setTimeout(() => {
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
    
    // Simulate success (in a real application, check the response)
    successMessage.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    
    // Reset form
    contactForm.reset();
    messageLength = 0;
    messageCount.textContent = '0/500 characters';
    
    // Hide success message after some time
    setTimeout(() => {
      successMessage.classList.add('hidden');
    }, 5000);
  }, 1000);
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    // You could show a small tooltip notification here
    console.log('Copied to clipboard: ' + text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
}

// Initialize the UI
updateMessageCount();