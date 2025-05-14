const viewGalleryOverlay = (e)=>{
    const galleryOverlay = e.target.parentElement.querySelector('.galleryOverlay');
    galleryOverlay.classList.add('view')
}

const closeGalleryOverlay = (e)=>{
    const galleryOverlay = e.target.closest('.galleryOverlay');
    galleryOverlay.classList.remove('view')

}

const displaySelectedFile = (e)=>{
    const file = e.target.files[0];
    if(!file) {
        return e.target.parentElement.querySelector('.selected_file').classList.add('hidden')
    };
    let fileType = file.type.split('/')[0];
    fileType = fileType==='image'? 'img':'video';
    const displayedMedia = e.target.parentElement.querySelector(`.selected_file ${fileType}`);
    displayedMedia.parentElement.classList.remove('hidden');
    
    if(fileType==="img"){
        displayedMedia.nextElementSibling.classList.add('hidden');
        displayedMedia.classList.remove('hidden');
        URL.revokeObjectURL(displayedMedia.nextElementSibling.querySelector('source').src)
        displayedMedia.src = URL.createObjectURL(file);
    }
    else{
        displayedMedia.previousElementSibling.classList.add('hidden');
        URL.revokeObjectURL(displayedMedia.previousElementSibling.src)
        displayedMedia.classList.remove('hidden');
        displayedMedia.querySelector('source').src = URL.createObjectURL(file);
        displayedMedia.querySelector('source').type = file.type;
        displayedMedia.load();
    }
}