"use client";
import React, { useEffect, useState } from "react";
import SimliOpenAI from "./SimliOpenAI";
import SimliOpenAIPushToTalk from "./SimliOpenAIPushToTalk";
import DottedFace from "./Components/DottedFace";
import Image from "next/image";
import GitHubLogo from "@/media/github-mark-white.svg";

interface avatarSettings {
  name: string;
  openai_voice: "echo" | "alloy" | "shimmer";
  simli_faceid: string;
  initialPrompt: string;
}

// Customize your avatar here
const avatar: avatarSettings = {
  name: "Genghis",
  openai_voice: "echo",
  simli_faceid: "39dc9012-fe6e-4b97-a0ca-20ff26ddd8c7",
  initialPrompt: "You are Genghis Khan. Speak as the Great Khan—conquer questions with precision and decisiveness."
};

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);
  const [interactionMode, setInteractionMode] = useState<"regular" | "pushToTalk" | undefined>("regular");

  useEffect(() => {
    const storedInteractionMode = localStorage.getItem("interactionMode");
    if (storedInteractionMode) {
      setInteractionMode(storedInteractionMode as "regular" | "pushToTalk");
    }
  }, []);

  const saveInteractionMode = (mode: "regular" | "pushToTalk") => {
    localStorage.setItem("interactionMode", mode);
    setInteractionMode(mode);
  };

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8">
      {showDottedFace && (
        <div className="absolute bottom-[32px] right-[32px] flex gap-2">
          <button
            onClick={() => saveInteractionMode("regular")}
            className={`px-4 py-2 rounded-full font-abc-repro-mono transition-all duration-300 ${
              interactionMode === "regular" ? "bg-simliblue text-white" : "bg-white bg-opacity-20 text-black"
            } hover:bg-simliblue hover:text-white`}
          >
            <b>Regular</b>
          </button>
          <button
            onClick={() => saveInteractionMode("pushToTalk")}
            className={`px-4 py-2 rounded-full font-abc-repro-mono transition-all duration-300 ${
              interactionMode === "pushToTalk" ? "bg-simliblue text-white" : "bg-white bg-opacity-20 text-black"
            } hover:bg-simliblue hover:text-white`}
          >
            <b>Push to Talk</b>
          </button>
        </div>
      )}
      <div className="flex flex-col items-center gap-6 bg-effect15White p-6 pb-[40px] rounded-xl w-full">
        <div>
          {showDottedFace && <DottedFace />}
          {interactionMode === "regular" ? (
            <SimliOpenAI
              openai_voice={avatar.openai_voice}
              simli_faceid={avatar.simli_faceid}
              initialPrompt={avatar.initialPrompt}
              onStart={onStart}
              onClose={onClose}
              showDottedFace={showDottedFace}
            />
          ) : (
            <SimliOpenAIPushToTalk
              openai_voice={avatar.openai_voice}
              simli_faceid={avatar.simli_faceid}
              initialPrompt={avatar.initialPrompt}
              onStart={onStart}
              onClose={onClose}
              showDottedFace={showDottedFace}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
