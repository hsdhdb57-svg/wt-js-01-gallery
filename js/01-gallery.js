import { galleryItems } from './gallery-items.js';

const refs = {
  galleryListEl: document.querySelector('ul.gallery'),
  modalContainerEl: document.querySelector('div.lightbox'),
  lightboxOverlayEl: document.querySelector('div.lightbox__overlay'),
  modalImgEl: document.querySelector('img.lightbox__image'),
  modalCloseBtnEl: document.querySelector('[data-action="close-lightbox"]'),
};

const galleryMarkup = createGalleryMarkup(galleryItems);
refs.galleryListEl.insertAdjacentHTML('beforeend', galleryMarkup);
refs.galleryListEl.addEventListener('click', onGalleryItemClick);
refs.modalCloseBtnEl.addEventListener('click', closeModal);
refs.lightboxOverlayEl.addEventListener('click', closeModal); 

function createGalleryMarkup(galleryItems) {
    return galleryItems
        .map(({preview, original, description}) => {
            return `<li class="gallery__item">
                    <a class="gallery__link" href="${original}">
                        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"/>
                    </a>
                </li>`;
        })
        .join('');
}

// 2.Реалізація делегування на ul.gallery і отримання url великого зображення

function onGalleryItemClick(event) {
    // коли клікаємо на img, відмінюємо по замовчуванню перезавантаження сторінки прівент
    // діє лише на подію(event/e)
    event.preventDefault();

    // 3. Відкриття модального вікна по кліці на елементі галереї.

    const isGalleryEl = event
        .target
        .classList
        .contains('gallery__image');
    if (!isGalleryEl) {
        return;
    }
    refs
        .modalContainerEl
        .classList
        .add('is-open');

    // 4. Підміна значення атрибута src елемента img.lightbox__image.

    refs.modalImgEl.src = event.target.dataset.source;
    refs.modalImgEl.alt = event
        .target
        .getAttribute('alt');

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('keydown', onArrowPress);

}

// 5. Закриття модального вікна по кліці  на кнопку 
// button[data-action="close-lightbox"]

function closeModal() {
    refs
        .modalContainerEl
        .classList
        .remove('is-open');

    // 6. Очищення значення атрибута src елемента img.lightbox__image.
    refs.modalImgEl.src = '';
    refs.modalImgEl.alt = '';

    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('keydown', onArrowPress);
}

refs.lightboxOverlayEl.addEventListener('click', closeModal);
function onEscPress(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
}
refs.lightboxOverlayEl.addEventListener('click', closeModal);

const turnRight = currentIndex => {
    if (currentIndex === galleryItems.length - 1) 
        return;
    const nextImg = galleryItems[currentIndex + 1].original;
    refs
        .modalImgEl
        .setAttribute('src', nextImg);
};

const turnfLeft = currentIndex => {
    if (currentIndex === 0) 
        return;
    const previousImg = galleryItems[currentIndex - 1].original;
    refs
        .modalImgEl
        .setAttribute('src', previousImg);
};

function onArrowPress(event) {
    if (refs.modalContainerEl.classList.contains('is-open')) {
        const currentImg = refs
            .modalImgEl
            .getAttribute('src');
        const currentIndex = galleryItems.indexOf(
            galleryItems.find(item => item.original === currentImg),
        );
        if (event.code === 'ArrowRight') 
            turnRight(currentIndex);
        if (event.code === 'ArrowLeft') 
            turnfLeft(currentIndex);
        }
    }

function updateModalImage() {
  refs.modalImgEl.src = galleryItems[currentIndex].original;
  refs.modalImgEl.alt = galleryItems[currentIndex].description;
}