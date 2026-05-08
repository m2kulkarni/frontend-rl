# Design — Diversity Strategy & Decision Log

This is a running decision log for the Proximal work-trial recipe. It captures *why* we made choices, not just what they are. New design-level decisions get appended here; implementation details live elsewhere.

---

## 1. The trial in one sentence

Build a pipeline that **generates RL environments at scale**, where each environment is a multi-page website (≥5 pages) and the agent's task is to replicate the design from screenshots into code. Functionality is out of scope; only design is graded, on a continuous spectrum.

## 2. Guiding philosophy

> **The product we are shipping is a grader, and a report that proves the grader is good. The pipeline is a means to that end.**

Everything that follows is in service of this. Concretely:

- We will spend disproportionate effort on **grader monotonicity** (i.e., higher score reliably means visually closer to target, in human judgment). The brief explicitly says: *"if your grading is bad, you're just introducing noise to the model."*
- The website generator exists to produce **distinct, gradeable** sites — not just to look impressive. Every diversity decision below is also a grading decision.
- The deliverable report is not a log dump. It is a curated narrative that *convinces* the reader the grader is monotonic, with score-band side-by-sides, distributions, and failure-mode analysis.

## 3. Diversity strategy: architectural-style-led

### Decision

Diversity is anchored on **historical architectural traditions** as the primary aesthetic axis. Each generated site commits to one tradition and expresses it across all 5+ pages (palette, typography, motifs, layout proportions, ornamental detail).

The five chosen traditions are:

1. **Roman Imperial**
2. **Dravidian** (South Indian Hindu temple architecture)
3. **High Gothic** (Notre-Dame era, ~12th–14th c.)
4. **Persian Safavid**
5. **Edo-period Japanese**

### Why these axes (and not "industry" or "layout type" first)

- **Generic SaaS-style diversity is a trap.** Crank temperature on "make me a website" and you get the same hero + features + CTA in 50 colors. Layout/industry as the *primary* axis converges on visually similar output.
- **Architectural traditions force commitment to specific design vocabulary.** A Gothic site has to earn its pointed arches, vertical elongation, and jewel tones. A Dravidian site has to nail the gopuram silhouette, polychrome figural density, and saturated palette. Models cannot phone this in, and the grader gets *real signal* (palette, motif presence, proportions) to grade against.
- **The five styles are maximally orthogonal.** Mediterranean classical, Western medieval Christian, South Asian Hindu, Middle Eastern Islamic, East Asian. Palette / motif / typography fingerprints barely overlap, which is good for both diversity and grading.
- **Multi-page coherence becomes more interesting and more gradeable.** "Does the agent maintain Dravidian vocabulary across all 5 pages, or does page 4 drift into generic-modern?" is exactly the failure mode worth surfacing.
- **Striking deliverable.** The report will visibly stand out from the median submission.

### Why these *specific* names (not "Greco-Roman" / "Indian" / "Islamic")

Vague style names produce flat, stereotyped LLM output. "Indian" alone spans Mughal, Dravidian, Indo-Saracenic, Rajput — all visually distinct. Pinning each style to a specific tradition:
- Gives the LLM concrete reference points → much higher generation quality
- Avoids visually-generic "exotic-looking" output, which is both bad design *and* culturally insensitive
- Makes the grader's job easier (a known fingerprint to match against)

| Generic name | Specific tradition we use | Why this lane |
|---|---|---|
| Greco-Roman | Roman Imperial | Distinct from Classical Greek; richer ornamental vocabulary (mosaics, friezes) |
| Indian | Dravidian (South Indian Hindu temple) | Distinct from Mughal/Indo-Islamic; non-overlapping with Persian Safavid |
| Gothic | High Gothic | Distinct from Gothic Revival (which is Victorian pastiche) |
| Islamic | Persian Safavid | Tilework-focused Islamic vocabulary; pairs well against the others |
| Japanese | Edo-period | Distinct from monastic Heian; commercially mature, more material variety |

We initially considered Mughal as the South Asian entry but swapped to Dravidian to remove overlap with Persian Safavid (both Mughal and Persian lean on Islamic geometric tessellation). Dravidian is Hindu temple tradition — gopurams, mandapas, figural sculpture, polychrome stucco — and shares almost nothing visually with the other four.

### What architectural style is *not*

It is the **visual / aesthetic layer**, not the **layout / page-purpose layer**. A Dravidian restaurant chain and a Dravidian university share palette + motifs + type but need very different page structures and copy. So eventually:

```
architectural_style × site_purpose × modernity × industry × typography_pair × color_variant
        5           ×       8       ×    2     ×   N      ×       N         ×      N
```

We are not populating all dimensions on day one. We *are* shaping the generator code so adding axes later is additive, not refactoring.

## 4. Refinements to the architectural-style approach

### 4a. Modernity dial (binary, day-one)

For each style we sample one of:
- **Period-faithful** — looks like an illuminated manuscript / restored fresco / temple guidebook. Fully committed to the historical aesthetic.
- **Modern interpretation** — contemporary site that *uses the vocabulary* (palette, motifs, proportions) but with modern UX (system fonts, real navigation, responsive grids). Most real-world "stylistically-Gothic" or "stylistically-Dravidian" websites are in this mode.

This doubles diversity for free and forces the model to handle both extremes. It's also where the more interesting failure modes live (e.g., "model nails the period-faithful palette but its modern-interpretation Gothic looks just like a generic dark-mode site").

### 4b. Curated motif/asset library

Some elements simply do not come out of pure-prose LLM prompts at acceptable quality:
- Persian geometric tessellation (girih)
- Dravidian gopuram silhouettes, yali figures, lotus motifs, stepped tiering
- Gothic stained-glass blocking, tracery, pointed arches
- Japanese shoji grid proportions and wagara textile patterns
- Roman ornamental friezes and column orders

Approach: **a small library of SVG motifs per style** that the generator references. The LLM composes pages; it does not have to draw geometry from scratch. This is also a grading gift — known motifs are easier to detect in agent output.

### Asset sources (public-domain, ready to use)

Primary source: **Owen Jones — *The Grammar of Ornament* (1856).** Public-domain reference book with full color plates covering Roman, Persian, Moorish, Indian (Hindu *and* Mughal motifs), and Gothic. Available on Internet Archive and Wikimedia Commons.

| Style | Source(s) |
|---|---|
| Roman Imperial | Grammar of Ornament; Wikimedia ("Pompeian frescoes", "Roman friezes") |
| Dravidian | Grammar of Ornament (Hindu plates); Wikimedia ("gopuram", "Hoysala", "Meenakshi temple"); Met Open Access (CC0) |
| High Gothic | Grammar of Ornament; Pugin's *Glossary of Ecclesiastical Ornament* (PD) |
| Persian Safavid | Grammar of Ornament; David Wade's *patterninislamicart.com* archive |
| Edo Japanese | Wikimedia "wagara" + "kamon" — asanoha, shippo, seigaiha patterns are PD |

Plus: **programmatic generation** for Persian geometric tessellation (girih-tile / polygon-in-contact methods) — gives us guaranteed distinctness and parameterization. Possibly also for Japanese wagara (algorithmic seigaiha / asanoha).

## 5. What we're explicitly *not* doing (yet)

- Not crawling existing websites (forbidden by the brief).
- Not building a fancy template DSL. Prompt-driven LLM generation against the motif library is sufficient.
- Not pursuing all six taxonomy dimensions on day one. Architectural style + modernity dial first; layer on industry / typography / color systems after the pipeline is end-to-end stable.
- Not starting bonuses (animations, multiple frameworks) until Part 1 is solid. The brief is explicit on this.

## 6. Open questions / next steps

- **Harbor task interface.** Need to read the Harbor repo (`uv tool install harbor` already done) to see exactly what shape a task definition takes — that constrains generator output format.
- **Modernity-dial fidelity.** Should "modern-interpretation" be a free-form prompt knob or a small set of named modes (e.g., "minimalist-modern", "editorial-modern", "brutalist-modern")? Lean toward named modes for reproducibility, but TBD.
- **Motif library format.** SVG files on disk vs. inlined snippets the prompt can quote? Probably both: SVG files referenced by path in prompts, plus a small inline-snippet vocabulary the LLM can compose.
- **Grader composition (next decision doc).** What signals, what weights, how we calibrate against human judgment.

## 7. Discrepancy in the brief — flag for Proximal

The trial says *"test using Claude Code with Opus 4.7"* but the eval section says *"running Claude Code with Opus 4.6 10 times."* Worth confirming with the point of contact which model they want for the evaluation runs.
