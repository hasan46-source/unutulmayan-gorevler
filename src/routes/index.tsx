import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X } from "lucide-react";
import { ArchiveChat } from "@/components/ArchiveChat";
import { SpeakButton } from "@/components/SpeakButton";
import { GlobeView } from "@/components/GlobeView";
import { MarsGame } from "@/components/MarsGame";
import { SolarFlight } from "@/components/SolarFlight";
import { TimelineView } from "@/components/TimelineView";
import {
  KIND_LABEL,
  MARKERS,
  MISSIONS,
  bodyLabel,
  type Body,
  type Marker,
  type Mission,
} from "@/data/archive";
import { SITE_PHOTOS } from "@/data/photos";
import { PROBES, type Probe } from "@/data/probes";
import { STORIES, TALE_SHELF } from "@/data/stories";
import { TIMELINE } from "@/data/timeline";

export const Route = createFileRoute("/")({ component: Home });

type Filter = "all" | "moon" | "mars" | "far" | "earth";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Hepsi" },
  { id: "moon", label: "Ay" },
  { id: "mars", label: "Mars" },
  { id: "far", label: "Uzak" },
  { id: "earth", label: "Dünya" },
];

const BEATS = ["Nasıl gitti?", "Ne öğrendik?"];

function matches(body: Body, filter: Filter) {
  if (filter === "all") return true;
  if (body === "both") return filter === "moon" || filter === "mars";
  return body === filter;
}

function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const [mission, setMission] = useState<Mission | null>(null);
  const [marker, setMarker] = useState<Marker | null>(null);
  const [probe, setProbe] = useState<Probe | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);

  const missions = useMemo(
    () => MISSIONS.filter((item) => matches(item.body, filter)),
    [filter],
  );
  const globeBody = filter === "mars" ? "mars" : filter === "earth" || filter === "far" ? null : "moon";
  const markers = useMemo(
    () => (globeBody ? MARKERS.filter((m) => m.body === globeBody) : []),
    [globeBody],
  );

  return (
    <div className="relative z-10 min-h-screen bg-transparent text-fg">
      <header className="rise mx-auto max-w-3xl px-5 pb-6 pt-16 text-center">
        <p className="text-xs font-medium tracking-[0.22em] text-ice uppercase">
          Etkin Arşiv
        </p>
        <h1 className="mt-4 font-display text-5xl leading-none text-fg md:text-6xl">
          Unutulmayan <span className="text-accent">Görevler</span>
        </h1>
        <p className="mx-auto mt-5 flex max-w-xl items-start justify-center gap-2 text-lg text-muted">
          <span>
            Burada eski robotların hikâyesi var. İşleri bitince gittikleri yerde kaldılar.
            Ay’da, Mars’ta ve çok uzakta hâlâ duruyorlar. Hoparlöre bas, sana anlatsın.
          </span>
          <SpeakButton text="Burada eski robotların hikâyesi var. İşleri bitince gittikleri yerde kaldılar. Ay’da, Mars’ta ve çok uzakta hâlâ duruyorlar." />
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-5 pb-16">
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[
            ["1", "Dinle", "Bir robota dokun. Hikâyesini hoparlör okusun."],
            ["2", "Yürü", "Mars’ta astronot ol. Arabaların kaldığı yere git."],
            ["3", "Sor", "Anlamadığın yeri yaz. Kısa bir hikâye ile cevap gelir."],
          ].map(([n, title, text]) => (
            <div key={n} className="flex items-start justify-between gap-2 rounded-2xl border border-line bg-surface p-4">
              <div>
                <p className="font-display text-accent">{n}</p>
                <h2 className="mt-1 font-display text-xl">{title}</h2>
                <p className="mt-1 text-sm text-muted">{text}</p>
              </div>
              <SpeakButton text={`${title}. ${text}`} />
            </div>
          ))}
        </div>

        <section className="mb-8">
          <h2 className="font-display text-2xl">Hikâye köşesi</h2>
          <div className="mt-1 flex items-start gap-2">
            <p className="text-base text-muted">
              Burası oyundan ayrı. Her hikâye beş kısa cümle. Hoparlöre bas, dinle.
            </p>
            <SpeakButton text="Burası oyundan ayrı. Her hikâye beş kısa cümle. Hoparlöre bas, dinle." />
          </div>
          <div className="mt-4 grid gap-4">
            {TALE_SHELF.map((shelf) => (
              <article key={shelf.id} className="rounded-2xl border border-line bg-surface p-5">
                <p className="text-sm text-ice">{shelf.place}</p>
                <h3 className="mt-1 font-display text-2xl">{shelf.title}</h3>
                <div className="mt-4 grid gap-4">
                  {shelf.stories.map((story) => (
                    <div key={story.name} className="rounded-xl border border-line p-4">
                      <div className="flex items-start gap-2">
                        <h4 className="flex-1 font-display text-xl text-accent">{story.name}</h4>
                        <SpeakButton text={`${story.name}. ${story.lines.join(" ")}`} />
                      </div>
                      <div className="mt-2 space-y-1 text-base">
                        {story.lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="mb-8 rounded-2xl border border-line bg-surface p-5">
          <h2 className="font-display text-2xl">Etkin Arşiv ve NSSDCA</h2>
          <div className="mt-2 flex items-start gap-2">
            <p className="text-base text-muted">
              Bu ayrım, Etkin Arşiv ile Uzay Bilimi Veri Arşivi arasındaki mutabakata
              göredir. Bu sayfa o mutabakatın imzalı kopyası değildir. Rolleri ona göre uygular.
            </p>
            <SpeakButton text="Bu ayrım, Etkin Arşiv ile Uzay Bilimi Veri Arşivi arasındaki mutabakata göredir. Bu sayfa o mutabakatın imzalı kopyası değildir. Rolleri ona göre uygular." />
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-line p-4">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl text-accent">Etkin Arşiv</h3>
                <SpeakButton text="Etkin Arşiv. Bu disiplin için giriş kapısı. Kaydı çevrimiçi sunar. Kataloğu tutar. Verinin tek başına anlaşılmasını sağlar. Kalıcı arşive ne teslim edileceğini planlar." />
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-base">
                <li>Bu disiplin için giriş kapısı.</li>
                <li>Kaydı çevrimiçi sunar.</li>
                <li>Kataloğu tutar.</li>
                <li>Verinin tek başına anlaşılmasını sağlar.</li>
                <li>Kalıcı arşive ne teslim edileceğini planlar.</li>
              </ul>
            </article>
            <article className="rounded-2xl border border-line p-4">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl text-ice">NSSDCA</h3>
                <SpeakButton text="NSSDCA. Uzay biliminin kalıcı arşivi. 1966’dan beri. Uzun süre saklar, kopyayı güvende tutar. Ana katalogda durumu izler. İstenince toplu kopyayı geri verir. Eski ve yalnız onda olan veriyi, istek üzerine açar." />
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-base">
                <li>Uzay biliminin kalıcı arşivi. 1966’dan beri.</li>
                <li>Uzun süre saklar, kopyayı güvende tutar.</li>
                <li>Ana katalogda durumu izler.</li>
                <li>İstenince toplu kopyayı geri verir.</li>
                <li>Eski ve yalnız onda olan veriyi, istek üzerine açar.</li>
              </ul>
            </article>
          </div>
          <p className="mt-4 text-base">
            Kalıcı arşiv:{" "}
            <a className="text-ice underline" href="https://nssdc.gsfc.nasa.gov/">
              Kalıcı arşiv
            </a>
            . Buradaki yazı ve fotoğraf, o arşivin yerine geçmez.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="font-display text-2xl">Çocuklar için kapılar</h2>
          <div className="mt-1 flex items-start gap-2">
            <p className="text-base text-muted">
              Burası onların sitesi değil. Oyun ve video için asıl kapılar şunlar.
            </p>
            <SpeakButton text="Burası onların sitesi değil. Oyun ve video için asıl kapılar şunlar." />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {[
              [
                "Oyun oyna",
                "Anaokulu ve ilkokul. Kısa oyunlar.",
                "https://www.nasa.gov/learning-resources/nasa-kids-club/",
              ],
              [
                "Uzayı oku",
                "Güneş, Ay ve gezegenler, çocuklar için.",
                "https://science.nasa.gov/kids/",
              ],
              [
                "Dünya’yı tanı",
                "İklim ve Dünya, çocuklar için.",
                "https://science.nasa.gov/kids/earth/",
              ],
            ].map(([title, text, href]) => (
              <div key={href} className="flex items-start gap-2 rounded-2xl border border-line bg-surface p-4">
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="min-w-0 flex-1 text-left hover:text-ice"
                >
                  <h3 className="font-display text-xl text-ice">{title}</h3>
                  <p className="mt-1 text-base text-muted">{text}</p>
                </a>
                <SpeakButton text={`${title}. ${text}`} />
              </div>
            ))}
          </div>
        </section>
        <section className="rise mb-8 rounded-2xl border border-line bg-surface p-4">
          <h2 className="font-display text-2xl">Katalog: yıllar</h2>
          <div className="mt-1 flex items-start gap-2">
            <p className="text-base text-muted">
              Çizgi kendi akar. Bir noktaya bas. Turuncu Ay, kırmızı Mars, mavi çok uzak robot.
            </p>
            <SpeakButton text="Çizgi kendi akar. Bir noktaya bas. Turuncu Ay, kırmızı Mars, mavi çok uzak robot." />
          </div>
          <div className="mt-3 h-80 overflow-hidden rounded-xl bg-bg md:h-96">
            <TimelineView
              focusId={focusId}
              onPick={(event) => {
                const place = MARKERS.find((item) => item.id === event.id);
                if (place) {
                  setMarker(place);
                  setFocusId(place.id);
                  return;
                }
                const far = PROBES.find((item) => item.id === event.id);
                if (far) setProbe(far);
              }}
            />
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {TIMELINE.map((event) => (
              <button
                key={event.id}
                type="button"
                onClick={() => {
                  setFocusId(event.id);
                  const place = MARKERS.find((item) => item.id === event.id);
                  if (place) setMarker(place);
                  else {
                    const far = PROBES.find((item) => item.id === event.id);
                    if (far) setProbe(far);
                  }
                }}
                className="shrink-0 rounded-full border border-line px-4 py-3 text-base"
              >
                {event.year} {event.name}
              </button>
            ))}
          </div>
        </section>
        {globeBody ? (
          <section className="rise mb-8 rounded-2xl border border-line bg-surface p-4">
            <h2 className="font-display text-2xl">
              {globeBody === "moon" ? "Ay’da kalanlar" : "Mars’ta kalanlar"}
            </h2>
            <div className="mt-1 flex items-start gap-2">
              <p className="text-sm text-muted">
                Turuncu: indiği yer. Yeşil: henüz gidilmedi. Mavi: dağ ya da çukur. Bas, fotoğraf gelsin.
              </p>
              <SpeakButton text="Turuncu, indiği yer. Yeşil, henüz gidilmedi. Mavi, dağ ya da çukur. Bas, fotoğraf gelsin." />
            </div>
            <div className="mt-3 h-96 overflow-hidden rounded-xl bg-bg md:h-[28rem]">
              <GlobeView
                body={globeBody}
                focusId={focusId}
                onPick={(picked) => {
                  setMarker(picked);
                  setFocusId(picked.id);
                }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {markers.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFocusId(item.id);
                    setMarker(item);
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm"
                >
                  <span
                    className={
                      item.kind === "c"
                        ? "h-2 w-2 rounded-full bg-ice"
                        : item.kind === "p"
                          ? "h-2 w-2 rounded-full bg-ok"
                          : "h-2 w-2 rounded-full bg-accent"
                    }
                  />
                  {item.name}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        <div className="mt-2">
          <ArchiveChat />
        </div>

        <div className="my-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filtre">
          {FILTERS.map((item) => {
            const on = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setFilter(item.id);
                  setFocusId(null);
                }}
                className={
                  on
                    ? "rounded-full bg-accent px-5 py-3 text-base font-medium text-black"
                    : "rounded-full border border-line bg-surface px-5 py-3 text-base text-fg"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {filter === "all" || filter === "far" ? (
          <section className="mb-8">
            <h2 className="font-display text-2xl">Katalog: hâlâ uzaklaşanlar</h2>
            <div className="mt-1 flex items-start gap-2">
              <p className="text-base text-muted">
                Bunlar yere inip kalmadı. Gittikçe uzaklaşıyorlar. Kimisi hâlâ konuşuyor.
              </p>
              <SpeakButton text="Bunlar yere inip kalmadı. Gittikçe uzaklaşıyorlar. Kimisi hâlâ konuşuyor." />
            </div>
            <div className="mt-4 grid gap-3">
              {PROBES.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5"
                >
                  <button
                    type="button"
                    onClick={() => setProbe(item)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                      <span className="font-display text-base text-accent">{item.year}</span>
                      <span className="rounded-full border border-ice px-2 py-0.5 text-ice">{item.status}</span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl">{item.name}</h3>
                    <p className="mt-2">{item.summary}</p>
                    <p className="mt-2 text-sm text-accent">Hikâyesini oku</p>
                  </button>
                  <SpeakButton text={`${item.name}. ${item.summary} Bugün: ${item.today}`} />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {filter === "far" ? null : (
          <>
            <h2 className="mb-4 font-display text-2xl">Katalog: gitmeyen planlar</h2>
            <div className="mb-4 flex items-start gap-2">
              <p className="text-base text-muted">
                Üstteki turuncu noktalar gerçekten orada. Bunlar ise yola çıkmadı.
              </p>
              <SpeakButton text="Üstteki turuncu noktalar gerçekten orada. Bunlar ise yola çıkmadı." />
            </div>
            <div className="relative ml-2 border-l border-line pl-6">
          {missions.map((item) => (
            <article key={item.id} className="rise relative mb-5">
              <span
                className={
                  item.body === "mars"
                    ? "absolute top-6 -left-[31px] h-3.5 w-3.5 rounded-full border-2 border-bg bg-ice"
                    : item.body === "earth"
                      ? "absolute top-6 -left-[31px] h-3.5 w-3.5 rounded-full border-2 border-bg bg-ok"
                      : "absolute top-6 -left-[31px] h-3.5 w-3.5 rounded-full border-2 border-bg bg-accent"
                }
              />
              <div className="w-full rounded-2xl border border-line bg-surface p-5">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    onClick={() => setMission(item)}
                    className="min-w-0 flex-1 text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted">
                      <span className="font-display text-base text-accent">{item.year}</span>
                      <span className="rounded-full border border-line px-2 py-0.5">{bodyLabel(item.body)}</span>
                      <span className="rounded-full border border-ice px-2 py-0.5 text-ice">{item.status}</span>
                    </div>
                    <h3 className="mt-2 font-display text-2xl">{item.title}</h3>
                    <p className="mt-2 text-fg">{item.summary}</p>
                    <p className="mt-3 border-t border-dashed border-line pt-3 text-sm text-muted">
                      <span className="text-fg">Bugün: </span>
                      {item.legacy}
                    </p>
                    <p className="mt-2 text-sm text-accent">Ayrıntıları oku</p>
                  </button>
                  <SpeakButton text={`${item.title}. ${item.summary} Bugün: ${item.legacy}`} />
                </div>
              </div>
            </article>
          ))}
            </div>
          </>
        )}

        <SolarFlight />

        <p className="mx-auto mt-8 flex max-w-lg items-center justify-center gap-2 text-center font-display text-xl text-fg">
          <span>“Görev biter. Robot orada kalır.”</span>
          <SpeakButton text="Görev biter. Robot orada kalır." />
        </p>
        <MarsGame />
      </main>

      <footer className="border-t border-line px-5 py-8 text-center text-sm text-muted">
        <div className="mx-auto flex max-w-3xl items-start justify-center gap-2">
          <p>
            Bu sayfa bir etkin arşiv penceresidir. Kalıcı arşiv{" "}
            <a className="text-ice underline" href="https://nssdc.gsfc.nasa.gov/">
              NSSDCA
            </a>
            ’dır. Bu sayfa onun yerine geçmez. Fotoğraflar{" "}
            <a className="text-ice underline" href="https://images.nasa.gov/">
              görüntü arşivinden
            </a>{" "}
            alındı. Luna 9, Chang’e 4, Chandrayaan-3 ve Shackleton için orada kare yok. SMAP özeti{" "}
            <a
              className="text-ice underline"
              href="https://www.earthdata.nasa.gov/data/platforms/space-based-platforms/smap"
            >
              Earthdata
            </a>{" "}
            sayfasına dayanır.
          </p>
          <SpeakButton text="Bu sayfa bir etkin arşiv penceresidir. Kalıcı arşiv NSSDCA’dır. Bu sayfa onun yerine geçmez. Fotoğraflar görüntü arşivinden alındı. SMAP özeti Earthdata sayfasına dayanır." />
        </div>
      </footer>

      {mission ? (
        <div
          className="veil-in fixed inset-0 z-40 overflow-y-auto bg-bg/80 px-4 py-8"
          onClick={() => setMission(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mission-title"
            className="sheet-in mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Kapat"
              onClick={() => setMission(null)}
              className="float-right rounded-full border border-line p-2"
            >
              <X size={18} />
            </button>
            <p className="text-sm text-muted">
              {mission.year} · {bodyLabel(mission.body)} · {mission.status}
            </p>
            <div className="mt-2 flex items-start gap-2">
              <h2 id="mission-title" className="font-display text-3xl">
                {mission.title}
              </h2>
              <SpeakButton text={`${mission.title}. ${mission.summary} Bugün: ${mission.legacy}`} />
            </div>
            <div className="mt-4 flex items-start gap-2 text-lg">
              <p className="flex-1">{mission.summary}</p>
              <SpeakButton text={mission.summary} />
            </div>
            <div className="mt-4 flex items-start gap-2 border-t border-dashed border-line pt-3 text-base text-muted">
              <p className="flex-1">
                <span className="text-fg">Bugün: </span>
                {mission.legacy}
              </p>
              <SpeakButton text={`Bugün: ${mission.legacy}`} />
            </div>
          </div>
        </div>
      ) : null}

      {probe ? (
        <div
          className="veil-in fixed inset-0 z-40 overflow-y-auto bg-bg/80 px-4 py-8"
          onClick={() => setProbe(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="probe-title"
            className="sheet-in mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Kapat"
              onClick={() => setProbe(null)}
              className="float-right rounded-full border border-line p-2"
            >
              <X size={18} />
            </button>
            <p className="text-sm text-muted">
              {probe.year} · Derin uzay · {probe.status}
            </p>
            <div className="mt-2 flex items-start gap-2">
              <h2 id="probe-title" className="font-display text-3xl">
                {probe.name}
              </h2>
              <SpeakButton text={`${probe.name}. ${probe.beats.join(" ")} Bugün: ${probe.today}`} />
            </div>
            <div className="mt-4 space-y-4">
              {probe.beats.map((paragraph, index) => (
                <div key={paragraph.slice(0, 24)}>
                  <h3 className="font-display text-lg text-accent">{BEATS[index]}</h3>
                  <div className="mt-1 flex items-start gap-2">
                    <p className="flex-1">{paragraph}</p>
                    <SpeakButton text={paragraph} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 border-t border-dashed border-line pt-3 text-sm text-muted">
              <p className="flex-1">
                <span className="text-fg">Bugün: </span>
                {probe.today}
              </p>
              <SpeakButton text={`Bugün: ${probe.today}`} />
            </div>
          </div>
        </div>
      ) : null}

      {marker ? (
        <div
          className="veil-in fixed inset-0 z-50 overflow-y-auto bg-bg/80 px-4 py-8"
          onClick={() => setMarker(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-title"
            className="sheet-in mx-auto max-w-2xl rounded-2xl border border-line bg-surface p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Kapat"
              onClick={() => setMarker(null)}
              className="float-right rounded-full border border-line p-2"
            >
              <X size={18} />
            </button>
            <p className="text-sm text-ice">{KIND_LABEL[marker.kind]}</p>
            <div className="mt-1 flex items-start gap-2">
              <h2 id="site-title" className="font-display text-3xl">
                {marker.name}
              </h2>
              <SpeakButton text={`${marker.name}. ${(STORIES[marker.id] ?? [marker.text]).join(" ")}`} />
            </div>
            {SITE_PHOTOS[marker.id] ? (
              <img
                src={SITE_PHOTOS[marker.id]}
                alt={marker.name}
                loading="lazy"
                decoding="async"
                className="mt-4 max-h-80 w-full rounded-xl object-cover"
              />
            ) : null}
            <div className="mt-4 space-y-4 text-fg">
              {(STORIES[marker.id] ?? [marker.text]).map((paragraph, index) => (
                <div key={paragraph.slice(0, 32)}>
                  {marker.kind !== "c" && (STORIES[marker.id]?.length ?? 0) >= 3 ? (
                    <h3 className="font-display text-lg text-accent">{BEATS[index] ?? "Devamı"}</h3>
                  ) : null}
                  <div className="mt-1 flex items-start gap-2">
                    <p className="flex-1">{paragraph}</p>
                    <SpeakButton text={paragraph} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-start gap-2 text-sm text-muted">
              <p className="flex-1">
                {SITE_PHOTOS[marker.id]
                  ? "Bu fotoğraf görev arşivinden."
                  : "Bu yerin fotoğrafı yok."}
              </p>
              <SpeakButton
                text={
                  SITE_PHOTOS[marker.id]
                    ? "Bu fotoğraf görev arşivinden."
                    : "Bu yerin fotoğrafı yok."
                }
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
