// HTML: <input type="file" id="file-input">
cy.get('#file-input').selectFile('cypress/fixtures/sample-image.png')

// upload หลายไฟล์พร้อมกัน
cy.get('#file-input').selectFile([
  'cypress/fixtures/sample-image.png',
  'cypress/fixtures/sample.pdf'
])


// บาง UI รับไฟล์ผ่าน drag-drop zone แทนที่จะเป็น input ตรงๆ
cy.get('.dropzone').selectFile(
  'cypress/fixtures/sample-image.png',
  { action: 'drag-drop' }
)


// สร้างไฟล์ CSV ปลอมขึ้นมาตอนรัน test เลย
cy.get('#file-input').selectFile({
  contents: Cypress.Buffer.from('name,email\nJohn,john@test.com'),
  fileName: 'data.csv',
  mimeType: 'text/csv'
})


