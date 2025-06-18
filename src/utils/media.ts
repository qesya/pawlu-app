import { ProductImageDetailsMedia } from "../components/organisms/ProductImageDetails/ProductImageDetails.types";

export function mapProductMedia(
  media: { id: string | number; url: string }[],
): ProductImageDetailsMedia[] {
  return media.map((item) => ({
    id: item.id,
    src: item.url,
  }));
}
