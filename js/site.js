(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nav = document.querySelector(".nav");

  function updateNav() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 18);
  }

  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  var orders = [
    { id: "#1847", time: "20:34", customer: "Miguel A.", order: "Paquete 3 + Fanta 600 ml", type: "Recoger", total: "$260", source: "Natalia", state: "Preparando", className: "preparing" },
    { id: "#1846", time: "20:31", customer: "Laura G.", order: "2 pizzas grandes + Pepsi", type: "Entrega", total: "$680", source: "Natalia", state: "Confirmado", className: "confirmed" },
    { id: "#1845", time: "20:22", customer: "Carlos M.", order: "Paquete 5 · sin cebolla", type: "Recoger", total: "$420", source: "Mostrador", state: "Listo", className: "ready" },
    { id: "#1844", time: "20:18", customer: "Ana P.", order: "Pizza hawaiana + alitas", type: "Entrega", total: "$535", source: "Natalia", state: "Listo", className: "ready" }
  ];

  var dashList = document.getElementById("dash-list");
  if (dashList) {
    orders.forEach(function (order) {
      var row = document.createElement("div");
      row.className = "dashboard-row";
      row.innerHTML =
        '<span class="order-id"><strong>' + order.id + '</strong><small>' + order.time + '</small></span>' +
        '<span><strong>' + order.customer + '</strong><small>' + order.order + " · " + order.source + '</small></span>' +
        '<span class="order-type">' + order.type + '</span>' +
        '<strong class="order-total">' + order.total + '</strong>' +
        '<span class="order-state ' + order.className + '">' + order.state + '</span>';
      dashList.appendChild(row);
    });
  }

  var expandButton = document.querySelector(".integration-expand");
  var dashboardCard = document.querySelector(".dashboard-card");
  if (expandButton && dashboardCard) {
    expandButton.addEventListener("click", function () {
      var expanded = dashboardCard.classList.toggle("mobile-expanded");
      expandButton.setAttribute("aria-expanded", expanded ? "true" : "false");
      expandButton.textContent = expanded ? "Ocultar integración completa" : "Ver integración completa";
    });
  }

  var faqDetails = Array.prototype.slice.call(document.querySelectorAll(".faq-list details"));
  faqDetails.forEach(function (detail) {
    detail.addEventListener("toggle", function () {
      if (!detail.open) return;
      faqDetails.forEach(function (other) {
        if (other !== detail) other.open = false;
      });
    });
  });

  var contactForm = document.getElementById("contact-form");
  var formStatus = document.getElementById("form-status");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!contactForm.reportValidity()) return;

      var data = new FormData(contactForm);
      var message = [
        "Hola, quiero solicitar una demo de Natalia.",
        "",
        "Nombre: " + data.get("name"),
        "Negocio: " + data.get("business"),
        "Industria: " + data.get("industry"),
        "Llamadas al día: " + data.get("calls"),
        "Teléfono: " + data.get("phone")
      ].join("\n");

      var viaEmail = event.submitter && event.submitter.id === "contact-email-btn";
      if (viaEmail) {
        if (formStatus) formStatus.textContent = "Abriendo tu correo con la solicitud…";
        var subject = "Solicitud de demo — " + (data.get("business") || "Natalia");
        window.location.href = "mailto:figueroaedu117@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(message);
        return;
      }

      if (formStatus) formStatus.textContent = "Abriendo WhatsApp con tu solicitud…";
      window.open("https://wa.me/525656956537?text=" + encodeURIComponent(message), "_blank", "noopener");
    });
  }

  var reveals = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || reducedMotion) {
    reveals.forEach(function (element) { element.classList.add("visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1 });

    reveals.forEach(function (element) { revealObserver.observe(element); });
  }
}());
