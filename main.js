const searchInput = document.querySelector('#search-input')
const books = document.querySelector('#books')

document.querySelector('#search-button').addEventListener('click', async () => {
    if (!searchInput.value) {
        return window.alert('Insert a search term')
    }

    books.innerHTML = ''
    document.querySelector('#start-div').style.display = 'block'
    document.querySelector('#start-text').textContent = 'Searching...'

    const searchJson = await fetch(`https://www.googleapis.com/books/v1/volumes?maxResults=40&q=${searchInput.value}`)
        .then((res) => {
            return res.json()
        })
        .catch(err => {
            window.alert('An error occurred while searching, please try again')
        })

    showBooks(searchJson)
})

function showBooks(json) {
    document.querySelector('#start-div').style.display = 'none'

    let bookDiv = books.appendChild(document.createElement('div'))
    bookDiv.classList.add('book-div')

    for (let i = 0; i < json.items.length; i++) {
        if (i != 0 && i % 2 == 0) {
            bookDiv = books.appendChild(document.createElement('div'))
            bookDiv.classList.add('book-div')
        }

        const book = bookDiv.appendChild(document.createElement('div'))
        book.classList.add('book')

        book.appendChild(document.createElement('img')).src = json.items[i].volumeInfo.imageLinks ? json.items[i].volumeInfo.imageLinks.thumbnail : 'notcover.jpeg'

        const bookInfo = book.appendChild(document.createElement('div'))
        bookInfo.classList.add('book-info')

        bookInfo.appendChild(document.createElement('h3')).textContent = json.items[i].volumeInfo.title

        if (json.items[i].volumeInfo.authors) {
            bookInfo.appendChild(document.createElement('p')).innerHTML = `<strong>Author:</strong> ${json.items[i].volumeInfo.authors.join(', ')}`
        }
        if (json.items[i].volumeInfo.publisher) {
            bookInfo.appendChild(document.createElement('p')).innerHTML = `<strong>Publisher:</strong> ${json.items[i].volumeInfo.publisher}`
        }
        if (json.items[i].volumeInfo.publishedDate) {
            bookInfo.appendChild(document.createElement('p')).innerHTML = `<strong>Published:</strong> ${json.items[i].volumeInfo.publishedDate}`
        }
    }
}