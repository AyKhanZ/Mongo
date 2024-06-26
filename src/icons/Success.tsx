import * as React from "react"
import { SVGProps } from "react"
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="5em"
        height="5em"
        viewBox="0 0 117 117"
        {...props}
    >
        <title />
        <g fill="none" fillRule="nonzero">
            <path
                fill="#17AB13"
                d="M34.5 55.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l18.9 18.9c.8.8 1.8 1.2 2.9 1.2h.2c1.1-.1 2.2-.6 3-1.5L101 22.8c1.4-1.7 1.2-4.3-.5-5.8-1.7-1.4-4.3-1.2-5.8.5L50.2 70.8 34.5 55.1Z"
            />
            <path
                fill="#4A4A4A"
                d="M89.1 9.3c-23-14.4-52.5-11-71.7 8.2-22.6 22.6-22.6 59.5 0 82.1a57.94 57.94 0 0 0 82 0c19.3-19.3 22.6-48.9 8.1-71.9-1.2-1.9-3.7-2.5-5.6-1.3-1.9 1.2-2.5 3.7-1.3 5.6 12.5 19.8 9.6 45.2-7 61.8-19.4 19.4-51.1 19.4-70.5 0s-19.4-51.1 0-70.5C39.7 6.8 65 3.9 84.8 16.2c1.9 1.2 4.4.6 5.6-1.3 1.2-1.9.6-4.4-1.3-5.6Z"
            />
        </g>
    </svg>
)
export default SvgComponent
