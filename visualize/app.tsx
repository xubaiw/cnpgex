import N3 from "https://esm.sh/n3@1.17.0";
import React, { useState } from "https://esm.sh/react@18.2.0";

export const App = ({ store }: { store: N3.Store }) => {
  const [graph, setGraph] = useState<N3.Quad_Graph | null>(null);
  return (
    <div style={{ display: "flex", flexDirection: "row", margin: "auto" }}>
      <aside>
        some text
      </aside>
      <main>
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
      </main>
    </div>
  );
};
