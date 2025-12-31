'use strict';
(function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px-50px 0px'
  };
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  document.querySelectorAll('.service-item,.tariff-card,.stat-card,.why-choose-item,.testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease,transform 0.6s ease';
    fadeInObserver.observe(el);
  });
  const elementToggleFunc = function(elem) {
    if (elem) elem.classList.toggle("active");
  }
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", function() {
      elementToggleFunc(sidebar);
    });
  }
  const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  const modalContainer = document.querySelector("[data-modal-container]");
  const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  const overlay = document.querySelector("[data-overlay]");
  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");
  const testimonialsModalFunc = function() {
    if (modalContainer) modalContainer.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
  }
  if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
    for (let i = 0; i < testimonialsItem.length; i++) {
      testimonialsItem[i].addEventListener("click", function() {
        const avatar = this.querySelector("[data-testimonials-avatar]");
        const title = this.querySelector("[data-testimonials-title]");
        const text = this.querySelector("[data-testimonials-text]");
        if (avatar && modalImg) {
          modalImg.src = avatar.src;
          modalImg.alt = avatar.alt;
        }
        if (title && modalTitle) modalTitle.textContent = title.textContent;
        if (text && modalText) modalText.textContent = text.textContent;
        testimonialsModalFunc();
      });
    }
  }
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  }
  if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
  }
  const select = document.querySelector("[data-select]");
  const selectItems = document.querySelectorAll("[data-select-item]");
  const selectValue = document.querySelector("[data-selecct-value]");
  const filterBtn = document.querySelectorAll("[data-filter-btn]");
  if (select) {
    select.addEventListener("click", function() {
      elementToggleFunc(this);
    });
  }
  const filterItems = document.querySelectorAll("[data-filter-item]");
  const filterFunc = function(selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "все" || selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }
  if (selectItems.length > 0 && selectValue) {
    for (let i = 0; i < selectItems.length; i++) {
      selectItems[i].addEventListener("click", function() {
        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        if (select) elementToggleFunc(select);
        filterFunc(selectedValue);
      });
    }
  }
  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function() {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);
      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");
  if (form && formInputs.length > 0 && formBtn) {
    for (let i = 0; i < formInputs.length; i++) {
      formInputs[i].addEventListener("input", function() {
        if (form.checkValidity()) {
          formBtn.removeAttribute("disabled");
        } else {
          formBtn.setAttribute("disabled", "");
        }
      });
    }
  }
  const pageMapping = {
    "главная": "главная",
    "кейсы": "кейсы",
    "тарифы": "тарифы",
    "заказать": "заказать & обсудить задачу",
    "Заказать": "заказать & обсудить задачу",
    "заказать & обсудить задачу": "заказать & обсудить задачу",
    "связаться": "связаться",
    "Связаться": "связаться",
    "Обсудить задачу": "заказать & обсудить задачу"
  };

  function switchPage(targetPageName) {
    if (!targetPageName) {
      console.error('switchPage called without targetPageName');
      return;
    }
    console.log('Switching to page:', targetPageName);
    
    // Получить свежие ссылки на элементы
    const allPages = document.querySelectorAll("[data-page]");
    const allNavLinks = document.querySelectorAll("[data-nav-link]");
    
    // Скрыть все страницы
    for (let j = 0; j < allPages.length; j++) {
      allPages[j].classList.remove("active");
      allPages[j].style.display = 'none';
      allPages[j].style.visibility = 'hidden';
      allPages[j].style.opacity = '0';
    }
    
    // Убрать активный класс со всех ссылок
    for (let j = 0; j < allNavLinks.length; j++) {
      allNavLinks[j].classList.remove("active");
    }
    
    // Найти и активировать нужную страницу
    let pageFound = false;
    for (let j = 0; j < allPages.length; j++) {
      const pageName = allPages[j].dataset.page;
      if (pageName === targetPageName) {
        allPages[j].classList.add("active");
        allPages[j].style.display = 'block';
        allPages[j].style.visibility = 'visible';
        allPages[j].style.opacity = '1';
        allPages[j].style.position = 'relative';
        allPages[j].style.zIndex = '1';
        pageFound = true;
        console.log('Page activated:', pageName, allPages[j]);
        break;
      }
    }
    
    if (!pageFound) {
      console.error('Page not found:', targetPageName);
      console.log('Available pages:', Array.from(allPages).map(p => p.dataset.page));
      return;
    }
    
    // Активировать соответствующую навигационную ссылку
    for (let j = 0; j < allNavLinks.length; j++) {
      const linkText = allNavLinks[j].textContent.trim();
      const mappedPage = pageMapping[linkText];
      if (mappedPage === targetPageName || linkText.toLowerCase() === targetPageName.toLowerCase()) {
        allNavLinks[j].classList.add("active");
        console.log('Link activated:', linkText);
        break;
      }
    }
    
    // Прокрутить вверх
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  // Делаем функцию доступной глобально
  window.switchPage = switchPage;
  console.log('switchPage function registered globally');
  
  // Функция инициализации навигации
  function initNavigation() {
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const pageElements = document.querySelectorAll("[data-page]");
    
    if (navLinks.length === 0 || pageElements.length === 0) {
      console.error('Navigation elements not found! Links:', navLinks.length, 'Pages:', pageElements.length);
      return;
    }
    
    console.log('Navigation initialized:', navLinks.length, 'links,', pageElements.length, 'pages');
    
    // Инициализация активной страницы
    const activePage = document.querySelector("article.active");
    if (activePage) {
      console.log('Active page on load:', activePage);
      activePage.style.setProperty('display', 'block', 'important');
      activePage.style.setProperty('visibility', 'visible', 'important');
      activePage.style.setProperty('opacity', '1', 'important');
      activePage.style.setProperty('position', 'relative', 'important');
      activePage.style.setProperty('z-index', '1', 'important');
      activePage.style.setProperty('min-height', '200px', 'important');
      activePage.classList.add('active');
    } else {
      console.log('No active page found, switching to главная');
      switchPage("главная");
    }
    
    // Добавление обработчиков событий для навигационных ссылок
    navLinks.forEach(function(link) {
      // Удаляем старый обработчик если есть
      const oldHandler = link._navClickHandler;
      if (oldHandler) {
        link.removeEventListener("click", oldHandler);
      }
      
      // Создаем новый обработчик
      const clickHandler = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const linkText = this.textContent.trim();
        console.log('Navigation clicked:', linkText, this);
        
        // Получить target page из маппинга
        let targetPage = pageMapping[linkText];
        if (!targetPage) {
          // Если нет в маппинге, попробуем найти по тексту
          targetPage = linkText.toLowerCase();
        }
        
        console.log('Target page:', targetPage);
        if (targetPage && window.switchPage) {
          window.switchPage(targetPage);
        } else {
          console.error('Could not determine target page for:', linkText, 'or switchPage not available');
        }
      };
      
      // Сохраняем ссылку на обработчик
      link._navClickHandler = clickHandler;
      link.setAttribute('data-handler-attached', 'true');
      
      // Добавляем обработчик
      link.addEventListener("click", clickHandler);
      
      console.log('Handler attached to:', linkText);
    });
    
    console.log('Navigation handlers attached to', navLinks.length, 'links');
  }
  
  // Инициализация после загрузки DOM
  function initializeApp() {
    // Проверяем наличие необходимых элементов
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");
    
    if (navLinks.length === 0 || pages.length === 0) {
      console.warn('Navigation elements not ready yet, retrying...', {
        navLinks: navLinks.length,
        pages: pages.length,
        readyState: document.readyState
      });
      // Увеличиваем таймаут и количество попыток
      let attempts = (window._navInitAttempts || 0) + 1;
      window._navInitAttempts = attempts;
      
      if (attempts < 10) {
        setTimeout(initializeApp, 300);
      } else {
        console.error('Failed to initialize navigation after', attempts, 'attempts');
      }
      return;
    }
    
    console.log('Initializing navigation with', navLinks.length, 'links and', pages.length, 'pages');
    // Инициализируем навигацию
    initNavigation();
  }
  
  // Множественная инициализация для надежности
  function startInitialization() {
    initializeApp();
  }
  
  // Запускаем инициализацию в зависимости от состояния документа
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startInitialization);
  } else {
    // DOM уже загружен
    startInitialization();
  }
  
  // Дополнительная проверка при полной загрузке страницы
  window.addEventListener('load', function() {
    console.log('Window loaded, checking navigation...');
    const activePage = document.querySelector("article.active");
    if (activePage) {
      activePage.style.setProperty('display', 'block', 'important');
      activePage.style.setProperty('visibility', 'visible', 'important');
      activePage.style.setProperty('opacity', '1', 'important');
    }
    
    // Повторная инициализация на случай если первая не сработала
    const navLinks = document.querySelectorAll("[data-nav-link]");
    if (navLinks.length > 0) {
      // Проверяем, есть ли обработчики
      let hasHandlers = false;
      navLinks.forEach(function(link) {
        // Проверяем наличие обработчиков через внутренние свойства
        if (link.onclick || link.getAttribute('data-handler-attached')) {
          hasHandlers = true;
        }
      });
      
      if (!hasHandlers) {
        console.log('No handlers found, reinitializing navigation...');
        initializeApp();
      }
    }
  });
  
  // Финальная попытка через 1 секунду
  setTimeout(function() {
    const navLinks = document.querySelectorAll("[data-nav-link]");
    const pages = document.querySelectorAll("[data-page]");
    if (navLinks.length > 0 && pages.length > 0) {
      // Проверяем, инициализирована ли навигация
      let hasActivePage = document.querySelector("article.active");
      if (!hasActivePage || navLinks.length > 0 && !navLinks[0].getAttribute('data-handler-attached')) {
        console.log('Final initialization attempt...');
        initializeApp();
      }
    }
  }, 1000);
  const orderForm = document.querySelector("[data-order-form]");
  const orderInputs = document.querySelectorAll("[data-order-input]");
  const orderBtn = document.querySelector("[data-order-btn]");
  if (orderForm && orderInputs.length > 0 && orderBtn) {
    for (let i = 0; i < orderInputs.length; i++) {
      orderInputs[i].addEventListener("input", function() {
        if (orderForm.checkValidity()) {
          orderBtn.removeAttribute("disabled");
        } else {
          orderBtn.setAttribute("disabled", "");
        }
      });
    }
    orderForm.addEventListener("submit", function(e) {
      e.preventDefault();
      if (!orderForm.checkValidity()) {
        orderForm.reportValidity();
        return;
      }
      const formData = new FormData(orderForm);
      const orderType = formData.get("order-type");
      const tariff = formData.get("tariff");
      const fullname = formData.get("fullname");
      const phone = formData.get("phone");
      const description = formData.get("description");
      const originalText = orderBtn.innerHTML;
      orderBtn.innerHTML = '<ion-icon name="hourglass-outline"></ion-icon> <span>Отправка...</span>';
      orderBtn.setAttribute("disabled", "");
      const message = `🎯*Новый заказ с сайта*\n\n` + `📋*Тип заказа:*${orderType}\n` + `💰*Тариф:*${tariff}\n` + `👤*Имя:*${fullname}\n` + `📱*Телефон:*${phone}\n\n` + `📝*Описание проекта:*\n${description}\n\n` + `⏰*Время заявки:*${new Date().toLocaleString('ru-RU')}`;
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "77002174701";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
      setTimeout(() => {
        window.open(whatsappUrl, "_blank");
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = '✅ Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.';
        successMessage.style.cssText = 'background: var(--green-crayola);color: white;padding: 15px;border-radius: 10px;margin-top: 20px;text-align: center;font-weight: 500;';
        orderForm.appendChild(successMessage);
        setTimeout(() => {
          orderForm.reset();
          orderBtn.innerHTML = originalText;
          orderBtn.setAttribute("disabled", "");
          successMessage.remove();
        }, 3000);
      }, 500);
    });
  }
  const tariffButtons = document.querySelectorAll(".btn-select-tariff");
  tariffButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      const tariffId = this.getAttribute("data-tariff-id") || this.textContent.trim().toLowerCase().replace(/\s+/g, "-");
      selectTariff(tariffId);
    });
  });
})();

function selectTariff(tariffId) {
  if (window.switchPage) {
    window.switchPage("заказать & обсудить задачу");
  }
  const tariffSelect = document.getElementById("tariff");
  if (tariffSelect) {
    tariffSelect.value = tariffId;
  }
  const orderTypeSelect = document.getElementById("order-type");
  if (orderTypeSelect) {
    orderTypeSelect.value = "website";
  }

  function forceDisplayActiveArticle() {
    let activeArticle = document.querySelector('article.active');
    if (!activeArticle) {
      activeArticle = document.querySelector('article[data-page="главная"]');
      if (activeArticle) {
        activeArticle.classList.add('active');
        console.log('Activated главная article:', activeArticle);
      }
    }
    if (activeArticle) {
      activeArticle.classList.remove('hidden');
      activeArticle.style.cssText = 'display: block !important;visibility: visible !important;opacity: 1 !important;position: relative !important;z-index: 1 !important;min-height: 200px !important;padding-top: 20px !important;padding-bottom: 100px !important;';
      activeArticle.style.setProperty('display', 'block', 'important');
      activeArticle.style.setProperty('visibility', 'visible', 'important');
      activeArticle.style.setProperty('opacity', '1', 'important');
      activeArticle.style.setProperty('position', 'relative', 'important');
      activeArticle.style.setProperty('z-index', '1', 'important');
      activeArticle.style.setProperty('min-height', '200px', 'important');
      const computedStyle = window.getComputedStyle(activeArticle);
      const rect = activeArticle.getBoundingClientRect();
      console.log('Active article forced to display:', {
        element: activeArticle,
        offsetHeight: activeArticle.offsetHeight,
        computedDisplay: computedStyle.display,
        computedVisibility: computedStyle.visibility,
        computedOpacity: computedStyle.opacity,
        rect: rect,
        classList: activeArticle.classList.toString()
      });
      if (activeArticle.offsetHeight === 0) {
        console.warn('Article has 0 height,trying to fix...');
        activeArticle.style.setProperty('background', 'var(--eerie-black-2)', 'important');
        activeArticle.style.setProperty('min-height', '500px', 'important');
      }
    } else {
      console.error('No article found to display!');
    }
  }
  forceDisplayActiveArticle();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceDisplayActiveArticle);
  } else {
    forceDisplayActiveArticle();
  }
  setTimeout(forceDisplayActiveArticle, 10);
  setTimeout(forceDisplayActiveArticle, 50);
  setTimeout(forceDisplayActiveArticle, 100);
  setTimeout(forceDisplayActiveArticle, 200);
  setTimeout(forceDisplayActiveArticle, 500);
  setTimeout(forceDisplayActiveArticle, 1000);
}