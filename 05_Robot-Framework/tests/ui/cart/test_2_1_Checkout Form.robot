# หลัง add to cart แล้วไปหน้า Checkout — เขียน keywords เพื่อกรอก First Name, Last Name, Zip Code 
# แล้วกด Continue และ verify ว่าไปถึงหน้า Overview

*** Settings ***
Resource    ../../../resources/ui_keywords.robot

*** Keywords ***
Verify Checkout Overview Page
    Page Should Contain    Checkout: Overview
    Element Should Be Visible    id:finish

*** Test Cases ***
TC Complete Checkout Flow
    Login As Standard User
    Add Product To Cart By Name    Sauce Labs Backpack
    Click Element    class:shopping_cart_link
    Proceed To Checkout
    Fill Checkout Information    John    Doe    90210
    Verify Checkout Overview Page
    Click Button     id:finish
    Page Should Contain    Thank you for your order
    [Teardown]    Close Browser