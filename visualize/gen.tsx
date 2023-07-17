#!/usr/bin/env -S deno run -A 

import N3 from "https://esm.sh/n3@1.17.0";
import React from "https://esm.sh/react@18.2.0";
import { renderToString } from "https://esm.sh/react-dom@18.2.0/server";
import { ensureDir } from "https://deno.land/std@0.194.0/fs/mod.ts";
import { fromFileUrl, join } from "https://deno.land/std@0.194.0/path/mod.ts";
import { loadSparql } from "./load.ts";
import { App } from "./app.tsx";

/** 程序入口 */
const main = async () => {
  const store = await loadSparql();
  await generatePages(store);
};

/** 可视化 Store 中的数据 */
const generatePages = async (store: N3.Store) => {
  const html = renderToString(
    <html>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <App store={store} />
      </body>
    </html>,
  );
  const pagesDir = fromFileUrl(import.meta.resolve("./pages"));
  await ensureDir(pagesDir);
  await Deno.writeTextFile(join(pagesDir, "index.html"), html);
};

// 入口
import.meta.main && await main();
