// API.spec.js
// ทดสอบ API ด้วย Playwright


// ==========================
// 1. Import Library
// ==========================

const { test, expect } = require('@playwright/test');

const Ajv = require('ajv');



// ==========================
// 2. Create AJV
// ==========================

const ajv = new Ajv();



// ==========================
// 3. Create Schema
// ==========================

const userSchema = {

    type: 'object',

    properties: {

        id: {
            type: 'string'
        },

        name: {
            type: 'string'
        }

    },

    required: [
        'id',
        'name'
    ]

};



// ==========================
// 4. Test Case
// ==========================


test.describe('API Testing', () => {



    // GET Test

    test('GET Request', async ({request}) => {


        const response = await request.get(
            'https://api.restful-api.dev/objects/7'
        );


        expect(response.status()).toBe(200);


        const data = await response.json();


        console.log(data);



        // Basic Validation

        expect(data.id).toBe('7');

        expect(data.name)
            .toBe('Apple MacBook Pro 16');



        // Schema Validation

        const validate = ajv.compile(userSchema);


        const valid = validate(data);


        expect(valid).toBe(true);


    });



    // POST Test

    test('POST Request', async ({request}) => {


        const response = await request.post(
            'https://reqres.in/api/users',
            {

                data: {

                    name: 'Yatichapat',

                    job: 'QA Engineer'

                }

            }

        );


        expect(response.status()).toBe(201);



        const data = await response.json();


        console.log(data);



        expect(data.name)
            .toBe('Yatichapat');


        expect(data.job)
            .toBe('QA Engineer');


    });


});