import { supabase } from './supabaseClient.js';

const BUCKET = 'booking-uploads';

function sanitize(name) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
}

export async function uploadBookingFiles(files) {
  if (!supabase || files.length === 0) return [];

  const uploads = await Promise.all(
    files.map(async (file) => {
      const path = `${crypto.randomUUID()}-${sanitize(file.name)}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) throw error;
      return { name: file.name, path };
    })
  );

  return uploads;
}
