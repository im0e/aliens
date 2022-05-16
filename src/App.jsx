
import {createResource, createSignal, Show} from "solid-js";
import Cast from "./Cast.jsx";

function App() {
  const [keyword, setKeyword] = createSignal("");
  const [castList] = createResource(keyword, async () => {
    return fetch('./cast.json')
    .then(res => res.json())
    .then(data => data.filter(
      item => item.name.toLowerCase()
      .match(keyword().toLowerCase())
    ))
  });

  return (
    <div class="container">
      <header></header>
      <h1> Aliens </h1>
      <input onKeyUp={(e) => {setKeyword(e.currentTarget.value)}}  type="text"/>
      <Show when={keyword()} fallback={ <p> Aliens awaits you discovering them </p>}>
        <Cast key={keyword()} list={castList()} />
      </Show>
    </div>
  );
}

export default App;
