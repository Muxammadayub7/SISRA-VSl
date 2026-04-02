async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) return;

  const formDataObj = JSON.parse(formDataRaw);

  // Ma'lumotlarni oddiy obyekt qilib tayyorlaymiz
  const data = {
    sheetName: "Lead",
    Ism: formDataObj.Ism,
    "Telefon raqam": formDataObj.TelefonRaqam,
    "Royhatdan o'tgan vaqti": formDataObj.SanaSoat
  };

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwv8AxgyD0omZXVajkyyo0iNvTTuj0Ku_rhCf4-0OkNK0Dj7EL40XWVshdyO6cVv_Npvg/exec",
      {
        method: "POST",
        mode: "no-cors", // Google Script uchun juda muhim
        headers: {
          "Content-Type": "text/plain;charset=utf-8", // CORS muammosini chetlab o'tish uchun
        },
        body: JSON.stringify(data), // JSON qilib yuboramiz
      }
    );
    
    // no-cors rejimida response.ok doim false bo'ladi, 
    // shuning uchun ma'lumot ketgan deb hisoblab, storage-ni tozalaymiz
    localStorage.removeItem("formData");
    console.log("Ma'lumot yuborildi!");

  } catch (error) {
    console.error("Xatolik:", error);
    const errorEl = document.getElementById("errorMessage");
    if (errorEl) errorEl.style.display = "block";
  }
}

window.onload = sendFormData;