const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let picturesArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let ready = false;
let initialLoad = true;



/** unsplash API */
let count = 5;
const apiKey = 'yLs2-1WAae_ElS6UhRIUVtVzJMB4kRZJbsWIOid-DMg';
const apiUrl = `https://api.unsplash.com/photos/random/?query=nature&client_id=${apiKey}&count=${count}`;



/** check if all images were loaded */
const imageLoaded = () =>  {
    imagesLoaded++;
    if(  imagesLoaded === totalImages ) {
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 30;
    }
}


/** Helpers functions */
const setAttributes = (element, attr) => {
    for( const key in attr) {
        element.setAttribute(key, attr[key]);
    }
}

/** display pictures */
const displayPictures = ()  => {
    imagesLoaded = 0;
    totalImages =  picturesArray.length;

    picturesArray.forEach( pic => {
         
        /* create <a> element to link unsplash  */
         const item = document.createElement("a");
     
         setAttributes( item, {
             href: pic.links.html,
             target : '_blank'
            });

         /* create <img> for picture */
         const img = document.createElement("img");
       
        setAttributes( img, { 
            src : pic.urls.regular,
            alt : pic.alt_description,
            title : pic.alt_description || ""
         });
         img.addEventListener('load', imageLoaded);


         /*put <img> inside <a>, then put both inside image container element  */
         item.appendChild(img);
         imageContainer.appendChild(item);

    });
};


/** get pictures from unsplash API */
const getPictures = async () => {
    try {
        const response = await fetch(apiUrl);   
        
        picturesArray = await response.json();

        displayPictures();

    }
    catch (err) {

    }
}

/** check if the scroll bar near bottom of page */
    window.addEventListener('scroll', () => {
            if( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 
                && ready
             ) {
                ready = false;
                getPictures();
            }
    });


/** load */
getPictures();
