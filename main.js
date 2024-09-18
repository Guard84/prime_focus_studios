document.addEventListener("DOMContentLoaded", function () {
  // breadcrumb
  const breadcrumb = document.querySelector(".breadcrumb");

  if (breadcrumb) {
    const path = window.location.pathname
      .split("/")
      .filter((p) => p.replace(".html", ""));

    const pageNames = {
      "": "Головна",
      catalog: "Каталог",
      about: "Про нас",
      contacts: "Контакти",
      "catalog/commercial": "Комерційні студії",
      "catalog/portret": "Портретні студії",
      "catalog/family": "Сімейні студії",
      "catalog/creative": "Креативні студії",
      "catalog/events": "Фотостудії для заходів",
    };

    if (path.length === 0) {
      breadcrumb.innerHTML = '<li class="breadcrumb-item">Головна</li>';
      return;
    }

    let pathHTML = '<li class="breadcrumb-item"><a href="/">Головна</a></li>';
    let currentPath = "";

    path.forEach((segment, index) => {
      const cleanSegment = segment.replace(".html", "");
      currentPath += `${currentPath ? "/" : ""}${cleanSegment}`;
      const isLastSegment = index === path.length - 1;
      const segmentName =
        pageNames[currentPath] ||
        cleanSegment.charAt(0).toUpperCase() +
          cleanSegment.slice(1).toLowerCase();

      let linkURL = `${currentPath}.html`;

      if (currentPath === "catalog" && !isLastSegment) {
        linkURL = "/catalog.html";
      }

      pathHTML += `
        <li class="breadcrumb-item${isLastSegment ? " active" : ""}">
          ${
            isLastSegment
              ? segmentName
              : `<a href="${linkURL}">${segmentName}</a>`
          }
        </li>
      `;
    });

    breadcrumb.innerHTML = pathHTML;
  }

  // modal
  const openModalButtons = document.querySelectorAll(".cta-button");
  const modals = document.querySelectorAll(".modal");

  if (openModalButtons.length > 0) {
    const openModal = (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "block";
      }
    };

    const closeModal = (modalId) => {
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "none";
      }
    };

    openModalButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const modalId = button.getAttribute("data-modal-id");
        openModal(modalId);
      });
    });

    modals.forEach((modal) => {
      const closeButton = modal.querySelector(".close");
      if (closeButton) {
        closeButton.addEventListener("click", () => {
          closeModal(modal.id);
        });
      }
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal(modal.id);
        }
      });
    });

    modals.forEach((modal) => {
      const form = modal.querySelector("form");
      if (form) {
        form.addEventListener("submit", (event) => {
          const privacyPolicyChecked = form.querySelector(
            'input[name="privacy-policy"]'
          ).checked;
          if (!privacyPolicyChecked) {
            event.preventDefault();
            alert("Вам потрібно погодитися з політикою конфіденційності.");
          } else {
            event.preventDefault();
            window.location.href = "/ty.html";
          }
        });
      }
    });
  }

  // contact-form
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      setTimeout(() => {
        const base = window.location.origin;
        window.location.href = `${base}/success.html`;
      }, 100);
    });
  }

  // success
  const successMessage = document.getElementById("success-message");

  if (successMessage) {
    const userLang = navigator.language || navigator.userLanguage;

    if (userLang.startsWith("uk")) {
      successMessage.textContent = `Дякуємо, ми обов'язково з Вами зв'яжемося!`;
    } else if (userLang.startsWith("ru")) {
      successMessage.textContent = `Спасибо, мы обязательно свяжемся с Вами!`;
    } else {
      successMessage.textContent = `Thank you, we will definitely get in touch with you!`;
    }
  }

  // ty
  const thankYouMessage = document.getElementById("thank-you-message");

  if (thankYouMessage) {
    const userLang = navigator.language || navigator.userLanguage;

    if (userLang.startsWith("uk")) {
      thankYouMessage.textContent = `Дякуємо за Ваше бронювання!`;
    } else if (userLang.startsWith("ru")) {
      thankYouMessage.textContent = `Спасибо за Ваше бронирование!`;
    } else {
      thankYouMessage.textContent = `Thank you for your booking!`;
    }
  }

  // cookies
  const cookieModal = document.querySelector(".cookie-consent-modal");
  const acceptBtn = document.querySelector(".accept-btn");
  const declineBtn = document.querySelector(".decline-btn");

  if (cookieModal && acceptBtn && declineBtn) {
    function showModal() {
      cookieModal.style.display = "block";
    }

    function hideModal() {
      cookieModal.style.display = "none";
    }

    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      showModal();
    }

    acceptBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "accepted");
      hideModal();
    });

    declineBtn.addEventListener("click", () => {
      localStorage.setItem("cookieConsent", "declined");
      hideModal();
    });
  }
});
