import { useState, useEffect } from "react";

function useOnlineStatus() {
  const [onlineStatus, setOnlineStatus] = useState(navigator.onLine);

  useEffect(() => {
    const goOffline = () => setOnlineStatus(false);
    const goOnline = () => setOnlineStatus(true);

    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return onlineStatus;
}

export default useOnlineStatus;
