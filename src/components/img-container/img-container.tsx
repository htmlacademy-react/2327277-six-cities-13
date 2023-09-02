import { MAX_IMAGES_COUNT } from '../../const';

type ImgContainerProps = {
  images: string[];
}

export const ImgContainer = ({ images }: ImgContainerProps) => (
  <>
    {Array.from({ length: MAX_IMAGES_COUNT }, (_, i) => (
      <div className="offer__image-wrapper" key={i}>
        <img
          className="offer__image"
          src={images[i]}
          alt="Photo studio"
        />
      </div>
    ))}
  </>
);
