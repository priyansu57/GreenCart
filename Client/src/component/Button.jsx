import { useAppcontext } from "../context/AppContext";

export default function Button({ text, ...prop }) {

    const {navigate} = useAppcontext();
  return (
    <>
      <style>{`
        @keyframes rotate {
          100% {
            transform: rotate(1turn);
          }
        }

        .lime-rotate::before {
          content: '';
          position: absolute;
          z-index: -1;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(from 0deg, #84cc16, #bbf7d0, #84cc16);
          animation: rotate 4s linear infinite;
          filter: blur(10px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .lime-rotate:hover::before {
          opacity: 1;
        }
      `}</style>

      <div className="lime-rotate relative inline-flex items-center justify-center overflow-hidden p-0.5 rounded-full transition duration-300 active:scale-100 border border-gray-400 hover:scale-100">
        <button
        onClick={  () => navigate("/seller")}
          {...prop}
          className="relative z-10 bg-white text-gray-800 px-4 py-1 text-sm rounded-full" 
        >
          {text}
        </button>
      </div>
    </>
  );
}
