

let id = 9 % "    4   ";

console.log(id);




// Prendo il tbody dove inserire la lista di libri
let listaRisultati =  document.getElementById('reserchTable');

// creo una funzione asincrona
async function cercaLibro() {

    // azzero il valore della lista
    listaRisultati.innerHTML = '';

    // prendo il valore della ricerca
    let ricercaLibro = document.getElementById('ricerca').value.toLowerCase();
    
    // creo una variabile per prendere l'indirizzo e concateno con il dato della ricerca
    let indirizzo = 'https://www.googleapis.com/books/v1/volumes?q=' + ricercaLibro;

    //valorizzo la response
    let response = await fetch(indirizzo);

    // prendo i dati della response
    let data = await response.json();

    // nei data.items sono presenti tutti i libri, quindi faccio un ciclo per ognuno di essi
    for(let libro of data.items){

        // inizializzo una variabile generale per l'immagine
        let immagine = '';

        // creo una condizione dove se il valore imageLinks non esiste, lascia il valore vuoto
        if(libro.volumeInfo.imageLinks == undefined){
            immagine = '';

        }else{ 
            // altrimetni immagine prende il valore di thumbnail
            immagine = libro.volumeInfo.imageLinks.thumbnail;
        }

        let titolo = libro.volumeInfo.title;

        let autori = libro.volumeInfo.authors;

        let tr = document.createElement('tr')

        // creo la colonna del titolo
        let tdName = document.createElement('td')

        // creo l'immagine e la sua tabella 
        let tdImage = document.createElement('td')

        let cover = document.createElement('img')

        // creo la colonnael degli autori
        let tdAuthors = document.createElement('td')

        // creo l'alt e l'src per l'immagine
        cover.alt = 'copertina_libro'

        if(immagine){
            cover.src = immagine;
        }

        
        tdName.innerText = titolo;

        tdImage.appendChild(cover);

        tdAuthors.innerText = autori;

        tr.appendChild(tdImage)
        tr.appendChild(tdName)
        tr.appendChild(tdAuthors)

        listaRisultati.appendChild(tr);

    }

    
}