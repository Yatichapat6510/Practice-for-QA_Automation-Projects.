*** Settings ***

Library            SeleniumLibrary
Suite Teardown     Close All Browsers


*** Variables ***

${URL}            http://www.saucedemo.com
${BROWSER}        chrome
${USERNAME}       standard_user
${PASSWORD}       secret_sauce


*** Test Cases ***

TC001 Valid Login Should Succeed

    [Tags]    smoke    login
    Open Browser        ${URL}        ${BROWSER}
    Input Text             id:user-name  ${USERNAME}
    Input Password         id:password   ${PASSWORD}
    Click Button           id:login-button
    Page Should Contain    Products
    [Teardown]    Close Browser


TC002 Invalid Login Should Show Error
    [Tags]    regression    login
    Open Browser           ${URL}           ${BROWSER}
    Input Text             id:user-name  wrong_user
    Input Password         id:password   wrong_pass
    Click Button            id:login-button
    Element Should Be Visible    class:error-message-container
    [Teardown]    Close Browser