import { NextResponse } from 'next/server';
import { openDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await openDb();
    const leads = await db.all('SELECT * FROM leads ORDER BY date DESC');
    return NextResponse.json({ success: true, leads });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await openDb();
    
    const id = "lead-" + Date.now();
    const date = new Date().toISOString();
    const status = "New";

    await db.run(
      `INSERT INTO leads (id, name, email, phone, age, education, ielts, experience, preferredCountry, type, score, status, message, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        data.name || null,
        data.email || null,
        data.phone || null,
        data.age || null,
        data.education || null,
        data.ielts || null,
        data.experience || null,
        data.preferredCountry || null,
        data.type || null,
        data.score || null,
        status,
        data.message || null,
        date
      ]
    );

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error adding lead:', error);
    return NextResponse.json({ success: false, error: 'Failed to add lead' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const db = await openDb();
    await db.run('DELETE FROM leads WHERE id = ?', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const data = await request.json();
    const db = await openDb();
    await db.run('UPDATE leads SET status = ? WHERE id = ?', [data.status, data.id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
