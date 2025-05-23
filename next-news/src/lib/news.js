import sql from 'better-sqlite3';

const db = sql('data.db');

export async function getAllNews() {
  const news = db.prepare('SELECT * FROM news').all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return news;
}

export async function getNewsItem(slug) {
  const newsItem = db.prepare('SELECT * FROM news WHERE slug = ?').get(slug);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return newsItem;
}

export async function getLatestNews() {
  const latestNews = db
    .prepare('SELECT * FROM news ORDER BY date DESC LIMIT 3')
    .all();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return latestNews;
}

export async function getAvailableNewsYears() {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year) => year.year);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return years;
}

export async function getAvailableNewsMonths(year) {
  return db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year)
    .map((month) => month.month);
}

export async function getNewsForYear(year) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

export async function getNewsForYearAndMonth(year, month) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return news;
}

export async function addNews(news, image) {
  const { slug, title, content, date } = news;
  const insert = db.prepare('INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)');
  const result = insert.run(slug, title, content, date, '');
  const id = result.lastInsertRowid;
  const imageFile = `news-${id}.${image.name.split('.').pop()}`;

  if (image) {
    await fs.writeFile(`/images/news/${imageFile}`, Buffer.from(await image.arrayBuffer()));
    db.prepare('UPDATE news SET image = ? WHERE id = ?').run(imageFile, id);
  }

  return { id, slug, title, content, date, image: imageFile };
}

export async function updateNews(news, image) {
  const { id, slug, title, content, date } = news;
  const imageFile = `news-${id}.${image.name.split('.').pop()}`;

  if (image) {
    await fs.writeFile(`/images/news/${imageFile}`, Buffer.from(await image.arrayBuffer()));
  }

  db.prepare(
    'UPDATE news SET slug = ?, title = ?, content = ?, date = ?, image = ? WHERE id = ?'
  ).run(slug, title, content, date, imageFile, id);

  return { ...news, image: imageFile };
}

export async function deleteNews(id) {
  const imageFile = db.prepare('SELECT image FROM news WHERE id = ?').get(id);
  db.prepare('DELETE FROM news WHERE id = ?').run(id);
  await fs.unlink(`/images/news/${imageFile}`).catch(() => {});
}
