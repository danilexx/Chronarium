import { AdventureModel } from "../services/types";

const getSafeAdventureImage = (adventure: AdventureModel) => {
  if (adventure.avatar) {
    return adventure.avatar.url;
  }
  return "/images/adventure.jpg";
};

export default getSafeAdventureImage;