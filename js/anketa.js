document.addEventListener("DOMContentLoaded", () => {
    // 1. DAVLATLAR RO'YXATI (Buni funksiya ichiga oldik)
    const countries = [
        { name: "Uzbekistan", code: "+998", flag: "🇺🇿", mask: "00 000 00 00" },
        { name: "Tajikistan", code: "+992", flag: "🇹🇯", mask: "00 000 00 00" },
        { name: "Qirg'iziston", code: "+996", flag: "🇰🇬", mask: "000 000 000" },
        { name: "Qozog'iston", code: "+7", flag: "🇰🇿", mask: "000 000 00 00" },
        { name: "Rossiya", code: "+7", flag: "🇷🇺", mask: "000 000 00 00" },
        { name: "AQSH", code: "+1", flag: "🇺🇸", mask: "000 000 0000" },
        { name: "Janubiy Koreya", code: "+82", flag: "🇰🇷", mask: "00 0000 0000" },
        { name: "Turkiya", code: "+90", flag: "🇹🇷", mask: "000 000 00 00" },
        { name: "United Kingdom", code: "+44", flag: "🇬🇧", mask: "0000 000 000" }
    ];

    const dropdown = document.getElementById("countryDropdown");
    const selectedCodeText = document.getElementById("selectedCode");
    const phoneInput = document.getElementById("mainPhone");
    const selectBtn = document.getElementById("mainSelectedCountry");
    const arrow = document.querySelector(".arow");

    // Boshlang'ich holat
    let currentMask = "00 000 00 00"; 

    // 2. DROPDOWNGA DAVLATLARNI QO'SHISH
    if (dropdown) {
        dropdown.innerHTML = ""; // Tozalab olamiz
        countries.forEach(country => {
            const item = document.createElement("div");
            item.classList.add("country-item");
            item.innerHTML = `
                <span class="flag">${country.flag}</span> 
                <span class="country-name">${country.name}</span> 
                <span class="country-code">${country.code}</span>
            `;
            
            item.addEventListener("click", (e) => {
                e.stopPropagation();
                
                // Tanlangan davlat ma'lumotlarini o'rnatish
                selectedCodeText.innerHTML = `${country.flag} ${country.code}`;
                currentMask = country.mask;
                
                // Inputni sozlash
                phoneInput.value = "";
                phoneInput.placeholder = currentMask;
                phoneInput.focus();
                
                dropdown.classList.remove("show");
                if (arrow) arrow.classList.remove("rotate");
            });
            dropdown.appendChild(item);
        });
    }

    // 3. MASKA MANTIQI (Raqamlar yozilishi bilan o'zgaradi)
    phoneInput.addEventListener("input", (e) => {
        let val = e.target.value.replace(/\D/g, ""); // Faqat raqamlar
        let formatted = "";
        let valIndex = 0;

        for (let i = 0; i < currentMask.length && valIndex < val.length; i++) {
            if (currentMask[i] === "0") {
                formatted += val[valIndex++];
            } else {
                formatted += currentMask[i];
            }
        }
        e.target.value = formatted;
    });

    // 4. DROPDOWN OCHISH/YOPISH
    selectBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("show");
        if (arrow) arrow.classList.toggle("rotate");
    });

    // Tashqariga bossa yopish
    window.addEventListener("click", () => {
        if (dropdown.classList.contains("show")) {
            dropdown.classList.remove("show");
            if (arrow) arrow.classList.remove("rotate");
        }
    });
});