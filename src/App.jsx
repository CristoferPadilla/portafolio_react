import { TwitterFollowCard } from "./components/TwitterFollowCard.jsx";
export function App() {
  const format = (userName) => `@${userName}`;

  const users = [
    {
      name: "Cristofer Padilla Calderón",
      userName: "CristoferP0406",
      userPhoto:
        "https://unavatar.io/github/37t?fallback=https://source.boringavatars.com/marble/120/1337_user?colors=264653r,2a9d8f,e9c46a,f4a261,e76f51",
    },
    {
      name: "Josué Aron Avila",
      userName: "JosueAvila056",
      userPhoto: "https://unavatar.io/dribbble/omidnikrah",
    },
    {
      name: "Valeria Kú",
      userName: "ValeriaKu12354",
      userPhoto: "https://unavatar.io/gravatar/sindresorhus@gmail.com",
    },
  ];

  return (
    <section className="App">
      {
        //Esto es para mapear una lista y renderizarla
        users.map(({ name, userName, userPhoto }) => (
          <TwitterFollowCard
            key={userName}
            name={name}
            userName={userName}
            userPhoto={userPhoto}
            formatUserName={format}
          />
        ))
      }
    </section>
  );
}
