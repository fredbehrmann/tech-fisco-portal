/* Tech Fisco — comportamento progressivo.
   Todo o conteúdo permanece acessível sem este arquivo. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Agrupa leituras de scroll num único rAF para não disparar
     layout a cada evento. */
  function onScroll(handler) {
    var ticking = false;
    function run() { ticking = false; handler(window.pageYOffset || root.scrollTop); }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(run); }
    }, { passive: true });
    handler(window.pageYOffset || root.scrollTop);
  }

  /* ---------- 1. Menu ---------- */
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-site-nav]");

  if (toggle && nav) {
    var closeMenu = function () {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    toggle.addEventListener("click", function () {
      var willOpen = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(willOpen));
      nav.classList.toggle("is-open", willOpen);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a") && window.matchMedia("(max-width: 959px)").matches) {
        closeMenu();
      }
    });

    /* Clique fora fecha o menu: no celular, tocar no conteúdo é o
       gesto esperado para dispensar um painel aberto. */
    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (event.target.closest("[data-site-nav]") || event.target.closest("[data-menu-toggle]")) return;
      closeMenu();
    });
  }

  /* ---------- 2. Sombra do cabeçalho fixo ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    onScroll(function (y) { header.classList.toggle("is-stuck", y > 8); });
  }

  /* ---------- 3. Voltar ao topo ---------- */
  var toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    onScroll(function (y) { toTop.classList.toggle("is-visible", y > 900); });
    toTop.addEventListener("click", function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      var skip = document.querySelector(".skip-link");
      if (skip) skip.focus({ preventScroll: true });
    });
  }

  /* ---------- 4. Barra de CTA no celular ----------
     Aparece depois que o CTA do topo sai de vista e some quando
     o bloco de CTA final entra em cena, para não duplicar a oferta. */
  var mobileCta = document.querySelector("[data-mobile-cta]");
  if (mobileCta) {
    document.body.classList.add("has-mobile-cta");
    var heroActions = document.querySelector(".hero-actions, .subhero");
    var finalCta = document.querySelector(".cta-band");
    var pastHero = false;
    var atFinal = false;

    var sync = function () {
      mobileCta.classList.toggle("is-visible", pastHero && !atFinal);
    };

    if ("IntersectionObserver" in window) {
      if (heroActions) {
        new IntersectionObserver(function (entries) {
          pastHero = !entries[0].isIntersecting;
          sync();
        }, { rootMargin: "-120px 0px 0px 0px" }).observe(heroActions);
      } else {
        pastHero = true;
      }
      if (finalCta) {
        new IntersectionObserver(function (entries) {
          atFinal = entries[0].isIntersecting;
          sync();
        }, { rootMargin: "0px 0px -20% 0px" }).observe(finalCta);
      }
      sync();
    } else {
      onScroll(function (y) { mobileCta.classList.toggle("is-visible", y > 600); });
    }
  }

  /* ---------- 5. Acordeões exclusivos ---------- */
  document.querySelectorAll("[data-accordion-group]").forEach(function (group) {
    group.addEventListener("toggle", function (event) {
      var opened = event.target;
      if (opened.tagName !== "DETAILS" || !opened.open) return;
      group.querySelectorAll("details[open]").forEach(function (item) {
        if (item !== opened) item.open = false;
      });
    }, true);
  });

  /* ---------- 6. Seção ativa na navegação por âncoras ---------- */
  var anchorNav = document.querySelector("[data-anchor-nav]");
  if (anchorNav && "IntersectionObserver" in window) {
    var links = {};
    var targets = [];
    anchorNav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      var id = link.getAttribute("href").slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      links[id] = link;
      targets.push(target);
    });

    var visible = new Set();
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });
      var current = targets.filter(function (t) { return visible.has(t.id); })[0];
      Object.keys(links).forEach(function (id) {
        links[id].classList.toggle("is-active", !!current && id === current.id);
      });
    }, { rootMargin: "-30% 0px -55% 0px" });

    targets.forEach(function (t) { observer.observe(t); });
  }

  /* ---------- 7. Formulário de contato ---------- */
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;

  form.noValidate = true;
  var summary = document.getElementById("error-summary");
  var status = document.getElementById("form-status");
  var submitButton = form.querySelector("button[type='submit']");

  var rules = {
    nome: function (value) { return value.trim().length >= 2 ? "" : "Informe seu nome."; },
    email: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Informe um e-mail institucional válido.";
    },
    municipio: function (value) { return value.trim().length >= 2 ? "" : "Informe o município."; },
    uf: function (value) { return /^[A-Za-z]{2}$/.test(value.trim()) ? "" : "Informe a UF com duas letras."; },
    porte: function (value) { return value ? "" : "Selecione o porte do município."; },
    mensagem: function (value) { return value.trim().length >= 10 ? "" : "Escreva uma mensagem com pelo menos 10 caracteres."; }
  };

  function setFieldError(field, message) {
    var error = document.getElementById(field.id + "-error");
    field.setAttribute("aria-invalid", message ? "true" : "false");
    if (error) error.textContent = message;
  }

  function validateField(field) {
    var rule = rules[field.name];
    if (!rule) return "";
    var message = rule(field.value);
    setFieldError(field, message);
    return message;
  }

  Object.keys(rules).forEach(function (name) {
    var field = form.elements[name];
    if (!field) return;
    field.addEventListener("blur", function () { validateField(field); });
    /* Só revalida ao digitar se o campo já estava marcado como
       inválido — corrigir enquanto se escreve é útil; acusar erro
       na primeira letra digitada não é. */
    field.addEventListener("input", function () {
      if (field.getAttribute("aria-invalid") === "true") validateField(field);
    });
    field.addEventListener("change", function () {
      if (field.tagName === "SELECT") validateField(field);
    });
  });

  /* UF em maiúsculas: evita "ba" chegar diferente de "BA" no destino. */
  var uf = form.elements.uf;
  if (uf) {
    uf.addEventListener("input", function () { uf.value = uf.value.toUpperCase(); });
  }

  function showSummary(errors) {
    if (!summary) return;
    if (!errors.length) {
      summary.classList.remove("is-visible");
      summary.innerHTML = "";
      return;
    }
    var list = errors.map(function (item) {
      var link = document.createElement("a");
      link.href = "#" + item.field.id;
      link.textContent = item.message;
      var li = document.createElement("li");
      li.appendChild(link);
      return li;
    });
    summary.innerHTML = "";
    var title = document.createElement("strong");
    title.textContent = "Revise os campos abaixo:";
    var ul = document.createElement("ul");
    list.forEach(function (li) { ul.appendChild(li); });
    summary.appendChild(title);
    summary.appendChild(ul);
    summary.classList.add("is-visible");
    summary.focus();
  }

  function setStatus(kind, message) {
    if (!status) return;
    status.className = "form-status " + (kind ? "is-" + kind : "");
    status.textContent = message || "";
    if (kind) status.focus();
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    setStatus("", "");

    var errors = [];
    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      if (!field) return;
      var message = validateField(field);
      if (message) errors.push({ field: field, message: message });
    });

    showSummary(errors);
    if (errors.length) {
      var first = errors[0].field;
      if (first && first.focus) first.focus();
      return;
    }

    var endpoint = form.getAttribute("data-endpoint") || "";
    if (!endpoint || endpoint.indexOf("{{") !== -1) {
      setStatus("error", "O formulário está validado, mas o endpoint de envio ainda precisa ser configurado pela equipe responsável.");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando…";

    try {
      var response = await fetch(endpoint, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: new FormData(form)
      });
      if (!response.ok) throw new Error("Resposta inválida");
      form.reset();
      form.querySelectorAll("[aria-invalid]").forEach(function (field) {
        field.setAttribute("aria-invalid", "false");
      });
      form.querySelectorAll(".field-error").forEach(function (el) { el.textContent = ""; });
      showSummary([]);
      setStatus("success", "Mensagem enviada. Nossa equipe entrará em contato pelos dados informados.");
    } catch (error) {
      setStatus("error", "Não foi possível enviar agora. Tente novamente mais tarde ou peça à equipe responsável para conferir o endpoint do formulário.");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar mensagem";
    }
  });
})();
