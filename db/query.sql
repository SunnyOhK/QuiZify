
-- Retrieve high scores
SELECT PlayerName, Score
FROM Scores
ORDER BY Score DESC
LIMIT 10;

-- Fetch a random song
SELECT Artist, Title
FROM Songs
ORDER BY RAND()
LIMIT 1;

-- Update a score
UPDATE Scores
SET Score = 150
WHERE PlayerName = 'Player 1';
