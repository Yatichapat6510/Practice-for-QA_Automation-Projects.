*** Settings ***
Documentation    Keyword สำหรับคำนวณและตรวจสอบราคาสินค้าบน saucedemo
Library          SeleniumLibrary


*** Keywords ***
Get Product Price
    [Arguments]    ${product_name}
    [Documentation]    คืนค่าราคาของ product เป็น float (ตัด $ ออกแล้ว)
    ${price_text}=    Get Text    xpath://div[text()="${product_name}"]/ancestor::div[@class="inventory_item"]//div[@class="inventory_item_price"]
    ${price}=    Evaluate    float(${price_text}.replace('$', ''))
    Return From Keyword    ${price}

Calculate Expected Total Price
    [Arguments]    @{product_names}
    [Documentation]    รวมราคาของ product ทั้งหมดที่ระบุ คืนค่าเป็น float
    ${expected_total}=    Set Variable    0.0
    FOR    ${name}    IN    @{product_names}
        ${price}=    Get Product Price    ${name}
        ${expected_total}=    Evaluate    ${expected_total} + ${price}
    END
    Return From Keyword    ${expected_total}

Verify Total Price Is Correct
    [Arguments]    ${expected_total}
    [Documentation]    เทียบราคารวมที่คำนวณไว้ล่วงหน้า กับราคารวมจริงบนหน้า Checkout Overview
    ${actual_total_text}=    Get Text    xpath://div[@class='summary_subtotal_label']
    ${actual_total}=    Evaluate    float('${actual_total_text}'.replace('Item total: $', ''))
    Log    Expected: $${expected_total} | Actual: $${actual_total}
    Should Be Equal As Numbers    ${expected_total}    ${actual_total}