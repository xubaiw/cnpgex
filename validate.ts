#!/usr/bin/env -S deno run -A 

import N3 from "npm:n3";
import Comunica from "https://esm.sh/@comunica/query-sparql@2.8.1";
import { resolve } from "https://deno.land/std@0.194.0/path/mod.ts";

const main = async () => {
  // Init
  const engine = new Comunica.QueryEngine();
  const store = new N3.Store();
  // Load all
  const pathIter = Deno.args.length > 0 ? Deno.args : getAllUpdates();
  for await (const path of pathIter) {
    const baseIRI = `file://${resolve(path)}`;
    const text = await Deno.readTextFile(path);
    await engine.queryVoid(text, { sources: [store], baseIRI });
  }
  // Show quads
  for (const quad of store) {
    console.log(quad);
  }
};

const getAllUpdates = async function* () {
  for await (const entry of Deno.readDir(".")) {
    const { name: path } = entry;
    if (path.endsWith(".sparql")) {
      yield path;
    }
  }
};

import.meta.main && await main();
