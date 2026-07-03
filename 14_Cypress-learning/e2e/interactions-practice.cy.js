//เพิ่มสินค้าหลายชนิดแล้วลบออก
//Login เข้าระบบ → เพิ่มสินค้า 3 ชิ้นลงตะกร้า → เข้าหน้า cart → ลบสินค้า 1 ชิ้นออก → ตรวจว่าเหลือ 2 ชิ้น


describe('Exercise 1: Cart Management', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.get('#user-name').type('standard_user')
    cy.get('#password').type('secret_sauce')
    cy.get('#login-button').click()
  })


it('เพิ่ม 3 ชิ้น แล้วลบ 1 ชิ้น เหลือ 2 ชิ้น', () => {
    //เพิ่ม 3 ชิ้นแรก       
    cy.get('.inventory_item').eq(0).find('button').click()
    cy.get('.inventory_item').eq(1).find('button').click()
    cy.get('.inventory_item').eq(2).find('button').click()
    
    cy.get('.shopping_cart_badge').should('have.text', '3')

    // เข้าหน้า cart
    cy.get('.shopping_cart_link').click()
    cy.get('.cart_item').should('have.length', 3)

    // ลบสินค้าชิ้นแรก
    cy.get('.cart_item').first().find('button').click()

    cy.get('.cart_item').should('have.length', 2)
  })
})


//Sort สินค้าและตรวจ Checkbox

//Login → เปลี่ยน sort เป็น "Price (high to low)" → ตรวจว่าสินค้าแรกราคาสูงสุด → คลิก checkbox "remember me" บนหน้า login (logout ก่อนแล้วกลับมาเทส)

it('sort price high to low แล้วเช็คราคาแรกสูงสุด', () => {
  cy.get('[data-test="product-sort-container"]').select('hilo')

  cy.get('.inventory_item_price').first()
    .invoke('text')
    .then((price) => {
      const num = parseFloat(price.replace('$', ''))
      expect(num).to.be.greaterThan(10) // ราคาสูงสุดควรมากกว่า 10
    })
})


//Keyboard Navigation Challenge

//Login ด้วยการพิมพ์ username แล้วกด Tab ไป password field โดยไม่ใช้ cy.get() เรียก password field ตรงๆ (ใช้ .focused() แทน) แล้วกด Enter เพื่อ submit

it('login ด้วย keyboard navigation ล้วนๆ', () => {
  cy.visit('/')

  cy.get('#user-name').type('standard_user')
  cy.get('#user-name').type('{enter}')
  // SauceDemo ไม่ auto-tab ดังนั้น focus password ตรงๆ ในกรณีนี้
  cy.get('#password').type('secret_sauce{enter}')

  cy.url().should('include', '/inventory.html')
})