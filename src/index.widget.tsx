import React from "react";
import { createRoot, Root as ReactRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import "./index.css";

export interface WidgetOptions {
  containerElementId: string;
  userId?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    renderReactWidget: (config: string) => void;
    unmountReactWidget: (id: string) => void;
  }
}

const widgetRoots: Record<string, ReactRoot> = {};

const queryClient = new QueryClient();

function WidgetRoot({ options }: { options: WidgetOptions }) {
  return (
    <QueryClientProvider client={queryClient}>
      <App options={options} />
    </QueryClientProvider>
  );
}

window.renderReactWidget = (config: string) => {
  let parsedOptions: Partial<WidgetOptions> = {};

  try {
    parsedOptions = JSON.parse(config);
  } catch {
    console.warn("No JSON config passed, using container ID");
  }

  const containerId =
    parsedOptions.containerElementId || config;

  const container = document.getElementById(containerId);

  if (!container) {
    console.error(`Container "${containerId}" not found`);
    return;
  }

  const finalOptions: WidgetOptions = {
    ...parsedOptions,
    containerElementId: containerId,
  };

  // Unmount existing widget if present
  if (widgetRoots[containerId]) {
    widgetRoots[containerId].unmount();
  }

  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <WidgetRoot options={finalOptions} />
    </React.StrictMode>
  );

  widgetRoots[containerId] = root;
};

window.unmountReactWidget = (containerElementId: string) => {
  const root = widgetRoots[containerElementId];

  if (root) {
    root.unmount();
    delete widgetRoots[containerElementId];
  }
};