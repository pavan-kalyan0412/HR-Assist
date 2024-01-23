
// document.querySelector('form').addEventListener('submit', function(event) {
//   event.preventDefault();

//   var firstNameInput = document.getElementById('first-name');
//   var lastNameInput = document.getElementById('last-name');
//   var skillsInput = document.getElementById('skills');
//   var emailInput = document.getElementById('email');
//   var passwordInput = document.getElementById('password');
//   var confirmPasswordInput = document.getElementById('confirm-password');
//   var organizationInput = document.getElementById('organization');
//   var firstNameError = document.getElementById('first-name-error');
//   var lastNameError = document.getElementById('last-name-error');
//   var skillsError = document.getElementById('skills-error');
//   var passwordError = document.getElementById('password-error');
//   var confirmPasswordError = document.getElementById('confirm-password-error');
//   var organizationError = document.getElementById('organization-error');
//   var emailError = document.getElementById('email-error');
//   var mobileNumberInput = document.getElementById('mobile-number');
//   var mobileNumberError = document.getElementById('mobile-number-error');

//   firstNameError.textContent = '';
//   lastNameError.textContent = '';
//   skillsError.textContent = '';
//   passwordError.textContent = '';
//   confirmPasswordError.textContent = '';
//   organizationError.textContent = '';
//   emailError.textContent = '';
//   mobileNumberError.textContent = '';

//   if (firstNameInput.value.trim() === '') {
//     firstNameError.textContent = 'First name cannot be left blank.';
//   } else if (firstNameInput.value.length < 3 || firstNameInput.value.length > 12) {
//     firstNameError.textContent = 'First name must be between 3 and 12 characters.';
//   } else if (/\s/.test(firstNameInput.value)) {
//     firstNameError.textContent = 'First name cannot contain spaces.';
//   } else if (/[^a-zA-Z]/.test(firstNameInput.value)) {
//     firstNameError.textContent = 'First name cannot contain special characters.';
//   }

//   if (lastNameInput.value.trim() === '') {
//     lastNameError.textContent = 'Last name cannot be left blank.';
//   } else if (lastNameInput.value.length < 2 || lastNameInput.value.length > 12) {
//     lastNameError.textContent = 'Last name must be between 2 and 12 characters.';
//   } else if (/\s/.test(lastNameInput.value)) {
//     lastNameError.textContent = 'Last name cannot contain spaces.';
//   } else if (/[^a-zA-Z]/.test(lastNameInput.value)) {
//     lastNameError.textContent = 'Last name cannot contain special characters.';
//   }

//   if (passwordInput.value.length < 6 || passwordInput.value.length > 12) {
//     passwordError.textContent = 'Password must be between 6 and 12 characters.';
//   } else if (/\s/.test(passwordInput.value)) {
//     passwordError.textContent = 'Password cannot contain spaces.';
//   }

//   if (confirmPasswordInput.value !== passwordInput.value) {
//     confirmPasswordError.textContent = 'Passwords do not match.';
//   }

//   if (skillsInput.value.trim() === '') {
//     skillsError.textContent = 'Skills cannot be left blank.';
//   } else if (skillsInput.value.length < 2 || skillsInput.value.length > 60) {
//     skillsError.textContent = 'Skills must be between 2 and 60 characters.';
//   }

//   if (organizationInput.value.trim() === '') {
//     organizationError.textContent = 'Organization cannot be left blank.';
//   } else if (organizationInput.value.length < 2 || organizationInput.value.length > 20) {
//     organizationError.textContent = 'Organization must be between 2 and 20 characters.';
//   }

//   var emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//   var emailInputValue = emailInput.value.trim().toLowerCase(); // Convert email to lowercase
//   if (emailInputValue === '') {
//     emailError.textContent = 'Email cannot be left blank.';
//   } else if (emailInputValue.length < 12 || emailInputValue.length > 40) {
//     emailError.textContent = 'Email must be between 12 and 40 characters.';
//   } else if (!emailPattern.test(emailInputValue)) {
//     emailError.textContent = 'Note: Invalid email format.';
//   } else {
//     emailError.textContent = '';
//   }

//   if (mobileNumberInput.value.trim() === '') {
//     mobileNumberError.textContent = 'Mobile number cannot be left blank.';
//   } else if (!validateMobileNumber(mobileNumberInput.value.trim())) {
//     mobileNumberError.textContent = 'Note: Invalid mobile number format.';
//   }

//   if (
//     !firstNameError.textContent &&
//     !lastNameError.textContent &&
//     !passwordError.textContent &&
//     !confirmPasswordError.textContent &&
//     !skillsError.textContent &&
//     !organizationError.textContent &&
//     !emailError.textContent &&
//     !mobileNumberError.textContent
//   ) {
//     emailInput.value = emailInputValue;
//     event.target.submit();
//   }
// });

// document.getElementById('first-name').addEventListener('input', function() {
//   var firstNameError = document.getElementById('first-name-error');

//   if (this.value.trim() === '') {
//     firstNameError.textContent = 'Note: First name cannot be left blank.';
//   } else if (this.value.length < 3 || this.value.length > 12) {
//     firstNameError.textContent = 'Note: First name must be between 3 and 12 characters.';
//   } else if (/\s/.test(this.value)) {
//     firstNameError.textContent = 'Note: First name cannot contain spaces.';
//   } else if (/[^a-zA-Z]/.test(this.value)) {
//     firstNameError.textContent = 'Note: First name cannot contain special characters.';
//   } else {
//     firstNameError.textContent = '';
//   }
// });

// document.getElementById('last-name').addEventListener('input', function() {
//   var lastNameError = document.getElementById('last-name-error');

//   if (this.value.trim() === '') {
//     lastNameError.textContent = 'Note: Last name cannot be left blank.';
//   } else if (this.value.length < 2 || this.value.length > 12) {
//     lastNameError.textContent = 'Note: Last name must be between 2 and 12 characters.';
//   } else if (/\s/.test(this.value)) {
//     lastNameError.textContent = 'Note: Last name cannot contain spaces.';
//   } else if (/[^a-zA-Z]/.test(this.value)) {
//     lastNameError.textContent = 'Note: Last name cannot contain special characters.';
//   } else {
//     lastNameError.textContent = '';
//   }
// });

// document.getElementById('skills').addEventListener('input', function() {
//   var skillsError = document.getElementById('skills-error');

//   if (this.value.trim() === '') {
//     skillsError.textContent = 'Note: Skills cannot be left blank.';
//   } else if (this.value.length < 2 || this.value.length > 60) {
//     skillsError.textContent = 'Note: Skills must be between 2 and 60 characters.';
//   } else {
//     skillsError.textContent = '';
//   }
// });

// document.getElementById('password').addEventListener('input', function() {
//   var passwordError = document.getElementById('password-error');

//   if (this.value.trim() === '') {
//     passwordError.textContent = 'Note: Password cannot be left blank.';
//   } else if (this.value.length < 6 || this.value.length > 12) {
//     passwordError.textContent = 'Note: Password must be between 6 and 12 characters.';
//   } else if (/\s/.test(this.value)) {
//     passwordError.textContent = 'Note: Password cannot contain spaces.';
//   } else {
//     passwordError.textContent = '';
//   }
// });

// document.getElementById('confirm-password').addEventListener('input', function() {
//   var confirmPasswordError = document.getElementById('confirm-password-error');

//   if (this.value !== document.getElementById('password').value) {
//     confirmPasswordError.textContent = 'Note: Passwords do not match.';
//   } else {
//     confirmPasswordError.textContent = '';
//   }
// });

// document.getElementById('organization').addEventListener('input', function() {
//   var organizationError = document.getElementById('organization-error');

//   if (this.value.trim() === '') {
//     organizationError.textContent = 'Note: Organization cannot be left blank.';
//   } else if (this.value.length < 2 || this.value.length > 20) {
//     organizationError.textContent = 'Note: Organization must be between 2 and 20 characters.';
//   } else {
//     organizationError.textContent = '';
//   }
// });

// document.getElementById('email').addEventListener('input', function() {
//   var emailError = document.getElementById('email-error');
//   var emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//   var emailInputValue = emailInput.value.trim().toLowerCase(); // Convert email to lowercase

//   if (emailInputValue === '') {
//   emailError.textContent = 'Email cannot be left blank.';
// } else if (emailInputValue.length < 12 || emailInputValue.length > 40) {
//   emailError.textContent = 'Email must be between 12 and 40 characters.';
// } else if (!emailPattern.test(emailInputValue)) {
//   emailError.textContent = 'Note: Invalid email format.';
// } else {
//   emailError.textContent = ''; // Clear any previous error message
// }
// });


// document.getElementById('mobile-number').addEventListener('input', function() {
//   var mobileNumberError = document.getElementById('mobile-number-error');

//   if (mobileNumberInput.value.trim() === '') {
//     mobileNumberError.textContent = 'Mobile number cannot be left blank.';
//   } else if (!validateMobileNumber(mobileNumberInput.value.trim())) {
//     mobileNumberError.textContent = 'Note: Invalid mobile number format.';
//   } else {
//       mobileNumberError.textContent='';
//     }
//   }
// );



// document.getElementById('submit-button').addEventListener('click', function(event) {
//   var firstNameInput = document.getElementById('first-name');
//   var firstNameError = document.getElementById('first-name-error');
//   var lastNameInput = document.getElementById('last-name');
//   var lastNameError = document.getElementById('last-name-error');
//   var emailInput = document.getElementById('email');
//   var emailError = document.getElementById('email-error');
//   var passwordInput = document.getElementById('password');
//   var passwordError = document.getElementById('password-error');
//   var confirmPasswordInput = document.getElementById('confirm-password');
//   var confirmPasswordError = document.getElementById('confirm-password-error');
//   var skillsInput = document.getElementById('skills');
//   var skillsError = document.getElementById('skills-error');
//   var organizationInput = document.getElementById('organization');
//   var organizationError = document.getElementById('organization-error');
//   var mobileNumberInput = document.getElementById('mobile-number');
//   var mobileNumberError = document.getElementById('mobile-number-error');

//   if (firstNameInput.value.trim() === '' || firstNameError.textContent !== '') {
//     event.preventDefault();
//     firstNameInput.focus();
//   } else if (lastNameInput.value.trim() === '' || lastNameError.textContent !== '') {
//     event.preventDefault();
//     lastNameInput.focus();
//   } else if (!validateEmail(emailInput.value.trim())) {
//     emailError.textContent = 'Note: Invalid email address.';
//     event.preventDefault();
//     emailInput.focus();
//   } else if (!validateEmail(emailInput.value.trim())) {
//     emailError.textContent = 'Note: Invalid email address.';
//     event.preventDefault();
//     emailInput.focus();
//   } else if (passwordInput.value.trim() === '') {
//     passwordError.textContent = 'This field is required.';
//     event.preventDefault();
//     passwordInput.focus();
//   } else if (/\s/.test(passwordInput.value)) {
//     passwordError.textContent = 'Note: Password cannot contain spaces.';
//     event.preventDefault();
//     passwordInput.focus();
//   } else if(confirmPasswordInput.value !== passwordInput.value) {
//     confirmPasswordError.textContent = 'Passwords do not match.';
//     event.preventDefault();
//     confirmPasswordInput.focus(); // Set focus back to Confirm Password field
//   } else if (mobileNumberInput.value.trim() === '') {
//     mobileNumberError.textContent = 'Mobile number cannot be left blank.';
//   } else if (!validateMobileNumber(mobileNumberInput.value.trim())) {
//     mobileNumberError.textContent = 'Note: Invalid mobile number format.';
//     event.preventDefault();
//     organizationError.focus();
//   } else {
//     emailError.textContent = ''; // Clear any previous error message
//     passwordError.textContent = ''; // Clear any previous error message

//     var form = document.querySelector('form');
//     var inputs = form.querySelectorAll('input');

//     var isFormValid = true;

//   for (var i = 0; i < inputs.length; i++) {
//     var input = inputs[i];
//     var error = document.getElementById(input.id + '-error');

//     if (input.value.trim() === '') {
//       error.textContent = 'This field is required.';
//       isFormValid = false;
//       input.focus();
//     } else {
//       error.textContent = '';
//     }
//   }
//   if (!isFormValid) {
//     event.preventDefault();
//   }
// }
// });


// function validateEmail(email) {
//   var regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//   return regex.test(email);
// }

// function validateMobileNumber(mobileNumber) {
//   var regex = /^[0-9]{10}$/;
//   return regex.test(mobileNumber);
// }


// document.addEventListener('DOMContentLoaded', function() {
//   var form = document.querySelector('form');
//   var firstNameInput = document.getElementById('first-name');
//   var lastNameInput = document.getElementById('last-name');
//   var emailInput = document.getElementById('email');
//   var passwordInput = document.getElementById('password');
//   var confirmPasswordInput = document.getElementById('confirm-password');

//   localStorage.removeItem('formData'); //clea form data from localstorage on page re-loads.

//   // // Restore form data from localStorage
//   // var formData = JSON.parse(localStorage.getItem('formData')) || {};
//   // firstNameInput.value = formData.firstName || '';
//   // lastNameInput.value = formData.lastName || '';
//   // emailInput.value = formData.email || '';
//   // passwordInput.value = formData.password || '';
//   // confirmPasswordInput.value = formData.confirmPassword || '';

//   form.addEventListener('submit', function() {
//     // Clear form data from localStorage
//     localStorage.removeItem('formData');
//   });

//   // Store form data in localStorage on input change
//   firstNameInput.addEventListener('input', saveFormData);
//   lastNameInput.addEventListener('input', saveFormData);
//   emailInput.addEventListener('input', saveFormData);
//   passwordInput.addEventListener('input', saveFormData);
//   confirmPasswordInput.addEventListener('input', saveFormData);

//   function saveFormData() {
//     var formData = {
//       firstName: firstNameInput.value,
//       lastName: lastNameInput.value,
//       email: emailInput.value,
//       password: passwordInput.value,
//       confirmPassword: confirmPasswordInput.value
//     };
//     localStorage.setItem('formData', JSON.stringify(formData));
//   }

//   // Set focus on the first name input field
//   firstNameInput.focus();
// =======
// document.querySelector('form').addEventListener('submit', function(event) {
//   event.preventDefault();

//   var firstNameInput = document.getElementById('first-name');
//   var lastNameInput = document.getElementById('last-name');
//   var skillsInput = document.getElementById('skills');
//   var emailInput = document.getElementById('email');
//   var passwordInput = document.getElementById('password');
//   var confirmPasswordInput = document.getElementById('confirm-password');
//   var organizationInput = document.getElementById('organization');
//   var firstNameError = document.getElementById('first-name-error');
//   var lastNameError = document.getElementById('last-name-error');
//   var skillsError = document.getElementById('skills-error');
//   var passwordError = document.getElementById('password-error');
//   var confirmPasswordError = document.getElementById('confirm-password-error');
//   var organizationError = document.getElementById('organization-error');
//   var emailError = document.getElementById('email-error');
//   var mobileNumberInput = document.getElementById('mobile-number');
//   var mobileNumberError = document.getElementById('mobile-number-error');

//   firstNameError.textContent = '';
//   lastNameError.textContent = '';
//   skillsError.textContent = '';
//   passwordError.textContent = '';
//   confirmPasswordError.textContent = '';
//   organizationError.textContent = '';
//   emailError.textContent = '';
//   mobileNumberError.textContent = '';

//   if (firstNameInput.value.trim() === '') {
//     firstNameError.textContent = 'First name cannot be left blank.';
//   } else if (firstNameInput.value.length < 3 || firstNameInput.value.length > 12) {
//     firstNameError.textContent = 'First name must be between 3 and 12 characters.';
//   } else if (/\s/.test(firstNameInput.value)) {
//     firstNameError.textContent = 'First name cannot contain spaces.';
//   } else if (/[^a-zA-Z]/.test(firstNameInput.value)) {
//     firstNameError.textContent = 'First name cannot contain special characters.';
//   }

//   if (lastNameInput.value.trim() === '') {
//     lastNameError.textContent = 'Last name cannot be left blank.';
//   } else if (lastNameInput.value.length < 2 || lastNameInput.value.length > 12) {
//     lastNameError.textContent = 'Last name must be between 2 and 12 characters.';
//   } else if (/\s/.test(lastNameInput.value)) {
//     lastNameError.textContent = 'Last name cannot contain spaces.';
//   } else if (/[^a-zA-Z]/.test(lastNameInput.value)) {
//     lastNameError.textContent = 'Last name cannot contain special characters.';
//   }

//   if (passwordInput.value.length < 6 || passwordInput.value.length > 12) {
//     passwordError.textContent = 'Password must be between 6 and 12 characters.';
//   } else if (/\s/.test(passwordInput.value)) {
//     passwordError.textContent = 'Password cannot contain spaces.';
//   }

//   if (confirmPasswordInput.value !== passwordInput.value) {
//     confirmPasswordError.textContent = 'Passwords do not match.';
//   }

//   if (skillsInput.value.trim() === '') {
//     skillsError.textContent = 'Skills cannot be left blank.';
//   } else if (skillsInput.value.length < 2 || skillsInput.value.length > 60) {
//     skillsError.textContent = 'Skills must be between 2 and 60 characters.';
//   }

//   if (organizationInput.value.trim() === '') {
//     organizationError.textContent = 'Organization cannot be left blank.';
//   } else if (organizationInput.value.length < 2 || organizationInput.value.length > 20) {
//     organizationError.textContent = 'Organization must be between 2 and 20 characters.';
//   }

//   var emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//   var emailInputValue = emailInput.value.trim().toLowerCase(); // Convert email to lowercase
//   if (emailInputValue === '') {
//     emailError.textContent = 'Email cannot be left blank.';
//   } else if (emailInputValue.length < 12 || emailInputValue.length > 40) {
//     emailError.textContent = 'Email must be between 12 and 40 characters.';
//   } else if (!emailPattern.test(emailInputValue)) {
//     emailError.textContent = 'Note: Invalid email format.';
//   } else {
//     emailError.textContent = '';
//   }

//   if (mobileNumberInput.value.trim() === '') {
//     mobileNumberError.textContent = 'Mobile number cannot be left blank.';
//   } else if (!validateMobileNumber(mobileNumberInput.value.trim())) {
//     mobileNumberError.textContent = 'Note: Invalid mobile number format.';
//   }

//   if (
//     !firstNameError.textContent &&
//     !lastNameError.textContent &&
//     !passwordError.textContent &&
//     !confirmPasswordError.textContent &&
//     !skillsError.textContent &&
//     !organizationError.textContent &&
//     !emailError.textContent &&
//     !mobileNumberError.textContent
//   ) {
//     emailInput.value = emailInputValue;
//     event.target.submit();
//   }
// });

// document.getElementById('first-name').addEventListener('input', function() {
//   var firstNameError = document.getElementById('first-name-error');

//   if (this.value.trim() === '') {
//     firstNameError.textContent = 'Note: First name cannot be left blank.';
//   } else if (this.value.length < 3 || this.value.length > 12) {
//     firstNameError.textContent = 'Note: First name must be between 3 and 12 characters.';
//   } else if (/\s/.test(this.value)) {
//     firstNameError.textContent = 'Note: First name cannot contain spaces.';
//   } else if (/[^a-zA-Z]/.test(this.value)) {
//     firstNameError.textContent = 'Note: First name cannot contain special characters.';
//   } else {
//     firstNameError.textContent = '';
//   }
// });

// document.getElementById('last-name').addEventListener('input', function() {
//   var lastNameError = document.getElementById('last-name-error');

//   if (this.value.trim() === '') {
//     lastNameError.textContent = 'Note: Last name cannot be left blank.';
//   } else if (this.value.length < 2 || this.value.length > 12) {
//     lastNameError.textContent = 'Note: Last name must be between 2 and 12 characters.';
//   } else if (/\s/.test(this.value)) {
//     lastNameError.textContent = 'Note: Last name cannot contain spaces.';
//   } else if (/[^a-zA-Z]/.test(this.value)) {
//     lastNameError.textContent = 'Note: Last name cannot contain special characters.';
//   } else {
//     lastNameError.textContent = '';
//   }
// });

// document.getElementById('skills').addEventListener('input', function() {
//   var skillsError = document.getElementById('skills-error');

//   if (this.value.trim() === '') {
//     skillsError.textContent = 'Note: Skills cannot be left blank.';
//   } else if (this.value.length < 2 || this.value.length > 60) {
//     skillsError.textContent = 'Note: Skills must be between 2 and 60 characters.';
//   } else {
//     skillsError.textContent = '';
//   }
// });

// document.getElementById('password').addEventListener('input', function() {
//   var passwordError = document.getElementById('password-error');

//   if (this.value.trim() === '') {
//     passwordError.textContent = 'Note: Password cannot be left blank.';
//   } else if (this.value.length < 6 || this.value.length > 12) {
//     passwordError.textContent = 'Note: Password must be between 6 and 12 characters.';
//   } else if (/\s/.test(this.value)) {
//     passwordError.textContent = 'Note: Password cannot contain spaces.';
//   } else {
//     passwordError.textContent = '';
//   }
// });

// document.getElementById('confirm-password').addEventListener('input', function() {
//   var confirmPasswordError = document.getElementById('confirm-password-error');

//   if (this.value !== document.getElementById('password').value) {
//     confirmPasswordError.textContent = 'Note: Passwords do not match.';
//   } else {
//     confirmPasswordError.textContent = '';
//   }
// });

// document.getElementById('organization').addEventListener('input', function() {
//   var organizationError = document.getElementById('organization-error');

//   if (this.value.trim() === '') {
//     organizationError.textContent = 'Note: Organization cannot be left blank.';
//   } else if (this.value.length < 2 || this.value.length > 20) {
//     organizationError.textContent = 'Note: Organization must be between 2 and 20 characters.';
//   } else {
//     organizationError.textContent = '';
//   }
// });

// document.getElementById('email').addEventListener('input', function() {
//   var emailError = document.getElementById('email-error');
//   var emailPattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//   var emailInputValue = emailInput.value.trim().toLowerCase(); // Convert email to lowercase

//   if (emailInputValue === '') {
//   emailError.textContent = 'Email cannot be left blank.';
// } else if (emailInputValue.length < 12 || emailInputValue.length > 40) {
//   emailError.textContent = 'Email must be between 12 and 40 characters.';
// } else if (!emailPattern.test(emailInputValue)) {
//   emailError.textContent = 'Note: Invalid email format.';
// } else {
//   emailError.textContent = ''; // Clear any previous error message
// }
// });


// document.getElementById('mobile-number').addEventListener('input', function() {
//   var mobileNumberError = document.getElementById('mobile-number-error');

//   if (mobileNumberInput.value.trim() === '') {
//     mobileNumberError.textContent = 'Mobile number cannot be left blank.';
//   } else if (!validateMobileNumber(mobileNumberInput.value.trim())) {
//     mobileNumberError.textContent = 'Note: Invalid mobile number format.';
//   } else {
//       mobileNumberError.textContent='';
//     }
//   }
// );



// document.getElementById('submit-button').addEventListener('click', function(event) {
//   var firstNameInput = document.getElementById('first-name');
//   var firstNameError = document.getElementById('first-name-error');
//   var lastNameInput = document.getElementById('last-name');
//   var lastNameError = document.getElementById('last-name-error');
//   var emailInput = document.getElementById('email');
//   var emailError = document.getElementById('email-error');
//   var passwordInput = document.getElementById('password');
//   var passwordError = document.getElementById('password-error');
//   var confirmPasswordInput = document.getElementById('confirm-password');
//   var confirmPasswordError = document.getElementById('confirm-password-error');
//   var skillsInput = document.getElementById('skills');
//   var skillsError = document.getElementById('skills-error');
//   var organizationInput = document.getElementById('organization');
//   var organizationError = document.getElementById('organization-error');
//   var mobileNumberInput = document.getElementById('mobile-number');
//   var mobileNumberError = document.getElementById('mobile-number-error');

//   if (firstNameInput.value.trim() === '' || firstNameError.textContent !== '') {
//     event.preventDefault();
//     firstNameInput.focus();
//   } else if (lastNameInput.value.trim() === '' || lastNameError.textContent !== '') {
//     event.preventDefault();
//     lastNameInput.focus();
//   } else if (!validateEmail(emailInput.value.trim())) {
//     emailError.textContent = 'Note: Invalid email address.';
//     event.preventDefault();
//     emailInput.focus();
//   } else if (!validateEmail(emailInput.value.trim())) {
//     emailError.textContent = 'Note: Invalid email address.';
//     event.preventDefault();
//     emailInput.focus();
//   } else if (passwordInput.value.trim() === '') {
//     passwordError.textContent = 'This field is required.';
//     event.preventDefault();
//     passwordInput.focus();
//   } else if (/\s/.test(passwordInput.value)) {
//     passwordError.textContent = 'Note: Password cannot contain spaces.';
//     event.preventDefault();
//     passwordInput.focus();
//   } else if(confirmPasswordInput.value !== passwordInput.value) {
//     confirmPasswordError.textContent = 'Passwords do not match.';
//     event.preventDefault();
//     confirmPasswordInput.focus(); // Set focus back to Confirm Password field
//   } else if (mobileNumberInput.value.trim() === '') {
//     mobileNumberError.textContent = 'Mobile number cannot be left blank.';
//   } else if (!validateMobileNumber(mobileNumberInput.value.trim())) {
//     mobileNumberError.textContent = 'Note: Invalid mobile number format.';
//     event.preventDefault();
//     organizationError.focus();
//   } else {
//     emailError.textContent = ''; // Clear any previous error message
//     passwordError.textContent = ''; // Clear any previous error message

//     var form = document.querySelector('form');
//     var inputs = form.querySelectorAll('input');

//     var isFormValid = true;

//   for (var i = 0; i < inputs.length; i++) {
//     var input = inputs[i];
//     var error = document.getElementById(input.id + '-error');

//     if (input.value.trim() === '') {
//       error.textContent = 'This field is required.';
//       isFormValid = false;
//       input.focus();
//     } else {
//       error.textContent = '';
//     }
//   }
//   if (!isFormValid) {
//     event.preventDefault();
//   }
// }
// });


// function validateEmail(email) {
//   var regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//   return regex.test(email);
// }

// function validateMobileNumber(mobileNumber) {
//   var regex = /^[0-9]{10}$/;
//   return regex.test(mobileNumber);
// }


// document.addEventListener('DOMContentLoaded', function() {
//   var form = document.querySelector('form');
//   var firstNameInput = document.getElementById('first-name');
//   var lastNameInput = document.getElementById('last-name');
//   var emailInput = document.getElementById('email');
//   var passwordInput = document.getElementById('password');
//   var confirmPasswordInput = document.getElementById('confirm-password');

//   localStorage.removeItem('formData'); //clea form data from localstorage on page re-loads.

//   // // Restore form data from localStorage
//   // var formData = JSON.parse(localStorage.getItem('formData')) || {};
//   // firstNameInput.value = formData.firstName || '';
//   // lastNameInput.value = formData.lastName || '';
//   // emailInput.value = formData.email || '';
//   // passwordInput.value = formData.password || '';
//   // confirmPasswordInput.value = formData.confirmPassword || '';

//   form.addEventListener('submit', function() {
//     // Clear form data from localStorage
//     localStorage.removeItem('formData');
//   });

//   // Store form data in localStorage on input change
//   firstNameInput.addEventListener('input', saveFormData);
//   lastNameInput.addEventListener('input', saveFormData);
//   emailInput.addEventListener('input', saveFormData);
//   passwordInput.addEventListener('input', saveFormData);
//   confirmPasswordInput.addEventListener('input', saveFormData);

//   function saveFormData() {
//     var formData = {
//       firstName: firstNameInput.value,
//       lastName: lastNameInput.value,
//       email: emailInput.value,
//       password: passwordInput.value,
//       confirmPassword: confirmPasswordInput.value
//     };
//     localStorage.setItem('formData', JSON.stringify(formData));
//   }

//   // Set focus on the first name input field
//   firstNameInput.focus();
// >>>>>>> bb331430285006e0ea562773fc31276d07ed994d
// });