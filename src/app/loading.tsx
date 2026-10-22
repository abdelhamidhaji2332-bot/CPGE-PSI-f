export default function Loading() {
  return <div className="mx-auto max-w-6xl space-y-4 px-4 py-10">{[...Array(6)].map((_, i) => <div key={i} className="skeleton h-14 rounded-lg" />)}</div>;
}
