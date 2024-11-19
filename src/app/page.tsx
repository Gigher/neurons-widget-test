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
import { useState, KeyboardEvent, ChangeEvent, useEffect, useCallback } from "react";

export default function Home() {
  const calculateInitialWidth = () => {
    if (typeof window === 'undefined') {
      return 1000;
    }
    const isMobile = /Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isMobile ? window.innerWidth - 40 : window.innerWidth < 1030 ? window.innerWidth - 40 : 1000;
  };

  const DEV_URL = "https://neurons.widget.dev2.webant.ru/";
  const PROD_URL = "https://neurons.widget.cgamult.ru";
  const INITIAL_HEIGHT = "850";

  const [iframeUrl, setIframeUrl] = useState(DEV_URL);
  const [iframeWidth, setIframeWidth] = useState(1000);
  const [iframeHeight, setIframeHeight] = useState(INITIAL_HEIGHT);
  const [inputValueWidth, setInputValueWidth] = useState(1000);
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
    setter: (value: string | number) => void
  ) => {
    setter(e.target.value);
  };

  const handleResize = useCallback(() => {
    const newWidth = calculateInitialWidth();
  if (iframeWidth > newWidth) {
    setIframeWidth(newWidth);
    setInputValueWidth(newWidth);
  }
  }, []);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    resizeObserver.observe(document.documentElement);

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    if (window.screen?.orientation) {
      window.screen.orientation.addEventListener('change', handleResize);
    }

    const mediaQuery = window.matchMedia('(orientation: portrait)');
    mediaQuery.addEventListener('change', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener('change', handleResize);
      }
      mediaQuery.removeEventListener('change', handleResize);
    };
  }, [handleResize]);

  return (
    <div className="py-20 flex flex-col justify-between items-center min-h-screen px-5">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center overflow-x-scroll sm:items-start">
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
              onChange={(e) => handleInputChange(e, (value) => setInputValueWidth(Number(value)))}
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
              <TooltipTrigger asChild>
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
              maxWidth: '100%'
            }}
            title="Neurons Widget"
          />
        </div>
      </main>
    </div>
  );
}
