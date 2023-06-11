const fileInput= document.querySelector(".file-input"),
chooseImgButton= document.querySelector(".choose_img"),
previewImg = document.querySelector(".image img"),
FilterName = document.querySelector(".filtervalues_filtername label.name"),
FilterSlider = document.querySelector(".filter_ranges input"),
FilterValue = document.querySelector(".filter_ranges label.value"),
RotateOption = document.querySelectorAll(".rotation_inversion button"),
FilterOption = document.querySelectorAll(".filters button"),
resetButton = document.querySelector(".reset_button button.reset"),
saveImage = document.querySelector(".save_choose_btn button.Save_img");

// filter values
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0, flipHoriz = 1, flipVert = 1;

const applyUpdate = () =>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHoriz}, ${flipVert})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const LoadImage = () => {
    let file = fileInput.files[0];// getting only one user selected file
    if(!file) return; // reurn if user select cancle button
    console.log(file);
    previewImg.src = URL.createObjectURL(file); // passing file url
    previewImg.addEventListener("load", () => {
        resetButton.click();
        document.querySelector(".container").classList.remove("disable");
    });
}

FilterOption.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".fiter.active").classList.remove("active");
        option.classList.add("active");
        FilterName.innerText = option.innerText;

        switch (option.id) {
            case "brightness":
                FilterSlider.max = 200;
                FilterSlider.value = brightness;
                FilterValue.innerText = `${brightness}%`;
            break;
            case "saturation":
                FilterSlider.max = 200;
                FilterSlider.value = saturation;
                FilterValue.innerText = `${saturation}%`;
            break;
            case "inversion":
                FilterSlider.max = 100;
                FilterSlider.value = inversion;
                FilterValue.innerText = `${inversion}%`;
            break;
            case "grayscale":
                FilterSlider.max = 100;
                FilterSlider.value = grayscale;
                FilterValue.innerText = `${grayscale}%`;
            break;
        default:
            break;
    };
    });
});

const updateFilter = () => {
    FilterValue.innerText = `${FilterSlider.value}%`;
    const selectedFilter = document.querySelector(".fiter.active");//getting the active filter

    switch (selectedFilter.id) {
            case "brightness":
                brightness = FilterSlider.value;
            break;
            case "saturation":
                saturation = FilterSlider.value;
            break;
            case "inversion":
                inversion = FilterSlider.value;
            break;
            case "grayscale":
                grayscale = FilterSlider.value;
            break;
        default:
            break;
    };
    // apply the filter to the image
    applyUpdate();
}

RotateOption.forEach(option => {
    option.addEventListener('click', ()=>{
        switch (option.id) {
            case "left":
                rotate -= 90;
                break;
            case "right":
                rotate += 90;
                break;
            case "hzl":
                flipHoriz = flipHoriz === 1 ? -1 : 1;
                break;
            case "vtl":
                flipVert = flipVert === 1 ? -1 : 1;
                break;
        
            default:
                break;
        }
        applyUpdate();
    });
});

// resetting the filter
const resetfilters = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  flipHoriz = 1;
  flipVert = 1;
  FilterOption[0].click();
  applyUpdate();
}

//saving the image with canvas object
const saveImg = () => {
    const canvas = document.createElement("canvas"); // creating the camvas element
    const ctx = canvas.getContext("2d"); // returning the drawing contex of the image
    canvas.width = previewImg.naturalWidth; //seeting the camvas width
    canvas.height = previewImg.naturalHeight;//setting the canvas height

    //add filters to the canvas
ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
ctx.translate(canvas.width / 2, canvas.height / 2);
if (rotate !== 0) {
    ctx.rotate(rotate * Math.PI / 180);
 }
ctx.scale(flipHoriz, flipVert);
ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

    //downloading the image proper to the pc
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();

}

// checking the file input after loaded.
fileInput.addEventListener("change", LoadImage);
// updating the filter values.
FilterSlider.addEventListener("input",updateFilter);
// triggers the file input that is hidden.
chooseImgButton.addEventListener("click", () => {
    fileInput.click();
});
// save the image that has been edited
saveImage.addEventListener("click", saveImg);
//working on the reset button
resetButton.addEventListener("click", resetfilters);