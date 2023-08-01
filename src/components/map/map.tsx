import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';
import useMap from '../../hooks/use-map';
import { OfferPreview, City } from '../../types/offer-types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: City;
  offers: OfferPreview[];
  selectedOffer: OfferPreview | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map({ city, offers, selectedOffer }: MapProps) {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        marker
          .setIcon(
            selectedOffer !== undefined && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return (
    <section className="cities__map map"
      ref={mapRef}
      style={{
        height:'100%',
        minHeight:'500px',
        width:'100%',
        maxWidth:'1144px',
        margin:'0 auto',
      }}
    >
    </section>
  );
}

