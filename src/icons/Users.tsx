import * as React from "react";
import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="2em"
    height="2em"
    {...props}
  >
    <path
      fill="#3071f1"
      d="M13.98 6.92v.06h-.02c-.18 0-.42 0-.62.05a3.907 3.907 0 0 0-3.25 3.2c-.01.02-.01.05-.01.07-.05.23-.06.45-.06.62 0 1.43.77 2.67 1.92 3.36-.93.4-1.73 1.07-2.28 1.96-.16.25-.29.5-.4.77H6.75c-.99 0-1.79-.8-1.79-1.79v-.27c0-2.09 1.26-3.88 3.06-4.66A3.915 3.915 0 0 1 6.1 6.92c0-2.17 1.77-3.94 3.94-3.94s3.94 1.77 3.94 3.94z"
    />
    <path
      fill="#90b2f2"
      d="M19.04 18.95v.27c0 .99-.8 1.79-1.79 1.79h-6.58c-.99 0-1.79-.8-1.79-1.79v-.27c0-.68.13-1.33.38-1.94.11-.27.24-.52.4-.77.55-.89 1.35-1.56 2.28-1.96a3.91 3.91 0 0 1-1.92-3.36c0-.17.01-.39.06-.62 0-.02 0-.05.01-.07.29-1.66 1.6-2.95 3.25-3.2.2-.05.44-.05.62-.05h.02c2.16.01 3.92 1.77 3.92 3.94 0 1.42-.76 2.68-1.92 3.37a5.06 5.06 0 0 1 3.06 4.66z"
    />
  </svg>
);
export default SvgComponent;
