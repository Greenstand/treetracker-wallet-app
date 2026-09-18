// The token lives in sessionStorage, which is per tab, so a logout in one tab
// is invisible to the others. Tell them directly instead.
const CHANNEL = "wallet-auth";
const LOGOUT = "logout";

const open = (): BroadcastChannel | null =>
  typeof BroadcastChannel === "undefined"
    ? null
    : new BroadcastChannel(CHANNEL);

export function broadcastLogout(): void {
  const channel = open();
  if (!channel) return;
  channel.postMessage(LOGOUT);
  channel.close();
}

// Returns an unsubscribe function.
export function onLogout(handler: () => void): () => void {
  const channel = open();
  if (!channel) return () => {};
  const listener = (e: MessageEvent) => {
    if (e.data === LOGOUT) handler();
  };
  channel.addEventListener("message", listener);
  return () => {
    channel.removeEventListener("message", listener);
    channel.close();
  };
}
