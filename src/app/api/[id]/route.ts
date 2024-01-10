import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  // const{id} = request.query
  const headerPage = req.headers["x-page"]??1
  const headerSearch = req.headers["x-search"]??""
  const headerPagesize = req.headers["x-page-size"]??5

  try {
    const data = await fetch("https://example-api-nextjs.vercel.app/api/" + id, {
      headers: {
        "x-page": headerPage,
        "x-search": headerSearch,
        "x-page-size": headerPagesize,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: error});
  }
}

export async function POST(req: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    // const body = body;
    const body = await req.json();
    const bodystringify = await JSON.stringify(body);
    console.log(body)
    const data = await fetch("https://example-api-nextjs.vercel.app/api/" + id, {
        body : bodystringify,
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Specify content type
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            return { error: error };
        });
    return NextResponse.json(data);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = params.id;
    // const body = body;
    const body = await req.json();
    const bodystringify = await JSON.stringify(body);
    console.log(body)
    const data = await fetch("https://example-api-nextjs.vercel.app/api/" + id, {
        body : bodystringify,
        method: "PUT",
        headers: {
            'Content-Type': 'application/json', // Specify content type
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            return { error: error };
        });
    return NextResponse.json(data);
}

// export async function PUT(request: NextApiRequest) {
//     const id = request.query.id;
//     const body = JSON.stringify(request.body); // Convert body to JSON string
//     const data = await fetch("https://example-api-nextjs.vercel.app/api/" + id, {
//         body,
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json', // Specify content type
//         },
//     })
//         .then(response => response.json())
//         .then(data => {
//             console.log(data);
//             return data;
//         })
//         .catch(error => {
//             console.error("Error fetching data:", error);
//             return { error: error };
//         });
//     return NextResponse.json(data);
// }

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const data = await fetch("https://example-api-nextjs.vercel.app/api/" + id, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            return { error: error };
        });
    return NextResponse.json(data);
}
