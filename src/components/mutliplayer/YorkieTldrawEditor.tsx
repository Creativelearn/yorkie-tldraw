import { Tldraw, useFileSystem } from "@krapi0314/tldraw";
import { useMultiplayerState } from "./useMultiplayerState";

/*
This demo shows how to integrate TLDraw with a multiplayer room
via Yorkie. You could use any other service instead—the important
part is to get data from the Tldraw app when its document changes 
and update it when the server's synchronized document changes.

Warning: Keeping images enabled for multiplayer applications
without providing a storage bucket based solution will cause
massive base64 string to be written to the multiplayer storage.
It's recommended to use a storage bucket based solution, such as
Amazon AWS S3. Further demo will be implemented.
*/
function Editor({ roomId, userName }: { roomId: string, userName: string }) {
  const fileSystemEvents = useFileSystem();
  const { ...events } = useMultiplayerState(roomId, userName);

  return (
    <div>
      <Tldraw
        autofocus
        disableAssets
        showPages={false}
        {...fileSystemEvents}
        {...events}
      />
    </div>
  );
}

export default function YorkieTldrawEditor() {
  return (
    <div className="tldraw">
      <Editor
        roomId={sessionStorage.getItem("room") === null ? "room1" : sessionStorage.getItem("room") as string}
        userName={sessionStorage.getItem("userName") === null ? "Anony" : sessionStorage.getItem("userName") as string}
      />
    </div>
  );
}
