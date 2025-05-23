export const metadata = {
  title: 'Next.js Page Routing & Rendering',
  description: 'Learn how to route to different pages.',
};

export default function AdminLayout({ children }) {
  return (
    <div id='page'>
      {children}
    </div>
  );
}