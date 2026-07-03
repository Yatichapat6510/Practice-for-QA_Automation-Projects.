// บังคับคลิกแม้ Cypress คิดว่า element ไม่ actionable
cy.get('.overlapped-btn').click({ force: true })

// บังคับ type แม้ field ถูกซ่อนบางส่วน
cy.get('.hidden-input').type('text', { force: true })

// บังคับ check
cy.get('.custom-checkbox').check({ force: true })


// Ctrl+A (select all) แล้วลบ
cy.get('#editor').type('{ctrl}a{del}')

// Cmd+S (save) บน Mac
cy.get('body').type('{cmd}s')

// กด Tab เพื่อเปลี่ยน focus ไป field ถัดไป
cy.get('#username').type('user{enter}')
cy.focused().type('password')  // .focused() = element ที่ focus อยู่


// focus เข้า field โดยไม่พิมพ์อะไร (ทดสอบ validation onFocus)
cy.get('#email').focus()

// blur ออกจาก field (ทดสอบ validation onBlur)
cy.get('#email').type('invalid-email').blur()
cy.get('.error').should('be.visible')


