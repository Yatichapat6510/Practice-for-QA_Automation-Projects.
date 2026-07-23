*** Settings ***
Documentation    ตรวจสอบว่าราคารวมในหน้า Checkout Overview ตรงกับราคาสินค้าที่เลือกจริง
Resource         ../../../resources/ui_keywords.robot
Resource         ../../../resources/price_keywords.robot


*** Test Cases ***
TC Verify Total Price For Multiple Products
    [Documentation]    Login → เพิ่มสินค้า 3 ชิ้น → checkout ถึง overview → verify ราคารวม
    Login As Standard User

    Add Product To Cart By Name    Sauce Labs Backpack
    Add Product To Cart By Name    Sauce Labs Bike Light
    Add Product To Cart By Name    Sauce Labs Bolt T-Shirt

    Go To Cart
    Proceed To Checkout
    Fill Checkout Information    Newyear    Tester    10250

    Verify Total Price Is Correct
    ...    Sauce Labs Backpack    Sauce Labs Bike Light    Sauce Labs Bolt T-Shirt

    [Teardown]    Close Browser

TC Verify Total Price For Single Product
    [Documentation]    เคสง่ายสุด — สินค้าชิ้นเดียว เพื่อ isolate บั๊กได้ง่ายถ้า fail
    Login As Standard User

    Add Product To Cart By Name    Sauce Labs Backpack

    Go To Cart
    Proceed To Checkout
    Fill Checkout Information    Newyear    Tester    10250

    Verify Total Price Is Correct    Sauce Labs Backpack

    [Teardown]    Close Browser