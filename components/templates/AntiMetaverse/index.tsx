import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const AntiMetaverse = () => {
  const { unityProvider } = useUnityContext({
    loaderUrl: "build/antimetaverse-build.loader.js",
    dataUrl: "build/antimetaverse-build.data",
    frameworkUrl: "build/antimetaverse-build.framework.js",
    codeUrl: "build/antimetaverse-build.wasm",
  });

  return <Unity style={{ width: '100%', height: "100%" }} unityProvider={unityProvider} />;
}

export default AntiMetaverse;
