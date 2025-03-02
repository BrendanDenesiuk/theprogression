preload = 5;
const numOfPages = 60;
const numOfPapers = Math.ceil(numOfPages / 2);

let currentLocation = 0;
const book = document.createElement('div');
book.className = 'book';

let pages = [];
let papers = [];
for (let p = 0; p < numOfPages; p++) {
    if (p % 2 === 0) {
        pages[p] = document.createElement('div');
        pages[p].className = 'front';
        const frontContent = document.createElement('img');
        frontContent.className = 'front-content';
        if (p < preload) {
            frontContent.src = 'assets/book/The Progression - Single Pages' + (p + 1) + '.png';
        }
        pages[p].appendChild(frontContent)
    } else {
        pages[p] = document.createElement('div');
        pages[p].className = 'back';
        const backContent = document.createElement('img');
        backContent.className = 'back-content';
        if (p < preload) {
            backContent.src = 'assets/book/The Progression - Single Pages' + (p + 1) + '.png';
        }
        pages[p].appendChild(backContent)

        papers[(p - 1) / 2] = document.createElement('div');
        papers[(p - 1) / 2].className = 'paper';
        papers[(p - 1) / 2].id = '#p' + Math.floor(p / 2)
        papers[(p - 1) / 2].style.zIndex = (numOfPapers - Math.floor(p / 2)).toString();
        papers[(p - 1) / 2].appendChild(pages[p - 1]);
        papers[(p - 1) / 2].appendChild(pages[p]);
        book.appendChild(papers[(p - 1) / 2]);
    }
}

const nextbutton = document.createElement('button');
nextbutton.id = 'nextbutton';
nextbutton.style.zIndex = (numOfPapers+1).toString();
nextbutton.textContent = '>';

const prevbutton = document.createElement('button');
prevbutton.id = 'prevbutton';
prevbutton.style.zIndex = (numOfPapers+1).toString();
prevbutton.textContent = '<';

nextbutton.addEventListener('click', goNextPage)
prevbutton.addEventListener('click', goPrevPage)

document.body.appendChild(prevbutton);
document.body.appendChild(book);
document.body.appendChild(nextbutton);

function openBook() {
    book.style.transform = 'translateX(50%)';
    prevbutton.style.transform = 'translateX(-200px)';
    nextbutton.style.transform = 'translateX(200px)';
}

function closeBook(isAtBeginning) {
    if(isAtBeginning) {
        book.style.transform = 'translateX(0%)';
    } else {
        book.style.transform = 'translateX(100%)';
    }
    prevbutton.style.transform = 'translateX(0px)';
    nextbutton.style.transform = 'translateX(0px)';
}

function goNextPage() {
    if(currentLocation < numOfPapers) {
        if (currentLocation === 0) {openBook()}

        if (2*currentLocation+preload < numOfPages) {
            var page1 = pages[2 * currentLocation + preload].firstElementChild
            page1.src = 'assets/book/The Progression - Single Pages' + (2 * currentLocation + preload + 1) + '.png';
        }
        if (2*currentLocation+preload+1 < numOfPages){
            var page2 = pages[2*currentLocation+preload+1].firstElementChild
            page2.src = 'assets/book/The Progression - Single Pages' + (2*currentLocation+preload+2)+'.png';
        }

        papers[currentLocation].classList.add('flipped');
        papers[currentLocation].style.zIndex = currentLocation;

        if (currentLocation === numOfPapers-1) {closeBook(false)}
        currentLocation++;
    }
}

function goPrevPage() {
    if(currentLocation > 0) {
        if (currentLocation === 1) {closeBook(true)}
        papers[currentLocation-1].classList.remove('flipped');
        papers[currentLocation-1].style.zIndex = numOfPapers-(currentLocation-1);
        if (currentLocation === numOfPapers) {openBook()}
        currentLocation--;
    }
}

document.addEventListener('keydown', function(event) {
    switch(event.key){
        case 'ArrowLeft':
            goPrevPage();
            break;
        case 'ArrowRight':
            goNextPage();
            break;
        default:
            break;
    }
});