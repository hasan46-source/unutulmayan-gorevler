import { useEffect, useState } from "react";
import { Square, Volume2 } from "lucide-react";
import { speechLang, useI18n, type Lang } from "@/i18n/lang";

function voicesFor(lang: Lang) {
  const code = speechLang(lang).toLowerCase();
  const short = code.slice(0, 2);
  return (window.speechSynthesis?.getVoices?.() ?? []).filter((voice) => {
    const id = voice.lang.toLowerCase().replace("_", "-");
    return id === code || id.startsWith(`${short}-`) || id === short;
  });
}

function pickVoice(lang: Lang) {
  const pool = voicesFor(lang);
  if (!pool.length) return undefined;
  const prefer =
    lang === "en"
      ? /google us english|samantha|zira|google uk english female|natural/i
      : lang === "es"
        ? /google español|google espanol|paulina|helena|sabina|elvira|natural/i
        : lang === "de"
          ? /google deutsch|hedda|anna|katja|natural/i
          : /yelda|filiz|emel|google türkçe|google turkce/i;
  return [...pool].sort((a, b) => Number(prefer.test(b.name)) - Number(prefer.test(a.name)))[0];
}

export function SpeakButton({ text }: { text: string }) {
  const [on, setOn] = useState(false);
  const { lang, t } = useI18n();

  useEffect(() => {
    window.speechSynthesis?.getVoices?.();
    return () => {
      if (on) window.speechSynthesis?.cancel();
    };
  }, [on]);

  function speak(line: string) {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(line);
    utter.lang = speechLang(lang);
    utter.rate = lang === "en" ? 0.95 : 0.92;
    utter.pitch = lang === "tr" ? 1.12 : 1;
    const voice = pickVoice(lang);
    if (voice) utter.voice = voice;
    utter.onend = () => setOn(false);
    utter.onerror = () => setOn(false);
    setOn(true);
    synth.cancel();
    window.setTimeout(() => synth.speak(utter), 40);
  }

  function toggle() {
    const synth = window.speechSynthesis;
    const line = t(text).trim();
    if (!synth || !line) return;
    if (on) {
      synth.cancel();
      setOn(false);
      return;
    }
    const start = () => speak(line);
    if (!synth.getVoices().length) {
      const once = () => {
        synth.removeEventListener("voiceschanged", once);
        start();
      };
      synth.addEventListener("voiceschanged", once);
      synth.getVoices();
      return;
    }
    start();
  }

  return (
    <button
      type="button"
      aria-label={on ? t("Okumayı durdur") : t("Hoparlörle dinle")}
      onClick={(event) => {
        event.stopPropagation();
        toggle();
      }}
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-bg text-fg"
    >
      {on ? <Square size={14} aria-hidden /> : <Volume2 size={16} aria-hidden />}
    </button>
  );
}
