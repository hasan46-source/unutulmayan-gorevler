export type Probe = {
  id: string;
  year: string;
  name: string;
  status: string;
  summary: string;
  today: string;
  beats: string[];
};

/** Çok uzağa giden sondalar. Küçük çocuklara sade anlatım. */
export const PROBES: Probe[] = [
  {
    id: "voyager1",
    year: "1977",
    name: "Voyager 1",
    status: "Hâlâ konuşuyor",
    summary: "Önce büyük gezegenlerin yanından geçti. Sonra karanlığa doğru gitti. Hâlâ fısıldıyor.",
    today: "En uzaktaki makine. Hâlâ çok ince bir ses yolluyor.",
    beats: [
      "Voyager 1, 1977’de yola çıktı.",
      "Önce Jüpiter’e, sonra Satürn’e uğradı.",
      "Gezegenler bitince eve dönmedi.",
      "2012’de Güneş rüzgârının bittiği kapıdan çıktı.",
      "Şimdi karanlıkta gidiyor ve hâlâ çok ince bir ses yolluyor.",
    ],
  },
  {
    id: "voyager2",
    year: "1977",
    name: "Voyager 2",
    status: "Hâlâ konuşuyor",
    summary: "Dört büyük gezegeni de gören tek robot. Kardeşi başka kapıdan çıktı.",
    today: "Başka bir yöne gidiyor ve hâlâ haber yolluyor.",
    beats: [
      "Voyager 2 de 1977’de kalktı.",
      "Yolu kardeşinden daha uzun sürdü.",
      "Uranüs’ü ve Neptün’ü ilk o yakından gördü.",
      "2018’de o da Güneş rüzgârını geride bıraktı.",
      "İki kardeş iki ayrı kapıdan çıktı ve ikisi de hâlâ fısıldıyor.",
    ],
  },
  {
    id: "pioneer10",
    year: "1972",
    name: "Pioneer 10",
    status: "Sessizce gidiyor",
    summary: "Uzak gezegenlere giden ilk robotlardan. Şimdi sessizce uzaklaşıyor.",
    today: "Konuşmuyor. Gövdesi hâlâ yolda.",
    beats: [
      "Pioneer 10, uzak gezegenlere giden ilk robotlardandı.",
      "İşi bitince kaybolmadı.",
      "Güneş’in dışına doğru sessizce gidiyor.",
      "Artık konuşmuyor.",
      "Kardeşi Pioneer 11 başka bir yana gitti.",
    ],
  },
  {
    id: "pioneer11",
    year: "1973",
    name: "Pioneer 11",
    status: "Sessizce gidiyor",
    summary: "Pioneer 10’un yol arkadaşı. O da sessizce uzaklaşıyor.",
    today: "Başka bir yönde, konuşmadan gidiyor.",
    beats: [
      "Pioneer 11 de uzak gezegenlere giden ilk robotlardandı.",
      "Kimse onu geri çağırmadı.",
      "Yolu bitince durmadı.",
      "Şimdi Güneş’in dışına doğru sessizce gidiyor.",
      "Kardeşi başka kapıda, o başka kapıda.",
    ],
  },
  {
    id: "dawn",
    year: "2007",
    name: "Dawn",
    status: "Yakıtsız dönüyor",
    summary: "İki küçük dünyayı haritaladı. Yakıtı bitince birinin çevresinde dönmeye kaldı.",
    today: "Ceres’in çevresinde, itilmeden tur atıyor.",
    beats: [
      "Dawn, Vesta’yı ve Ceres’i çizmek için gitti.",
      "İki küçük dünyanın haritasını çıkardı.",
      "Sonra yakıtı bitti.",
      "Kimse onu parçalamadı.",
      "Ceres’in çevresinde, itilmeden dönüp duruyor.",
    ],
  },
  {
    id: "near",
    year: "1996",
    name: "NEAR Shoemaker",
    status: "Taşın üstünde",
    summary: "Bir gök taşının çevresinde döndü, sonra üzerine kondu.",
    today: "433 Eros adlı taşın üzerinde uyuyor.",
    beats: [
      "NEAR Shoemaker bir gök taşının çevresinde döndü.",
      "Sonra o taşın üzerine indi.",
      "Bunu yapan ilk robottu.",
      "Taşın adı 433 Eros.",
      "Kimse onu almadı ve hâlâ o taşın üstünde uyuyor.",
    ],
  },
  {
    id: "kepler",
    year: "2009",
    name: "Kepler",
    status: "Yakıtsız sürükleniyor",
    summary: "Başka yıldızların gezegenlerini arayan bir teleskoptu. Yakıtı bitince sürüklenmeye başladı.",
    today: "Dünya’nın ardındaki yolda, yakıtsız gidiyor.",
    beats: [
      "Kepler, uzak yıldızların gezegenlerini arayan bir teleskoptu.",
      "Gökyüzüne uzun uzun baktı.",
      "Sonra yakıtı bitti.",
      "Aramayı bıraktı.",
      "Şimdi Dünya’nın ardındaki yolda, direksiyonsuz sürükleniyor.",
    ],
  },
];
