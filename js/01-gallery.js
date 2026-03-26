import { galleryItems } from './gallery-items.js';

const refs = {
  galleryListEl: document.querySelector('ul.gallery'),
  modalContainerEl: document.querySelector('div.lightbox'),
  lightboxOverlayEl: document.querySelector('div.lightbox__overlay'),
  modalImgEl: document.querySelector('img.lightbox__image'),
  modalCloseBtnEl: document.querySelector('[data-action="close-lightbox"]'),
};

// Створення розмітки галереї
function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img 
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
    })
    .join('');
}

// Рендер галереї
refs.galleryListEl.insertAdjacentHTML(
  'beforeend',
  createGalleryMarkup(galleryItems)
);

// Делегування події кліку
refs.galleryListEl.addEventListener('click', onGalleryItemClick);
refs.modalCloseBtnEl.addEventListener('click', closeModal);
refs.lightboxOverlayEl.addEventListener('click', closeModal);

let currentIndex = 0;

// Клік по зображенню
function onGalleryItemClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const currentSrc = event.target.dataset.source;

  // Знаходимо індекс поточного зображення
  currentIndex = galleryItems.findIndex(
    item => item.original === currentSrc
  );

  openModal(event.target);
}

// Відкриття модального вікна
function openModal(img) {
  refs.modalContainerEl.classList.add('is-open');

  refs.modalImgEl.src = img.dataset.source;
  refs.modalImgEl.alt = img.alt;

  document.addEventListener('keydown', onEscPress);
  document.addEventListener('keydown', onArrowPress);
}

// Закриття модального вікна
function closeModal() {
  refs.modalContainerEl.classList.remove('is-open');

  refs.modalImgEl.src = '';
  refs.modalImgEl.alt = '';

  document.removeEventListener('keydown', onEscPress);
  document.removeEventListener('keydown', onArrowPress);
}

// Закриття по ESC
function onEscPress(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Перемикання зображень стрілками
function onArrowPress(event) {
  if (!refs.modalContainerEl.classList.contains('is-open')) return;

  if (event.code === 'ArrowRight') {
    if (currentIndex < galleryItems.length - 1) {
      currentIndex++;
      updateModalImage();
    }
  }

  if (event.code === 'ArrowLeft') {
    if (currentIndex > 0) {
      currentIndex--;
      updateModalImage();
    }
  }
}

// Оновлення зображення в модалці
function updateModalImage() {
  refs.modalImgEl.src = galleryItems[currentIndex].original;
  refs.modalImgEl.alt = galleryItems[currentIndex].description;
}