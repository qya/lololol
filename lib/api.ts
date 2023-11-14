import { readFile, writeFile, readdir } from 'fs/promises';
import { join } from 'path'
import { createHash } from 'crypto';
import { crc32 } from './utils';

const urlsDirectory = join(process.cwd(), '_urls')

export function getShortsSlugs() {
  return readdir(urlsDirectory)
}
export async function getShortBySlug(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.txt$/, '')
    const fullPath = join(urlsDirectory, `${realSlug}.txt`)
    const fileContents = await readFile(fullPath, 'utf8')
    return fileContents;
}

export function getAllShorts(fields: string[] = []) {
    const slugs = getShortsSlugs()
    // const shorts = slugs
    //   .map((slug) => getShortBySlug(slug, fields))
    //   // sort short by date in descending order
    //   .sort((short1 : any, short2 : any) => (short1.date > short2.date ? -1 : 1))
    return slugs
}
export async function saveUrlMapping(originalUrl: string): Promise<void> {
    const hashValue = crc32(originalUrl).toString(16).toLowerCase();
    const mappingFile = join(urlsDirectory, `${hashValue}.txt`);
    await writeFile(mappingFile, originalUrl); 
  }
  
  export async function checkExist(hash: string) {
    const mappingFile = join(urlsDirectory, `${hash}.txt`);
    try {
      const data = await readFile(mappingFile, 'utf-8');
      return data;
    } catch (error) {
      return '';
    }
  }
