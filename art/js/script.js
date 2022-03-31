import modals from './modules/modals';
import sliders from './modules/sliders';
import sendData from './modules/forms';
import mask from './modules/mask';
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from './modules/showMoreStyles';
import calc from './modules/calc';
import filter from './modules/filter';
import pictureChange from './modules/pictureChange';
import accordion from './modules/accordion';
import burger from './modules/burger';
import scrolling from './modules/scrolling';
import drop from './modules/drop';

modals();
sliders('.feedback-slider-item', 'horizontal', '.main-prev-btn', '.main-next-btn');
sliders('.main-slider-item', 'vertical');
mask('[name="phone"]');
checkTextInputs('[name="name"]');
checkTextInputs('[name="message"]');
showMoreStyles('.button-styles', '.styles-2');
calc('#size', '#material', '#options', '.promocode', '.calc-price');
filter();
pictureChange('.sizes-block');
accordion('.accordion-heading');
burger('.burger-menu', '.burger');
scrolling('.pageup');
drop();

