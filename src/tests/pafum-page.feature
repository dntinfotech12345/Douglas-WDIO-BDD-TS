Feature: Verify the filter functionality in the Zusatzstoffe dropdown on the Parfum page

  @parfum
  Scenario Outline: "<TestId>" Apply and validate "<FilterOption>" in the Zusatzstoffe dropdown
    Given I am on the home page
    When I navigate to the "PARFUM" page by clicking the "PARFUM" tab
    Then I should be on the "PARFUM" page
    When I open the "<DropDown>" dropdown
    When I select the "<FilterOption>" filter option
    Then the "<FilterOption>" filter should be applied successfully

    Examples:
      | TestId | FilterOption | DropDown     |
      | TC001  | parabenfrei  | Zusatzstoffe |
      | TC002  | sulfatfrei   | Zusatzstoffe |
      | TC003  | vegan        | Zusatzstoffe |
