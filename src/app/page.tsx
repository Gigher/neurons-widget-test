"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

export default function Home() {
  const [iframeWidth, setIframeWidth] = useState("1000");
  const [iframeHeight, setIframeHeight] = useState("600");

  const [inputValueWidth, setInputValueWidth] = useState("1000");
  const [inputValueHeight, setInputValueHeight] = useState("600");

  const handleApply = () => {
    setIframeWidth(inputValueWidth);
    setIframeHeight(inputValueHeight);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  return (
    <div className="py-20 flex flex-col justify-between items-center min-h-screen">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start">
        <h1 className="w-full text-center text-5xl font-normal">
          Neurons widget test
        </h1>
        <div className="w-full flex gap-6 flex-wrap items-end justify-center">
          <div>
            <label htmlFor="width-input" className="">
              Ширина
            </label>
            <Input
              id="width-input"
              value={inputValueWidth}
              onChange={(e) => setInputValueWidth(e.target.value)}
              onKeyPress={handleKeyPress}
              title="Width"
              placeholder="Width"
              className="w-32"
            />
          </div>
          <div>
            <label htmlFor="heitgh-input" className="">
              Высота
            </label>
            <Input
              id="height-input"
              value={inputValueHeight}
              onChange={(e) => setInputValueHeight(e.target.value)}
              onKeyPress={handleKeyPress}
              title="Height"
              placeholder="Height"
              className="w-32"
            />
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button onClick={handleApply}>Применить</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Нажмите, чтобы применить новые размеры виджета</p>
              </TooltipContent>
            </Tooltip>{" "}
          </TooltipProvider>
        </div>
        <div className="flex justify-center items-center border-2 m-0">
          <iframe
            src="https://neurons.widget.dev2.webant.ru/"
            width={iframeWidth}
            height={iframeHeight}
            style={{
              transition: "all 0.3s ease-in-out",
            }}
          ></iframe>
        </div>
      </main>
    </div>
  );
}
