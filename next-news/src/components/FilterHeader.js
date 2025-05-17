import { getAvailableNewsYears, getAvailableNewsMonths } from '@/lib/news';
import Link from 'next/link';

export default async function FilterHeader({ year, month }) {
  const availableYears = await getAvailableNewsYears();
  const availableMonths = year ? getAvailableNewsMonths(year) : [];

  if (year && !availableYears.includes(year)) {
    throw new Error('ปีไม่ถูกต้อง');
  }
  if (month && !availableMonths.includes(month)) {
    throw new Error('เดือนไม่ถูกต้อง');
  }

  return (
    <header>
      <h2>ปี: {year} เดือน: {month || '-'}</h2>
      {/* ลิงก์สำหรับปี/เดือน */}
    </header>
  );
}