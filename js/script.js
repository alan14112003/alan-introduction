const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const bar = $('.header__bars')
const closee = $('.mobile__bg__close .close')
const mobileBg = $('.mobile__bg')
const allItems = $$('.nav__item')
const backTop = $('.back-top')
const info = $('#info')
const logos = $$('.logo')
const darkmodeBtns = $$('.darkmode')
let theme = localStorage.getItem('darkMode')
// function 
// showMenu
function showMenu(e) {
    e.stopPropagation()
    if(e.target == this.querySelector('i') || e.target == this) {
        bar.classList.toggle('open');
        if(bar.classList.contains('open')) {
            $('.mobile__bg').style='opacity: 1; transform: translateX(0);'
        } else {
            $('.mobile__bg').style='opacity: 0; transform: translateX(100%);'
        }
    }
}

// function đổi active
function changeActive (element) {
    let listItems = element.parentElement.querySelectorAll('.nav__item')
    for (const item of listItems) {
        item.classList.remove('active')
    }
    element.classList.add('active')
    return element
}

function showViewBox(element) {
    let box = document.getElementById(element.innerText.trim().toLowerCase())
    window.scrollTo({
        top: box.offsetTop - 100,
        behavior: 'smooth'
    })
}

function itemHandle(element) {
    element.onclick = ()=> {
        let promise = new Promise((resolve, reject) => {
            resolve(element)
        })
        promise
            .then(changeActive)
            .then(showViewBox)
            .catch(()=> {
                console.log('lỗi')
            })
    }
}

function callHome() {
    const homes = $$('.home')
    homes.forEach((home)=> {
        showViewBox(home)
    })
}

function activeHandle() {
    let active , className
    let boxs = $$('.box')
    
    if(window.scrollY < boxs[0].clientHeight) 
        className = '.home'
    else if (window.scrollY < boxs[0].clientHeight + boxs[1].clientHeight) 
        className = '.tour'
    else if (window.scrollY < boxs[0].clientHeight + boxs[1].clientHeight + boxs[2].clientHeight) 
        className = '.hobbies'
    else if (window.scrollY < boxs[0].clientHeight + boxs[1].clientHeight + boxs[2].clientHeight + boxs[3].clientHeight) 
        className = '.info'
    else 
        className = '.contact'
    active = $$(className)
    active.forEach(changeActive)
}

function showBackTop() {
    if(window.scrollY > 300) {
        backTop.style = 'opacity: 1; z-index: 5;'
    } else {
        backTop.style = 'opacity: 0; z-index: -100;'
    }
}


// function dark mode
function darkmode() {
    if (theme === 'dark') {
        $('body').classList.remove('dark')
        $('.darkbtn').style.display = 'none'
        $('.lightbtn').style.display = 'flex'
        localStorage.setItem('darkMode', 'light')
    } else {
        $('body').classList.add('dark')
        $('.darkbtn').style.display = 'flex'
        $('.lightbtn').style.display = 'none'
        localStorage.setItem('darkMode', 'dark')
    }
}


// call function

bar.onclick = showMenu;
closee.onclick = showMenu;
mobileBg.onclick = showMenu;

logos.forEach ((logo) => {
    logo.onclick = callHome
})
// làm nổi ô chọn
allItems.forEach(itemHandle);

// back button
document.onscroll = ()=> {
    activeHandle()
    showBackTop()
}

backTop.onclick = ()=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}


// darkmode
darkmodeBtns.forEach((darkmodeBtn)=> {
    darkmodeBtn.onclick = darkmode
})