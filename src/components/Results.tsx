import { Pet as petType } from "../lib/APIResponsesTypes";
import Pet from "./Pet";

const Results = ({ pets }: { pets: petType[] }) => {
  return (
    <div className=" mb-6 w-full rounded-lg bg-pink-50 p-4 shadow-lg shadow-black  dark:bg-purple-900 dark:shadow-lg dark:shadow-purple-600">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            animal={pet.animal}
            name={pet.name}
            breed={pet.breed}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            id={pet.id}
            key={pet.id}
          />
        ))
      )}
    </div>
  );
};

export default Results;
