import { useState } from "react";
import { Send } from "lucide-react";
import { askArchive } from "@/lib/ask.functions";
import { localAnswer } from "@/data/archive";
import { SpeakButton } from "@/components/SpeakButton";

type Turn = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = ["Ay’da ne kaldı?", "Voyager nerede?", "Mars’taki robot ne yaptı?"];

export function ArchiveChat() {
  const [question, setQuestion] = useState("");
  const [turns, setTurns] = useState<Turn[]>([]);
  const [busy, setBusy] = useState(false);

  async function ask(raw: string) {
    const q = raw.trim();
    if (!q || busy) return;
    setQuestion("");
    setBusy(true);
    setTurns((prev) => [...prev, { role: "user", text: q }]);
    try {
      const res = await askArchive({ data: { question: q } });
      const text = res.ok ? res.text : localAnswer(q);
      setTurns((prev) => [...prev, { role: "assistant", text }]);
    } catch {
      setTurns((prev) => [...prev, { role: "assistant", text: localAnswer(q) }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-2xl rounded-2xl border border-line bg-surface p-4 text-left">
      <h2 className="font-display text-xl text-fg">Bana sor</h2>
      <p className="mt-1 text-base text-muted">Yalnızca bu sitedeki robotları bilirim.</p>
      <div className="mt-3 flex max-h-64 flex-col gap-2 overflow-y-auto">
        {turns.map((turn, i) =>
          turn.role === "user" ? (
            <p key={i} className="ml-auto max-w-[90%] rounded-xl bg-accent px-3 py-2 text-sm text-black">
              {turn.text}
            </p>
          ) : (
            <div key={i} className="mr-auto flex max-w-[90%] items-end gap-2">
              <p className="rounded-xl border border-line bg-bg px-3 py-2 text-sm text-fg">{turn.text}</p>
              <SpeakButton text={turn.text} />
            </div>
          ),
        )}
        {busy ? <p className="text-sm text-muted">Bakıyorum…</p> : null}
      </div>
      <form
        className="mt-3 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          void ask(question);
        }}
      >
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={400}
          placeholder="Bir robotun adını yaz"
          className="min-w-0 flex-1 rounded-xl border border-line bg-bg px-3 py-3 text-base text-fg outline-none placeholder:text-muted"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 text-sm font-medium text-black disabled:opacity-60"
        >
          <Send size={16} aria-hidden />
          Sor
        </button>
      </form>
      <div className="mt-3 flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => void ask(s)}
            className="rounded-full border border-line px-3 py-2 text-sm text-fg"
          >
            {s}
          </button>
        ))}
      </div>
    </section>
  );
}
