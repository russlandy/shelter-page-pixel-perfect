// burgerMenu

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header_nav'),
    menuItem = document.querySelectorAll('.header_nav_list_item'),
    burger = document.querySelector('.burger'),
    burgerLine = document.querySelector('.burger_line'),
    backGround = document.querySelector('.body_wrapper');

    burger.addEventListener('click', () => {
        backGround.classList.toggle('active');
        burgerLine.classList.toggle('active');
        menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else document.body.style.overflow = '';
    });
    
    menuItem.forEach( item => {
        item.addEventListener('click', () => {
            backGround.classList.toggle('active');
            burgerLine.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        })
    });

    menu.addEventListener('click', event => {
        event.isClickOnMenu = true;
    });
    burger.addEventListener('click', event => {
        event.isClickOnMenu = true;
    });

    document.body.addEventListener('click', event => {
        if (event.isClickOnMenu) return;
        backGround.classList.remove('active');
        burgerLine.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
    })

    //slider

    
})

