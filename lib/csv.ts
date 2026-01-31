import fs from 'fs';
import path from 'path';

const CSV_PATH = path.join(process.cwd(), 'data', 'responses.csv');
const HEADERS = ['id', 'timestamp', 'ai_learning', 'tools_used', 'movie_idea', 'favorite_food', 'favorite_city'];

function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function ensureCSVExists(): void {
  const dir = path.dirname(CSV_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, HEADERS.join(',') + '\n');
  }
}

export function appendSurveyResponse(data: {
  aiLearning: string;
  toolsUsed: string;
  movieIdea: string;
}): string {
  ensureCSVExists();

  const id = Date.now().toString();
  const timestamp = new Date().toISOString();

  const row = [
    id,
    timestamp,
    escapeCSV(data.aiLearning),
    escapeCSV(data.toolsUsed),
    escapeCSV(data.movieIdea),
    '', // favorite_food will be added later
    ''  // favorite_city will be added later
  ].join(',');

  fs.appendFileSync(CSV_PATH, row + '\n');

  return id;
}

export function updateFavoriteFoodAndCity(id: string, favoriteFood: string, favoriteCity: string): boolean {
  ensureCSVExists();

  const content = fs.readFileSync(CSV_PATH, 'utf-8');
  const lines = content.split('\n');

  let updated = false;
  const newLines = lines.map((line, index) => {
    if (index === 0 || !line.trim()) return line; // Skip header and empty lines

    const lineId = line.split(',')[0];
    if (lineId === id) {
      // Parse the line properly to handle escaped values
      const parts = line.split(',');
      // Update the last two fields (favorite_food and favorite_city)
      parts[5] = escapeCSV(favoriteFood);
      parts[6] = escapeCSV(favoriteCity);
      updated = true;
      return parts.join(',');
    }
    return line;
  });

  if (updated) {
    fs.writeFileSync(CSV_PATH, newLines.join('\n'));
  }

  return updated;
}
