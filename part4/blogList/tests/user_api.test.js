const { test, describe, beforeEach, after } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')



const api = supertest(app)

describe('User tests', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const user = new User(helper.initialUsers[0])
        await user.save()
    })
    test('There is the exact number of users as initialUsers', async () => {
        const response = await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/ )
        
        assert.strictEqual(response.body.length, helper.initialUsers.length)
    })

    describe('Invalid users', () => {
        test('When post an user with an existing username responds with status 400', async () => {
            const user = {
                username: "test_user",
                name: "a",
                password: "upa"
            }
            await api.post('/api/users')
                .send(user)
                .expect(400)
            
            const users = await helper.usersInDb()
            assert.strictEqual(users.length, helper.initialUsers.length)
        })
        test('When post an invalid password, returns status code 400', async () => {
            const user = {
                username: "hallo",
                name: "a",
                password: "up"
            }
            const response = await api.post('/api/users')
                .send(user)
                .expect(400)
            
            assert.deepStrictEqual(response.body, {error: "The password must be at leat 3 characters of length"})

        })
        test('User is required in the post method', async () => {
            const user = {
                username: "",
                name: "a",
                password: "upfdafd"
            }

            const response = await api.post('/api/users')
                .send(user)
                .expect(400)
            
            assert(response.body.error.includes("is required"))
        })
        test('Password is required in the post method', async () => {
            const user = {
                username: "fafds",
                name: "a",
                password: ""
            }

            const response = await api.post('/api/users')
                .send(user)
                .expect(400)
            
            assert.deepStrictEqual(response.body, {error: "The password must be at leat 3 characters of length"})
        })
    })
})

after(() => {
    mongoose.connection.close()
})