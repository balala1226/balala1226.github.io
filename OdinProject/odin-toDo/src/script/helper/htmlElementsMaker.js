export function newDiv(className="", id=""){
    const newDiv = document.createElement("div");

    if (className != "" && className != "-"){
        newDiv.className = className;
    }

    if (id !=  "" && id != "-"){
        newDiv.id = id;
    }

    return newDiv;
}

export function newP(text="",className="", id=""){
    const newP = document.createElement("p");

    if (text != "" && text != "-"){
        newP.innerHTML = text;
    }

    if (className != "" && className != "-"){
        newP.className = className;
    }

    if (id != "" && id != "-"){
        newP.id = id;
    }

    return newP;
}

export function newImg(imgSrc, className="", id=""){
    const newImg = new Image();
    newImg.src = imgSrc;

    if (className != "" && className != "-"){
        newImg.className = className;
    }

    if (id != "" && id != "-"){
        newImg.id = id;
    }

    return newImg;
}

export function newButton(className="",id="") {
    const newButton = document.createElement("button");

    if (className != "" && className != "-"){
        newButton.className = className;
    }

    if (id != "" && id != "-"){
        newButton.id = id;
    }

    return newButton;
}

export function newInput(type, className, id, isRequired) {
    const newInput = document.createElement('input');
    newInput.type = type;

    if (className != "" && className != "-"){
        newInput.className = className;
    }

    if (id != "" && id != "-"){
        newInput.id = id;
    }

    newInput.required = isRequired;

    return newInput;
}