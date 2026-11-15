export type TimelineEvent = {
  id: string;
  year: number;
  name: string;
  place: "moon" | "mars" | "far";
  line: string;
};

/** 1966’dan bugüne, yüzeyde kalan ve hâlâ uzaklaşan makineler. */
export const TIMELINE: TimelineEvent[] = [
  { id: "luna9", year: 1966, name: "Luna 9", place: "moon", line: "Ay’a ilk yumuşak iniş. Yüzey toz denizine benzemiyordu." },
  { id: "a11", year: 1969, name: "Apollo 11", place: "moon", line: "İlk insanlar. İniş ayağı ve lazer yansıtıcı hâlâ orada." },
  { id: "a15", year: 1971, name: "Apollo 15", place: "moon", line: "Hadley’de ilk Ay arabası. Araba ve Falcon’un ayağı kaldı." },
  { id: "pioneer10", year: 1972, name: "Pioneer 10", place: "far", line: "Jüpiter’e varan ilk araç. 2003’te sustu, hâlâ uzaklaşıyor." },
  { id: "a17", year: 1972, name: "Apollo 17", place: "moon", line: "Son insanlı Ay inişi. Vadide araba ve iniş ayağı duruyor." },
  { id: "vik1", year: 1976, name: "Viking 1", place: "mars", line: "Mars yüzeyinde uzun süre kalan ilk iniş aracı." },
  { id: "voyager1", year: 1977, name: "Voyager 1", place: "far", line: "Jüpiter ve Satürn’den sonra yıldızlararası uzaya çıktı." },
  { id: "pathfinder", year: 1997, name: "Pathfinder", place: "mars", line: "Sojourner, Mars’taki ilk gezgin. İkisi de ovada kaldı." },
  { id: "spirit", year: 2004, name: "Spirit", place: "mars", line: "Gusev’de suyun izini buldu ve kuma saplanıp orada kaldı." },
  { id: "phoenix-site", year: 2008, name: "Phoenix", place: "mars", line: "İptal edilmiş bir inişçinin yeniden doğuşu. Buzu kazdı." },
  { id: "curiosity", year: 2012, name: "Curiosity", place: "mars", line: "Gale’de eski bir gölü doğruladı. Hâlâ tırmanıyor." },
  { id: "new-horizons", year: 2015, name: "New Horizons", place: "far", line: "Plüton’u ilk kez yakından gördü. Kuiper’da uçuyor." },
  { id: "insight", year: 2018, name: "InSight", place: "mars", line: "Mars depremlerini dinledi. 2022’de sustu, ovada duruyor." },
  { id: "perseverance", year: 2021, name: "Perseverance", place: "mars", line: "Jezero’da örnek tüpleri bıraktı. Getirilmeyi bekliyorlar." },
  { id: "cy3", year: 2023, name: "Chandrayaan-3", place: "moon", line: "Güney kutba en yakın inişlerden biri. Gezgin orada kaldı." },
];
