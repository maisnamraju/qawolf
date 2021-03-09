import { Blank, IconProps } from "grommet-icons";

export default function Timer(props: IconProps): JSX.Element {
  return (
    <Blank {...props} viewBox="0 0 16 16">
      <path d="M8.5 5.5H7.5V10H8.5V5.5Z" fill={props.color} />
      <path d="M9.5 1H6.5V2H9.5V1Z" fill={props.color} />
      <path
        d="M13.9997 4.50006L13.2897 3.79506L12.1647 4.92006C11.2438 3.85657 9.9486 3.18877 8.54814 3.05541C7.14769 2.92205 5.7497 3.33337 4.64462 4.20393C3.53955 5.07448 2.81236 6.33733 2.61415 7.73008C2.41595 9.12284 2.76196 10.5384 3.58029 11.6827C4.39862 12.827 5.62637 13.612 7.00842 13.8746C8.39048 14.1372 9.82059 13.8573 11.0016 13.0929C12.1826 12.3286 13.0238 11.1386 13.3502 9.77022C13.6767 8.40184 13.4634 6.96028 12.7547 5.74506L13.9997 4.50006ZM7.99973 13.0001C7.10971 13.0001 6.23968 12.7361 5.49966 12.2417C4.75964 11.7472 4.18286 11.0444 3.84227 10.2221C3.50167 9.39986 3.41256 8.49506 3.58619 7.62215C3.75983 6.74924 4.18841 5.94741 4.81775 5.31808C5.44708 4.68874 6.2489 4.26016 7.12182 4.08652C7.99473 3.91289 8.89953 4.002 9.7218 4.3426C10.5441 4.68319 11.2469 5.25997 11.7413 5.99999C12.2358 6.74001 12.4997 7.61004 12.4997 8.50006C12.4997 9.69353 12.0256 10.8381 11.1817 11.682C10.3378 12.526 9.1932 13.0001 7.99973 13.0001Z"
        fill={props.color}
      />
    </Blank>
  );
}