*** Settings ***
Library     SeleniumLibrary
Library     WebDriverManager

*** Variables ***
${URL_facebook}         https://www.facebook.com/?locale=th_TH
${input_username}       //*[@id="email"]
${input_password}       //*[@id="pass"]
${btn_login}            //*[@name="login"]
${txt_massage}          //div//textarea[@name="xhpc_message"]
${username_fail}        Chanuntda@hotmail.com
${password_fail}        chanuntdakanta.134466510
${username_success}     Chanuntda@hotmail.com
${password_success}     chanuntdakanta.134466510

*** Keywords ***
Open Chrome Browser
    [Arguments]    ${url}
    ${service}=    Evaluate    __import__('selenium.webdriver.chrome.service', fromlist=['Service']).Service(__import__('webdriver_manager.chrome', fromlist=['ChromeDriverManager']).ChromeDriverManager().install())
    Create Webdriver    Chrome    service=${service}
    Go To    ${url}
    Maximize Browser Window

Input Username and Password
    [Arguments]    ${Xpath_user}    ${Xpath_pass}    ${username}    ${password}
    Wait Until Element Is Visible    ${Xpath_user}    15s
    Wait Until Element Is Visible    ${Xpath_pass}    15s
    Input Text    ${Xpath_user}    ${username}
    Input Text    ${Xpath_pass}    ${password}

Click Login Button
    [Arguments]    ${Xpath_btn}
    Wait Until Element Is Visible    ${Xpath_btn}    15s
    Click Element    ${Xpath_btn}

Verify Login Success
    [Arguments]    ${Xpath_txt}
    Wait Until Element Is Visible    ${Xpath_txt}    20s

*** Test Cases ***
Login Facebook - Fail
    [Tags]    Fail
    Open Chrome Browser    ${URL_facebook}
    Input Username and Password    ${input_username}    ${input_password}    ${username_fail}    ${password_fail}
    Click Login Button    ${btn_login}
    Sleep    10s
    [Teardown]    Close Browser

Login Facebook - Success
    [Tags]    Success
    Open Chrome Browser    ${URL_facebook}
    Input Username and Password    ${input_username}    ${input_password}    ${username_success}    ${password_success}
    Click Login Button    ${btn_login}
    Sleep    10s
    Verify Login Success    ${txt_massage}
    [Teardown]    Close Browser