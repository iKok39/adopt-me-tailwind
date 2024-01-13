import { Link } from "react-router-dom";
import { Animal } from "../lib/APIResponsesTypes";

interface IProps {
  name: string;
  animal: Animal;
  breed: string;
  images: string[];
  location: string;
  id: number;
}

const Pet = ({ name, animal, breed, images, location, id }: IProps) => {
  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link
      to={`/details/${id}`}
      className=" my-6 mx-0 block h-32 w-full overflow-hidden border-b-2 border-black"
    >
      <div className=" float-left my-0 mr-5 ml-3">
        <img className="h-24 w-24 rounded-full" src={hero} alt={name} />
      </div>
      <div className=" h-24 w-10/12 flex-col justify-around pt-2">
        <h1 className=" m-0 overflow-hidden text-ellipsis text-3xl dark:text-pink-50">
          {name}
        </h1>
        <h2 className=" m-0 text-ellipsis text-xl dark:text-pink-50">
          {animal} - {breed} - {location}
        </h2>
      </div>
    </Link>
  );
};

export default Pet;
