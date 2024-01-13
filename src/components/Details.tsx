import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "../lib/fetchPet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import { useContext, useState } from "react";
import Modal from "./Modal";
import AdoptedPetContext from "../lib/AdoptedPetContext";

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("why did you not give me an id? I need an id.");
  }

  const results = useQuery(["details", id], fetchPet);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isError) {
    return <h1>Hell no man! There is an error!</h1>;
  }

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];

  return (
    <div className="mx-auto w-11/12 rounded-md bg-pink-50 p-4 shadow-lg dark:bg-purple-900 dark:shadow-lg dark:shadow-purple-600">
      <Carousel images={pet.images} />
      <div className=" mt-5">
        <h1 className=" mx-1 my-0 text-center text-6xl text-red-900 dark:text-pink-200">
          {pet.name}
        </h1>
        <h2 className=" mx-0 mt-1 mb-5 text-center text-xl font-semibold dark:text-pink-50">
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
          <button className="button mb-5" onClick={() => setShowModal(true)}>
            Adopt {pet.name}
          </button>
          <p className=" px-4 py-0 leading-7">{pet.description}</p>
          {showModal ? (
            <Modal>
              <div className=" max-w-lg rounded-3xl bg-pink-50 p-4 text-center text-xl">
                <h1>Would you like to adopt {pet.name}?</h1>
                <div className="flex items-center justify-center">
                  <button
                    className="button"
                    onClick={() => {
                      setAdoptedPet(pet);
                      navigate("/");
                    }}
                  >
                    Yes
                  </button>
                  <button
                    className="button"
                    onClick={() => setShowModal(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </h2>
      </div>
    </div>
  );
};

function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
