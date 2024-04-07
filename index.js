const access_token = 'ddmkwvwDZmiuQ2F9oh3pm96QMqmHJhCuGxfWzAVa9SM'
let searchText = document.getElementById('searchText')
let cardContainer = document.getElementById('cardContainer')
let loadMoreBtn = document.getElementById('loadMoreBtn')
let clearAllBtn = document.getElementById('clearAllBtn')
let val;
let page = 1;

document.getElementById('searchBtn').addEventListener('click', (e) => {
    loadMoreBtn.classList.add('hidden')
    clearAllBtn.classList.add('hidden')
    e.preventDefault()
    // console.log("first")
    if (searchText.value == '') {
        // console.log(searchText.value)
        alert("Search Bar is empty")
        return
    } else {
        page = 1;
        cardContainer.innerHTML = ''
        val = searchText.value
        searchText.value = ''
        fetchImg(val)
    }
})

async function fetchImg(val){
    let response = await fetch(`https://api.unsplash.com/search/photos?query=${val}&client_id=${access_token}&page=${page}`)
    let result = await response.json()
    // console.log(result)
    if (result.results.length < 1 || !result) {
        cardContainer.innerHTML = `<h1 class="errorHeading">Not Found</h1>`
    } else {
        displayImg(result)
    }
}

function displayImg({results}){
    // console.log(results)
    results.map(data => {
        let div = document.createElement('div')
        let a = document.createElement('a')
        // a.setAttribute('href' , `${data.links.html}`)
        div.setAttribute('class', 'card')
        div.innerHTML = `
        <a href=${data.links.html} target="_blank" class="cardLink">
        <div class="cardTop">
            <img src=${data.user.profile_image.large} alt="" class="userImg">
            <p class="userName">${data.user.name}</p>
        </div>
        <div class="cardBottom">
            <img src=${data.urls.regular} alt="" class="mainImg">
            <p class="imgDes">${data.alt_description}</p>
        </div> </a>`
        cardContainer.appendChild(div)
    })

    loadMoreBtn.classList.remove('hidden')
    clearAllBtn.classList.remove('hidden')
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
