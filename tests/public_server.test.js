/*
const handleSubscribeRequest = require('../public_service/public_server.js');

import mockAxios from 'jest-mock-axios';
FIXME: The above failed with 'SyntaxError: Cannot use import statement outside a module at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1495:14)'

afterEach(() => {
    mockAxios.reset();
});

test('Success response with status 201 should be returned to valid subscription requests', () => {
    const request = {
        'body':{
            'firstName': 'Bob',
            'lastName': 'Adams',
            'email': 'bob.adams@123.com'
        }
    };
    let mockedResponse = mockAxios.mockResponse;
    
    handleSubscribeRequest(request, mockedResponse);
    
    expect(mockAxios.post).toHaveBeenCalledWith('http://subscription_service:8081/subscribe', request);

    expect(mockedResponse.status).toEqual(201);
});
*/