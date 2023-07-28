import { NextResponse } from "next/server";

const API_PORT = process.env.API_PORT || 7723;
const ENDPOINT = `http://127.0.0.1:${API_PORT}`;

export async function POST(req, {params: {action}}) {
  const _req = {...req};
  try {
    req = await req.json();
  } catch {
    req = _req;
  }
  const type = action?.[0];
  if (!type) return NextResponse.json(null);

  if (type === 'create') {
    const res = await makeChain(req);
    return NextResponse.json({
      ok: res ? true : false
    });
  }
  if (type === 'complete') {
    const res = await callChain(req);
    return NextResponse.json(res);
  }
  if (type === 'list') {
    const subtype = action?.[1];
    const res = await listAll(subtype);
    return NextResponse.json(res);
  }
  if (type === 'upload') {
    const { name, files } = req;
    const res = await uploadDataset({name, files});
    return NextResponse.json({
      ok: res ? true : false
    });
  }
}

async function makeChain({name, uid}) {
  const res = await fetch(`${ENDPOINT}/create`, {
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

async function callChain({uid, text}) {
  const res = await fetch(`${ENDPOINT}/complete`, {
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

async function listAll(type) {
  const res = await fetch(`${ENDPOINT}/list/${type}`, {
    method: 'GET'
  });
  if (!res.ok) return null;
  return await res.json();
}

async function uploadDataset({ name, files }) {
  const res = await fetch(`${ENDPOINT}/upload/dataset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name, files
    })
  });
  if (!res.ok) return null;
  return await res.json();
}