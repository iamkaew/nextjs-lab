import ModalBackdrop from '@/components/modal-backdrop';
import { getNewsItem } from '@/lib/news';
import { notFound } from 'next/navigation';

export default async function InterceptedImageModal({ params }) {
  const {slug} = await params;
  const newsItem = await getNewsItem(slug);

  if (!newsItem) notFound();

  return (
    <ModalBackdrop>
    <dialog open className="modal">
      <img
        src={`/images/news/${newsItem.image}`}
        alt={newsItem.title}
      />
    </dialog>
    </ModalBackdrop>
  );
}