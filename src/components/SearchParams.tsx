import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "../lib/useBreedList";
import Results from "./Results";
import fetchSearch from "../lib/fetchSearch";
import AdoptedPetContext from "../lib/AdoptedPetContext";
import Pagination from "./Pagination";
import { Animal } from "../lib/APIResponsesTypes";
const ANIMALS: Animal[] = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "" as Animal,
    breed: "",
  });

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(3);
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  return (
    <div className="relative mx-auto mb-0 w-11/12 max-w-5xl">
      <form
        className="mx-auto mb-10 flex w-1/2 flex-col items-center justify-center rounded-lg bg-pink-50 p-10 shadow-lg shadow-black dark:bg-purple-900 dark:shadow-lg dark:shadow-purple-600"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const obj = {
            animal:
              (formData.get("animal")?.toString() as Animal) ?? ("" as Animal),
            breed: formData.get("breed")?.toString() ?? "",
            location: formData.get("location")?.toString() ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div>
            <img
              className="h-24 w-24 rounded-full"
              src={adoptedPet.images[0]}
              alt={adoptedPet.name}
            />
          </div>
        ) : null}
        <label className="text-lg dark:text-pink-50" htmlFor="location">
          Location
          <input
            className="search-input"
            type="text"
            name="location"
            id="location"
            placeholder="Location"
          />
        </label>
        <label className="text-lg dark:text-pink-50" htmlFor="animal">
          Animal
          <select
            className="search-input"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label className="text-lg dark:text-pink-50" htmlFor="breed">
          Breed
          <select
            className="search-input grayed-out-disabled"
            id="breed"
            disabled={!breeds.length}
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button className="button">Submit</button>
      </form>
      <Results pets={currentPets} />
      <Pagination
        totalPets={pets.length}
        petsPerPage={petsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default SearchParams;
