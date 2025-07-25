const supertest = require('supertest')
const app = require('../app')
const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const mongoose = require('mongoose')

const api = supertest(app)


describe('Api tests with MongoDB',  () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const userObjects = helper.initialUsers.map(user => new User(user))
        const promiseArray2 = userObjects.map(user => user.save())
        await Promise.all(promiseArray2)

        await Blog.deleteMany({})
        const user = await User.findOne({ username : "test_user"})
        const blogRefactored = helper.initialBlogs.map(blog => {
            blog.user = user._id
            return blog
        })
        const blogObjects = blogRefactored.map(blog => new Blog(blog))
        const promiseArray = blogObjects.map(blog => blog.save())
        await Promise.all(promiseArray)
    })

    test('Get of /api/blogs return the length of the initialBlogs test', async () => {
        const response = await api.get('/api/blogs')
                            .expect(200)
                            .expect('Content-Type', /application\/json/ )
        
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('Unique identification of blogs is name id and not _id', async () => {
        const blogs = await helper.blogsInDb()
        const blogKeys = Object.keys(blogs[0])
        assert(blogKeys.includes('id'))
        assert(!blogKeys.includes('_id'))
    })

    test('A valid blog can be added ', async () => {
        const newBlog = {
           title: "Hawaii1234",
            author: "Paco",
            url: "http://wazaaaaaaa.com",
            likes: 10
        }

        const login = {
            username: "test_user",
            password: "test"
        }
    
        let loginToken = await api
            .post('/api/login')
            .send(login)
            .expect(200)
        
        loginToken = loginToken.body.token
    
        await api
            .post('/api/blogs')
            .set('Authorization', loginToken)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
    
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map(n => n.title)
    
        assert(titles.includes("Hawaii1234"))
    })

    test('When passed a blog without likes, 0 is the default value', async () => {
        const newBlog = {
            title: "Hawaii1234",
            author: "Paco",
            url: "http://wazaaaaaaa.com"
        }

        const login = {
            username: "test_user",
            password: "test"
        }
    
        let loginToken = await api
            .post('/api/login')
            .send(login)
            .expect(200)
        
        loginToken = loginToken.body.token

        const blogAdded = await api.post('/api/blogs')
                        .send(newBlog)
                        .set('Authorization', loginToken)
                        .expect(201)
                        .expect('Content-Type', /application\/json/)
        

        assert.strictEqual(blogAdded.body.likes, 0)

    })

    test('Not added when misses title', async () => {
        const newBlog = {
            author: "Paco",
            url: "http://wazaaaaaaa.com",
            likes: 10
        }

        const login = {
            username: "test_user",
            password: "test"
        }
    
        let loginToken = await api
            .post('/api/login')
            .send(login)
            .expect(200)
        
        loginToken = loginToken.body.token

        await api.post('/api/blogs')
                .set('Authorization', loginToken)
                .send(newBlog)
                .expect(400)
        
    })

    test('Not added when misses url', async () => {
        const newBlog = {
            title: "Hawaii1234",
            author: "Paco",
            likes: 10
        }
        
        const login = {
            username: "test_user",
            password: "test"
        }
    
        let loginToken = await api
            .post('/api/login')
            .send(login)
            .expect(200)
        
        loginToken = loginToken.body.token

        await api.post('/api/blogs')
                .set('Authorization', loginToken)
                .send(newBlog)
                .expect(400)
    })

    test('Post without a token results in a status code of 401', async () => {
        const newBlog = {
            title: "Hawaii1234",
            author: "Paco",
            likes: 10
        }
        await api.post('/api/blogs')
                .send(newBlog)
                .expect(401)
    })
    
    describe("Delete of blogs", () => {
        test('When delete a blog with a valid id, succes with code 204', async () => {
            const initialBlogs = await helper.blogsInDb()
            const deleteBlog = initialBlogs[0]

            
            const login = {
                username: "test_user",
                password: "test"
            }
    
            let loginToken = await api
                .post('/api/login')
                .send(login)
                .expect(200)
        
            loginToken = loginToken.body.token

            await api.delete(`/api/blogs/${deleteBlog.id}`)
                    .set('Authorization', loginToken)
                    .expect(204)
            
            const blogsAtEnd = await helper.blogsInDb()

            assert.strictEqual(blogsAtEnd.length + 1, initialBlogs.length)

            const titles = blogsAtEnd.map(blog => blog.title)
            assert(!titles.includes(deleteBlog.title))
        })
    })

    describe('Update a blog', () => {
        test('Updated likes with an valid id', async () => {
            const initialBlogs = await helper.blogsInDb()
            const updateBlog = initialBlogs[0]

            const newLikes = {
                title: "Mi vida lujosa en verano",
                author: "Felix",
                url: "pruebaaaaaaaaaaa",
                likes: 10
            }

            const updated = await api.put(`/api/blogs/${updateBlog.id}`)
                    .send(newLikes)
                    .expect(200)
                    .expect('Content-Type', /application\/json/)
            
            assert.strictEqual(updated.body.likes, newLikes.likes)
        })
    })
})

after(() => {
    mongoose.connection.close()
})