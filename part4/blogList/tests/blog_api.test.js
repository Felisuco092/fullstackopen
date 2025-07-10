const supertest = require('supertest')
const app = require('../app')
const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const mongoose = require('mongoose')

const api = supertest(app)


describe('Api tests with MongoDB', async () => {
    beforeEach(async () => {
        await Blog.deleteMany({})

        const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('Get of /api/blogs return the length of the initialBlogs test', async () => {
        const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/ )
        
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
})

after(() => {
    mongoose.connection.close()
})