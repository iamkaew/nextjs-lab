import { getNewsForYear, getNewsForYearAndMonth } from '@/lib/news';
import NewsList from '@/components/NewsList';

export default async function FilteredNews({ year, month }) {
  let news;
  if (year && !month) {
    news = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month);
  } else {
    news = [];
  }

  if (!news || news.length === 0) {
    return <p>ไม่มีข่าวสำหรับช่วงเวลานี้</p>;
  }

  return <NewsList news={news} />;
}