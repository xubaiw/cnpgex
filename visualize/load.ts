import N3 from "npm:n3";
import Comunica from "https://esm.sh/@comunica/query-sparql@2.8.1";
import { resolve } from "https://deno.land/std@0.194.0/path/mod.ts";
import { fromFileUrl, join } from "https://deno.land/std@0.194.0/path/mod.ts";

/** 加载 SPARQL 文件，默认加载所有 */
export const loadSparql = async (
  selektoj: string[] = [],
): Promise<N3.Store> => {
  // 初始化
  const engine = new Comunica.QueryEngine();
  const store = new N3.Store();
  // 遍历 SPARQL
  const pathIter = selektoj.length > 0 ? selektoj : getAllSparql();
  for await (const path of pathIter) {
    const baseIRI = `file://${resolve(path)}`;
    const text = await Deno.readTextFile(path);
    // 载入
    await engine.queryVoid(text, { sources: [store], baseIRI });
  }
  return store;
};

/** 获取目录下所有 SPARQL 文件 */
const getAllSparql = async function* () {
  const dir = fromFileUrl(import.meta.resolve("../"));
  for await (const entry of Deno.readDir(dir)) {
    const { name: path } = entry;
    if (path.endsWith(".ru")) {
      yield join(dir, path);
    }
  }
};
