-- =====================================================
-- LINES
-- =====================================================

INSERT INTO lines VALUES (1, 'Caffeine Line');
INSERT INTO lines VALUES (2, 'Panic Line');
INSERT INTO lines VALUES (3, 'Aperitivo Line');
INSERT INTO lines VALUES (4, 'Startup Line');

-- =====================================================
-- STATIONS
-- =====================================================

INSERT INTO stations VALUES (1, 'Main Campus');
INSERT INTO stations VALUES (2, 'Lingotto Hub');
INSERT INTO stations VALUES (3, 'Central Library');
INSERT INTO stations VALUES (4, 'Study District');
INSERT INTO stations VALUES (5, 'Riverside Campus');

INSERT INTO stations VALUES (6, 'Aula Magna');
INSERT INTO stations VALUES (7, 'Exam Center');
INSERT INTO stations VALUES (8, 'Student Services');
INSERT INTO stations VALUES (9, 'Graduation Hall');

INSERT INTO stations VALUES (10, 'Porta Nuova');
INSERT INTO stations VALUES (11, 'Castle Square');
INSERT INTO stations VALUES (12, 'Valentino Park');
INSERT INTO stations VALUES (13, 'Murazzi');

INSERT INTO stations VALUES (14, 'Innovation Hub');
INSERT INTO stations VALUES (15, 'Startup District');

-- =====================================================
-- STATION ↔ LINE RELATIONSHIPS
-- =====================================================
-- Interchange stations:
-- (1) Main Campus
-- (2) Lingotto Hub
-- (5) Riverside Campus
-- (7) Exam Center

-- Caffeine Line
INSERT INTO station_lines VALUES (1,1); -- Main Campus (interchange)
INSERT INTO station_lines VALUES (2,1); -- Lingotto Hub (interchange)
INSERT INTO station_lines VALUES (3,1);
INSERT INTO station_lines VALUES (4,1);
INSERT INTO station_lines VALUES (5,1); -- Riverside Campus (interchange)

-- Panic Line
INSERT INTO station_lines VALUES (1,2); -- Main Campus (interchange)
INSERT INTO station_lines VALUES (6,2);
INSERT INTO station_lines VALUES (7,2); -- Exam Center (interchange)
INSERT INTO station_lines VALUES (8,2);
INSERT INTO station_lines VALUES (9,2);

-- Aperitivo Line
INSERT INTO station_lines VALUES (5,3); -- Riverside Campus (interchange)
INSERT INTO station_lines VALUES (10,3);
INSERT INTO station_lines VALUES (11,3);
INSERT INTO station_lines VALUES (12,3);
INSERT INTO station_lines VALUES (13,3);

-- Startup Line
INSERT INTO station_lines VALUES (7,4); -- Exam Center (interchange)
INSERT INTO station_lines VALUES (14,4);
INSERT INTO station_lines VALUES (15,4);
INSERT INTO station_lines VALUES (2,4); -- Lingotto Hub (interchange)

-- =====================================================
-- SEGMENTS
-- =====================================================
-- segments(id, stationA, stationB, lineId)

-- ---------------------
-- Caffeine Line
-- ---------------------

-- Main Campus ↔ Lingotto Hub
INSERT INTO segments VALUES (1, 1, 2, 1);

-- Lingotto Hub ↔ Central Library
INSERT INTO segments VALUES (2, 2, 3, 1);

-- Central Library ↔ Study District
INSERT INTO segments VALUES (3, 3, 4, 1);

-- Study District ↔ Riverside Campus
INSERT INTO segments VALUES (4, 4, 5, 1);


-- ---------------------
-- Panic Line
-- ---------------------

-- Main Campus ↔ Aula Magna
INSERT INTO segments VALUES (5, 1, 6, 2);

-- Aula Magna ↔ Exam Center
INSERT INTO segments VALUES (6, 6, 7, 2);

-- Exam Center ↔ Student Services
INSERT INTO segments VALUES (7, 7, 8, 2);

-- Student Services ↔ Graduation Hall
INSERT INTO segments VALUES (8, 8, 9, 2);


-- ---------------------
-- Aperitivo Line
-- ---------------------

-- Riverside Campus ↔ Porta Nuova
INSERT INTO segments VALUES (9, 5, 10, 3);

-- Porta Nuova ↔ Castle Square
INSERT INTO segments VALUES (10, 10, 11, 3);

-- Castle Square ↔ Valentino Park
INSERT INTO segments VALUES (11, 11, 12, 3);

-- Valentino Park ↔ Murazzi
INSERT INTO segments VALUES (12, 12, 13, 3);


-- ---------------------
-- Startup Line
-- ---------------------

-- Exam Center ↔ Innovation Hub
INSERT INTO segments VALUES (13, 7, 14, 4);

-- Innovation Hub ↔ Startup District
INSERT INTO segments VALUES (14, 14, 15, 4);

-- Startup District ↔ Lingotto Hub
INSERT INTO segments VALUES (15, 15, 2, 4);

-- =====================================================
-- EVENTS
-- =====================================================
-- events(id, description, effect)

INSERT INTO events VALUES (
    1,
    'A nonno stopped you to tell his life story',
    -2
);

INSERT INTO events VALUES (
    2,
    'Gave spare change to a street musician',
    -1
);

INSERT INTO events VALUES (
    3,
    'The library printer worked on the first attempt',
    4
);

INSERT INTO events VALUES (
    4,
    'You forgot where you parked your bike',
    -2
);

INSERT INTO events VALUES (
    5,
    'The coffee machine ate your coins',
    -2
);

INSERT INTO events VALUES (
    6,
    'A friend saved you a seat in the library',
    2
);

INSERT INTO events VALUES (
    7,
    'You arrived late to your oral exam',
    -3
);

INSERT INTO events VALUES (
    8,
    'Free Redbull at a startup meetup',
    4
);

INSERT INTO events VALUES (
    9,
    'You realized the assignment is due tonight',
    -4
);

INSERT INTO events VALUES (
    10,
    'Found an empty study room during exam week',
    3
);

INSERT INTO events VALUES (
    11,
    'The teammate who disappeared for three weeks finally replied',
    3
);

INSERT INTO events VALUES (
    12,
    'A pigeon stole part of your tramezzino',
    -1
);

INSERT INTO events VALUES (
    13,
    'Nothing unusual happened during the trip',
    0
);