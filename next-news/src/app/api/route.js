export const runtime = 'nodejs';

import { updateNews, deleteNews } from '@/lib/news';

export async function PUT(req) {
  try {
    const form = await req.formData();
    const news = {
      id: form.get('id'),
      slug: form.get('slug'),
      title: form.get('title'),
      content: form.get('content'),
      date: form.get('date'),
    };
    const file = form.get('image');

    const result = await updateNews(news, file);
    return Response.json(result);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    await deleteNews(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}