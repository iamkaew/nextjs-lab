import { getAllNews, addNews } from '@/lib/news';

export function GET() {
  return Response.json(getAllNews());
}

export async function POST(request) {
  const body = await request.json();

  if (!body.title || !body.content || !body.slug) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  const newItem = {
    id: 'n' + Date.now(),
    title: body.title,
    slug: body.slug,
    content: body.content,
    image: body.image || 'news.jpg',
    date: new Date().toISOString().split('T')[0],
  };

  addNews(newItem);
  return Response.json({ message: 'News added', data: newItem }, { status: 201 });
}