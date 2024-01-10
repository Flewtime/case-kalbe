import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic'; // defaults to force-static

export async function GET(request:NextRequest)
{

  const headerPage = request.headers.get("x-page")??1
  const headerSearch = request.headers.get("x-search")??""
  const headerPagesize = request.headers.get("x-page-size")??5
  // console.log(header)
  const data = await fetch("https://example-api-nextjs.vercel.app/api", 
  {headers:
  {"x-page" : headerPage,
   "x-search" : headerSearch,
   "x-page-size" : headerPagesize}})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    return Response.json({error:error})
  });
  return Response.json(data);
}

export async function POST(request:NextRequest)
{
  const body = request.body
  const data = await fetch("https://example-api-nextjs.vercel.app/api/" + body.id, 
  {body: body, method:"POST"})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    return Response.json({error:error})
  });
  return Response.json(data);
}

export async function PUT(request:NextRequest){
  const body = request.body
  const data = await fetch("https://example-api-nextjs.vercel.app/api/" + body.id, 
  {body: body, method:"PUT"})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    return Response.json({error:error})
  });
  return Response.json(data);
}


export async function DELETE(request:NextRequest){
  const body = request.body
  const data = await fetch("https://example-api-nextjs.vercel.app/api/" + body.id, 
  {body: body, method:"DELETE"})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data
  })
  .catch(error => {
    console.error("Error fetching data:", error);
    return Response.json({error:error})
  });
  return Response.json(data);
}