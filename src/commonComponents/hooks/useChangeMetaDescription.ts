import { useEffect, useRef } from "react";

const metaDescriptionSelector = 'meta[name="description"]';
const ogDescriptionSelector = 'meta[property="og:description"]';
const twitterDescriptionSelector = 'meta[property="twitter:description"]';

const useChangeMetaDescription = (
  newDescription: string,
  restorePreviousOnUnmount: boolean = true
) => {
  const prevMetaDescription = useRef<string | null>(null);
  const prevOGDescription = useRef<string | null>(null);
  const prevTwitterDescription = useRef<string | null>(null);

  useEffect(() => {
    prevMetaDescription.current =
      document.querySelector(ogDescriptionSelector)?.getAttribute("content") ??
      null;
    prevOGDescription.current =
      document.querySelector(ogDescriptionSelector)?.getAttribute("content") ??
      null;
    prevTwitterDescription.current =
      document
        .querySelector(twitterDescriptionSelector)
        ?.getAttribute("content") ?? null;
  }, []);

  useEffect(() => {
    if (newDescription) {
      document
        .querySelector(ogDescriptionSelector)
        ?.setAttribute("content", newDescription);
      document
        .querySelector(ogDescriptionSelector)
        ?.setAttribute("content", newDescription);
      document
        .querySelector(twitterDescriptionSelector)
        ?.setAttribute("content", newDescription);
    }

    if (restorePreviousOnUnmount) {
      return () => {
        if (prevMetaDescription.current) {
          document
            .querySelector(metaDescriptionSelector)
            ?.setAttribute("content", prevMetaDescription.current);
        }
        if (prevOGDescription.current) {
          document
            .querySelector(ogDescriptionSelector)
            ?.setAttribute("content", prevOGDescription.current);
        }
        if (prevTwitterDescription.current) {
          document
            .querySelector(twitterDescriptionSelector)
            ?.setAttribute("content", prevTwitterDescription.current);
        }
      };
    }
  }, [newDescription, restorePreviousOnUnmount]);
};

// TODO: write tests for this
export default useChangeMetaDescription;
