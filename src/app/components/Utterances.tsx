"use client";
import React, { ElementRef, useEffect, useRef } from "react";

import { githubUser, repo } from "@/data";

export default function Utterances({ issueNumber }: { issueNumber: number }) {
  const utterancesDiv = useRef<ElementRef<"div">>(null);
  const isLoaded = useRef(false);

  useEffect(() => {
    const el = utterancesDiv.current;

    let observer: IntersectionObserver;
    if (el) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!isLoaded.current && entry.isIntersecting) {
            injectScript(el, issueNumber);
            isLoaded.current = true;
          }
        });
      });

      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
        isLoaded.current = false;
      }
    };
  }, [utterancesDiv.current]);

  function injectScript(element: HTMLDivElement, issueNumber: number) {
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", `${githubUser}/${repo}`);
    script.setAttribute("issue-number", issueNumber.toString());
    script.setAttribute("theme", "github-dark");

    element.innerHTML = "";
    element.appendChild(script);
  }

  return (
    <div ref={utterancesDiv} className="mb-10 text-sm font-medium text-gray-300">
      <span>Loading comments...</span>
    </div>
  );
}
