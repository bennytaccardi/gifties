"use client";

import { useEffect, useState } from "react";
import { initDb } from "@/core/useOrama/context";
import { insertMultiple, Result, Results, search } from "@orama/orama";
import { Input } from "@/components/ui/input";
import { fetchMerchants } from "./actions/fetchMerchants";
import { Merchant } from "../models/merchant";
import { Search } from "@/components/ui/search";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [searchedMerchants, setSearchedMerchants] = useState(
    [] as Result<any>[]
  );
  const [merchantDb, setMerchantDb] = useState({} as any);

  useEffect(() => {
    const initializeDb = async () => {
      try {
        const merchantDbOrama = await initDb();
        setMerchantDb(merchantDbOrama);
        const allMerchants: Merchant[] = await fetchMerchants();
        await insertMultiple(merchantDbOrama, allMerchants as never[]);
      } catch (error) {
        console.error("Failed to initialize database", error);
      }
    };
    initializeDb();
  }, []);

  const find = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    if (text) {
      try {
        const result = await search(merchantDb, {
          term: text,
          properties: ["tags", "name", "description"],
        });
        console.log(result);
        setSearchedMerchants(result.hits);
      } catch (error) {
        console.error("Search error:", error);
        setSearchedMerchants([]);
      }
    } else {
      setSearchedMerchants([]);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ...">
      <Search find={find} />
      {searchedMerchants.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-12">
          {searchedMerchants.map((item, index) => (
            <Card
              className="w-full p-7 backdrop-blur-sm bg-white/25 shadow-lg"
              key={index}
            >
              <CardContent className="flex flex-col items-center w-full h-auto">
                <Avatar className="mb-2">
                  <AvatarImage
                    src={item.document?.profileImage}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle className="text-center w-full h-auto">
                  {item.document?.name}
                </CardTitle>
                <CardDescription>{item.document?.description}</CardDescription>
                <CardFooter className="flex flex-col items-center w-full h-auto">
                  <a href={item.document?.url} target="_blank">
                    {" "}
                    website
                  </a>
                  <div>
                    {item.document?.tags
                      .split(",")
                      .map((tag: string, index: number) => (
                        <Badge key={index} className="mr-1">
                          {" "}
                          {tag}{" "}
                        </Badge>
                      ))}
                  </div>
                </CardFooter>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
