import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import jeannetteDortheImage from "../assets/jeannetteDorthe.jpeg";
import noseworkImage from "../assets/nosework.jpeg";
import competitionImage from "../assets/competition.jpeg";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-yellow-600">
          DJ Nosework
        </h1>
        <span className="text-xl">Bliv en del af fælleskabet!</span>
        <SearchBar
          placeholder="Søg efter by eller pris"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <img
            src={jeannetteDortheImage}
            alt="Jeannette og Dorthe"
            className="w-full max-h-[300px] object-cover rounded-md"
          />
          <span className="font-bold text-3xl tracking-tighter">
            Jeannette og Dorthe
          </span>
          <p className="text-lg">
            Vores baggrund er selv at være Nose Work udøvere gennem en lang
            årrække, begge deltagende i konkurrencer i Danmark (DKK og DCH) samt
            Sverige. Vi kan i fællesskab ud over vores egen NW erfaring
            tilskrive DKK-instruktør, DCH Dommer mv. til vores CV.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Hvad vi tilbyder
          </span>
          <p className="text-lg">
            Formålet med denne hjemmeside er at give dig en masse tilbud om
            sjove Nose Work udfordringer. Det bliver alt fra Tema-dage,
            konkurrence-træning, anderledes kurser, uofficielle konkurrencer
            osv.
          </p>
          <p className="text-lg">
            Træning og undervisninger vil primært være med Dorthe Bernhardt og
            Jeannette Grøn.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <img
            src={noseworkImage}
            alt="Nosework"
            className="w-full max-h-[300px] object-cover rounded-md"
          />
          <span className="font-bold text-3xl tracking-tighter">
            Hvad er Nosework?
          </span>
          <p className="text-lg">
            Hundesporten Nosework indebærer træning af hunde til at identificere
            specifikke dufte i et afmærket område.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <img
            src={competitionImage}
            alt="Tidligere konkurrencer og kurser"
            className="w-full max-h-[300px] object-cover rounded-md"
          />
          <span className="font-bold text-3xl tracking-tighter">
            Tidligere konkurrencer og kurser
          </span>
          <p className="text-lg">
            Vi har deltaget i kurser hos:
            <ul className="list-disc list-inside">
              <li>Birgitte Lauritzen Amarok</li>
              <li>Sara Lahti</li>
              <li>Ann-Louise Ryrvik</li>
              <li>Susanne Lindberg</li>
              <li>Gail McCarthy</li>
              <li>Sofia Olsson</li>
              <li>Karina M. Nielsen</li>
              <li>Irene Jarnved</li>
              <li>Positiv indlæring Zara DKK</li>
              <li>Mantrail</li>
              <li>Schweiss spor træning og underviser</li>
              <li>Sporlægger kursus</li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
