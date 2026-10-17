// Catalog items are numbered "01" … "45", and some share a range such as "37–39".
// Returns the group's first/last number and how many categories it covers.
export function groupRange(items) {
  const first = Number(items[0].n.split('–')[0]);
  const last = Number(items.at(-1).n.split('–').pop());
  const pad = (n) => String(n).padStart(2, '0');
  return { label: `${pad(first)} – ${pad(last)}`, count: last - first + 1 };
}
