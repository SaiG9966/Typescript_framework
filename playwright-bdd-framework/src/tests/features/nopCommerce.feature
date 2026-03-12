@fillCustomerDetails

Feature: fillCustomerDetails Registration Form

  As a user
  I want to fill the registration form
  So that I can submit my details successfully

  Scenario: FillCustomerDetails Registration Form

    Given user opens the login dashboard

    When user click on username tab
    And user click on password tab
    And click on login

    Then user click on customersTab
    Then user click on customersinCustomersTab
    And click in addNew Button

        When user enters customer email "admin@yourstore.com"
        And user enters customer password "admin"
        And user enters firstName "Test"
        And user enters lastName "Dummy"
        And user selects customer gender "Male"
        When user enters companyName "DummyCompany"
        Then user click on taxExempt 
        And user selects "guests" in customerRoles
        And user enters managerofVendor "Vendor1"
        And user enters adminComment "its_Working"
        
    And user should click on Save Button