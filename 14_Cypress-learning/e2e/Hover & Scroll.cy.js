// trigger mouseover event
cy.get('.menu-item').trigger('mouseover')

// บาง UI ต้อง trigger หลาย event ต่อกัน
cy.get('.dropdown-trigger')
  .trigger('mouseover')
  .trigger('mouseenter')

// แล้วรอ submenu ปรากฏก่อนค่อย interact ต่อ
cy.get('.submenu').should('be.visible')
  .find('.submenu-item').first().click()


// scroll ไปหา element (ปกติ Cypress ทำให้อัตโนมัติก่อน click/type อยู่แล้ว)
cy.get('#footer-link').scrollIntoView().click()

// scroll ทั้งหน้าไปตำแหน่งที่กำหนด (pixel)
cy.scrollTo(0, 500)

// scroll ไปตำแหน่งที่กำหนดด้วยคำ
cy.scrollTo('bottom')
cy.scrollTo('top')
cy.scrollTo('center')

// scroll ภายใน container เฉพาะ (เช่น chat box, table)
cy.get('.scrollable-panel').scrollTo('bottom')


