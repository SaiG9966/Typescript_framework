Feature: Hello World

  Scenario: Display Hello World
    Given I have a Cucumber setup
    When I run the test
    Then I should see "Hello World" in the output