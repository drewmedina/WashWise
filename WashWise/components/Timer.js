import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';


function Timer(){
<CountdownCircleTimer
isPlaying={isPlaying[index]}
key={keys[index]}
duration={5}
colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
colorsTime={[10, 6, 3, 0]}
onComplete={() => {
  toggleOccupancy(index + 1);
}}
updateInterval={1}
>
{({ remainingTime, color }) => (
  <Text style={{ color, fontSize: 20 }}>{remainingTime}</Text>
)}
</CountdownCircleTimer>
}

export default Timer;