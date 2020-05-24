import { useEffect, useRef } from "react";

const ogTitleSelector = 'meta[property="og:title"]';
const twitterTitleSelector = 'meta[property="twitter:title"]';

const useChangeMetaTitle = (
  newTitle: string,
  restorePreviousOnUnmount: boolean = true
) => {
  const prevDocumentTitle = useRef<string | null>(null);
  const prevOGTitle = useRef<string | null>(null);
  const prevTwitterTitle = useRef<string | null>(null);

  useEffect(() => {
    prevDocumentTitle.current = document.title;
    prevOGTitle.current =
      document.querySelector(ogTitleSelector)?.getAttribute("content") ?? null;
    prevTwitterTitle.current =
      document.querySelector(twitterTitleSelector)?.getAttribute("content") ??
      null;
  }, []);

  useEffect(() => {
    if (newTitle) {
      document.title = newTitle;
      document
        .querySelector(ogTitleSelector)
        ?.setAttribute("content", newTitle);
      document
        .querySelector(twitterTitleSelector)
        ?.setAttribute("content", newTitle);
    }

    if (restorePreviousOnUnmount) {
      return () => {
        if (prevDocumentTitle.current) {
          document.title = prevDocumentTitle.current;
        }
        if (prevOGTitle.current) {
          document
            .querySelector(ogTitleSelector)
            ?.setAttribute("content", prevOGTitle.current);
        }
        if (prevTwitterTitle.current) {
          document
            .querySelector(twitterTitleSelector)
            ?.setAttribute("content", prevTwitterTitle.current);
        }
      };
    }
  }, [newTitle, restorePreviousOnUnmount]);
};

// TODO: write tests for this
export default useChangeMetaTitle;
