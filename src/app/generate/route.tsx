import { type NextRequest } from 'next/server'
import { simpleEncode, crc32, isValidURL } from '../../../lib/utils'
import { checkExist, saveUrlMapping } from '../../../lib/api';
import { ROOT_URL } from '../../../lib/constants';

export async function GET(
    request: NextRequest
  ) {
    const searchParams = request.nextUrl.searchParams
    const url = searchParams.get('url') ?? '';
    if(!isValidURL(url)){
        return Response.json({error:true,msg:"Invalid URL"})
    }
    
    const shortId = crc32(url).toString(16).toLowerCase();
    const exists = await checkExist(shortId);

    if (!exists) {
      await saveUrlMapping(url);
    }
    const encodedShortId = await simpleEncode(shortId);
    return Response.json({error:false,shortId: ROOT_URL+encodedShortId })
}

export async function POST(
    request: NextRequest
  ) {
    const data = await request.json();
    const { url } = data;
    if(!isValidURL(url)){
        return Response.json({error:true,msg:"Invalid URL"})
    }
    
    const shortId = crc32(url).toString(16).toLowerCase();
    const exists = await checkExist(shortId);

    if (!exists) {
      await saveUrlMapping(url);
    }
    const encodedShortId = await simpleEncode(shortId);
    return Response.json({error:false,shortId: ROOT_URL+encodedShortId })
}