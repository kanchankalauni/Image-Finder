const access_token = 'ddmkwvwDZmiuQ2F9oh3pm96QMqmHJhCuGxfWzAVa9SM'
let searchText = document.getElementById('searchText')
let cardContainer = document.getElementById('cardContainer')
let loadMoreBtn = document.getElementById('loadMoreBtn')
let clearAllBtn = document.getElementById('clearAllBtn')
let val;
let page = 1;

document.getElementById('searchBtn').addEventListener('click', () => {
    page = 1;
    cardContainer.innerHTML = ''
    val = searchText.value
    searchText.value = ''
    fetchImg(val)
})

async function fetchImg(val){
    let response = await fetch(`https://api.unsplash.com/search/photos?query=${val}&client_id=${access_token}&page=${page}`)
    let result = await response.json()
    if (result.results.length < 1) {
        cardContainer.innerHTML = `<h1 class="errorHeading">Not Found</h1>`
    } else {
        displayImg(result)
    }
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

    loadMoreBtn.classList.add('visible')
    clearAllBtn.classList.add('visible')
}

loadMoreBtn.addEventListener('click', () => {
    // console.log("first")
    page++;
    fetchImg(val)
})

clearAllBtn.addEventListener('click', () => {
    loadMoreBtn.classList.add('hidden')
    clearAllBtn.classList.add('hidden')
    cardContainer.innerHTML = ''
})