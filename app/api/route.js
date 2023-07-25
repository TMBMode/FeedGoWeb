import { NextResponse } from "next/server";

const makeChain = async ({name, uid}) => {
  const res = await fetch('http://127.0.0.1:7723/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid, name
    })
  });
  if (!res.ok) return null;
  return await res.json();
}

const callChain = async ({uid, text}) => {
  const res = await fetch('http://127.0.0.1:7723/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid, text
    })
  });
  if (!res.ok) return null;
  return await res.json();
}

export async function POST(req) {
  req = await req.json();
  if (req.type === 'create') {
    const res = await makeChain(req);
    return NextResponse.json({
      ok: res ? true : false
    });
  }
  if (req.type === 'complete') {
    const res = await callChain(req);
    return NextResponse.json(res);
  }
}