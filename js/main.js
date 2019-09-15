const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');

heart.addEventListener('click', function () {
    heart.classList.toggle('on');
})

window.addEventListener('resize', function () {
    if (matchMedia('screen and (max-width:800px)').matches) {
        for (let i = 0; i < variableWidth.length; i++) {
            variableWidth[i].style.width = window.innerWidth - 20 + 'px';
        }
    } else {
        for (let i = 0; i < variableWidth.length; i++) {
            variableWidth[i].removeAttribute('style');
        }
    }
})

window.addEventListener('scroll', function () {
    if (pageYOffset >= 10){
        header.classList.add('on');
        sidebox.classList.add('on');

        let calcWidth = window.innerWidth / 2 + 167;
        sidebox.style.left = calcWidth + 'px';

    } else{
        header.classList.remove('on');
        sidebox.classList.remove('on');
        sidebox.removeAttribute('style');

    }
});