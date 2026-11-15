import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DICT, type Lang } from "@/i18n/dict";

export type { Lang };

const KEY = "site-lang";
const LANGS: Lang[] = ["tr", "en", "es", "de"];

type Ctx = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (text: string) => string;
};

const I18nContext = createContext<Ctx | null>(null);

const phraseKeys = Object.keys(DICT).sort((a, b) => b.length - a.length);

export function translate(lang: Lang, text: string): string {
  if (!text || lang === "tr") return text;
  const direct = DICT[text];
  if (direct) return direct[lang];
  const trimmed = text.trim();
  if (DICT[trimmed]) {
    const at = text.indexOf(trimmed);
    return text.slice(0, at) + DICT[trimmed][lang] + text.slice(at + trimmed.length);
  }
  let out = text;
  for (const key of phraseKeys) {
    if (key.length < 12 || !out.includes(key)) continue;
    out = out.split(key).join(DICT[key][lang]);
  }
  return out;
}

export function speechLang(lang: Lang) {
  if (lang === "en") return "en-US";
  if (lang === "es") return "es-ES";
  if (lang === "de") return "de-DE";
  return "tr-TR";
}

function readLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "es" || saved === "de" || saved === "tr") return saved;
  } catch {
    /* ignore */
  }
  return "tr";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("tr");

  useEffect(() => {
    setLangState(readLang());
  }, []);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    document.documentElement.lang = speechLang(lang).slice(0, 2);
    const root = document.body;
    let lock = false;

    const known = (value: string) => Boolean(DICT[value] || DICT[value.trim()]);

    const applyText = (node: Text) => {
      const raw = node.nodeValue ?? "";
      if (!raw.trim()) return;
      const marked = node as Text & { _src?: string };
      let src = marked._src;
      if (!src) {
        if (!known(raw)) return;
        src = known(raw.trim()) && !DICT[raw] ? raw.trim() : raw;
        marked._src = src;
      } else if (raw !== translate(lang, src) && raw !== src) {
        const ours = LANGS.some((code) => raw === translate(code, src));
        if (!ours && known(raw)) {
          src = DICT[raw] ? raw : raw.trim();
          marked._src = src;
        }
      }
      const next = translate(lang, marked._src || src);
      if (node.nodeValue !== next) {
        lock = true;
        node.nodeValue = next;
        lock = false;
      }
    };

    const walk = (node: Node) => {
      if (node instanceof HTMLElement && node.dataset.noTranslate != null) return;
      if (node.nodeType === Node.TEXT_NODE) {
        applyText(node as Text);
        return;
      }
      if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
        const field = node as HTMLInputElement & { _ph?: string };
        if (node.placeholder) {
          if (!field._ph) field._ph = node.placeholder;
          node.placeholder = translate(lang, field._ph);
        }
      }
      node.childNodes.forEach(walk);
    };

    walk(root);
    const observer = new MutationObserver((records) => {
      if (lock) return;
      for (const record of records) {
        if (record.target instanceof HTMLElement && record.target.closest("[data-no-translate]")) continue;
        if (record.type === "characterData" && record.target.nodeType === Node.TEXT_NODE) {
          applyText(record.target as Text);
        }
        record.addedNodes.forEach(walk);
      }
    });
    observer.observe(root, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      t: (text: string) => translate(lang, text),
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return (
    useContext(I18nContext) ?? {
      lang: "tr" as Lang,
      setLang: () => {},
      t: (text: string) => text,
    }
  );
}

const CHOICES: { id: Lang; label: string }[] = [
  { id: "tr", label: "Türkçe" },
  { id: "en", label: "English" },
  { id: "es", label: "Español" },
  { id: "de", label: "Deutsch" },
];

export function LanguageBar() {
  const { lang, setLang } = useI18n();
  return (
    <div data-no-translate="" className="sticky top-0 z-[80] border-b border-white/15 bg-black/75 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-2">
        <span className="mr-1 text-sm font-medium tracking-wide text-ice">Dil</span>
        {CHOICES.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => setLang(choice.id)}
            className={
              lang === choice.id
                ? "rounded-full bg-accent px-4 py-2 text-sm font-medium text-black"
                : "rounded-full border border-line px-4 py-2 text-sm text-fg"
            }
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}
