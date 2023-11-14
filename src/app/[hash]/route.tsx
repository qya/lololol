import { checkExist } from "../../../lib/api";
import { errorPage, simpleDecode } from "../../../lib/utils";
import { notFound, redirect } from 'next/navigation'

export async function GET(
    request: Request,
    { params }: { params: { hash: string } }
  ) {
    const slug = params.hash.toLowerCase();
    const deco = simpleDecode(slug);
    if(/^[lo]+$/.test(slug) == false){
        return new Response(await errorPage(), {
            headers: {'Content-Type': 'text/html'}
          });
    }
    if(/[^a-zA-Z0-9]/.test(deco)){
        return new Response(await errorPage(), {
            headers: {'Content-Type': 'text/html'}
          });
    }
    const result = await checkExist(deco);
    if(!result){
        return new Response(await errorPage(), {
            headers: {'Content-Type': 'text/html'}
          });
    }
    return redirect(result);
  }