
import sanka from "@utils/sanka";

interface AZList {
  az_list_letters: {
    letter: string;
    slug: string;
    url: string;
  }[];
}

export default async function azListService() {
  const result = await sanka<AZList>("/az-list");
  return result;
}