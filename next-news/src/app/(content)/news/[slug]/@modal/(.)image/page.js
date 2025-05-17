import ModalBackdrop from '@/components/modal-backdrop';
import { getNewsItem } from '@/lib/news';
import { notFound } from 'next/navigation';
import { use } from 'react';

export default async function InterceptedImageModal({ params }) {
  const {slug} = use(params);
  const newsItem = await getNewsItem(slug);

  if (!newsItem) notFound();

  return (
    <>
    <ModalBackdrop />
    <dialog open className="modal" onClick={(e) => e.stopPropagation()}>
      <img
        src={`/images/news/${newsItem.image}`}
        alt={newsItem.title}
      />
    </dialog>
    </>
  );
}