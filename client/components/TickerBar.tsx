import { getHomepageData } from "@/api/homepage";

const COLORS = ["red", "blue", "orange", "gold"];

export default async function TickerBar() {
  const homepageData = await getHomepageData();
  const items = homepageData?.ticker?.items?.map((item) => item.text);

  if (!items || items.length === 0) return null;

  return (
    <div id="ticker-bar" className="ticker-bar">
      <div className="ticker-track" aria-hidden="true">
        {items.map((item, i) => (
          <span key={i} className="ticker-item">
            <span className={`ticker-dot dot-${COLORS[i % 4]}`} />
            {item}
          </span>
        ))}
        {items.map((item, i) => (
          <span key={`repeat-${i}`} className="ticker-item">
            <span className={`ticker-dot dot-${COLORS[i % 4]}`} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
