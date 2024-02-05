let gridSize = 16;

function onCreateGridButtonClick()
{
    console.log("Create grid Button");
    let newGridSizeString = prompt("Set Grid Size (2-100)", gridSize);

    if(newGridSizeString == null)
    {
        return;
    }

    var newGridSize = parseInt(newGridSizeString);

    if(newGridSize == null || newGridSize == NaN)
    {
        return;
    }

    if (newGridSize < 2)
    {
        return;
    }

    gridSize = newGridSize;
    generateGrid();
}

function onResetClick()
{
    console.log("Reset");
    generateGrid();
}

function generateGrid()
{
    const container = document.getElementById('container');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    var size = (container.offsetWidth/(gridSize)/container.offsetWidth) * 100 + "%";

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const content = document.createElement('div');
            content.classList.add('etchCell');
            content.style.width = size;
            content.style.height = size;
            content.onmouseover = (e) => {
                changeCellColor(e.target);
            }
            container.appendChild(content);
            console.log("Create cell");
        }
    }
}

function changeCellColor(cell)
{
    cell.style['background-color'] = "black";
}