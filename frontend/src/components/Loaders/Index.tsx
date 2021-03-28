import { useEffect, useState } from "react";
import ContentLoader from "react-content-loader"
import './style.css'

interface LoaderCircleProps {
  size?: 'sm' | 'md';
  message?: string;
}
export function LoaderCircle({ size }: LoaderCircleProps) {
  const spinnerSize = size === 'sm' ? 'spinner-border-sm' : ''
  return (
    <div className="d-flex justify-content-center loader">
      <div className={`spinner-border ${spinnerSize} text-light`} role="status"></div>
    </div>
  );
}

export function LoaderCircleButton({ message }: LoaderCircleProps) {
  return (
    <button className="btn btn-pink" type="button" disabled>
      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
      {message}
    </button>
  );
}

export const LoaderCard = () => {
  const loaderLenght = [1, 2, 3];
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsVisible(true), 250);
    if (!isVisible) return () => { };
  }, [isVisible])

  return (
    <div>
      {isVisible &&
        loaderLenght.map((key) => <Loader key={key} />)
      }
    </div>
  );
}

const Loader = () => {
  return (
    <ContentLoader className="loader" style={{ maxHeight: 250 }}
      speed={2}
      viewBox={`0 0 1200 230`}
      height={"100%"} width={"100%"}
      backgroundColor="#44475a"
      foregroundColor="#5c6175"
    >
      <rect x="0" y="0" rx="5" ry="5" width="100%" height={"89%"} />
    </ContentLoader >
  )
}


export const LoaderGame = () => (
  <ContentLoader className="loader"
    speed={2}
    width={750}
    height={250}
    viewBox="0 0 750 250"
    backgroundColor="#44475a"
    foregroundColor="#5c6175"
  >
    <circle cx="45" cy="40" r="31" />
    <rect x="91" y="28" rx="5" ry="5" width="220" height="26" />
    <rect x="48" y="96" rx="5" ry="5" width="63" height="14" />
    <rect x="49" y="120" rx="5" ry="5" width="120" height="38" />
    <rect x="200" y="96" rx="5" ry="5" width="73" height="14" />
    <rect x="201" y="120" rx="5" ry="5" width="120" height="38" />
    <rect x="350" y="96" rx="5" ry="5" width="73" height="14" />
    <rect x="351" y="120" rx="5" ry="5" width="120" height="38" />
    <rect x="105" y="200" rx="3" ry="3" width="75" height="40" />
    <rect x="15" y="200" rx="3" ry="3" width="75" height="40" />
  </ContentLoader>
)

export const LoaderGameMobile = () => (
  <ContentLoader speed={2} className="loader"
    width={750}
    height={450}
    viewBox="0 0 750 450"
    backgroundColor="#44475a"
    foregroundColor="#5c6175">
    <circle cx="45" cy="40" r="34" />
    <rect x="91" y="28" rx="5" ry="5" width="220" height="26" />

    <rect x="48" y="96" rx="5" ry="5" width="63" height="14" />
    <rect x="49" y="120" rx="5" ry="5" width="120" height="38" />

    <rect x="48" y="180" rx="5" ry="5" width="63" height="14" />
    <rect x="49" y="204" rx="5" ry="5" width="120" height="38" />

    <rect x="48" y="264" rx="5" ry="5" width="63" height="14" />
    <rect x="49" y="288" rx="5" ry="5" width="120" height="38" />

    <rect x="105" y="360" rx="3" ry="3" width="75" height="40" />
    <rect x="15" y="360" rx="3" ry="3" width="75" height="40" />

  </ContentLoader>
)