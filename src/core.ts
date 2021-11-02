import { createClient, connectClient, enableCache } from "@amityco/ts-sdk";
export const asynchronize = async (liveThing, immediately = true) => {
  if (
    immediately &&
    ((liveThing.models && liveThing.models.length) || liveThing.model)
  )
    return liveThing.models || liveThing.model;

  return new Promise((resolve, reject) => {
    // we wrap the resolve in setTimeout(0) to allow 'hasMore' to refresh for live collection (reactive related bug.)
    liveThing.once("dataUpdated", (data) =>
      setTimeout(() => {
        resolve(data);
      }, 0)
    );
    liveThing.once("dataError", reject);
  });
};

export function bindLiveObject(object: any, label: string) {
  object.once("dataUpdated", (data) => {
    console.log("dataUpdated:" + label + " liveObject: ", object);
  });
  object.on("dataError", (err) => {
    console.log(
      "dataError:" + label + " error:",
      JSON.stringify(err) + " , liveObject: ",
      object
    );
  });
  return asynchronize(object, false);
}
function overrideConsole() {
  if (typeof console !== "undefined")
    if (typeof console.log !== "undefined") (console as any).olog = console.log;
    else (console as any).olog = function () {};
  console.log = function (message) {
    (console as any).olog(message);
    document.getElementById("app").innerHTML +=
      "<p>" + new Date().toISOString() + " ---- " + message + "</p>";
  };
  console.error = console.debug = console.info = (console as any).log;
}
export async function init(apiKey: string, apiEndpoint: string) {
  console.log("Connecting...");
  let client = createClient(apiKey, apiEndpoint);
  enableCache();
}
export async function registerSession(
  userId: string,
  displayName: string,
  authToken?: string
) {
  console.log(
    "Registering session for userId " +
      userId +
      " with displayName " +
      displayName
  );
  await connectClient({ userId, displayName, authToken });
}
export async function unregisterSession() {
  console.log("Unregistering session");
  return new Promise((resolve) => {
    client.once("connectionStatusChanged", () => {
      console.log("Unregister completed, resolving");
      resolve(null);
    });
    client.unregisterSession();
  });
}
export async function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
