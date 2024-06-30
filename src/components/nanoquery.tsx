import { nanoquery } from "@nanostores/query";
import { atom } from "nanostores";
import { useStore } from "@nanostores/react";

export const [createFetcherStore, createMutatorStore] = nanoquery({
  fetcher: async (...keys: string[]) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Math.random();
  },
});

const $query = atom(0);
const $notificationStore = createFetcherStore<any>([$query]);

export default function NanoQueryExample() {
  const { data, loading } = useStore($notificationStore);

  return (
    <div>
      <button onClick={() => $query.set(Math.random())}>Update</button>
      {loading && <div>Loading...</div>}
      {data && <div>Data: {data}</div>}
    </div>
  );
}
