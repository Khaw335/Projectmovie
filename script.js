var displayS = document.getElementById('showMV')
var displayF = document.getElementById('showFMV')


function hideAll() {
	displayS.style.display = 'none'
    displayF.style.display = 'none'

}

document.getElementById('searchButton').addEventListener('click', (_event) => {
	let moviename = document.getElementById('inputText').value
	console.log(moviename)
	fetch(`https://api.jikan.moe/v3/search/anime?q=${moviename}`)
	.then((response) => {
		return response.json()
	}).then((data) => { 
		console.log(data)
        Movie(data.results)
	})
})

function Movie(data) {
    for (movie of data){
        showMovie(movie)
    }
}

function showMovie(movie){
    const display = document.getElementById('showMovie')
    display.style.margin = "50px";
    let div = document.createElement('div')
    div.style.margin = "10px"
    div.style.border = "2px solid gray"
    let pic = document.createElement('img')
    pic.setAttribute('src',movie.image_url)
    pic.addEventListener('click',(_event)=>{
        var txt;
        if (confirm('ต้องการเพิ่ม'+ movie.title + 'เข้าสู้รายการที่ชอบหรือไม่')) {
          hideAll()
          displayF.style.display = 'block'
          setId(movie)

        } else {
          txt = "ไม่ต้องการเพิ่มเข้าสู่รายการที่ชอบ";
          alert(txt)

        }
	})
    div.appendChild(pic)
    let name = document.createElement('p')
    name.innerText = movie.title    
    div.appendChild(name)
    let des =document.createElement('p')
    des.innerText = "Synopsis:"+ movie.synopsis
    div.appendChild(des)
    display.appendChild(div)

}

function setId(movie){
    let ID = {
        id: "632110335",
        movie: {
            url: movie.url,
            image_url: movie.image_url,
            title: movie.title,
            synopsis: movie.synopsis,
            type: movie.type,
            episodes: movie.episodes,
            score: movie.score,
            rated: movie.rated
        }
    }
    addtofav(ID)
}


function addtofav(_ID){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(index)
    }).then(response =>{
        if(response.status === 200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(_data =>{
        hideAll()
        console.log('success')
    })
}

function myFavMovie(){
    fetch(`https://se104-project-backend.du.r.appspot.com/movies/632110335`, {
        method: 'GET'
    }).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
    }).then((data) => {
        MovieFav(data)
    })
}

function MovieFav(data) {
    for (movie of data){
        displayMyFav(movie)
    }
}

function displayMyFav(movie){
    const display = document.getElementById('showFavMovie')
    display.style.margin = "50px";
    let div = document.createElement('div')
    div.style.margin = "10px"
    div.style.border = "2px solid gray"
    let pic = document.createElement('img')
    pic.setAttribute('src',movie.image_url)
    div.appendChild(pic)
    let name = document.createElement('p')
    name.innerText = movie.title    
    div.appendChild(name)
    let des =document.createElement('p')
    des.innerText = "Synopsis:"+ movie.synopsis
    div.appendChild(des)
    let btndetail = document.createElement('button')
    btndetail.classList.add('btn')
    btndetail.classList.add('btn-primary')
    btndetail.setAttribute('type', 'button')
	btndetail.innerText = 'Detail'
    btndetail.addEventListener('click', (event) => { 
	})
    div.appendChild(btndetail)  
    btndetail.style.marginLeft = "20px"
    btndetail.style.marginRight = "60px"
    let btndelete = document.createElement('button')
    btndelete.classList.add('btn')
    btndelete.classList.add('btn-danger')
    btndelete.setAttribute('type', 'button')
	btndelete.innerText = 'Delete'
    btndelete.addEventListener('click', (event) => { 
        var txt;
        if (confirm('ต้องการลบ'+ movie.title + 'ออกจากรายการที่ชอบหรือไม่')) {
         deleteMV(movie.id)
          hideAll()
        } else {
          txt = "ยกเลิกรายการ";
          alert(txt)

        }
	})
    div.appendChild(btndelete)    
    display.appendChild(div)
}

document.getElementById('navfav').addEventListener('click', (_event) => {
    hideAll()
    displayF.style.display = 'block'

    myFavMovie()
})

function deleteMV(ID){
    fetch(`https://se104-project-backend.du.r.appspot.com/movie?id=632110335&&movieId=${ID}`,{
        method: 'DELETE',
    }).then(response =>{
        if(response.status===200){
            return response.json()
        }else{
            throw Error(response.statusText)
        }
    }).then(_data=>{
        hideAll()
        myFavMovie()
        displayF.style.display = 'block'
    }).catch(_error=>{
        alert('ไม่พบหนังที่เลือก')
    })
}