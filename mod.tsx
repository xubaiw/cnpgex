#!/usr/bin/env -S deno run -A 

import N3 from "https://esm.sh/n3@1.17.0";
import Comunica from "https://esm.sh/@comunica/query-sparql@2.8.1";
import { resolve } from "https://deno.land/std@0.194.0/path/mod.ts";
import React from "https://esm.sh/react@18.2.0";
import { renderToString } from "https://esm.sh/react-dom@18.2.0/server";
import { ensureDir } from "https://deno.land/std@0.194.0/fs/mod.ts";
import { fromFileUrl, join } from "https://deno.land/std@0.194.0/path/mod.ts";

/** 程序入口 */
const main = async () => {
  const [store] = await loadSparql();
  await generatePages(store);
};

/** 可视化 Store 中的数据 */
const generatePages = async (store: N3.Store) => {
  const quads = [];
  for (const q of store) quads.push(q);
  const html = renderToString(
    <html>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        {quads.map((x) => (
          <div style={{ border: "solid 1px", padding: "1em" }}>
            <p>
              {"s: "}
              {x.subject.value}
            </p>
            <p>
              {"p: "}
              {x.predicate.value}
            </p>
            <p>
              {"o: "}
              {x.object.value}
            </p>
            <p>
              {"g: "}
              {x.graph.value}
            </p>
          </div>
        ))}
      </body>
    </html>,
  );
  const pagesDir = fromFileUrl(import.meta.resolve("./pages"));
  await ensureDir(pagesDir);
  await Deno.writeTextFile(join(pagesDir, "index.html"), html);
};

/** 加载 SPARQL */
const loadSparql = async (): Promise<[N3.Store, Comunica.QueryEngine]> => {
  // 初始化
  const engine = new Comunica.QueryEngine();
  const store = new N3.Store();
  // 遍历 SPARQL
  const pathIter = Deno.args.length > 0 ? Deno.args : getAllSparql();
  for await (const path of pathIter) {
    const baseIRI = `file://${resolve(path)}`;
    const text = await Deno.readTextFile(path);
    // 载入
    await engine.queryVoid(text, { sources: [store], baseIRI });
  }
  return [store, engine];
};

/** 获取目录下所有 SPARQL 文件 */
const getAllSparql = async function* () {
  for await (const entry of Deno.readDir(".")) {
    const { name: path } = entry;
    if (path.endsWith(".sparql")) {
      yield path;
    }
  }
};

// 入口
import.meta.main && await main();
