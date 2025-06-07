import { useAuth } from "../../AuthContect/AuthContext";

export default function Greeting() {

    const {isLoggedIn, user} = useAuth();
  const curHour = new Date().getHours();
  let greeting = '';
  let textColor = '';
  let nameColor = '';

  if (curHour >= 1 && curHour < 12) {
    greeting = 'GOOD MORNING';
    textColor = 'text-yellow-200';
     nameColor ='text-amber-600';
  } else if (curHour >= 12 && curHour < 19) {
    greeting = 'GOOD AFTERNOON';
    textColor = 'text-green-400';
     nameColor ='text-amber-600';
  } else {
    greeting = 'GOOD NIGHT';
    textColor = 'text-blue-200';
    nameColor ='text-amber-600';
  }

  return (
    <div>
      <h1 className="font-mono text-4xl font-bold text-red-800">
       {isLoggedIn ? <>
           HELLO,<span className={`font-sans ${textColor}`}>{greeting}</span>
            <span className={`font-sans ${nameColor}`}>{user.name}</span>
       </>: <>
           HELLO,<span className={`font-sans ${textColor}`}>{greeting}</span>
       </>

       }
      
      </h1>
    </div>
  );
}
