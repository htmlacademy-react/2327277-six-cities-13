import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { OfferPreview, City, Offer } from '../../types/offer-types';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  className: string;
  city: City | undefined;
  offers: OfferPreview[];
  selectedOffer: OfferPreview | undefined;
  currentOffer: Offer | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [28, 40],
  iconAnchor: [14, 40]
});

export default function Map({ className, city, offers, selectedOffer, currentOffer }: MapProps) {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map && city) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedOffer && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);

        if (offer.location.latitude === currentOffer?.location.latitude &&
        offer.location.longitude === currentOffer?.location.longitude) {
          marker.setIcon(currentCustomIcon);
        }
      });

      map.setView(
        [
          city.location.latitude,
          city.location.longitude,
        ],
        city.location.zoom
      );

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, currentOffer, city]);

  const style = className === 'cities' ? '100%' : '579px';

  return (
    <section
      style={{height: style}}
      className={`${className}__map map`}
      ref={mapRef}
    >
    </section>);
}
