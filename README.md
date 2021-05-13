# Esyms Interview

Please create a simple RESTFul API using Express.Js and Mongoose that can perform CRUD operations on a patient profile.

Example of a patient profile API response: https://s3-ap-southeast-1.amazonaws.com/cdn.esyms.com/nano.json

Code can be written either in Javascript or Typescript.

Important things to consider:
- Which fields can be changed by a patient? 
- Which fields to ignore and why? 
- How can we verify the request is coming from someone that should get access to the profile?
- Make small commits with good commit message.
- Unit/Integration tests to cover the basic CRUD operations
- Ensure that you have a gitignore file

[Extra] Helpful but not necessary
- Static code analysis/linters
- Deploy the server on Heroku
- Add github action to run the tests automatically
- Build an UI to enter/delete the patient profiles

#### When you are done, give me a shout on whatsapp and we can set up a code review/interview session.

# Project Summary 
## User Stories
* as a user can signup for new account using email and name.
* as a user can login using email and password
* as a user can logout.
* as a user can post new patient profile.
* as a user can delete patient profile.
* as a user can update new patient profile all fields or any fields.
* as a user can post view all my patients profiles or specific ones.


## Technology Used
* postman to test all APIs with exported collection file in docs.
* node js and express js as framework.
* mocha for unit testing.
* VS code.
* Github.



## Testing
* user should enter valid email.
* user should enter at least 6 digits password.
* user cant have two accounts with the same email.
* user cant have two patient profiles with the same email.
* user can update any field in the patient profile.
* user can only view their own patient profile.
* user need to login to modify or access their patients profiles.


