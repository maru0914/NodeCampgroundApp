function previewMultiple(event) {
    const images = document.getElementById("image");
    for (let i = 0; i < images.files.length; i++) {
        let urls = URL.createObjectURL(event.target.files[i]);
        document.getElementById("formFile").innerHTML += '<img src="' + urls + '">';
    }
}