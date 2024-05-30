"use client";

import { useEffect, useState } from "react";
import { initDb, insertDb } from "@/core/useOrama/context"; // Ensure this path is correct
import { Result, Results, search } from "@orama/orama"; // Ensure this path is correct
import { Input } from "@/components/ui/input";

export default function Home() {
  const [results, setResults] = useState([{}] as Result<any>[]);
  const [merchantDb, setMerchantDb] = useState({} as any);

  useEffect(() => {
    const initializeDb = async () => {
      try {
        const res = await initDb();
        setMerchantDb(res);
        await insertDb(res, {
          tag: "test",
        });
      } catch (error) {
        console.error("Failed to initialize database", error);
      }
    };
    initializeDb();
  }, []);

  const find = async (event) => {
    const text = event.target.value;
    console.log("Search text:", text);
    if (text) {
      try {
        const result = await search(merchantDb, {
          term: text,
          properties: ["tag"],
        });
        console.log("Search result:", result);
        setResults([...results, ...result.hits]);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Input
        type="text"
        placeholder="What are you looking for?"
        onChange={find}
      />
      {results.length > 0 && (
        <div>
          {results.map((item, index) => (
            <div key={index}>{item.document?.tag}</div>
          ))}
        </div>
      )}
    </main>
  );
}
