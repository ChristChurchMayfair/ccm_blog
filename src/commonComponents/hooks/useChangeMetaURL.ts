import { useEffect, useRef } from "react";

const URL_BASE = "https://blog.christchurchmayfair.org";

const ogURLSelector = 'meta[property="og:url"]';

const useChangeMetaURL = (
  newPathname: string,
  restorePreviousOnUnmount: boolean = true
) => {
  const prevOGURL = useRef<string | null>(null);

  useEffect(() => {
    prevOGURL.current =
      document.querySelector(ogURLSelector)?.getAttribute("content") ?? null;
  }, []);

  useEffect(() => {
    if (newPathname) {
      document
        .querySelector(ogURLSelector)
        ?.setAttribute("content", `${URL_BASE}${newPathname}`);
    }

    if (restorePreviousOnUnmount) {
      return () => {
        if (prevOGURL.current) {
          document
            .querySelector(ogURLSelector)
            ?.setAttribute("content", prevOGURL.current);
        }
      };
    }
  }, [newPathname, restorePreviousOnUnmount]);
};

// TODO: write tests for this
export default useChangeMetaURL;
