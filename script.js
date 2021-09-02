const searchBook = ()=>{
    const inputField = document.getElementById("inputField");
  
    let inputFieldText = inputField.value;
    document.getElementById("inputField").value = "";
   
    const errorMassage = document.getElementById("error-massage")
    const showBook = document.getElementById('showBook')
    errorMassage.classList.add('d-none')
    errorMassage.textContent = ""
    let cardContainer = document.getElementById('card-container');
    document.getElementById('spinner').classList.remove('d-none')
    const url = `https://openlibrary.org/search.json?q=${inputFieldText}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
      console.log(data.numFound)
      if(inputFieldText ==''){
        document.getElementById('spinner').classList.add('d-none') 
        showBook.classList.add('d-none')
        cardContainer.classList.add('d-none')
        errorMassage.classList.remove('d-none')
        errorMassage.innerHTML = `
        <h1>Please Search another Book Name </h1>
        `
      }
      else if(data.numFound ===0){
        document.getElementById('spinner').classList.add('d-none') 
        showBook.classList.add('d-none')
        cardContainer.classList.add('d-none')
        errorMassage.classList.remove('d-none')
          errorMassage.textContent = ""
        errorMassage.innerHTML = `
        <h1> ${inputFieldText} this book not Found</h1>
        `
    }
    else{
      showBook.classList.remove("d-none")
      cardContainer.classList.remove('d-none')
      errorMassage.classList.add ('d-none')
      document.getElementById('spinner').classList.add('d-none') 
      showData(data)
    }
    })
    .catch(er=>alert(er))
}
let showData = (data)=>{
  
    console.log(data.docs)

    showBook.innerHTML = `
    <h1>${data.numFound} books are found</h1>
    `
    let cardContainer = document.getElementById('card-container')
    cardContainer.textContent = ""
    data.docs.forEach(doc=>{
        // console.log(doc)
      if (doc.publisher) {
        var publisherN = doc.publisher[0];
      }
      let key = doc.cover_i;
        if(key !== undefined){
          // let alternative  =`https://bitsofco.de/content/images/2018/12/broken-1.png`
        let pics = `https://covers.openlibrary.org/b/id/${key}-M.jpg`
        // let subject = doc.subject
        let title = doc.title
        const div = document.createElement('div')
        div.className = 'col'
        div.innerHTML = `
        <div class="card  h-100">
        <img src="${pics ?pics : alternative}" class="card-img-top" alt="NotFound" width="250" height="250"  >
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">author :${doc.author_name}</p>
          <p> First Publish:${doc.first_publish_year}</p>
          <p> publisher:${publisherN}</p>
        </div>
        <button class="btn btn-primary w-100">Add To Cart</button>
      </div>
`
        cardContainer.appendChild(div)
        }
  
    })
}
