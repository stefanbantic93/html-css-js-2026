function changeImage(){
    const imageElement=document.getElementByld("myImage");
        if (imageElement.src.includes("images/animal.jpg")){
        imageElement.src = "images/nature.jpg";
        }else {
             imageElement.src = "images/animal.jpg";
        }
}