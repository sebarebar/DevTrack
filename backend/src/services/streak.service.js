import pool from '../db.js';

export const calculateStreak = async (userId) => {
    const result = await pool.query(
        `
    SELECT log_date
    FROM study_logs
    WHERE user_id = $1
    ORDER BY log_date DESC
    `,
        [userId]
    );

    const dates = result.rows.map(row => {
        const date = new Date(row.log_date);
        date.setHours(0, 0, 0, 0);
        return date;
    });

    if (dates.length === 0) {
        await pool.query(
            `
      UPDATE user_stats
      SET
        current_streak = 0,
        longest_streak = 0,
        updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
      `,
            [userId]
        );

        return {
            currentStreak: 0,
            longestStreak: 0,
        };
    }

    // ---------- LONGEST STREAK ----------

    let longestStreak = 1;
    let streak = 1;

    for (let i = 1; i < dates.length; i++) {

        const diff =
            (dates[i - 1] - dates[i]) /
            (1000 * 60 * 60 * 24);

        if (diff === 1) {
            streak++;
            longestStreak = Math.max(longestStreak, streak);
        } else {
            streak = 1;
        }

    }

    // ---------- CURRENT STREAK ----------

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    let currentStreak = 0;

    const firstDate = dates[0];

    if (
        firstDate.getTime() === today.getTime() ||
        firstDate.getTime() === yesterday.getTime()
    ) {

        currentStreak = 1;

        for (let i = 1; i < dates.length; i++) {

            const diff =
                (dates[i - 1] - dates[i]) /
                (1000 * 60 * 60 * 24);

            if (diff === 1) {
                currentStreak++;
            } else {
                break;
            }

        }

    }

    await pool.query(
        `
    UPDATE user_stats
    SET
      current_streak = $1,
      longest_streak = $2,
      updated_at = CURRENT_TIMESTAMP
    WHERE user_id = $3
    `,
        [
            currentStreak,
            longestStreak,
            userId,
        ]
    );

    return {
        currentStreak,
        longestStreak,
    };
};