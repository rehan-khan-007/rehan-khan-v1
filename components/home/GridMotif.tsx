// V4 grid motif (ADR-042): decorative layer, DC-extracted verbatim. Four
// hairlines + seam ticks + axis readout. Mounts as the LAST child of the
// hero section (see Hero.tsx) — sibling of both columns, never a child of
// the photo panel. pointer-events:none; purely visual.
export function GridMotif() {
  return (
    <div className="grid-motif" aria-hidden="true">
      <div className="grid-motif__top" />
      <div className="grid-motif__bottom" />
      <div className="grid-motif__seam" />
      <div className="grid-motif__tick grid-motif__tick--a" />
      <div className="grid-motif__tick grid-motif__tick--b" />
      <div className="grid-motif__tick grid-motif__tick--c" />
      <div className="grid-motif__readout">x · ẋ</div>
    </div>
  );
}
