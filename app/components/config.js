'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from "./button";

export default function Config() {
  const [ stores, setStores ] = useState([]);
  const [ datasets, setDatasets ] = useState([]);
  const [ loaded, setLoaded ] = useState(false);
  useEffect(() => {
    (async () => {
      setStores(
        await(await fetch('/api/list/stores', {
          method: 'POST'
        })).json()
      );
      setDatasets(
        await(await fetch('/api/list/datasets', {
          method: 'POST'
        })).json()
      );
      setLoaded(true);
    })();
  }, [])
  return (
    <div className="w-full h-full md:w-3/4 md:h-4/5 overflow-hidden">
      <div className="w-full h-full p-4 flex flex-row flex-wrap items-center justify-center">
        {stores.map((uid) => (
          <div className="m-4" key={uid}>
            <Link href={{
              pathname: `/chat/${uid}`
            }}>
              <Button color="blue">{uid}</Button>
            </Link>
          </div>
        ))}
        {datasets.filter((v) => !stores.includes(v)).map((uid) => (
          <div className="m-4" key={uid}>
            <Link href={{
              pathname: `/chat/${uid}`
            }}>
              <Button color="red">{uid}</Button>
            </Link>
          </div>
        ))}
        {loaded && (
          <div className="m-4">
            <Link href={{
              pathname: `/new`
            }}>
              <Button color="green">+</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
