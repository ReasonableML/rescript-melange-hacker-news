open ReactDomExperimental

open Utils
registerServiceWorker();
requireCSS("src/Index.css")


switch createRootWithId("root") {
| Some(root) => root->render(
    <React.StrictMode>
      <App />
    </React.StrictMode>

  )
  RescriptReactRouter.push("");
| None => ()
}
