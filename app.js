//Album class:represents an album

class Album{
    constructor(title,artist,date,genre,label,album_length){
        this.title=title;
        this.artist=artist;
        this.date=date;
        this.genre=genre;
        this.label=label;
        this.album_length=album_length;
    }
}


//UI Class: handles UI tasks

class UI{
    static displayAlbums(){
        // const storedAlbums=[
        //     {  
        //         title:'The Downward Spiral',
        //         artist:'Nine Inch Nails',
        //         date:'1994',
        //         genre:'Industrial Rock',
        //         label:'InterScope Records',
        //         album_length:'70 minutes'
        //      },{  
        //         title:'Amerikkka most wanted',
        //         artist:'Ice Cube',
        //         date:'1990',
        //         genre:'Hip Hop/Rap',
        //         label:'Ruthless records',
        //         album_length:'70 minutes'
        //      }
        // ];
        const albums=Store.getAlbums();
        //loop through each album and add album to addToAlbumList

        albums.forEach((album)=>UI.addToAlbumList(album));

    }

    static addToAlbumList(album){
        const list=document.querySelector('#album-list');
        const row=document.createElement('tr');

        row.innerHTML=`<td>${album.title}</td><td>${album.artist}</td><td>${album.date}</td><td>${album.genre}</td><td>${album.label}</td><td>${album.album_length}</td><td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row)
    }


    static clearInputs(){
        document.querySelector('#title').value='';
        document.querySelector('#artist').value='';
        document.querySelector('#date').value='';
        document.querySelector('#genre').value='';
        document.querySelector('#record_label').value='';
        document.querySelector('#album_length').value='';


    }



    static deleteAlbum(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }

    }

    static showAlertMessage(message,className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const h1=document.querySelector('h1');
        const container=document.querySelector('.container');
         const form=document.querySelector('#album-form');
        container.insertBefore(div,h1);

        setTimeout(function(){
           document.querySelector('.alert').remove();
        },3000)

    }

   

    
}
//store class 

//handles storage

class Store{

    static getAlbums(){
        let albums;

        if(localStorage.getItem('albums')===null){
            albums=[];

        }else{
            albums=JSON.parse(localStorage.getItem('albums'));
        }

        return albums;


    }

    static addAlbum(album){
        const albums=Store.getAlbums();
          albums.push(album);

          //reset to local storage
         localStorage.setItem('book',JSON.stringify(albums));

    }

    static removeAlbum(genre){
        const albums =Store.getAlbums();
        albums.forEach((album,index)=>{
            if(album.genre===genre){
                albums.splice(index,1);
            }
        });

        //reset local storage with that book removed

        localStorage.setItem('albums',JSON.stringify(albums));
    }
}

//add an event

//Event : Display Books

document.addEventListener('DOMContentLoaded',UI.displayAlbums)

const albumForm=document.querySelector('#album-form');
albumForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    //get form values

    const title=document.querySelector('#title').value;
    const artist=document.querySelector('#artist').value;
    const date=document.querySelector('#date').value;
    const genre=document.querySelector('#genre').value;
    const label=document.querySelector('#record_label').value;
    const album_length=document.querySelector('#album_length').value;

    //validate 
    
    if(title===''||artist===''||date===''||genre===''||label===''||album_length===''){
        // alert('Plese enter a message')
       

        
            UI.showAlertMessage("Ya, You filled out the form","danger")

    
        
    }else{


        
            UI.showAlertMessage("Ya, You filled out the form","success");



        
        
    //instantiate album

    const album=new Album(title,artist,date,genre,label,album_length);
    Store.addAlbum(album)
    console.log(album)
    //add album to list

    UI.addToAlbumList(album);
    //clear input field 

    UI.clearInputs();

    }



    

})

const deleteBtn=document.querySelector('#album-list');

    deleteBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        
                // console.log(e.target)
                UI.deleteAlbum(e.target);
                
            UI.showAlertMessage("Album Removed","success")
        
    })
