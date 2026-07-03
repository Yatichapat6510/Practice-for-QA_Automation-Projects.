*** Settings ***
Library     SeleniumLibrary

*** Variables ***
${URL}             https://stmdev.bizmateapp.com/POCS/Home/ConfirmLogin?code=913169
${employee_code}   913169

*** Test Cases ***
Search Employee Code in POCS Home
    Open Browser    ${URL}    chrome
    Maximize Browser Window
    Wait Until Page Contains    POCS    30s
    Input Text    name=q    ${employee_code}
    Press Keys    name=q    ENTER
    Wait Until Page Contains    ${employee_code}    30s
    Sleep    5s
    [Teardown]    Close Browser