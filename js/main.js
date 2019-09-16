const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');


setTimeout(function () {
    scrollTo(0, 0);
}, 100)

window.addEventListener('resize', function () {
    if (matchMedia('screen and (max-width:800px)').matches) {
        for (let i = 0; i < variableWidth.length; i++) {
            variableWidth[i].style.width = window.innerWidth - 20 + 'px';
        }
    } else {
        for (let i = 0; i < variableWidth.length; i++) {
            if (window.innerWidth > 600) {
                variableWidth[i].removeAttribute('style');
            }
        }
    }
})

window.addEventListener('scroll', function () {
    if (pageYOffset >= 10){
        header.classList.add('on');
        if (sidebox) {
            sidebox.classList.add('on');
            let calcWidth = window.innerWidth / 2 + 167;
            sidebox.style.left = calcWidth + 'px';
        }
    } else{
        header.classList.remove('on');
        if (sidebox) {
            sidebox.classList.remove('on');
            sidebox.removeAttribute('style');
        }

    }
});

if (delegation) {
    delegation.addEventListener('click', function (e) {
        let elem = e.target;

        while (!elem.getAttribute('data-name')){
            elem = elem.parentNode;
            if (elem.nodeName === 'BODY') {
                elem = null;
                return;
            }
        }
        if (elem.matches('[data-name="heartbeat"]')){

        } else if (elem.matches('[data-name="bookmark"]')){

        } else if (elem.matches('[data-name="share"]')){

        } else if (elem.matches('[data-name="more"]')){

        }

        elem.classList.toggle('on');
    })
}
