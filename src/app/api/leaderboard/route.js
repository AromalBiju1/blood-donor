
import { getDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await getDB();

    const query = `
      SELECT dp.user_id, dp.id, u.name, dp.points
FROM donor_points dp
JOIN users u ON dp.user_id = u.id
ORDER BY dp.points DESC;
    `;

    const [rows] = await db.execute(query);

    const leaderboard = rows.map((row) => ({
    user_id : row.user_id,
      name: row.name,
      points: row.points,

    }));

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}