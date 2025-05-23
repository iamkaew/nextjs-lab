'use client';
import { useState, useEffect } from 'react';
import styles from './admin.module.css';

export default function AdminPage() {
  const [newsList, setNewsList] = useState([{
    id: '',
    slug: '',
    title: '',
    image: '',
    date: '',
    content: ''
  }]);
  const [form, setForm] = useState({ id: '', slug: '', title: '', content: '', date: '', image: null });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(setNewsList);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, ...rest } = form;

    if (id) {
      await updateNews(form, form.image);
    } else {
      await addNews(rest, form.image);
    }

    setForm({ id: '', slug: '', title: '', content: '', date: '', image: null });
    setPreview('');
    getAllNews().then(setNewsList);
  };

  const handleEdit = (item) => {
    setForm(item);
    setPreview(`/images/news/${item.id}.jpg`);
  };

  const handleDelete = async (id) => {
    await deleteNews(id);
    getAllNews().then(setNewsList);
  };

  return (
    <>
      <h1>Manage News</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="hidden" name="id" value={form.id} />
        <input name="slug" placeholder="Slug" value={form.slug} onChange={handleChange} required />
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required />
        <input name="date" type="date" value={form.date} onChange={handleChange} required />
        <input name="image" type="file" accept="image/*" onChange={handleChange} />
        {preview && <img src={preview} alt="preview" className={styles.preview} />}
        <button type="submit">{form.id ? 'Update' : 'Create'} News</button>
      </form>

      <ul className={styles.list}>
        {newsList.map((item) => (
          <li key={item.id}>
            <strong>{item.title}</strong> ({item.date})<br />
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}