
import fs from 'fs';
import path from 'path';
import Button from "./button";
import Link from 'next/link';

const STORE_PATH = process.env.STORE_PATH || '/home/ubuntu/feedgo/vstores';
const stores = fs.readdirSync(STORE_PATH)
  .filter((fileName) => fs.statSync(path.join(STORE_PATH, fileName)).isDirectory());

export default function Config({ uid }) {
  return (
    <div className="w-full h-full md:w-3/4 md:h-4/5 md:rounded-l-lg overflow-hidden">
      <div className="w-full h-full p-4 flex flex-row flex-wrap items-center justify-center">
        {stores.map((store, i) => {
          return (
            <div className="m-4" key={i}>
              <Link href={{
                pathname: '/chat',
                query: {
                  uid,
                  name: store
                }
              }}>
                <Button color="blue">{store}</Button>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
