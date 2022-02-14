import { api_key, base_url, img_url, language } from './modules/api.js'

const button = document.querySelector('#button')
const h1 = document.querySelector('h1')

function films() {
  const id = Math.floor(Math.random() * 6000 + 1)
  const url = `${base_url}${id}?${api_key}&${language}`
  myFetch(url)
}

async function myFetch(url) {
  try {
    let response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    let dados = await response.json()

    films_content(dados)
  } catch (e) {
    erro()
    console.clear()
  }
}

function films_content(result) {
  const { poster_path, title, overview, genres, release_date } = result
  let container = document.querySelector('.films_img')
  let p
  let img = document.querySelector('.films')
  let div = document.querySelector('.films_title_contents')

  if (img == null) {
    container = document.createElement('div')
    img = document.createElement('img')
    img.setAttribute('src', `${img_url}${poster_path}`)
    img.classList.add('films')

    h1.insertAdjacentElement('afterend', container)

    container.appendChild(img)
    container.classList.add('films_img')
  }

  container.classList.remove('erro')
  if (poster_path != null) {
    img.setAttribute('src', `${img_url}${poster_path}`)
  } else {
    img.setAttribute('src', './img/david-pupaza-heNwUmEtZzo-unsplash.jpg')
  }

  if (div == null) {
    div = document.createElement('div')
    div.classList.add('films_title_contents')
    container.appendChild(div)
  }

  const conteudo = `
    <h1>${title}</h1>
    <p>${overview}</p>
    <div id="container_genrs">
     <div>
        <h2 class="title_gerns" id="date">Data de laçamento</h2>
        <p class="date">${release_date}</p>
      </div>
      <h2 class="title_gerns">Gênero</h2>
      <div id="genrs"></div>
    </div>`

  div.innerHTML = conteudo

  // Eu criei o p lá em cima para ser usado agora
  p = document.querySelector('#genrs')

  // Eu estou adicionado todos os gêneros do filmes, mas antes preciso saber se tem gêneros cadastrado antes.
  if (genres.length > 0) {
    for (const keys in genres) {
      let gen = document.createElement('p')
      gen.innerText = genres[keys].name
      p.appendChild(gen)
    }
  }
}

function erro() {
  let container = document.querySelector('.films_img')
  let img = document.querySelector('.films')
  let div = document.querySelector('.films_title_contents')

  console.log()

  if (img == null) {
    container = document.createElement('div')
    img = document.createElement('img')
    img.setAttribute('src', './img/erro.jpg')
    img.classList.add('films')

    h1.insertAdjacentElement('afterend', container)

    container.appendChild(img)
    container.classList.add('films_img')
  } else {
    img.setAttribute('src', './img/erro.jpg')
  }

  container.classList.add('erro')

  if (div == null) {
    div = document.createElement('div')
    div.classList.add('films_title_contents')
    container.appendChild(div)
  }

  const conteudo = `<p>Problema na requisição, tente novamente! <p>`

  div.innerHTML = conteudo
}

button.addEventListener('click', films)
