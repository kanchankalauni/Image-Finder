const access_token = 'ddmkwvwDZmiuQ2F9oh3pm96QMqmHJhCuGxfWzAVa9SM'
let searchText = document.getElementById('searchText')
let cardContainer = document.getElementById('cardContainer')


document.getElementById('searchBtn').addEventListener('click', () => {
    cardContainer.innerHTML = ''
    fetchImg(searchText.value)
    
})

async function fetchImg(val){
    let response = await fetch(`https://api.unsplash.com/search/photos?query=${val}&client_id=${access_token}`)
    let result = await response.json()
    console.log(result)
    displayImg(result)
}

function displayImg(res){
    res.results.map(data => {
        let div = document.createElement('div')
        div.setAttribute('class', 'card')
        div.innerHTML = `
        <div class="cardTop">
            <img src=${data.user.profile_image.large} alt="" class="userImg">
            <p class="userName">${data.user.name}</p>
        </div>
        <div class="cardBottom">
            <img src=${data.urls.regular} alt="" class="mainImg">
            <p class="imgDes">${data.alt_description}</p>
        </div>`
        cardContainer.appendChild(div)
    })
}