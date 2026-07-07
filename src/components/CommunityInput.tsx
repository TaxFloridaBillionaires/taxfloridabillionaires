import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Send, CheckCircle } from "lucide-react";
import { publicSubmit } from "@/lib/publicSubmit";

const sanitizeError = (error: unknown): string => {
  const msg = error instanceof Error ? error.message : String(error ?? "");
  if (msg.includes("too long") || msg.includes("format") || msg.includes("empty")) {
    return "Please check your input and try again.";
  }
  if (msg.includes("Too many") || msg.includes("rate")) {
    return "Too many requests. Please wait a moment.";
  }
  return "Submission failed. Please try again later.";
};

export const CommunityInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim() || submitting) return;
    setSubmitting(true);
    try {
      const { error } = await supabase.from("community_suggestions").insert({
        suggestion: suggestion.trim(),
        email: email.trim() || null,
      });
      if (error) throw error;
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setSuggestion("");
        setEmail("");
        setIsOpen(false);
      }, 2500);
    } catch (err) {
      setErrorMsg(sanitizeError(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input") as HTMLInputElement;
    const formEmail = input?.value?.trim();
    if (!formEmail) return;

    const btn = e.currentTarget.querySelector("button") as HTMLButtonElement;
    try {
      const { error } = await supabase.from("email_signups").insert({ email: formEmail });
      if (error && error.code === "23505") {
        // duplicate email
        if (btn) {
          btn.textContent = "Already signed up! ✊";
          setTimeout(() => { btn.textContent = "Keep in touch"; }, 2000);
        }
        return;
      }
      if (error) throw error;
      input.value = "";
      if (btn) {
        btn.textContent = "You're in! ✊";
        setTimeout(() => { btn.textContent = "Keep in touch"; }, 2000);
      }
    } catch (err) {
      if (btn) {
        btn.textContent = sanitizeError(err);
        setTimeout(() => { btn.textContent = "Keep in touch"; }, 3000);
      }
    }
  };

  return (
    <div className="mb-10">
      <h3 className="font-display text-3xl md:text-4xl text-foreground mb-4 flex items-center gap-3">
        <span className="w-3 h-3 rounded-full bg-gold" />
        Community Input
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Add Suggestion Card */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="group bg-card border border-border rounded-sm p-8 md:p-10 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:border-[hsl(50,90%,60%)]/40 cursor-pointer text-center min-h-[180px] relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-[hsl(50,80%,55%)]/10 via-[hsl(48,70%,45%)]/5 to-transparent" />
          <div className="relative z-10 w-14 h-14 rounded-full border-2 border-dashed border-muted-foreground/30 group-hover:border-[hsl(50,90%,60%)] flex items-center justify-center transition-colors duration-300">
            <Plus className="w-7 h-7 text-muted-foreground/50 group-hover:text-[hsl(50,90%,60%)] transition-colors duration-300" />
          </div>
          <p className="relative z-10 text-muted-foreground group-hover:text-foreground font-semibold text-lg md:text-xl transition-colors duration-300">
            Suggest Something
          </p>
          <p className="relative z-10 text-muted-foreground/60 text-xs md:text-sm">
            What else should the money fund?
          </p>
        </motion.button>

        {/* Email Signup Card */}
        <div className="bg-card border border-border rounded-sm p-6 md:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl md:text-3xl">☀️</span>
            <h4 className="text-foreground font-semibold text-lg md:text-xl">Join the Fight</h4>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm mb-4">
            Want to keep pushing for billionaire accountability in the Sunshine State? Drop your email.
          </p>
          <form onSubmit={handleEmailSignup} className="flex gap-2">
            <input
              name="fight-email"
              type="email"
              required
              placeholder="your@email.com"
              className="flex-1 h-10 rounded-sm border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))]"
            />
            <button
              type="submit"
              className="px-4 h-10 rounded-sm gradient-gold text-background font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Keep in touch
            </button>
          </form>
        </div>
      </div>

      {/* Suggestion Form Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-sm w-full max-w-md overflow-hidden"
            >
              <div className="gradient-gold px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl tracking-wide text-background" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  SUGGEST A SPENDING IDEA
                </h3>
                <button onClick={() => setIsOpen(false)} className="text-background/70 hover:text-background">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-3 py-8 text-center"
                  >
                    <CheckCircle className="w-12 h-12 text-[hsl(var(--emerald))]" />
                    <p className="text-foreground font-semibold text-lg">Thanks for your idea!</p>
                    <p className="text-muted-foreground text-sm">We'll review it for future updates.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-foreground text-sm font-medium mb-1.5 block">
                        What should the money fund? *
                      </label>
                      <textarea
                        value={suggestion}
                        onChange={(e) => { setSuggestion(e.target.value); setErrorMsg(""); }}
                        required
                        rows={3}
                        placeholder="e.g. Fund public transit expansion, create a statewide mental health hotline..."
                        className="w-full rounded-sm border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))] resize-none"
                      />
                    </div>

                    <div>
                      <label className="text-foreground text-sm font-medium mb-1.5 block">
                        Your email <span className="text-muted-foreground font-normal">(optional)</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="w-full h-10 rounded-sm border border-border bg-muted px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold))]"
                      />
                      <p className="text-muted-foreground/60 text-xs mt-1">
                        Get updates on the fight for billionaire accountability in FL.
                      </p>
                    </div>

                    {errorMsg && (
                      <p className="text-destructive text-sm">{errorMsg}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full h-10 rounded-sm gradient-gold text-background font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      {submitting ? "Submitting..." : "Submit Idea"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
