
function getData(url) {
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => console.error(error))
}

// burgerMenu

window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header_nav'),
    menuItem = document.querySelectorAll('.header_nav_list_item'),
    burger = document.querySelector('.burger'),
    burgerLine = document.querySelector('.burger_line'),
    backGround = document.querySelector('.wrapper_header');

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
    

    const prevBtn = document.querySelector('.friends_cards_prev'),
    nextBtn = document.querySelector('.friends_cards_next'),
    carouselBlock = document.querySelector('.carousel'),
    leftBlock = document.querySelector('#block-left'),
    rightBlock = document.querySelector('#block-right');

    const moveLeft = () => {
        carouselBlock.classList.add('transition-left');
        prevBtn.removeEventListener('click', moveLeft);
        nextBtn.removeEventListener('click', moveRight);
    }

    const moveRight = () => {
        carouselBlock.classList.add('transition-right');
        nextBtn.removeEventListener('click', moveRight);
        prevBtn.removeEventListener('click', moveLeft);
    }

    prevBtn.addEventListener('click', moveLeft);
    nextBtn.addEventListener('click', moveRight);

    carouselBlock.addEventListener('animationend', (animationEvent) => {
        let changedCard;
        if (animationEvent.animationName === 'move-left') {
            carouselBlock.classList.remove('transition-left');
            changedCard = leftBlock;
            document.querySelector('#block-active').innerHTML = leftBlock.innerHTML;

        } else {
            carouselBlock.classList.remove('transition-right');
            changedCard = rightBlock;
            carouselBlock.classList.remove('transition-left');
            document.querySelector('#block-active').innerHTML = rightBlock.innerHTML;
            leftBlock.innerHTML = document.querySelector('#block-active').innerHTML;
        }

        const promise = getData('./db.json').then(data => {
            let arrPets = [];
          
            data.forEach(pet => {
                const petCard = document.createElement('div');
                petCard.classList.add('friends_cards_block_item');
                petCard.innerHTML = `
                <img src="${pet.img}" alt=${pet.type} class="friends_cards_block_item_img">
                <div id=${pet.name} class="friends_cards_block_item_name">${pet.name}</div>
                <button class="friends_cards_block_item_btn">Learn more</button>
                `
                arrPets.push(petCard);

                // const petBigCard = document.createElement('div');
                // petBigCard.classList.add('modal_pet_window');
                // petBigCard.innerHTML = `
                //     <div class="close_btn">x</div>
                //     <div class="pet_info">
                //         <img src="${pet.img}" alt=${pet.type} class="pet_info_img">
                //         <div class="pet_info_text">
                //             <h2 class="pet_title">${pet.name}</h2>
                //             <span class="pet_subtitle">${pet.type} - ${pet.breed}</span>
                //             <span class="pet_descr">${pet.description}</span>
                //             <ul class="pet_list">
                //                 <li class="pet_list_item"><b>Age</b>${pet.age}</li>
                //                 <li class="pet_list_item"><b>Inoculations</b>${pet.inoculations}</li>
                //                 <li class="pet_list_item"><b>Diseases</b>${pet.diseases}</li>
                //                 <li class="pet_list_item"><b>Parasites</b>${pet.parasites}</li>
                //             </ul>
                //         </div>
                //     </div>
                // `
                // 
            })
            return arrPets;
        }).catch(error => console.error(error));
        promise.then(arrPets => {
            changedCard.innerHTML = '';
            const range = 7;
            const count = 3;
            let mas = {};
            let arr = [];
            for (let i = 0; i < count; ++i) {
                let r = Math.floor(Math.random()*(range - i));
                arr.push(((r in mas) ? mas[r] : r) + 1 );
                let l = range - i - 1;
                mas[r] = (l in mas) ? mas[l]: l;
            }
            changedCard.appendChild(arrPets[arr[0]]);
            changedCard.appendChild(arrPets[arr[1]]);
            changedCard.appendChild(arrPets[arr[2]]);                
            prevBtn.addEventListener('click', moveLeft);
            nextBtn.addEventListener('click', moveRight);
        })
    })

    // modal 

    const petCardInfo = document.querySelectorAll('.friends_cards_block_item');
    

})


