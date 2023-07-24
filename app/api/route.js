import { NextResponse } from "next/server";
import { makeChain as _makeChain } from "./chain.js";
import { sumPageNum } from "../utils/functions.mjs";
import { sleep } from "../utils/functions.mjs";

const chains = [];

const makeChain = async ({name, chunkSize, uid}) => {
  console.log('makechain');
  if (chains[uid]) return;
  const chain = await _makeChain({name, chunk: chunkSize ?? 'small'});
  return chains[uid] = chain;
}

const callChain = async ({uid, text}) => {
  console.log(`${uid} call ${text}`);
  if (!chains[uid]) {
    return {
      text: 'chain not found'
    }
  }
  const res = await chains[uid].call({
    question: text
  });
  return {
    text: res.text?.replace(/<\/\w+>$/, ''),
    sources: res.sourceDocuments?.map((s) => ({
      text: s.pageContent,
      location:
        `${s.metadata?.source?.split('/')?.slice(-1)[0]}, ` +
        `${sumPageNum(s.metadata?.loc?.lines?.from, s.metadata?.loc?.lines?.to)}`,
    })),
    summarize: s.newQuestion
  }
}

export async function POST(req) {
  req = await req.json();
  console.log(req);
  await sleep(2000);
  if (req.type === 'create') {
    await makeChain({
      name: req.name,
      chunkSize: req.chunkSize,
      uid: req.uid
    });
    return NextResponse.json({
      ok: true
    });
  }
  return NextResponse.json({
    text: 'great',
    sources: [{
      text: 'oh',
      location: 'idkwhere'
    },{
      text: 'hihi',
      location: 'cool'
    },{
      text: 'nah',
      location: 'yeet 1'
    }],
    summarize: req.text
  })
}