const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favourite blog', () => {
    
    test('when there is not any blog, the function returns -1', () => {
        const blogs = []
        const result = listHelper.favouriteBlog(blogs)
        assert.strictEqual(result,-1)
    })
    
    test('when only one blog, return that blog', () => {
        const blogs = [{
            title: "Prueba",
            author: "Prueba",
            url: "Prueba",
            likes: 5
        }]
        const result = listHelper.favouriteBlog(blogs)
        assert.deepStrictEqual(result, {
            title: "Prueba",
            author: "Prueba",
            url: "Prueba",
            likes: 5
        })
    })

    test('when multiple blogs, return the blog with most likes', () => {
        const blogs = [{
            title: "Prueba",
            author: "Prueba",
            url: "Prueba",
            likes: 5
        },
        {
            title: "Test",
            author: "Test",
            url: "Test",
            likes: 8
        },
        {
            title: "Prueba",
            author: "Prueba",
            url: "Prueba",
            likes: 2
        }]
        const result = listHelper.favouriteBlog(blogs)
        console.log("result", result)
        assert.deepStrictEqual(result, {
            title: "Test",
            author: "Test",
            url: "Test",
            likes: 8
        })
    })
})