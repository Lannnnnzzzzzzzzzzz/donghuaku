import sanka from "@utils/sanka";

export interface Allanimes {
  list: {
    startWith: string;
    animeList: animeLinkCard[];
  }[];
}

export default async function homeService() {
  const result = await sanka<Allanimes>("/anime");

  return result;
}
