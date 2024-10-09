let calisanlar = [];

function calisanEkle(isim, yas, departman, maas) {
  if (!isim || yas < 18 || maas <= 0) {
    console.log(
      "Geçersiz bilgi girişi! İsim boş olamaz, yaş 18'den küçük veya maaş 0'dan düşük olamaz."
    );
    return;
  }

  for (let i = 0; i < calisanlar.length; i++) {
    if (calisanlar[i].isim === isim) {
      console.log("Bu isimde zaten bir çalışan mevcut!");
      return;
    }
  }

  calisanlar.push({ isim, yas, departman, maas });
  console.log(`${isim} başarıyla eklendi.`);
}

function calisanGuncelle(isim, yeniYas, yeniDepartman, yeniMaas) {
  let bulundu = false;
  for (let i = 0; i < calisanlar.length; i++) {
    if (calisanlar[i].isim === isim) {
      if (!isim || yeniYas < 18 || yeniMaas <= 0) {
        console.log(
          "Geçersiz bilgi girişi! Yaş 18'den küçük veya maaş 0'dan düşük olamaz."
        );
        return;
      }

      calisanlar[i].yas = yeniYas;
      calisanlar[i].departman = yeniDepartman;
      calisanlar[i].maas = yeniMaas;
      console.log(`${isim} başarıyla güncellendi.`);
      bulundu = true;
      break;
    }
  }

  if (!bulundu) {
    console.log("Bu isimde bir çalışan bulunamadı.");
  }
}

function calisanSil(isim) {
  let bulundu = false;
  for (let i = 0; i < calisanlar.length; i++) {
    if (calisanlar[i].isim === isim) {
      calisanlar.splice(i, 1);
      console.log(`${isim} başarıyla silindi.`);
      bulundu = true;
      break;
    }
  }

  if (!bulundu) {
    console.log("Bu isimde bir çalışan bulunamadı.");
  }
}

function calisanListele(departman = null, siralama = null) {
  let filtrelenmisCalisanlar = calisanlar;

  if (departman) {
    filtrelenmisCalisanlar = calisanlar.filter(
      (calisan) => calisan.departman === departman
    );
    if (filtrelenmisCalisanlar.length === 0) {
      console.log("Bu departmanda çalışan bulunmamaktadır.");
      return;
    }
  }

  if (siralama === "artan") {
    filtrelenmisCalisanlar.sort((a, b) => a.maas - b.maas);
  } else if (siralama === "azalan") {
    filtrelenmisCalisanlar.sort((a, b) => b.maas - a.maas);
  }

  if (filtrelenmisCalisanlar.length > 0) {
    filtrelenmisCalisanlar.forEach((calisan) => {
      console.log(
        `İsim: ${calisan.isim}, Yaş: ${calisan.yas}, Departman: ${calisan.departman}, Maaş: ${calisan.maas}`
      );
    });
  } else {
    console.log("Listelenecek çalışan bulunmamaktadır.");
  }
}

function maasaGoreFiltrele(limit) {
  let filtrelenmisCalisanlar = calisanlar.filter(
    (calisan) => calisan.maas < limit
  );
  if (filtrelenmisCalisanlar.length > 0) {
    filtrelenmisCalisanlar.forEach((calisan) => {
      console.log(
        `İsim: ${calisan.isim}, Yaş: ${calisan.yas}, Departman: ${calisan.departman}, Maaş: ${calisan.maas}`
      );
    });
  } else {
    console.log(`Maaşı ${limit} TL'nin altında olan çalışan bulunmamaktadır.`);
  }
}

function enYuksekMaasliCalisan() {
  if (calisanlar.length === 0) {
    console.log("Çalışan bulunmamaktadır.");
    return;
  }

  let enYuksekMaasli = calisanlar[0];
  for (let i = 1; i < calisanlar.length; i++) {
    if (calisanlar[i].maas > enYuksekMaasli.maas) {
      enYuksekMaasli = calisanlar[i];
    }
  }

  console.log(
    `En yüksek maaşlı çalışan: İsim: ${enYuksekMaasli.isim}, Maaş: ${enYuksekMaasli.maas}`
  );
}

function toplamMaasHesapla(departman = null) {
  let toplamMaas = 0;
  let filtrelenmisCalisanlar = calisanlar;

  if (departman) {
    filtrelenmisCalisanlar = calisanlar.filter(
      (calisan) => calisan.departman === departman
    );
    if (filtrelenmisCalisanlar.length === 0) {
      console.log("Bu departmanda çalışan bulunmamaktadır.");
      return;
    }
  }

  for (let i = 0; i < filtrelenmisCalisanlar.length; i++) {
    toplamMaas += filtrelenmisCalisanlar[i].maas;
  }

  console.log(`Toplam maaş: ${toplamMaas} TL`);
}

calisanEkle("Ali", 25, "IT", 7000);
calisanEkle("Ayşe", 30, "Finans", 8000);
calisanGuncelle("Ali", 26, "Yazılım", 7500);
calisanSil("Ayşe");
calisanListele("IT");
maasaGoreFiltrele(6000);
enYuksekMaasliCalisan();
toplamMaasHesapla();
