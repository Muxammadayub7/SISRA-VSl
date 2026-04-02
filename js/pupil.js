document.addEventListener("DOMContentLoaded", () => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz2vLZdTmwnWtntEkI_4DdL-eTS5LFzjdFRRD42RXLO1Hr9sFOL3Me5xjfvd_TTaaC4bg/exec"; 

  // --- 1. TELEFON FORMATLASH ---
  const phoneInput = document.getElementById("mainPhone");
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, ""); 
      let matrix = "88 888 88 88";
      let i = 0;
      let newValue = matrix.replace(/[_\d]/g, (a) => {
        return i < val.length ? val.charAt(i++) : "";
      });
      e.target.value = newValue.trim();
    });
  }

  // --- 2. LEAD YUBORISH VA TEZKOR REDIRECT ---
  const form = document.querySelector(".puple__form");
  if (form) {
    form.addEventListener("submit", (e) => { // Bu yerda async olib tashlandi, chunki biz kutmaymiz
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = "YUBORILDI!"; // Foydalanuvchiga vizual effekt
      }

      // Ma'lumotlarni yig'ish
      const formData = {
        Ism: document.getElementById("userName").value.trim(),
        Yoshi: document.getElementById("userAge").value.trim(),
        Til: document.getElementById("langLevel").value,
        Dastur: document.getElementById("program").value,
        Telefon: "+998 " + phoneInput.value,
        Vaqt: new Date().toLocaleString()
      };

      if (!formData.Ism || phoneInput.value.replace(/\D/g, "").length !== 9) {
        alert("Iltimos, ma'lumotlarni to'liq kiriting!");
        if (submitBtn) submitBtn.disabled = false;
        return;
      }

      const params = new URLSearchParams();
      params.append("Ism", formData.Ism);
      params.append("Telefon", formData.Telefon);
      params.append("Yoshi", formData.Yoshi);
      params.append("Til", formData.Til);
      params.append("Dastur", formData.Dastur);
      params.append("Vaqt", formData.Vaqt);

      // --- ASOSIY QISMI: YUBORISH VA 0.5 SEKUNDDAN KEGIN O'TISH ---
      
      // 1. So'rovni orqa fonda yuboramiz (kutib o'tirmaymiz)
      fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString()
      });

      // 2. Majburiy 0.5 soniyalik pauza va redirect
      setTimeout(() => {
        window.location.href = "./thankYou.html";
      }, 500); // 500ms = 0.5 sekund
      
    });
  }
});