"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState, KeyboardEvent, ChangeEvent } from "react";

export default function Home() {
  const INITIAL_WIDTH = "1000";
  const INITIAL_HEIGHT = "600";
  const DEV_URL = "https://neurons.widget.dev2.webant.ru/";
  const PROD_URL = "https://neurons.widget.cgamult.ru";

  const [iframeUrl, setIframeUrl] = useState(DEV_URL);
  const [iframeWidth, setIframeWidth] = useState(INITIAL_WIDTH);
  const [iframeHeight, setIframeHeight] = useState(INITIAL_HEIGHT);
  const [inputValueWidth, setInputValueWidth] = useState(INITIAL_WIDTH);
  const [inputValueHeight, setInputValueHeight] = useState(INITIAL_HEIGHT);

  const handleApply = () => {
    setIframeWidth(inputValueWidth);
    setIframeHeight(inputValueHeight);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApply();
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setter: (value: string) => void
  ) => {
    setter(e.target.value);
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
              onChange={(e) => handleInputChange(e, setInputValueWidth)}
              onKeyPress={handleKeyPress}
              title="Width"
              placeholder="Width"
              className="w-32"
            />
          </div>
          <div>
            <label htmlFor="height-input" className="">
              Высота
            </label>
            <Input
              id="height-input"
              value={inputValueHeight}
              onChange={(e) => handleInputChange(e, setInputValueHeight)}
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
            </Tooltip>
          </TooltipProvider>

          <Separator orientation="vertical" className="h-10" />

          <Button
            onClick={() => setIframeUrl(DEV_URL)}
            variant={iframeUrl === DEV_URL ? "default" : "outline"}
          >
            dev
          </Button>
          <Button
            onClick={() => setIframeUrl(PROD_URL)}
            variant={iframeUrl === PROD_URL ? "default" : "outline"}
          >
            prod
          </Button>
        </div>
        <div className="flex justify-center items-center border-2 m-0">
          <iframe
            src={iframeUrl}
            width={iframeWidth}
            height={iframeHeight}
            style={{
              transition: "all 0.3s ease-in-out",
            }}
            title="Neurons Widget"
          />
        </div>
      </main>
    </div>
  );
}
