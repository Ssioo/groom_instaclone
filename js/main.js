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
});

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
            let pk = elem.getAttribute('name');
            $.ajax({
                type: 'POST',
                url: 'data/like.json',
                data: {pk},
                dataType: 'json',
                success: function (response) {
                    let likeCount = document.querySelector('#like-count-' + pk);
                    likeCount.innerHTML = '좋아요 ' + response.like_count + '개';
                },
                error: function (request, status, error) {
                    alert('로그인이 필요합니다.');
                    window.location.replace('https://www.naver.com');
                }
            })

        } else if (elem.matches('[data-name="bookmark"]')){

            let pk = elem.getAttribute('name');
            $.ajax({
                type: 'POST',
                url: 'data/bookmark.json',
                data: {pk},
                dataType: 'json',
                success: function (response) {
                    let bookmarkCount = document.querySelector('#bookmark-count-' + pk);
                    bookmarkCount.innerHTML = '북마크 ' + response.bookmark_count + '개';
                },
                error: function (request, status, error) {
                    alert('로그인이 필요합니다.');
                    window.location.replace('https://www.naver.com');
                }
            });

        } else if (elem.matches('[data-name="comment"]')) {
            let content = document.querySelector('#add-comment-post-37>input[type=text]').value;

            console.log(content);
            if (content.length > 140) {
                alert('댓글은 최대 140자 입력 가능합니다. 현재 글자수 : ' + content.length);
                return;
            }

            $.ajax({
                type: 'POST',
                url: './comment.html',
                data: {
                    'pk': 37 ,
                    'content': content,
                },
                dataType: 'html',
                success: function (data) {
                    document.querySelector('#comment-list-ajax-post-37')
                        .insertAdjacentHTML('afterbegin', data);

                },
                error: function (request, status, error) {
                    alert('문제가 발생했습니다.');

                }
            });

            document.querySelector('#add-comment-post-37>input[type=text]').value = '';

        } else if (elem.matches('[data-name="comment_delete"]')) {

            $.ajax({
                type: 'POST',
                url: 'data/delete.json',
                data: {
                    'pk' : 37
                },
                dataType: 'json',
                success: function (response) {
                    if (response.status) {
                        let comt = document.querySelector('.comment-detail');
                        comt.remove();
                    }
                },
                error: function (request, status, error) {
                    alert('문제가 발생했습니다.');

                }
            });

        } else if (elem.matches('')) {

        }

        elem.classList.toggle('on');
    })
}
