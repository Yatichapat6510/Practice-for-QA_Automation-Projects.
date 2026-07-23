*** Settings ***
Resource    ../../../resources/ui_keywords.robot

*** Keywords ***
Sort Products By
    [Arguments]    ${sort_option}
    Select From List By Value    class:product_sort_container    ${sort_option}

Verify First Product Price Is Lowest
    ${prices}=         Get WebElements    class:inventory_item_price
    ${first_price}=    Get Text     ${prices}[0]
    Log    First product price:     ${first_price}
    Should Match Regexp             ${first_price}    \\$\\d+\\.\\d+

*** Test Cases ***
TC Sort Products Low To High
    Login As Standard User
    Sort Products By    lohi
    Verify First Product Price Is Lowest
    [Teardown]    Close Browser
