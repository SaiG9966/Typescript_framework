@registration
Feature: User Registration Form

  As a user
  I want to fill the registration form
  So that I can submit my details successfully

  Scenario: Fill Complete Registration Form

    Given user opens the registration form

    When user enters first name "Saiteja"
    And user enters last name "Goud"

    And user selects gender "Male"

    And user selects languages
      | English |
      | Hindi   |

    And user enters email "Saiteja.test@gmail.com"

    And user enters password "Test@123"

    Then all user details should be filled successfully

    And user should click on Register Button