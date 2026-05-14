INSERT INTO fee_structure
(course_id, semester_no, fee_type, amount, duration, description, status)

SELECT
    c.course_id,

    /* semester_no */
    seq.semester_no,

    /* fee type */
    CASE
        WHEN c.duration LIKE '%Year%' THEN 'Tuition Fee'
        ELSE 'Course Fee'
    END AS fee_type,

    /* amount calculation */
    CASE
        WHEN c.duration = '4 Years' THEN ROUND(c.fee / 8, 2)
        WHEN c.duration = '3 Years' THEN ROUND(c.fee / 6, 2)
        WHEN c.duration = '2 Years' THEN ROUND(c.fee / 4, 2)
        WHEN c.duration = '1 Year'  THEN c.fee
        WHEN c.duration = '6 Months' THEN c.fee
        ELSE c.fee
    END AS amount,

    /* duration */
    CASE
        WHEN c.duration IN ('4 Years','3 Years','2 Years') THEN 'Semester'
        ELSE c.duration
    END AS duration,

    /* description */
    CASE
        WHEN seq.semester_no IS NOT NULL
        THEN CONCAT('Semester ', seq.semester_no, ' fee')
        ELSE 'Full course fee'
    END AS description,

    'active'

FROM courses c

JOIN (
    SELECT 1 AS semester_no
    UNION ALL SELECT 2
    UNION ALL SELECT 3
    UNION ALL SELECT 4
    UNION ALL SELECT 5
    UNION ALL SELECT 6
    UNION ALL SELECT 7
    UNION ALL SELECT 8
) seq

WHERE
(
    (c.duration = '4 Years' AND seq.semester_no <= 8)
    OR
    (c.duration = '3 Years' AND seq.semester_no <= 6)
    OR
    (c.duration = '2 Years' AND seq.semester_no <= 4)
    OR
    (c.duration NOT IN ('4 Years','3 Years','2 Years') AND seq.semester_no = 1)
);