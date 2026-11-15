import { PROBES } from "@/data/probes";
import { STORIES } from "@/data/stories";

export type Body = "moon" | "mars" | "both" | "earth";
export type MarkerKind = "c" | "l" | "p";

export type Mission = {
  id: string;
  year: string;
  body: Body;
  status: string;
  title: string;
  summary: string;
  legacy: string;
  long: string[];
};

export type Marker = {
  id: string;
  name: string;
  lat: number;
  lon: number;
  kind: MarkerKind;
  text: string;
  body: "moon" | "mars";
};

export const MISSIONS: Mission[] = [
  {
    "id": "apollo-late",
    "year": "1970",
    "body": "moon",
    "status": "İptal edildi",
    "title": "Apollo 18, 19 ve 20",
    "summary": "Üç Ay yolculuğu hazırdı ama para yetmeyince iptal oldu. O roketler Ay’a gitmedi.",
    "legacy": "Kullanılmayan Saturn V roketlerinden biri Skylab’ı fırlattı. Diğer aşamalar Houston ve Kennedy’de sergileniyor. Harrison Schmitt, iptal edilen Apollo 18 yerine Apollo 17 ile Ay’a gitti.",
    "long": [
      "Apollo programı başlangıçta Apollo 20’ye kadar uzanan bir Ay görevleri dizisi öngörüyordu. Temmuz 1969’da Apollo 11 ile “Ay’a insan indirme” hedefine ulaşılınca siyasi destek ve kamuoyu ilgisi hızla azaldı.",
      "Ocak 1970’te Apollo 20, Eylül 1970’te de Apollo 18 ve 19 iptal edildi. Geriye kalan Apollo 15, 16 ve 17 uzun süre Ay’da kalan, Ay arabası kullanan bilimsel “J görevleri” olarak uçtu.",
      "Jeolog Harrison Schmitt’in Apollo 18’de uçması planlanıyordu. Görev iptal edilince Apollo 17 ekibine alındı ve Ay’da yürüyen tek profesyonel bilim insanı oldu.",
      "Apollo 20 için ayrılan Saturn V, 1973’te Skylab’ı fırlattı. Houston’daki Johnson Uzay Merkezi’nde sergilenen Saturn V büyük ölçüde Apollo 18 aşamalarından oluşuyor.",
      "Program altı inişle kapandı. 12 kişi Ay yüzeyinde yürüdü ve yaklaşık 382 kilogram örnek Dünya’ya geldi. Son insanlı iniş Aralık 1972’deydi."
    ]
  },
  {
    "id": "nerva",
    "year": "1969–1972",
    "body": "mars",
    "status": "Rafa kalktı",
    "title": "İnsanlı Mars planı ve NERVA",
    "summary": "İnsanları Mars’a götürecek bir plan vardı. Onaylanmadı. Motoru yerde denendi, uzaya çıkmadı.",
    "legacy": "Nükleer itki fikri bugün yeniden araştırılıyor.",
    "long": [
      "Apollo 11’den sonra uzay ajansı bir sonraki büyük hedef olarak Mars’ı düşündü. 1969 Uzay Görev Grubu raporu, mekik ve istasyonun yanında 1980’lerde insanlı bir Mars seferini de seçenekler arasında sayıyordu.",
      "Wernher von Braun, nükleer motorlu iki gemiyle 1981’de yola çıkacak bir seferi savundu. Motorun adı NERVA idi: kimyasal roketlerden yaklaşık iki kat verimli nükleer termal itki.",
      "Nixon yönetimi ve Kongre bu harcamayı onaylamadı. NERVA motorları Nevada’da yerde çalıştırıldı ama uzaya hiç çıkmadı. Program 1972–1973 arasında sona erdi."
    ]
  },
  {
    "id": "sei",
    "year": "1989–1993",
    "body": "both",
    "status": "Finanse edilmedi",
    "title": "Uzay Keşif Girişimi",
    "summary": "Ay’a dönüp sonra Mars’a gitmek istediler. Çok pahalı bulununca plan rafta kaldı.",
    "legacy": "Fikir, sonraki programların temelinde yaşamaya devam etti.",
    "long": [
      "20 Temmuz 1989’da, Apollo 11’in 20. yıldönümünde Bush, Ay’a dönüş ve ardından Mars seferini hedefleyen Uzay Keşif Girişimi’ni açıkladı.",
      "uzay ajansı’nın “90 Günlük Çalışma”sı genellikle yaklaşık 500 milyar dolar olarak anılan bir maliyet ortaya koydu. Kongre bu rakamı kabul etmedi.",
      "Girişim 1993 civarında sessizce rafa kalktı. Zubrin ve Baker’ın “Mars Direct” fikri bugünkü Mars tartışmalarını hâlâ etkiliyor."
    ]
  },
  {
    "id": "phoenix",
    "year": "2000–2008",
    "body": "mars",
    "status": "Yeniden doğdu",
    "title": "Mars 2001 Lander ve Phoenix",
    "summary": "Bir Mars aracı iptal edilip depoya kondu. Yıllar sonra Phoenix adıyla uçtu ve buz buldu.",
    "legacy": "Aynı donanım Phoenix olarak 2007’de fırlatıldı ve 2008’de Mars’ın kuzey kutbuna indi.",
    "long": [
      "1999’da Mars Climate Orbiter ve Mars Polar Lander kayboldu. 2001 Surveyor inişçisi iptal edildi. Yörünge aracı Mars Odyssey adıyla uçtu.",
      "Tamamlanmış iniş aracı bir temiz odada saklandı. uzay ajansı bu donanımı kutup bölgesine indirmek için yeniden kullandı: görev Phoenix oldu.",
      "Phoenix 4 Ağustos 2007’de fırlatıldı, 25 Mayıs 2008’de kuzey kutup bölgesine indi, su buzunu ve perklorat tuzlarını doğruladı. Kasım 2008’de kış yaklaşınca görev bitti."
    ]
  },
  {
    "id": "constellation",
    "year": "2004–2010",
    "body": "moon",
    "status": "İptal – mirası sürüyor",
    "title": "Constellation Programı",
    "summary": "Yeni bir Ay roketi ve iniş aracı yapılacaktı. Program durdu. Kapsülün bir parçası kaldı.",
    "legacy": "Orion mürettebat kapsülü hayatta kaldı ve Artemis programının merkezine yerleşti.",
    "long": [
      "Columbia kazasından sonra Başkan Bush, Ocak 2004’te yeni bir keşif vizyonu açıkladı. Constellation: Ares I, Ares V, Orion ve Altair. Hedef 2020’ye kadar insanları Ay’a geri götürmekti.",
      "2009 Augustine Komisyonu programın mevcut bütçeyle ilerleyemeyeceğini raporladı. 2010’da Obama yönetimi programı iptal etti. Ares I-X Ekim 2009’da uçmuştu.",
      "Orion hayatta kaldı. SLS ile birlikte Artemis’in temeli oldu. Artemis I, 2022’de Orion’u Ay çevresinde sınadı."
    ]
  },
  {
    "id": "viper",
    "year": "2024",
    "body": "moon",
    "status": "Yeniden gündemde",
    "title": "VIPER Ay gezgini",
    "summary": "Ay’da buz arayacak bir araba yapıldı. Uçuş pahalı diye durdu. Henüz Ay’da değil.",
    "legacy": "Sonradan yeniden uçurulması için yeni bir taşıyıcıyla planlar duyuruldu.",
    "long": [
      "VIPER, golf arabası büyüklüğünde bir Ay gezginiydi. Güney kutuptaki kalıcı gölgelerin yakınında su buzunu haritalamak için tasarlanmıştı. Yaklaşık 100 günlük bir görev planlanıyordu.",
      "Taşıyıcı gecikmeleri ve artan maliyet nedeniyle uzay ajansı, Temmuz 2024’te görevi sonlandırdığını açıkladı.",
      "Sonrasında gezgini farklı bir ortakla uçurma seçenekleri arandı ve görev yeniden gündeme geldi."
    ]
  },
  {
    "id": "msr",
    "year": "2020’ler",
    "body": "mars",
    "status": "Belirsiz",
    "title": "Mars Örnek Getirme",
    "summary": "Mars’tan taş getirmek istediler. Çok pahalıya çıkınca taşlar hâlâ Mars’ta bekliyor.",
    "legacy": "Numuneler hâlâ Mars’taki Jezero Krateri’nde bekliyor.",
    "long": [
      "Perseverance Şubat 2021’de Jezero Krateri’ne indi. Kaya ve toprak örneklerini titanyum tüplere doldurdu; bir kısmını Three Forks deposunda yüzeye bıraktı.",
      "ESA ile birlikte örnekleri Dünya’ya getirme planının 2023 incelemesi, maliyetin yaklaşık 8–11 milyar dolara çıkabileceğini ve örneklerin 2040’a kadar gelmeyebileceğini belirtti.",
      "Program daha ucuz ve hızlı seçenekler için yeniden değerlendirildi. Görevin geleceği belirsiz."
    ]
  },
  {
    "id": "smap",
    "year": "2015–",
    "body": "earth",
    "status": "Radar durdu, radyometre uçuyor",
    "title": "SMAP",
    "summary": "Dünya’nın toprağı ıslak mı diye bakan bir uydu. Bir ölçeri bozuldu. Öteki hâlâ çalışıyor.",
    "legacy": "Radyometre hâlâ çalışıyor ve Dünya’nın toprak nemini iki–üç günde bir haritalıyor. uzay ajansı Earthdata’da 209 veri seti var.",
    "long": [
      "SMAP bir Ay veya Mars aracı değil; yörüngedeki bir Dünya gözlem uydusu. Amacı küresel toprak nemi haritası çıkarmak ve aynı bölgenin donma–çözülme durumunu belirlemek.",
      "İki aleti vardı. L-bant radar 31 Ocak 2015’ten 7 Temmuz 2015’e kadar çalıştı, sonra durdu. L-bant radyometre aynı günden beri çalışmaya devam ediyor.",
      "Ölçüler donmamış ve suyla kaplı olmayan zeminin yüzey nemini hedefler. Su döngüsü, tarım, sel ve kuraklık tahminleri için kullanılıyor.",
      "Kaynak: Earthdata SMAP platform sayfası.",
    ]
  }
];

export const MARKERS: Marker[] = [
  {
    "id": "tycho",
    "name": "Tycho Krateri",
    "lat": -43.3,
    "lon": -11.4,
    "kind": "c",
    "body": "moon",
    "text": "Güney yaylalarında, yaklaşık 85 km genişliğinde genç ve parlak bir krater. Işın sistemi Ay’ın büyük bölümüne yayılır."
  },
  {
    "id": "copernicus",
    "name": "Copernicus Krateri",
    "lat": 9.7,
    "lon": -20.1,
    "kind": "c",
    "body": "moon",
    "text": "Yaklaşık 93 km genişliğinde, belirgin ışınlara sahip bir krater."
  },
  {
    "id": "aristarchus",
    "name": "Aristarchus Krateri",
    "lat": 23.7,
    "lon": -47.4,
    "kind": "c",
    "body": "moon",
    "text": "Ay’ın en parlak kraterlerinden biri; yaklaşık 40 km genişliğinde."
  },
  {
    "id": "shackleton",
    "name": "Shackleton Krateri",
    "lat": -89.9,
    "lon": 0,
    "kind": "c",
    "body": "moon",
    "text": "Güney kutbundaki, kalıcı gölgede kalan krater. İçinde su buzu olabileceği düşünülüyor."
  },
  {
    "id": "tsiolkovsky",
    "name": "Tsiolkovsky Krateri",
    "lat": -20.4,
    "lon": 129.1,
    "kind": "c",
    "body": "moon",
    "text": "Ay’ın uzak yüzünde, ortası koyu lavla dolu yaklaşık 185 km’lik krater."
  },
  {
    "id": "a11",
    "name": "Apollo 11",
    "lat": 0.67,
    "lon": 23.47,
    "kind": "l",
    "body": "moon",
    "text": "20 Temmuz 1969’da Neil Armstrong ve Buzz Aldrin, Sakinlik Denizi’ne indi."
  },
  {
    "id": "a12",
    "name": "Apollo 12",
    "lat": -3.01,
    "lon": -23.42,
    "kind": "l",
    "body": "moon",
    "text": "Kasım 1969’da, daha önce inen Surveyor 3 sondasının yakınına indi."
  },
  {
    "id": "a14",
    "name": "Apollo 14",
    "lat": -3.65,
    "lon": -17.47,
    "kind": "l",
    "body": "moon",
    "text": "Şubat 1971’de Fra Mauro bölgesine indi."
  },
  {
    "id": "a15",
    "name": "Apollo 15",
    "lat": 26.13,
    "lon": 3.63,
    "kind": "l",
    "body": "moon",
    "text": "Temmuz–Ağustos 1971’de Hadley Rille yakınına indi. İlk Ay arabası burada kullanıldı. Ay modülünün adı Falcon’du."
  },
  {
    "id": "a16",
    "name": "Apollo 16",
    "lat": -8.97,
    "lon": 15.5,
    "kind": "l",
    "body": "moon",
    "text": "Nisan 1972’de Descartes yaylalarına indi."
  },
  {
    "id": "a17",
    "name": "Apollo 17",
    "lat": 20.19,
    "lon": 30.77,
    "kind": "l",
    "body": "moon",
    "text": "Aralık 1972’de Taurus–Littrow vadisine indi. Son insanlı Ay inişiydi."
  },
  {
    "id": "luna9",
    "name": "Luna 9",
    "lat": 7.08,
    "lon": -64.37,
    "kind": "l",
    "body": "moon",
    "text": "1966’da Sovyetler Birliği’nin Ay’a yaptığı ilk yumuşak iniş."
  },
  {
    "id": "ce4",
    "name": "Chang’e 4",
    "lat": -45.46,
    "lon": 177.59,
    "kind": "l",
    "body": "moon",
    "text": "2019’da Ay’ın uzak yüzüne inen ilk uzay aracı (Çin)."
  },
  {
    "id": "cy3",
    "name": "Chandrayaan-3",
    "lat": -69.37,
    "lon": 32.32,
    "kind": "l",
    "body": "moon",
    "text": "Hindistan’ın aracı, Ağustos 2023’te güney kutup bölgesine indi."
  },
  {
    "id": "viper-site",
    "name": "VIPER hedef bölgesi",
    "lat": -85.2,
    "lon": 53.3,
    "kind": "p",
    "body": "moon",
    "text": "Su buzu aramak için tasarlanan gezginin çalışacağı güney kutup bölgesi. Görev 2024’te iptal edildi, sonra yeniden gündeme geldi."
  },
  {
    "id": "artemis",
    "name": "Artemis aday bölgesi",
    "lat": -87,
    "lon": -40,
    "kind": "p",
    "body": "moon",
    "text": "uzay ajansı’nın Artemis programının aday iniş bölgeleri güney kutup çevresinde. Kalıcı üs henüz yalnızca plan aşamasında."
  },
  {
    "id": "olympus",
    "name": "Olympus Mons",
    "lat": 18.65,
    "lon": -133.8,
    "kind": "c",
    "body": "mars",
    "text": "Güneş Sistemi’nin bilinen en yüksek yanardağı. Yaklaşık 22 km yüksekliğinde."
  },
  {
    "id": "valles",
    "name": "Valles Marineris",
    "lat": -14,
    "lon": -59,
    "kind": "c",
    "body": "mars",
    "text": "Yaklaşık 4000 km uzunluğunda dev bir kanyon sistemi."
  },
  {
    "id": "hellas",
    "name": "Hellas Planitia",
    "lat": -42.4,
    "lon": 70.5,
    "kind": "c",
    "body": "mars",
    "text": "Mars’ın en büyük çarpma havzalarından biri; yaklaşık 2300 km genişliğinde."
  },
  {
    "id": "vik1",
    "name": "Viking 1",
    "lat": 22.48,
    "lon": -47.95,
    "kind": "l",
    "body": "mars",
    "text": "1976’da Chryse Planitia’ya inen uzay ajansı’nın ilk başarılı Mars inişçilerinden biri."
  },
  {
    "id": "vik2",
    "name": "Viking 2",
    "lat": 47.97,
    "lon": 134.26,
    "kind": "l",
    "body": "mars",
    "text": "Eylül 1976’da Utopia Planitia’ya indi."
  },
  {
    "id": "pathfinder",
    "name": "Pathfinder",
    "lat": 19.13,
    "lon": -33.22,
    "kind": "l",
    "body": "mars",
    "text": "1997’de Ares Vallis’e indi ve Sojourner gezginini taşıdı."
  },
  {
    "id": "spirit",
    "name": "Spirit",
    "lat": -14.57,
    "lon": 175.47,
    "kind": "l",
    "body": "mars",
    "text": "2004’te Gusev Krateri’ne indi."
  },
  {
    "id": "opportunity",
    "name": "Opportunity",
    "lat": -1.95,
    "lon": -5.53,
    "kind": "l",
    "body": "mars",
    "text": "2004’te Meridiani Planum’a indi ve uzun yıllar çalıştı."
  },
  {
    "id": "curiosity",
    "name": "Curiosity",
    "lat": -4.59,
    "lon": 137.44,
    "kind": "l",
    "body": "mars",
    "text": "2012’de Gale Krateri’ne indi."
  },
  {
    "id": "perseverance",
    "name": "Perseverance",
    "lat": 18.44,
    "lon": 77.45,
    "kind": "l",
    "body": "mars",
    "text": "2021’de Jezero Krateri’ne indi. Toplanan örnekler Dünya’ya getirilmeyi bekliyor."
  },
  {
    "id": "phoenix-site",
    "name": "Phoenix",
    "lat": 68.22,
    "lon": -125.7,
    "kind": "l",
    "body": "mars",
    "text": "2008’de kuzey kutup bölgesine indi. Mars 2001 inişçisinin yeniden doğuşuydu."
  },
  {
    "id": "insight",
    "name": "InSight",
    "lat": 4.5,
    "lon": 135.62,
    "kind": "l",
    "body": "mars",
    "text": "2018’de Elysium Planitia’ya indi ve Mars sarsıntılarını ölçtü."
  }
];

export const KIND_LABEL: Record<MarkerKind, string> = {
  c: "Dağ ya da çukur",
  l: "İndiği yer",
  p: "Henüz gidilmedi",
};

export function bodyLabel(body: Body) {
  if (body === "moon") return "Ay";
  if (body === "mars") return "Mars";
  if (body === "earth") return "Dünya";
  return "Ay ve Mars";
}

export function archiveBrief() {
  const missions = MISSIONS.map(
    (m) =>
      `## ${m.title} (${m.year}, ${bodyLabel(m.body)}, durum: ${m.status})\n${m.summary}\n${m.long.join(" ")}\nBugün: ${m.legacy}`,
  ).join("\n\n");
  const places = MARKERS.map((m) => {
    const story = STORIES[m.id]?.join(" ");
    return `${m.name} (${m.body === "moon" ? "Ay" : "Mars"}): ${story ?? m.text}`;
  }).join("\n");
  const probes = PROBES.map(
    (p) =>
      `## ${p.name} (${p.year}, derin uzay, ${p.status})\n${p.summary}\n${p.beats.join(" ")}\nBugün: ${p.today}`,
  ).join("\n\n");
  return `${missions}\n\n## Hâlâ uzaklaşan sondalar\n${probes}\n\n## Haritadaki yerler\n${places}`;
}

export function localAnswer(question: string) {
  const q = question.toLocaleLowerCase("tr");
  const hit = (words: string[]) => words.some((w) => q.includes(w));
  if (hit(["apollo 20", "apollo 18", "apollo 19", "saturn"])) {
    return "Üç Ay yolculuğu hazırdı. Para yetmeyince iptal oldu. O roketler gitmedi.";
  }
  if (hit(["phoenix"])) {
    return "Bir Mars aracı depoya kondu. Sonra Phoenix adıyla uçtu ve yerde buz buldu.";
  }
  if (hit(["viper"])) {
    return "VIPER, Ay’da buz arayacaktı. Uçmadı. Haritada yeşil nokta, gitmek istediği yer.";
  }
  if (hit(["constellation", "altair", "ares", "orion"])) {
    return "Büyük bir Ay planı durdu. Kapsülün bir parçası kaldı ve yeni yolculuklarda kullanıldı.";
  }
  if (hit(["nerva", "insanlı mars", "von braun"])) {
    return "İnsanları Mars’a götürecek plan onaylanmadı. Motoru yerde denendi, uzaya çıkmadı.";
  }
  if (hit(["örnek", "ornek", "sample", "jezero"])) {
    return "Perseverance, Mars’ta taşları tüpe koydu. Tüpler hâlâ orada. Dünya’ya ne zaman gelecekleri belli değil.";
  }
  if (hit(["apollo 15", "hadley", "falcon"])) {
    return "Apollo 15 bir vadiye indi. İlk Ay arabası orada kullanıldı. Araba hâlâ vadide.";
  }
  if (hit(["voyager 1", "voyager1"])) {
    return "Voyager 1, Jüpiter ve Satürn’ü gördü. Şimdi çok uzakta ve hâlâ fısıldıyor.";
  }
  if (hit(["voyager"])) {
    return "İki Voyager da 1977’de gitti. İkisi de Güneş’in dışına çıktı ve hâlâ ses gönderiyor.";
  }
  if (hit(["pioneer"])) {
    return "Pioneer 10, Jüpiter’e varan ilk robottu. 2003’te sustu. Hâlâ uzaklaşıyor.";
  }
  if (hit(["new horizons", "plüton", "pluto", "arrokoth"])) {
    return "New Horizons, Plüton’u yakından gördü. Hâlâ çok uzakta çalışıyor.";
  }
  if (hit(["ayda ne", "ay da ne", "neyi bıraktı", "iniş ayağı", "hayalet", "kaldı"])) {
    return "Ay’da iniş ayakları, arabalar ve bir ayna kaldı. Ayna, Ay’ın uzaklığını ölçmeye yardım eder.";
  }
  if (hit(["curiosity", "gale"])) {
    return "Curiosity, Mars’ta eski bir gölün olduğu yere indi. Hâlâ dağa tırmanıyor.";
  }
  if (hit(["smap", "toprak nem", "earthdata"])) {
    return "SMAP, Dünya’nın toprağı ıslak mı diye bakar. Bir ölçeri bozuldu. Öteki hâlâ çalışıyor.";
  }
  if (hit(["merhaba", "selam", "nedir", "site", "kim için", "okul", "çocuk", "arşiv", "nssdc", "etkin"])) {
    return "Bu sayfa bir etkin arşivdir. Görev kayıtlarının giriş kapısıdır. Kalıcı kopya NSSDCA’dadır.";
  }
  const probe = PROBES.find((p) => q.includes(p.name.toLocaleLowerCase("tr")));
  if (probe) return probe.name + ": " + probe.summary + " Bugün: " + probe.today;
  const mission = MISSIONS.find((m) => q.includes(m.title.toLocaleLowerCase("tr").slice(0, 8)));
  if (mission) return mission.title + ": " + mission.summary + " Bugün: " + mission.legacy;
  return "Bunu bilmiyorum. Ay, Mars, Voyager ya da Pioneer diye sor.";
}
