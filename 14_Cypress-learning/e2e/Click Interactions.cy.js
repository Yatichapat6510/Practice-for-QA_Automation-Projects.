//คลิกพื้นฐาน
cy.get('login-button').click()

//คลิกหลาย element พร้อมกัน - ต้องใส่ multiple: ture
cy.get('.checkbox').click({ multiple: ture })

//คลิกแบบไม่สน actionability check (ใช้ระวัง!)
cy.get('.hidden-btn').click({ force: ture })


cy.get('.slider').click('topLeft')
cy.get('.slider').click('top')
cy.get('.slider').click('topRight')
cy.get('.slider').click('left')
cy.get('.slider').click('center')  // default
cy.get('.slider').click('right')
cy.get('.slider').click('bottomLeft')
cy.get('.slider').click('bottom')
cy.get('.slider').click('bottomRight')

// หรือระบุ x, y coordinate เอง (pixel จากมุมซ้ายบนของ element)
cy.get('.canvas').click(100, 50)


// ดับเบิลคลิก
cy.get('.editable-cell').dblclick()

// คลิกขวา (เปิด context menu)
cy.get('.file-item').rightclick()


cy.get('.item').click({ ctrlKey: true })
cy.get('.item').click({ shiftKey: true })
cy.get('.item').click({ metaKey: true })   // Cmd บน Mac
cy.get('.item').click({ altKey: true })

cy.get('#username').type('standard_user')

// ลบข้อความเดิมก่อนพิมพ์ใหม่ (สำคัญมาก!)
cy.get('#username').clear().type('new_user')

// หรือใช้ {selectall} แล้วพิมพ์ทับ
cy.get('#username').type('{selectall}new_user')


// พิมพ์แล้วกด Enter เพื่อ submit
cy.get('#search').type('cypress testing{enter}')

// พิมพ์ผิดแล้วลบด้วย backspace
cy.get('#input').type('helloo{backspace}')
// ผลลัพธ์: "hello" (ลบตัว o ตัวสุดท้ายออก)

// เลือกทั้งหมดแล้วพิมพ์ทับ
cy.get('#input').type('{selectall}{backspace}')
// ผลลัพธ์: field ว่างเปล่า


// พิมพ์ทีละตัวช้าๆ (จำลอง user จริง) — debug timing issue
cy.get('#input').type('slow typing', { delay: 100 })

// พิมพ์โดยไม่ trigger event ปกติ (ใช้ในกรณีพิเศษ)
cy.get('#input').type('text', { force: true })


// HTML: <select data-test="product-sort-container">
//   <option value="az">Name (A to Z)</option>
//   <option value="za">Name (Z to A)</option>
//   <option value="lohi">Price (low to high)</option>
// </select>

// เลือกด้วย value attribute
cy.get('[data-test="product-sort-container"]').select('za')

// เลือกด้วย visible text
cy.get('[data-test="product-sort-container"]').select('Price (low to high)')

// เลือกด้วย index (เริ่มนับจาก 0)
cy.get('[data-test="product-sort-container"]').select(2)


// เลือกหลาย option พร้อมกัน (ส่งเป็น array)
cy.get('select[multiple]').select(['option1', 'option3'])


cy.get('[data-test="product-sort-container"]')
  .select('za')
  .should('have.value', 'za')


// ติ๊กถูก (ถ้าติ๊กอยู่แล้ว จะไม่ทำอะไร ไม่ toggle)
cy.get('#agree-terms').check()

// ยกเลิกติ๊ก
cy.get('#agree-terms').uncheck()

// ติ๊กหลาย checkbox พร้อมกัน — ส่ง value array
cy.get('input[type="checkbox"]').check(['option1', 'option3'])


// HTML: <input type="radio" name="payment" value="credit">
cy.get('input[name="payment"]').check('credit')

// หรือเจาะจง element ตรงๆ
cy.get('#payment-credit').check()


cy.get('#agree-terms').check().should('be.checked')
cy.get('#agree-terms').uncheck().should('not.be.checked')