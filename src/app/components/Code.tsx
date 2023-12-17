'use client';
import { ElementRef, MouseEvent, useRef, useState } from "react";
import { Fira_Code } from "next/font/google";

import { classNames } from "@/utils";

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Code({ className, children, ...props }: any) {
	const codeRef = useRef<ElementRef<'pre'>>(null);
	const [isCopied, setIsCopied] = useState(false);
	const [showCopyBtn, setShowCopyButton] = useState(false);

	async function onCopy(e: MouseEvent<HTMLButtonElement>) {
		await navigator.clipboard.writeText(extractText(children));

		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 1000);
	}

	const extractText = (element: React.ReactElement | string): string => {
		// If the element is a string, return it
		if (typeof element === 'string') {
			return element;
		}

		// If the element is a ReactElement, check if it has children
		// If the children is a single string, return it
		if (typeof element.props.children === 'string') {
			return element.props.children;
		}

		// If the children is an array, map over it and extract the text
		if (Array.isArray(element.props.children)) {
			return (element.props.children as (React.ReactElement | string)[])
				.map((child) => extractText(child))
				.join('');
		}

		// If the children is an object (ReactElement), extract the text from it recursively
		if (typeof element.props.children === 'object') {
			return extractText(element.props.children);
		}

		return '';
	};

	return (
		<pre
			ref={codeRef}
			className={classNames(
				"relative w-full p-0 overflow-x-auto text-xs sm:text-sm rounded-lg !bg-gray-900",
				className
			)}
			style={firaCode.style}
			onMouseEnter={() => setShowCopyButton(true)}
			onMouseLeave={() => setShowCopyButton(false)}
			onFocus={() => setShowCopyButton(true)}
			onBlur={() => setShowCopyButton(false)}
			{...props}

		>
			{children}
			{showCopyBtn && (
				<button type="button" className="absolute right-3 top-3 text-xs transition-all duration-1000 ease-in disabled:cursor-not-allowed" disabled={isCopied} onClick={onCopy}>{isCopied ? 'Copied' : 'Copy'}</button>
			)}
		</pre>
	);
}
