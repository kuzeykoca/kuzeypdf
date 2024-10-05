export default function ApplicationLogo(props) {
    return (
        <svg width="64px" height="64px" viewBox="0 0 128 128"
             {...props}
             aria-hidden="true" role="img" className="iconify iconify--noto"
             preserveAspectRatio="xMidYMid meet">
            <path
                d="M110.55 117.41L76.92 63.69l29.73-44.82c.45-.69.5-1.57.1-2.3a2.222 2.222 0 0 0-1.97-1.18H80.34c-.74 0-1.45.38-1.86 1L51.49 57.08V17.64c0-1.24-1.01-2.24-2.24-2.24h-21.9c-1.24 0-2.24 1-2.24 2.24V118.6c0 1.24 1 2.24 2.24 2.24h21.9c1.23 0 2.24-1 2.24-2.24V70.55l30.82 49.24c.41.65 1.13 1.05 1.9 1.05h24.44c.81 0 1.57-.44 1.96-1.16c.39-.71.37-1.58-.06-2.27z"
                fill="none" stroke="#FF2D20" strokeWidth="2"></path>
        </svg>
    );
}