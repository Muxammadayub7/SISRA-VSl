document.addEventListener("DOMContentLoaded", () => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2vLZdTmwnWtntEkI_4DdL-eTS5LFzjdFRRD42RXLO1Hr9sFOL3Me5xjfvd_TTaaC4bg/exec"; 

  const phoneInput = document.getElementById("mainPhone");
  const form = document.querySelector(".puple__form");

  // 1. TELEFON FORMATLASH
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, ""); 
      e.target.classList.remove("error-border"); // Yozishni boshlaganda qizilni yo'qotish
      let matrix = "88 888 88 88";
      let i = 0;
      let newValue = matrix.replace(/[_\d]/g, (a) => {
        return i < val.length ? val.charAt(i++) : "";
      });
      e.target.value = newValue.trim();
    });
  }

  // 2. FORMANI TEKSHIRISH VA YUBORISH
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // Barcha inputlarni yig'amiz
      const inputs = {
        name: document.getElementById("userName"),
        age: document.getElementById("userAge"),
        lang: document.getElementById("langLevel"),
        prog: document.getElementById("program"),
        phone: document.getElementById("mainPhone")
      };

      let isAllValid = true;

      // Xatolarni tozalash (har safar submit bo'lganda)
      Object.values(inputs).forEach(input => {
        if (input) input.classList.remove("error-border");
      });

      // --- VALIDATSIYA BOSQICHI ---
      // 1. Ismni tekshirish
      if (inputs.name.value.trim().length < 2) {
        inputs.name.classList.add("error-border");
        isAllValid = false;
      }
      // 2. Yoshni tekshirish
      if (!inputs.age.value) {
        inputs.age.classList.add("error-border");
        isAllValid = false;
      }
      // 3. Selectlarni tekshirish
      if (!inputs.lang.value) {
        inputs.lang.classList.add("error-border");
        isAllValid = false;
      }
      if (!inputs.prog.value) {
        inputs.prog.classList.add("error-border");
        isAllValid = false;
      }
      // 4. Telefonni tekshirish (9 ta raqam bo'lishi shart)
      if (inputs.phone.value.replace(/\D/g, "").length !== 9) {
        inputs.phone.classList.add("error-border");
        isAllValid = false;
      }

      // AGAR HAMMASI TO'G'RI BO'LSA
      if (isAllValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerText = "YUBORILDI!";
        }

        const params = new URLSearchParams();
        params.append("Ism", inputs.name.value);
        params.append("Telefon", "+998 " + inputs.phone.value);
        params.append("Yoshi", inputs.age.value);
        params.append("Til", inputs.lang.value);
        params.append("Dastur", inputs.prog.value);
        params.append("Vaqt", new Date().toLocaleString());

        // Ma'lumotni yuborish (orqa fonda)
        fetch(SCRIPT_URL, {
          method: "POST",
          mode: "no-cors", 
          body: params.toString()
        });

        // 0.5 sekunddan keyin o'tkazish
        setTimeout(() => {
          window.location.href = "./thankYou.html";
        }, 500);
      } else {
        // Xato bo'lsa tepaga birinchi xatoga skroll qilish (ixtiyoriy)
        const firstError = document.querySelector(".error-border");
        if (firstError) firstError.focus();
      }
    });
  }
});