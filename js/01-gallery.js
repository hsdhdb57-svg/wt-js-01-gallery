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


function updateModalImage() {
  refs.modalImgEl.src = galleryItems[currentIndex].original;
  refs.modalImgEl.alt = galleryItems[currentIndex].description;
}