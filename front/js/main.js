const button = document.querySelector('#button')
const h1 = document.querySelector('h1')
const url = 'http://localhost:3000/api'

function films(dados) {
  const img_url = dados.img_url
  console.log(dados.result)
  const { backdrop_path, title, overview } = dados.result
  const container = document.createElement('div')

  let img = document.querySelector('.films')
  let div = document.querySelector('.films_title_contents')

  if (img == null) {
    img = document.createElement('img')
    img.setAttribute('src', `${img_url}${backdrop_path}`)
    img.classList.add('films')

    h1.insertAdjacentElement('afterend', container)
    container.appendChild(img)
    container.classList.add('films_img')
  }

  img.setAttribute('src', `${img_url}${backdrop_path}`)

  if (div == null) {
    div = document.createElement('div')
    div.classList.add('films_title_contents')
    container.appendChild(div)
  }

  const conteudo = `<h1>${title}</h1><p>${overview}</p>`
  div.innerHTML = conteudo
}

async function newFilme() {
  const dados = await fetch(url)
  const result = await dados.json()
  films(result)
  console.log(result)
}

button.addEventListener('click', newFilme)
