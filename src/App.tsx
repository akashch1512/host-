import { useEffect, useState } from 'react';
import './index.css';
import { bear, coin, highVoltage, notcoin, rocket } from './images';
import tapSound from './sounds/tapsound.mp3';

const App = () => {
  const [points, setPoints] = useState(0);
  const [energy, setEnergy] = useState(2652);
  const [clicks, setClicks] = useState<{ id: number, x: number, y: number }[]>([]);
  const [notcoinPressed, setNotcoinPressed] = useState(false);
  const pointsToAdd = 2;
  const energyToReduce = 12;
  const level_points = 1000000;

  const handleClick = (x: number, y: number, pointsToAdd: number) => {
    if (energy - energyToReduce < 0) {
      return;
    }

    setPoints(points + pointsToAdd);
    setEnergy(energy - energyToReduce < 0 ? 0 : energy - energyToReduce);
    setClicks([...clicks, { id: Date.now(), x, y }]);
    setNotcoinPressed(true);

    // Play sound
    const audio = new Audio(tapSound);
    audio.play();

    // Reset pressed state after animation
    setTimeout(() => {
      setNotcoinPressed(false);
    }, 200); // Adjust timing to match animation duration
  };

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter(click => click.id !== id));
  };

  // Handle mouse click
  const handleMouseClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    handleClick(x, y, 2); // Add 2 points for mouse click
  };

  // Handle touch start (for mobile)
 const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  e.preventDefault();

  // Deduct 2 points for any touch event
  const pointsToDeduct = 2;
  setPoints(points => Math.max(points - pointsToDeduct, 0));

  // Get the number of active touches
  const activeTouches = e.touches.length;

  // Handle based on the number of touches
  switch (activeTouches) {
    case 1:
      const touch1 = e.touches[0];
      const rect1 = e.currentTarget.getBoundingClientRect();
      const x1 = touch1.clientX - rect1.left;
      const y1 = touch1.clientY - rect1.top;
      handleClick(x1, y1, 2); // Add 2 points for one finger touch
      break;
    case 2:
      const touch2_1 = e.touches[0];
      const touch2_2 = e.touches[1];
      const rect2 = e.currentTarget.getBoundingClientRect();
      const x2_1 = touch2_1.clientX - rect2.left;
      const y2_1 = touch2_1.clientY - rect2.top;
      const x2_2 = touch2_2.clientX - rect2.left;
      const y2_2 = touch2_2.clientY - rect2.top;
      handleClick(x2_1, y2_1, 4); // Add 4 points for two finger touch
      handleClick(x2_2, y2_2, 4); // Add 4 points for two finger touch
      break;
    case 3:
      const touch3_1 = e.touches[0];
      const touch3_2 = e.touches[1];
      const touch3_3 = e.touches[2];
      const rect3 = e.currentTarget.getBoundingClientRect();
      const x3_1 = touch3_1.clientX - rect3.left;
      const y3_1 = touch3_1.clientY - rect3.top;
      const x3_2 = touch3_2.clientX - rect3.left;
      const y3_2 = touch3_2.clientY - rect3.top;
      const x3_3 = touch3_3.clientX - rect3.left;
      const y3_3 = touch3_3.clientY - rect3.top;
      handleClick(x3_1, y3_1, 6); // Add 6 points for three finger touch
      handleClick(x3_2, y3_2, 6); // Add 6 points for three finger touch
      handleClick(x3_3, y3_3, 6); // Add 6 points for three finger touch
      break;
    default:
      // Handle other cases if needed
      break;
  }
};


  // useEffect hook to restore energy over time
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prevEnergy) => Math.min(prevEnergy + 1, level_points ));
    }, 100); // Restore 10 energy points every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="bg-gradient-main min-h-screen px-4 flex flex-col items-center text-white font-medium">

      <div className="absolute inset-0 h-1/2 bg-gradient-overlay z-0"></div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <div className="radial-gradient-overlay"></div>
      </div>

      <div className="w-full z-10 min-h-screen flex flex-col items-center text-white">

        <div className="fixed top-0 left-0 w-full px-4 pt-8 z-10 flex flex-col items-center text-white">
          <div className="mt-12 text-5xl font-bold flex items-center">
            <img src={coin} width={44} height={44} />
            <span className="ml-2">{points.toLocaleString()}</span>
          </div>
          <div className="text-base mt-2 flex items-center">
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full px-5 pb-4 z-1">
          <div className="w-full flex justify-between gap-2">
            <div className="w-1/3 flex items-center justify-start max-w-32">
              <div className="flex items-center justify-center">
                <img src={highVoltage} width={44} height={44} alt="High Voltage" />
                <div className="ml-2 text-left">
                  <span className="text-white text-2xl font-bold block">{energy}</span>
                  <span className="text-white text-large opacity-75">/ 6500</span>
                </div>
              </div>
            </div>
            <div className="flex-grow flex items-center max-w-60 text-sm">
              <div className="w-full bg-[#fad258] py-4 rounded-2xl flex justify-around">
                <button className="flex flex-col items-center gap-1">
                  <img src={bear} width={24} height={24} alt="High Voltage" />
                  <span>Frens</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1">
                  <img src={coin} width={24} height={24} alt="High Voltage" />
                  <span>Earn</span>
                </button>
                <div className="h-[48px] w-[2px] bg-[#fddb6d]"></div>
                <button className="flex flex-col items-center gap-1">
                  <img src={rocket} width={24} height={24} alt="High Voltage" />
                  <span>Boosts</span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#f9c035] rounded-full mt-4">
            <div className="bg-gradient-to-r from-[#f3c45a] to-[#fffad0] h-4 rounded-full" style={{ width: `${(energy / 6500) * 100}%` }}></div>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <div className="relative mt-4" onClick={handleMouseClick} onTouchStart={handleTouchStart}>
            <img src={notcoin} width={250} height={300} className={notcoinPressed ? "notcoin-pressed" : ""} alt="notcoin" />
            {clicks.map((click) => (
              <div
                key={click.id}
                className="absolute text-5xl font-bold opacity-0"
                style={{
                  top: `${click.y - 42}px`,
                  left: `${click.x - 28}px`,
                  animation: `float 1s ease-out`
                }}
                onAnimationEnd={() => handleAnimationEnd(click.id)}
              >
                {pointsToAdd}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
