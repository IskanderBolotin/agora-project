// начало - полифил для edge
(function (ELEMENT) {
	ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;
	ELEMENT.closest = ELEMENT.closest || function closest(selector) {
		if (!this) return null;
		if (this.matches(selector)) return this;
		if (!this.parentElement) { return null }
		else return this.parentElement.closest(selector)
	};
}(Element.prototype));
// конец - полифил для edge
let product__hover = true;
let supportsTouch = ('ontouchstart' in document.documentElement);
window.addEventListener("load", function () {
	$(".loader-frame").removeClass("__loading");
	$("body").on("mouseenter", ".productItem", function () {
		if (product__hover) {
			if (!supportsTouch) {
				let el_height = $(this).outerHeight();
				let el_width = $(this).outerWidth();
				if (!$(this).hasClass("productItem-clone")) {
					let element__copy = $(this).clone();
					$(this).addClass("__current");
					element__copy.css("position", "absolute");
					if ($(this).parents(".productSlider__item").length != 0) {
						element__copy.css("width", el_width + 1 + "px");
					}
					else {
						element__copy.css("width", el_width + 2 + "px");
					}
					element__copy.css("min-height", el_height + "px");
					element__copy.css("top", $(this).offset().top - 1 + "px");
					element__copy.css("left", $(this).offset().left - 1 + "px");
					element__copy.addClass("__hover-clone");
					element__copy.addClass("productItem-clone");
					element__copy.appendTo("body");
					$(this).attr("aria-expanded", "true");
					product__hover = false;
				}
			}
		}
	});
	$("body").on("mouseleave", ".productItem-clone", function () {
		if (!supportsTouch) {
			$(this).remove();
			$(".productItem.__current").attr("aria-expanded", "false");
			$(".productItem.__current").removeClass("__current");
			product__hover = true;
		}
	});
});
$(document).ready(function() {
	if (supportsTouch) {
		$('body').addClass("__touch-on");

		$(".open--next-level").on("click", function(){
			let _this = $(this).parents(".catalogMenuList__item");
			$(this).closest(".catalogMenuList").find(".catalogMenuList__item").each(function(){
				if (_this[0] != $(this)[0]) {
					$(this).removeClass("__active");
					$(this).find(".open--next-level").attr("aria-expanded", "false");
				}
			});
			if ($(this).closest(".catalogMenuList__item").hasClass("__active")) {
				$(this).closest(".catalogMenuList__item").removeClass("__active");
				$(this).attr("aria-expanded", "false");
			}
			else {
				$(this).closest(".catalogMenuList__item").addClass("__active");
				$(this).attr("aria-expanded", "true");
			}
		});
		$(".backButton").on("click", function() {
			$(this).closest(".catalogMenuList__item").removeClass("__active");
			$(this).closest(".catalogMenuList__item").find(".open--next-level").attr("aria-expanded", "false");
		});

		$(".basketLink").on("click", function(e) {
			e.preventDefault();
			let dialog = document.getElementById('basket-modal');
			let openButton = $(this)[0];
			if ($(this).parents(".basketLink__wrapper").hasClass("__open")) {
				$(this).parents(".basketLink__wrapper").removeClass("__open");
				$("#basket-button").attr("aria-expanded", "false");
				$(".overalyScreen").removeClass("__open");
				focusManager.release(openButton);
			}
			else {
				$(".flexibleMiddle__item-search").removeClass("__open");
				$(this).parents(".basketLink__wrapper").addClass("__open");
				$("#basket-button").attr("aria-expanded", "true");
				$(".overalyScreen").addClass("__open");
				focusManager.capture(dialog, openButton);
			}
		});
	}
	else {
		$('body').addClass("__hover-on");
	}

	if (!supportsTouch) {
		$("body").on("click", ".open--next-level.focus-visible", function(){
			let _this = $(this).parents(".catalogMenuList__item");
			$(this).parents(".catalogMenuList").find(".catalogMenuList__item").each(function(){
				if (_this[0] != $(this)[0]) {
					$(this).removeClass("__active");
					$(this).find(".open--next-level").attr("aria-expanded", "false");
				}
			});
			$(this).parents(".catalogMenuList").find(".catalogMenuList__item").each(function(){

			});
			if (!$(this).parents(".catalogMenuList__item").hasClass("__active")) {
				$(this).parents(".catalogMenuList__item").addClass("__active");
				$(this).attr("aria-expanded", "true");
			}
			else {
				$(this).parents(".catalogMenuList__item").removeClass("__active");
				$(this).attr("aria-expanded", "false");
			}
		});	
	}
	
	$("[type='tel']").mask("+7 (999) 999-99-99");

	$("body").on("click", "[data-close-box]", function () {
		$(this).parent().hide();
	});
	$("body").on("click", ".show--map", function () {
		let text = $(this).attr("data-text");
		$(this).attr("data-text", $(this).text());
		$(this).text(text);
		if ($(this).hasClass("__active")) {
			$(this).removeClass("__active");
			$(this).parents(".location-wrapper").find(".location-map").slideUp();
			$(".mapPostList-wrapper").customScroll('destroy');
		}
		else {
			$(this).addClass("__active");
			$(this).parents(".location-wrapper").find(".location-map").slideDown(function(){
				$(".mapPostList-wrapper").customScroll({
					vertical: true,
					horizontal: false,
					trackWidth: 6,
					trackHeight: 6,
				});
			});
		}
	});
	$("body").on("click", "[data-collapsed-btn]", function () {
		let text = $(this).attr("data-text");
		$(this).attr("data-text", $(this).text());
		$(this).text(text);
		if ($(this).hasClass("__active")) {
			$(this).removeClass("__active");
			$(this).parents("[data-collapsed-parent]").find("[data-collapsed-item]").slideUp();
		}
		else {
			$(this).addClass("__active");
			$(this).parents("[data-collapsed-parent]").find("[data-collapsed-item]").slideDown();
		}
	});

	$("body").on("click", "[data-open-dropdown]", function() {
		if ($(this).hasClass("__active")) {
			$(this).removeClass("__active");
			$(this).parents("[data-dropdown-parents]").find("[data-dropdown-list]").removeClass("__open");
		}
		else {
			$(this).addClass("__active");
			$(this).parents("[data-dropdown-parents]").find("[data-dropdown-list]").addClass("__open");
		}	
	});
	$(".open--catalog").on("click", function(){
		let dialog = document.getElementById('catalog-modal');
		let openButton = $(this).find(".catalogButton__Btn")[0];
		let firstFocus = openButton;
		$(".catalogMenuList__item").removeClass("__active");
		if ($(this).hasClass("__active")) {
			$(this).removeClass("__active");
			$(this).parents(".catalogInteractive").find(".open--next-level").attr("aria-expanded", "false");
			$(this).find(".catalogButton__Btn").attr("aria-label", "Открыть каталог");
			$(this).find(".catalogButton__Btn").attr("aria-expanded", "false");
			$(this).parents(".catalogInteractive").find("#catalog-collapse").removeClass("__open");
			$(".overalyScreen").removeClass("__open");
			focusManager.release(openButton);
		}
		else {
			$(this).addClass("__active");
			$(this).find(".catalogButton__Btn").attr("aria-label", "Закрыть каталог");
			$(this).find(".catalogButton__Btn").attr("aria-expanded", "true");
			$(this).parents(".catalogInteractive").find("#catalog-collapse").addClass("__open");
			$(".overalyScreen").addClass("__open");
			focusManager.capture(dialog, firstFocus);
		}
	});
	let arrow = ['<svg width="6" height="10" viewBox="0 0 6 10" style="enable-background:new 0 0 6 10;">', '<g id="arrow_left_icon">',
	'<polygon class="st0" points="6,8.8 4.9,10 0,5 4.9,0 6,1.2 2.3,5"></polygon></g></svg>'].join("");
		
	$('.sliderBox').on('init', function (event, slick, currentSlide, nextSlide) {
		if (slick.slideCount < 10) {
			$(this).parents(".mainSlider-wrapper").find(".sliderCounter").find(".sliderCounter__max").text("0" + slick.slideCount);
		}
		else {
			$(this).parents(".mainSlider-wrapper").find(".sliderCounter").find(".sliderCounter__max").text(slick.slideCount);
		}
	});
	$(".extraMenuElement--search").on("click", function() {
		let dialog = $(".flexibleMiddle__item-search")[0];
		let openButton = $(this)[0];
		if ($(this).parents(".flexibleMiddle").find(".flexibleMiddle__item-search").hasClass("__open")) {
			$(this).parents(".flexibleMiddle").find(".flexibleMiddle__item-search").removeClass("__open");
			$(".overalyScreen").removeClass("__open");
			focusManager.release(openButton);
		}
		else {
			$("#basket-button").removeClass("__open");
			$("#basket-button").attr("aria-expanded", "false");
			$(this).parents(".flexibleMiddle").find(".flexibleMiddle__item-search").addClass("__open");
			setTimeout(function() {
				$(".overalyScreen").addClass("__open");		
			}, 0)
			focusManager.capture(dialog);
		}
		$(this).parents(".flexibleMiddle").find(".flexibleMiddle__item-search").find(".searchBox__input").val("");
	});
	$(".searchBox__close").on("click", function(e) {
		e.preventDefault();
		$(this).parents(".flexibleMiddle__item-search").removeClass("__open");
		$(this).parents(".flexibleMiddle__item-search").find(".searchBox__input").val("");
		$(".overalyScreen").removeClass("__open");
	});			
	$(".sliderBox").each(function(){
		let _this = $(this);
		$(this).slick({
		    slidesToShow: 1,
		    slidesToScroll: 1,
		    arrows: true,
		    vertical: true,
		    verticalSwiping: true,
		    appendArrows: _this.parents(".mainSlider-wrapper").find(".mainSlider-arrows"),
		    prevArrow: '<button type="button" class="sliderBtn sliderBtn-prev" aria-label="Слайд назад">' + arrow + '</button>',
            nextArrow: '<button type="button" class="sliderBtn sliderBtn-next" aria-label="Слайд вперед">' + arrow + '</button>',
            responsive: [
				{
				breakpoint: 1140,
				settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						vertical: false,
		    			verticalSwiping: false,
					}
				},
			]
		});
	});
	$('.sliderBox').on('afterChange', function (event, slick, currentSlide, nextSlide) {
		let num = currentSlide + 1
		if (num < 10) {
			$(this).parents(".mainSlider-wrapper").find(".sliderCounter").find(".sliderCounter__cur").text("0" + num);
		}
		else {
			$(this).parents(".mainSlider-wrapper").find(".sliderCounter").find(".sliderCounter__cur").text(num);
		}
	});
	

	$(".productSlider").each(function(){
		let _this = $(this);
		$(this).on('init', function (event, slick, currentSlide, nextSlide) {
			let part_width = 100 / slick.slideCount;
			let cur_width = part_width;
			$(this).parents(".productBox").find(".sliderLoad__inner").css("width", cur_width +"%");
		});
		$(this).slick({
			slidesToShow: 5,
			slidesToScroll: 1,
			arrows: true,
			swipeToSlide: true,
			appendArrows: _this.parents(".productBox").find(".product-arrows"),
			prevArrow: '<button type="button" class="product-arrow product-arrow-prev" aria-label="Слайд назад">' + arrow + "</button>",
			nextArrow: '<button type="button" class="product-arrow product-arrow-next" aria-label="Слайд вперед">' + arrow + "</button>",
			responsive: [
				{
					breakpoint: 1401,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 1140,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
					},
				},
					{
					breakpoint: 716,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					},
				},
			],
		});
		$(this).find(".productSlider__item").each(function () {
			if ($(this).hasClass('slick-active')) {
				$(this).find(".productItem").attr("tabindex", "0");
			}
			else {
				$(this).find(".productItem").attr("tabindex", "-1");
			}
		});
		$(this).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
			product__hover = false;
			$(".productItem-clone").remove();
			$(".productItem.__current").attr("aria-expanded", "false");
			$(".productItem.__current").removeClass("__current");
		});
		$(this).on('afterChange', function (event, slick, currentSlide, nextSlide) {
			let part_width = 100 / slick.slideCount;
			let cur_width = part_width * (currentSlide + 1);
			$(this).parents(".productBox").find(".sliderLoad__inner").css("width", cur_width +"%");
			product__hover = true;
			$(this).find(".productSlider__item").each(function () {
				if ($(this).hasClass('slick-active')) {
					$(this).find(".productItem").attr("tabindex", "0");
				}
				else {
					$(this).find(".productItem").attr("tabindex", "-1");
				}
			});
		});
	});
	$(".productViewd").each(function() {
		let _this = $(this);
		$(this).on('init', function (event, slick, currentSlide, nextSlide) {
			let part_width = 100 / slick.slideCount;
			let cur_width = part_width;
			$(this).parents(".productBox").find(".sliderLoad__inner").css("width", cur_width +"%");
		});
		$(this).slick({
		    slidesToShow: 7,
		    slidesToScroll: 1,
		    arrows: true,
		    swipeToSlide: true,
		    appendArrows: _this.parents(".productBox").find(".product-arrows"),
		    prevArrow: '<button type="button" class="product-arrow product-arrow-prev" aria-label="Слайд назад">' + arrow + '</button>',
            nextArrow: '<button type="button" class="product-arrow product-arrow-next" aria-label="Слайд вперед">' + arrow + '</button>',
            responsive: [
				{
				breakpoint: 1401,
				settings: {
						slidesToShow: 6,
						slidesToScroll: 1,
					}
				},
				{
				breakpoint: 1301,
				settings: {
						slidesToShow: 5,
						slidesToScroll: 1,
					}
				},
				{
				breakpoint: 1140,
				settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
					}
				},
				{
				breakpoint: 767,
				settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
					}
				},
				{
				breakpoint: 568,
				settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					}
				},
			]
		});
		$(this).on('afterChange', function (event, slick, currentSlide, nextSlide) {
			let part_width = 100 / slick.slideCount;
			let cur_width = part_width * (currentSlide + 1);
			$(this).parents(".productBox").find(".sliderLoad__inner").css("width", cur_width +"%");
		});
	});

	$(".compareSlider").each(function() {
		let _this = $(this);
		$(this).on('init', function (event, slick, currentSlide, nextSlide) {
			let part_width = 100 / slick.slideCount;
			let cur_width = part_width;
			$(this).parents(".productBox").find(".sliderLoad__inner").css("width", cur_width +"%");
		});
		$(this).slick({
		    slidesToShow: 4,
		    slidesToScroll: 1,
		    arrows: true,
		    swipeToSlide: true,
		    appendArrows: _this.parents(".productBox").find(".product-arrows"),
		    prevArrow: '<button type="button" class="product-arrow product-arrow-prev" aria-label="Слайд назад">' + arrow + '</button>',
            nextArrow: '<button type="button" class="product-arrow product-arrow-next" aria-label="Слайд вперед">' + arrow + '</button>',
            responsive: [
				{
				breakpoint: 1401,
				settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
					}
				},
				{
				breakpoint: 1140,
				settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					}
				},
			]
		});
		$(this).on('afterChange', function (event, slick, currentSlide, nextSlide) {
			let part_width = 100 / slick.slideCount;
			let cur_width = part_width * (currentSlide + 1);
			$(this).parents(".productBox").find(".sliderLoad__inner").css("width", cur_width +"%");
		});
	});

	$(".articlesSlider").each(function () {
		let _this = $(this);
		$(this).on('init', function (event, slick, currentSlide, nextSlide) {
			let part_width = 100 / slick.slideCount;
			let cur_width = part_width;
			$(this).parents(".productBox").find(".sliderLoad__inner").css("width", cur_width + "%");
		});
		$(this).slick({
			slidesToShow: 2,
			slidesToScroll: 1,
			arrows: true,
			swipeToSlide: true,
			appendArrows: _this.parents(".productBox").find(".product-arrows"),
			prevArrow: '<button type="button" class="product-arrow product-arrow-prev" aria-label="Слайд назад">' + arrow + '</button>',
			nextArrow: '<button type="button" class="product-arrow product-arrow-next" aria-label="Слайд вперед">' + arrow + '</button>',
			responsive: [
				{
					breakpoint: 1401,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				}
			]
		});
		$(this).on('afterChange', function (event, slick, currentSlide, nextSlide) {
			let part_width = 100 / slick.slideCount;
			let cur_width = part_width * (currentSlide + 1);
			$(this).parents(".productBox").find(".sliderLoad__inner").css("width", cur_width + "%");
		});
	});

	$(".toTopBtn").on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, '300');
	});
	$(window).scroll(function() {     
		if ($(window).scrollTop() > 300) {
			$(".toTopBtn").addClass('__show');
		} 
		else {
			$(".toTopBtn").removeClass('__show');
		}
	});
	$(".catalogSort__select").select2({
		minimumResultsForSearch: -1,
		width: "100%",
	});
	$(".customSelect").select2({
		minimumResultsForSearch: -1,
		width: "100%",
	});
	
	$(".open--brand").on("click", function(){
		let cur_text = $(this).text();
		$(this).text($(this).attr("data-text"))
		$(this).attr("data-text", cur_text);
		if ($(this).parents(".brandBox-wrapper").find(".brandList").hasClass("__open")) {
			$(this).parents(".brandBox-wrapper").find(".brandList").removeClass("__open");
			$(this).attr("aria-expanded", false);
		}
		else {
			$(this).parents(".brandBox-wrapper").find(".brandList").addClass("__open");
			$(this).attr("aria-expanded", true);
		}
	});
	$(".open--category").on("click", function(){
		let cur_text = $(this).text();
		$(this).text($(this).attr("data-text"))
		$(this).attr("data-text", cur_text);
		if ($(this).parents(".category-wrapper").find(".categoryList").hasClass("__open")) {
			$(this).parents(".category-wrapper").find(".categoryList").removeClass("__open");
			$(this).attr("aria-expanded", false);
		}
		else {
			$(this).parents(".category-wrapper").find(".categoryList").addClass("__open");
			$(this).attr("aria-expanded", true);
		}
	});
	$("body").on("click", ".filter--open", function () {
		$(".catalogMain__side").addClass("__open");
		$(".overalyScreen").removeClass("overalyScreen-header");
		$(".overalyScreen").addClass("__open");
	});
	$("body").on("click", ".filter--close", function () {
		$(".catalogMain__side").removeClass("__open");
		$(".overalyScreen").removeClass("__open");
		$(".overalyScreen").addClass("overalyScreen-header");
		focusManager.release($(".filter--open")[0]);
	});
	$(".open--tag").on("click", function () {
		let cur_text = $(this).find(".btn-text").text();
		$(this).find(".btn-text").text($(this).attr("data-text"))
		$(this).attr("data-text", cur_text);
		$(this).toggleClass("__active");
		$(this).parents(".tag-wrapper").find(".tag-wrapper__collapse").toggleClass("__open");
	});
	$(".open--text").on("click", function(){
		let cur_text = $(this).find(".btn-text").text();
		$(this).find(".btn-text").text($(this).attr("data-text"))
		$(this).attr("data-text", cur_text);
		$(this).toggleClass("__active");
		$(this).parents(".textBlock").find(".textBlock__collapsed").toggleClass("__open");
	});
	$(".open--mobile-menu").on("click", function(){
		let dialog = $('.mobileMenuInteractive')[0];
		let open_modal = $(this)[0];
		if ($(this).hasClass("__active")) {
			$(this).removeClass("__active");
			$(this).attr("aria-expanded", "false");
			$(this).parents(".flexibleBottom__item-mobile").find(".overaly-bg").removeClass("__open");
			$(this).parents(".flexibleBottom").find(".mobileMenuCollapsed").removeClass("__open");
			focusManager.release(open_modal);
		}
		else {
			$(this).addClass("__active");
			$(this).attr("aria-expanded", "true");
			$(this).parents(".flexibleBottom__item-mobile").find(".overaly-bg").addClass("__open");
			$(this).parents(".flexibleBottom").find(".mobileMenuCollapsed").addClass("__open");
			focusManager.capture(dialog);
		}
	});
	$(".open--next").on("click", function(){
		if (!$(this).hasClass("__active")) {
			$(this).addClass("__active");
			$(this).parents(".footerMenu").find(".open--this").slideDown();
		}
		else {
			$(this).removeClass("__active");
			$(this).parents(".footerMenu").find(".open--this").slideUp(function(){
				$(this).attr("style", "");
			});
		}
	});
	$("body").on("click", "[data-map-item]", function() {
		if (!$(this).hasClass('mapItem-active')) {

			$(this).parents("[data-map-parent]").find("[data-map-item]").removeClass('mapItem-active');
			$(this).addClass('mapItem-active');
		}
	});
	$("body").on("click", "[data-toggle-name]", function() {
		let data_text = $(this).attr("data-text");
		$(this).attr("data-text", $(this).text());
		$(this).text(data_text);
	});
	
	$(window).on("resize", function () {
		$(".productItem.productItem-clone").remove();
		$(".productItem.__current").attr("aria-expanded", "false");
		$(".productItem.__current").removeClass("__current");
		product__hover = true;
	});
	let horiz_scroll = false;

	if ($(window).outerWidth() <= 600) {
		$(".horizontalScroll").customScroll({
			vertical: true,
			horizontal: true,
			trackWidth: 6,
			trackHeight: 6,
			offsetRight: 10,
		});
		horiz_scroll = true;
	}
	
	$(window).on("resize", function() {
		if (!horiz_scroll) {
			if ($(window).outerWidth() <= 600) {
				$(".horizontalScroll").customScroll({
					vertical: true,
					horizontal: true,
					trackWidth: 6,
					trackHeight: 6,
					offsetRight: 10,
				});
				horiz_scroll = true;
			}
		}
		if (!horiz_scroll) {
			if ($(window).outerWidth() > 600) {
				$(".horizontalScroll").customScroll('destroy');
				horiz_scroll = false;
			}
		}
	})

	let basket_focus = false;

	document.addEventListener('keydown', function(event) {
		$(".productItem").each(function(){
			if ($(this).hasClass("focus-visible")) {
				if (event.code == 'Enter' || event.code == 'Space' || event.key == 'Enter' ||  event.key == ' ') {
					if ($(this).hasClass("__hover-clone")) {
						$(".productItem.__current").attr("aria-expanded", "false");
						$(this).remove();
						focusManager.release($(".productItem.__current")[0]);
						$(".productItem").removeClass("__current");
						$(this).attr("aria-expanded", "false");
						product__hover = true;
					}
					else {
						let el_height = $(this).outerHeight();
						let el_width = $(this).outerWidth();
						if (!$(this).hasClass("productItem-clone")) {
							let element__copy = $(this).clone();
							$(this).addClass("__current");
							element__copy.css("position", "absolute");
							if ($(this).parents(".productSlider__item").length != 0) {
								element__copy.css("width", el_width + 1 + "px");
							}
							else {
								element__copy.css("width", el_width + 2 + "px");
							}
							$(this).attr("aria-expanded", "true");
							element__copy.css("min-height", el_height + "px");
							element__copy.css("top", $(this).offset().top - 1 + "px");
							element__copy.css("left", $(this).offset().left - 1 + "px");
							element__copy.addClass("__hover-clone");
							element__copy.addClass("productItem-clone");
							element__copy.appendTo("#product-overlay");
							focusManager.capture(element__copy[0]);
							product__hover = false;
						}
					}
					
				}
			}
		});
	});
	document.addEventListener('keydown', function(event) {
		if (basket_focus) {
			if (event.code == 'Enter' || event.code == 'Space' || event.key == 'Enter' ||  event.key == ' ') {
				event.preventDefault();
				let dialog = document.getElementById('basket-modal');
				let open_modal = document.getElementById('basket-button');
				let firstFocus = open_modal;
				if ($("#basket-button").hasClass("__open")) {
					$("#basket-button").removeClass("__open");
					$("#basket-button").attr("aria-expanded", "false");
					$(".overalyScreen").removeClass("__open");
					focusManager.release(open_modal);
				}
				else {
					$("#basket-button").addClass("__open");
					$("#basket-button").attr("aria-expanded", "true");
					focusManager.capture(dialog, firstFocus);
				}
			}
		}
		
		$(".productViewd__item").each(function(){
			if ($(this).hasClass("focus-visible")) {
				if (event.code == 'Enter' || event.code == 'Space' || event.key == 'Enter' ||  event.key == ' ') {
					event.preventDefault();
					let dialog = $(this)[0];
					let open_modal = $(this)[0];
					let firstFocus = open_modal;
					if ($(this).find(".productSmall").hasClass("__focus")) {
						$(this).find(".productSmall").removeClass("__focus");
						$(this).attr("aria-expanded", "false");
						focusManager.release(open_modal);
					}
					else {
						let el_height = $(this).outerHeight();
						$(this).find(".productSmall").addClass("__focus");
						$(this).attr("aria-expanded", "true");
						focusManager.capture(dialog, firstFocus);
					}
				}
			}
		});

		if (event.code == 'Escape') {
			event.preventDefault();
			if ($("[data-popup-element]").hasClass("__active")) {
				let this_id;
				$("[data-popup-element]").each(function() {
					if ($(this).hasClass("__active")) {
						this_id = $(this).attr("data-pop-up");
						$(this).removeClass("__active");
					}
				});
				$("[data-popup-open]").each(function() {
					if (!$(this).parents(".slick-slide").hasClass("slick-cloned")) {
						if ($(this).attr("data-id") == this_id) {
							focusManager.release($(this)[0]);
						}
					}
				});
				$("[data-popup-element]").removeClass("__active");
				$(".pop-overlay").removeClass("__active");
			}
			if ($("#basket-button").hasClass("__open")) {
				let openButton = $(".basketLink")[0];
				$("#basket-button").removeClass("__open");
				$("#basket-button").attr("aria-expanded", "false");
				focusManager.release(openButton);
			}
			if ($(".catalogButton").hasClass("__active")) {
				let open_modal = $(".catalogButton__Btn")[0];
				$(".catalogButton__Btn").attr("aria-label", "Открыть каталог");
				$(".catalogButton__Btn").attr("aria-expanded", "false");
				$(".catalogButton").removeClass("__active");
				$("#catalog-collapse").removeClass("__open");
				$(".catalogMenuList__item").removeClass("__active");
				$(".open--next-level").attr("aria-expanded", "false");
				focusManager.release(open_modal);
			}
			if ($(".flexibleMiddle__item-search").hasClass("__open")) {
				let open_modal = $(".extraMenuElement--search")[0];
				$(".flexibleMiddle__item-search").removeClass("__open");
				focusManager.release(open_modal);
			}
			if ($('.open--mobile-menu').hasClass("__active")) {
				let open_modal = $(".open--mobile-menu")[0];
				$('.open--mobile-menu').removeClass("__active");
				$('.mobileMenuCollapsed').removeClass("__open"); 
				focusManager.release(open_modal);
				$('.overaly-bg').removeClass("__open"); 
			}
			$(".overalyScreen").removeClass("__open");
		}
	});

	$("#basket-button").on("focus", function(){
		basket_focus = true;
	});
	$("#basket-button").on("blur", function(){
		basket_focus = false;
	});
	$(".s-filterButton").each(function() {
		if ($(this).hasClass("__active")) {
			$(this).parents(".filterElement").find(".filterElement__content").slideDown();
			$(this).parents(".filterElement").find(".filterElement__overflow").customScroll({
				vertical: true,
				horizontal: true,
				trackWidth: 6,
				trackHeight: 6,
			});
		}
	})
	$("body").on("click", ".s-filterButton", function() {
		if ($(this).hasClass("__active")) {
			$(this).removeClass("__active");
			let element = $(this).parents(".filterElement").find(".filterElement__content")
			element.slideUp(function() {
				element.customScroll('destroy');
			});
		}
		else {
			$(this).addClass("__active");
			$(this).parents(".filterElement").find(".filterElement__content").slideDown();
			$(this).parents(".filterElement").find(".filterElement__overflow").customScroll({
				vertical: true,
				horizontal: true,
				trackWidth: 6,
				trackHeight: 6,
			});
		}
	});
	// Начало - карточка товара
	$(".gallerySlides").lightGallery({
		selector: ".fancybox-thumb",
	});
	$(".sideSliderView").slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		arrows: true,
		vertical: true,
		prevArrow: '<button type="button" class="sideSliderBtn sideSliderBtn-prev" aria-label="Слайд назад">' + arrow + '</button>',
		nextArrow: '<button type="button" class="sideSliderBtn sideSliderBtn-next" aria-label="Слайд вперед">' + arrow + '</button>',
		verticalSwiping: true,
		focusOnSelect: true,
		swipeToSlide: true,
		asNavFor: '.mainSliderView',
	});
	$(".mainSliderView").each(function(params) {
		let _this = $(this);
		$(this).on('init', function (event, slick, currentSlide, nextSlide) {
			let part_width = 100 / slick.slideCount;
			let cur_width = part_width;
			$(this).parents(".sliderViewBox__main").find(".sliderLoad__inner").css("width", cur_width + "%");
		});
		$(this).slick({
			slidesToShow: 1,
			swipeToSlide: true,
			slidesToScroll: 1,
			appendArrows: _this.parents(".sliderViewBox__main").find(".mobile-slider--navigation"),
			prevArrow: '<button type="button" class="sideSliderBtn sideSliderBtn-prev" aria-label="Слайд назад">' + arrow + '</button>',
			nextArrow: '<button type="button" class="sideSliderBtn sideSliderBtn-next" aria-label="Слайд вперед">' + arrow + '</button>',
			asNavFor: '.sideSliderView',
		});
		$(this).on('afterChange', function (event, slick, currentSlide, nextSlide) {
			let part_width = 100 / slick.slideCount;
			let cur_width = part_width * (currentSlide + 1);
			$(this).parents(".sliderViewBox__main").find(".sliderLoad__inner").css("width", cur_width + "%");
		});
		
	})

	$('.cmainSliderView').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		if (slick.$slides.length <= slick.options.slidesToShow) {
			$(this).find(".slick-track").addClass("stopSlider");
		}
		else {
			$(this).find(".slick-track").removeClass("stopSlider");
		}
	});
	$("body").on("click", ".counterElement__button", function() {
		let min_val = $(this).parents(".counterElement").find(".counterElement__input").attr("min");
		let max_val = $(this).parents(".counterElement").find(".counterElement__input").attr("max");
		let cur_val = +$(this).parents(".counterElement").find(".counterElement__input").val();
		let inp = $(this).parents(".counterElement").find(".counterElement__input");
		if ($(this).hasClass("counterElement__button-dec")) {
			if (min_val) {
				if (!(cur_val - 1 < +min_val)) {
					$(this).parents(".counterElement").find(".counterElement__input").val(cur_val - 1);
				}
			}
			else if (!(cur_val - 1 < 0)) {
				$(this).parents(".counterElement").find(".counterElement__input").val(cur_val - 1);
			}
		}
		else if ($(this).hasClass("counterElement__button-inc")) {
			if (max_val) {
				if (!(cur_val + 1 > +max_val)) {
					$(this).parents(".counterElement").find(".counterElement__input").val(cur_val + 1);
				}
			}
			else {
				$(this).parents(".counterElement").find(".counterElement__input").val(cur_val + 1);
			}
		}
	});

	$("body").on("change", ".counterElement__input", function () {
		let min_val = +$(this).attr("min");
		let max_val = +$(this).attr("max");
		let cur_val = +$(this).val();
		let old_val = $(this).attr("data-val");
		if (min_val && max_val) {
			if (cur_val < min_val) {
				$(this).val(min_val)
			}
			else if (cur_val > max_val) {
				$(this).val(max_val);
			}
		}
		else if (min_val) {
			if (cur_val < min_val) {
				$(this).val(min_val)
			}
		}
		else if (max_val) {
			if (cur_val > max_val) {
				$(this).val(max_val);
			}
		}
	});
	$("body").on("click", "[data-grub-btn]", function() {
		let this_grub = $(this).attr("data-grub");
		if ($(this).hasClass("__active")) {
			$(this).parents("[data-grub-box]").find("[data-grub-btn]").each(function () {
				if ($(this).attr("data-grub") == this_grub) {
					$(this).removeClass("__active");
					$(this).removeAttr("aria-selected");
				}
			})
			$(this).parents("[data-grub-box]").find("[data-grub-element]").each(function () {
				if ($(this).attr("data-grub") == this_grub) {
					$(this).removeClass("__open");
				}
			});
		}
		else {
			$(this).parents("[data-grub-box]").find("[data-grub-btn]").each(function() {
				if ($(this).attr("data-grub") != this_grub) {
					$(this).removeClass("__active");
					$(this).removeAttr("aria-selected");
				}
				else {
					$(this).addClass("__active");
					$(this).attr("aria-selected", "true");
				}
			})
			$(this).addClass("__active");
			$(this).parents("[data-grub-box]").find("[data-grub-element]").removeClass("__open");
			$(this).parents("[data-grub-box]").find("[data-grub-element]").each(function(){
				if ($(this).attr("data-grub") == this_grub) {
					$(this).addClass("__open");
				}
			});
		}
	});
	
	let close_ico = '<div class="tooltip-close"><svg width="12" height="12" x="0px" y="0px" viewBox="0 0 9.7 10" style="enable-background:new 0 0 9.7 10;" xml: space="preserve">' +
					'<polygon class="st0" points="9.7,1.2 8.6,0 4.9,3.8 1.1,0 0,1.2 3.7,5 0,8.8 1.1,10 4.9,6.2 8.6,10 9.7,8.8 6,5 "></polygon>' +
					'</svg></div>';
	let el_tooltip = document.querySelectorAll(".open--tooltip");
	if (el_tooltip) {
		Array.prototype.forEach.call(el_tooltip, function(el) {
			el.addEventListener("click", function() {
				let window_id = this.dataset.id;
				if (!this.classList.contains('__open')) {
					this.classList.add('__open')
					let x = (window.pageXOffset !== undefined)
						? window.pageXOffset
						: (document.documentElement || document.body.parentNode || document.body).scrollLeft;
					let y = (window.pageYOffset !== undefined)
						? window.pageYOffset
						: (document.documentElement || document.body.parentNode || document.body).scrollTop;
					let el_width = this.offsetWidth;
					let el_height = this.offsetHeight;
					let post_top = +this.getBoundingClientRect().top + y;
					let pos_left = +this.getBoundingClientRect().left + x + el_height / 2;
	
					let el_text = this.dataset.text;
					let create_tooltip = document.createElement('div');
					create_tooltip.className = "tooltip-window";
					create_tooltip.setAttribute("id", window_id);
					create_tooltip.innerHTML = close_ico + "<div class='tooltip-inner'>" + el_text + "</div>";
					create_tooltip.style.cssText = "left:" + pos_left + "px; top:" + post_top + "px;";
					document.body.appendChild(create_tooltip);
				}
				else {
					this.classList.remove('__open');
					let all_window = document.querySelectorAll(".tooltip-window");
					Array.prototype.forEach.call(all_window, function (elem) {
						if (elem.getAttribute("id") == window_id) {
							elem.remove();
						}
					});
				}
			});
		});
		document.body.addEventListener("click", function(e) {
			if (e.target.closest(".tooltip-close")) {
				let ico_id = e.target.closest(".tooltip-close").closest(".tooltip-window").getAttribute("id");
				e.target.closest(".tooltip-close").closest(".tooltip-window").remove();
				Array.prototype.forEach.call(el_tooltip, function (el) {
					if (el.dataset.id == ico_id) {
						el.classList.remove('__open');
					}
				});
			}
		})
	}
	$(".target-to").on("click", function(e) {
		e.preventDefault();
		let this_id = $(this).attr("href");
		if (this_id !== undefined && this_id !== '') { 
			$('html').animate({
				scrollTop: $(this_id).offset().top 
			}, 500 
			);
		}
		let this_grub = $(this).attr("data-grub");
		$("[data-grub-box]").find("[data-grub-btn]").removeClass("__active");
		$("[data-grub-box]").find("[data-grub-btn]").removeAttr("aria-selected");
		$("[data-grub-box]").find("[data-grub-element]").removeClass("__open");
		$("[data-grub-box]").find("[data-grub-btn]").each(function () {
			if ($(this).attr("data-grub") == this_grub) {
				$(this).addClass("__active");
				$(this).attr("aria-selected", "true");
			}
		});
		$("[data-grub-box]").find("[data-grub-element]").each(function () {
			if ($(this).attr("data-grub") == this_grub) {
				$(this).addClass("__open");
			}
		});
	});
	$("body").on("click", ".open--share", function() {
		if (!$(this).hasClass("__active")) {
			$(this).addClass("__active");
			$(this).parents(".shareBtn__wrapper").find(".share-window").addClass("__open");
		}
		else {
			$(this).removeClass("__active");
			$(this).parents(".shareBtn__wrapper").find(".share-window").removeClass("__open");
		}
	});
	$("body").on("click", ".share-window-close", function(params) {
		$(this).parents(".shareBtn__wrapper").find(".open--share").removeClass("__active");
		$(this).parents(".shareBtn__wrapper").find(".share-window").removeClass("__open");
	}); 
	// Конец - карточка товара

	$("body").on("click", function(e){
		if (!e.target.closest(".catalogInteractive")) {
			if ($(".catalogButton").hasClass("__active")) {
				$(".catalogButton__Btn").attr("aria-label", "Открыть каталог");
				$(".catalogButton__Btn").attr("aria-expanded", "false");
				$(".catalogButton").removeClass("__active");
				$("#catalog-collapse").removeClass("__open");
				$(".overalyScreen").removeClass("__open");
				$(".catalogMenuList__item").removeClass("__active");
				$(".open--next-level").attr("aria-expanded", "false");
				focusManager.release($(".catalogButton__Btn")[0]);
			}
		}	
		if (!e.target.closest(".mobileMenuInteractive")) {
			if ($(".mobileMenuCollapsed").hasClass("__open")) {
				$(".open--mobile-menu").removeClass("__active");
				$(".open--mobile-menu").attr("aria-expanded", "false");
				$(".open--mobile-menu").parents(".flexibleBottom__item-mobile").find(".overaly-bg").removeClass("__open");
				$(".open--mobile-menu").parents(".flexibleBottom").find(".mobileMenuCollapsed").removeClass("__open");
				focusManager.release($(".open--mobile-menu")[0]);
			}
		}
		if (!e.target.closest(".basketLink__wrapper")) {
			if ($("#basket-button").hasClass("__open")) {
				$("#basket-button").removeClass("__open");
				$("#basket-button").attr("aria-expanded", "false");
				$(".overalyScreen").removeClass("__open");
				focusManager.release($(".open--mobile-menu")[0]);
			}
		}
		if (!e.target.closest(".flexibleMiddle__item-search") && !e.target.closest(".extraMenuElement--search")) {
			if ($(".flexibleMiddle__item-search").hasClass("__open")) {
				$(".flexibleMiddle__item-search").removeClass("__open");
				$(".overalyScreen").removeClass("__open");
				focusManager.release($(".extraMenuElement--search")[0]);
			}
		}
		if (!e.target.closest(".catalogMain__side") && !e.target.closest(".filter--open")) {
			if ($(".catalogMain__side").hasClass("__open")) {
				$(".catalogMain__side").removeClass("__open");
				$(".overalyScreen").removeClass("__open");
				$(".overalyScreen").addClass("overalyScreen-header");
				focusManager.release($(".filter--open")[0]);
			}
		}
	});
	$("body").on("click", "[data-calendar-open]", function(e){
		if ($(this).parents(".calendarParent").find("[data-calendar-input]").hasClass("__active")) {
			$(this).parents(".calendarParent").find("[data-calendar-input]").removeClass("__active");
			$(this).parents(".calendarParent").find(".calendarParent-main").removeClass("__open");
		}
		else {
			$(this).parents(".calendarParent").find("[data-calendar-input]").addClass("__active");
			$(this).parents(".calendarParent").find(".calendarParent-main").addClass("__open");
		}
	});
	// сравнение
	let col_line = $(".propProductList").eq(0).find(".propProductList__item").length;
	let col_list = $(".propProductList").length;
	for (let i = 0 ; i < col_line; i++) {
		let max_h = 0;
		for (let j = 0 ; j < col_list; j++) {
			let cur_h = $(".propProductList").eq(j).find(".propProductList__item").eq(i).outerHeight();
			if (cur_h > max_h) {
				max_h = cur_h;
			}
		}
		$(".propProductList").each(function() {
			$(this).find(".propProductList__item").each(function (index, element) {
				if (index == i) {
					$(this).css("min-height", max_h + "px");
				}
			});
		})
	};
	$("body").on("mouseenter", ".propProductList__item", function() {
		$(this).addClass("__hover");
		let this_num = $(this).parents(".propProductList").find(this).index();
		$(".propProductList").each(function() {
			$(this).find(".propProductList__item").each(function (index, element) {
				if (index == this_num) {
					$(this).addClass("__hover");
				}
			});
		})
	});
	$("body").on("mouseleave", ".propProductList__item", function() {
		$(this).removeClass("__hover");
		let this_num = $(this).parents(".propProductList").find(this).index();
		$(".propProductList").each(function() {
			$(this).find(".propProductList__item").each(function (index, element) {
				if (index == this_num) {
					$(this).removeClass("__hover");
				}
			});
		})
	});
	$(window).on("resize", function () {
		// сравнение
		let col_line = $(".propProductList").eq(0).find(".propProductList__item").length;
		let col_list = $(".propProductList").length;
		for (let i = 0 ; i < col_line; i++) {
			let max_h = 0;
			for (let j = 0 ; j < col_list; j++) {
				let cur_h = $(".propProductList").eq(j).find(".propProductList__item").eq(i).outerHeight();
				if (cur_h > max_h) {
					max_h = cur_h;
				}
			}
			$(".propProductList").each(function() {
				$(this).find(".propProductList__item").each(function (index, element) {
					if (index == i) {
						$(this).css("min-height", max_h + "px");
					}
				});
			})
		};
	});
	$(".popSliderMin").each(function(){
		let _this = $(this);
		$(this).slick({
		    slidesToShow: 2,
			slidesToScroll: 1,
			swipeToSlide: true,
		    arrows: true,
		    prevArrow: '<button type="button" class="sliderBtn sliderBtn-prev" aria-label="Слайд назад">' + arrow + '</button>',
            nextArrow: '<button type="button" class="sliderBtn sliderBtn-next" aria-label="Слайд вперед">' + arrow + '</button>',
            responsive: [
				{
				breakpoint: 900,
				settings: {
						slidesToShow: 1,
						appendArrows: _this.parents(".popUp__bottom").find(".popSliderMin__nav"),
					}
				},
			]
		});
	});
	$("body").on("click", "[data-popup-close]", function(params) {
		let this_id = $(this).parents("[data-popup-element]").attr("data-id");
		$("[data-popup-open]").each(function() {
			if (!$(this).parents(".slick-slide").hasClass("slick-cloned")) {
				if ($(this).attr("data-id") == this_id) {
					focusManager.release($(this)[0]);
				}
			}
		});
		$(this).parents("[data-popup-element]").removeClass("__active");
		$(".pop-overlay").removeClass("__active");
	});
	$("body").on("click", "[data-popup-close-all]", function(e) {
		if (!e.target.closest("[data-popup-element]") && !e.target.closest("[data-error-window-cls]")) {
			let this_id;
			$("[data-popup-element]").each(function() {
				if ($(this).hasClass("__active")) {
					this_id = $(this).attr("data-id");
					$(this).removeClass("__active");
				}
			});
			$("[data-popup-open]").each(function() {
				if (!$(this).parents(".slick-slide").hasClass("slick-cloned")) {
					if ($(this).attr("data-id") == this_id) {
						focusManager.release($(this)[0]);
					}
				}
			});
			$("[data-popup-element]").removeClass("__active");
			$(".pop-overlay").removeClass("__active");
		}
	});
	$("body").on("click", "[data-add-to-basket]", function(e) {
		let this_text = String($(this).html());
		let this_id = $(this).attr('data-id');
		$(this).addClass("__added");
		$(this).text("В корзине");
		$(this).removeAttr("data-popup-open");
		$("[data-add-to-basket]").each(function() {
			if ($(this).attr('data-id') == this_id) {
				$(this).addClass("__added");
				$(this).text("В корзине");
				$(this).removeAttr("data-popup-open");
			}
		})
	});
	$("body").on("click", "[data-popup-open]", function(e) {
		e.preventDefault();
		let this_num;
		if ($(this).attr("data-id") != "") {
			this_num = $(this).attr("data-id");
		}
		let this_id = $(this).attr("data-pop-up");
		$(".pop-overlay").removeClass("__active");
		$("[data-popup-element]").removeClass("__active");
		$("[data-popup-element]").each(function() {
			if ($(this).attr("data-pop-up") == this_id) {
				product__hover = true;
				$(".productItem.productItem-clone").remove();
				$(this).addClass("__active");
				$(this).attr("data-id", this_num);
				$(".pop-overlay").addClass("__active");
				let modal_window = $(this)[0];
				let modal_close = $(this).find("[data-popup-close]")[0];
				$(this).on("transitionend", modalHandler);
				function modalHandler() {
					focusManager.capture(modal_window, modal_close);
					$(this).off("transitionend", modalHandler);
				}
			}
		});
	});
	$("body").on("click", "[data-show-pas]", function(e) {
		$(this).toggleClass("__password")
		let this_type = $(this).parents("[data-pas-rel]").find(".customInput-text").attr("type");
		if (this_type == "password") {
			$(this).parents("[data-pas-rel]").find(".customInput-text").attr("type", "text");
		}
		else {
			$(this).parents("[data-pas-rel]").find(".customInput-text").attr("type", "password");
		}
	});

	// начало окно ошибки
	$("body").on("click", "[data-error-window-cls]", function(e) {
		$(this).parents("[data-error-window]").remove()
	});
	function createError(element, text) {
		let window_wrapper = document.createElement('div');
		window_wrapper.className = "error-message--wrapper";
		window_wrapper.setAttribute("data-error-window", "");

		let window_element = document.createElement('div');
		window_element.className = "error-message";

		let window_cls = document.createElement('button');
		window_cls.className = "error-message-cls";
		window_cls.innerHTML = '<svg width="12" height="12"><use xlink:href="img/sprite.svg#close"></use></svg>'
		window_cls.setAttribute("data-error-window-cls", "");
		
		let window_text = document.createElement('span');
		window_text.innerHTML = text;

		window_element.appendChild(window_cls);
		window_element.appendChild(window_text);
		window_wrapper.appendChild(window_element);
		element.insertAdjacentElement("afterend", window_wrapper)

		return true;
	}
	function createBtn(element) {
		let btn = document.createElement('button');
		btn.className = "error-clear";
		btn.innerHTML = '<svg width="12" height="12"><use xlink:href="img/sprite.svg#close"></use></svg>'
		btn.addEventListener("click", function() {
			this.remove();
			if (element.closest(".customInput-text-wrapper").querySelector(".error-message")) {
				element.closest(".customInput-text-wrapper").querySelector(".error-message").remove();
			}
			element.classList.remove("__error");
			element.setAttribute("value", "");
			element.value = "";
		});
		element.insertAdjacentElement("afterend", btn)
	}

	// создание окна ошибки
	$(".customInput-text").each(function() {
		if ($(this).hasClass("__error")) {
			createBtn($(this)[0]);
			createError($(this)[0], "Текст ошибки");
		}
	});
	$("body").find(".error-message--wrapper").each(function(){
		if ($("body").outerWidth() - $(this).offset().left < $(this).outerWidth()) {
			$(this).addClass("error-message--wrapper-center");
		}
	});
	// конец создание окна ошибки

	$("body").on("input", ".customInput-text", clearNoneError);
	$("body").on("click", ".customInput-text", clearNoneError);

	function clearNoneError() {
		if ($(this).hasClass("__error")) {
			if ($(this).val() == "") {
				$(this).removeClass("__error");
				$(this).parent().find(".error-clear").remove();
				$(this).parent().find(".error-message").remove();
			}
		}
	}
	$(window).on("resize", function() {
		$("body").find(".error-message--wrapper").each(function(){
			if ($("body").outerWidth() - $(this).offset().left < $(this).outerWidth()) {
				$(this).addClass("error-message--wrapper-center");
			}
		});
	});
	// конец окно ошибки

	$("body").on("click", "[data-add-action]", function() {
		if (!$(this).hasClass("__active")) {
			$(this).addClass("__active");
			$(this).parents('[data-add-action-wrapper]').addClass("__active");
			let this_id = $(this).attr("data-add-id");
			$("[data-add-action]").each(function() {
				if ($(this).attr("data-add-id") == this_id) {
					$(this).addClass("__active");
					$(this).parents('[data-add-action-wrapper]').addClass("__active");
				}
			});
		}
		else {
			$(this).removeClass("__active");
			let this_id = $(this).attr("data-add-id");
			$(this).parents('[data-add-action-wrapper]').removeClass("__active");
			$("[data-add-action]").each(function() {
				if ($(this).attr("data-add-id") == this_id) {
					$(this).removeClass("__active");
					$(this).parents('[data-add-action-wrapper]').removeClass("__active");
				}
			});
		}
	});
	// календарь
	moment.locale('ru');
	let now = moment();
	let todayDate = now.format('YYYY-MM-DD');
	let todayDate_t = now.format('DD.MM.YYYY');
	$(".inline--calendar").each(function(){
		let _this = $(this);
		$(this).dateRangePicker({
			language: 'ru',
			format: 'DD.MM.YYYY',
			alwaysOpen:true,
			startOfWeek: 'monday',
			startDate: todayDate_t,
			container: _this[0],
			inline:true,
			singleDate : true,
			singleMonth: true,
			customArrowPrevSymbol: '<svg width="6" height="10"><use xlink:href="img/sprite.svg#arrow"></use></svg>',
    		customArrowNextSymbol: '<svg width="6" height="10"><use xlink:href="img/sprite.svg#arrow"></use></svg>',
			showShortcuts: false,
			showTopbar: false,
			separator : ' - ',
			setValue: function(s,s1,s2)
			{	
				_this.parents(".calendarParent").find(".calendar--value").val(s);
			}
		});
		$(this).find(".clear--date").click(function(evt) {
			evt.stopPropagation();
			$(this).parents(".inline--calendar").data('dateRangePicker').clear();
		});

	});
});
window.addEventListener("load", function () {
	if ("IntersectionObserver" in window) {
		const lazyloadImages = document.querySelectorAll(".lazy");
		const imageObserver = new IntersectionObserver(function(entries, observer) {
			entries.forEach(function(entry) {
				if (entry.isIntersecting) {
					const image = entry.target;
					image.src = image.dataset.lazyImg;
					image.classList.remove("lazy");
					imageObserver.unobserve(image);
				}
			});
		});
		lazyloadImages.forEach(function(image) {
			imageObserver.observe(image);
		});
	} 
	else {
		function throttle(func, timeout) {
			let inThrottle = false;

			return function() {
				const args = arguments;
				const context = this;

				if (!inThrottle) {
					inThrottle = true;
					func.apply(context, args);
					setTimeout(() => { inThrottle = false; }, timeout);
				}
			};
		}
		function lazyload() {
			const windowHeight = window.innerHeight;
			const images = document.querySelectorAll('img.lazy');
			const offset = 100;

			Array.prototype.forEach.call(images, function(image) {
				const boundingRect = image.getBoundingClientRect();
				const yPosition = boundingRect.top - windowHeight;
				const yPositionBottom = boundingRect.bottom;

				if (yPosition <= offset && yPositionBottom >= -offset) {
					if (image.dataset.lazyImg) {
						image.src = image.dataset.lazyImg;
					}
					image.addEventListener('load', function() {
						this.classList.remove('lazy');
					});
				}
			});
		}
		const throttledLazyLoad = throttle(lazyload, 200);

		document.addEventListener('scroll', throttledLazyLoad);
		window.addEventListener('resize', throttledLazyLoad);
		window.addEventListener('orientationChange', throttledLazyLoad);

		throttledLazyLoad();
	}
});